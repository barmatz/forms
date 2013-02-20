/** namespaces **/
window.barmatz = {
	events: {},
	forms: {},
	mvc: {},
	net: {},
	utils: {}
};
/** barmatz.utils.XML **/
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
	xmlToObject: {value: function(xml)
	{
		var obj = {}, objPropertySet = false, attribute, item, nodeName, i;
		
		if(xml.nodeType == 1) 
		{
			if(xml.attributes.length > 0) 
			{
				for(i = 0; i < xml.attributes.length; i++) 
				{
					attribute = xml.attributes.item(i);
					obj[attribute.nodeName] = attribute.nodeValue;
					objPropertySet = true;
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
				{
					if(objPropertySet)
						obj[nodeName == '#text' ? 'content' : nodeName] = this.xmlToObject(item);
					else 
						obj = this.xmlToObject(item);
				}
				else 
				{
					if(!(obj[nodeName] instanceof Array))
						obj[nodeName] = [obj[nodeName]];
		
					obj[nodeName].push(this.xmlToObject(item));
				}
			}
		}
		
		return obj;
	}}
});
/** barmatz.events.Event **/
window.barmatz.events.Event = function(type)
{
	if(type === undefined)
		throw new ReferenceError('expected property type is undefined');
	else if(type && typeof type != 'string')
		throw new TypeError('type is not a String');
	
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
/** barmatz.events.EventDispatcher **/
window.barmatz.events.EventDispatcher = function(target)
{
	this._target = target || this;
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
		
		event._target = this._target;
		
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

/** barmatz.events.FormEvent **/
window.barmatz.events.FormEvent = function(type)
{
	if(type === undefined)
		throw new ReferenceError('expected property type is undefined');
	else if(typeof type != 'string')
		throw new TypeError('type is not a String');
	
	barmatz.events.Event.call(this, type);
	
	this._field = null;
	
	switch(type)
	{
		case barmatz.events.FormEvent.FIELD_ADDED:
		case barmatz.events.FormEvent.FIELD_REMOVED:
			this._field = arguments[1];
			break;
	}
};

barmatz.events.FormEvent.prototype = new barmatz.events.Event(null);
barmatz.events.FormEvent.prototype.constructor = barmatz.events.FormEvent;

Object.defineProperties(barmatz.events.FormEvent,
{
	FIELD_ADDED: {value: 'fieldAdded'},
	FIELD_REMOVED: {value: 'fieldRemoved'}
});
Object.defineProperties(barmatz.events.FormEvent.prototype,
{
	field: {get: function()
	{
		return this._field;
	}}
});
/** barmatz.events.LoaderEvent **/
window.barmatz.events.LoaderEvent = function(type)
{
	barmatz.events.Event.call(this, type);
	
	this._request = null;
	this._response = null;
	
	switch(type)
	{
		case barmatz.events.LoaderEvent.UNSENT:
		case barmatz.events.LoaderEvent.OPENED:
			this._request = arguments[1];
		case barmatz.events.LoaderEvent.HEADERS_RECEIVED:
		case barmatz.events.LoaderEvent.LOADING:
		case barmatz.events.LoaderEvent.DONE:
			this._response = arguments[1];
			break;
	}
};

barmatz.events.LoaderEvent.prototype = new barmatz.events.Event(null);
barmatz.events.LoaderEvent.prototype.constructor = barmatz.events.LoaderEvent;

Object.defineProperties(barmatz.events.LoaderEvent,
{
	UNSENT: {value: 'unsent'},
	OPENED: {value: 'opened'},
	HEADERS_RECEIVED: {value: 'headersReceived'},
	LOADING: {value: 'loading'},
	DONE: {value: 'done'}
});

Object.defineProperties(barmatz.events.LoaderEvent.prototype,
{
	request: {get: function()
	{
		return this._request;
	}},
	response: {get: function()
	{
		return this._response;
	}}
});
/** barmatz.events.ModelEvent **/
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

barmatz.events.ModelEvent.prototype = new barmatz.events.Event(null);
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
/** barmatz.mvc.Controller **/
window.barmatz.mvc.Controller = function()
{
	barmatz.events.EventDispatcher.call(this);
};

barmatz.mvc.Controller.prototype = new barmatz.events.EventDispatcher();
barmatz.mvc.Controller.prototype.constructor = barmatz.mvc.Controller;
/** barmatz.mvc.Model **/
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
/** barmatz.forms.FormField **/
window.barmatz.forms.FormField = function(type, name)
{
	if(type === undefined)
		throw new ReferenceError('expected property type is undefined');
	else if(type && typeof type != 'string')
		throw new TypeError('type is not a String');

	if(name === undefined)
		throw new ReferenceError('expected property name is undefined');
	else if(name && typeof name != 'string')
		throw new TypeError('name is not a String');
	
	barmatz.mvc.Model.call(this);
	
	this.set('type', type);
	this.set('name', name);
	this.set('label', null);
	this.set('mandatory', false);
	this.set('default', '');
	this.set('value', '');
	this.set('enabled', true);
};

barmatz.forms.FormField.prototype = new barmatz.mvc.Model();
barmatz.forms.FormField.prototype.constructor = barmatz.forms.FormField;

Object.defineProperties(barmatz.forms.FormField.prototype,
{
	type: {get: function()
	{
		return this.get('type');
	}, enumerable: true},
	name: {get: function()
	{
		return this.get('name');
	}, enumerable: true},
	label: {get: function()
	{
		return this.get('label');
	}, set: function(value)
	{
		this.set('label', value);
	}, enumerable: true},
	mandatory: {get: function()
	{
		return this.get('mandatory');
	}, set: function(value)
	{
		this.set('mandatory', value);
	}, enumerable: true},
	default: {get: function()
	{
		return this.get('default');
	}, set: function(value)
	{
		this.set('default', value);
	}, enumerable: true},
	value: {get: function()
	{
		var value = this.get('value');
		return value == null || value == '' ? this.default : value;
	}, set: function(value)
	{
		this.set('value', value);
	}, enumerable: true},
	enabled: {get: function()
	{
		return this.get('enabled');
	}, set: function(value)
	{
		this.set('enabled', Boolean(value));
	}, enumerable: true}
});
/** barmatz.forms.FormTextField **/
window.barmatz.forms.FormTextField = function(name)
{
	if(name === undefined)
		throw new ReferenceError('expected property name is undefined');
	else if(name && typeof name != 'string')
		throw new TypeError('name is not a String');
	
	barmatz.forms.FormField.call(this, barmatz.forms.FormFieldType.TEXT, name);
	
	this.set('min', null);
	this.set('max', null);
};

barmatz.forms.FormTextField.prototype = new barmatz.forms.FormField(null, null);
barmatz.forms.FormTextField.prototype.constructor = barmatz.forms.FormTextField;

Object.defineProperties(barmatz.forms.FormTextField.prototype,
{
	min: {get: function()
	{
		return this.get('min');
	}, set: function(value)
	{
		this.set('min', value);
	}, enumerable: true},
	max: {get: function()
	{
		return this.get('max');
	}, set: function(value)
	{
		this.set('max', value);
	}, enumerable: true}
});
/** barmatz.forms.Button **/
window.barmatz.forms.Button = function(label)
{
	if(label === undefined)
		throw new ReferenceError('expected property label is undefined');
	else if(label && typeof label != 'string')
		throw new TypeError('label is not a String');
	
	barmatz.mvc.Model.call(this);
	
	this.set('label', label);
};

barmatz.forms.Button.prototype = new barmatz.mvc.Model();
barmatz.forms.Button.prototype.constructor = barmatz.forms.Button;

Object.defineProperties(barmatz.forms.Button.prototype,
{
	label: {get: function()
	{
		return this.get('label');
	}, set: function(value)
	{
		if(label && typeof label != 'string')
			throw new TypeError('label is not a String');
		
		this.set('label', value);
	}}
});
/** barmatz.forms.Factory **/
window.barmatz.forms.Factory = function(){};

Object.defineProperties(barmatz.forms.Factory,
{
	createFormField: {value: function(type, name, properties)
	{
		var field = getFieldByType(type, name);
		
		if(properties.label)
			field.label = properties.label;
		
		if(properties.mandatory == true || properties.mandatory == 'true')
			field.mandatory = true;
		
		setProperties(field, properties);
		
		return field;
		
		function setProperties(object, properties)
		{
			var valueKeys = ['default', 'min', 'max', 'checked', 'value', 'enabled', 'accept'],
				key, value, i;
			
			for(i = 0; i < valueKeys.length; i++)
			{
				key = valueKeys[i];
				
				if(properties[key] !== undefined)
				{
					value = properties[key];
					
					if(object[key] !== undefined)
					{
						if(key == 'accept' && !(value instanceof Array))
							value = [value];
						
						switch(value)
						{
							case 'true':
								value = true;
								break;
							case 'false':
								value = false;
								break;
						}
						
						object[key] = value;
					}
					else
						throw new Error('field of type ' + type + ' doesn\'t have property ' + key);
				}
			}
		}
		
		function getFieldByType(type, name)
		{
			switch(type)
			{
				default:
					throw new Error('unknown field type');
					break;
				case barmatz.forms.FormFieldType.TEXT:
					return new barmatz.forms.FormTextField(name);
					break;
				case barmatz.forms.FormFieldType.PASSWORD:
					return new barmatz.forms.FormPasswordField(name);
					break;
				case barmatz.forms.FormFieldType.CHECKBOX:
					return new barmatz.forms.FormCheckboxField(name);
					break;
				case barmatz.forms.FormFieldType.RADIO: 
					return new barmatz.forms.FormRadioField(name);
					break;
				case barmatz.forms.FormFieldType.FILE:
					return new barmatz.forms.FormFileField(name);
					break;
				case barmatz.forms.FormFieldType.HIDDEN:
					return new barmatz.forms.FormHiddenField(name);
					break;
			}
		}
	}},
	createFormFieldElement: {value: function(data)
	{
		var field, key;
		
		if(data === undefined)
			throw new ReferenceError('expected property data is undefined');
		else if(!(data instanceof barmatz.forms.FormField))
			throw new TypeError('data is not a FormField object');
		
		field = document.createElement(getElementTagName(data.type));
		
		if(field.tagName.toLowerCase() == 'input')
			field.type = data.type;
		
		for(key in data)
			if(field.hasOwnProperty(key))
				field[key] = data[key];
		
		return field;
		
		function getElementTagName(type)
		{
			switch(type)
			{
				case barmatz.forms.FormFieldType.TEXT:
				case barmatz.forms.FormFieldType.PASSWORD:
				case barmatz.forms.FormFieldType.CHECKBOX:
				case barmatz.forms.FormFieldType.RADIO:
				case barmatz.forms.FormFieldType.FILE:
				case barmatz.forms.FormFieldType.HIDDEN:
					return 'input';
					break;
			}
		}
	}},
	createFieldWrapper: {value: function(data)
	{
		var wrapper, label, field, mandatory;
		
		if(data === undefined)
			throw new ReferenceError('expected property data is undefined');
		else if(!(data instanceof barmatz.forms.FormField))
			throw new TypeError('data is not a FormField object');
		
		wrapper = document.createElement('div')
		
		if(data.label)
		{
			label = document.createElement('label'),
			label.innerHTML = data.label;
			wrapper.appendChild(label);
		}
		
		field = barmatz.forms.Factory.createFormFieldElement(data);
		wrapper.appendChild(field);
		
		if(data.mandatory)
		{
			mandatory = document.createElement('span');
			mandatory.innerHTML = '*';
			wrapper.appendChild(mandatory);
		}

		return wrapper;
	}},
	createSubmitButton: {value: function(data)
	{
		var wrapper, button;
		
		if(data === undefined)
			throw new ReferenceError('expected property data is undefined');
		else if(!(data instanceof barmatz.forms.Button))
			throw new TypeError('data is not a Button object');
		
		wrapper = document.createElement('div');
		
		button = document.createElement('button');
		button.innerHTML = data.label;
		
		wrapper.appendChild(button);
		
		return wrapper;
	}}
});
/** barmatz.forms.Form **/
window.barmatz.forms.Form = function()
{
	barmatz.mvc.Model.call(this);
	
	this._fields = [];
	this.set('encoding', 'application/x-www-form-urlencoded');
	this.set('method', barmatz.forms.Methods.GET);
};

barmatz.forms.Form.prototype = new barmatz.mvc.Model();
barmatz.forms.Form.prototype.constructor = barmatz.forms.Form;

Object.defineProperties(barmatz.forms.Form,
{
	init: {value: function(ref, target)
	{
		if(ref === undefined)
			throw new ReferenceError('expected property ref is undefined');
		
		if(target === undefined)
			throw new ReferenceError('expected property target is undefined');
		else if(!(target instanceof HTMLElement))
			throw new TypeError('target is not an HTMLElement');
		
		loadForm();
		
		function loadForm()
		{
			var loader = new barmatz.net.Loader();
			loader.addEventListener(barmatz.events.LoaderEvent.DONE, onLoaderDone);
			loader.load(new barmatz.net.Request('form1.xml'));
		}
		
		function onLoaderDone(event)
		{
			event.target.removeEventListener(barmatz.events.LoaderEvent.DONE, onLoaderDone);
			generateFormFromXML(barmatz.utils.XML.stringToXML(event.response.data));
		}
		
		function generateFormFromXML(xml)
		{
			var form = new barmatz.forms.Form();

			form.createFromXML(xml);
			
			for(i = 0; i < form.numFields; i++)
				target.appendChild(barmatz.forms.Factory.createFieldWrapper(form.getFieldAt(i)));
			
			target.appendChild(barmatz.forms.Factory.createSubmitButton(form.submitButton));
		}
	}}
}); 
Object.defineProperties(barmatz.forms.Form.prototype, 
{
	id: {get: function()
	{
		return this.get('id'); 
	}, set: function(value)
	{
		this.set('id', value);
	}},
	method: {get: function()
	{
		return this.get('method');
	}, set: function(value)
	{
		if(value != barmatz.forms.Methods.GET && value != barmatz.forms.Methods.POST)
			throw new Error('value is not an allowed method');
		
		this.set('method', value);
	}},
	submitButton: {get: function()
	{
		return this.get('submitButton');
	}},
	encoding: {get: function()
	{
		return this.get('encoding');
	}, set: function(value)
	{
		this.set('encoding', value);
	}},
	uri: {get: function()
	{
		return this.get('uri');
	}, set: function(value)
	{
		this.set('uri', value);
	}},
	numFields: {get: function()
	{
		return this._fields.length;
	}},
	createFromXML: {value: function(xml)
	{
		if(xml === undefined)
			throw new ReferenceError('expected parameter xml is undefined');
		else if(!(xml instanceof XMLDocument))
			throw new TypeError('xml is not an XMLDocument object');
		
		this.createFromObject(barmatz.utils.XML.xmlToObject(xml));
	}},
	createFromObject: {value: function(object)
	{
		var _this = this;
		
		if(object === undefined)
			throw new ReferenceError('expected parameter object is undefined');
		else if(typeof object != 'object')
			throw new TypeError('object is not an Object');
		
		setProperties(object);
		setFields(object.field instanceof Array ? object.field : [object.field]);
		setSubmit(object.submit.label);
		
		function setProperties(form)
		{
			_this.id = form.id;
			_this.encoding = form.encoding;
			_this.method = form.method;
			_this.uri = form.uri;
		}
		
		function setFields(fields)
		{
			var field;
			
			while(_this.numFields < fields.length)
			{
				field = fields[_this.numFields];
				_this.addField(barmatz.forms.Factory.createFormField(field.type, field.name, field));
			}
		}
		
		function setSubmit(label)
		{
			_this.set('submitButton', new barmatz.forms.Button(label));
		}
	}},
	addField: {value: function(field)
	{
		if(!(field instanceof barmatz.forms.FormField))
			throw new TypeError('field is not a FormField obejct');
		
		this._fields.push(field);
		this.dispatchEvent(new barmatz.events.FormEvent(barmatz.events.FormEvent.FIELD_ADDED, field));
	}},
	addFieldAt: {value: function(field, index)
	{
		if(!(field instanceof barmatz.forms.FormField))
			throw new TypeError('field is not a FormField obejct');

		if(index < 0)
			index = 0;
		else if(index > this.numFields)
			index = this.numFields;
		
		this._fields.splice(index, 0, field);
		this.dispatchEvent(new barmatz.events.FormEvent(barmatz.events.FormEvent.FIELD_ADDED, field));
	}},
	removeField: {value: function(field)
	{
		if(!(field instanceof barmatz.forms.FormField))
			throw new TypeError('field is not a FormField obejct');
		
		this.removeFieldAt(this._fields.indexOf(field));
		this.dispatchEvent(new barmatz.events.FormEvent(barmatz.events.FormEvent.FIELD_REMOVED, field));
	}},
	removeFieldAt: {value: function(index)
	{
		var field;
		
		if(index < 0 || index >= this.numFields)
			throw new Error('index is out of bounds');
		
		field = this._fields.splice(index, 1)[0];
		this.dispatchEvent(new barmatz.events.FormEvent(barmatz.events.FormEvent.FIELD_REMOVED, field));
	}},
	getFieldAt: {value: function(index)
	{
		if(index < 0 || index >= this.numFields)
			throw new Error('index is out of bounds');
		
		return this._fields[index];
	}},
	getFieldsByType: {value: function(type)
	{
		return this._fields.filter(function(field, index, collection)
		{
			return field.type == type;
		});
	}},
	getFieldByName: {value: function(name)
	{
		return this._fields.filter(function(field, index, collection)
		{
			return field.name == name;
		})[0];
	}},
	submit: {value: function()
	{
		var request = new barmatz.net.Request(this.uri),
			loader = new barmatz.net.Loader(),
			i;
		
		for(i = 0; i < this.numFields; i++)
		{
			field = this.getFieldAt(i);
			request.data[field.name] = field.value;
		}
		
		loader.send();
	}}
});
/** barmatz.forms.FormCheckboxField **/
window.barmatz.forms.FormCheckboxField = function(name)
{
	if(name === undefined)
		throw new ReferenceError('expected property name is undefined');
	else if(name && typeof name != 'string')
		throw new TypeError('name is not a String');
	
	barmatz.forms.FormField.call(this, barmatz.forms.FormFieldType.CHECKBOX, name);
	
	this.set('checked', false);
};

barmatz.forms.FormCheckboxField.prototype = new barmatz.forms.FormField(null, null);
barmatz.forms.FormCheckboxField.prototype.constructor = barmatz.forms.FormCheckboxField;

Object.defineProperties(barmatz.forms.FormCheckboxField.prototype, 
{
	checked: {get: function()
	{
		return this.get('checked');
	}, set: function(value)
	{
		this.set('checked', Boolean(value));
	}, enumerable: true}
});
/** barmatz.forms.FormFieldType **/
window.barmatz.forms.FormFieldType = function(){};

Object.defineProperties(barmatz.forms.FormFieldType,
{
	TEXT: {value: 'text'},
	PASSWORD: {value: 'password'},
	CHECKBOX: {value: 'checkbox'},
	RADIO: {value: 'radio'},
	FILE: {value: 'file'},
	HIDDEN: {value: 'hidden'}
});
/** barmatz.forms.FormFileField **/
window.barmatz.forms.FormFileField = function(name)
{
	if(name === undefined)
		throw new ReferenceError('expected property name is undefined');
	else if(name && typeof name != 'string')
		throw new TypeError('name is not a String');
	
	barmatz.forms.FormField.call(this, barmatz.forms.FormFieldType.FILE, name);
	
	this.set('accept', []);
};

barmatz.forms.FormFileField.prototype = new barmatz.forms.FormField(null, null);
barmatz.forms.FormFileField.prototype.constructor = barmatz.forms.FormFileField;

Object.defineProperties(barmatz.forms.FormFileField.prototype,
{
	accept: {get: function()
	{
		return this.get('accept');
	}, set: function(value)
	{
		if(value && !(value instanceof Array))
			throw new TypeError('value is not an Array');
		
		this.set('accept', value);
	}, enumerable: true}
});
/** barmatz.forms.FormHiddenField **/
window.barmatz.forms.FormHiddenField = function(name)
{
	if(name === undefined)
		throw new ReferenceError('expected property name is undefined');
	else if(name && typeof name != 'string')
		throw new TypeError('name is not a String');
	
	barmatz.forms.FormField.call(this, barmatz.forms.FormFieldType.HIDDEN, name);
};

barmatz.forms.FormHiddenField.prototype = new barmatz.forms.FormField(null, null);
barmatz.forms.FormHiddenField.prototype.constructor = barmatz.forms.FormHiddenField;
/** barmatz.forms.FormPasswordField **/
window.barmatz.forms.FormPasswordField = function(name)
{
	if(name === undefined)
		throw new ReferenceError('expected property name is undefined');
	else if(typeof name != 'string')
		throw new TypeError('name is not a String');
	
	barmatz.forms.FormTextField.call(this, name);
	
	this.set('type', barmatz.forms.FormFieldType.PASSWORD);
};

barmatz.forms.FormPasswordField.prototype = new barmatz.forms.FormTextField(null);
barmatz.forms.FormPasswordField.prototype.constructor = barmatz.forms.FormPasswordField;
/** barmatz.forms.FormRadioField **/
window.barmatz.forms.FormRadioField = function(name)
{
	if(name === undefined)
		throw new ReferenceError('expected property name is undefined');
	else if(name && typeof name != 'string')
		throw new TypeError('name is not a String');
	
	barmatz.forms.FormCheckboxField.call(this, name);
	
	this.set('type', barmatz.forms.FormFieldType.RADIO);
};

barmatz.forms.FormRadioField.prototype = new barmatz.forms.FormCheckboxField(null);
barmatz.forms.FormRadioField.prototype.constructor = barmatz.forms.FormRadioField;
/** barmatz.forms.Methods **/
window.barmatz.forms.Methods = function(){};

Object.defineProperties(barmatz.forms.Methods,
{
	GET: {value: 'get'},
	POST: {value: 'post'}
});
/** barmatz.net.Loader **/
window.barmatz.net.Loader = function()
{
	barmatz.events.EventDispatcher.call(this);
	
	this.__xhr = null;
};

barmatz.net.Loader.prototype = new barmatz.events.EventDispatcher();
barmatz.net.Loader.prototype.constructor = barmatz.net.Loader;

Object.defineProperties(barmatz.net.Loader,
{
	UNSENT: {value: 'UNSENT'},
	OPENED: {value: 'OPENED'},
	HEADERS_RECEIVED: {value: 'HEADERS_RECEIVED'},
	LOADING: {value: 'LOADING'},
	DONE: {value: 'DONE'},
	serialize: {value: function(object)
	{
		var params = [], key, value;
		
		for(key in object)
		{
			value = object[key];
			key = encodeURIComponent(key);
			
			if(typeof value == 'object')
			{
				if(value instanceof Array)
					params.push(key + '=' + value.join('&' + key + '='));
				else
					params.push(this.serialize(value));
			}
			else
				params.push(key + '=' + encodeURIComponent(value));
		}
		
		return params.join('&');
	}}
}); 
Object.defineProperties(barmatz.net.Loader.prototype, 
{
	_xhr: {get: function()
	{
		if(!this.__xhr)
			this.__xhr = window.XMLHttpRequest ? new XMLHttpRequest() : new ActiveXObject('Microsoft.XMLHTTP');
		
		return this.__xhr;
	}},
	state: {get: function()
	{
		switch(this._xhr.readyState)
		{
			case 0:
				return barmatz.net.Loader.UNSENT;
				break;
			case 1:
				return barmatz.net.Loader.OPENED;
				break;
			case 2:
				return barmatz.net.Loader.HEADERS_RECEIVED;
				break;
			case 3:
				return barmatz.net.Loader.LOADING;
				break;
			case 4:
				return barmatz.net.Loader.DONE;
				break;
		}
	}},
	abort: {value: function()
	{
		this._xhr.abort();
	}},
	load: {value: function(request)
	{
		var _this = this, url = request.url;
		
		if(request.data && request.method == barmatz.net.Methods.GET)
			url += (url.indexOf('?') > -1 ? '&' : '?') + barmatz.net.Loader.serialize(request.data);
		
		if(request === undefined)
			throw new ReferenceError('expected property request is undefiend');
		else if(!(request instanceof barmatz.net.Request))
			throw new TypeError('request is not a Request object');
			
		this._xhr.addEventListener('readystatechange', onReadyStateChange);
		
		if(request.credentials)
			this._xhr.open(request.method, url, request.async, request.credentials.user ? request.credentials.user : null, reqeust.credentials.password ? reqeust.credentials.password : null);
		else
			this._xhr.open(request.method, url, request.async);
		
		if(request.method == barmatz.net.Methods.POST)
			this._xhr.send(barmatz.net.Loader.serialize(request.data));
		else
			this._xhr.send();
		
		function onReadyStateChange(event)
		{
			var type;
			
			switch(event.target.readyState)
			{
				case 0:
					type = barmatz.events.LoaderEvent.UNSENT;
				case 1:
					if(!type)
						type = barmatz.events.LoaderEvent.OPENED;
					_this.dispatchEvent(new barmatz.events.LoaderEvent(barmatz.events.LoaderEvent.OPENED, request));
					break;
				case 2:
					type = barmatz.events.LoaderEvent.HEADERS_RECEIVED;
				case 3:
					type = barmatz.events.LoaderEvent.LOADING;
				case 4:
					if(!type)
						type = barmatz.events.LoaderEvent.DONE;
					_this.dispatchEvent(new barmatz.events.LoaderEvent(type, new barmatz.net.Response(request.url, _this._xhr.response, _this._xhr.responseType, _this._xhr.status, _this._xhr.getAllResponseHeaders().split('\n'))));
					break;
			}
		}
	}}
});
/** barmatz.net.Methods **/
window.barmatz.net.Methods = function(){};

Object.defineProperties(barmatz.net.Methods,
{
	GET: {value: 'get'},
	POST: {value: 'post'},
	PUT: {value: 'put'},
	DELETE: {value: 'delete'}	
});
/** barmatz.net.Request */
window.barmatz.net.Request = function(url)
{
	if(url === undefined)
		throw new ReferenceError('expected property url is undefined');
	else if(typeof url != 'string')
		throw new TypeError('url is not a String');
		
	barmatz.mvc.Model.call(this);
	this.set('url', url);
	this.set('method', barmatz.net.Methods.GET);
	this.set('async', true);
	this.set('data', null);
};

barmatz.net.Request.prototype = new barmatz.mvc.Model();
barmatz.net.Request.prototype.constructor = barmatz.net.Request;

Object.defineProperties(barmatz.net.Request.prototype,
{
	data: {get: function()
	{
		var data = this.get('data');
		
		if(!data)
		{
			data = {};
			this.set('data', data);
		}
		
		return data;
	}},
	url: {get: function()
	{
		return this.get('url');
	}},
	method: {get: function()
	{
		return this.get('method');
	}, set: function(value)
	{
		if(typeof value != 'string')
			throw new TypeError('value is not a String');
		
		this.set('method', value);
	}},
	async: {get: function()
	{
		return this.get('async');
	}, set: function(value)
	{
		if(typeof value != 'boolean')
			throw new TypeError('value is not a Boolean');
		
		this.set('async', value);
	}},
	credentials: {get: function()
	{
		return this.get('credentials');
	}, set: function(value)
	{
		if(!(value instanceof barmatz.net.RequestCredentils))
			throw new TypeError('value is not a RequestCredentils object');
		
		this.set('credentials', value);
	}}
});
/** barmatz.net.RequestCredentials **/
window.barmatz.net.RequestCredentials = function()
{
	barmatz.mvc.Model.call(this);
};

barmatz.net.RequestCredentials.prototype = new barmatz.mvc.Model();
barmatz.net.RequestCredentials.prototype.constructor = barmatz.net.RequestCredentials;

Object.defineProperties(barmatz.net.RequestCredentials.prototype,
{
	user: {get: function()
	{
		return this.get('user');
	}, set: function(value)
	{
		if(typeof value != 'string')
			throw new TypeError('value is not a String');
		
		this.set('user', value);
	}},
	password: {get: function()
	{
		return this.get('password');
	}, set: function(value)
	{
		if(typeof value != 'string')
			throw new TypeError('value is not a String');
		
		this.set('password', value);
	}}
});
/** barmatz.net.Response **/
window.barmatz.net.Response = function(url, data, type, status, headers)
{
	if(url === undefined)
		throw new ReferenceError('expected property url is undefined');
	else if(typeof url != 'string')
		throw new TypeError('url is not a String');

	if(data === undefined)
		throw new ReferenceError('expected property data is undefined');

	if(type === undefined)
		throw new ReferenceError('expected property type is undefined');
	else if(typeof type != 'string')
		throw new TypeError('type is not a String');
	
	if(status === undefined)
		throw new ReferenceError('expected property status is undefined');
	else if(typeof status != 'number')
		throw new TypeError('status is not a String');
	
	if(headers === undefined)
		throw new ReferenceError('expected property headers is undefined');
	else if(!(headers instanceof Array))
		throw new TypeError('headers is not an Array');
	
	barmatz.mvc.Model.call(this);
	
	this.set('url', url);
	this.set('data', data);
	this.set('type', type);
	this.set('status', status);
	this.set('headers', headers);
};

barmatz.net.Response.prototype = new barmatz.mvc.Model();
barmatz.net.Response.prototype.constructor = barmatz.net.Response;

Object.defineProperties(barmatz.net.Response.prototype,
{
	url: {get: function()
	{
		return this.get('url');
	}},
	data: {get: function()
	{
		return this.get('data');
	}},
	type: {get: function()
	{
		return this.get('type');
	}},
	status: {get: function()
	{
		return this.get('status');
	}},
	headers: {get: function()
	{
		return this.get('headers');
	}}
});
