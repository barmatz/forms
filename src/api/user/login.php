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
		
		if(!session_id())
			session_start();
		
		if(!isset($_SESSION['targetURL']))
			$_SESSION['targetURL'] = 'builder.php';
		
		echo json_encode(array('user'=>$model->getData(), 'target'=>$_SESSION['targetURL']));
		
		unset($_SESSION['targetURL']);
	}
	else
		\api\errors\Errors::internalServerError('User not found');
}