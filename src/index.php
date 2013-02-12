<?php
require_once "users/UserManager.php";

$user = UserManager::getUser();

if($user)
{
	
}
else
{
	UserManager::login();
}