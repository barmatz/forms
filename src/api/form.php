<?php
require_once dirname(__FILE__) . '/api.php';
require_once dirname(__FILE__) . '/form/FormModel.php';

if(isset($_GET['f']))
	getFormData();

function getFormData()
{
	global $db;
	$model = new api\form\FormModel($db);
	echo json_encode($model->selectById($_GET['f']));
}