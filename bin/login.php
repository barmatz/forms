<?php
require_once "users/UserManager.php";
require_once "html/HTMLFactory.php";

echo HTMLFactory::getWrapper(
	HTMLFactory::getFile("html/login.html")
);