<?php
namespace barmatz\forms\database;

class FormsTable
{
	const SCHEMA_NAME = 'barmatz-forms',
		  NAME = 'forms';
	
	private $db,
			$dbSelected;
	
	function __construct($db)
	{
		$this->db = $db;
	}
	
	private function create()
	{
		$this->db->createTable(self::NAME, array(
			'`id` int(11) primary key auto_increment',
			'`name` varchar(255) default null',
			'`data` text default null',
			'`created` timestamp default current_timestamp',
			'`fingerprint` char(255) not null'
		));
	}
	
	private function selectDatabse()
	{
		if(!$this->dbSelected)
		{
			$this->db->selectDatabase(self::SCHEMA_NAME);
			$this->dbSelected = true;
		}
	}
	
	private function createFingerprint()
	{
		return base64_encode(mysql_fetch_object($this->db->query("show index from forms"))->Cardinality . 1 . mysql_fetch_object($this->db->query("select now() as a"))->a);
	}
	
	public function getFingerprint($id)
	{
		return $this->db->query("select fingerprint from `" . self::NAME . "` where `id`=$id");
	}
	
	public function insert($name, $data)
	{
		
		if(!$this->db->hasSchema(self::SCHEMA_NAME))
			$this->db->createSchema(self::SCHEMA_NAME);
		
		$this->selectDatabse();
		
		if(!$this->db->hasTable(self::NAME))
			$this->create();
		
		$success = $this->db->query("insert into `" . self::NAME . "`(`name`, `data`, `fingerprint`) values('" . mysql_real_escape_string($name) . "', '" . mysql_real_escape_string($data) . "', '" . $this->createFingerprint() . "')");
		
		if($success)
		{
			return mysql_fetch_object($this->db->query("select id from `" . self::NAME . "` order by id desc"))->id;
		}
		else
		{
			$error = new \barmatz\forms\errors\ServerError('Cannot insert data.');
			$error->output();
		}
	}
	
	public function update($id, $name, $data)
	{
		$this->selectDatabse();
		$success = $this->db->query("update `" . self::NAME . "` set `name`='" . mysql_real_escape_string($name) . "', `data`='" . mysql_real_escape_string($data) . "' where `id`=$id");
		
		if(!$success)
		{
			$error = new \barmatz\forms\errors\ServerError('Cannot update data');
			$error->output();
		}
	}
	
	public function selectById($id)
	{
		$this->selectDatabse();
		$result = $this->db->query("select * from `" . self::NAME . "` where `id`=$id");
		
		if($result)
			return mysql_fetch_object($result);
		else
		{
			$error = new \barmatz\forms\errors\ServerError('Cannot update data');
			$error->output();
		}
	}
}