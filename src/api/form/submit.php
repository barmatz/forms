<?php
require_once dirname(__FILE__) . '/../api.php';
require_once dirname(__FILE__) . '/LeadModel.php';

isset($_REQUEST['f']) && isset($_REQUEST['d']) ? processForm() : \api\errors\Errors::notImplemented('Missing variabels');

function processForm()
{
	global $db;
	
	$model = new \api\form\LeadModel($db);
	$model->insert($_REQUEST['f'], $_REQUEST['d']);
	
	$errors = array();
	
	try
	{
		$model->email($_REQUEST['f'], $_REQUEST['d']);
	}
	catch(Exception $error)
	{
		$errors[] = $error->getMessage();
	}
	
	try
	{
		$model->sendToExternalService($_REQUEST['f'], $_REQUEST['d']);
	}
	catch(Exception $error)
	{
		$errors[] = $error->getMessage();
	}
	
	if(count($errors) > 0)
		\api\errors\Errors::internalServerError(implode('\n', $errors));
		
}