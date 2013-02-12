<?php
class UserManager
{
	public static $USER = "user";
	
	public static function getUser()
	{
		if(session_id() == '')
			session_start();
		
		return isset($_SESSION[self::$USER]) ? $_SESSION[self::$USER] : null;
	}
	
	public static function login()
	{
		self::redirectWithRef("login.php");
	}
	
	public static function logout()
	{
		self::redirectWithRef("logout.php");
	}
	
	private static function redirectWithRef($url)
	{
		header("location: $url?ref=" . $_SERVER["REQUEST_URI"]);
	}
}