<?php
namespace barmatz\forms\errors;

class ServerError
{
	private $message = 'Unknown error';
	
	function __construct($message)
	{
		header('HTTP/1.0 501 Not Implemented');
		$this->message = $message;
	}
	
	public function output()
	{
		echo json_encode(array('error'=>$this->message));
	}	
}