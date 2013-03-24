<?php
namespace api\database;

require_once dirname(__FILE__) . '/../config.php';

class Database
{
	const SERVER = CONF_MYSQL_SERVER,
		  USERNAME = CONF_MYSQL_USERNAME,
		  PASSWORD = CONF_MYSQL_PASSWORD;
	
	private $link;
	
	function __construct($connect)
	{
		if($connect)
			$this->connect();
	}
	
	private function throwError()
	{
		if($this->link)
			\api\errors\Errors::internalServerError(mysql_error($this->link));
		else
			\api\errors\Errors::internalServerError(mysql_error());
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
	
	public function escape($value)
	{
		return mysql_real_escape_string($value, $this->link);
	}
	
	public function unescape($value)
	{
		return preg_replace('/\\\\([\'"])/', '$1', $value);
	}
}