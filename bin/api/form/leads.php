<?php
require_once dirname(__FILE__) . '/../api.php';
require_once dirname(__FILE__) . '/LeadModel.php';

isset($_GET['f']) ? getLeads() : \api\errors\Errors::notImplemented('Missing variabels');

function getLeads()
{
	global $db;
	$formModel = new api\form\FormModel($db);
	$leadModel = new api\form\LeadModel($db);
	echo json_encode($leadModel->getLeadsByForm($formModel->getIdByFingerprint($_GET['f'])));
}