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
	
	public function email($formFingerprint, $data)
	{
		$formModel = new FormModel($this->db);
		$formData = $formModel->getFormByFingerprint($formFingerprint);
		
		if($formData->email)
		{
			$leadData = mysql_fetch_object($this->query("select `created`, `referer`, `ip` from `{$this->name}` order by `id` desc limit 1"));
			
			$data = json_decode($this->decodeString($data));
			$tableData = "";
			
			foreach($data as $key=>$value)
				$tableData .= "<tr><td style=\"font-weight: bold\">$key</td><td>$value</td></tr>";
			
			mail(
				$formData->email, 
				"New lead from \"{$formData->name}\"", 
				"<div>
					<table>$tableData</table>
					<hr/>
					<h5>Created on {$leadData->created}</h5>
					<h5>Refered from {$leadData->referer}</h5>
					<h5>User IP {$leadData->ip}</h5>
				</div>", 
				"From: no-reply@quiz.co.il" . "\r\n" .
				"Mime-Version: 1.0" . "\r\n" .
				"Content-Type: text/html; charset=utf-8"
			);
		}
	}
}