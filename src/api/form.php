<?php
require_once dirname(__FILE__) . '/api.php';

if(isset($_GET['i']))
	getFormData();

function getFormData()
{
	$model = new api\database\FormsModel(new api\database\Database(true));
	echo json_encode($model->selectById($_GET['i']));
}