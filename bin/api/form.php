<?php
require_once 'errors/ServerError.php';
require_once 'database/Database.php';
require_once 'database/FormsTable.php';

header('Content-Type: application/json');

if(isset($_GET['i']))
	getFormData();

function getFormData()
{
	$table = new barmatz\forms\database\FormsTable(new barmatz\forms\database\Database(true));
	echo json_encode($table->selectById($_GET['i']));
}