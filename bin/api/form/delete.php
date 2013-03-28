<?php
require_once dirname(__FILE__) . '/../api.php';
require_once dirname(__FILE__) . '/../user/UserModel.php';
require_once dirname(__FILE__) . '/FormModel.php';

\api\user\UserModel::isAuthenticated() ? isset($_POST['f']) ? deleteForm() : \api\errors\Errors::notImplemented('Missing variabels') : \api\errors\Errors::unauthorized('user not logged in');

function deleteForm()
{
	global $db;
	$model = new \api\form\FormModel($db);
	$model->deleteForm($_POST['f']);
} 