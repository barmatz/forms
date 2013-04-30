<?php
require_once dirname(__FILE__) . '/../api.php';
require_once dirname(__FILE__) . '/../form/FormModel.php';

if(!session_id())
	session_start();

isset($_SESSION['userId']) ? getForms() : \api\errors\Errors::unauthorized('Missing data');

function getForms()
{
	global $db;
	$model = new \api\form\FormModel($db);
	echo json_encode($model->getFormsByUser($_SESSION['userId']));
}