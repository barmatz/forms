<?php
namespace api\form;

require_once dirname(__FILE__) . '/../database/DatabaseTableModel.php';

class FormModel extends \api\database\DatabaseTableModel
{
	function __construct($db)
	{
		parent::__construct(FormModel::getName(), $db);
	}
	
	static public function getName()
	{
		return 'forms';
	}
	
	protected function create()
	{
		$this->createTable($this->name, array(
			'`id` int(11) primary key auto_increment',
			'`name` varchar(255) default null',
			'`data` text default null',
			'`created` timestamp default current_timestamp',
			'`fingerprint` char(255) unique not null',
			'`user` int(11) not null',
			'`email` char(255) not null'
		));
	}
	
	private function createFingerprint()
	{
		return base64_encode(mysql_fetch_object($this->query("show index from forms"))->Cardinality . 1 . mysql_fetch_object($this->query("select now() as a"))->a);
	}
	
	protected function doInsert($userId, $name, $data, $email)
	{
		if($this->query("insert into `{$this->name}`(`user`, `name`, `data`, `fingerprint`, `email`) values($userId, '{$this->encodeString($name)}', '{$this->encodeString($data)}', '{$this->createFingerprint()}', '{$this->encodeString($email)}')"))
			return mysql_fetch_object($this->query("select `fingerprint` from `{$this->name}` order by `id` desc"))->fingerprint;
		else
			\api\errors\Errors::internalServerError('Cannot insert data.');
	}
	
	protected function doUpdate($fingerprint, $name, $data, $email)
	{
		if($this->query("update `{$this->name}` set `name`='{$this->encodeString($name)}', `data`='{$this->encodeString($data)}', `email`='{$this->encodeString($email)}' where `fingerprint`='$fingerprint'"))
			return $fingerprint;
		else
			\api\errors\Errors::internalServerError('Cannot update data');
	}
	
	protected function doSelectById($id)
	{
		$result = $this->query("select * from `{$this->name}` where `fingerprint`='$id'");

		if($result && mysql_num_rows($result) > 0)
		{
			$data = mysql_fetch_object($result);
			$data->name = $this->decodeString($data->name);
			$data->data = json_decode($this->decodeString($data->data));
			$data->fingerprint = $this->decodeString($data->fingerprint);
			$data->email = $this->decodeString($data->email);
			return $data;
		}
		else
			\api\errors\Errors::internalServerError('Cannot select by id');
	}
	
	public function getFormsByUser($id)
	{
		$result = $this->query("select `{$this->name}`.`name`, `{$this->name}`.`created`, `{$this->name}`.`fingerprint`, `{$this->name}`.`email` from  `{$this->name}` where `{$this->name}`.`user` = $id;");

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
	
	public function getFormByFingerprint($fingerprint)
	{
		$result = $this->query("select `name`, `created`, `user`, `email` from `{$this->name}` where `fingerprint`='$fingerprint'");

		if($result)
		{
			$form = mysql_fetch_object($result);
			$form->name = $this->decodeString($form->name);
			$form->email = $this->decodeString($form->email);
			return $form;
		}
		else
			\api\errors\Errors::internalServerError('Cannot get forms by fingerprint');
	}
	
	public function deleteForm($fingerprint)
	{
		if(!$this->query("delete from `{$this->name}` where  fingerprint='$fingerprint' limit 1"))
			\api\errors\Errors::internalServerError('Cannot delete form');
	}
	
	public function getIdByFingerprint($fingerprint)
	{
		$result = $this->query("select `id` from `{$this->name}` where `fingerprint`='$fingerprint'");
		
		if($result && mysql_num_rows($result) > 0)
			return mysql_fetch_object($result)->id;
		else
			\api\errors\Errors::internalServerError('Error getting id');
	}
}