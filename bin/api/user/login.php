<?php
require_once dirname(__FILE__) . '/../api.php';
require_once dirname(__FILE__) . '/UserModel.php';

isset($_POST['u']) && isset($_POST['p']) ? login() : \api\errors\Errors::notImplemented('Missing variabels');

function login()
{
	global $db;
	$model = new \api\user\UserModel($db);
	$model->setUserName($_POST['u']);
	$model->setPassword($_POST['p']);
	if($model->exsits())
	{
		$model->login();
		echo json_encode($model->getData());
	}
	else
		\api\errors\Errors::internalServerError('User not found');
}