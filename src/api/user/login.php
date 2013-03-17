<?php
require_once dirname(__FILE__) . '/../api.php';
require_once dirname(__FILE__) . '/UserModel.php';

isset($_POST['u']) && isset($_POST['p']) ? login() : \api\errors\Errors::notImplemented('Missing variabels');

function login()
{
	$model = new \api\user\UserModel($_POST['u'], $_POST['p'], new \api\database\Database(true));
	if($model->exsits())
	{
		$model->login();
		echo json_encode(array("user"=>$model->getData()));
	}
	else
		\api\errors\Errors::internalServerError('User not found');
}