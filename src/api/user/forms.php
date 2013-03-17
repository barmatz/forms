<?php
require_once dirname(__FILE__) . '/../api.php';

isset($_GET['u']) ? getForms() : \api\errors\Errors::notImplemented('Missing variabels');

function getForms()
{
	$model = new \api\database\FormsModel(new api\database\Database(true));
	echo json_encode(array('json'=>$model->getFormsByUser($_GET['u'])));
}