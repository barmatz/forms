<?php
namespace api\errors;

class Errors
{
	private static function output($message, $data=null)
	{
		$json = array('error'=>$message);
		
		if(isset($data))
			array_merge($json, $data);
		
		die(json_encode($json));
	}
	
	public static function unauthorized($message)
	{
		header('HTTP/1.0 401 Unauthorized');
		self::output($message);
	}	
	
	public static function internalServerError($message)
	{
		header('HTTP/1.0 500 Internal Server Error');
		self::output($message);
	}	
	
	public static function notImplemented($message)
	{
		header('HTTP/1.0 501 Not Implemented');
		self::output($message);
	}	
}