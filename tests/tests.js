module('barmatz.events.BuilderEvent', {
	setup: function()
	{
		item = {};
		index = 0;
		event = new barmatz.events.BuilderEvent(barmatz.events.BuilderEvent.FORM_ITEM_ADDED, item, index);
	},
	teardown: function()
	{
		delete item;
		delete index;
		delete event;
	}
});
test('getItem', function()
{
	strictEqual(item, event.getItem());
});
test('getIndex', function()
{
	equal(index, event.getIndex());
});
test('clone', function()
{
	 var clone = event.clone();
	 notStrictEqual(event, clone);
	 equal(event.getItem(), clone.getItem());
	 equal(event.getIndex(), clone.getIndex());
	 equal(event.getTarget(), clone.getTarget());
});
test('toString', function()
{
	ok(event.toString());
});
module('barmatz.events.CollectionEvent', {
	setup: function()
	{
		item = {};
		index = 0;
		event = new barmatz.events.CollectionEvent(barmatz.events.CollectionEvent.ITEM_ADDED, item, index);
	},
	teardown: function()
	{
		delete item;
		delete index;
		delete event;
	}
});
test('getItem', function()
{
	strictEqual(item, event.getItem());
});
test('getIndex', function()
{
	equal(index, event.getIndex());
});
test('clone', function()
{
	 var clone = event.clone();
	 notStrictEqual(event, clone);
	 strictEqual(event.getItem(), clone.getItem());
	 equal(event.getIndex(), clone.getIndex());
	 strictEqual(event.getTarget(), clone.getTarget());
});
test('toString', function()
{
	ok(event.toString());
});
module('barmatz.events.Event', {
	setup: function()
	{
		target = undefined;
		type = 'myevent';
		event = new barmatz.events.Event(type);
	},
	teardown: function()
	{
		delete target;
		delete type;
		delete event;
	}
});
test('getTarget', function()
{
	strictEqual(target, event.getTarget());
});
test('getType', function()
{
	equal(type, event.getType());
});
test('clone', function()
{
	var clone = event.clone();
	notStrictEqual(event, clone);
	strictEqual(event.getTarget(), clone.getTarget());
	equal(event.getType(), clone.getType());
});
test('formatToString', function()
{
	ok(event.formatToString('Event'));
});
test('toString', function()
{
	ok(event.toString());
});
module('barmatz.events.EventDispatcher', {
	setup: function()
	{
		target = {};
		eventType = 'myevent';
		callback = function(event){};
		dispatcher = new barmatz.events.EventDispatcher(target);
	},
	teardown: function()
	{
		delete target;
		delete eventType;
		delete callback;
		delete dispatcher;
	}
});
test('addEventListener', function()
{
	dispatcher.addEventListener(eventType, callback);
	ok(dispatcher.hasEventListener(eventType));
});
test('dispatchEvent', 1, function()
{
	callback = function(event)
	{
		ok(event);
	};
	dispatcher.addEventListener(eventType, callback);
	dispatcher.dispatchEvent(new barmatz.events.Event(eventType));
});
test('hasEventListener', function()
{
	equal(false, dispatcher.hasEventListener(eventType));
	dispatcher.addEventListener(eventType, callback);
	equal(true, dispatcher.hasEventListener(eventType));
});
test('removeEventListener', 2, function()
{
	callback = function(event)
	{
		ok(event);
	};
	dispatcher.addEventListener(eventType, callback);
	equal(true, dispatcher.hasEventListener(eventType));
	dispatcher.removeEventListener(eventType, callback);
	equal(false, dispatcher.hasEventListener(eventType));
	dispatcher.dispatchEvent(new barmatz.events.Event(eventType));
});
test('toJSON', function()
{
	ok(dispatcher.toJSON());
});
module('barmatz.events.FieldEvent', {
	setup: function()
	{
		errors = {};
		event = new barmatz.events.FieldEvent(barmatz.events.FieldEvent.INVALID, errors);
	},
	teardown: function()
	{
		delete errors;
		delete event;
	}
});
test('getErrors', function()
{
	strictEqual(errors, event.getErrors());
});
test('clone', function()
{
	var clone = event.clone();
	notStrictEqual(event, clone);
	strictEqual(event.getTarget(), clone.getTarget());
	equal(event.getErrors(), clone.getErrors());
});
test('toString', function()
{
	ok(event.toString());
});
module('barmatz.events.FormEvent', {
	setup: function()
	{
		leads = {};
		event = new barmatz.events.FormEvent(barmatz.events.FormEvent.GET_LEADS_SUCCESS, leads);
	},
	teardown: function()
	{
		delete leads;
		delete event;
	}
});
test('getLeads', function()
{
	strictEqual(leads, event.getLeads());
});
test('clone', function()
{
	var clone = event.clone();
	notStrictEqual(event, clone);
	strictEqual(event.getTarget(), clone.getTarget());
	equal(event.getLeads(), clone.getLeads());
});
test('toString', function()
{
	ok(event.toString());
});
module('barmatz.events.LoaderEvent', {
	setup: function()
	{
		request = {};
		response = {};
		event1 = new barmatz.events.LoaderEvent(barmatz.events.LoaderEvent.UNSENT, request);
		event2 = new barmatz.events.LoaderEvent(barmatz.events.LoaderEvent.SUCCESS, response);
	},
	teardown: function()
	{
		delete request;
		delete response;
		delete event1;
		delete event2;
	}
});
test('getRequest', function()
{
	equal(request, event1.getRequest());
});
test('getResposne', function()
{
	equal(response, event2.getResponse());
});
test('clone', function()
{
	var clone1 = event1.clone(), clone2 = event2.clone();
	notStrictEqual(event1, clone1);
	strictEqual(event1.getTarget(), clone1.getTarget());
	strictEqual(event1.getRequest(), clone1.getRequest());
	strictEqual(event2.getTarget(), clone2.getTarget());
	strictEqual(event2.getResponse(), clone2.getResponse());
});
test('toString', function()
{
	ok(event1.toString());
	ok(event2.toString());
});
module('barmatz.events.ModelEvent', {
	setup: function()
	{
		key = 'mykey';
		value = 'myvalue';
		event = new barmatz.events.ModelEvent(barmatz.events.ModelEvent.VALUE_CHANGED, key, value);
	},
	teaddown: function()
	{
		delete event;
	}
});
test('getKey', function()
{
	equal(key, event.getKey());
});
test('getValue', function()
{
	equal(value, event.getValue());
});
test('clone', function()
{
	var clone = event.clone();
	notStrictEqual(event, clone);
	strictEqual(event.getKey(), clone.getKey());
	strictEqual(event.getValue(), clone.getValue());
});
test('toString', function()
{
	ok(event.toString());
});
module('barmatz.events.UserEvent', {
	setup: function()
	{
		forms = {};
		targetURL = '';
		event1 = new barmatz.events.UserEvent(barmatz.events.UserEvent.GET_FORMS_SUCCESS, forms);
		event2 = new barmatz.events.UserEvent(barmatz.events.UserEvent.LOGIN_SUCCESS, targetURL);
	},
	teardown: function()
	{
		delete forms;
		delete targetURL;
		delete event1;
		delete event2;
	}
});
test('getForms', function()
{
	strictEqual(forms, event1.getForms());
});
test('getTargetURL', function()
{
	equal(targetURL, event2.getTargetURL());
});
test('clone', function()
{
	var clone1 = event1.clone(), clone2 = event2.clone();
	notStrictEqual(event1, clone1);
	notStrictEqual(event2, clone2);
	strictEqual(event1.getForms(), clone1.getForms());
	strictEqual(event2.getTargetURL(), clone2.getTargetURL());
});
test('toString', function()
{
	ok(event1.toString());
	ok(event2.toString());
});
module('barmatz.forms.factories.ControllerFactory', {
	setup: function()
	{
		controller = null;
	},
	teardown: function()
	{
		delete controller;
	}
});
test('createLoginController', function()
{
	controller = barmatz.forms.factories.ControllerFactory.createLoginController(
		new barmatz.forms.users.UserModel(),
		document.createElement('div'),
		document.createElement('div'),
		document.createElement('div'),
		document.createElement('div')
	);
	ok(controller);
});
test('createToolboxController', function()
{
	controller = barmatz.forms.factories.ControllerFactory.createToolboxController(
		new barmatz.forms.ui.ToolboxModel(),
		document.createElement('div')
	);
	ok(controller);
});
test('createWorkspaceController', function()
{
	controller = barmatz.forms.factories.ControllerFactory.createWorkspaceController(
		new barmatz.forms.CollectionModel(),
		document.createElement('div'),
		document.getElementById('qunit-fixture')
	);
	ok(controller);
});
test('createPropertiesController', function()
{
	controller = barmatz.forms.factories.ControllerFactory.createPropertiesController(
		document.createElement('div')
	);
	ok(controller);
});
test('createBuilderPageController', function()
{
	controller = barmatz.forms.factories.ControllerFactory.createBuilderPageController(
		new barmatz.forms.FormModel(),
		new barmatz.forms.users.UserModel(),
		document.createElement('div'),
		document.createElement('div'),
		document.createElement('div'),
		document.createElement('div'),
		new barmatz.forms.ui.MenuModel(),
		document.createElement('div'),
		new barmatz.forms.ui.ToolboxModel(),
		document.createElement('div'),
		document.createElement('div'),
		new barmatz.forms.ui.PropertiesController(document.createElement('div')),
		document.getElementById('qunit-fixture')
	);
	ok(controller);
});
test('createWorkspaceItemController', function()
{
	controller = barmatz.forms.factories.ControllerFactory.createWorkspaceItemController(
		new barmatz.forms.fields.FormItemModel(''),
		barmatz.forms.factories.DOMFactory.createDialog('createWorkspaceItemController', '', true, document.getElementById('qunit-fixture')),
		document.createElement('div'),
		document.createElement('div'),
		document.createElement('div')
	);
	ok(controller);
});
test('createNewFieldDialogController', function()
{
	controller = barmatz.forms.factories.ControllerFactory.createNewFieldDialogController(
		new barmatz.forms.fields.FieldModel('', ''),
		barmatz.forms.factories.DOMFactory.createDialog('createNewFieldDialogController', '', true, document.getElementById('qunit-fixture')),
		document.createElement('input'),
		document.createElement('input')
	);
	ok(controller);
});
test('createMenuController', function()
{
	controller = barmatz.forms.factories.ControllerFactory.createMenuController(
		new barmatz.forms.ui.MenuModel(),
		document.createElement('div'),
		document.createElement('div')
	);
	ok(controller);
});
test('createUserFormsListController', function()
{
	controller = barmatz.forms.factories.ControllerFactory.createUserFormsListController(
		new barmatz.forms.FormModel(),
		new barmatz.forms.users.UserModel(),
		document.createElement('div'),
		document.createElement('div'),
		document.getElementById('qunit-fixture')
	);
	ok(controller);
});
test('createUserFormsListItemController', function()
{
	controller = barmatz.forms.factories.ControllerFactory.createUserFormsListItemController(
		new barmatz.forms.FormModel(),
		document.createElement('div'),
		document.createElement('div'),
		document.createElement('div'),
		document.createElement('div')
	);
	ok(controller);
});
test('createFormController', function()
{
	controller = barmatz.forms.factories.ControllerFactory.createFormController(
		new barmatz.forms.FormModel(),
		document.createElement('form'),
		document.createElement('div')
	);
	ok(controller);
});
test('createDropboxItemsListController', function()
{
	controller = barmatz.forms.factories.ControllerFactory.createDropboxItemsListController(
		new barmatz.forms.fields.DropboxModel('', []),
		document.createElement('div'),
		document.createElement('div'),
		document.createElement('div'),
		document.getElementById('qunit-fixture')
	);
	ok(controller);
});
test('createFieldValidationOptionsController', function()
{
	controller = barmatz.forms.factories.ControllerFactory.createFieldValidationOptionsController(
		new barmatz.forms.fields.FieldModel('', ''),
		{}
	);
	ok(controller);
});
test('createFieldController', function()
{
	controller = barmatz.forms.factories.ControllerFactory.createFieldController(
		new barmatz.forms.fields.FieldModel('', ''),
		document.createElement('input'),
		document.createElement('div')
	);
	ok(controller);
});
test('createJQueryDialogController', function()
{
	controller = barmatz.forms.factories.ControllerFactory.createJQueryDialogController(
		barmatz.forms.factories.DOMFactory.createDialog('createJQueryDialogController', '', true, document.getElementById('qunit-fixture'))
	);
	ok(controller);
});
test('createLeadsController', function()
{
	controller = barmatz.forms.factories.ControllerFactory.createLeadsController(
		new barmatz.forms.users.UserModel(),
		new barmatz.forms.CollectionModel(),
		document.createElement('div'),
		new barmatz.forms.CollectionModel(),
		document.createElement('div'),
		document.createElement('div'),
		document.createElement('div'),
		document.createElement('div'),
		document.getElementById('qunit-fixture')
	);
	ok(controller);
});
test('createLeadsListController', function()
{
	controller = barmatz.forms.factories.ControllerFactory.createLeadsListController(
		new barmatz.forms.CollectionModel(),
		document.createElement('div')
	);
	ok(controller);
});
test('createLeadsFormsListController', function()
{
	controller = barmatz.forms.factories.ControllerFactory.createLeadsFormsListController(
		new barmatz.forms.CollectionModel(),
		document.createElement('div')
	);
	ok(controller);
});
module('barmatz.forms.factories.DOMFactory', {
	setup: function()
	{
		element = null;
	},
	teardown: function()
	{
		if(barmatz.forms.factories.DOMFactory.isDialog(element))
			barmatz.forms.factories.DOMFactory.destroyDialog(element);
		delete elemenet;
	}
});
test('getBodyElement', function()
{
	element = barmatz.forms.factories.DOMFactory.getBodyElement();
	ok(element);
});
test('createStylesheet', function()
{
	href = 'mylink';
	element = barmatz.forms.factories.DOMFactory.createStylesheet(href);
	equal(href, element.getAttribute('href'));
});
test('addContent', function()
{
	element = barmatz.forms.factories.DOMFactory.createElement('div');
	
	content = 'mycontent';
	barmatz.forms.factories.DOMFactory.addContent(content, element);
	equal(element.innerHTML, content);
	barmatz.forms.factories.DOMFactory.clearElement(element);

	content = ['mycontent1', 'mycontent2'];
	barmatz.forms.factories.DOMFactory.addContent(content, element);
	equal(element.innerHTML, content.join(''));
	barmatz.forms.factories.DOMFactory.clearElement(element);
	
	content = document.createElement('div');
	barmatz.forms.factories.DOMFactory.addContent(content, element);
	strictEqual(element.children[0], content);
	barmatz.forms.factories.DOMFactory.clearElement(element);
	
	content = [document.createElement('div'), document.createElement('div')];
	barmatz.forms.factories.DOMFactory.addContent(content, element);
	strictEqual(element.children[0], content[0]);
	strictEqual(element.children[1], content[1]);
	barmatz.forms.factories.DOMFactory.clearElement(element);
});
test('clearElement', function()
{
	element = barmatz.forms.factories.DOMFactory.createElement('div');
	barmatz.forms.factories.DOMFactory.addContent('mycontent', element);
	barmatz.forms.factories.DOMFactory.clearElement(element);
	equal(element.innerHTML, '');
});
test('createElement', function()
{
	tagName = 'DIV';
	className = 'myclass';
	element = barmatz.forms.factories.DOMFactory.createElement(tagName, className);
	equal(tagName, element.tagName);
	equal(className, element.className);
});
test('createElementWithContent', function()
{
	tagName = 'DIV';
	className = 'myclass';
	content = 'mycontent';
	appendChildWrapper = function(content2)
	{
		strictEqual(content, content2);
		return content2;
	};
	element = barmatz.forms.factories.DOMFactory.createElementWithContent(tagName, className, content, appendChildWrapper);
	equal(tagName, element.tagName);
	equal(className, element.className);
	equal(content, element.innerHTML);
});
test('createButton', 3, function()
{
	label = 'mylabel';
	clickHandler = function(event)
	{
		ok(event);
	};
	className = 'myclassname';
	element = barmatz.forms.factories.DOMFactory.createButton(label, clickHandler, className);
	ok(new RegExp(label).test(element.innerHTML));
	ok(new RegExp(className).test(element.className));
	
	event = document.createEvent('MouseEvents');
	event.initMouseEvent('click');
	element.dispatchEvent(event);
});
test('createDropboxElement', function()
{
	label = 'mylabel';
	value = 'myvalue';
	model = new barmatz.forms.fields.DropboxModel('');
	model.addItem(new barmatz.forms.fields.DropboxItemModel(label, value));
	selectedIndex = 0;
	element = barmatz.forms.factories.DOMFactory.createDropboxElement(model, selectedIndex);
	equal(model.getNumItems(), element.children.length);
	equal(selectedIndex, element.selectedIndex);
	
	model.forEach(function(item, index, collection)
	{
		equal(item.getLabel(), element.children[index].innerHTML);
		equal(item.getValue(), element.children[index].value);
	});
});
test('createDropboxItemElement', function()
{
	label = 'mylabel';
	value = 'myvalue';
	model = new barmatz.forms.fields.DropboxItemModel(label, value);
	element = barmatz.forms.factories.DOMFactory.createDropboxItemElement(model);
	equal(label, element.innerHTML);
	equal(value, element.value);
});
test('createFormFieldElement', function()
{
	name = 'myname';
	models = [
		new barmatz.forms.fields.HTMLContentModel(name),
		new barmatz.forms.fields.TextAreaFieldModel(name),
		new barmatz.forms.fields.TextFieldModel(name),
		new barmatz.forms.fields.DropboxModel(name),
		new barmatz.forms.fields.PasswordFieldModel(name),
		new barmatz.forms.fields.CheckboxFieldModel(name),
		new barmatz.forms.fields.RadioFieldModel(name),
		new barmatz.forms.fields.FileFieldModel(name),
		new barmatz.forms.fields.HiddenFieldModel(name),
		new barmatz.forms.fields.PhoneFieldModel(name)
	];
	
	for(i = 0; i < models.length; i++)
	{
		model = models[i];
		element = barmatz.forms.factories.DOMFactory.createFormFieldElement(model);
		
		switch(model.getType())
		{
			case barmatz.forms.fields.FieldTypes.HTML_CONTENT:
				equal('DIV', element.tagName);
				break;
			case barmatz.forms.fields.FieldTypes.TEXT_FIELD:
			case barmatz.forms.fields.FieldTypes.PASSWORD:
			case barmatz.forms.fields.FieldTypes.CHECKBOX:
			case barmatz.forms.fields.FieldTypes.RADIO:
			case barmatz.forms.fields.FieldTypes.FILE:
			case barmatz.forms.fields.FieldTypes.HIDDEN:
				equal('INPUT', element.tagName);
				equal(model.getType(), element.type);
				break;
			case barmatz.forms.fields.FieldTypes.TEXT_AREA:
				equal('TEXTAREA', element.tagName);
				break;
			case barmatz.forms.fields.FieldTypes.DROPBOX:
				equal('SELECT', element.tagName);
				break;
			case barmatz.forms.fields.FieldTypes.PHONE:
				equal('DIV', element.tagName);
				equal(1, element.getElementsByTagName('input').length);
				equal(1, element.getElementsByTagName('select').length);
				break;
		}

		if(element.hasOwnProperty('value'))
			equal(model.getValue(), element.value);
		
		if(element.hasOwnProperty('enabled'))
			equal(model.getEnabled(), element.enabled);

		if(model instanceof barmatz.forms.fields.TextFieldModel)
			if(!isNaN(model.getMax()))
				equal(model.getMax(), element.maxLength);

		if(model instanceof barmatz.forms.fields.CheckboxFieldModel)
			equal(model.getChecked(), element.checked);
		
		if(model instanceof barmatz.forms.fields.FileFieldModel)
			equal(model.getAccept(), element.accept);
		
		if(model instanceof barmatz.forms.fields.TextAreaFieldModel)
		{
			equal(model.getRows(), element.rows);
			equal(model.getCols(), element.cols);
		}
		
		if(model instanceof barmatz.forms.fields.DropboxModel)
		{
			equal(model.getMultiple(), element.multiple);
			equal(model.getNumItems(), element.children.length);
		}
		
		if(model instanceof barmatz.forms.fields.PhoneFieldModel)
		{
			equal(model.getPrefix(), element.getElementsByTagName('select')[0].value);
			equal('', element.getElementsByTagName('input')[0].value, model.getValue().replace(model.getPrefix()));
		}
	}
});
test('createFieldWrapper', function()
{
	model = new barmatz.forms.fields.TextFieldModel('');
	model.setLabel('mylabel');
	model.setMandatory(true);
	className = 'myclass';
	element = barmatz.forms.factories.DOMFactory.createFieldWrapper(model, className);
	ok(element.field);
	equal(className, element.wrapper.className);
	equal(model.getLabel(), element.label.innerHTML);
	equal('*', element.mandatory.innerHTML);
});
test('createSubmitButton', 2, function()
{
	label = 'mylabel';
	clickHandler = function(evnet)
	{
		ok(event);
	};
	element = barmatz.forms.factories.DOMFactory.createSubmitButton(label, clickHandler);
	ok(new RegExp(label).test(element.getElementsByTagName('button')[0].innerHTML));
	
	event = document.createEvent('MouseEvents');
	event.initMouseEvent('click');
	element.getElementsByTagName('button')[0].dispatchEvent(event);
});
test('createToolbox', function()
{
	element = barmatz.forms.factories.DOMFactory.createToolbox();
	ok(element);
});
test('createWorkspaceWrapper', function()
{
	formName = 'myform';
	saveStatus = 'mystatus';
	element = barmatz.forms.factories.DOMFactory.createWorkspaceWrapper(formName, saveStatus);
	ok(element.wrapper);
	ok(element.workspace);
	equal(formName, element.formName.innerHTML);
	equal(saveStatus, element.saveStatus.innerHTML);
});
test('createProperties', function()
{
	element = barmatz.forms.factories.DOMFactory.createProperties();
	ok(element);
});
test('createToolboxItem', function()
{
	label = 'mylabel';
	element = barmatz.forms.factories.DOMFactory.createToolboxItem(label);
	equal(label, element.innerHTML);
});
test('createWorkspaceItemWrapper', function()
{
	model = new barmatz.forms.fields.FormItemModel('');
	element = barmatz.forms.factories.DOMFactory.createWorkspaceItemWrapper(model);
	ok(element.wrapper);
	ok(element.label);
	ok(element.field);
	ok(element.mandatory);
	ok(element.deleteButton);
});
test('createPropertiesItemWarpper', function()
{
	models = [
  		new barmatz.forms.fields.HTMLContentModel(name),
  		new barmatz.forms.fields.TextAreaFieldModel(name),
  		new barmatz.forms.fields.TextFieldModel(name),
  		new barmatz.forms.fields.DropboxModel(name),
  		new barmatz.forms.fields.PasswordFieldModel(name),
  		new barmatz.forms.fields.CheckboxFieldModel(name),
  		new barmatz.forms.fields.RadioFieldModel(name),
  		new barmatz.forms.fields.FileFieldModel(name),
  		new barmatz.forms.fields.HiddenFieldModel(name),
  		new barmatz.forms.fields.PhoneFieldModel(name)
  	];
  	
  	for(i = 0; i < models.length; i++)
  	{
  		model = models[i];
  		
  		if(model instanceof barmatz.forms.fields.FieldModel)
  		{
  			model.setName('myname');
  			model.setLabel('mylabel');
  			model.setMandatory(true);
  			model.setEnabled(true);
  			model.setWidth(100);
  		}
		
		if(model instanceof barmatz.forms.fields.FileFieldModel)
			model.setAccept(['file1', 'file2'])
	
		if(model instanceof barmatz.forms.fields.TextFieldModel)
		{
			model.setDescription('mydescription');
			model.setMax(10);
		}
		
		if(model instanceof barmatz.forms.fields.TextAreaFieldModel)
		{
			model.setRows(10);
			model.setCols(10);
		}
		
		if(model instanceof barmatz.forms.fields.CheckboxFieldModel)
			model.setChecked(true);
		
		if(model instanceof barmatz.forms.fields.DropboxModel)
			model.setMultiple(true);

  		element = barmatz.forms.factories.DOMFactory.createPropertiesItemWarpper(model);
			
  		if(model instanceof barmatz.forms.fields.FieldModel)
  		{
			equal(element.nameField.value, model.getName());
			equal(element.labelField.value, model.getLabel());
			equal(element.mandatoryField.value, model.getMandatory().toString());
			equal(element.enabledField.value, model.getEnabled().toString());
			equal(element.widthField.value, model.getWidth());
		}
		
		if(model instanceof barmatz.forms.fields.FileFieldModel)
			equal(element.acceptField.value, model.getAccept().toString());
	
		if(model instanceof barmatz.forms.fields.TextFieldModel)
		{
			equal(element.descriptionField.value, model.getDescription());
			equal(element.maxField.value, model.getMax());
		}
		
		if(model instanceof barmatz.forms.fields.TextAreaFieldModel)
		{
			equal(element.rowsField.value, model.getRows());
			equal(element.colsField.value, model.getCols());
		}
		
		if(model instanceof barmatz.forms.fields.CheckboxFieldModel)
			equal(element.checkedField.value, model.getChecked().toString());
		
		if(model instanceof barmatz.forms.fields.DropboxModel)
		{
			equal(element.multipleField.value, model.getMultiple().toString());
			ok(element.editItemsButton);
		}
	
		if(model instanceof barmatz.forms.fields.FieldModel)
			ok(element.validationOptionsButton);
		
		if(model instanceof barmatz.forms.fields.HTMLContentModel)
			ok(element.editContentButton);
  	}
});
test('createPropertiesItemFieldWrapper', 30, function()
{
	types = ['string', 'number', 'array', 'boolean', 'button'];
	values = ['myvalue', 1, [], true, null];
	name = 'myname';
	label = 'mylabel';
	changeHandler = function(event)
	{
		ok(event);
	};
	
	for(i = 0; i < types.length; i++)
	{
		element = barmatz.forms.factories.DOMFactory.createPropertiesItemFieldWrapper(types[i], name, label, values[i], changeHandler);
		ok(element.wrapper);
		ok(element.field);
		
		switch(types[i])
		{
			case 'string':
			case 'number':
				equal(element.field.tagName, 'INPUT');
				break;
			case 'array':
			case 'boolean':
				equal(element.field.tagName, 'SELECT');
				break;
			case 'button':
				equal(element.field.tagName, 'BUTTON');
				ok(new RegExp(label).test(element.field.innerHTML));
				break;
		}
		
		equal(name, element.field.name);
		
		event = document.createEvent('Events');
		event.initEvent('change');
		element.field.dispatchEvent(event);
		
		if(types[i] != 'button')
			ok(new RegExp(label).test(element.wrapper.innerHTML));
	}
});
test('createDialog', function()
{
	title = 'createDialog';
	content = 'mycontent';
	open = true;
	container = document.getElementById('qunit-fixture');
	element = barmatz.forms.factories.DOMFactory.createDialog(title, content, open, container);
	equal(title, element.parentElement.getElementsByClassName('ui-dialog-titlebar')[0].getElementsByClassName('ui-dialog-title')[0].innerHTML);
	equal(content, element.innerHTML);
	equal(open, jQuery(element).dialog('isOpen'));
	ok(barmatz.utils.DOM.isChildOf(element, container));
});
test('isDialog', function()
{
	element = barmatz.forms.factories.DOMFactory.createDialog('isDialog', '', true, document.getElementById('qunit-fixture'));
	equal(true, barmatz.forms.factories.DOMFactory.isDialog(element));
	element = document.createElement('div');
	equal(false, barmatz.forms.factories.DOMFactory.isDialog(element));
});
test('destroyDialog', function()
{
	element = barmatz.forms.factories.DOMFactory.createDialog('destroyDialog', '', true, document.getElementById('qunit-fixture'));
	barmatz.forms.factories.DOMFactory.destroyDialog(element);
	ok(!barmatz.forms.factories.DOMFactory.isDialog(element));
	ok(!element.parentElement);
});
test('createNewFieldDialogWrapper', function()
{
	model = new barmatz.forms.fields.FieldModel('mytype', 'myname');
	model.setLabel('mylabel');
	element = barmatz.forms.factories.DOMFactory.createNewFieldDialogWrapper(model, true, document.getElementById('qunit-fixture'));
	ok(element.dialog);
	equal(model.getName(), element.nameField.value);
	equal(model.getLabel(), element.labelField.value);
});
test('createPromptDialog', 1, function()
{
	confirmHandler = function(event)
	{
		ok(event);
	};
	element = barmatz.forms.factories.DOMFactory.createPromptDialog('createPromptDialog', '', confirmHandler, true, document.getElementById('qunit-fixture'));
	
	event = document.createEvent('Events');
	event.initEvent('click');
	element.parentElement.getElementsByClassName('ui-dialog-buttonpane')[0].getElementsByClassName('ui-dialog-buttonset')[0].getElementsByTagName('button')[0].dispatchEvent(event);
});
test('createExportPromptDialog', function()
{
	fingerprint = 'myfingerprint';
	loadingMessage = 'myloadingmessage';
	element = barmatz.forms.factories.DOMFactory.createExportPromptDialog(fingerprint, loadingMessage, true, document.getElementById('qunit-fixture'));
	ok(new RegExp(fingerprint).test(element.innerHTML));
	ok(new RegExp(loadingMessage).test(element.innerHTML));
});
test('createChangePropertyPromptDialogWrapper', 3, function()
{
	key = 'mykey';
	value = 'myvalue';
	confirmHandler = function(event)
	{
		ok(event);
	};
	element = barmatz.forms.factories.DOMFactory.createChangePropertyPromptDialogWrapper('createChangePropertyPromptDialogWrapper', key, value, confirmHandler, true, document.getElementById('qunit-fixture'));
	
	equal(element.wrapper.getElementsByTagName('label')[0].innerHTML, key);
	equal(element.field.value, value);
	
	event = document.createEvent('Events');
	event.initEvent('click');
	element.dialog.parentElement.getElementsByClassName('ui-dialog-buttonpane')[0].getElementsByClassName('ui-dialog-buttonset')[0].getElementsByTagName('button')[0].dispatchEvent(event);	
});
test('createAlertPromptDialog', function()
{
	element = barmatz.forms.factories.DOMFactory.createAlertPromptDialog('createAlertPromptDialog', '', true, document.getElementById('qunit-fixture'));
	
	equal(true, barmatz.forms.factories.DOMFactory.isDialog(element));
	
	event = document.createEvent('Events');
	event.initEvent('click');
	element.parentElement.getElementsByClassName('ui-dialog-buttonpane')[0].getElementsByClassName('ui-dialog-buttonset')[0].getElementsByTagName('button')[0].dispatchEvent(event);
	
	equal(false, barmatz.forms.factories.DOMFactory.isDialog(element));
});
test('createConfirmPromptDialog', 1, function()
{
	confirmHandler = function(event)
	{
		ok(event);
	};
	element = barmatz.forms.factories.DOMFactory.createConfirmPromptDialog('', confirmHandler, true, document.getElementById('qunit-fixture'));
	
	event = document.createEvent('Events');
	event.initEvent('click');
	element.parentElement.getElementsByClassName('ui-dialog-buttonpane')[0].getElementsByClassName('ui-dialog-buttonset')[0].getElementsByTagName('button')[0].dispatchEvent(event);
});
test('createPanels', function()
{
	className = 'myclassname';
	content = 'mycontent';
	panels = [new barmatz.forms.ui.PanelModel(className, content)];
	element = barmatz.forms.factories.DOMFactory.createPanels(panels);

	for(i = 0; i < panels.length; i++)
	{
		equal(element.getElementsByTagName('tbody')[0].getElementsByTagName('td')[i].className, className);
		equal(element.getElementsByTagName('tbody')[0].getElementsByTagName('td')[i].innerHTML, content);
	}
});
test('createMenuWrapper', function()
{
	element = barmatz.forms.factories.DOMFactory.createMenuWrapper();
	ok(element.wrapper);
	ok(element.icon);
	ok(element.menu);
});
test('createMenuIcon', function()
{
	element = barmatz.forms.factories.DOMFactory.createMenuIcon();
	ok(element);
});
test('createMenu', function()
{
	element = barmatz.forms.factories.DOMFactory.createMenu();
	ok(element);
});
test('createMenuItem', 2, function()
{
	label = 'mylabel';
	clickHandler = function(event)
	{	
		ok(event);
	};
	model = new barmatz.forms.ui.MenuItemModel(label, clickHandler);
	element = barmatz.forms.factories.DOMFactory.createMenuItem(model);
	equal(label, element.getElementsByTagName('a')[0].innerHTML);
	
	event = document.createEvent('MouseEvents');
	event.initEvent('click');
	element.getElementsByTagName('a')[0].dispatchEvent(event);
});
test('createIconButton', function()
{
	name = 'myname';
	element = barmatz.forms.factories.DOMFactory.createIconButton(name);
	ok(new RegExp(name).test(element.innerHTML));
});
test('createEditButton', function()
{
	element = barmatz.forms.factories.DOMFactory.createEditButton();
	ok(element);
});
test('createDeleteButton', function()
{
	element = barmatz.forms.factories.DOMFactory.createDeleteButton();
	ok(element);
});
test('createSettingsButton', function()
{
	element = barmatz.forms.factories.DOMFactory.createSettingsButton();
	ok(element);
});
test('createLoadingDialog', function()
{
	element = barmatz.forms.factories.DOMFactory.createLoadingDialog(document.getElementById('qunit-fixture'));
	ok(element);
});
test('destroyLoadingDialog', function()
{
	element = barmatz.forms.factories.DOMFactory.createLoadingDialog(document.getElementById('qunit-fixture'));
	ok(element);
	barmatz.forms.factories.DOMFactory.destroyLoadingDialog(element);
	ok(!element.parentElement);
});
test('createLoginFormDialogWrapper', function()
{
	element = barmatz.forms.factories.DOMFactory.createLoginFormDialogWrapper(true, document.getElementById('qunit-fixture'));
	ok(element.dialog);
	ok(element.userNameField);
	ok(element.passwordField);
	ok(element.errorField);
	ok(element.submitButton);
});
test('createCollectionListDialog', function()
{
	className = 'myclass';
	content = 'mycontent';
	element = barmatz.forms.factories.DOMFactory.createCollectionListDialog('createCollectionListDialog', content, className, true, document.getElementById('qunit-fixture'));
	equal(element.innerHTML, content);
	ok(new RegExp(className).test(element.parentElement.className));
});
test('createUserFormsListDialog', function()
{
	element = barmatz.forms.factories.DOMFactory.createUserFormsListDialog(true, document.getElementById('qunit-fixture'));
	ok(element);
});
test('createUserFormsList', function()
{
	element = barmatz.forms.factories.DOMFactory.createUserFormsList();
	ok(element);
});
test('createUserFormsListItem', function()
{
	for(i = 0; i < 10; i++)
	{
		element = barmatz.forms.factories.DOMFactory.createUserFormsListItem(i);
		ok(new RegExp(i % 2 ? 'odd' : 'even').test(element.className));
	}
});
test('createDropboxItemsListDialogWrapper', function()
{
	element = barmatz.forms.factories.DOMFactory.createDropboxItemsListDialogWrapper(true, document.getElementById('qunit-fixture'));
	ok(element.dialog);
	ok(element.addButton);
	ok(element.resetButton);
});
test('createDropboxItemsList', function()
{
	element = barmatz.forms.factories.DOMFactory.createDropboxItemsList();
	ok(element);
});
test('createDropboxItemDialog', 3, function()
{
	label = 'mylabel';
	value = 'myvalue';
	confirmHandler = function(event)
	{
		ok(event);
	};
	element = barmatz.forms.factories.DOMFactory.createDropboxItemDialog(label, value, confirmHandler, true, document.getElementById('qunit-fixture'));
	equal(label, element.getElementsByTagName('table')[0].getElementsByTagName('tbody')[0].getElementsByTagName('tr')[0].getElementsByTagName('input')[0].value);
	equal(value, element.getElementsByTagName('table')[0].getElementsByTagName('tbody')[0].getElementsByTagName('tr')[1].getElementsByTagName('input')[0].value);

	event = document.createEvent('Events');
	event.initEvent('click');
	element.parentElement.getElementsByClassName('ui-dialog-buttonpane')[0].getElementsByClassName('ui-dialog-buttonset')[0].getElementsByTagName('button')[0].dispatchEvent(event);
});
test('createDropboxItemsListItemWrapper', function()
{
	for(i = 0; i < 10; i++)
	{
		element = barmatz.forms.factories.DOMFactory.createDropboxItemsListItemWrapper(i);
		ok(new RegExp(i % 2 ? 'odd' : 'even').test(element.wrapper.className));
		ok(element.labelElement, element.valueElement, element.editButton, element.deleteButton);
		ok(element.valueElement);
		ok(element.editButton);
		ok(element.deleteButton);
	}	
});
test('createTable', function()
{
	headClassName = 'myheadclass';
	headColumns = ['mycol1', 'mycol2', 'mycol3', 'mycol4'];
	headColumnsClassNames = ['mycol1classname', 'mycol2classname'];
	headRowClassName = 'myheadrowclassname';
	bodyClassName = 'mybodyclassname';
	bodyRows = [['myrow1col1', 'myrow1col2', 'myrow1col3', 'myrow1col4'], ['myrow2col1', 'myrow2col2', 'myrow2col3', 'myrow2col4']];
	bodyRowsClassNames = ['mybodyrow1classname', 'mybodyrow2classname'];
	bodyColumnsClassNames = ['mybodycol1classname', 'mybodycol2classname'];
	className = 'myclassname';
	
	options = new barmatz.forms.ui.TableOptions();
	options.setHeadClassName(headClassName);
	options.setHeadColumns(headColumns);
	options.setHeadColumnsClassNames(headColumnsClassNames);
	options.setHeadRowClassName(headRowClassName);
	options.setBodyClassName(bodyClassName);
	options.setBodyRows(bodyRows);
	options.setBodyRowsClassNames(bodyRowsClassNames);
	options.setBodyColumnsClassNames(bodyColumnsClassNames);
	options.setClassName(className);
	
	element = barmatz.forms.factories.DOMFactory.createTable(options);
	
	for(i = 0; i < headColumns.length; i++)
	{
		equal(headClassName, element.getElementsByTagName('thead')[0].className);
		equal(headColumns[i], element.getElementsByTagName('thead')[0].getElementsByTagName('tr')[0].getElementsByTagName('th')[i].innerHTML);
		equal(headColumnsClassNames[i % headColumnsClassNames.length], element.getElementsByTagName('thead')[0].getElementsByTagName('tr')[0].getElementsByTagName('th')[i].className);
		equal(headRowClassName, element.getElementsByTagName('thead')[0].getElementsByTagName('tr')[0].className);
	}
	
	for(i = 0; i < bodyRows.length; i++)
	{
		equal(bodyClassName, element.getElementsByTagName('tbody')[0].className);
		equal(bodyRowsClassNames[i % bodyRowsClassNames.length], element.getElementsByTagName('tbody')[0].getElementsByTagName('tr')[i].className);
		
		for(c = 0; c < bodyRows[i].length; c++)
		{
			equal(bodyRows[i][c], element.getElementsByTagName('tbody')[0].getElementsByTagName('tr')[i].getElementsByTagName('td')[c].innerHTML);
			equal(bodyColumnsClassNames[c % bodyColumnsClassNames.length], element.getElementsByTagName('tbody')[0].getElementsByTagName('tr')[i].getElementsByTagName('td')[c].className);
		}
	}
	
	equal(className, element.className);
});
test('createTableRow', function()
{
	content = ['mycol1', 'mycol2', 'mycol3', 'mycol4'];
	contentClassNames = ['mycol1classname', 'mycol2classname'];
	className = 'myclassname';
	
	element = barmatz.forms.factories.DOMFactory.createTableRow(content, contentClassNames, className, true);
	
	for(i = 0; i < element.children.length; i++)
		equal(element.children[i].tagName, 'TH');
	
	element = barmatz.forms.factories.DOMFactory.createTableRow(content, contentClassNames, className, false);
	equal(element.className, className);

	for(i = 0; i < element.children.length; i++)
		equal(element.children[i].tagName, 'TD');
	
	
	for(i = 0; i < content.length; i++)
	{
		equal(content[i], element.getElementsByTagName('td')[i].innerHTML);
		equal(contentClassNames[i % contentClassNames.length], element.getElementsByTagName('td')[i].className);
	}
});
test('createTableColumn', function()
{
	content = 'mycontent';
	className = 'myclassname';
	
	element = barmatz.forms.factories.DOMFactory.createTableColumn(content, className, true);
	equal('TH', element.tagName);
	
	element = barmatz.forms.factories.DOMFactory.createTableColumn(content, className, false);
	equal('TD', element.tagName);
	equal(className, element.className);
	equal(content, element.innerHTML);
});
test('createFormPropertiesDialogWrapper', 2, function()
{
	model = new barmatz.forms.FormModel();
	confirmHandler = function(event)
	{
		ok(event);
	};
	element = barmatz.forms.factories.DOMFactory.createFormPropertiesDialogWrapper(model, confirmHandler, true, document.getElementById('qunit-fixture'));
	ok(element);
	
	event = document.createEvent('Events');
	event.initEvent('click');
	element.dialog.parentElement.getElementsByClassName('ui-dialog-buttonpane')[0].getElementsByClassName('ui-dialog-buttonset')[0].getElementsByTagName('button')[0].dispatchEvent(event);
});
test('createFormPropertiesWrapper', function()
{
	model = new barmatz.forms.FormModel();
	model.setName('myname');
	model.setSubmitButtonLabel('mysubmitbuttonlabel');
	model.setTargetEmail('mytargetemail');
	model.setDirection(barmatz.forms.Directions.LTR);
	model.setLanguage('en');
	model.setLayoutId(1);
	model.setStylesheets([]);
	model.setMethod(barmatz.forms.Methods.GET);
	model.setEncoding(barmatz.net.Encoding.FORM);
	model.setExternalAPI('myexternalapi');
	
	element = barmatz.forms.factories.DOMFactory.createFormPropertiesWrapper(model);
	
	equal(element.nameField.value, model.getName());
	equal(element.submitButtonLabelField.value, model.getSubmitButtonLabel());
	equal(element.targetEmailField.value, model.getTargetEmail());
	equal(element.directionField.value, model.getDirection());
	equal(element.languageField.value, model.getLanguage());
	equal(element.layoutIdField.value, model.getLayoutId());
	equal(element.stylesheetsField.value, model.getStylesheets());
	equal(element.methodField.value, model.getMethod());
	equal(element.encodingField.value, model.getEncoding());
	equal(element.externalAPIField.value, model.getExternalAPI());
	ok(element.wrapper);
});
test('createFieldValidationOptionsDialogWrapper', function()
{
	model = new barmatz.forms.fields.FieldModel('', '');
	element = barmatz.forms.factories.DOMFactory.createFieldValidationOptionsDialogWrapper(model, true, document.getElementById('qunit-fixture'));
	ok(element.dialog);
	ok(element.options);
});
test('createFieldValidatorWrapper', function()
{
	bits = [
		barmatz.forms.Validator.EQUALS,
		barmatz.forms.Validator.VALID_EMAIL,
		barmatz.forms.Validator.VALID_PHONE,
		barmatz.forms.Validator.MIN_LENGTH,
		barmatz.forms.Validator.MAX_LENGTH,
		barmatz.forms.Validator.EXACT_LENGTH,
		barmatz.forms.Validator.GREATER_THAN,
		barmatz.forms.Validator.LESSER_THAN,
		barmatz.forms.Validator.DIGITS_ONLY,
		barmatz.forms.Validator.NOT_DIGITS        
	];
	
	for(i = 0; i < bits.length; i++)
	{
		element = barmatz.forms.factories.DOMFactory.createFieldValidatorWrapper(bits[i]);
		ok(element.wrapper);
		ok(element.checkbox);
	}
});
test('createFormFieldErrorMessageElement', function()
{
	element = barmatz.forms.factories.DOMFactory.createFormFieldErrorMessageElement();
	ok(element);
});
asyncTest('createHTMLContentEditorDialogWrapper', 3, function()
{
	timer = setTimeout(start, 3000);
	confirmHandler = function(event)
	{
		ok(event);
	};
	initHandler = function(event)
	{
		clearTimeout(timer);
		barmatz.forms.factories.DOMFactory.destroyHTMLContentEditor(event.target);

		event = document.createEvent('Events');
		event.initEvent('click');
		element.dialog.parentElement.getElementsByClassName('ui-dialog-buttonpane')[0].getElementsByClassName('ui-dialog-buttonset')[0].getElementsByTagName('button')[0].dispatchEvent(event);
		start();
	};
	content = 'mycontent';
	element = barmatz.forms.factories.DOMFactory.createHTMLContentEditorDialogWrapper(content, confirmHandler, true, document.getElementById('qunit-fixture'), initHandler);
	ok(element.dialog);
	ok(new RegExp(content).test(element.editor.innerHTML));
});
asyncTest('createHTMLContentEditor', 2, function()
{
	timer = setTimeout(start, 3000);
	content = 'mycontent';
	initHandler = function()
	{
		ok(true);
		clearTimeout(timer);
		start();
	};
	element = barmatz.forms.factories.DOMFactory.createHTMLContentEditor(document.getElementById('qunit-fixture'), content, initHandler);
	equal(content, element.value);
});
test('createLeadsFormsListElement', function()
{
	element = barmatz.forms.factories.DOMFactory.createLeadsFormsListElement();
	ok(element);
});
test('createLeadsFormsListItem', function()
{
	model = new barmatz.forms.FormModel();
	model.setName('myname');
	element = barmatz.forms.factories.DOMFactory.createLeadsFormsListItem(model);
	equal(model.getName(), element.innerHTML);
});
test('createLeadsListWrapper', function()
{
	element = barmatz.forms.factories.DOMFactory.createLeadsListWrapper();
	ok(element.wrapper);
	ok(element.table);
	ok(element.body);
});
test('createLeadsListItem', function()
{
	model = new barmatz.forms.LeadModel();
	model.setCreated(new Date());
	model.setIP('0.0.0.0');
	model.setReferer('protocol://my.domain');
	
	for(i = 0; i < 10; i++)
	{
		element = barmatz.forms.factories.DOMFactory.createLeadsListItem(model, i);
		ok(new RegExp(barmatz.utils.Date.toString(model.getCreated(), 'dd/mm/yyyy hh:ii')).test(element.innerHTML));
		ok(new RegExp(model.getReferer()).test(element.innerHTML));
		ok(new RegExp(model.getIP()).test(element.innerHTML));
		ok(new RegExp(i % 2 ? 'odd' : 'even').test(element.className));
	}
});
module('barmatz.forms.factories.ModelFactory', {
	setup: function()
	{
		model = null;
	},
	teardown: function()
	{
		delete model;
	}
});
test('createUserModel', function()
{
	model = barmatz.forms.factories.ModelFactory.createUserModel();
	ok(model);
});
test('createUserModel', function()
{
	types = [
		barmatz.forms.fields.FieldTypes.HTML_CONTENT,
		barmatz.forms.fields.FieldTypes.TEXT_AREA,
		barmatz.forms.fields.FieldTypes.TEXT_FIELD,
		barmatz.forms.fields.FieldTypes.DROPBOX,
		barmatz.forms.fields.FieldTypes.PASSWORD,
		barmatz.forms.fields.FieldTypes.CHECKBOX,
		barmatz.forms.fields.FieldTypes.RADIO,
		barmatz.forms.fields.FieldTypes.FILE,
		barmatz.forms.fields.FieldTypes.HIDDEN,
		barmatz.forms.fields.FieldTypes.PHONE
	];
	name = 'myname';
	
	for(i = 0; i < types.length; i++)
	{
		model = barmatz.forms.factories.ModelFactory.createFieldModel(types[i], name);
		equal(types[i], model.getType());
		
		if(!(model instanceof barmatz.forms.fields.HTMLContentModel))
			equal(name, model.getName());
	}
});
test('createToolboxModel', function()
{
	model = barmatz.forms.factories.ModelFactory.createToolboxModel();
	ok(model);
});
test('createToolboxItemModel', function()
{
	type = 'mytype';
	label = 'mylabel';
	fieldModel = new barmatz.forms.fields.FieldModel('', '');
	model = barmatz.forms.factories.ModelFactory.createToolboxItemModel(type, label, fieldModel);
	equal(type, model.getType());
	equal(label, model.getLabel());
	strictEqual(fieldModel, model.getFieldModel());
});
test('createCollectionModel', function()
{
	model = barmatz.forms.factories.ModelFactory.createCollectionModel();
	ok(model);
});
test('createDropboxItemModel', function()
{
	label = 'mylabel';
	value = 'myvalue';
	model = barmatz.forms.factories.ModelFactory.createDropboxItemModel(label, value);
	equal(label, model.getLabel());
	equal(value, model.getValue());
});
test('createDropboxModel', function()
{
	name = 'myname';
	items = [];
	model = barmatz.forms.factories.ModelFactory.createDropboxModel(name, items);
	equal(name, model.getName());
	equal(items.length, model.getNumItems());
});
test('createBuilderPageModel', function()
{
	model = barmatz.forms.factories.ModelFactory.createBuilderPageModel();
	ok(model);
});
test('createMenuModel', function()
{
	model = barmatz.forms.factories.ModelFactory.createMenuModel();
	ok(model);
});
test('createMenuItemModel', 2, function()
{
	label = 'mylabel';
	clickHandler = function(event)
	{
		ok(event);
	};

	event = document.createEvent('MouseEvents');
	event.initEvent('click');
	
	model = barmatz.forms.factories.ModelFactory.createMenuItemModel(label, clickHandler);
	model.getClickHandler().call(model, event);
	equal(label, model.getLabel());
});
test('createFormModel', function()
{
	model = barmatz.forms.factories.ModelFactory.createFormModel();
	ok(model);
});
test('createPanelModel', function()
{
	className = 'myclassname';
	model = barmatz.forms.factories.ModelFactory.createPanelModel(className, '');
	equal(className, model.getClassName());
});
test('createValidatorModel', function()
{
	data = {code: 'mycode'};
	model = barmatz.forms.factories.ModelFactory.createValidatorModel(data);
	strictEqual(data.code, model.getCode());
});
test('createLeadModel', function()
{
	model = barmatz.forms.factories.ModelFactory.createLeadModel();
	ok(model);
});
module('barmatz.forms.fields.CheckboxFieldModel', {
	setup: function()
	{
		model = new barmatz.forms.fields.CheckboxFieldModel('myname');
	},
	teardown: function()
	{
		delete model;
	}
});
test('getChecked', function()
{
	equal(false, model.getChecked());
});
test('setChecked', function()
{
	model.setChecked(true);
	equal(true, model.getChecked());
});
test('getValue', function()
{
	equal('', model.getValue());
});
test('setValue', function()
{
	value = 'myvalue';
	model.setValue(value);
	model.setChecked(true);
	equal(model.getValue(), value);
	model.setChecked(false);
	equal(model.getValue(), '');
});
test('clone', function()
{
	var clone = model.clone();
	notStrictEqual(model, clone);
	equal(model.getLabel(), clone.getLabel());
	equal(model.getMandatory(), clone.getMandatory());
	equal(model.getValue(), clone.getValue());
	equal(model.getEnabled(), clone.getEnabled());
	notStrictEqual(model.getValidator(), clone.getValidator());
	equal(model.getChecked(), clone.getChecked());
});
module('barmatz.forms.fields.DropboxItemModel', {
	setup: function()
	{
		label = 'mylabel';
		value = 'myvalue';
		model = new barmatz.forms.fields.DropboxItemModel(label, value);
	},
	teardown: function()
	{
		delete label;
		delete value;
		delete model;
	}
});
test('getLabel', function()
{
	equal(label, model.getLabel());
});
test('setLabel', function()
{
	label = 'mylabel2';
	model.setLabel(label);
	equal(label, model.getLabel());
});
test('getValue', function()
{
	equal(value, model.getValue());
});
test('setValue', function()
{
	value = 'myvalue2';
	model.setValue(value);
	equal(value, model.getValue());
});
test('toString', function()
{
	ok(model.toString());
});
module('barmatz.forms.fields.DropboxItemsListController', {
	setup: function()
	{
		model = new barmatz.forms.fields.DropboxModel('myname', [new barmatz.forms.fields.DropboxItemModel('', '')]);
		view = document.createElement('div');
		addButtonView = document.createElement('div');
		resetButtonView = document.createElement('div');
		controller = new barmatz.forms.fields.DropboxItemsListController(model, view, addButtonView, resetButtonView, document.getElementById('qunit-fixture'));
	},
	teardown: function()
	{
		delete model;
		delete view;
		delete addButtonView;
		delete resetButtonView;
		delete controller;
	}
});
test('conctructor', function()
{
	equal(view.children.length, model.getNumItems());
	notEqual('none', resetButtonView.style.display);
	
	model.addItem(new barmatz.forms.fields.DropboxItemModel('', ''));
	equal(view.children.length, model.getNumItems());
	
	model.removeItemAt(0);
	equal(view.children.length, model.getNumItems());
	
	event = document.createEvent('MouseEvents');
	event.initEvent('click');
	ok(addButtonView.dispatchEvent(event));
	
	resetButtonView.dispatchEvent(event)
	equal(view.children.length, model.getNumItems());
	
	equal('none', resetButtonView.style.display);
});
module('barmatz.forms.fields.DropboxItemsListItemController', {
	setup: function()
	{
		label = 'mylabel';
		value = 'myvalue';
		model = new barmatz.forms.fields.DropboxItemModel(label, value);
		labelView = document.createElement('div');
		valueView = document.createElement('div');
		editButtonView = document.createElement('div');
		controller = new barmatz.forms.fields.DropboxItemsListItemController(model, labelView, valueView, editButtonView, document.getElementById('qunit-fixture'));
	},
	teardown: function()
	{
		delete label;
		delete value;
		delete model;
		delete labelView;
		delete valueView;
		delete editButtonView;
		delete controller;
	}
});
test('conctructor', function()
{
	equal(label, labelView.innerHTML);
	equal(value, valueView.innerHTML);
	
	label = 'mylabel2';
	model.setLabel(label);
	equal(label, labelView.innerHTML);
	
	value = 'myvalue2';
	model.setValue(value);
	equal(label, labelView.innerHTML);
	
	event = document.createEvent('MouseEvents');
	event.initEvent('click');
	ok(editButtonView.dispatchEvent(event));
});
module('barmatz.forms.fields.DropboxModel', {
	setup: function()
	{
		items = [
			new barmatz.forms.fields.DropboxItemModel('mylabel1', 'myvalue1'),
			new barmatz.forms.fields.DropboxItemModel('mylabel2', 'myvalue2')
		];
		model = new barmatz.forms.fields.DropboxModel('myname', items);
	},
	teardown: function()
	{
		delete items;
		delete model;
	}
});
test('conctructor', function()
{
	equal(items.length, model.getNumItems());
});
test('getMultiple', function()
{
	equal(false, model.getMultiple());
}); 
test('setMultiple', function()
{
	model.setMultiple(true);
	equal(true, model.getMultiple());
}); 
test('getNumItems', function()
{
	equal(items.length, model.getNumItems());
}); 
test('addItem', function()
{
	model.addItem(new barmatz.forms.fields.DropboxItemModel('mylabel3', 'myvalue3'));
	equal(items.length + 1, model.getNumItems());
}); 
test('addItemAt', function()
{
	item = new barmatz.forms.fields.DropboxItemModel('mylabel3', 'myvalue3');
	index = 0;
	model.addItemAt(item, index);
	equal(item, model.getItemAt(index));
}); 
test('removeItem', function()
{
	model.removeItem(items[0]);
	equal(items.length - 1, model.getNumItems());
}); 
test('removeItemAt', function()
{
	model.removeItemAt(0);
	equal(model.getNumItems(), items.length - 1);
}); 
test('getItemAt', function()
{
	for(i = 0; i < items.length; i++)
		strictEqual(items[i], model.getItemAt(i));
}); 
test('getItemIndex', function()
{
	for(i = 0; i < items.length; i++)
		equal(i, model.getItemIndex(items[i]));
}); 
test('setItemIndex', function()
{
	model.setItemIndex(items[0], 1);
	equal(0, model.getItemIndex(items[1]));
	equal(1, model.getItemIndex(items[0]));
}); 
test('forEach', 2, function()
{
	model.forEach(function(item, index, collection)
	{
		ok(item);
	});
}); 
test('find', 1, function()
{
	equal(model.find(function(item)
	{
		return item.getLabel() == items[0].getLabel();
	})[0].getLabel(), items[0].getLabel());
}); 
test('clone', function()
{
	clone = model.clone();
	notStrictEqual(model, clone);
	equal(model.getLabel(), clone.getLabel());
	equal(model.getMandatory(), clone.getMandatory());
	equal(model.getValue(), clone.getValue());
	equal(model.getEnabled(), clone.getEnabled());
	notStrictEqual(model.getValidator(), clone.getValidator());
	equal(model.getMultiple(), clone.getMultiple());
});
test('toString', function()
{
	ok(model.toString());
});
module('barmatz.forms.fields.FieldController', {
	setup: function()
	{
		model = new barmatz.forms.fields.TextFieldModel('myname');
		fieldView = document.createElement('input');
		errorMessageView = document.createElement('div');
		controller = new barmatz.forms.fields.FieldController(model, fieldView, errorMessageView);
	},
	teardown: function()
	{
		delete model;
		delete fieldView;
		delete errorMessageView;
		delete controller;
	}
});
test('conctructor', function()
{
	equal(errorMessageView.innerHTML, 'invalid');
	equal(errorMessageView.style.visibility, 'hidden');
	
	model.setValue('myvalue');
	equal(fieldView.value, model.getValue());
	
	model.setValue('');
	model.setDescription('mydescription');
	equal(fieldView.value, model.getDescription());
	
	model.dispatchEvent(new barmatz.events.FieldEvent(barmatz.events.FieldEvent.INVALID, barmatz.forms.Validator.NOT_EMPTY));
	notEqual(errorMessageView.innerHTML.length, 0);
	notEqual(errorMessageView.style.visibility, 'hidden');
	
	model.dispatchEvent(new barmatz.events.FieldEvent(barmatz.events.FieldEvent.VALID));
	equal(errorMessageView.innerHTML.length, 0);
	equal(errorMessageView.style.visibility, 'hidden');
	
	model.setValue('');

	event = document.createEvent('Events');
	event.initEvent('focus');
	fieldView.dispatchEvent(event);
	equal(fieldView.value, '');

	event = document.createEvent('Events');
	event.initEvent('blur');
	fieldView.dispatchEvent(event);
	equal(fieldView.value, model.getDescription());
	
	model.setValue('myvalue');
	
	event = document.createEvent('Events');
	event.initEvent('focus');
	equal(fieldView.value, model.getValue());
	
	event = document.createEvent('Events');
	event.initEvent('blur');
	equal(fieldView.value, model.getValue());
});
module('barmatz.forms.fields.FieldModel', {
	setup: function()
	{
		type = 'mytype';
		name = 'myname';
		model = new barmatz.forms.fields.FieldModel(type, name);
	},
	teardown: function()
	{
		delete type;
		delete name;
		delete model;
	}
});
test('getName', function()
{
	equal(name, model.getName());
});
test('setName', function()
{
	name = 'myname2';
	model.setName(name);
	equal(name, model.getName());
});
test('getLabel', function()
{
	equal('', model.getLabel());
});
test('setLabel', function()
{
	label = 'mylabel';
	model.setLabel(label);
	equal(label, model.getLabel());
});
test('getMandatory', function()
{
	equal(false, model.getMandatory());
});
test('setMandatory', function()
{
	model.setMandatory(true);
	equal(true, model.getMandatory());
});
test('getValue', function()
{
	equal('', model.getValue());
});
test('setValue', function()
{
	value = 'myvalue';
	model.setValue(value);
	equal(value, model.getValue());
});
test('getEnabled', function()
{
	equal(true, model.getEnabled());
});
test('setEnabled', function()
{
	model.setEnabled(false);
	equal(false, model.getEnabled());
});
test('getAvailableValidators', function()
{
	ok(model.getAvailableValidators());
});
test('getValidator', function()
{
	ok(model.getValidator() instanceof barmatz.forms.fields.ValidatorModel);
});
test('setValidator', function()
{
	validator = new barmatz.forms.fields.ValidatorModel();
	model.setValidator(validator);
	strictEqual(validator, model.getValidator());
});
test('getWidth', function()
{
	 deepEqual(model.getWidth(), NaN);
});
test('setWidth', function()
{
	width = 1;
	model.setWidth(width);
	equal(model.getWidth(), width);
});
test('validate', 52, function()
{
	model.addEventListener(barmatz.events.FieldEvent.INVALID, function(event)
	{
		ok(event);
	});
	model.addEventListener(barmatz.events.FieldEvent.VALID, function(event)
	{
		ok(event);
	});
	
	equal(true, model.validate());
	
	model.setValue('');
	model.setMandatory(true);
	equal(false, model.validate());
	model.setMandatory(false);
	
	assertions = [
		[
		 	barmatz.forms.Validator.NONE,
			['', 'myvalue'],
			[true, true]
		],
		[
		 	barmatz.forms.Validator.NOT_EMPTY,
		 	['', 'foo'],
		 	[false, true]
		],
		[
		 	barmatz.forms.Validator.EQUALS,
		 	['foo', 'bar'],
		 	[false, true],
		 	{equals: 'bar'}
		],
		[
		 	barmatz.forms.Validator.VALID_EMAIL,
		 	['plainaddress', 'email@example.com'],
		 	[false, true]
		],
		[
		 	barmatz.forms.Validator.VALID_PHONE,
		 	['02123456', '035402375'],
		 	[false, true]
		],
		[
		 	barmatz.forms.Validator.MIN_LENGTH,
		 	['1234', '12345'],
		 	[false, true],
		 	{minLength: 5}
		],
		[
		 	barmatz.forms.Validator.MAX_LENGTH,
		 	['123456', '12345'],
		 	[false, true],
		 	{maxLength: 5}
		],
		[
		 	barmatz.forms.Validator.EXACT_LENGTH,
		 	['1234', '12345'],
		 	[false, true],
		 	{exactLength: 5}
		],
		[
		 	barmatz.forms.Validator.GREATER_THAN,
		 	['1', '3'],
		 	[false, true],
		 	{greaterThan: 2}
		],
		[
		 	barmatz.forms.Validator.LESSER_THAN,
		 	['3', '1'],
		 	[false, true],
		 	{lesserThan: 2}
		],
		[
		 	barmatz.forms.Validator.DIGITS_ONLY,
		 	['1a', '1'],
		 	[false, true]
		],
		[
		 	barmatz.forms.Validator.NOT_DIGITS,
		 	['1a', 'a'],
		 	[false, true]
		]
	];
	
	for(i = 0; i < assertions.length; i++)
	{
		model.getValidator().setCode(assertions[i][0]);
		
		if(assertions[i][3])
			for(j in assertions[i][3])
				model.getValidator()[j] = assertions[i][3][j];
		
		for(c = 0; c < assertions[i][1].length; c++)
		{
			model.setValue(assertions[i][1][c]);
			equal(model.validate(), assertions[i][2][c]);
		}
	}
	
	
});
test('clone', function()
{
	var clone = model.clone();
	notStrictEqual(model, clone);
	equal(model.getLabel(), clone.getLabel());
	equal(model.getMandatory(), clone.getMandatory());
	equal(model.getValue(), clone.getValue());
	equal(model.getEnabled(), clone.getEnabled());
	notStrictEqual(model.getValidator(), clone.getValidator());
	deepEqual(model.getWidth(), clone.getWidth());
});
module('barmatz.forms.fields.FieldValidationOptionsController', {
	setup: function()
	{
		model = new barmatz.forms.fields.FieldModel('mytype', 'myname');
		views = {};
		views[barmatz.forms.Validator.NOT_EMPTY] = getCheckbox();
		views[barmatz.forms.Validator.EQUALS] = getCheckbox();
		controller = new barmatz.forms.fields.FieldValidationOptionsController(model, views, document.getElementById('qunit-fixture'));
		
		function getCheckbox()
		{
			var element = document.createElement('input');
			element.type = 'checkbox';
			return element;
		}
	},
	teardown: function()
	{
		delete model;
		delete views;
		delete controller;
	}
});
test('conctructor', function()
{
	for(i in views)
	{
		equal(0, model.getValidator().getCode());
		
		event = document.createEvent('MouseEvents');
		event.initEvent('click');

		views[i].dispatchEvent(event);
		equal(true, barmatz.utils.Bitwise.contains(model.getValidator().getCode(), i));
		
		views[i].dispatchEvent(event);
		equal(false, barmatz.utils.Bitwise.contains(model.getValidator().getCode(), i));
	}
});
module('barmatz.forms.fields.PasswordFieldModel', {
	setup: function()
	{
		model = new barmatz.forms.fields.PasswordFieldModel('');
	},
	teardown: function()
	{
		delete model;
	}
});
test('clone', function()
{
	var clone = model.clone();
	notStrictEqual(model, clone);
	equal(model.getLabel(), clone.getLabel());
	equal(model.getMandatory(), clone.getMandatory());
	equal(model.getValue(), clone.getValue());
	equal(model.getEnabled(), clone.getEnabled());
	notStrictEqual(model.getValidator(), clone.getValidator());
	deepEqual(model.getMax(), clone.getMax());
	equal(model.getDescription(), clone.getDescription());
});
module('barmatz.forms.fields.HTMLContentModel', {
	setup: function()
	{
		model = new barmatz.forms.fields.HTMLContentModel();
	},
	teardown: function()
	{
		delete model;
	}
});
test('getContent', function()
{
	equal('', model.getContent());
});
test('setContent', function()
{
	content = 'mycontent';
	model.setContent(content);
	equal(content, model.getContent());
});
test('clone', function()
{
	var clone = model.clone();
	notStrictEqual(model, clone);
	equal(model.getType(), clone.getType());
	equal(model.getContent(), clone.getContent());
});
module('barmatz.forms.fields.HiddenFieldModel', {
	setup: function()
	{
		model = new barmatz.forms.fields.HiddenFieldModel('');
	},
	teardown: function()
	{
		delete model;
	}
});
test('clone', function()
{
	var clone = model.clone();
	notStrictEqual(model, clone);
	equal(model.getLabel(), clone.getLabel());
	equal(model.getMandatory(), clone.getMandatory());
	equal(model.getValue(), clone.getValue());
	equal(model.getEnabled(), clone.getEnabled());
	notStrictEqual(model.getValidator(), clone.getValidator());
});
module('barmatz.forms.fields.FormItemModel', {
	setup: function()
	{
		model = new barmatz.forms.fields.FormItemModel('');
	},
	teardown: function()
	{
		delete model;
	}
});
module('barmatz.forms.fields.FileFieldModel', {
	setup: function()
	{
		model =  new barmatz.forms.fields.FileFieldModel('');
	},
	teardown: function()
	{
		delete model;
	}
});
test('getAccept', function()
{
	deepEqual(model.getAccept(), []);
});
test('setAccept', function()
{
	accept = [];
	model.setAccept(accept);
	strictEqual(model.getAccept(), accept);
});
test('clone', function()
{
	var clone = model.clone();
	notStrictEqual(model, clone);
	equal(model.getLabel(), clone.getLabel());
	equal(model.getMandatory(), clone.getMandatory());
	equal(model.getValue(), clone.getValue());
	equal(model.getEnabled(), clone.getEnabled());
	notStrictEqual(model.getValidator(), clone.getValidator());
	strictEqual(model.getAccept(), clone.getAccept());
});
module('barmatz.forms.fields.PhoneFieldModel', {
	setup: function()
	{
		model = new barmatz.forms.fields.PhoneFieldModel('');
	},
	teardown: function()
	{
		delete model;
	}
});
test('getPrefix', function()
{
	equal('', model.getPrefix());
});
test('getValue', function()
{
	equal('', model.getValue());
});
test('setValue', function()
{
	value = '123456';
	model.setValue(value);
	equal(model.getValue(), value);

	value = '123456789';
	model.setValue(value);
	equal(model.getValue(), value.substring(0, 7));

	value = '021234567';
	model.setValue(value);
	equal(model.getPrefix(), '02');
	equal(model.getPrefix() + model.getValue(), value);
});
test('clone', function()
{
	var clone = model.clone();
	notStrictEqual(model, clone);
	equal(model.getLabel(), clone.getLabel());
	equal(model.getMandatory(), clone.getMandatory());
	equal(model.getValue(), clone.getValue());
	equal(model.getEnabled(), clone.getEnabled());
	notStrictEqual(model.getValidator(), clone.getValidator());
});
module('barmatz.forms.fields.PhonePrefixes');
test('forEach', barmatz.forms.fields.PhonePrefixes.length, function()
{
	barmatz.forms.fields.PhonePrefixes.forEach(function(prefix)
	{
		ok(prefix);
	});
});
module('barmatz.forms.fields.RadioFieldModel', {
	setup: function()
	{
		model = new barmatz.forms.fields.RadioFieldModel('');
	},
	teardown: function()
	{
		delete model;
	}
});
test('clone', function()
{
	var clone = model.clone();
	notStrictEqual(model, clone);
	equal(model.getLabel(), clone.getLabel());
	equal(model.getMandatory(), clone.getMandatory());
	equal(model.getValue(), clone.getValue());
	equal(model.getEnabled(), clone.getEnabled());
	notStrictEqual(model.getValidator(), clone.getValidator());
	equal(model.getChecked(), clone.getChecked());
});
module('barmatz.forms.fields.TextAreaFieldModel', {
	setup: function()
	{
		model = new barmatz.forms.fields.TextAreaFieldModel('');
	},
	teardown: function()
	{
		delete model;
	}
});
test('getRows', function()
{
	equal(2, model.getRows());
});
test('setRows', function()
{
	rows = 1;
	model.setRows(rows);
	equal(rows, model.getRows());
});
test('getCols', function()
{
	equal(20, model.getCols());
});
test('setCols', function()
{
	cols = 1;
	model.setCols(cols);
	equal(cols, model.getCols());
});
test('clone', function()
{
	var clone = model.clone();
	notStrictEqual(model, clone);
	equal(model.getLabel(), clone.getLabel());
	equal(model.getMandatory(), clone.getMandatory());
	equal(model.getValue(), clone.getValue());
	equal(model.getEnabled(), clone.getEnabled());
	notStrictEqual(model.getValidator(), clone.getValidator());
	equal(model.getRows(), clone.getRows());
	equal(model.getCols(), clone.getCols());
});
module('barmatz.forms.fields.TextFieldModel', {
	setup: function()
	{
		model = new barmatz.forms.fields.TextFieldModel('');
	},
	teardown: function()
	{
		delete model;
	}
});
test('getMax', function()
{
	deepEqual(model.getMax(), NaN);
});
test('setMax', function()
{
	max = 1;
	model.setMax(max);
	equal(max, model.getMax());
});
test('getDescription', function()
{
	equal('', model.getDescription());
});
test('setDescription', function()
{
	description = 'mydescription';
	model.setDescription(description);
	equal(description, model.getDescription());
});
test('clone', function()
{
	var clone = model.clone();
	notStrictEqual(model, clone);
	equal(model.getLabel(), clone.getLabel());
	equal(model.getMandatory(), clone.getMandatory());
	equal(model.getValue(), clone.getValue());
	equal(model.getEnabled(), clone.getEnabled());
	notStrictEqual(model.getValidator(), clone.getValidator());
	deepEqual(model.getMax(), clone.getMax());
	equal(model.getDescription(), clone.getDescription());
});
module('barmatz.forms.ui.BuilderPageController', {
	setup: function()
	{
		formModel = new barmatz.forms.FormModel(); 
		userModel = new barmatz.forms.users.UserModel();
		containerView = document.createElement('div');
		panelsView = document.createElement('div');
		formNameView = document.createElement('div');
		saveStatusView = document.createElement('div');
		menuModel = new barmatz.forms.ui.MenuModel();
		menuView = document.createElement('div');
		toolboxModel = new barmatz.forms.ui.ToolboxModel
		toolboxView = document.createElement('div');
		workspaceView = document.createElement('div');
		propertiesController = new barmatz.forms.ui.PropertiesController(document.createElement('div'));
		builder = new barmatz.forms.ui.BuilderPageController(formModel, userModel, containerView, panelsView, formNameView, saveStatusView, menuModel, menuView, toolboxModel, toolboxView, workspaceView, propertiesController, document.getElementById('qunit-fixture'));
	},
	teardown: function()
	{
		delete formModel;
		delete userModel;
		delete containerView;
		delete panelsView;
		delete formNameView;
		delete saveStatusView;
		delete menuModel;
		delete menuView;
		delete toolboxModel;
		delete toolboxView;
		delete workspaceView;
		delete propertiesController;
		delete builder;
	}
});
test('conctructor', function()
{
	name = 'myname';
	formModel.setName(name);
	equal(formNameView.innerHTML, name);
	
	formModel.setFingerprint('myfingerprint');
	equal(saveStatusView.innerHTML, '');
	
	item = new barmatz.forms.fields.FieldModel('', '');
	formModel.addItem(item);
	strictEqual(item, propertiesController.getModel());
	
	formModel.removeItem(item);
	equal(propertiesController.getModel(), null);
	
	cachedSaveStatusViewInnerHTML = saveStatusView.innerHTML;
	formModel.dispatchEvent(new barmatz.events.FormEvent(barmatz.events.FormEvent.SAVING));
	ok(saveStatusView.innerHTML.length > 0 && saveStatusView.innerHTML != cachedSaveStatusViewInnerHTML);
	
	cachedSaveStatusViewInnerHTML = saveStatusView.innerHTML;
	formModel.dispatchEvent(new barmatz.events.FormEvent(barmatz.events.FormEvent.SAVED));
	ok(saveStatusView.innerHTML.length > 0 && saveStatusView.innerHTML != cachedSaveStatusViewInnerHTML);
	
	cachedSaveStatusViewInnerHTML = saveStatusView.innerHTML;
	formModel.dispatchEvent(new barmatz.events.FormEvent(barmatz.events.FormEvent.ERROR_SAVING));
	ok(saveStatusView.innerHTML.length > 0 && saveStatusView.innerHTML != cachedSaveStatusViewInnerHTML);
	
	equal(menuModel.getNumItems(), 9);
	equal(toolboxModel.getNumItems(), 7);
	equal(containerView.children.length, 2);
});
module('barmatz.forms.ui.BuilderPageModel', {
	setup: function()
	{
		model = new barmatz.forms.ui.BuilderPageModel(document.createElement('qunit-fixture'));
	},
	teardown: function()
	{
		delete model;
	}
});
test('getFormName', function()
{
	deepEqual('', model.getFormName());
});
test('setFormName', function()
{
	name = 'myname';
	model.setFormName(name);
	equal(name, model.getFormName());
});
test('getMenuView', function()
{
	ok(model.getMenuView());
});
test('getToolboxView', function()
{
	ok(model.getToolboxView());
});
test('getWorkspaceView', function()
{
	ok(model.getWorkspaceView());
});
test('getPropertiesView', function()
{
	ok(model.getPropertiesView());
});
test('getWorkspaceViewClickHandler', function()
{
	equal(undefined, model.getWorkspaceViewClickHandler());
});
test('setWorkspaceViewClickHandler', function()
{
	handler = function(){};
	model.setWorkspaceViewClipHandler(handler);
	equal(handler, model.getWorkspaceViewClickHandler());
});
test('getWorkspaceViewItemClickHandler', function()
{
	equal(undefined, model.getWorkspaceViewItemClickHandler());
});
test('setWorkspaceViewItemClickHandler', function()
{
	handler = function(){};
	model.setWorkspaceViewItemClickHandler(handler);
	equal(handler, model.getWorkspaceViewItemClickHandler());
});
test('getPropertiesControllerModel', function()
{
	equal(undefined, model.getPropertiesControllerModel());
});
test('setPropertiesControllerModel', function()
{
	propertiesControllerModel = new barmatz.forms.fields.FieldModel('', '');
	model.setPropertiesControllerModel(propertiesControllerModel);
	strictEqual(propertiesControllerModel, model.getPropertiesControllerModel());
});
test('addMenuItem', 2, function()
{
	label = 'mylabel';
	clickHandler = function(event)
	{
		ok(event);
	};
	model.addEventListener(barmatz.events.BuilderEvent.MENU_ITEM_ADDED, function(event)
	{
		equal(label, event.getItem().getLabel());
		
		mouseEvent = document.createEvent('MouseEvents');
		mouseEvent.initEvent('click');
		event.getItem().getClickHandler().call(event.getItem(), mouseEvent);
	});
	model.addMenuItem(label, clickHandler);
});
test('addToolboxItem', 2, function()
{
	type = 'mytype';
	label = 'mylabel';
	model.addEventListener(barmatz.events.BuilderEvent.TOOLBOX_ITEM_ADDED, function(event)
	{
		item = event.getItem();
		equal(type, item.getType());
		equal(label, item.getLabel());
	});
	model.addToolboxItem(type, label);
});
test('addToolboxItemToForm', 3, function()
{
	model.addToolboxItem(barmatz.forms.fields.FieldTypes.TEXT_FIELD, 'mylabel');
	item = model.getToolboxItemViewAt(0);
	model.addEventListener(barmatz.events.BuilderEvent.FORM_ITEM_ADDED, function(event)
	{
		itemModel = event.getItem();
		view = model.getWorkspaceView().getElementsByClassName('forms-workspace-items')[0].children[event.getIndex()];
		field = view.getElementsByClassName('forms-workspace-item-field')[0];

		equal(view.getElementsByClassName('forms-workspace-item-label')[0].getElementsByTagName('label')[0].innerHTML, itemModel.getLabel());
		equal(field.getElementsByTagName('input')[0].type, itemModel.getType());
		equal(field.getElementsByClassName('forms-form-item-mandatory')[0].innerHTML, itemModel.getMandatory() ? '*' : '');
	});
	model.addToolboxItemToForm(item);
});
test('addFormItem', 1, function()
{
	item = new barmatz.forms.fields.FieldModel(barmatz.forms.fields.FieldTypes.TEXT_FIELD, 'myname');
	model.addEventListener(barmatz.events.BuilderEvent.FORM_ITEM_ADDED, function(event)
	{
		strictEqual(event.getItem(), item);
	});
	model.addFormItem(item);
});
test('getFormModelItemAt', function()
{
	item = new barmatz.forms.fields.FieldModel(barmatz.forms.fields.FieldTypes.TEXT_FIELD, 'myname');
	index = 0;
	model.addFormItem(item);
	strictEqual(model.getFormModelItemAt(index), item);
});
test('getIndexOfView', function()
{
	parent = document.getElementById('qunit-fixture');
	view1 = parent.appendChild(document.createElement('div'));
	view2 = parent.appendChild(document.createElement('div'));
	view3 = document.createElement('div');
	
	equal(model.getIndexOfView(view1), 0);
	equal(model.getIndexOfView(view2), 1);
	equal(model.getIndexOfView(view3), 0);
});
test('getFieldModelFromToolboxModelAt', function()
{
	type = barmatz.forms.fields.FieldTypes.TEXT_FIELD;
	model.addToolboxItem(type, '');
	equal(model.getFieldModelFromToolboxModelAt(0).getType(), type);
});
test('getToolboxItemViewAt', function()
{
	model.addToolboxItem(barmatz.forms.fields.FieldTypes.TEXT_FIELD, '');
	ok(model.getToolboxItemViewAt(0));

	model.addToolboxItem(barmatz.forms.fields.FieldTypes.TEXT_FIELD, '');
	ok(model.getToolboxItemViewAt(1));
	
});
test('getWorkspaceModelItemFromView', function()
{
	modelItem = new barmatz.forms.fields.FieldModel(barmatz.forms.fields.FieldTypes.TEXT_FIELD, 'myname');
	model.addFormItem(modelItem);
	strictEqual(modelItem, model.getWorkspaceModelItemFromView(model.getWorkspaceView().getElementsByClassName('forms-workspace-items')[0].children[0]));
});
test('newForm', 0, function()
{
	model.newForm();
});
module('barmatz.forms.ui.CollectionDialogController', {
	setup: function()
	{
		model = new barmatz.forms.CollectionModel();
		view = document.createElement('table');
		controller = new barmatz.forms.ui.CollectionDialogController(model, view);
	},
	teardown: function()
	{
		delete model;
		delete view;
		delete controller;
	}
});
test('_createItemViewFromModel', function()
{
	contentModel = new barmatz.forms.ui.ContentModel();
	contentModel.setContent(['col1']);
	equal(contentModel.getContent().length, controller._createItemViewFromModel(contentModel).children.length);
});
module('barmatz.forms.ui.LeadsController', {
	setup: function()
	{
		userModel = new barmatz.forms.users.UserModel();
		formsListModel = new barmatz.forms.CollectionModel();
		formsListView = document.createElement('div');
		leadsListModel = new barmatz.forms.CollectionModel();
		leadsListWrapperView = document.createElement('div');
		leadsListView = document.createElement('div');
		containerView = document.createElement('div');
		panelsView = document.createElement('div');
		controller = new barmatz.forms.ui.LeadsController(userModel, formsListModel, formsListView, leadsListModel, leadsListWrapperView, leadsListView, containerView, panelsView, document.getElementById('qunit-fixture'));
	},
	teardown: function()
	{
		delete userModel;
		delete formsListModel;
		delete formsListView;
		delete leadsListModel;
		delete leadsListWrapperView;
		delete leadsListView;
		delete containerView;
		delete panelsView;
		delete controller;
	}
});
test('conctructor', function()
{
	equal(1, containerView.children.length);
	equal(0, leadsListView.children.length);
});
test('onUserModelGetFormsSuccess', function()
{
	userModel.dispatchEvent(new barmatz.events.UserEvent(barmatz.events.UserEvent.GET_FORMS_SUCCESS, [new barmatz.mvc.Model()]));
	equal(formsListModel.getNumItems(), 1);
});
test('onUserModelGetFormsFail', function()
{
	userModel.dispatchEvent(new barmatz.events.UserEvent(barmatz.events.UserEvent.GET_FORMS_FAIL));
	equal(document.getElementById('qunit-fixture').getElementsByClassName('forms-dialog').length, 1);
});
asyncTest('onFormsListModelItemAdded', 1, function()
{
	timer = setTimeout(start, 3000);
	event = document.createEvent('MouseEvents');
	event.initEvent('click');
	model = new barmatz.forms.FormModel();
	model.addEventListener(barmatz.events.FormEvent.GET_LEADS_SUCCESS, function(event)
	{
		ok(event);
		clearTimeout(timer);
		start();
	});
	model.addEventListener(barmatz.events.FormEvent.GET_LEADS_FAIL, function(event)
	{
		ok(event);
		clearTimeout(timer);
		start();
	});
	formsListView.appendChild(document.createElement('div'));
	formsListModel.addItem(model);
	formsListView.children[0].dispatchEvent(event);
});
test('onLeadsListModelItemAdded', function()
{
	leadsListModel.addItem(new barmatz.mvc.Model());
	strictEqual(leadsListView.parentElement, leadsListWrapperView);
});
test('onLeadsListModelItemRemoved', function()
{
	model = new barmatz.mvc.Model();
	leadsListModel.addItem(model);
	leadsListModel.removeItem(model);
	ok(!leadsListView.parentElement);
});
module('barmatz.forms.ui.LeadsFormsListController', {
	setup: function()
	{
		model = new barmatz.forms.CollectionModel();
		view = document.createElement('div');
		controller = new barmatz.forms.ui.LeadsFormsListController(model, view);
	},
	teardown: function()
	{
		delete model;
		delete view;
		delete controller;
	}
});
test('_createItemViewFromModel', function()
{
	ok(controller._createItemViewFromModel(new barmatz.forms.FormModel()));
});
module('barmatz.forms.ui.LeadsListController', {
	setup: function()
	{
		model = new barmatz.forms.CollectionModel();
		view = document.createElement('div');
		controller = new barmatz.forms.ui.LeadsListController(model, view);
	},
	teardown: function()
	{
		delete model;
		delete view;
		delete controller;
	}
});
test('_createItemViewFromModel', function()
{
	ok(controller._createItemViewFromModel(new barmatz.forms.LeadModel()));
});
module('barmatz.forms.ui.MenuController', {
	setup: function()
	{
		model = new barmatz.forms.ui.MenuModel();
		model.addItem(new barmatz.forms.ui.MenuItemModel('', function(){}));
		iconView = document.createElement('div');
		itemsView = document.createElement('div');
		controller = new barmatz.forms.ui.MenuController(model, iconView, itemsView);
	},
	teardown: function()
	{
		delete model;
		delete iconView;
		delete itemsView;
		delete controller;
	}
});
test('constructor', function()
{
	itemModel = new barmatz.forms.ui.MenuItemModel('', function(){});
	model.addItem(itemModel);
	equal(itemsView.children.length, 2);
	model.removeItem(itemModel);
	equal(itemsView.children.length, 1);

	event = document.createEvent('MouseEvents');
	event.initEvent('click');
	equal(itemsView.style.display, 'none');
	model.show();
	notEqual(itemsView.style.display, 'none');
	window.dispatchEvent(event);
	equal(itemsView.style.display, 'none');
	iconView.dispatchEvent(event);
	notEqual(itemsView.style.display, 'none');
});
module('barmatz.forms.ui.MenuItemModel', {
	setup: function()
	{
		label = 'mylabel';
		clickHandler = function(event)
		{
			ok(event);
		};
		model = new barmatz.forms.ui.MenuItemModel(label, clickHandler);
	},
	teardown: function()
	{
		delete label;
		delete clickHandler;
		delete model;
	}
});
test('getLabel', function()
{
	equal(label, model.getLabel());
});
test('setLabel', function()
{
	label = 'mylabel2';
	model.setLabel(label);
	equal(label, model.getLabel());
});
test('getClickHandler', 1, function()
{
	model.getClickHandler().call(model, document.createEvent('MouseEvents'));
});
test('setLabel', 1, function()
{
	clickHandler = function(event)
	{
		ok(event);
	};
	model.setClickHandler(clickHandler);
	model.getClickHandler().call(model, document.createEvent('MouseEvents'));
});
module('barmatz.forms.ui.MenuModel', {
	setup: function()
	{
		model = new barmatz.forms.ui.MenuModel();
	},
	teardown: function()
	{
		delete model;
	}
});
test('isOpen', function()
{
	equal(false, model.isOpen());
	model.show();
	equal(true, model.isOpen());
	model.hide();
	equal(false, model.isOpen());
	model.toggle();
	equal(true, model.isOpen());
	model.toggle();
	equal(false, model.isOpen());
});
test('addItem', function()
{
	model.addItem(new barmatz.forms.ui.MenuItemModel('', function(){}));
	equal(1, model.getNumItems());
});
test('removeItem', function()
{
	item = new barmatz.forms.ui.MenuItemModel('', function(){});
	model.addItem(item);
	model.removeItem(item);
	equal(0, model.getNumItems());
});
test('getItemIndex', function()
{
	item = new barmatz.forms.ui.MenuItemModel('', function(){});
	model.addItem(item);
	equal(0, model.getItemIndex(item));

	item = new barmatz.forms.ui.MenuItemModel('', function(){});
	model.addItem(item);
	equal(1, model.getItemIndex(item));
});
test('setItemIndex', function()
{
	item = new barmatz.forms.ui.MenuItemModel('', function(){});
	model.addItem(item);
	item = new barmatz.forms.ui.MenuItemModel('', function(){});
	model.addItem(item);

	equal(1, model.getItemIndex(item));
	model.setItemIndex(item, 0);
	equal(0, model.getItemIndex(item));
	
});
test('toggle', function()
{
	equal(false, model.isOpen());
	model.toggle();
	equal(true, model.isOpen());
	model.toggle();
	equal(false, model.isOpen());
});
test('show', function()
{
	model.show();
	equal(true, model.isOpen());
});
test('hide', function()
{
	model.hide();
	equal(false, model.isOpen());
});
module('barmatz.forms.ui.NewFieldDialogController', {
	setup: function()
	{
		model = new barmatz.forms.fields.FieldModel('', '');
		view = barmatz.forms.factories.DOMFactory.createDialog('', '');
		nameFieldView = document.createElement('input');
		labelFieldView = document.createElement('input');
		controller = new barmatz.forms.ui.NewFieldDialogController(model, view, nameFieldView, labelFieldView, document.getElementById('qunit-fixture'));
	},
	teardown: function()
	{
		delete model;
		delete view;
		delete nameFieldView;
		delete labelFieldView;
		delete controller;
	}
});
test('_submitDialog', function()
{
	container = document.getElementById('qunit-fixture');
	controller._submitDialog(container);
	equal(container.children.length, 1);
	nameFieldView.value = 'a';
	labelFieldView.value = 'a';
	controller._submitDialog(container);
	equal(container.children.length, 0);
	equal(model.getName(), nameFieldView.value);
	equal(model.getLabel(), labelFieldView.value);
});
module('barmatz.forms.ui.PanelModel', {
	setup: function()
	{
		className = 'myclass';
		model = new barmatz.forms.ui.PanelModel(className, '');
	}
});
test('getClassName', function()
{
	equal(className, model.getClassName());
});
test('setClassName', function()
{
	className = 'myclassname2';
	model.setClassName(className);
	equal(className, model.getClassName());
});
module('barmatz.forms.ui.PropertiesController', {
	setup: function()
	{
		view = document.createElement('div');
		controller = new barmatz.forms.ui.PropertiesController(view);
	},
	teardown: function()
	{
		delete view;
		delete controller;
	}
});
test('getModel', function()
{
	equal(null, controller.getModel());
});
test('setModel', function()
{
	model = new barmatz.forms.fields.FormItemModel('');
	controller.setModel(model);
	equal(1, view.children.length);
});
module('barmatz.forms.ui.TableOptions', {
	setup: function()
	{
		options = new barmatz.forms.ui.TableOptions();
	},
	teardown: function ()
	{
		delete options;
	}
});
test('getHeadClassName', function()
{
	equal(options.getHeadClassName(), '');
});
test('setHeadClassName', function()
{
	value = 'myclassName';
	options.setHeadClassName(value);
	equal(options.getHeadClassName(), value);
});
test('getHeadColumns', function()
{
	deepEqual(options.getHeadColumns(), []);
});
test('setHeadColumns', function()
{
	value = ['col'];
	options.setHeadColumns(value);
	strictEqual(options.getHeadColumns(), value);
});
test('getHeadColumnsClassNames', function()
{
	deepEqual(options.getHeadColumnsClassNames(), []);
});
test('setHeadColumnsClassNames', function()
{
	value = ['myclassname'];
	options.setHeadColumnsClassNames(value);
	strictEqual(options.getHeadColumnsClassNames(), value);
});
test('getHeadRowClassName', function()
{
	equal(options.getHeadRowClassName(), '');
});
test('setHeadRowClassName', function()
{
	value = 'myclassname';
	options.setHeadRowClassName(value);
	equal(options.getHeadRowClassName(), value);
});
test('getBodyClassName', function()
{
	equal(options.getBodyClassName(), '');
});
test('setBodyClassName', function()
{
	value = 'myclassname';
	options.setBodyClassName(value);
	equal(options.getBodyClassName(), value);
});
test('getBodyColumnsClassNames', function()
{
	deepEqual(options.getBodyColumnsClassNames(), []);
});
test('setBodyColumnsClassNames', function()
{
	value = ['myclassname'];
	options.setBodyColumnsClassNames(value);
	strictEqual(options.getBodyColumnsClassNames(), value);
});
test('getBodyRows', function()
{
	deepEqual(options.getBodyRows(), []);
});
test('setBodyRows', function()
{
	value = ['row'];
	options.setBodyRows(value);
	strictEqual(options.getBodyRows(), value);
});
test('getBodyRowsClassNames', function()
{
	deepEqual(options.getBodyRowsClassNames(), []);
});
test('setBodyRowsClassNames', function()
{
	value = ['myclassname'];
	options.setBodyRowsClassNames(value);
	strictEqual(options.getBodyRowsClassNames(), value);
});
test('getClassName', function()
{
	equal(options.getClassName(), '');
});
test('setClassName', function()
{
	value = 'myclassname';
	options.setClassName(value);
	equal(options.getClassName(), value);
});
module('barmatz.forms.ui.ToolboxController', {
	setup: function()
	{
		model = new barmatz.forms.ui.ToolboxModel();
		view = document.createElement('div');
		controller = new barmatz.forms.ui.ToolboxController(model, view);
	},
	teardown: function()
	{
		delete model;
		delete view;
		delete controller;
	}
});
test('_createItemViewFromModel', function()
{
	ok(controller._createItemViewFromModel(new barmatz.forms.ui.ToolboxItemModel('', '', new barmatz.forms.fields.FormItemModel(''))));
});
module('barmatz.forms.ui.ToolboxItemModel', {
	setup: function()
	{
		label = 'mylabel';
		fieldModel = new barmatz.forms.fields.FormItemModel('');
		model = new barmatz.forms.ui.ToolboxItemModel('', label, fieldModel);
	},
	teardown: function()
	{
		delete label;
		delete fieldModel;
		delete model;
	}
});
test('getLabel', function()
{
	equal(model.getLabel(), label);
});
test('setLabel', function()
{
	label = 'mylabel2';
	model.setLabel(label);
	equal(model.getLabel(), label);
});
test('getFieldModel', function()
{
	equal(fieldModel, model.getFieldModel());
});
module('barmatz.forms.ui.ToolboxModel', {
	setup: function()
	{
		model = new barmatz.forms.ui.ToolboxModel();
	},
	teardown: function()
	{
		delete model;
	}
});
test('addItem', function()
{
	item = new barmatz.forms.ui.ToolboxItemModel('', '', new barmatz.forms.fields.FormItemModel(''));
	model.addItem(item);
	equal(model.getNumItems(), 1);
});
test('addItemAt', function()
{
	item = new barmatz.forms.ui.ToolboxItemModel('', '', new barmatz.forms.fields.FormItemModel(''));
	model.addItem(item);

	item = new barmatz.forms.ui.ToolboxItemModel('', '', new barmatz.forms.fields.FormItemModel(''));
	model.addItemAt(item, 0);
	equal(model.getItemIndex(item), 0);
});
test('removeItem', function()
{
	item = new barmatz.forms.ui.ToolboxItemModel('', '', new barmatz.forms.fields.FormItemModel(''));
	model.addItem(item);
	model.removeItem(item);
	equal(model.getNumItems(), 0);
});
test('getItemIndex', function()
{
	item = new barmatz.forms.ui.ToolboxItemModel('', '', new barmatz.forms.fields.FormItemModel(''));
	model.addItem(item);
	equal(model.getItemIndex(item), 0);

	item = new barmatz.forms.ui.ToolboxItemModel('', '', new barmatz.forms.fields.FormItemModel(''));
	model.addItem(item);
	equal(model.getItemIndex(item), 1);
});
test('getFieldModelAt', function()
{
	fieldModel = new barmatz.forms.fields.FormItemModel('');
	model.addItem(new barmatz.forms.ui.ToolboxItemModel('', '', fieldModel));
	equal(model.getFieldModelAt(0), fieldModel);
});
module('barmatz.forms.ui.UserFormsListController', {
	setup: function()
	{
		formModel = new barmatz.forms.FormModel();
		userModel = new barmatz.forms.users.UserModel();
		view = document.createElement('div');
		dialogView = document.createElement('div');
		controller = new barmatz.forms.ui.UserFormsListController(formModel, userModel, view, dialogView, document.getElementById('qunit-fixture')); 
	},
	teardown: function()
	{
		delete formModel;
		delete userModel;
		delete view;
		delete dialogView;
		delete controller;
	}
});
asyncTest('constructor', 1, function()
{
	timer = setTimeout(start, 3000);
	userModel.addEventListener(barmatz.events.UserEvent.GET_FORMS_SUCCESS, function(event)
	{
		equal(event.getForms().length, view.children.length);
		clearTimeout(timer);
		start();
	});
	userModel.addEventListener(barmatz.events.UserEvent.GET_FORMS_FAIL, function(event)
	{
		ok(event);
		clearTimeout(timer);
		start();
	});
});
module('barmatz.forms.ui.UserFormsListItemController', {
	setup: function()
	{
		model = new barmatz.forms.FormModel();
		view = document.createElement('div');
		nameView = document.createElement('div');
		createdView = document.createElement('div');
		fingerprintView = document.createElement('div');
		controller = new barmatz.forms.ui.UserFormsListItemController(model, view, nameView, createdView, fingerprintView);
	},
	teardown: function()
	{
		delete model;
		delete view;
		delete nameView;
		delete createdView;
		delete fingerprintView;
		delete controller;
	}
});
test('constructor', 11, function()
{
	equal(nameView.innerHTML, model.getName());
	model.setName(name);
	equal(nameView.innerHTML, model.getName());
	
	equal(createdView.innerHTML, 'Invalid date');
	model.setCreated(new Date());
	equal(createdView.innerHTML, barmatz.utils.Date.toString(model.getCreated(), 'dd/mm/yyyy hh:ii'));

	equal(fingerprintView.innerHTML, '');
	model.setFingerprint('myfingerprint');
	equal(fingerprintView.innerHTML, model.getFingerprint());
	
	event = document.createEvent('MouseEvents');
	event.initEvent('mouseover');
	view.dispatchEvent(event);
	ok(/ui\-state\-hover/.test(view.className));
	
	model.addEventListener(barmatz.events.FormEvent.LOADING_FORM, function(event)
	{
		ok(event);
	});
	event = document.createEvent('MouseEvents');
	event.initEvent('click');
	view.dispatchEvent(event);
	
	event = document.createEvent('MouseEvents');
	event.initEvent('mousedown');
	view.dispatchEvent(event);
	ok(/ui\-state\-active/.test(view.className));
	
	event = document.createEvent('MouseEvents');
	event.initEvent('mouseup');
	window.dispatchEvent(event);
	ok(!/ui\-state\-active/.test(view.className));
	
	event = document.createEvent('MouseEvents');
	event.initEvent('mouseout');
	view.dispatchEvent(event);
	ok(!/ui\-state\-hover/.test(view.className));
});
module('barmatz.forms.ui.WorkspaceController', {
	setup: function()
	{
		model = new barmatz.forms.FormModel();
		view = document.createElement('div');
		controller = new barmatz.forms.ui.WorkspaceController(model, view, document.getElementById('qunit-fixture'));
	},
	teardown: function()
	{
		delete model;
		delete view;
		delete controller;
	}
});
test('constructor', function()
{
	model.setDirection(barmatz.forms.Directions.LTR);
	ok(/forms-ltr/.test(view.className));
	ok(!/forms-rtl/.test(view.className));

	model.setDirection(barmatz.forms.Directions.RTL);
	ok(/forms-rtl/.test(view.className));
	ok(!/forms-ltr/.test(view.className));
	
	model.addItem(new barmatz.forms.fields.TextFieldModel(''));
	equal(view.children.length, 1);
});
module('barmatz.forms.ui.WorkspaceItemController', {
	setup: function()
	{
		model = null;
		labelView = document.createElement('div');
		fieldView = document.createElement('div');
		mandatoryView = document.createElement('div');
		deleteButtonView = document.createElement('div');
		controller = null;
	},
	teardown: function()
	{
		delete model;
		delete labelView;
		delete fieldView;
		delete mandatoryView;
		delete deleteButtonView;
		delete controller;
	}
});
test('constructor', function()
{
	models = [
		new barmatz.forms.fields.DropboxModel(''),
		new barmatz.forms.fields.TextFieldModel(''),
		new barmatz.forms.fields.CheckboxFieldModel(''),
		new barmatz.forms.fields.FileFieldModel(''),
		new barmatz.forms.fields.TextAreaFieldModel(''),
		new barmatz.forms.fields.HTMLContentModel('')
	];
	
	for(i = 0; i < models.length; i++)
	{
		model = models[i];
		controller = new barmatz.forms.ui.WorkspaceItemController(model, labelView, fieldView, mandatoryView, deleteButtonView);
		
		if(model instanceof barmatz.forms.fields.DropboxModel)
		{
			itemModel = new barmatz.forms.fields.DropboxItemModel('');
			model.addItem(itemModel);
			equal(fieldView.children.length, model.getNumItems());
			model.removeItem(itemModel);
			equal(fieldView.children.length, model.getNumItems());
		}
		
		if(model instanceof barmatz.forms.fields.FieldModel)
		{
			value = 'myname';
			model.setName(value);
			equal(model.getName(), fieldView.name);

			value = 'mylabel';
			model.setLabel(value);
			equal(model.getLabel(), labelView.innerHTML);

			value = true;
			model.setMandatory(value);
			equal(model.getMandatory() ? '*' : '', mandatoryView.innerHTML);
			
			value = 'myvalue';
			model.setValue(value);
			
			if(model instanceof barmatz.forms.fields.CheckboxFieldModel)
				model.setChecked(true);
			
			equal(model.getValue(), fieldView.value);
			
			if(model instanceof barmatz.forms.fields.CheckboxFieldModel)
				model.setChecked(false);
			
			value = true;
			model.setEnabled(value);
			if(model instanceof barmatz.forms.fields.PhoneFieldModel)
			{
				equal(!model.getEnabled(), fieldView.getElementsByTagName('select')[0].disabled);
				equal(!model.getEnabled(), fieldView.getElementsByTagName('input')[0].disabled);
			}
			else
				equal(!model.getEnabled(), fieldView.disabled);
		}
		
		if(model instanceof barmatz.forms.fields.TextFieldModel)
		{
			value = 1;
			model.setMax(value);
			equal(model.getMax(), fieldView.maxLength);
		}
		
		if(model instanceof barmatz.forms.fields.CheckboxFieldModel)
		{
			value = true;
			model.setChecked(value);
			equal(model.getChecked(), fieldView.checked);
		}
		
		if(model instanceof barmatz.forms.fields.FileFieldModel)
		{
			value = [];
			model.setAccept(value);
			equal(model.getAccept(), fieldView.accept);
		}
		
		if(model instanceof barmatz.forms.fields.TextAreaFieldModel)
		{
			value = 'mycols';
			model.setCols(value);
			equal(model.getCols(), fieldView.cols);

			value = 'myrows';
			model.setRows(value);
			equal(model.getRows(), fieldView.rows);
		}
		
		if(model instanceof barmatz.forms.fields.HTMLContentModel)
		{
			value = 'mycontent';
			model.setContent(value);
			equal(model.getContent(), fieldView.innerHTML);
		}
	}
});
module('barmatz.forms.users.LoginController', {
	setup: function()
	{
		model = new barmatz.forms.users.UserModel();
		userNameFieldView = document.createElement('input');
		passwordFieldView = document.createElement('input');
		submitButtonView = document.createElement('div');
		errorFieldView = document.createElement('div');
		controller = new barmatz.forms.users.LoginController(model, userNameFieldView, passwordFieldView, submitButtonView, errorFieldView, document.getElementById('qunit-fixture'));
	},
	teardown: function()
	{
		delete model;
		delete userNameFieldView;
		delete passwordFieldView;
		delete submitButtonView;
		delete errorFieldView;
		delete controller;
	}
});
asyncTest('constructor', 2, function()
{
	equal(errorFieldView.style.display, 'none');
	
	model.addEventListener(barmatz.events.UserEvent.LOGIN_SUCCESS, function(event)
	{
		ok(event);
		clearTimeout(timer);
		start();
	});
	model.addEventListener(barmatz.events.UserEvent.LOGIN_FAIL, function(event)
	{
		ok(event);
		clearTimeout(timer);
		start();
	});
	
	event = document.createEvent('MouseEvents');
	event.initEvent('click');

	timer = setTimeout(start, 3000);
	submitButtonView.dispatchEvent(event);
});
module('barmatz.forms.users.UserModel', {
	setup: function()
	{
		model = new barmatz.forms.users.UserModel();
	},
	teardown: function()
	{
		delete model;
	}
});
test('getId', function()
{
	equal(model.getId(), null);
});
test('getUserName', function()
{
	equal(model.getUserName(), null);
});
test('getFirstName', function()
{
	equal(model.getFirstName(), null);
});
test('getLastName', function()
{
	equal(model.getLastName(), null);
});
test('getCreated', function()
{
	equal(model.getCreated(), null);
});
test('getActive', function()
{
	equal(model.getActive(), false);
});
test('addItem', function()
{
	item = new barmatz.forms.FormModel();
	model.addItem(item);
	equal(1, model.getNumItems());
});
test('addItemAt', function()
{
	item = new barmatz.forms.FormModel();
	model.addItem(item);

	item = new barmatz.forms.FormModel();
	model.addItemAt(item, 0);
	strictEqual(item, model.getItemAt(0));
});
test('removeItem', function()
{
	item = new barmatz.forms.FormModel();
	model.addItem(item);
	model.removeItem(item);
	equal(item.getNumItems(), 0);
});
test('getItemIndex', function()
{
	item = new barmatz.forms.FormModel();
	model.addItem(item);
	equal(0, model.getItemIndex(item));
});
test('setItemIndex', function()
{
	item = new barmatz.forms.FormModel();
	model.addItem(item);

	item = new barmatz.forms.FormModel();
	model.addItem(item);
	model.setItemIndex(item, 0);
	strictEqual(item, model.getItemAt(0));
});
asyncTest('getForms', 1, function()
{
	timer = setTimeout(start, 3000);
	model.addEventListener(barmatz.events.UserEvent.GET_FORMS_SUCCESS, function(event)
	{
		ok(event);
		clearTimeout(timer);
		start();
	});
	model.addEventListener(barmatz.events.UserEvent.GET_FORMS_FAIL, function(event)
	{
		ok(event);
		clearTimeout(timer);
		start();
	});
	model.getForms();
});
asyncTest('getData', 1, function()
{
	timer = setTimeout(start, 3000);
	model.addEventListener(barmatz.events.UserEvent.DATA_LOAD_SUCCESS, function(event)
	{
		ok(event);
		clearTimeout(timer);
		start();
	});
	model.addEventListener(barmatz.events.UserEvent.DATA_LOAD_FAIL, function(event)
	{
		ok(event);
		clearTimeout(timer);
		start();
	});
	model.getData();
});
asyncTest('login', 1, function()
{
	timer = setTimeout(start, 3000);
	model.addEventListener(barmatz.events.UserEvent.LOGIN_SUCCESS, function(event)
	{
		ok(event);
		clearTimeout(timer);
		start();
	});
	model.addEventListener(barmatz.events.UserEvent.LOGIN_FAIL, function(event)
	{
		ok(event);
		clearTimeout(timer);
		start();
	});
	model.login('', '');
});
asyncTest('logout', 1, function()
{
	timer = setTimeout(start, 3000);
	model.addEventListener(barmatz.events.UserEvent.LOGOUT_SUCCESS, function(event)
	{
		ok(event);
		clearTimeout(timer);
		start();
	});
	model.addEventListener(barmatz.events.UserEvent.LOGOUT_FAIL, function(event)
	{
		ok(event);
		clearTimeout(timer);
		start();
	});
	model.logout();
});
module('barmatz.forms.CollectionModel', {
	setup: function()
	{
		item = new barmatz.mvc.Model();
		model = new barmatz.forms.CollectionModel();
	},
	teardown: function()
	{
		delete item;
		delete model;
	}
});
test('getNumItems', function()
{
	equal(model.getNumItems(), 0);
});
test('addItem', function()
{
	model.addItem(item);
	equal(model.getNumItems(), 1);
});
test('addItemAt', function()
{
	model.addItem(item);
	
	item = new barmatz.mvc.Model();
	model.addItemAt(item, 0);
	strictEqual(model.getItemAt(0), item);
});
test('removeItem', function()
{
	model.addItem(item);
	model.removeItem(item);
	equal(model.getNumItems(), 0);
});
test('removeItemAt', function()
{
	model.addItem(item);
	
	item = new barmatz.mvc.Model();
	model.addItem(item);
	model.removeItemAt(0);
	strictEqual(model.getItemAt(0), item);
});
test('getItemAt', function()
{
	model.addItem(item);
	strictEqual(model.getItemAt(0), item);
});
test('getItemIndex', function()
{
	model.addItem(item);
	equal(model.getItemIndex(item), 0);
});
test('setItemIndex', function()
{
	model.addItem(item);
	
	item = new barmatz.mvc.Model();
	model.addItem(item);
	model.setItemIndex(item, 0);
	equal(model.getItemIndex(item), 0);
}
);
test('forEach', 3, function()
{
	model.addItem(item);
	model.forEach(function(a, b, c)
	{
		strictEqual(item, a);
		strictEqual(item, c[b]);
		equal(model.getItemIndex(item), b);
	});
});
test('find', function()
{
	for(i = 0; i < 10; i++)
	{
		item = new barmatz.mvc.Model();
		item.set('index', i);
		model.addItem(item);
	}
	
	equal(model.find(function(item)
	{
		return item.get('index') % 2;
	}).length, 5);
});
test('toString', function()
{
	model.addItem(item);
	ok(model.toString());
});
test('toArray', function()
{
	model.addItem(item);
	
	array = model.toArray();
	
	ok(array instanceof window.Array);
	equal(array.length, 1);
	strictEqual(item, array[0]);
});
module('barmatz.forms.ui.ContentModel', {
	setup: function()
	{
		model = new barmatz.forms.ui.ContentModel();
	},
	teardown: function()
	{
		delete model;
	}
});
test('getcontent', function()
{
	equal('', model.getContent());
});
test('setContent', function()
{
	content = 'mycontent';
	model.setContent(content);
	equal(content, model.getContent());
});
module('barmatz.forms.FormController', {
	setup: function()
	{
		model = new barmatz.forms.FormModel();
		formView = document.createElement('form');
		submitButtonView = document.createElement('div');
		controller = new barmatz.forms.FormController(model, formView, submitButtonView);
	},
	teardown: function()
	{
		delete model;
		delete formView;
		delete submitButtonView;
		delete controller;
	}
});
test('constructor', function()
{
	equal(model.getName(), formView.name);
	equal(model.getMethod().toLowerCase(), formView.method.toLowerCase());
	equal(model.getEncoding(), formView.encoding);
	equal(formView.getAttribute('onsubmit'), 'return false;');

	event = document.createEvent('Events');
	event.initEvent('submit');
	formView.addEventListener(barmatz.events.FormEvent.SUBMITTING, function(event)
	{
		equal(formView.children.length, 1);
	});
	formView.addEventListener(barmatz.events.FormEvent.SUBMISSION_FAILED, function(event)
	{
		equal(submitButtonView.innerHTML, barmatz.forms.Language.form.submit.error);
		equal(submitButtonView.disabled, false);
		equal(formView.children.length, 0);
	});
	formView.addEventListener(barmatz.events.FormEvent.SUBMITTED, function(event)
	{
		equal(submitButtonView.innerHTML, barmatz.forms.Language.form.submit.success);
		equal(submitButtonView.disabled, true);
		equal(formView.children.length, 0);
	});
	formView.dispatchEvent(event);
});
module('barmatz.forms.FormModel', {
	setup: function()
	{
		model = new barmatz.forms.FormModel();
	},
	teardown: function()
	{
		delete model;
	}
});
test('getName', function()
{
	equal('', model.getName());
});
test('setName', function()
{
	value = 'myname';
	model.setName(value);
	equal(value, model.getName());
});
test('getSubmitButtonLabel', function()
{
	equal('Submit', model.getSubmitButtonLabel());
});
test('setSubmitButtonLabel', function()
{
	value = 'musubmit';
	model.setSubmitButtonLabel(value);
	equal(value, model.getSubmitButtonLabel());
});
test('getMethod', function()
{
	equal(barmatz.forms.Methods.GET, model.getMethod());
});
test('setMethod', function()
{
	value = 'mymethod';
	model.setMethod(value);
	equal(value, value, model.getMethod());
});
test('getEncoding', function()
{
	equal(barmatz.net.Encoding.FORM, model.getEncoding());
});
test('setEncoding', function()
{
	value = 'myencoding';
	model.setEncoding(value);
	equal(value, model.getEncoding());
});
test('getCreated', function()
{
	equal(new Date('Invalid').toString(), model.getCreated().toString());
});
test('setCreated', function()
{
	value = new Date();
	model.setCreated(value);
	equal(value.toString(), model.getCreated().toString());
});
test('getFingerprint', function()
{
	equal(null, model.getFingerprint());
});
test('setFingerprint', function()
{
	value = 'myfingerprint';
	model.setFingerprint(value);
	equal(value, model.getFingerprint());
});
test('getStylesheets', function()
{
	equal([].toString(), model.getStylesheets());
});
test('setStylesheets', function()
{
	value = [];
	model.setStylesheets(value);
	strictEqual(value, model.getStylesheets());
});
test('getDirection', function()
{
	equal(barmatz.forms.Directions.LTR, model.getDirection());
});
test('setDirection', function()
{
	value = 'mydirection';
	model.setDirection(value);
	equal(value, model.getDirection());
});
test('getTargetEmail', function()
{
	equal('', model.getTargetEmail());
});
test('setTargetEmail', function()
{
	value = 'myemail';
	model.setTargetEmail(value);
	equal(value, model.getTargetEmail());
});
test('getLayoutId', function()
{
	equal(1, model.getLayoutId());
});
test('setLayoutId', function()
{
	value = 2;
	model.setLayoutId(value);
	equal(value, model.getLayoutId());
});
test('getLanguage', function()
{
	equal('en', model.getLanguage());
});
test('setLanguage', function()
{
	value = 'mylang';
	model.setLanguage(value);
	equal(value, model.getLanguage());
});
test('getExternalAPI', function()
{
	equal(null, model.getExternalAPI());
});
test('setExternalAPI', function()
{
	value = 'myexternalapi';
	model.setExternalAPI(value);
	equal(value, model.getExternalAPI());
});
test('addItem', function()
{
	model.addItem(new barmatz.forms.fields.FormItemModel(''));
	equal(1, model.getNumItems());
});
test('addItemAt', function()
{
	item = new barmatz.forms.fields.FormItemModel('');
	model.addItem(item);
	strictEqual(item, model.getItemAt(0));
});
test('removeItem', function()
{
	item = new barmatz.forms.fields.FormItemModel('');
	model.addItem(item);
	model.removeItem(item);
	equal(0, model.getNumItems());
});
test('getItemIndex', function()
{
	item = new barmatz.forms.fields.FormItemModel('');
	model.addItem(item);
	equal(0, model.getItemIndex(item));
});
test('setItemIndex', function()
{
	item = new barmatz.forms.fields.FormItemModel('');
	model.addItem(item);

	item = new barmatz.forms.fields.FormItemModel('');
	model.addItem(item);
	model.setItemIndex(item, 0);
	equal(0, model.getItemIndex(item));
});
test('toJSON', function()
{
	value = JSON.parse(model.toJSON());
	equal(model.getName(), value.name);
	equal(model.getSubmitButtonLabel(), value.submitButtonLabel);
	equal(model.getMethod(), value.method);
	equal(model.getEncoding(), value.encoding);
	equal(model.getFingerprint(), value.fingerprint);
	deepEqual(model.getStylesheets(), value.stylesheets);
	equal(model.getDirection(), value.direction);
	equal(model.getTargetEmail(), value.targetEmail);
	equal(model.getLayoutId(), value.layoutId);
	equal(model.getLanguage(), value.language);
	equal(model.getNumItems(), value.fields.length);
});
test('reset', function()
{
	model.reset();
	equal('', model.getName());
	equal(barmatz.forms.Methods.GET, model.getMethod());
	equal(barmatz.net.Encoding.FORM, model.getEncoding());
	equal(new Date('Invalid'), model.getCreated().toString());
	equal(null, model.getFingerprint());
	equal([].toString(), model.getStylesheets().toString());
	equal(barmatz.forms.Directions.LTR, model.getDirection());
	equal('', model.getTargetEmail());
	equal(1, model.getLayoutId());
	equal('en', model.getLanguage());
	equal(0, model.getNumItems());
});
asyncTest('save', 2, function()
{
	timer = setTimeout(start, 3000);
	model.addEventListener(barmatz.events.FormEvent.SAVING, function(event)
	{
		ok(event);
	});
	model.addEventListener(barmatz.events.FormEvent.SAVED, function(event)
	{
		ok(event);
		clearTimeout(timer);
		start();
	});
	model.addEventListener(barmatz.events.FormEvent.ERROR_SAVING, function(event)
	{
		ok(event);
		clearTimeout(timer);
		start();
	});
	model.save(new barmatz.forms.users.UserModel());
});
test('saveAs', function()
{
	value = 'myvalue';
	model.saveAs(new barmatz.forms.users.UserModel(), value);
	equal(value, model.getName());
});
asyncTest('loadByFingerprint', 2, function()
{
	timer = setTimeout(start, 3000);
	model.addEventListener(barmatz.events.FormEvent.LOADING_FORM, function(event)
	{
		ok(event);
	});
	model.addEventListener(barmatz.events.FormEvent.LOADING_FORM_COMPLETE, function(event)
	{
		ok(event);
		clearTimeout(timer);
		start();
	});
	model.addEventListener(barmatz.events.FormEvent.LOADING_FORM_ERROR, function(event)
	{
		ok(event);
		clearTimeout(timer);
		start();
	});
	model.loadByFingerprint('');
});
asyncTest('deleteForm', 2, function()
{
	timer = setTimeout(start, 3000);
	model.addEventListener(barmatz.events.FormEvent.DELETING, function(event)
	{
		ok(event);
	});
	model.addEventListener(barmatz.events.FormEvent.DELETED, function(event)
	{
		ok(event);
		clearTimeout(timer);
		start();
	});
	model.addEventListener(barmatz.events.FormEvent.DELETION_FAIL, function(event)
	{
		ok(event);
		clearTimeout(timer);
		start();
	});
	model.deleteForm();
});
test('isValid', function()
{
	model.addItem(new barmatz.forms.fields.TextFieldModel(''));
	equal(true, model.isValid());
	
	model.getItemAt(0).setMandatory(true);
	equal(false, model.isValid());
});
asyncTest('submit', 2, function()
{
	timer = setTimeout(start, 3000);
	model.addEventListener(barmatz.events.FormEvent.SUBMITTING, function(event)
	{
		ok(event);
	});
	model.addEventListener(barmatz.events.FormEvent.SUBMITTED, function(event)
	{
		ok(event);
		clearTimeout(timer);
		start();
	});
	model.addEventListener(barmatz.events.FormEvent.SUBMISSION_FAILED, function(event)
	{
		ok(event);
		clearTimeout(timer);
		start();
	});
	model.submit();	
});
asyncTest('getLeads', 1, function()
{
	timer = setTimeout(start, 3000);
	model.addEventListener(barmatz.events.FormEvent.GET_LEADS_SUCCESS, function(event)
	{
		ok(event);
		clearTimeout(timer);
		start();
	});
	model.addEventListener(barmatz.events.FormEvent.GET_LEADS_FAIL, function(event)
	{
		ok(event);
		clearTimeout(timer);
		start();
	});
	model.getLeads();	
});
test('copy', function()
{
	value = 'myfingerprint';
	model2 = new barmatz.forms.FormModel();
	model.copy(value, model2);
	
	equal(model.getName() || '', model2.getName());
	equal(model.getSubmitButtonLabel() || 'Submit', model2.getSubmitButtonLabel());
	equal(model.getCreated().toString(), model2.getCreated().toString());
	equal(model.getMethod() || barmatz.forms.Methods.GET, model2.getMethod());
	equal(model.getEncoding() || barmatz.net.Encoding.FORM, model2.getEncoding());
	equal(model.getDirection() || barmatz.forms.Directions.LTR, model2.getDirection());
	equal(model.getTargetEmail() || '', model2.getTargetEmail());
	equal(model.getLayoutId() || 1, model2.getLayoutId());
	equal(model.getLanguage() || 'en', model2.getLanguage());
	equal(model.getFingerprint(), value);
	equal(model.getStylesheets().toString(), model2.getStylesheets().toString());
	equal(model.getNumItems(), model2.getNumItems());
});
module('barmatz.forms.LeadModel', {
	setup: function()
	{
		model = new barmatz.forms.LeadModel();
	},
	teardown: function()
	{
		delete model;
	}
});
test('getCreated', function()
{
	equal(null, model.getCreated());
});
test('setCreated', function()
{
	value = new Date();
	model.setCreated(value);
	equal(value.toString(), model.getCreated().toString());	
});
test('getData', function()
{
	equal(null, model.getData());
});
test('setData', function()
{
	value = {};
	model.setData(value);
	strictEqual(value, model.getData());	
});
test('getIP', function()
{
	equal(null, model.getIP());
});
test('setIP', function()
{
	value = 'myip';
	model.setIP(value);
	equal(value, model.getIP());
});
test('getReferer', function()
{
	equal(null, model.getReferer());
});
test('setReferer', function()
{
	value = 'myreferer';
	model.setReferer(value);
	equal(value, model.getReferer());
});
module('barmatz.forms.TypeModel', {
	setup: function()
	{
		type = 'mytype';
		model = new barmatz.forms.TypeModel(type);
	},
	teardown: function()
	{
		delete type;
		delete model;
	}
});
test('getType', function()
{
	equal(type, model.getType());
});
module('barmatz.forms.Validator');
test('trim', function()
{
	values = [
		['a', '  a  '],
		['a', '  a'],
		['a', 'a  '],
		['a', 'a'],
		['a  b', '  a  b  ']
	];
	
	for(i = 0; i < values.length; i++)
		equal(values[i][0], barmatz.forms.Validator.trim(values[i][1]));
});
test('notEmpty', function()
{
	values = [
		[false, ''],
		[false, '  '],
		[true, 'a']
	];
	for(i = 0; i < values.length; i++)
		equal(values[i][0], barmatz.forms.Validator.notEmpty(values[i][1]));
});
test('equals', function()
{
	values = [
		[true, 'a', 'a'],
		[true, 'a', /a/],
		[false, 'a', 'b'],
		[false, 'a', /b/]
	];
	for(i = 0; i < values.length; i++)
		equal(values[i][0], barmatz.forms.Validator.equals(values[i][1], values[i][2]));
});
test('validEmail', function()
{
	values = [
		[true, 'email@example.com'],
		[true, 'firstname.lastname@example.com'],
		[true, 'email@subdomain.example.com'],
		[true, 'firstname+lastname@example.com'],
		[true, '"email"@example.com'],
		[true, '1234567890@example.com'],
		[true, 'email@example-one.com'],
		[true, '_______@example.com'],
		[true, 'email@example.name'],
		[true, 'email@example.museum'],
		[true, 'email@example.co.jp'],
		[true, 'firstname-lastname@example.com'],
		[false, 'plainaddress'],
		[false, '#@%^%#$@#$@#.com'],
		[false, '@example.com'],
		[false, 'Joe Smith <email@example.com>'],
		[false, 'email.example.com'],
		[false, 'email@example@example.com'],
		[false, '.email@example.com'],
		[false, 'email.@example.com'],
		[false, 'email..email@example.com'],
		[false, 'あいうえお@example.com'],
		[false, 'email@example.com (Joe Smith)'],
		[false, 'email@example'],
		[false, 'email@-example.com'],
		[false, 'email@111.222.333.44444'],
		[false, 'email@example..com'],
		[false, 'Abc..123@example.com'],
		[false, '"(),:;<>[\]@example.com'],
		[false, 'this\ is"really"not\allowed@example.com']
	];
	for(i = 0; i < values.length; i++)
		equal(values[i][0], barmatz.forms.Validator.validEmail(values[i][1]));
});
test('validPhone', function()
{
	values = [
    	[true, '0542345678'],
    	[true, '032345678'],
    	[false, '0002345678'],
    	[false, '002345678'],
    	[false, '054234567'],
    	[false, '03234567'],
    	[false, '0540345678'],
    	[false, '0541345678'],
    	[false, '030345678'],
    	[false, '031345678']
	];
	for(i = 0; i < values.length; i++)
		equal(values[i][0], barmatz.forms.Validator.validPhone(values[i][1]));
});
test('maxLength', function()
{
	values = [
		[true, '12', 3],
		[true, '123', 3],
		[false, '1234', 3]
	];
	for(i = 0; i < values.length; i++)
		equal(values[i][0], barmatz.forms.Validator.maxLength(values[i][1], values[i][2]));
});
test('minLength', function()
{
	values = [
	  	[false, '12', 3],
	  	[true, '123', 3],
		[true, '1234', 3]
	];
  	for(i = 0; i < values.length; i++)
  		equal(values[i][0], barmatz.forms.Validator.minLength(values[i][1], values[i][2]));
});
test('exactLength', function()
{
	values = [
	  	[false, '12', 3],
	  	[true, '123', 3],
		[false, '1234', 3]
	];
	for(i = 0; i < values.length; i++)
		equal(values[i][0], barmatz.forms.Validator.exactLength(values[i][1], values[i][2]));
});
test('greaterThan', function()
{
	values = [
		[true, 2, 1],
		[false, 1, 1],
		[false, 0, 1]
	];
	for(i = 0; i < values.length; i++)
		equal(values[i][0], barmatz.forms.Validator.greaterThan(values[i][1], values[i][2]));
});
test('lesserThan', function()
{
	values = [
		[false, 2, 1],
		[false, 1, 1],
		[true, 0, 1]
	];
	for(i = 0; i < values.length; i++)
		equal(values[i][0], barmatz.forms.Validator.lesserThan(values[i][1], values[i][2]));
});
test('digitsOnly', function()
{
	values = [
		[true, '123'],
		[false, '1 2 3'],
		[false, 'a1']
	];
	for(i = 0; i < values.length; i++)
		equal(values[i][0], barmatz.forms.Validator.digitsOnly(values[i][1]));
});
test('notDigits', function()
{
	values = [
		[true, 'abc'],
		[true, 'a b c'],
		[false, 'a1']
	];
	for(i = 0; i < values.length; i++)
		equal(values[i][0], barmatz.forms.Validator.notDigits(values[i][1]));
});
module('barmatz.mvc.Model', {
	setup: function()
	{
		model = new barmatz.mvc.Model();
	},
	teardown: function()
	{
		delete model;
	}
});
test('get', function()
{
	equal(undefined, model.get('foo'));
});
test('set', function()
{
	key = 'foo';
	value = 'bar';
	model.set(key, value);
	equal(value, model.get(key));
});
module('barmatz.net.Loader', {
	setup: function()
	{
		loader = new barmatz.net.Loader();
	},
	teardown: function()
	{
		delete loader;
	}
});
test('serialize', function()
{
	equal(decodeURIComponent(barmatz.net.Loader.serialize({a: 1, b: '2', c: [1,{a: 1, b: '2'}]})), 'a=1&b=2&c[0]=1&c[1][a]=1&c[1][b]=2');
});
test('_xhr', function()
{
	ok(loader._xhr);
});
asyncTest('getState', 4, function()
{
	timer = setTimeout(start, 3000);
	request = new barmatz.net.Request('http://www.quiz.co.il/api/test.php');
	loader.addEventListener(barmatz.events.LoaderEvent.OPENED, function(event)
	{
		equal(barmatz.net.Loader.OPENED, loader.getState());
	});
	loader.addEventListener(barmatz.events.LoaderEvent.HEADERS_RECEIVED, function()
	{
		equal(barmatz.net.Loader.HEADERS_RECEIVED, loader.getState());
	});
	loader.addEventListener(barmatz.events.LoaderEvent.SUCCESS, function()
	{
		equal(barmatz.net.Loader.DONE, loader.getState());
		clearTimeout(timer);
		start();
	});
	equal(barmatz.net.Loader.UNSENT, loader.getState());
	loader.load(request);
});
asyncTest('abort', 1, function()
{
	timer = setTimeout(start, 3000);
	request = new barmatz.net.Request('http://www.quiz.co.il/api/test.php');
	loader.addEventListener(barmatz.events.LoaderEvent.OPENED, function(event)
	{
		ok(event);
		clearTimeout(timer);
		start();
		loader.abort();
	});
	loader.addEventListener(barmatz.events.LoaderEvent.HEADERS_RECEIVED, function()
	{
		ok(event);
	});
	loader.addEventListener(barmatz.events.LoaderEvent.LOADING, function()
	{
		ok(event);
	});
	loader.addEventListener(barmatz.events.LoaderEvent.SUCCESS, function()
	{
		ok(event);
	});
	loader.load(request);
});
asyncTest('load', 1, function()
{
	timer = setTimeout(start, 3000);
	request = new barmatz.net.Request('http://www.quiz.co.il/api/test.php');
	loader.addEventListener(barmatz.events.LoaderEvent.SUCCESS, function(event)
	{
		ok(event.getResponse());
		clearInterval(timer);
		start();
	});
	loader.addEventListener(barmatz.events.LoaderEvent.ERROR, function(event)
	{
		ok(event.getResponse());
		clearInterval(timer);
		start();
	});
	loader.load(request);
});
module('barmatz.net.Request', {
	setup: function()
	{
		url = 'myurl';
		request = new barmatz.net.Request(url);
	},
	teardown: function()
	{
		delete url;
		delete request;
	}
});
test('getData', function()
{
	deepEqual({}, request.getData());
});
test('setData', function()
{
	value = {};
	request.setData(value);
	strictEqual(value, request.getData());
});
test('getURL', function()
{
	equal(url, request.getURL());
});
test('setURL', function()
{
	value = 'myurl2';
	request.setURL(value);
	equal(value, request.getURL());
});
test('getMethod', function()
{
	equal(barmatz.net.Methods.GET, request.getMethod());
});
test('setMethod', function()
{
	value = 'mymethod';
	request.setMethod(value);
	equal(value, request.getMethod());
});
test('getAsync', function()
{
	equal(true, request.getAsync());
});
test('setAsync', function()
{
	request.setAsync(false);
	equal(false, request.getAsync());
});
test('getCredentials', function()
{
	equal(null, request.getCredentials());
});
test('setCredentials', function()
{
	value = new barmatz.net.RequestCredentials();
	request.setCredentails(value);
	strictEqual(value, request.getCredentials());
});
test('getHeaders', function()
{
	deepEqual([], request.getHeaders());
});
module('barmatz.net.RequestCredentials', {
	setup: function()
	{
		requestCredentials = new barmatz.net.RequestCredentials();
	},
	teardown: function()
	{
		delete requestCredentials;
	}
});
test('getUser', function()
{
	equal(null, requestCredentials.getUser());
});
test('setUser', function()
{
	value = 'myuser';
	requestCredentials.setUser(value);
	equal(value, requestCredentials.getUser());
});
test('getPassword', function()
{
	equal(null, requestCredentials.getPassword());
});
test('setPassword', function()
{
	value = 'mypassword';
	requestCredentials.setPassword(value);
	equal(value, requestCredentials.getPassword());
});
module('barmatz.net.RequestHeader', {
	setup: function()
	{
		header = 'myheader';
		value = 'myvalue';
		requestHeader = new barmatz.net.RequestHeader(header, value);
	},
	teardown: function()
	{
		delete header;
		delete value;
		delete requestHeader;
	}
});
test('getHeader', function()
{
	equal(header, requestHeader.getHeader());
});
test('setHeader', function()
{
	value = 'myheader2';
	requestHeader.setHeader(value);
	equal(value, requestHeader.getHeader());
});
test('getValue', function()
{
	equal(value, requestHeader.getValue());
});
test('setValue', function()
{
	value = 'myvalue2';
	requestHeader.setValue(value);
	equal(value, requestHeader.getValue());
});
module('barmatz.net.Response', {
	setup: function()
	{
		url = 'myurl';
		data = {};
		type = 'mytype';
		statusValue = 0;
		headers = [];
		response = new barmatz.net.Response(url, data, type, statusValue, headers);
	},
	teardown: function()
	{
		delete url;
		delete data;
		delete statusValue;
		delete headers;
		delete response;
	}
});
test('getURL', function()
{
	equal(url, response.getURL());
});
test('getData', function()
{
	strictEqual(data, response.getData());
});
test('getType', function()
{
	equal(type, response.getType());
});
test('getStatus', function()
{
	equal(statusValue, response.getStatus());
});
test('getHeaders', function()
{
	equal(headers, response.getHeaders());
});
module('barmatz.utils.Bitwise');
test('slice', function()
{
	equal(0x1, barmatz.utils.Bitwise.slice(0x1 + 0x2, 0x2));
	equal(0x1 + 0x2, barmatz.utils.Bitwise.slice(0x1 + 0x2, 0x4));
});
test('concat', function()
{
	equal(0x1 + 0x2, barmatz.utils.Bitwise.concat(0x1, 0x2));
});
test('parseBit', function()
{
	deepEqual([0x1, 0x2], barmatz.utils.Bitwise.parseBit(0x1 + 0x2));
});
test('contains', function()
{
	equal(true, barmatz.utils.Bitwise.contains(0x1 + 0x2, 0x1));
	equal(false, barmatz.utils.Bitwise.contains(0x1 + 0x2, 0x4));
});
module('barmatz.utils.CSS');
test('getStyle', function()
{
	element = document.createElement('div');
	ok(barmatz.utils.CSS.getStyle(element));
});
test('unitToPixal', function()
{
	element = document.getElementById('qunit-fixture');
	element.style.fontSize = '12px';
	equal(barmatz.utils.CSS.unitToPixal(element, '1em'), 12);
	equal(barmatz.utils.CSS.unitToPixal(element, '1px'), 1);
});
test('emToPixal', function()
{
	element = document.getElementById('qunit-fixture');
	element.style.fontSize = '12px';
	equal(barmatz.utils.CSS.emToPixal(element, 1), 12);
});
test('absoluteHeight', function()
{
	element = document.getElementById('qunit-fixture');
	element.style.height = '10px';
	element.style.marginTop = '10px';
	element.style.marginBottom = '10px';
	element.style.borderTop = '10px';
	element.style.borderBottom = '10px';
	element.style.borderStyle = 'solid';
	equal(barmatz.utils.CSS.absoluteHeight(element), 50);
});
test('absoluteWidth', function()
{
	element = document.getElementById('qunit-fixture');
	element.style.width = '10px';
	element.style.marginLeft = '10px';
	element.style.marginRight = '10px';
	element.style.borderLeft = '10px';
	element.style.borderRight = '10px';
	element.style.borderStyle = 'solid';
	equal(barmatz.utils.CSS.absoluteWidth(element), 50);
});
test('verticalAlign', function()
{
	element1 = document.createElement('div');
	element1.style.height = '50px';
	element2 = document.getElementById('qunit-fixture');
	element2.style.height = '100px';
	element2.appendChild(element1);
	barmatz.utils.CSS.verticalAlign(element1);
	equal(parseFloat(element1.style.marginTop), 25);
});
test('verticalAlignChildren', function()
{
	element1 = document.createElement('div');
	element1.style.height = '50px';
	element2 = document.createElement('div');
	element2.style.height = '25px';
	element3 = document.getElementById('qunit-fixture');
	element3.style.height = '100px';
	element3.appendChild(element1);
	element3.appendChild(element2);
	barmatz.utils.CSS.verticalAlignChildren(element3);
	equal(parseFloat(element1.style.marginTop), 25);
	equal(parseFloat(element2.style.marginTop), 37.5);
});
test('addClass', function()
{
	element = document.createElement('div');
	barmatz.utils.CSS.addClass('foo');
	barmatz.utils.CSS.addClass('bar');
	equal(element.className, 'foo bar');
});
test('removeClass', function()
{
	element = document.createElement('div');
	barmatz.utils.CSS.addClass('foo');
	barmatz.utils.CSS.addClass('bar');
	barmatz.utils.CSS.removeClass('foo');
	equal(element.className, 'bar');
});
module('barmatz.utils.DataTypes', {
	setup: function()
	{
		barmatz.utils.DataTypes.setSilent(false);
	}
});
test('_recursiveVlidation', function()
{
	
	raises(barmatz.utils.DataTypes._recursiveVlidation(null, [true, false], function(value, assertion, allowNull){}, 'error', false));
	raises(barmatz.utils.DataTypes._recursiveVlidation(undefined, [true, false], function(value, assertion, allowNull){}, 'error', false));
	equal(true, barmatz.utils.DataTypes._recursiveVlidation(null, [true, false], function(value, assertion, allowNull){}, 'error', true));
	raises(barmatz.utils.DataTypes._recursiveVlidation(true, [false, false], function(value, assertion, allowNull)
	{
		if(value != assetion)
			throw Error('');
	}, 'error', true));
	equal(true, barmatz.utils.DataTypes._recursiveVlidation(true, [true, false], function(value, assertion, allowNull)
	{
		if(value != assetion)
			throw Error('');
	}, 'error', true));
});
test('getSilent', function()
{
	equal(false, barmatz.utils.DataTypes.getSilent());
});
test('setSilent', function()
{
	barmatz.utils.DataTypes.setSilent(true);
	equal(true, barmatz.utils.DataTypes.getSilent());
});
test('applySilent', function()
{
	equal(true, barmatz.utils.DataTypes.applySilent(function(value)
	{ 
		return value; 
	}, true));
});
test('throwError', function()
{
	raises(barmatz.utils.DataTypes.throwError(Error, ''));
	barmatz.utils.DataTypes.setSilent(true);
	equal(false, barmatz.utils.DataTypes.throwError(Error, ''));
});
test('isNotUndefined', function()
{
	barmatz.utils.DataTypes.setSilent(true);
	equal(true, barmatz.utils.DataTypes.isNotUndefined(''));
	equal(false, barmatz.utils.DataTypes.isNotUndefined(undefined));
});
test('isValid', function()
{
	barmatz.utils.DataTypes.setSilent(true);
	equal(true, barmatz.utils.DataTypes.isValid(''));
	equal(false, barmatz.utils.DataTypes.isValid(null));
	equal(false, barmatz.utils.DataTypes.isValid(undefined));
});
test('isAllowNull', function()
{
	barmatz.utils.DataTypes.setSilent(true);
	equal(true, barmatz.utils.DataTypes.isAllowNull(''));
	equal(false, barmatz.utils.DataTypes.isAllowNull(null));
	equal(true, barmatz.utils.DataTypes.isValid(undefined));
});
test('isTypeOf', function()
{
	barmatz.utils.DataTypes.setSilent(true);
	equal(true, barmatz.utils.DataTypes.isTypeOf('', 'string'));
	equal(false, barmatz.utils.DataTypes.isTypeOf(1, 'string'));
});
test('isTypesOf', function()
{
	barmatz.utils.DataTypes.setSilent(true);
	equal(true, barmatz.utils.DataTypes.isTypesOf('', ['string', 'number']));
	equal(true, barmatz.utils.DataTypes.isTypesOf(1, ['string', 'number']));
	equal(false, barmatz.utils.DataTypes.isTypesOf(true, ['string', 'number']));
});
test('isInstanceOf', function()
{
	barmatz.utils.DataTypes.setSilent(true);
	equal(true, barmatz.utils.DataTypes.isInstanceOf(document.createElement('div'), window.HTMLElement));
	equal(false, barmatz.utils.DataTypes.isInstanceOf(1, window.HTMLElement));
});
test('isInstancesOf', function()
{
	barmatz.utils.DataTypes.setSilent(true);
	equal(true, barmatz.utils.DataTypes.isInstancesOf(document.createElement('div'), [HTMLSpanElement, HTMLDivElement]));
	equal(true, barmatz.utils.DataTypes.isInstancesOf(document.createElement('span'), [HTMLSpanElement, HTMLDivElement]));
	equal(false, barmatz.utils.DataTypes.isInstancesOf(document.createElement('input'), [HTMLSpanElement, HTMLDivElement]));
});
test('isTypeOrInstance', function()
{
	barmatz.utils.DataTypes.setSilent(true);
	equal(true, barmatz.utils.DataTypes.isTypeOrInstance('', 'string', Element));
	equal(true, barmatz.utils.DataTypes.isTypeOrInstance(document.createElement('div'), 'string', Element));
	equal(false, barmatz.utils.DataTypes.isTypeOrInstance(false, 'string', Element));
});
test('isTypesOrInstances', function()
{
	barmatz.utils.DataTypes.setSilent(true);
	equal(true, barmatz.utils.DataTypes.isTypesOrInstances('', ['string', 'number'], [HTMLDivElement, HTMLSpanElement]));
	equal(true, barmatz.utils.DataTypes.isTypesOrInstances(1, ['string', 'number'], [HTMLDivElement, HTMLSpanElement]));
	equal(false, barmatz.utils.DataTypes.isTypesOrInstances(true, ['string', 'number'], [HTMLDivElement, HTMLSpanElement]));
	equal(true, barmatz.utils.DataTypes.isTypesOrInstances(document.createElement('div'), ['string', 'number'], [HTMLDivElement, HTMLSpanElement]));
	equal(true, barmatz.utils.DataTypes.isTypesOrInstances(document.createElement('span'), ['string', 'number'], [HTMLDivElement, HTMLSpanElement]));
	equal(false, barmatz.utils.DataTypes.isTypesOrInstances(document.createElement('input'), ['string', 'number'], [HTMLDivElement, HTMLSpanElement]));
});
module('barmatz.utils.Date');
test('toDate', function()
{
	equal(new Date(0).toString(), barmatz.utils.Date.toDate('1970-01-01 00:00:00').toString());
});
test('toString', function()
{
	date = new Date(0);
	values = [
		['01', 'dd'],
		['1', 'd'],
		['5', 'n'],
		['000', 'mmm'],
		['01', 'mm'],
		['1', 'm'],
		['1970', 'yyyy'],
		['70', 'yy'],
		['00', 'hh'],
		['0', 'h'],
		['0', 'H'],
		['00', 'ii'],
		['0', 'i'],
		['00', 'ss'],
		['0', 's'],
		['Thursday', 'D'],
		['January', 'M'],
		['am', 'A'],
	];
	for(i = 0; i < values.length; i++)
		equal(values[i][0], barmatz.utils.Date.toString(date, values[i][1]));
});
test('getDayName', function()
{
	values = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
	for(i = 0; i < values.length; i++)
	{
		date = new Date(0);
		date.setDate(i);
		equal(values[i], barmatz.utils.Date.getDayName(date));
	}
});
test('getMonthName', function()
{
	values = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
	for(i = 0; i < values.length; i++)
	{
		date = new Date(0);
		date.setMonth(i);
		equal(values[i], barmatz.utils.Date.getDayName(date));
	}
});
module('barmatz.utils.Dictionary', {
	setup: function()
	{
		key = {};
		value = {};
		dictionary = new barmatz.utils.Dictionary();
	},
	teardown: function()
	{
		delete key;
		delete value;
		delete dictionary;
	}
});
test('add', function()
{
	dictionary.add(key, value);
	strictEqual(key, dictionary.find(key));
	strictEqual(value, dictionary.get(key));
});
test('remove', function()
{
	dictionary.add(key, value);
	dictionary.remove(key, value);
	equal(null, dictionary.find(key));
	equal(null, dictionary.get(key));
});
test('get', function()
{
	dictionary.add(key, value);
	strictEqual(value, dictionary.get(key));
});
test('getNext', function()
{
	key2 = {};
	value2 = {};
	dictionary.add(key, value);
	dictionary.add(key2, value2);
	strictEqual(value2, dictionary.getNext(key));
});
test('getPrev', function()
{
	key2 = {};
	value2 = {};
	dictionary.add(key, value);
	dictionary.add(key2, value2);
	strictEqual(value, dictionary.getPrev(key2));
});
test('reset', function()
{
	dictionary.add(key, value);
	dictionary.reset();
	equal(null, dictionary.get(key));
});
test('forEach', function()
{
	dictionary.add(key, value);
	dictionary.forEach(function(a, b)
	{
		strictEqual(value, a);
		strictEqual(key, b);
	});
});
test('find', function()
{
	dictionary.add(key, value);
	strictEqual(key, dictionary.find(value));
});
module('barmatz.utils.DOM');
test('isChildOf', function()
{
	element1 = document.createElement('div');
	element2 = document.createElement('div');
	element3 = document.createElement('div');
	element2.appendChild(element1);
	equal(true, barmatz.utils.DOM.isChildOf(element1, element2));
	equal(false, barmatz.utils.DOM.isChildOf(element1, element3));
});
test('removeAllChildren', function()
{
	element1 = document.createElement('div');
	element2 = document.createElement('div');
	element2.appendChild(element1);
	barmatz.utils.DOM.removeAllChildren(element2);
	equal(0, element2.children.length);
});
test('sort', function()
{
	element1 = document.createElement('br');
	element2 = document.createElement('a');
	element3 = document.createElement('div');
	element3.appendChild(element1);
	element3.appendChild(element2);
	barmatz.utils.DOM.sort(element3, function(a, b)
	{
		if(a.tagName < b.tagName)
			return 1;
		else if(a.tagName > b.tagName)
			return -1;
		else
			return 0;
			
	});
	strictEqual(element2, element3.children[0]);
	strictEqual(element1, element3.children[1]);
});
module('barmatz.utils.String');
test('firstLetterToUpperCase', function()
{
	equal('Foo', barmatz.utils.String.firstLetterToUpperCase('foo'));
});
module('barmatz.utils.Window');
test('getHeight', function()
{
	ok(barmatz.utils.Window.getHeight());	
});
test('getWidth', function()
{
	ok(barmatz.utils.Window.getWidth());	
});