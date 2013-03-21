<?php
require_once dirname(__FILE__) . '/../api.php';
require_once dirname(__FILE__) . '/../database/FormsModel.php';
require_once dirname(__FILE__) . '/../user/UserModel.php';

\api\user\UserModel::isAuthenticated() ? isset($_POST['i']) ? deleteForm() : \api\errors\Errors::notImplemented('Missing variabels') : \api\errors\Errors::unauthorized('user not logged in');

function deleteForm()
{
	global $db;
	$model = new \api\database\FormsModel($db);
	$model->deleteForm($_POST['i']);
} 