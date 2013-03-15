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
	
	public function create()
	{
		$this->db->createTable(self::NAME, array(
			'`id` int(11) primary key auto_increment',
			'`name` varchar(255) default null',
			'`data` text default null',
			'`created` timestamp default current_timestamp'
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
	
	public function insert($name, $data)
	{
		
		if(!$this->db->hasSchema(self::SCHEMA_NAME))
			$this->db->createSchema(self::SCHEMA_NAME);
		
		$this->selectDatabse();
		
		if(!$this->db->hasTable(self::NAME))
			$table->create();
		
		$success = $this->db->query("insert into `" . self::NAME . "`(`name`, `data`) values('" . mysql_real_escape_string($name) . "', '" . mysql_real_escape_string($data) . "')");
		if($success)
		{
			return mysql_fetch_object($this->db->query("select id from `" . self::NAME . "` order by id desc"))->id;
		}
		else
		{
			$error = new \barmatz\forms\errors\ServerError('Cannot insert data');
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
}