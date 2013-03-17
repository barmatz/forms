<?php
require_once dirname(__FILE__) . '/../api.php';
require_once dirname(__FILE__) . '/UserModel.php';

if(session_id() == '')
	session_start();

$model = new \api\user\UserModel($db);
$model->setId($_SESSION['userId']);
echo json_encode($model->getData());