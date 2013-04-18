<?php
require_once dirname(__FILE__) . '/api/user/AuthenticationModel.php';
\api\user\AuthenticationModel::authenticate('leads.php');
?>
<!DOCTYPE html>
<html>
	<head>
		<meta charset="UTF-8">
		<title>Forms Builder</title>
		<link rel="stylesheet" type="text/css" href="css/main.css"/>
		<link rel="stylesheet" type="text/css" href="jqueryui/css/ui-darkness/jquery-ui.min.css"/>
	</head>
	<body>
		<script src="jqueryui/js/jquery-1.9.0.js"></script>
		<script src="jqueryui/js/jquery-ui-1.10.0.custom.min.js"></script>
		<script src="js/application.js"></script>
		<script src="js/leads.js"></script>
	</body>
</html>