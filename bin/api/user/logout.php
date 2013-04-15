<?php
require_once dirname(__FILE__) . '/../api.php';
require_once dirname(__FILE__) . '/UserModel.php';

logout();

function logout()
{
	global $db;
	$model = new \api\user\UserModel($db);
	$model->logout();
}