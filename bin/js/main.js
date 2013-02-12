window.barmatz = {
	dom: {},
	events: {},
	forms: {},
	mvc: {},
	utils: {}
};

window.barmatz.events.Event = function(type)
{
	this._type = type;
};

Object.defineProperties(barmatz.events.Event.prototype,
{
	target: {get: function()
	{
		return this._target;
	}},
	type: {get: function()
	{
		return this._type;
	}},
	clone: {value: function(type)
	{
		var event = new barmatz.events.Event(type);
		event._target = this.target;
		return event;
	}},
	formatToString: {value: function(className)
	{
		var parameters = [], i;
		
		arguments = Array.prototype.slice.call(arguments);
		
		for(i = 1; i < arguments.length; i++)
			parameters.push(arguments[i] + '=' + this[arguments[i]]);
		
		return '[' + className + '(' + parameters.join(', ') + ')]';
	}},
	toString: {value: function()
	{
		return this.formatToString('Event', 'type');
	}}
});
window.barmatz.events.EventDispatcher = function()
{
	this._listeners = {};
};

Object.defineProperties(barmatz.events.EventDispatcher.prototype, 
{
	addEventListener: {value: function(type, listener)
	{
		if(typeof type != 'string')
			throw new TypeError('type is not a String');
		
		if(typeof listener != 'function')
			throw new TypeError('listener is not a Function');
		
		if(!this._listeners[type])
			this._listeners[type] = [];
		
		this._listeners[type].push(listener);
	}},
	dispatchEvent: {value: function(event)
	{
		var i, c;
		
		if(!(event instanceof barmatz.events.Event))
			throw new TypeError('event is not an Event object');
		
		event._target = this;
		
		for(i in this._listeners)
		{
			if(i === event.type)
				for(c in this._listeners[i])
					this._listeners[i][c](event);
		}
	}},
	hasEventListener: {value: function(type)
	{
		return this._listeners[type] ? true : false;
	}},
	removeEventListener: {value: function(type, listener)
	{
		var i;
		
		if(this._listeners[type])
		{
			for(i = 0; i < this._listeners[type].length; i++)
				if(this._listeners[type][i] === listener)
					this._listeners[type].splice(i, 1);
			
			if(this._listeners[type].length == 0)
				delete this._listeners[type];
		}
	}}
});

window.barmatz.events.ModelEvent = function(type)
{
	barmatz.events.Event.call(this, type);
	
	switch(type)
	{
		case barmatz.events.ModelEvent.VALUE_CHANGED:
			this._key = arguments[1];
			this._value = arguments[2];
			break;
	}
};

barmatz.events.ModelEvent.prototype = new barmatz.events.Event();
barmatz.events.ModelEvent.prototype.constructor = barmatz.events.ModelEvent;

Object.defineProperties(barmatz.events.ModelEvent.prototype, 
{
	key: {get: function()
	{
		return this._key;
	}},
	value: {get: function()
	{
		return this._value;
	}}
});
Object.defineProperties(barmatz.events.ModelEvent, 
{
	VALUE_CHANGED: {value: 'valueChanged'}
});
window.barmatz.mvc.Controller = function()
{
	barmatz.events.EventDispatcher.call(this);
};

barmatz.mvc.Controller.prototype = new barmatz.events.EventDispatcher();
barmatz.mvc.Controller.prototype.constructor = barmatz.mvc.Controller;
window.barmatz.mvc.Model = function()
{
	barmatz.events.EventDispatcher.call(this);
};

barmatz.mvc.Model.prototype = new barmatz.events.EventDispatcher();
barmatz.mvc.Model.prototype.constructor = barmatz.mvc.Model;

Object.defineProperties(barmatz.mvc.Model.prototype, 
{
	get: {value: function(key)
	{
		return this['_' + key];
	}},
	set: {value: function(key, value)
	{
		this['_' + key] = value;
		this.dispatchEvent(new barmatz.events.ModelEvent(barmatz.events.ModelEvent.VALUE_CHANGED, key, value));
	}}
});
window.barmatz.utils.DOM = function(){};

Object.defineProperties(barmatz.utils.DOM, 
{
	getElements: {value: function(tagName, parent)
	{
		var elements = Array.prototype.slice.call(parent.getElementsByTagName(tagName));
		return elements.length > 1 ? elements : (elements.length > 0 ? elements[0] : null);
	}}
});
window.barmatz.utils.Objects = function(){};

