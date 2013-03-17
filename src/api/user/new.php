<?php
require_once dirname(__FILE__) . '/../api.php';
require_once dirname(__FILE__) . '/UserModel.php';

isset($_POST['u']) && isset($_POST['p']) && isset($_POST['f']) && isset($_POST['l']) ? createNewUser() : \api\errors\Errors::notImplemented('Missing variabels');

function createNewUser()
{
	$model = new \api\user\UserModel($_POST['u'], $_POST['p'], new \api\database\Database(true));
	$model->insert($_POST['u'], $_POST['p'], $_POST['f'], $_POST['l']);
	echo json_encode($model->getData());
}