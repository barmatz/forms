<?php
require_once dirname(__FILE__) . '/../api.php';
require_once dirname(__FILE__) . '/UserModel.php';

isset($_POST['u']) && isset($_POST['p']) && isset($_POST['f']) && isset($_POST['l']) ? createNewUser() : \api\errors\Errors::notImplemented('Missing variabels');

function createNewUser()
{
	global $db;
	$model = new \api\user\UserModel($db);
	$model->setUserName($_POST['u']);
	$model->setPassword($_POST['p']);
	$model->insert($_POST['u'], $_POST['p'], $_POST['f'], $_POST['l']);
	echo json_encode($model->getData());
}