Object.defineProperties(barmatz.utils.Objects, 
{
	setNested: {value: function(object, key, value)
	{
		var keys = key.split('.'), i = 0;
		
		while(i < keys.length - 1)
		{
			object = object[keys[i]];
			i++;
		}
		
		object[keys[i]] = value;
	}}
});
window.barmatz.utils.XML = function(){};

Object.defineProperties(barmatz.utils.XML, 
{ 
	stringToXML: {value: function(str)
	{
		var doc, parser;
		
		if(window.ActiveXObject)
		{
			doc = new ActiveXObject('Microsoft.XMLDOM');
			doc.async='false';
			doc.loadXML(str);
		} 
		else 
			doc = new DOMParser().parseFromString(str,'text/xml');
	
		return doc;
	}},
	xmlToJSON: {value: function(xml)
	{
		var obj = {}, attribute, item, nodeName, old, i;
		
		if(xml.nodeType == 1) 
		{
			if(xml.attributes.length > 0) 
			{
				for(i = 0; i < xml.attributes.length; i++) 
				{
					attribute = xml.attributes.item(i);
					obj[attribute.nodeName] = attribute.nodeValue;
				}
			}
		} 
		else if(xml.nodeType == 3) 
			obj = xml.nodeValue;
		
		if(xml.hasChildNodes()) 
		{
			for(i = 0; i < xml.childNodes.length; i++) 
			{
				item = xml.childNodes.item(i);
				nodeName = item.nodeName;
				
				if(typeof obj[nodeName] == 'undefined') 
					obj[nodeName == '#text' ? 'content' : nodeName] = this.xmlToJSON(item);
				else 
				{
					if(typeof obj[nodeName].length == 'undefined') 
					{
						old = obj[nodeName];
						obj[nodeName] = [];
						obj[nodeName].push(old);
					}
		
					obj[nodeName].push(this.xmlToJSON(item));
				}
			}
		}
		
		return obj;
	}}
});
window.barmatz.dom.DOMFactory = function(){};

Object.defineProperties(barmatz.dom.DOMFactory, 
{
	createElement: {value: function(tagName, content, className, parent)
	{
		var element = document.createElement(tagName);
		
		if(className)
			element.className = className;
		
		if(content)
			element.innerHTML = content;
		
		if(parent)
			parent.appendChild(element);
		
		return element;
	}}
});
window.barmatz.dom.DOMModel = function()
{
	barmatz.mvc.Model.call(this);
};

barmatz.dom.DOMModel.prototype = new barmatz.mvc.Model();
barmatz.dom.DOMModel.prototype.constructor = barmatz.dom.DOMModel;
window.barmatz.forms.FormController = function(model, view, submitButton)
{
	if(!(model instanceof barmatz.forms.FormModel))
		throw new TypeError('model is not a FormModel object');

	if(!(view instanceof HTMLFormElement))
		throw new TypeError('model is not an HTMLFormElement object');
	
	if(!(submitButton instanceof HTMLButtonElement || (submitButton instanceof HTMLInputElement && (submitButton.type == 'button' || submitButton.type == 'submit'))))
		throw new TypeError('submitButton is not an HTMLButtonElement object or HTMLInputElement object with type set to button or submit');
	
	barmatz.mvc.Controller.call(this);
	
	this.model = model;
	this.view = view;
	this.submitButton = submitButton;
	
	updateView();
	
	model.addEventListener(barmatz.events.ModelEvent.VALUE_CHANGED, onModelValueChanged);
	submitButton.addEventListener('click', onSubmitButtonClick);
	
	function updateView()
	{
		updateModelValueInView('id');
		updateModelValueInView('action');
		updateModelValueInView('method');
		updateModelValueInView('width', 'style.width');
	}
	
	function updateModelValueInView(modelKey, viewKey)
	{
		if(viewKey === undefined)
			viewKey = modelKey;
			
		if(view[viewKey] != model[modelKey])
			barmatz.utils.Objects.setNested(view, viewKey, model[modelKey]);
	}
	
	function onModelValueChanged(event)
	{
		updateView();
	}
	
	function onSubmitButtonClick(event)
	{
		model.submit();
	}
};

