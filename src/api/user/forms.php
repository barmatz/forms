<?php
require_once dirname(__FILE__) . '/../api.php';
require_once dirname(__FILE__) . '/../form/FormsModel.php';

isset($_GET['u']) ? getForms() : \api\errors\Errors::notImplemented('Missing variabels');

function getForms()
{
	global $db;
	$model = new \api\form\FormsModel($db);
	echo json_encode($model->getFormsByUser($_GET['u']));
}