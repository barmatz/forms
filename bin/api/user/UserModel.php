<?php
namespace api\user;

require_once dirname(__FILE__) . '/../database/DatabaseTableModel.php';

class UserModel extends \api\database\DatabaseTableModel
{
	private $id, $userName, $password;
	
	function __construct($db)
	{
		parent::__construct('users', $db);
	}
	
	protected function create()
	{
		$this->createTable($this->name, array(
			'`id` int(11) primary key auto_increment',
			'`username` varchar(255) not null',
			'`password` binary(20) not null',
			'`first_name` varchar(255) not null',
			'`last_name` varchar(255) not null',
			'`created` timestamp default current_timestamp',
			'`active` boolean default true'
		));
	}
	
	protected function doInsert($userName, $password, $firstName, $lastName)
	{
		if($this->exsits())
			\api\errors\Errors::notImplemented('Cannot create new user, user already exsits');
		else
		{
			$this->userName = $userName;	
			$this->password = $password;
			$success = $this->query("insert into `{$this->name}`(`username`, `password`, `first_name`, `last_name`) values('{$this->encodeString($userName)}', unhex(sha1('{$this->encodeString($password)}')), '{$this->encodeString($firstName)}', '{$this->encodeString($lastName)}')");

			if(!$success)
				\api\errors\Errors::internalServerError('Cannot create new user');
		}
	}
	
	public function exsits()
	{
		$result = $this->query("select count(`id`) as `count` from `{$this->name}` where `username`='{$this->userName}' and `password`=unhex(sha1('{$this->password}'))");
		
		if($result && mysql_num_rows($result) > 0)
			return mysql_fetch_object($result)->count > 0 ? true : false;
		else
			\api\errors\Errors::internalServerError('Cannot detect exsisting user');
	}
	
	public function login()
	{
		if(session_id() == '')
			session_start();
		
		$_SESSION['userId'] = $this->getId();
		$_SESSION['auth'] = true;
	}
	
	public function logout()
	{
		if(session_id() == '')
			session_start();
		
		unset($_SESSION['userId']);
		$_SESSION['auth'] = false;
	}
	
	public function getId()
	{
		if(!isset($this->id) && isset($this->userName) && isset($this->password))
		{
			$result = $this->query("select `id` from `{$this->name}` where `username`='{$this->userName}' and `password`=unhex(sha1('{$this->password}'))");
			
			if($result && mysql_num_rows($result) > 0)
				$this->id = mysql_fetch_object($result)->id;
			else 
				\api\errors\Errors::internalServerError('Cannot get id');
		}
		return $this->id;
	}
	
	public function setId($value)
	{
		$this->id = $value;
	}
	
	public function getData()
	{
		$result = $this->query("select `username`, `first_name`, `last_name`, `created`, `active` from `{$this->name}` where `id`={$this->getId()}");
		
		if($result && mysql_num_rows($result) > 0)
			return mysql_fetch_object($result);
		else 
			\api\errors\Errors::internalServerError('Cannot find user data');
	}
	
	public function getUserName()
	{
		if(!isset($this->userName) && isset($this->id))
		{
			$result = $this->query("select `username` from `{$this->name}` where `id`={$this->id}");
				
			if($result && mysql_num_rows($result) > 0)
				$this->userName = mysql_fetch_object($result)->username;
			else
				\api\errors\Errors::internalServerError('Cannot get username');
		}
		
		return $this->userName;
	}
	
	public function setUserName($value)
	{
		$this->userName = $value;
	}
	
	public function getPassword()
	{
		if(!isset($this->password) && isset($this->id))
		{
			$result = $this->query("select `password` from `{$this->name}` where `id`={$this->id}");
		
			if($result && mysql_num_rows($result) > 0)
				$this->password = mysql_fetch_object($result)->password;
			else
				\api\errors\Errors::internalServerError('Cannot get password');
		}
		
		return $this->password;
	}
	
	public function setPassword($value)
	{
		$this->password = $value;
	}
	
	public static function isAuthenticated()
	{
		if(session_id() == '')
			session_start();
		
		return isset($_SESSION['auth']) && $_SESSION['auth'] == true;
	}
}