barmatz.forms.FormController.prototype = new barmatz.mvc.Controller();
barmatz.forms.FormController.prototype.constructor = barmatz.forms.FormController;

window.barmatz.forms.FormFactory = function(){};

Object.defineProperties(barmatz.forms.FormFactory, 
{
	TEXT: {value: 'text'},
	PASSWORD: {value: 'password'},
	RADIO: {value: 'radio'},
	CHECKBOX: {value: 'checkbox'},
	SELECT: {value: 'select'},
	OPTION: {value: 'option'},
	TEXTAREA: {value: 'textarea'},
	createForm: {value: function()
	{
		return barmatz.dom.DOMFactory.createElement('form', null, 'form');
	}},
	createElement: {value: function(type, name, value, className, parent)
	{
		var element;
		
		switch(type)
		{
			default:
				throw new Error('Unknown type');
				break;
			case this.TEXT:
			case this.PASSWORD:
			case this.RADIO:
			case this.CHECKBOX:
				element = barmatz.dom.DOMFactory.createElement('input', null, className, parent);
				element.type = type;
				break;
			case this.SELECT:
			case this.TEXTAREA:
			case this.OPTION:
				element = barmatz.dom.DOMFactory.createElement(type, null, className, parent);
				break;
		}
		
		if(name)
			element.name = name;
		
		if(value)
			element.value = value;
		
		return element;
	}},
	createWrappedItem: {value: function(id, type, label, value, isMandatory, error, selected)
	{
		var item = barmatz.dom.DOMFactory.createElement('div', null, 'form-item'),
			field, child, values, i;
		
		if(label)
			barmatz.dom.DOMFactory.createElement('label', label, 'form-item-label', item);
		
		switch(type)
		{
			default:
				throw new Error('Unknown field type');
				break;
			case this.TEXT:
			case this.PASSWORD:
			case this.TEXTAREA:
				field = this.createElement(type, id, value, 'form-item-field', item);
				break;
			case this.RADIO:
				field = barmatz.dom.DOMFactory.createElement('span', null, null, item);
				
				if(value)
				{
					values = value instanceof Array ? value : [value];
							 
					for(i = 0; i < values.length; i++)
					{
						value = values[i];
						child = this.createElement('radio', id, value.content, 'form-item-field', field);
						child.checked = value.selected;
						
						if(value.text)
							child = barmatz.dom.DOMFactory.createElement('span', value.text, null, field);
					}
				}
				break;
			case this.CHECKBOX:
				field = this.createElement('checkbox', id, value, 'form-item-field', item);
				field.checked = selected;
				break;
			case this.SELECT:
				field = this.createElement('select', id, value, 'form-item-field', item);
				
				if(value)
				{
					values = value instanceof Array ? value : [value];
					
					for(i = 0; i < values.length; i++)
					{
						value = values[i];
						child = this.createElement('option', null, value.content, null, field);
						child.innerHTML = value.text;
						child.selected = value.selected;
					}
				}
				break;
		}
		
		if(isMandatory)
			barmatz.dom.DOMFactory.createElement('span', '*', 'form-item-mandatory', item);
		
		if(error)
			barmatz.dom.DOMFactory.createElement('div', error, 'form-item-error', item);
		
		return item;
	}},
	createSubmitButton: {value: function(label, parent)
	{
		return barmatz.dom.DOMFactory.createElement('button', label, 'form-submit-button', parent);
	}},
	getValidationMethodByID: {value: function(id)
	{
		switch(id)
		{
			default:
				throw new Error('Unknown id');
				break;
			case barmatz.forms.Validation.MIN_LENGTH:
				return barmatz.forms.Validation.minLength;
				break;
			case barmatz.forms.Validation.MAX_LENGTH:
				return barmatz.forms.Validation.maxLength;
				break;
			case barmatz.forms.Validation.NOT_EMPTY:
				return barmatz.forms.Validation.notEmpty;
				break;
			case barmatz.forms.Validation.VALID_EMAIL:
				return barmatz.forms.Validation.validEmail;
				break;
			case barmatz.forms.Validation.VALID_PHONE:
				return barmatz.forms.Validation.validPhone;
				break;
			case barmatz.forms.Validation.CONTAINS_LETTERS:
				return barmatz.forms.Validation.containsLetters;
				break;
			case barmatz.forms.Validation.CONTAINS_DIGITS:
				return barmatz.forms.Validation.containsDigits;
				break;
			case barmatz.forms.Validation.CONTAINS_SPECIAL_CHARS:
				return barmatz.forms.Validation.containsSpecialCharacters;
				break;
		}
	}}
});
window.barmatz.forms.FormItemController = function(model, view)
{
	var viewIsCollection = view instanceof Array, i;
	
	if(!(model instanceof barmatz.forms.FormItemModel))
		throw new TypeError('model is not a FormItemModel object');
	
	if(viewIsCollection)
	{
		for(i in view)
			validateViewType(view[i]);
	}
	else
		validateViewType(view);

	
	barmatz.mvc.Controller.call(this);
	
	this.model = model;
	
	if(viewIsCollection)
		this.views = view;
	else
		this.view = view;
	
	function validateViewType(view)
	{
		if(!(view instanceof HTMLInputElement || view instanceof HTMLSelectElement || view instanceof HTMLTextAreaElement))
			throw new TypeError('view is not an HTMLElement object that is a form item(input, select or textarea)');
	}
};

