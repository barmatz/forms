<?php
require_once dirname(__FILE__) . '/../api.php';
require_once dirname(__FILE__) . '/LeadModel.php';

isset($_REQUEST['f']) && isset($_REQUEST['d']) ? processForm() : \api\errors\Errors::notImplemented('Missing variabels');

function processForm()
{
	global $db;
	$model = new \api\form\LeadModel($db);
	$model->insert($_REQUEST['f'], $_REQUEST['d']);
	$model->email($_REQUEST['f'], $_REQUEST['d']);
}