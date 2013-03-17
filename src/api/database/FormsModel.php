<?php
namespace api\database;

require_once dirname(__FILE__) . '/DatabaseTableModel.php';

class FormsModel extends DatabaseTableModel
{
	function __construct($db)
	{
		parent::__construct('forms', $db);
	}
	
	protected function create()
	{
		$this->createTable($this->name, array(
			'`id` int(11) primary key auto_increment',
			'`name` varchar(255) default null',
			'`data` text default null',
			'`created` timestamp default current_timestamp',
			'`fingerprint` char(255) not null',
			'`user` int(11) not null'
		));
	}
	
	private function createFingerprint()
	{
		return base64_encode(mysql_fetch_object($this->query("show index from forms"))->Cardinality . 1 . mysql_fetch_object($this->query("select now() as a"))->a);
	}
	
	public function getFingerprint($id)
	{
		return $this->query("select fingerprint from `" . $this->name . "` where `id`=$id");
	}
	
	protected function doInsert($userId, $name, $data)
	{
		$success = $this->query("insert into `" . $this->name . "`(`user`, `name`, `data`, `fingerprint`) values($userId, '" . mysql_real_escape_string($name) . "', '" . mysql_real_escape_string($data) . "', '" . $this->createFingerprint() . "')");
		
		if($success)
			return mysql_fetch_object($this->query("select id from `" . $this->name . "` order by id desc"))->id;
		else
			\api\errors\Errors::internalServerError('Cannot insert data.');
	}
	
	protected function doUpdate($id, $name, $data)
	{
		$success = $this->query("update `" . $this->name . "` set `name`='" . mysql_real_escape_string($name) . "', `data`='" . mysql_real_escape_string($data) . "' where `id`=$id");
		
		if(!$success)
			\api\errors\Errors::internalServerError('Cannot update data');
	}
	
	protected function doSelectById($id)
	{
		$result = $this->query("select * from `" . $this->name . "` where `id`=$id");
		
		if($result && mysql_num_rows($result) > 0)
			return mysql_fetch_object($result);
		else
			\api\errors\Errors::internalServerError('Cannot select by id');
	}
	
	public function getFormsByUser($id)
	{
		$this->selectDatabse();
		$result = $this->query("select `id`, `name`, `created`, `fingerprint` from `" . $this->name . "` where `user`=$id");
	}
}