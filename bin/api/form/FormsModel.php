<?php
namespace api\form;

require_once dirname(__FILE__) . '/../database/DatabaseTableModel.php';

class FormsModel extends \api\database\DatabaseTableModel
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
		return $this->query("select fingerprint from `{$this->name}` where `id`=$id");
	}
	
	protected function doInsert($userId, $name, $data)
	{
		$success = $this->query("insert into `{$this->name}`(`user`, `name`, `data`, `fingerprint`) values($userId, '{$this->encodeString($name)}', '{$this->encodeString($data)}', '{$this->createFingerprint()}')");
		
		if($success)
			return mysql_fetch_object($this->query("select id from `{$this->name}` order by id desc"))->id;
		else
			\api\errors\Errors::internalServerError('Cannot insert data.');
	}
	
	protected function doUpdate($id, $name, $data)
	{
		$success = $this->query("update `{$this->name}` set `name`='{$this->encodeString($name)}', `data`='{$this->encodeString($data)}' where `id`=$id");
		
		if(!$success)
			\api\errors\Errors::internalServerError('Cannot update data');
	}
	
	protected function doSelectById($id)
	{
		$result = $this->query("select * from `{$this->name}` where `id`=$id");
		
		if($result && mysql_num_rows($result) > 0)
		{
			$data = mysql_fetch_object($result);
			$data->name = $this->decodeString($data->name);
			$data->data = $this->decodeString($data->data);
			$data->fingerprint = $this->decodeString($data->fingerprint);
			return $data;
		}
		else
			\api\errors\Errors::internalServerError('Cannot select by id');
	}
	
	public function getFormsByUser($id)
	{
		$result = $this->query("select `id`, `name`, `created`, `fingerprint` from `{$this->name}` where `user`=$id");

		if($result)
		{
			$forms = array();
			
			while($row = mysql_fetch_object($result))
			{
				$row->name = $this->decodeString($row->name);
				$forms[] = $row;
			}
			
			return $forms;
		}
		else
			\api\errors\Errors::internalServerError('Cannot get forms by user');
	}
	
	public function deleteForm($id)
	{
		$success = $this->query("delete from `{$this->name}` where id=$id limit 1");
		
		if(!$success)
			\api\errors\Errors::internalServerError('Cannot delete form');
	}
}