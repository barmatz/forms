<?php
class HTMLFactory
{
	public static function getWrapper($content)
	{
		return "<!doctype>" . PHP_EOL .
				self::getTag("html", array(), PHP_EOL .
					self::getTag("head", array(), PHP_EOL .
						self::getCSS("jqueryui/css/overcast/jquery-ui-1.10.0.custom.min.css") . PHP_EOL .
						self::getCSS("css/main.css") . PHP_EOL
					) . PHP_EOL .
					self::getTag("body", array(), PHP_EOL .
						$content . 	PHP_EOL .
						self::getScript("jqueryui/js/jquery-1.9.0.js") . PHP_EOL .
						self::getScript("jqueryui/js/jquery-ui-1.10.0.custom.min.js") . PHP_EOL .
						self::getScript("js/main.js") . PHP_EOL
					) . PHP_EOL
				);
	}
	
	public static function getFile($url)
	{
		return file_get_contents($url);
	}
	
	public static function getTag($name, $attributes=null, $content="", $solo=false)
	{
		$returnVal = "<$name";
		
		if($attributes)
			foreach($attributes as $key=>$value)
				$returnVal .= " $key=\"$value\"";
		
		$returnVal .= $solo && !$content ? "/>" : ">$content</$name>";
		
		return $returnVal;
	}
	
	public static function getScript($url)
	{
		return self::getTag("script", array("src"=>$url));
	}
	
	public static function getCSS($url)
	{
		return self::getLink("text/css", "stylesheet", $url);
	}
	
	public static function getLink($type, $rel, $href)
	{
		return self::getTag("link", array("type"=>$type, "rel"=>$rel, "href"=>$href), "", true);
	}
}