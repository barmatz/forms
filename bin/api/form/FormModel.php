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
			'`fingerprint` char(255) unique not null',
			'`created` timestamp default current_timestamp',
			'`user` int(11) not null',
			'`name` char(255) default null',
			'`fields` text default null',
			'`email` char(255) default null',
			'`internal_api` char(255) default null',
			'`external_api` char(255) default null',
			'`submit_button_label` char(255) default "Submit"',
			'`method` char(10) default null',
			'`encoding` char(100) default null',
			'`stylesheets` char(255) default null',
			'`direction` char(10) default null',
			'`layout_id` int(11) default 1',
			'`language` char(10) default "en"'
		));
	}
	
	private function createFingerprint()
	{
		return base64_encode(mysql_fetch_object($this->query("show index from forms"))->Cardinality . 1 . mysql_fetch_object($this->query("select now() as a"))->a);
	}
	
	protected function doInsert($userId, $name, $fields, $email, $internalAPI, $externalAPI, $submitButtonLabel, $method, $encoding, $stylesheets, $direction, $layoutId, $language)
	{
		$params = array(
			'user' => $userId,
			'fingerprint' => '"' . $this->createFingerprint() . '"',
			'name' => '"' . $this->encodeString($name) . '"',
			'fields' => '"' . $this->encodeString($fields) . '"',
			'email' => '"' . $this->encodeString($email) . '"',
			'internal_api' => '"' . $this->encodeString($internalAPI) . '"',
			'external_api' => '"' . $this->encodeString($externalAPI) . '"',
			'submit_button_label' => '"' . $this->encodeString($submitButtonLabel) . '"',
			'method' => '"' . $this->encodeString($method) . '"',
			'encoding' => '"' . $this->encodeString($encoding) . '"',
			'stylesheets' => '"' . $this->encodeString($stylesheets) . '"',
			'direction' => '"' . $this->encodeString($direction) . '"',
			'layout_id' => $layoutId,
			'language' => '"' . $this->encodeString($language) . '"',
		);
		
		$keys = array();
		$values = array();
		
		foreach($params as $key=>$value)
		{
			$keys[] = "`$key`";
			$values[] = $value;
		}
		
		if($this->query("insert into `{$this->name}`(" . implode(', ', $keys) . ") values(" . implode(', ', $values) . ")"))
			return mysql_fetch_object($this->query("select `fingerprint` from `{$this->name}` order by `id` desc"))->fingerprint;
		else
			\api\errors\Errors::internalServerError('Cannot insert data.');
	}
	
	protected function doUpdate($fingerprint, $name, $fields, $email, $internalAPI, $externalAPI, $submitButtonLabel, $method, $encoding, $stylesheets, $direction, $layoutId, $language)
	{
		$params = array(
			'name' => '"' . $this->encodeString($name) . '"',
			'fields' => '"' . $this->encodeString($fields) . '"',
			'email' => '"' . $this->encodeString($email) . '"',
			'internal_api' => '"' . $this->encodeString($internalAPI) . '"',
			'external_api' => '"' . $this->encodeString($externalAPI) . '"',
			'submit_button_label' => '"' . $this->encodeString($submitButtonLabel) . '"',
			'method' => '"' . $this->encodeString($method) . '"',
			'encoding' => '"' . $this->encodeString($encoding) . '"',
			'stylesheets' => '"' . $this->encodeString($stylesheets) . '"',
			'direction' => '"' . $this->encodeString($direction) . '"',
			'layout_id' => $layoutId,
			'language' => '"' . $this->encodeString($language) . '"',
		);
		
		$values = array();
		
		foreach($params as $key=>$value)
			$values[] = "`$key`=$value";

		if($this->query("update `{$this->name}` set " . implode(', ', $values) . " where `fingerprint`='$fingerprint'"))
			return $fingerprint;
		else
			\api\errors\Errors::internalServerError('Cannot update data');
	}
	
	private function formatSelectResult($result)
	{
		$result->name = $this->decodeString($result->name);
		$result->fields = json_decode($this->decodeString($result->fields));
		$result->email = $this->decodeString($result->email);
		$result->internalAPI = $this->decodeString($result->internal_api);
		$result->externalAPI = $this->decodeString($result->external_api);
		$result->submitButtonLabel = $this->decodeString($result->submit_button_label);
		$result->method = $this->decodeString($result->method);
		$result->encoding = $this->decodeString($result->encoding);
		$result->stylesheets = json_decode($this->decodeString($result->stylesheets));
		$result->direction = $this->decodeString($result->direction);
		$result->layoutId = $result->layout_id;
		$result->language = $this->decodeString($result->language);
		
		unset($result->external_api);
		unset($result->submit_button_label);
		unset($result->layout_id);
		
		return $result;
	}
	
	protected function doSelectById($id)
	{
		$result = $this->query("select * from `{$this->name}` where `fingerprint`='$id'");

		if($result && mysql_num_rows($result) > 0)
			return $this->formatSelectResult(mysql_fetch_object($result));
		else
			\api\errors\Errors::internalServerError('Cannot select by id');
	}
	
	public function getFormsByUser($id)
	{
		$result = $this->query("select * from  `{$this->name}` where `{$this->name}`.`user` = $id;");

		if($result)
		{
			$forms = array();
			
			while($row = mysql_fetch_object($result))
				$forms[] = $this->formatSelectResult($row);
			
			return $forms;
		}
		else
			\api\errors\Errors::internalServerError('Cannot get forms by user');
	}
	
	public function getFormByFingerprint($fingerprint)
	{
		$result = $this->query("select * from `{$this->name}` where `fingerprint`='$fingerprint'");

		if($result)
			return $this->formatSelectResult(mysql_fetch_object($result));
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