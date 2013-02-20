asyncTest('Loader object', 4, function()
{
	var loader = new barmatz.net.Loader(),
		request = new barmatz.net.Request('form1.xml'),
		timeout = setTimeout(start, 3000);
	
	loader.addEventListener(barmatz.events.LoaderEvent.OPENED, onLoaderOpened);
	loader.addEventListener(barmatz.events.LoaderEvent.HEADERS_RECEIVED, onLoaderHeadersReceived);
	loader.addEventListener(barmatz.events.LoaderEvent.LOADING, onLoaderLoading);
	loader.addEventListener(barmatz.events.LoaderEvent.DONE, onLoaderDone);
	loader.load(request);
	
	function onLoaderOpened(event)
	{
		ok(event.request, 'request opened');
	}
	
	function onLoaderHeadersReceived(event)
	{
		ok(event.response.headers.length > 0, 'headers received');
	}
	
	function onLoaderLoading(event)
	{
		ok(event.response, 'loading');
	}
	
	function onLoaderDone(event)
	{
		loader.removeEventListener(barmatz.events.LoaderEvent.OPENED, onLoaderOpened);
		loader.removeEventListener(barmatz.events.LoaderEvent.HEADERS_RECEIVED, onLoaderHeadersReceived);
		loader.removeEventListener(barmatz.events.LoaderEvent.LOADING, onLoaderLoading);
		loader.removeEventListener(barmatz.events.LoaderEvent.DONE, onLoaderDone);
		ok(event.response.data.length > 0, 'data loaded');
		clearTimeout(timeout);
		start();
	}
});
test('Form object', function()
{
	var formID = 'form1',
		fieldName = 'field1',
		fieldType = barmatz.forms.FormFieldType.TEXT,
		form = new barmatz.forms.Form(),
		field1, field2;
	
	form.id = formID;
	form.addEventListener(barmatz.events.FormEvent.FIELD_ADDED, onFormFieldAdded);
	ok(form.hasEventListener(barmatz.events.FormEvent.FIELD_ADDED), 'fieldAdded event listener added to form');
	
	form.addEventListener(barmatz.events.FormEvent.FIELD_REMOVED, onFormFieldRemoved);
	ok(form.hasEventListener(barmatz.events.FormEvent.FIELD_REMOVED), 'fieldRemoved event listener added to form');
	
	ok(form.id == formID, 'form ID set');
	ok(form.numFields == 0, 'fields collection have been initiated');
	
	field1 = new barmatz.forms.FormField(fieldType, fieldName);
	
	form.addField(field1);
	strictEqual(field1, field2, 'addField method returns same instance');
	ok(form.numFields == 1, 'field has been added to form');
	ok(form.getFieldByName(fieldName) == field2, 'got field by name from form');
	ok(form.getFieldsByType(fieldType).length == 1, 'got 1 fields by type from form');
	ok(form.getFieldsByType('unknown').length == 0, 'got 0 fields by type from form');
	
	form.removeField(field1);
	strictEqual(field1, field2, 'removeField method returns same instance');
	ok(form.numFields == 0, 'field has been removed to form');

	form.addFieldAt(field1, 0);
	strictEqual(field1, field2, 'addFieldAt method returns same instance');
	ok(form.numFields == 1, 'field has been added to form');
	
	form.removeFieldAt(0);
	strictEqual(field1, field2, 'removeFieldAt method returns same instance');
	ok(form.numFields == 0, 'field has been removed to form');
	
	function onFormFieldAdded(event)
	{
		field2 = event.field;
	}
	
	function onFormFieldRemoved(event)
	{
		field2 = event.field;
	}
});
asyncTest('TDD', function()
{
	var formID = 'form1',
		loader = new barmatz.net.Loader(),
		request = new barmatz.net.Request('form1.xml'),
		timeout = setTimeout(start, 3000);

	loader.addEventListener(barmatz.events.LoaderEvent.DONE, onLoaderDone);
	loader.load(request);
	
	function onLoaderDone(event)
	{
		var fixture = document.getElementById('qunit-fixture'),
			xml, form, model, view;
		
		xml = barmatz.utils.XML.stringToXML(event.response.data);
		
		form = new barmatz.forms.Form();
		form.createFromXML(xml);
		
		equal(form.id, formID, 'form ID is set');
		equal(form.numFields, 6, 'form fields have been added');
		equal(form.submitButton.label, 'Submit form', 'form submit button is set');

		for(i = 0; i < form.numFields; i++)
		{
			model = form.getFieldAt(i);
			view = barmatz.forms.Factory.createFormFieldElement(model);
			
			fixture.appendChild(view);
			
			ok(view.type == model.type || view.tagName.toLowerCase() == model.type, 'view assigned type');
			equal(view.parentElement, fixture, 'element added to DOM');
			equal(view.name, model.name, 'view assigned name');
			equal(view.value, model.value, 'view assigned value');
			equal(view.enabled, model.enabled, 'view assigned enabled');
		}
		
		clearTimeout(timeout);
		start();
	}
});