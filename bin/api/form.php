<?php
require_once dirname(__FILE__) . '/api.php';
require_once dirname(__FILE__) . '/database/FormsModel.php';

if(isset($_GET['i']))
	getFormData();

function getFormData()
{
	global $db;
	$model = new api\database\FormsModel($db);
	echo json_encode($model->selectById($_GET['i']));
}