barmatz.forms.FormItemController.prototype = new barmatz.mvc.Controller();
barmatz.forms.FormItemController.prototype.constructor = barmatz.forms.FormItemController;
window.barmatz.forms.FormItemModel = function(type, validation, validationParams)
{
	if(typeof type != 'string')
		throw new TypeError('type is not a String');

	if(validation && typeof validation != 'function')
		throw new TypeError('validation is not a Function');
	
	if(validationParams && !(validationParams instanceof 'Array'))
		throw new TypeError('validationParams is not an Array');
	
	barmatz.mvc.Model.call(this);

	this.set('type', type);
	this.set('validation', validation);
	this.set('validationParams', validationParams);
};

barmatz.forms.FormItemModel.prototype = new barmatz.dom.DOMModel();
barmatz.forms.FormItemModel.prototype.constructor = barmatz.forms.FormItemModel;

Object.defineProperties(barmatz.forms.FormItemModel.prototype,
{
	type: {get: function()
	{
		return this.get('type');
	}},
	validation: {get: function()
	{
		return this.get('validation');
	}},
	validationParams: {get: function()
	{
		return this.get('validationParams');
	}}
});
window.barmatz.forms.FormManager = function(){};

Object.defineProperties(barmatz.forms.FormManager,
{
	createFromXML: {value: function(xml)
	{
		var object = barmatz.utils.XML.xmlToJSON(xml);
		
		if(object.form)
			return this.createFromJSON(object.form);
		else
			throw new Error('XML format is illegal');
	}},
	createFromJSON: {value: function(object)
	{
		var formModel = new barmatz.forms.FormModel(object.id, '', 'post'),
			formView = barmatz.forms.FormFactory.createForm(),
			submitButton = barmatz.forms.FormFactory.createSubmitButton(object.submit.button),
			formController = new barmatz.forms.FormController(formModel, formView, submitButton),
			item, itemMode, itemView, itemController, wrappedItemView, i;
		
		if(object.width)
			formModel.width = object.width;
		
		if(object.item)
		{
			if(!(object.item instanceof Array))
				object.item = [object.item];
			
			for(i = 0; i < object.item.length; i++)
			{
				item = object.item[i];
				itemModel = new barmatz.forms.FormItemModel(item.type, item.validation ? barmatz.forms.FormFactory.getValidationMethodByID(parseInt(item.validation)) : null, item.validationParams ? item.validationParams.split(',') : null);
				wrappedItemView = barmatz.forms.FormFactory.createWrappedItem(item.id || 'field' + formView.childNodes.length, item.type, item.label, item.value || null, item.mandatory, item.error, item.selected === 'true' ? true : false);
				itemView = this.getFormItemFromContainer(wrappedItemView);
				itemController = new barmatz.forms.FormItemController(itemModel, itemView);
				formView.appendChild(wrappedItemView);
				formModel.addItem(itemModel);
			}
		}
		
		formView.appendChild(submitButton);
		
		return formView;
	}},
	getFormItemFromContainer: {value: function(container)
	{
		var types = ['input', 'select', 'textarea'], item, i;
		
		for(i = 0; i < types.length; i++)
		{
			item = barmatz.utils.DOM.getElements(types[i], container);
			
			if(item)
				return item;
		}
		
		return null;
	}}
});
window.barmatz.forms.FormModel = function(id, action, method)
{
	barmatz.mvc.Model.call(this);
	this.items = [];
	this.set('id', id);
	this.set('action', action);
	this.set('method', method);
	this.set('width', '100%');
};

