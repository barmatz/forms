<?php
require_once dirname(__FILE__) . '/../api.php';
require_once dirname(__FILE__) . '/../user/UserModel.php';
require_once dirname(__FILE__) . '/FormModel.php';

\api\user\UserModel::isAuthenticated() ? isset($_POST['nam']) && isset($_POST['fie']) && isset($_POST['ema']) && isset($_POST['ext']) && isset($_POST['sub']) && isset($_POST['met']) && isset($_POST['enc']) && isset($_POST['sty']) && isset($_POST['dir']) && isset($_POST['lay']) && isset($_POST['lan']) ? processForm() : \api\errors\Errors::notImplemented('Missing variabels') : \api\errors\Errors::unauthorized('user not logged in');

function processForm()
{
	global $db;
	$model = new \api\form\FormModel($db);
	
	if(isset($_POST['fin']))
		$fingerprint = $model->update($_POST['fin'], $_POST['nam'], $_POST['fie'], $_POST['ema'], $_POST['ext'], $_POST['sub'], $_POST['met'], $_POST['enc'], $_POST['sty'], $_POST['dir'], $_POST['lay'], $_POST['lan']);
	else
		$fingerprint = $model->insert($_SESSION['userId'], $_POST['nam'], $_POST['fie'], $_POST['ema'], $_POST['ext'], $_POST['sub'], $_POST['met'], $_POST['enc'], $_POST['sty'], $_POST['dir'], $_POST['lay'], $_POST['lan']);
	
	echo json_encode(array("fingerprint"=>$fingerprint));
} 