<?php
namespace api\form;

require_once dirname(__FILE__) . '/../database/DatabaseTableModel.php';
require_once dirname(__FILE__) . '/FormModel.php';

class LeadModel extends \api\database\DatabaseTableModel
{
	function __construct($db)
	{
		parent::__construct('leads', $db);
	}
	
	protected function create()
	{
		$this->createTable($this->name, array(
			'`id` int(11) primary key auto_increment',
			'`form` int(11) not null',
			'`data` text default null',
			'`created` timestamp default current_timestamp',
			'`useragent` varchar(255) default null',
			'`referer` varchar(255) default null',
			'`ip` varchar(50) default null'
		));
	}
	
	protected function doInsert($formFingerprint, $data)
	{
		$formModelTableName = FormModel::getName();
		if($this->query("insert into `{$this->name}`(`form`, `data`, `useragent`, `referer`, `ip`) values((select id from `$formModelTableName` where fingerprint='$formFingerprint'), '{$this->encodeString($data)}', '{$this->encodeString($_SERVER['HTTP_USER_AGENT'])}', '{$this->encodeString($_SERVER['HTTP_REFERER'])}', '{$this->encodeString($_SERVER['REMOTE_ADDR'])}')"))
			return true;
		else
		{
			print_r("insert into `{$this->name}`(`form`, `data`, `useragent`, `referer`, `ip`) values((select id from `$formModelTableName` where fingerprint='$formFingerprint'), '{$this->encodeString($data)}', '{$this->encodeString($_SERVER['HTTP_USER_AGENT'])}', '{$this->encodeString($_SERVER['HTTP_REFERER'])}', '{$this->encodeString($_SERVER['REMOTE_ADDR'])}')") . PHP_EOL;
			\api\errors\Errors::internalServerError('Cannot insert data.');
		}
	}
}