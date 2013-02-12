var form = barmatz.forms.FormManager.createFromXML(barmatz.utils.XML.stringToXML('<form id="loginForm" width="500px">' +
		'<item id="f1" type="text" label="text field" mandatory="true" validation="3" error="This is an error" value="hello world"/>' +		
		'<item id="f2" type="password" label="password" mandatory="true" validation="3"/>' +		
		'<item id="f3" type="radio" label="radio">' +
			'<value text="value 1">1</value>' +
			'<value text="value 2" selected="true">2</value>' +
		'</item>' +		
		'<item id="f5" type="checkbox" label="checkbox" value="check1"/>' +		
		'<item id="f6" type="checkbox" label="checkbox on" value="check2" selected="true"/>' +		
		'<item id="f7" type="select" label="drop down">' +
			'<value text="value 1">1</value>' +
			'<value text="value 2" selected="true">2</value>' +
		'</item>' +		
		'<item id="f8" type="textarea" label="textarea"/>' +		
		'<submit button="submit" success="You have been logged in" error="User name and password don\'t match"/>' +
	'</form>'));

$('#loginForm').html(form);