<?php
require_once 'errors/ServerError.php';
require_once 'database/Database.php';
require_once 'database/FormsTable.php';

header('Content-Type', 'application/json');

isset($_POST['n']) && isset($_POST['f']) ? processForm() : throwError('Missing variabels');

function processForm()
{
	$table = new barmatz\forms\database\FormsTable(new barmatz\forms\database\Database(true));
	if(isset($_POST['i']))
		$table->update($_POST['i'], $_POST['n'], $_POST['f']);
	else
	{
		$id = $table->insert($_POST['n'], $_POST['f']);
		echo json_encode(array("id"=>$id));
	}
} 

function throwError($message)
{
	$error = new \barmatz\forms\errors\ServerError($message);
	$error->output();
}