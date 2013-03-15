<?php
namespace barmatz\forms\database;

class Database
{
	const SERVER = 'localhost',
		  USERNAME = 'root',
		  PASSWORD = '';
	
	private $link;
	
	function __construct($connect)
	{
		if($connect)
			$this->connect();
	}
	
	private function throwError()
	{
		if($this->link)
			$error = new \barmatz\forms\errors\ServerError(mysql_error($this->link));
		else
			$error = new \barmatz\forms\errors\ServerError(mysql_error());
		$error->output();
	}
	
	public function connect()
	{
		$this->link = mysql_connect(self::SERVER, self::USERNAME, self::PASSWORD);
		
		if(!$this->link)
			$this->throwError();
	}
	
	public function disconnect()
	{
		mysql_close($this->link);
	}
	
	public function hasSchema($name)
	{
		return mysql_num_rows($this->query("select schema_name from information_schema.schemata where schema_name = '$name'")) > 0 ? true : false;
	}
	
	public function hasTable($name)
	{
		return $this->query("select 1 from `$name`") !== false ? true : false;
	}
	
	public function createSchema($name)
	{
		$success = $this->query("create database `$name`");
		if(!$success)
			$this->throwError();
	}
	
	public function createTable($name, $definitions)
	{
		$success = $this->query("create table `$name`(" . implode(',', $definitions) . ")");
		if(!$success)
			$this->throwError();
	}
	
	public function selectDatabase($name)
	{
		$success = mysql_select_db($name, $this->link);
		if(!$success)
			$this->throwError();
	}
	
	public function query($sql)
	{
		return mysql_query($sql);
	}
}