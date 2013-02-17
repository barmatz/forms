/** namespaces **/
window.barmatz = {
	events: {},
	forms: {},
	mvc: {},
	net: {},
	utils: {}
};
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
					obj[nodeName == '#text' ? 'content' : nodeName] = this.xmlToObject(item);
				else 
				{
					if(typeof obj[nodeName].length == 'undefined') 
					{
						old = obj[nodeName];
						obj[nodeName] = [];
						obj[nodeName].push(old);
					}
		
					obj[nodeName].push(this.xmlToObject(item));
				}
			}
		}
		
		return obj;
	}}
});
/** barmatz.forms.Form **/
window.barmatz.forms.Form = function()
{
	barmatz.events.EventDispatcher.call(this);
	
	this._formInfo = null;
};

barmatz.forms.Form.prototype = new barmatz.events.EventDispatcher();
barmatz.forms.Form.prototype.constructor = barmatz.forms.Form;

Object.defineProperties(barmatz.forms.Form.prototype, 
{
	id: {get: function()
	{
		return this._formInfo ? this._formInfo.id : null;
	}},
	numFields: {get: function()
	{
		return this._formInfo && this._formInfo.fields ? this._formInfo.fields.length : 0;
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
		var fields, field;
		
		if(object === undefined)
			throw new ReferenceError('expected parameter object is undefined');
		else if(typeof object != 'object')
			throw new TypeError('object is not an Object');
		else if(!object.form)
			throw new Error('invalid object');
		
		this._formInfo = new barmatz.forms.FormInfo(object.form.id);
		
		fields = object.form.field instanceof Array ? object.form.field : [object.form.field];

		while(this.numFields < fields.length)
		{
			var field = fields[this.numFields];
			this._formInfo.addField(new barmatz.forms.FormField(field.type, field.name));
		}
		
		console.log(this._formInfo.fields);
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
	this.set('default', null);
	this.set('value', null);
	this.set('enabled', null);
};

barmatz.forms.FormField.prototype = new barmatz.mvc.Model();
barmatz.forms.FormField.prototype.constructor = barmatz.forms.FormField;

Object.defineProperties(barmatz.forms.FormField.prototype,
{
	type: {get: function()
	{
		return this.get('type');
	}},
	name: {get: function()
	{
		return this.get('name');
	}},
	default: {get: function()
	{
		return this.get('default');
	}, set: function(value)
	{
		this.set('default', value);
	}},
	value: {get: function()
	{
		var value = this.get('value');
		return value == null ? this.default : value;
	}, set: function(value)
	{
		this.set('value', value);
	}},
	enabled: {get: function()
	{
		return this.get('enabled');
	}, set: function(value)
	{
		this.set('enabled', value);
	}}
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
/** barmatz.forms.FormInfo **/
window.barmatz.forms.FormInfo = function(id)
{
	if(id === undefined)
		throw new ReferenceError('expected property id is undefined');
	else if(typeof id != 'string')
		throw new TypeError('id is not a String');
	
	barmatz.mvc.Model.call(this);
	
	
	this.set('id', id);
	this.set('fields', []);
};

barmatz.forms.FormInfo.prototype = new barmatz.mvc.Model();
barmatz.forms.FormInfo.prototype.constructor = barmatz.forms.FormInfo;

Object.defineProperties(barmatz.forms.FormInfo.prototype,
{
	id: {get: function()
	{
		return this.get('id'); 
	}},
	fields: {get: function()
	{
		return this.get('fields');
	}},
	addField: {value: function(field)
	{
		if(!(field instanceof barmatz.forms.FormField))
			throw new TypeError('field is not a FormField obejct');
		this.fields.push(field);
	}},
	addFieldAt: {value: function(field, index)
	{
		if(!(field instanceof barmatz.forms.FormField))
			throw new TypeError('field is not a FormField obejct');

		if(index < 0)
			index = 0;
		else if(index > this.fields.length)
			index = this.fields.length;
		
		this.fields.splice(index, 0, field);
	}},
	removeField: {value: function(field)
	{
		if(!(field instanceof barmatz.forms.FormField))
			throw new TypeError('field is not a FormField obejct');
		this.removeFieldAt(this.fields.indexOf(field));
	}},
	removeFieldAt: {value: function(index)
	{
		if(index < 0 || index >= this.fields.length)
			throw new Error('index is out of bounds');
		this.fields.splice(index, 1);
	}}
});
/** barmatz.forms.FormTextField **/
window.barmatz.forms.FormTextField = function(name)
{
	if(name === undefined)
		throw new ReferenceError('expected property name is undefined');
	else if(typeof name != 'string')
		throw new TypeError('name is not a String');
	
	barmatz.forms.FormField.call(this, barmatz.forms.FormFieldType.TEXT, name);
};

barmatz.forms.FormTextField.prototype = new barmatz.forms.FormField(null, null);
barmatz.forms.FormTextField.prototype.constructor = barmatz.forms.FormTextField;
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
	DONE: {value: 'DONE'}
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
		var _this = this;
		
		if(request === undefined)
			throw new ReferenceError('expected property request is undefiend');
		else if(!(request instanceof barmatz.net.Request))
			throw new TypeError('request is not a Request object');
			
		this._xhr.addEventListener('readystatechange', onReadyStateChange);
		
		if(request.credentials)
			this._xhr.open(request.method, request.url, request.async, request.credentials.user ? request.credentials.user : null, reqeust.credentials.password ? reqeust.credentials.password : null);
		else
			this._xhr.open(request.method, request.url, request.async);
		
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
/** barmatz.net.Request */
window.barmatz.net.Request = function(url)
{
	if(url === undefined)
		throw new ReferenceError('expected property url is undefined');
	else if(typeof url != 'string')
		throw new TypeError('url is not a String');
		
	barmatz.mvc.Model.call(this);
	this.set('url', url);
	this.set('method', barmatz.net.Request.GET);
	this.set('async', true);
};

barmatz.net.Request.prototype = new barmatz.mvc.Model();
barmatz.net.Request.prototype.constructor = barmatz.net.Request;

Object.defineProperties(barmatz.net.Request,
{
	GET: {value: 'GET'},
	POST: {value: 'POST'},
	PUT: {value: 'PUT'},
	DELETE: {value: 'DELETE'}
});
Object.defineProperties(barmatz.net.Request.prototype,
{
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
