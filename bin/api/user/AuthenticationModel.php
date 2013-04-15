<?php
namespace api\user;

require_once dirname(__FILE__) . '/UserModel.php';

class AuthenticationModel
{
	static public function authenticate($targetURL)
	{
		if(!UserModel::isAuthenticated())
		{
			if(!session_id())
				session_start();
			
			$_SESSION['targetURL'] = $targetURL;
			header("Location: login.php");
		}
	}
}