barmatz.forms.FormModel.prototype = new barmatz.mvc.Model();
barmatz.forms.FormModel.prototype.constructor = barmatz.forms.FormModel;

Object.defineProperties(barmatz.forms.FormModel.prototype, 
{
	id: {get: function()
	{
		return this.get('id');
	}},
	action: {get: function()
	{
		return this.get('action');
	}},
	method: {get: function()
	{
		return this.get('method');
	}},
	width: {get: function()
	{
		return this.get('width');
	}, set: function(value)
	{
		this.set('width', value);
	}},
	addItem: {value: function(item)
	{
		if(!(item instanceof barmatz.forms.FormItemModel))
			throw new TypeError('item is not a FormItemModel object');
		
		this.items.push(item);
	}},
	removeItem: {value: function(item)
	{
		var i;
		
		if(!(item instanceof barmatz.forms.FormItemModel))
			throw new TypeError('item is not a FormItemModel object');
		
		for(i = 0; i < this.items.length; i++)
		{
			if(this.items[i] === item)
			{
				this.items.splice(i, 1);
				break;
			}
		}
				
	}},
	validate: {value: function()
	{
		var item, i;
		
		for(i in this.items)
		{
			item = this.items[i];
			
			if(item.validationParams)
				item.validation.apply(item, [item.value].concat(item.validationParams));
			else
				item.validation(item.value);
		}
	}},
	submit: {value: function()
	{
		console.log('submit!!');
	}}
});

window.barmatz.forms.Validation = function(){};

Object.defineProperties(barmatz.forms.Validation, 
{
	EMAIL_REGEX: {value: /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/},
	TRIM_REGEX: {value: /(^\s*|\s*$)/},
	PHONE_REGEX: {value: /[\s\-]/g},
	NOT_LETTERS_REGEX: {value: /\W/g},
	NOT_DIGITS_REGEX: {value: /\D/g},
	NOT_SPECIAL_CHARS_REGEX: {value: /[^`!@#\$%\^&\*\(\)\-_=\+\[\]\{\},\.\<\>\/\?|\\]/g},
	MIN_LENGTH: {value: 1},
	MAX_LENGTH: {value: 2},
	NOT_EMPTY: {value: 3},
	VALID_EMAIL: {value: 4},
	VALID_PHONE: {value: 5},
	CONTAINS_LETTERS: {value: 6},
	CONTAINS_DIGITS: {value: 7},
	CONTAINS_SPECIAL_CHARS: {value: 7},
	trim: {value: function(value)
	{
		return value.replace(this.TRIM_REGEX, '');
	}},
	delete: {value: function(value, pattern)
	{
		return value.replace(pattern, '');
	}},
	minLength: {value: function(value, min)
	{
		return this.trim(value).length > min;
	}},
	maxLength: {value: function(value, max)
	{
		return this.trim(value).length < max;
	}},
	notEmpty: {value: function(value)
	{
		return this.minLength(value, 0);
	}},
	validEmail: {value: function(value)
	{
		return this.EMAIL_REGEX.test(this.trim(value));
	}},
	validPhone: {value: function(value)
	{
		return this.notEmpty(this.delete(this.trim(value), this.PHONE_REGEX));
	}},
	containsLetters: {value: function(value)
	{
		return this.notEmpty(this.delete(this.trim(value), this.NOT_LETTERS_REGEX));
	}},
	containsDigits: {value: function(value)
	{
		return this.notEmpty(this.delete(this.trim(value), this.NOT_DIGITS_REGEX));
	}},
	containsSpecialCharacters: {value: function(value)
	{
		return this.notEmpty(this.delete(this.trim(value), this.NOT_SPECIAL_CHARS_REGEX));
	}},
});
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
