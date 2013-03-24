<?php
require_once dirname(__FILE__) . '/../api.php';
require_once dirname(__FILE__) . '/../user/UserModel.php';
require_once dirname(__FILE__) . '/FormsModel.php';

\api\user\UserModel::isAuthenticated() ? isset($_POST['n']) && isset($_POST['d']) ? processForm() : \api\errors\Errors::notImplemented('Missing variabels') : \api\errors\Errors::unauthorized('user not logged in');

function processForm()
{
	global $db;
	$model = new \api\form\FormsModel($db);
	
	if(isset($_POST['i']))
		$model->update($_POST['i'], $_POST['n'], $_POST['d']);
	else
		echo json_encode(array("id"=>$model->insert($_SESSION['userId'], $_POST['n'], $_POST['d'])));
} 