<?php
namespace api\database;

class DatabaseTableModel
{
	const SCHEMA_NAME = 'barmatz-forms';
	private $db, $dbSelected;
	protected $name;

	function __construct($name, $db)
	{
		$this->name = $name;
		$this->db = $db;
	}
	
	private function selectDatabse()
	{
		if(!$this->db->hasSchema(self::SCHEMA_NAME))
			$this->db->createSchema(self::SCHEMA_NAME);
		
		if(!$this->dbSelected)
		{
			$this->db->selectDatabase(self::SCHEMA_NAME);
			$this->dbSelected = true;
		}
	}
	
	protected function create()
	{
		throw new Exception('method must be overridden');
	}
	
	protected function createTable($name, $definitions)
	{
		$this->db->createTable($name, $definitions);
	}
	
	public function insert()
	{
		$this->selectDatabse();
	
		if(!$this->db->hasTable($this->name))
			$this->create();
		
		call_user_func_array(array($this, 'doInsert'), func_get_args());
	}
	
	public function update()
	{
		$this->selectDatabse();
		call_user_func_array(array($this, 'doUpdate'), func_get_args());
	}
	
	public function query($sql)
	{
		$this->selectDatabse();
		return $this->db->query($sql);		
	}
	
	public function selectById()
	{
		$this->selectDatabse();
		return call_user_func_array(array($this, 'doSelectById'), func_get_args());
	}
	
	protected function doInsert()
	{
		throw new Exception('method must be overridden');
	}
	
	protected function doUpdate()
	{
		throw new Exception('method must be overridden');
	}
	
	protected function doSelectById()
	{
		throw new Exception('method must be overridden');
	}
}