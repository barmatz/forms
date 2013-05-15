<?php
require_once dirname(__FILE__) . '/errors/Errors.php';
require_once dirname(__FILE__) . '/database/Database.php';

header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');

$db = new \api\database\Database(true);

parse_str(file_get_contents('php://input'), $_POST);