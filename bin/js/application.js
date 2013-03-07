/** namespaces **/
window.barmatz = {
	events: {},
	forms: {
		factories: {},
		fields: {},
		ui: {}
	},
	mvc: {},
	net: {},
	utils: {}
};
/** barmatz.utils.CSS **/
window.barmatz.utils.CSS = function(){};

Object.defineProperties(barmatz.utils.CSS, 
{
	getStyle: {value: function(element)
	{
		barmatz.utils.DataTypes.isNotUndefined(element);
		barmatz.utils.DataTypes.isInstanceOf(element, HTMLElement);
		
		if(element.currentStyle)
			return element.currentStyle;
		else if(document.defaultView && document.defaultView.getComputedStyle)
			return document.defaultView.getComputedStyle(element);
		else
			return element.style;
	}},
	unitToPixal: {value: function(element, value)
	{
		barmatz.utils.DataTypes.isNotUndefined(element);
		barmatz.utils.DataTypes.isNotUndefined(value);
		barmatz.utils.DataTypes.isInstanceOf(element, HTMLElement);
		barmatz.utils.DataTypes.isTypeOf(value, 'string');
		
		if(/em/.test(value))
			return this.emToPixal(element, parseFloat(value));
		else if(/px/.test(value))
			return parseFloat(value);
		else
			return 0;
	}},
	emToPixal: {value: function(element, value)
	{
		barmatz.utils.DataTypes.isNotUndefined(element);
		barmatz.utils.DataTypes.isNotUndefined(value);
		barmatz.utils.DataTypes.isInstanceOf(element, HTMLElement);
		barmatz.utils.DataTypes.isTypeOf(value, 'number');
		return parseFloat(this.getStyle(element).fontSize) * value;
	}},
	absoluteHeight: {value: function(element)
	{
		barmatz.utils.DataTypes.isNotUndefined(element);
		barmatz.utils.DataTypes.isInstanceOf(element, HTMLElement);
		return element.offsetHeight + this.unitToPixal(element, this.getStyle(element).marginTop) + this.unitToPixal(element, this.getStyle(element).marginBottom) + this.unitToPixal(element, this.getStyle(element).borderTop) + this.unitToPixal(element, this.getStyle(element).borderBottom);
	}},
	absoluteWidth: {value: function(element)
	{
		barmatz.utils.DataTypes.isNotUndefined(element);
		barmatz.utils.DataTypes.isInstanceOf(element, HTMLElement);
		return element.offsetWidth + this.unitToPixal(element, this.getStyle(element).marginLeft) + this.unitToPixal(element, this.getStyle(element).marginRight) + this.unitToPixal(element, this.getStyle(element).borderLeft) + this.unitToPixal(element, this.getStyle(element).borderRight);
	}},
	verticalAlign: {value: function(element)
	{
		var parent;
		
		barmatz.utils.DataTypes.isNotUndefined(element);
		barmatz.utils.DataTypes.isInstanceOf(element, HTMLElement);
		
		parent = element.parentElement;
		
		if(parent)
			element.style.marginTop = ((parent.offsetHeight * .5) - (this.absoluteHeight(element) * .5)) + 'px';
	}},
	verticalAlignChildren: {value: function(element)
	{
		var i;
		
		barmatz.utils.DataTypes.isNotUndefined(element);
		barmatz.utils.DataTypes.isInstanceOf(element, HTMLElement);
		
		for(i = 0; i < element.childNodes.length; i++)
			this.verticalAlign(element.childNodes[i]);
	}}
});
/** barmatz.utils.DOM **/
window.barmatz.utils.DOM = function(){};

Object.defineProperties(barmatz.utils.DOM,
{
	isChildOf: {value: function(child, parent)
	{
		var element;
		
		barmatz.utils.DataTypes.isNotUndefined(child);
		barmatz.utils.DataTypes.isNotUndefined(parent);
		barmatz.utils.DataTypes.isInstanceOf(child, HTMLElement);
		barmatz.utils.DataTypes.isInstanceOf(parent, HTMLElement);

		element = child.parentElement;
		
		while(element != null)
		{
			if(element == parent)
				return true;
			element = element.parentElement;
		}
		
		return false;
	}}
});
/** barmatz.utils.DataTypes **/
window.barmatz.utils.DataTypes = function(){};

Object.defineProperties(barmatz.utils.DataTypes, 
{
	UNDEFINED_ERROR: {value: 'expected property is undefined'},
	INVALID_VALUE_ERROR: {value: 'value is not valid'},
	WRONG_TYPE: {value: 'data type is wrong'},
	WRONG_INSTANCE: {value: 'instance is wrong object'},
	WRONG_TYPE_INSTANCE: {value: 'data type is wrong or instance is wrong object'},
	VALUE_NULL: {value: 'value is null'},
	_recursiveVlidation: {value: function(value, collection, method, errorMessage, allowNull)
	{
		var errors, i;

		if(!allowNull)
			this.isValid(value);
		else if(allowNull && value == null)
			return true;
		
		errors = 0;
		
		for(i = 0; i < collection.length; i++)
		{
			try
			{
				method(value, collection[i], allowNull);
			}
			catch(error)
			{
				errors++;
			}
		}
		
		if(errors == collection.length - 1)
			if(!this.throw(TypeError, errorMessage))
				return false;
		
		return true;
	}},
	_silent: {value: false, writable: true},
	silent: {get: function()
	{
		return this._silent;
	}, set: function(value)
	{
		this._silent = value;
	}},
	applySilent: {value: function(method)
	{
		var returnValue, args;
		
		args = Array.prototype.slice.call(arguments, 1, arguments.length);
		
		this.silent = true;
		returnValue = this[method].apply(this, args);
		this.silent = false;
		
		return returnValue;
	}},
	throw: {value: function(error, message)
	{
		if(this.silent)
			return false;
		else
		{
			throw new error(message);
			return true;
		}
	}},
	isNotUndefined: {value: function(value)
	{
		if(value === undefined)
			if(!this.throw(ReferenceError, this.UNDEFINED_ERROR))
				return false;
		return true;
	}},
	isValid: {value: function(value)
	{
		if(value == null)
			if(!this.throw(TypeError, this.INVALID_VALUE_ERROR))
				return false;
		return true;
	}},
	isallowNull: {value: function(value)
	{
		if(value == null)
			if(!this.throw(TypeError, this.VALUE_NULL))
			return false;
		return true;
	}},
	isTypeOf: {value: function(value, type, allowNull)
	{
		if(!allowNull)
			this.isValid(value);
		else if(allowNull && value == null)
			return true;
		if(typeof value != type)
			if(!this.throw(TypeError, this.WRONG_TYPE))
				return false;
		return true;
	}},
	isTypesOf: {value: function(value, types, allowNull)
	{
		this._recursiveVlidation(value, types, this.isTypeOf, this.WRONG_INSTANCE, allowNull);
		return true;
	}},
	isInstanceOf: {value: function(instance, object, allowNull)
	{
		if(!allowNull)
			this.isValid(instance);
		else if(allowNull && instance == null)
			return true;
		if(!(instance instanceof object))
			if(!this.throw(TypeError, this.WRONG_INSTANCE))
				return false;
		return true;
	}},
	isInstacnesOf: {value: function(isntance, objects, allowNull)
	{
		this._recursiveVlidation(isntance, objects, this.isInstanceOf, this.WRONG_INSTANCE, allowNull);
		return true;
	}},
	isTypeOrInstance: {value: function(value, type, object, allowNull)
	{
		if(!allowNull)
			this.isValid(value);
		else if(allowNull && value == null)
			return true;
		if(typeof value != type || !(value instanceof object))
			if(!this.throw(TypeError, this.WRONG_TYPE_INSTANCE))
				return false;
		return true;
	}},
	isTypesOrInstances: {value: function(value, types, objects, allowNull)
	{
		var isType, isInstance;
		
		if(!allowNull)
			this.isValid(value);
		else if(allowNull && value == null)
			return true;

		try
		{
			isType = this.isTypesOf(value, types, allowNull);
		}
		catch(error){}
		try
		{
			isInstance = this.isInstacnesOf(value, objects, allowNull);
		}
		catch(error){}
		
		if(!isType && !isInstance)
			if(!this.throw(TypeError, this.WRONG_TYPE_INSTANCE))
				return false;
		return true;
	}}
});
/** barmatz.utils.Dictionary **/
window.barmatz.utils.Dictionary = function()
{
	this._keys = [];
	this._values = [];
};

Object.defineProperties(barmatz.utils.Dictionary.prototype,
{
	add: {value: function(key, value)
	{
		var keyIndex = this._keys.indexOf(key);
		
		if(keyIndex >= 0)
			this._values[keyIndex] = value;
		else if(keyIndex == -1)
		{
			this._keys.push(key);
			this._values.push(value);
		}
		else
			throw new Error('an error has occured');
		
		return value;
	}},
	remove: {value: function(key)
	{
		var keyIndex, value;
		keyIndex = this._keys.indexOf(key);
		value = this.get(keyIndex);
		this._keys.splice(keyIndex, 1);
		this._values.splice(keyIndex, 1);
		return value;
	}},
	get: {value: function(key)
	{
		return this._values[this._keys.indexOf(key)];
	}},
	getNext: {value: function(key)
	{
		return this._values[this._keys.indexOf(key) + 1];
	}},
	getPrev: {value: function(key)
	{
		return this._values[this._keys.indexOf(key) - 1];
	}},
	reset: {value: function()
	{
		this._keys.splice(0, this._keys.length);
		this._values.splice(0, this._values.length);
	}},
	forEach: {value: function(callback)
	{
		var i;
		for(i = 0; i < this._keys.length; i++)
			callback(this._values[i], this._keys[i], this._values);
	}},
	find: {value: function(value)
	{
		if(value === undefined)
			throw new ReferenceError('expected property value is undefined');
		
		return this._keys[this._values.indexOf(value)];
	}}
});
/** barmatz.utils.String **/
window.barmatz.utils.String = function(){};

Object.defineProperties(barmatz.utils.String,
{
	firstLetterToUpperCase: {value: function(string)
	{
		return string.substring(0, 1).toUpperCase() + string.substring(1, string.length);
	}}
});
/** barmatz.utils.Window **/
window.barmatz.utils.Window = function(){};

Object.defineProperties(barmatz.utils.Window, 
{
	height: {get: function()
	{
		if(document.body && document.body.offsetHeight)
			return document.body.offsetHeight;
		else if(document.compatMode == 'CSS1Compat' && document.documentElement && document.documentElement.offsetHeight) 
			return document.documentElement.offsetHeight;
		else if(window.innerHeight)
			return window.innerHeight;
		else
			return NaN;
	}},
	width: {get: function()
	{
		if(document.body && document.body.offsetWidth)
			return document.body.offsetWidth;
		else if(document.compatMode == 'CSS1Compat' && document.documentElement && document.documentElement.offsetWidth) 
			return document.documentElement.offsetWidth;
		else if(window.innerWidth)
			return window.innerWidth;
		else
			return NaN;
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
					if(barmatz.utils.DataTypes.isInstanceOf(obj[nodeName], Array))
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
	barmatz.utils.DataTypes.isNotUndefined(type);
	barmatz.utils.DataTypes.isTypeOf(type, 'string', true);
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
/** barmatz.events.CollectionEvent **/
window.barmatz.events.CollectionEvent = function(type)
{
	barmatz.utils.DataTypes.isNotUndefined(type);
	barmatz.utils.DataTypes.isTypeOf(type, 'string');
	barmatz.events.Event.call(this, type);
	
	this._item = null;
	this._index = NaN;
	
	switch(type)
	{
		case barmatz.events.CollectionEvent.ADDED:
		case barmatz.events.CollectionEvent.REMOVED:
			this._item = arguments[1];
			this._index = arguments[2];
			break;
	}
};

barmatz.events.CollectionEvent.prototype = new barmatz.events.Event(null);
barmatz.events.CollectionEvent.prototype.constructor = barmatz.events.CollectionEvent;

Object.defineProperties(barmatz.events.CollectionEvent,
{
	ADDED: {value: 'added'},
	REMOVED: {value: 'removed'}
});
Object.defineProperties(barmatz.events.CollectionEvent.prototype,
{
	item: {get: function()
	{
		return this._item;
	}},
	index: {get: function()
	{
		return this._index;
	}},
	clone: {value: function(type)
	{
		var event = new barmatz.events.CollectionEvent(type);
		event._target = this.target;
		event._field = this.field;
		event._index = this.index;
		return event;
	}},
	toString: {value: function()
	{
		return this.formatToString('CollectionEvent', 'type', 'item', 'index');
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
		barmatz.utils.DataTypes.isTypeOf(type, 'string');
		barmatz.utils.DataTypes.isTypeOf(listener, 'function');
		
		if(!this._listeners[type])
			this._listeners[type] = [];
		
		this._listeners[type].push(listener);
	}},
	dispatchEvent: {value: function(event)
	{
		var i, c;
		
		barmatz.utils.DataTypes.isInstanceOf(event, barmatz.events.Event);
		
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
	}},
	clone: {value: function(type)
	{
		var event = new barmatz.events.LoaderEvent(type);
		event._target = this.target;
		event._request = this.request;
		event._response = this.response;
		return event;
	}},
	toString: {value: function()
	{
		return this.formatToString('LoaderEvent', 'type', 'request', 'response');
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

Object.defineProperties(barmatz.events.ModelEvent, 
{
	VALUE_CHANGED: {value: 'valueChanged'}
});
Object.defineProperties(barmatz.events.ModelEvent.prototype, 
{
	key: {get: function()
	{
		return this._key;
	}},
	value: {get: function()
	{
		return this._value;
	}},
	clone: {value: function(type)
	{
		var event = new barmatz.events.ModelEvent(type);
		event._target = this.target;
		event._key = this.key;
		event._value = this.value;
		return event;
	}},
	toString: {value: function()
	{
		return this.formatToString('ModelEvent', 'type', 'key', 'value');
	}}
});
/** barmatz.mvc.Controller **/
window.barmatz.mvc.Controller = function(){};
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
/** barmatz.forms.CollectionController **/
window.barmatz.forms.CollectionController = function(model, view)
{
	var _this = this;
	
	barmatz.utils.DataTypes.isInstanceOf(model, barmatz.forms.CollectionModel, true);
	barmatz.utils.DataTypes.isInstanceOf(view, HTMLElement, true);
	barmatz.mvc.Controller.call(this);

	this._model = model;
	this._view = view;
	
	if(model)
	{
		model.addEventListener(barmatz.events.CollectionEvent.ADDED, onModelAdded);
		model.addEventListener(barmatz.events.CollectionEvent.REMOVED, onModelRemoved);
		model.forEach(function(item, index, collection)
		{
			_this._addItemModelToView(item);
		});
	}
	
	function onModelAdded(event)
	{
		barmatz.utils.DataTypes.isNotUndefined(event);
		barmatz.utils.DataTypes.isInstanceOf(event, barmatz.events.CollectionEvent);
		_this._addItemModelToView(event.item);
	}
	
	function onModelRemoved(event)
	{
		barmatz.utils.DataTypes.isNotUndefined(event);
		barmatz.utils.DataTypes.isInstanceOf(event, barmatz.events.CollectionEvent);
		view.removeChild(view.childNodes[event.index]);
	}
};

barmatz.forms.CollectionController.prototype = new barmatz.mvc.Controller();
barmatz.forms.CollectionController.prototype.constructor = barmatz.forms.CollectionController;

Object.defineProperties(barmatz.forms.CollectionController.prototype,
{
	_addItemModelToView: {value: function(model)
	{
		barmatz.utils.DataTypes.isNotUndefined(model);
		barmatz.utils.DataTypes.isInstanceOf(model, barmatz.mvc.Model);
		this._view.appendChild(this._createItemViewFromModel(model));
	}},
	_createItemViewFromModel: {value: function(model)
	{
		throw new Error('method must be overridden');
	}}
});
/** barmatz.forms.CollectionModel **/
window.barmatz.forms.CollectionModel = function()
{
	barmatz.mvc.Model.call(this);
	this.set('items', []);
};

barmatz.forms.CollectionModel.prototype = new barmatz.mvc.Model();
barmatz.forms.CollectionModel.prototype.constructor = barmatz.forms.CollectionModel;

Object.defineProperties(barmatz.forms.CollectionModel.prototype,
{
	numItems: {get: function()
	{
		return this.get('items').length;
	}},
	addItem: {value: function(item)
	{
		var items;
		
		barmatz.utils.DataTypes.isNotUndefined(item);
		barmatz.utils.DataTypes.isInstanceOf(item, barmatz.mvc.Model);
		
		items = this.get('items');
		items.push(item);
		this.dispatchEvent(new barmatz.events.CollectionEvent(barmatz.events.CollectionEvent.ADDED, item, items.length - 1));
	}},
	removeItem: {value: function(item)
	{
		var items, index;
		
		barmatz.utils.DataTypes.isNotUndefined(item);
		barmatz.utils.DataTypes.isInstanceOf(item, barmatz.mvc.Model);
		
		items = this.get('items')
		index = items.indexOf(item);
		items.splice(index, 1);
		this.dispatchEvent(new barmatz.events.CollectionEvent(barmatz.events.CollectionEvent.REMOVED, item, index));
	}},
	getItemAt: {value: function(index)
	{
		barmatz.utils.DataTypes.isNotUndefined(index);
		barmatz.utils.DataTypes.isTypeOf(index, 'number');
		return this.get('items')[index];
	}},
	getItemIndex: {value: function(item)
	{
		barmatz.utils.DataTypes.isNotUndefined(item);
		barmatz.utils.DataTypes.isInstanceOf(item, barmatz.mvc.Model);
		return this.get('items').indexOf(item);
	}},
	setItemIndex: {value: function(item, index)
	{
		var items;
		
		barmatz.utils.DataTypes.isNotUndefined(item);
		barmatz.utils.DataTypes.isNotUndefined(index);
		barmatz.utils.DataTypes.isInstanceOf(item, barmatz.mvc.Model);
		barmatz.utils.DataTypes.isTypeOf(index, 'number');
		
		items = this.get('items');
		items.splice(items.indexOf(item), 1);
		items.splice(index, 0, item);
	}},
	forEach: {value: function(handler)
	{
		var items, i;
		
		barmatz.utils.DataTypes.isNotUndefined(handler);
		barmatz.utils.DataTypes.isTypeOf(handler, 'function');

		items = this.get('items');
		
		for(i = 0; i < items.length; i++)
			handler(items[i], i, items);
	}}
});
/** barmatz.forms.TypeModel **/
window.barmatz.forms.TypeModel = function(type)
{
	barmatz.utils.DataTypes.isNotUndefined(type);
	barmatz.utils.DataTypes.isTypeOf(type, 'string', true);
	barmatz.mvc.Model.call(this);
	this.set('type', type);
};

barmatz.forms.TypeModel.prototype = new barmatz.mvc.Model();
barmatz.forms.TypeModel.prototype.constructor = barmatz.forms.TypeModel;

Object.defineProperties(barmatz.forms.TypeModel.prototype, 
{
	type: {get: function()
	{
		return this.get('type');
	}}
});
/** barmatz.forms.fields.FormFieldModel **/
window.barmatz.forms.fields.FormFieldModel = function(type, name)
{
	barmatz.utils.DataTypes.isNotUndefined(type);
	barmatz.utils.DataTypes.isNotUndefined(name);
	barmatz.utils.DataTypes.isTypeOf(type, 'string', true);
	barmatz.utils.DataTypes.isTypeOf(name, 'string', true);
	barmatz.forms.TypeModel.call(this, type);
	this.set('name', name);
	this.set('label', null);
	this.set('mandatory', false);
	this.set('default', '');
	this.set('value', '');
	this.set('enabled', true);
};

barmatz.forms.fields.FormFieldModel.prototype = new barmatz.forms.TypeModel(null);
barmatz.forms.fields.FormFieldModel.prototype.constructor = barmatz.forms.fields.FormFieldModel;

Object.defineProperties(barmatz.forms.fields.FormFieldModel.prototype,
{
	name: {get: function()
	{
		return this.get('name');
	}, set: function(value)
	{
		barmatz.utils.DataTypes.isTypeOf(value, 'string');
		this.set('name', value);
	}},
	label: {get: function()
	{
		return this.get('label');
	}, set: function(value)
	{
		barmatz.utils.DataTypes.isTypeOf(value, 'string');
		this.set('label', value);
	}},
	mandatory: {get: function()
	{
		return this.get('mandatory');
	}, set: function(value)
	{
		barmatz.utils.DataTypes.isTypeOf(value, 'boolean');
		this.set('mandatory', value);
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
		return value == null || value == '' ? this.default : value;
	}, set: function(value)
	{
		this.set('value', value);
	}},
	enabled: {get: function()
	{
		return this.get('enabled');
	}, set: function(value)
	{
		barmatz.utils.DataTypes.isTypeOf(value, 'boolean');
		this.set('enabled', Boolean(value));
	}}
});
/** barmatz.forms.fields.FormTextFieldModel **/
window.barmatz.forms.fields.FormTextFieldModel = function(name)
{
	barmatz.utils.DataTypes.isNotUndefined(name);
	barmatz.utils.DataTypes.isTypeOf(name, 'string', true);
	barmatz.forms.fields.FormFieldModel.call(this, barmatz.forms.fields.FormFieldTypes.TEXT, name);
	this.set('min', null);
	this.set('max', null);
};

barmatz.forms.fields.FormTextFieldModel.prototype = new barmatz.forms.fields.FormFieldModel(null, null);
barmatz.forms.fields.FormTextFieldModel.prototype.constructor = barmatz.forms.fields.FormTextFieldModel;

Object.defineProperties(barmatz.forms.fields.FormTextFieldModel.prototype,
{
	min: {get: function()
	{
		return this.get('min');
	}, set: function(value)
	{
		barmatz.utils.DataTypes.isTypeOf(value, 'number');
		this.set('min', value);
	}},
	max: {get: function()
	{
		return this.get('max');
	}, set: function(value)
	{
		barmatz.utils.DataTypes.isTypeOf(value, 'number');
		this.set('max', value);
	}}
});
/** barmatz.forms.fields.FormCheckboxFieldModel **/
window.barmatz.forms.fields.FormCheckboxFieldModel = function(name)
{
	barmatz.utils.DataTypes.isNotUndefined(name);
	barmatz.utils.DataTypes.isTypeOf(name, 'string', true);
	barmatz.forms.fields.FormFieldModel.call(this, barmatz.forms.fields.FormFieldTypes.CHECKBOX, name);
	this.set('checked', false);
	this.set('defaultChecked', false);
};

barmatz.forms.fields.FormCheckboxFieldModel.prototype = new barmatz.forms.fields.FormFieldModel(null, null);
barmatz.forms.fields.FormCheckboxFieldModel.prototype.constructor = barmatz.forms.fields.FormCheckboxFieldModel;

Object.defineProperties(barmatz.forms.fields.FormCheckboxFieldModel.prototype, 
{
	checked: {get: function()
	{
		return this.get('checked');
	}, set: function(value)
	{
		barmatz.utils.DataTypes.isTypeOf(value, 'boolean');
		this.set('checked', value);
	}},
	defaultChecked: {get: function()
	{
		return this.get('defaultChecked');
	}, set: function(value)
	{
		barmatz.utils.DataTypes.isTypeOf(value, 'boolean');
		this.set('defaultChecked', value);
	}},
	value: {get: function()
	{
		return this.checked ? this.get('value') : null;
	}}
});
/** barmatz.forms.fields.FormFieldTypes **/
window.barmatz.forms.fields.FormFieldTypes = function(){};

Object.defineProperties(barmatz.forms.fields.FormFieldTypes,
{
	TEXT: {value: 'text'},
	PASSWORD: {value: 'password'},
	CHECKBOX: {value: 'checkbox'},
	RADIO: {value: 'radio'},
	FILE: {value: 'file'},
	HIDDEN: {value: 'hidden'}
});
/** barmatz.forms.fields.FormFileFieldModel **/
window.barmatz.forms.fields.FormFileFieldModel = function(name)
{
	barmatz.utils.DataTypes.isNotUndefined(name);
	barmatz.utils.DataTypes.isTypeOf(name, 'string');
	
	barmatz.forms.fields.FormFieldModel.call(this, barmatz.forms.fields.FormFieldTypes.FILE, name);
	
	this.set('accept', []);
};

barmatz.forms.fields.FormFileFieldModel.prototype = new barmatz.forms.fields.FormFieldModel(null, null);
barmatz.forms.fields.FormFileFieldModel.prototype.constructor = barmatz.forms.fields.FormFileFieldModel;

Object.defineProperties(barmatz.forms.fields.FormFileFieldModel.prototype,
{
	accept: {get: function()
	{
		return this.get('accept');
	}, set: function(value)
	{
		barmatz.utils.DataTypes.isInstanceOf(value, Array);
		this.set('accept', value);
	}}
});
/** barmatz.forms.fields.FormHiddenFieldModel **/
window.barmatz.forms.fields.FormHiddenFieldModel = function(name)
{
	barmatz.utils.DataTypes.isNotUndefined(name);
	barmatz.utils.DataTypes.isTypeOf(name, 'string');
	barmatz.forms.fields.FormFieldModel.call(this, barmatz.forms.fields.FormFieldTypes.HIDDEN, name);
};

barmatz.forms.fields.FormHiddenFieldModel.prototype = new barmatz.forms.fields.FormFieldModel(null, null);
barmatz.forms.fields.FormHiddenFieldModel.prototype.constructor = barmatz.forms.fields.FormHiddenFieldModel;
/** barmatz.forms.fields.FormPasswordFieldModel **/
window.barmatz.forms.fields.FormPasswordFieldModel = function(name)
{
	barmatz.utils.DataTypes.isNotUndefined(name);
	barmatz.utils.DataTypes.isTypeOf(name, 'string');
	barmatz.forms.fields.FormTextFieldModel.call(this, name);
	this.set('type', barmatz.forms.fields.FormFieldTypes.PASSWORD);
};

barmatz.forms.fields.FormPasswordFieldModel.prototype = new barmatz.forms.fields.FormTextFieldModel(null);
barmatz.forms.fields.FormPasswordFieldModel.prototype.constructor = barmatz.forms.fields.FormPasswordFieldModel;
/** barmatz.forms.fields.FormRadioFieldModel **/
window.barmatz.forms.fields.FormRadioFieldModel = function(name)
{
	barmatz.utils.DataTypes.isNotUndefined(name);
	barmatz.utils.DataTypes.isTypeOf(name, 'string');
	barmatz.forms.fields.FormCheckboxFieldModel.call(this, name);
	this.set('type', barmatz.forms.fields.FormFieldTypes.RADIO);
};

barmatz.forms.fields.FormRadioFieldModel.prototype = new barmatz.forms.fields.FormCheckboxFieldModel(null);
barmatz.forms.fields.FormRadioFieldModel.prototype.constructor = barmatz.forms.fields.FormRadioFieldModel;
/** barmatz.forms.ui.DialogController **/
window.barmatz.forms.ui.DialogController = function(model, view)
{
	barmatz.utils.DataTypes.isNotUndefined(model);
	barmatz.utils.DataTypes.isNotUndefined(view);
	barmatz.utils.DataTypes.isInstanceOf(model, barmatz.mvc.Model, true);
	barmatz.utils.DataTypes.isInstanceOf(view, HTMLElement, true);
	barmatz.mvc.Controller.call(this);
	this._model = model;
	this._view = view;
};

barmatz.forms.ui.DialogController.prototype = new barmatz.mvc.Controller();
barmatz.forms.ui.DialogController.prototype.constructor = barmatz.forms.ui.DialogController;

Object.defineProperties(barmatz.forms.ui.DialogController.prototype, {});
/** barmatz.forms.ui.PromptDialogController **/
window.barmatz.forms.ui.PromptDialogController = function(model, view, fieldView)
{
	barmatz.utils.DataTypes.isNotUndefined(model);
	barmatz.utils.DataTypes.isNotUndefined(view);
	barmatz.utils.DataTypes.isNotUndefined(fieldView);
	barmatz.utils.DataTypes.isInstanceOf(model, barmatz.mvc.Model, true);
	barmatz.utils.DataTypes.isInstanceOf(view, HTMLElement, true);
	barmatz.utils.DataTypes.isInstanceOf(fieldView, HTMLInputElement, true);
	barmatz.forms.ui.DialogController.call(this, model, view);
	this._fieldView = fieldView;
};

barmatz.forms.ui.PromptDialogController.prototype = new barmatz.forms.ui.DialogController(null, null);
barmatz.forms.ui.PromptDialogController.prototype.constructor = barmatz.forms.ui.PromptDialogController;

Object.defineProperties(barmatz.forms.ui.PromptDialogController.prototype, 
{
	_submitDialog: {value: function()
	{
		throw new Error('method must be overridden');
	}}
});
/** barmatz.forms.ui.Builder **/
window.barmatz.forms.ui.Builder = function(container)
{
	var controller, menuModel, menuView, toolboxModel, toolboxView, workspaceModel, workspaceView, propertiesPanelView, propertiesPanelController;
	
	barmatz.utils.DataTypes.isNotUndefined(container);
	barmatz.utils.DataTypes.isInstanceOf(container, HTMLElement);
	
	menuModel = barmatz.forms.factories.ModelFactory.createMenuModel();
	addItemToMenuModel('New');
	addItemToMenuModel('Save');
	addItemToMenuModel('Export');
	menuView = container.appendChild(barmatz.forms.factories.DOMFactory.createBuilderMenu());
	barmatz.forms.factories.ControllerFactory.createMenuController(menuModel, menuView);

	toolboxModel = barmatz.forms.factories.ModelFactory.createToolboxModel();
	addItemToToolboxModel(barmatz.forms.fields.FormFieldTypes.TEXT, 'Text field');
	addItemToToolboxModel(barmatz.forms.fields.FormFieldTypes.PASSWORD, 'Password field');
	addItemToToolboxModel(barmatz.forms.fields.FormFieldTypes.CHECKBOX, 'Checkbox');
	addItemToToolboxModel(barmatz.forms.fields.FormFieldTypes.RADIO, 'Radio button');
	addItemToToolboxModel(barmatz.forms.fields.FormFieldTypes.FILE, 'File field');
	addItemToToolboxModel(barmatz.forms.fields.FormFieldTypes.HIDDEN, 'Hidden field');
	
	toolboxView = container.appendChild(barmatz.forms.factories.DOMFactory.createBuilderToolbox());
	barmatz.forms.factories.ControllerFactory.createToolboxController(toolboxModel, toolboxView);

	workspaceModel = barmatz.forms.factories.ModelFactory.createWorkspaceModel();
	workspaceView = container.appendChild(barmatz.forms.factories.DOMFactory.createBuilderWorkspace());
	barmatz.forms.factories.ControllerFactory.createWorkspaceController(workspaceModel, workspaceView);
	
	propertiesPanelView = container.appendChild(barmatz.forms.factories.DOMFactory.createBuilderPropertiesPanel());
	propertiesPanelController = barmatz.forms.factories.ControllerFactory.createPropertiesPanelController(propertiesPanelView);
	
	controller = barmatz.forms.factories.ControllerFactory.createBuilderController(toolboxModel, toolboxView, workspaceModel, workspaceView, propertiesPanelController, propertiesPanelView);
	
	function addItemToMenuModel(label)
	{
		barmatz.utils.DataTypes.isNotUndefined(label);
		barmatz.utils.DataTypes.isTypeOf(label, 'string');
		menuModel.addItem(barmatz.forms.factories.ModelFactory.createMenuItemModel(label));
	}
	
	function addItemToToolboxModel(type, label)
	{
		barmatz.utils.DataTypes.isNotUndefined(type);
		barmatz.utils.DataTypes.isNotUndefined(label);
		barmatz.utils.DataTypes.isTypeOf(type, 'string');
		barmatz.utils.DataTypes.isTypeOf(label, 'string');
		toolboxModel.addItem(barmatz.forms.factories.ModelFactory.createToolboxItemModel(type, label), barmatz.forms.factories.ModelFactory.createFormFieldModel(type, ''));
	}
};
window.barmatz.forms.ui.BuilderController = function(toolboxModel, toolboxView, workspaceModel, workspaceView, propertiesPanelController, propertiesPanelView)
{
	barmatz.utils.DataTypes.isNotUndefined(toolboxModel);
	barmatz.utils.DataTypes.isNotUndefined(toolboxView);
	barmatz.utils.DataTypes.isNotUndefined(workspaceModel);
	barmatz.utils.DataTypes.isNotUndefined(workspaceView);
	barmatz.utils.DataTypes.isNotUndefined(propertiesPanelController);
	barmatz.utils.DataTypes.isNotUndefined(propertiesPanelView);
	barmatz.utils.DataTypes.isInstanceOf(toolboxModel, barmatz.forms.CollectionModel);
	barmatz.utils.DataTypes.isInstanceOf(toolboxView, HTMLElement);
	barmatz.utils.DataTypes.isInstanceOf(workspaceModel, barmatz.forms.ui.WorkspaceModel);
	barmatz.utils.DataTypes.isInstanceOf(workspaceView, HTMLElement);
	barmatz.utils.DataTypes.isInstanceOf(propertiesPanelController, barmatz.forms.ui.PropertiesPanelController);
	barmatz.utils.DataTypes.isInstanceOf(propertiesPanelView, HTMLElement);
	barmatz.mvc.Controller.call(this);
	
	window.addEventListener('resize', onWindowResize);
	workspaceModel.addEventListener(barmatz.events.CollectionEvent.ADDED, onWorkspaceModelAdded);
	workspaceModel.addEventListener(barmatz.events.CollectionEvent.REMOVED, onWorkspaceModelRemoved);
	toolboxModel.addEventListener(barmatz.events.CollectionEvent.ADDED, onToolboxModelAdded);
	toolboxModel.addEventListener(barmatz.events.CollectionEvent.REMOVED, onToolboxModelRemoved);
	forEachToolboxViewItem();
	resizeUI();
	
	function forEachToolboxViewItem()
	{
		var i = 0;
		for(; i < toolboxView.childNodes.length; i++)
			addToolboxViewItemListeners(toolboxView.childNodes[i]);
	}
	
	function addToolboxViewItemListeners(item)
	{
		barmatz.utils.DataTypes.isNotUndefined(item);
		barmatz.utils.DataTypes.isInstanceOf(item, HTMLElement);
		item.addEventListener('click', onToolboxViewItemClick);
	}
	
	function removeToolboxViewItemListeners(item)
	{
		barmatz.utils.DataTypes.isNotUndefined(item);
		barmatz.utils.DataTypes.isInstanceOf(item, HTMLElement);
		item.removeEventListener('click', onToolboxViewItemClick);
	}
	
	function getIndexOfView(view)
	{
		return Array.prototype.slice.call(view.parentElement.childNodes).indexOf(view);
	}
	
	function resizeUI()
	{
		workspaceView.style.width = (barmatz.utils.Window.width - barmatz.utils.CSS.absoluteWidth(toolboxView) - barmatz.utils.CSS.absoluteWidth(propertiesPanelView)) + 'px';
	}
	
	function onWindowResize(event)
	{
		resizeUI();
	}
	
	function onWorkspaceViewClick(event)
	{
		propertiesPanelController.model = null;
		workspaceView.removeEventListener('click', onWorkspaceViewClick);
	}
	
	function onToolboxViewItemClick(event)
	{
		barmatz.utils.DataTypes.isNotUndefined(event);
		barmatz.utils.DataTypes.isInstanceOf(event, MouseEvent);
		workspaceModel.addItem(toolboxModel.getRefItem(toolboxModel.getItemAt(getIndexOfView(event.target))));
		event.stopImmediatePropagation();
		workspaceView.addEventListener('click', onWorkspaceViewClick);
	}
	
	function onWorkspaceViewItemClick(event)
	{
		barmatz.utils.DataTypes.isNotUndefined(event);
		barmatz.utils.DataTypes.isInstanceOf(event, MouseEvent);
		event.stopImmediatePropagation();
		workspaceView.addEventListener('click', onWorkspaceViewClick);
		propertiesPanelController.model = workspaceModel.getItemAt(getIndexOfView(event.currentTarget));
	}
	
	function onWorkspaceModelAdded(event)
	{
		barmatz.utils.DataTypes.isNotUndefined(event);
		barmatz.utils.DataTypes.isInstanceOf(event, barmatz.events.CollectionEvent);
		workspaceView.childNodes[event.index].addEventListener('click', onWorkspaceViewItemClick);
		propertiesPanelController.model = event.item;
	}
	
	function onWorkspaceModelRemoved(event)
	{
		barmatz.utils.DataTypes.isNotUndefined(event);
		barmatz.utils.DataTypes.isInstanceOf(event, barmatz.events.CollectionEvent);
		if(workspaceModel.numItems == 0)
			propertiesPanelController.model = null;
	}
	
	function onToolboxModelAdded(event)
	{
		barmatz.utils.DataTypes.isNotUndefined(event);
		barmatz.utils.DataTypes.isInstanceOf(event, barmatz.events.CollectionEvent);
		addToolboxViewItemListeners(toolboxView.childNodes[event.index]);
	}
	
	function onToolboxModelRemoved(event)
	{
		barmatz.utils.DataTypes.isNotUndefined(event);
		barmatz.utils.DataTypes.isInstanceOf(event, barmatz.events.CollectionEvent);
		removeToolboxViewItemListeners(toolboxView.childNodes[event.index]);
	}
};

barmatz.forms.ui.BuilderController.prototype = new barmatz.mvc.Controller();
barmatz.forms.ui.BuilderController.prototype.constructor = barmatz.forms.ui.BuilderController;

Object.defineProperties(barmatz.forms.ui.BuilderController.prototype, {});
/** barmatz.forms.ui.JQueryPromptDialogController **/
window.barmatz.forms.ui.JQueryPromptDialogController = function(model, view, fieldView)
{
	var _this = this;
	
	barmatz.utils.DataTypes.isNotUndefined(model);
	barmatz.utils.DataTypes.isNotUndefined(view);
	barmatz.utils.DataTypes.isNotUndefined(fieldView);
	barmatz.utils.DataTypes.isInstanceOf(model, barmatz.mvc.Model, true);
	barmatz.utils.DataTypes.isInstanceOf(view, HTMLElement, true);
	barmatz.utils.DataTypes.isInstanceOf(fieldView, HTMLInputElement, true);
	barmatz.forms.ui.PromptDialogController.call(this, model, view, fieldView);
	
	view.addEventListener('keydown', onViewKeyDown);
	jQuery(view).dialog({buttons: {Ok: onViewOk}});
	
	function onViewOk(event)
	{
		_this._submitDialog();
	}
	
	function onViewKeyDown(event)
	{
		if(event.keyCode == 13)
			_this._submitDialog();
	}
};

barmatz.forms.ui.JQueryPromptDialogController.prototype = new barmatz.forms.ui.PromptDialogController(null, null, null);
barmatz.forms.ui.JQueryPromptDialogController.prototype.constructor = barmatz.forms.ui.JQueryPromptDialogController;

Object.defineProperties(barmatz.forms.ui.JQueryPromptDialogController.prototype,
{
	_submitDialog: {value: function()
	{
		this._model.name = this._fieldView.value;
		jQuery(this._view).dialog('destroy');
	}}
});
/** barmatz.forms.ui.MenuController **/
window.barmatz.forms.ui.MenuController = function(model, view)
{
	barmatz.forms.CollectionController.call(this, model, view);
};

barmatz.forms.ui.MenuController.prototype = new barmatz.forms.CollectionController(null, null);
barmatz.forms.ui.MenuController.prototype.constructor = barmatz.forms.ui.MenuController;

Object.defineProperties(barmatz.forms.ui.MenuController.prototype,
{
	_createItemViewFromModel: {value: function(model)
	{
		barmatz.utils.DataTypes.isNotUndefined(model);
		barmatz.utils.DataTypes.isInstanceOf(model, barmatz.forms.ui.MenuItemModel);
		return barmatz.forms.factories.DOMFactory.createMenuItem(model.label);
	}}
});
/** barmatz.forms.ui.MenuItemModel **/
window.barmatz.forms.ui.MenuItemModel = function(label)
{
	barmatz.utils.DataTypes.isTypeOf(label, 'string');
	barmatz.mvc.Model.call(this);
	this.set('label', label);
};

barmatz.forms.ui.MenuItemModel.prototype = new barmatz.mvc.Model();
barmatz.forms.ui.MenuItemModel.prototype.constructor = barmatz.forms.ui.MenuItemModel;

Object.defineProperties(barmatz.forms.ui.MenuItemModel.prototype, 
{
	label: {get: function()
	{
		return this._label;
	}, set: function(value)
	{
		barmatz.utils.DataTypes.isTypeOf(label, 'string');
		this._label = value;
	}}
});
/** barmatz.forms.ui.MenuModel **/
window.barmatz.forms.ui.MenuModel = function()
{
	barmatz.forms.CollectionModel.call(this);
};

barmatz.forms.ui.MenuModel.prototype = new barmatz.forms.CollectionModel();
barmatz.forms.ui.MenuModel.prototype.constructor = barmatz.forms.ui.MenuModel;

Object.defineProperties(barmatz.forms.ui.MenuModel.prototype,
{
	addItem: {value: function(item)
	{
		barmatz.utils.DataTypes.isNotUndefined(item);
		barmatz.utils.DataTypes.isInstanceOf(item, barmatz.forms.ui.MenuItemModel);
		barmatz.forms.CollectionModel.prototype.addItem.call(this, item);
	}},
	removeItem: {value: function(item)
	{
		barmatz.utils.DataTypes.isNotUndefined(item);
		barmatz.utils.DataTypes.isInstanceOf(item, barmatz.forms.ui.MenuItemModel);
		barmatz.forms.CollectionModel.prototype.removeItem.call(this, item);
	}},
	getItemIndex: {value: function(item)
	{
		barmatz.utils.DataTypes.isNotUndefined(item);
		barmatz.utils.DataTypes.isInstanceOf(item, barmatz.forms.ui.MenuItemModel);
		barmatz.forms.CollectionModel.prototype.getItemIndex.call(this, item);
	}}
});
/** barmatz.forms.ui.PropertiesPanelController **/
window.barmatz.forms.ui.PropertiesPanelController = function(view)
{
	barmatz.utils.DataTypes.isNotUndefined(view);
	barmatz.utils.DataTypes.isInstanceOf(view, HTMLElement);
	barmatz.mvc.Controller.call(this);
	this._view = view;
	this.model = null;
};

barmatz.forms.ui.PropertiesPanelController.prototype = new barmatz.mvc.Controller();
barmatz.forms.ui.PropertiesPanelController.prototype.constructor = barmatz.forms.ui.PropertiesPanelController;

Object.defineProperties(barmatz.forms.ui.PropertiesPanelController.prototype,
{
	model: {get: function()
	{
		return this._model;
	}, set: function(value)
	{
		barmatz.utils.DataTypes.isInstanceOf(value, barmatz.forms.fields.FormFieldModel, true);
		
		this._model = value;
		
		if(this._model)
		{
			this._view.innerHTML = '';
			this._view.appendChild(barmatz.forms.factories.DOMFactory.createPropertiesPanelItem(this._model));
		}
		else
			this._view.innerHTML = 'No item selected';
	}}
});
/** barmatz.forms.ui.ToolboxController **/
window.barmatz.forms.ui.ToolboxController = function(model, view)
{
	barmatz.forms.CollectionController.call(this, model, view);
};

barmatz.forms.ui.ToolboxController.prototype = new barmatz.forms.CollectionController(null, null);
barmatz.forms.ui.ToolboxController.prototype.constructor = barmatz.forms.ui.ToolboxController;

Object.defineProperties(barmatz.forms.ui.ToolboxController.prototype,
{
	_createItemViewFromModel: {value: function(model)
	{
		barmatz.utils.DataTypes.isNotUndefined(model);
		barmatz.utils.DataTypes.isInstanceOf(model, barmatz.forms.ui.ToolboxItemModel);
		return barmatz.forms.factories.DOMFactory.createToolboxItem(model.label);
	}}
});
/** barmatz.forms.ui.ToolboxItemModel **/
window.barmatz.forms.ui.ToolboxItemModel = function(type, label)
{
	barmatz.utils.DataTypes.isNotUndefined(type);
	barmatz.utils.DataTypes.isNotUndefined(label);
	barmatz.utils.DataTypes.isTypeOf(type, 'string');
	barmatz.utils.DataTypes.isTypeOf(label, 'string');
	barmatz.forms.TypeModel.call(this, type);
	this.set('label', label);
};

barmatz.forms.ui.ToolboxItemModel.prototype = new barmatz.forms.TypeModel(null);
barmatz.forms.ui.ToolboxItemModel.prototype.constructor = barmatz.forms.ui.ToolboxItemModel;

Object.defineProperties(barmatz.forms.ui.ToolboxItemModel.prototype, 
{
	label: {get: function()
	{
		return this._label;
	}, set: function(value)
	{
		barmatz.utils.DataTypes.isTypeOf(label, 'string');
		this._label = value;
	}}
});
/** barmatz.forms.ui.ToolboxModel **/
window.barmatz.forms.ui.ToolboxModel = function()
{
	barmatz.forms.CollectionModel.call(this);
	this._refDictionary = new barmatz.utils.Dictionary();
};

barmatz.forms.ui.ToolboxModel.prototype = new barmatz.forms.CollectionModel();
barmatz.forms.ui.ToolboxModel.prototype.constructor = barmatz.forms.ui.ToolboxModel;

Object.defineProperties(barmatz.forms.ui.ToolboxModel.prototype,
{
	addItem: {value: function(item, ref)
	{
		barmatz.utils.DataTypes.isNotUndefined(item);
		barmatz.utils.DataTypes.isInstanceOf(item, barmatz.forms.ui.ToolboxItemModel);
		barmatz.utils.DataTypes.isNotUndefined(ref);
		barmatz.utils.DataTypes.isInstanceOf(ref, barmatz.forms.fields.FormFieldModel);
		barmatz.forms.CollectionModel.prototype.addItem.call(this, item);
		this._refDictionary.add(item, ref);
	}},
	removeItem: {value: function(item)
	{
		barmatz.utils.DataTypes.isNotUndefined(item);
		barmatz.utils.DataTypes.isInstanceOf(item, barmatz.forms.ui.ToolboxItemModel);
		barmatz.forms.CollectionModel.prototype.removeItem.call(this, item);
		this._refDictionary.remove(item);
	}},
	getItemIndex: {value: function(item)
	{
		barmatz.utils.DataTypes.isNotUndefined(item);
		barmatz.utils.DataTypes.isInstanceOf(item, barmatz.forms.ui.ToolboxItemModel);
		barmatz.forms.CollectionModel.prototype.getItemIndex.call(this, item);
	}},
	getRefItem: {value: function(item)
	{
		barmatz.utils.DataTypes.isNotUndefined(item);
		barmatz.utils.DataTypes.isInstanceOf(item, barmatz.forms.ui.ToolboxItemModel);
		return this._refDictionary.get(item);
	}}
});
/** barmatz.forms.ui.WorkspaceController **/
window.barmatz.forms.ui.WorkspaceController = function(model, view)
{
	var _this = this, selectedItemIndex;
	
	barmatz.forms.CollectionController.call(this, model, view);
	
	if(model)
	{
		model.addEventListener(barmatz.events.CollectionEvent.ADDED, onModelAdded);
		setViewToSortable();
	}
	
	function setViewToSortable()
	{
		jQuery(view).sortable({axis: 'y', containment: 'parent', start: onSortingStart, stop: onSortingStopped});
	}
	
	function getIndexFromSortEvent(element)
	{
		return Array.prototype.slice.call(element.parentElement.childNodes).indexOf(element);
	}
	
	function openNewFieldDialog(model)
	{
		var dialogWarpper;
		
		barmatz.utils.DataTypes.isNotUndefined(model);
		barmatz.utils.DataTypes.isInstanceOf(model, barmatz.forms.fields.FormFieldModel);
		
		dialogWarpper = barmatz.forms.factories.DOMFactory.createNewFieldDialogWrapper();
		jQuery(dialogWarpper.wrapper).dialog('open');
		
		barmatz.forms.factories.ControllerFactory.createJQueryPromptDialogController(model, dialogWarpper.wrapper, dialogWarpper.nameField);
		
		/*function(dialog, nameField)
		{
			if(nameField.value)
			{
				model.name = nameField.value;
				barmatz.forms.factories.DOMFactory.destroyDialog(dialog);
			}
		});*/
	}
	
	function onSortingStart(event, ui)
	{
		selectedItemIndex = getIndexFromSortEvent(ui.item[0]);
	}
	
	function onSortingStopped(event, ui)
	{
		_this._model.setItemIndex(_this._model.getItemAt(selectedItemIndex), getIndexFromSortEvent(ui.item[0]));
		selectedItemIndex = NaN;
	}
	
	function onModelAdded(event)
	{
		barmatz.utils.DataTypes.isNotUndefined(event);
		barmatz.utils.DataTypes.isInstanceOf(event, barmatz.events.CollectionEvent);
		setViewToSortable();
		
		if(!event.item.name)
			openNewFieldDialog(event.item);
	}
};

barmatz.forms.ui.WorkspaceController.prototype = new barmatz.forms.CollectionController(null, null);
barmatz.forms.ui.WorkspaceController.prototype.constructor = barmatz.forms.ui.WorkspaceController;

Object.defineProperties(barmatz.forms.ui.WorkspaceController.prototype,
{
	__addItemModelToView: {value: function(model)
	{
		barmatz.utils.DataTypes.isNotUndefined(model);
		barmatz.utils.DataTypes.isInstanceOf(model, barmatz.mvc.Model);
		barmatz.forms.CollectionController.__addItemModelToView(model);
		barmatz.utils.CSS.verticalAlignChildren(this._view);
	}},
	_createItemViewFromModel: {value: function(model)
	{
		var _this = this, viewWrapper;
		
		barmatz.utils.DataTypes.isNotUndefined(model);
		barmatz.utils.DataTypes.isInstanceOf(model, barmatz.forms.fields.FormFieldModel);
		viewWrapper = barmatz.forms.factories.DOMFactory.createWorkspaceItemWrapper(model);
		viewWrapper.deleteButton.addEventListener('click', onDeleteButtonClick);
		barmatz.forms.factories.ControllerFactory.createWorkspaceItemController(model, viewWrapper.label, viewWrapper.field, viewWrapper.mandatory, viewWrapper.deleteButton);
		return viewWrapper.wrapper;
		
		function onDeleteButtonClick(event)
		{
			barmatz.utils.DataTypes.isNotUndefined(event);
			barmatz.utils.DataTypes.isInstanceOf(event, MouseEvent);
			viewWrapper.deleteButton.removeEventListener('click', onDeleteButtonClick);
			_this._model.removeItem(model);
			event.stopImmediatePropagation();
		}
	}}
});
/** barmatz.forms.ui.WorkspaceItemController **/
window.barmatz.forms.ui.WorkspaceItemController = function(model, labelView, fieldView, mandatoryView, deleteButtonView)
{
	barmatz.utils.DataTypes.isNotUndefined(model);
	barmatz.utils.DataTypes.isNotUndefined(labelView);
	barmatz.utils.DataTypes.isNotUndefined(fieldView);
	barmatz.utils.DataTypes.isNotUndefined(mandatoryView);
	barmatz.utils.DataTypes.isNotUndefined(deleteButtonView);
	barmatz.utils.DataTypes.isInstanceOf(model, barmatz.forms.fields.FormFieldModel);
	barmatz.utils.DataTypes.isInstanceOf(labelView, HTMLElement);
	barmatz.utils.DataTypes.isInstanceOf(fieldView, HTMLElement);
	barmatz.utils.DataTypes.isInstanceOf(mandatoryView, HTMLElement);
	barmatz.utils.DataTypes.isInstanceOf(deleteButtonView, HTMLElement);
	barmatz.mvc.Controller.call(this);
	model.addEventListener(barmatz.events.ModelEvent.VALUE_CHANGED, onModelValueChanged);
	deleteButtonView.addEventListener('click', onDeleteButtonViewClick);
	
	function onModelValueChanged(event)
	{
		barmatz.utils.DataTypes.isNotUndefined(event);
		barmatz.utils.DataTypes.isInstanceOf(event, barmatz.events.ModelEvent);

		switch(event.key)
		{
			case 'name':
				fieldView.name = event.value;
				break;
			case 'label':
				labelView.innerHTML = event.value;
				break;
			case 'mandatory':
				mandatoryView.innerHTML = event.value ? '*' : '';
				break;
			case 'defaultValue':
				fieldView.defaultValue = event.value;
				break;
			case 'value':
				fieldView.value = event.value;
				break;
			case 'min':
				fieldView.min = event.value;
				break;
			case 'max':
				fieldView.max = event.value;
				break;
			case 'checked':
				fieldView.checked = event.value;
				break;
			case 'defaultChecked':
				fieldView.defaultChecked = event.value;
				break;
			case 'accept':
				fieldView.accept = event.value;
				break;
		}
	}
	
	function onDeleteButtonViewClick(event)
	{
		barmatz.utils.DataTypes.isNotUndefined(event);
		barmatz.utils.DataTypes.isInstanceOf(event, MouseEvent);
		model.removeEventListener(barmatz.events.ModelEvent.VALUE_CHANGED, onModelValueChanged);
	}
};

barmatz.forms.ui.WorkspaceItemController.prototype = new barmatz.mvc.Controller();
barmatz.forms.ui.WorkspaceItemController.prototype.constructor = barmatz.forms.ui.WorkspaceItemController;

Object.defineProperties(barmatz.forms.ui.WorkspaceItemController.prototype, {});
/** barmatz.forms.ui.WorkspaceModel **/
window.barmatz.forms.ui.WorkspaceModel = function()
{
	barmatz.forms.CollectionModel.call(this);
};

barmatz.forms.ui.WorkspaceModel.prototype = new barmatz.forms.CollectionModel();
barmatz.forms.ui.WorkspaceModel.prototype.constructor = barmatz.forms.ui.WorkspaceModel;
/** barmatz.forms.FormModel **/
window.barmatz.forms.FormModel = function()
{
	barmatz.mvc.Model.call(this);
	
	this._fields = [];
	this.set('encoding', 'application/x-www-form-urlencoded');
	this.set('method', barmatz.forms.Methods.GET);
};

barmatz.forms.FormModel.prototype = new barmatz.mvc.Model();
barmatz.forms.FormModel.prototype.constructor = barmatz.forms.FormModel;

Object.defineProperties(barmatz.forms.FormModel,
{
	init: {value: function(ref, target)
	{
		var form;
		
		barmatz.utils.DataTypes.isNotUndefined(ref);
		barmatz.utils.DataTypes.isNotUndefined(target);
		barmatz.utils.DataTypes.isInstanceOf(target, HTMLElement);
		
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
			form = new barmatz.forms.FormModel();
			form.createFromXML(xml);
			
			for(i = 0; i < form.numFields; i++)
			{
				target.appendChild(barmatz.forms.factories.DOMFactory.createFieldWrapper(form.getFieldAt(i)).wrapper);
				barmatz.utils.CSS.verticalAlignChildren(target);
			}
			
			target.appendChild(barmatz.forms.factories.DOMFactory.createSubmitButton(form.submitButtonLabel, onSubmitButtonClick));
		}
		
		function onSubmitButtonClick(event)
		{
			form.submit();
		}
	}}
}); 
Object.defineProperties(barmatz.forms.FormModel.prototype, 
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
	submitButtonLabel: {get: function()
	{
		return this.get('submitButtonLabel');
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
		barmatz.utils.DataTypes.isNotUndefined(xml);
		barmatz.utils.DataTypes.isInstanceOf(xml, XMLDocument);
		this.createFromObject(barmatz.utils.XML.xmlToObject(xml));
	}},
	createFromObject: {value: function(object)
	{
		var _this = this;
		
		barmatz.utils.DataTypes.isNotUndefined(object);
		barmatz.utils.DataTypes.isTypeOf(object, 'object');
		setProperties(object);
		setFields(object.field instanceof Array ? object.field : [object.field]);
		this.set('submitButtonLabel', object.submit.label);
		
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
				_this.addField(barmatz.forms.factories.ModelFactory.createFormFieldModel(field.type, field.name, field));
			}
		}
	}},
	addField: {value: function(field)
	{
		barmatz.utils.DataTypes.isNotUndefined(field);
		barmatz.utils.DataTypes.isInstanceOf(field, barmatz.forms.fields.FormFieldModel);
		this._fields.push(field);
		this.dispatchEvent(new barmatz.events.CollectionEvent(barmatz.events.CollectionEvent.ADDED, field));
	}},
	addFieldAt: {value: function(field, index)
	{
		barmatz.utils.DataTypes.isNotUndefined(field);
		barmatz.utils.DataTypes.isNotUndefined(index);
		barmatz.utils.DataTypes.isInstanceOf(field, barmatz.forms.fields.FormFieldModel);

		if(index < 0)
			index = 0;
		else if(index > this.numFields)
			index = this.numFields;
		
		this._fields.splice(index, 0, field);
		this.dispatchEvent(new barmatz.events.CollectionEvent(barmatz.events.CollectionEvent.ADDED, field));
	}},
	removeField: {value: function(field)
	{
		barmatz.utils.DataTypes.isNotUndefined(field);
		barmatz.utils.DataTypes.isInstanceOf(field, barmatz.forms.fields.FormFieldModel);
		this.removeFieldAt(this._fields.indexOf(field));
		this.dispatchEvent(new barmatz.events.CollectionEvent(barmatz.events.CollectionEvent.REMOVED, field));
	}},
	removeFieldAt: {value: function(index)
	{
		var field;
		
		if(index < 0 || index >= this.numFields)
			throw new Error('index is out of bounds');
		
		field = this._fields.splice(index, 1)[0];
		this.dispatchEvent(new barmatz.events.CollectionEvent(barmatz.events.CollectionEvent.REMOVED, field));
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
		
		loader.load(request);
	}}
});
/** barmatz.forms.Methods **/
window.barmatz.forms.Methods = function(){};

Object.defineProperties(barmatz.forms.Methods,
{
	GET: {value: 'get'},
	POST: {value: 'post'}
});
/** barmatz.forms.factories.ControllerFactory **/
window.barmatz.forms.factories.ControllerFactory = function(){};

Object.defineProperties(barmatz.forms.factories.ControllerFactory,
{
	createMenuController: {value: function(model, view)
	{
		barmatz.utils.DataTypes.isNotUndefined(model);
		barmatz.utils.DataTypes.isNotUndefined(view);
		barmatz.utils.DataTypes.isInstanceOf(model, barmatz.forms.CollectionModel);
		barmatz.utils.DataTypes.isInstanceOf(view, HTMLElement);
		return new barmatz.forms.ui.MenuController(model, view);
	}},
	createToolboxController: {value: function(model, view)
	{
		barmatz.utils.DataTypes.isNotUndefined(model);
		barmatz.utils.DataTypes.isNotUndefined(view);
		barmatz.utils.DataTypes.isInstanceOf(model, barmatz.forms.CollectionModel);
		barmatz.utils.DataTypes.isInstanceOf(view, HTMLElement);
		return new barmatz.forms.ui.ToolboxController(model, view);
	}},
	createWorkspaceController: {value: function(model, view)
	{
		barmatz.utils.DataTypes.isNotUndefined(model);
		barmatz.utils.DataTypes.isNotUndefined(view);
		barmatz.utils.DataTypes.isInstanceOf(model, barmatz.forms.CollectionModel);
		barmatz.utils.DataTypes.isInstanceOf(view, HTMLElement);
		return new barmatz.forms.ui.WorkspaceController(model, view);
	}},
	createPropertiesPanelController: {value: function(view)
	{
		barmatz.utils.DataTypes.isNotUndefined(view);
		barmatz.utils.DataTypes.isInstanceOf(view, HTMLElement);
		return new barmatz.forms.ui.PropertiesPanelController(view);
	}},
	createBuilderController: {value: function(toolboxModel, toolboxView, workspaceModel, workspaceView, propertiesPanelController, propertiesPanelView)
	{
		barmatz.utils.DataTypes.isNotUndefined(toolboxModel);
		barmatz.utils.DataTypes.isNotUndefined(toolboxView);
		barmatz.utils.DataTypes.isNotUndefined(workspaceModel);
		barmatz.utils.DataTypes.isNotUndefined(workspaceView);
		barmatz.utils.DataTypes.isNotUndefined(propertiesPanelController);
		barmatz.utils.DataTypes.isNotUndefined(propertiesPanelView);
		barmatz.utils.DataTypes.isInstanceOf(toolboxModel, barmatz.forms.CollectionModel);
		barmatz.utils.DataTypes.isInstanceOf(toolboxView, HTMLElement);
		barmatz.utils.DataTypes.isInstanceOf(workspaceModel, barmatz.forms.ui.WorkspaceModel);
		barmatz.utils.DataTypes.isInstanceOf(workspaceView, HTMLElement);
		barmatz.utils.DataTypes.isInstanceOf(propertiesPanelController, barmatz.forms.ui.PropertiesPanelController);
		barmatz.utils.DataTypes.isInstanceOf(propertiesPanelView, HTMLElement);
		return new barmatz.forms.ui.BuilderController(toolboxModel, toolboxView, workspaceModel, workspaceView, propertiesPanelController, propertiesPanelView);
	}},
	createWorkspaceItemController: {value: function(model, labelView, fieldView, mandatoryView, deleteButtonView)
	{
		barmatz.utils.DataTypes.isNotUndefined(model);
		barmatz.utils.DataTypes.isNotUndefined(labelView);
		barmatz.utils.DataTypes.isNotUndefined(fieldView);
		barmatz.utils.DataTypes.isNotUndefined(mandatoryView);
		barmatz.utils.DataTypes.isNotUndefined(deleteButtonView);
		barmatz.utils.DataTypes.isInstanceOf(model, barmatz.forms.fields.FormFieldModel);
		barmatz.utils.DataTypes.isInstanceOf(labelView, HTMLElement);
		barmatz.utils.DataTypes.isInstanceOf(fieldView, HTMLElement);
		barmatz.utils.DataTypes.isInstanceOf(mandatoryView, HTMLElement);
		barmatz.utils.DataTypes.isInstanceOf(deleteButtonView, HTMLElement);
		return new barmatz.forms.ui.WorkspaceItemController(model, labelView, fieldView, mandatoryView, deleteButtonView);
	}},
	createJQueryPromptDialogController: {value: function(model, view, fieldView)
	{
		barmatz.utils.DataTypes.isNotUndefined(model);
		barmatz.utils.DataTypes.isNotUndefined(view);
		barmatz.utils.DataTypes.isNotUndefined(fieldView);
		barmatz.utils.DataTypes.isInstanceOf(model, barmatz.mvc.Model);
		barmatz.utils.DataTypes.isInstanceOf(view, HTMLElement);
		barmatz.utils.DataTypes.isInstanceOf(fieldView, HTMLInputElement);
		return new barmatz.forms.ui.JQueryPromptDialogController(model, view, fieldView);
	}}
});
/** barmatz.forms.factories.DOMFactory **/
window.barmatz.forms.factories.DOMFactory = function(){};

Object.defineProperties(barmatz.forms.factories.DOMFactory,
{
	BODY_ELEMENT: {get: function()
	{
		if(!this._bodyElement)
			this._bodyElement = document.getElementsByTagName('body')[0];
		return this._bodyElement;
	}},
	createElement: {value: function(tagName, className)
	{
		var element;
		
		barmatz.utils.DataTypes.isNotUndefined(tagName);
		barmatz.utils.DataTypes.isTypeOf(tagName, 'string');
		barmatz.utils.DataTypes.isTypeOf(className, 'string', true);
		
		element = document.createElement(tagName);
		
		if(className)
			element.className = className;
		
		return element;
	}},
	createElementWithContent: {value: function(tagName, className, content, appendChildWrapper)
	{
		var element;
		
		barmatz.utils.DataTypes.isNotUndefined(tagName);
		barmatz.utils.DataTypes.isTypeOf(tagName, 'string');
		barmatz.utils.DataTypes.isTypeOf(className, 'string', true);
		
		if(barmatz.utils.DataTypes.isTypesOrInstances(content, ['string'], [HTMLElement, Array], true))
		{
			if(barmatz.utils.DataTypes.isTypeOf(appendChildWrapper, 'function', true))
			{
				element = this.createElement(tagName, className);
				
				if(barmatz.utils.DataTypes.applySilent('isTypeOf', content, 'string'))
					element.innerHTML = content;
				else if(barmatz.utils.DataTypes.applySilent('isInstanceOf', content, HTMLElement))
					element.appendChild(content);
				else if(barmatz.utils.DataTypes.applySilent('isInstanceOf', content, Array))
				{
					while(element.childNodes.length < content.length)
						element.appendChild(appendChildWrapper != null ? appendChildWrapper(content[element.childNodes.length]) : content[element.childNodes.length]);
				}
				
				return element;
			}
		}
		
		return null;
	}},
	createFormFieldElement: {value: function(model)
	{
		var field, key;
		
		barmatz.utils.DataTypes.isNotUndefined(model);
		barmatz.utils.DataTypes.isInstanceOf(model, barmatz.forms.fields.FormFieldModel);
		field = this.createElement(getElementTagName(model.type));
		
		if(field.tagName.toLowerCase() == 'input')
			field.type = model.type;
		
		for(key in model)
			if(field.hasOwnProperty(key))
				field[key] = model[key];
		
		return field;
		
		function getElementTagName(type)
		{
			switch(type)
			{
				case barmatz.forms.fields.FormFieldTypes.TEXT:
				case barmatz.forms.fields.FormFieldTypes.PASSWORD:
				case barmatz.forms.fields.FormFieldTypes.CHECKBOX:
				case barmatz.forms.fields.FormFieldTypes.RADIO:
				case barmatz.forms.fields.FormFieldTypes.FILE:
				case barmatz.forms.fields.FormFieldTypes.HIDDEN:
					return 'input';
					break;
			}
		}
	}},
	createFieldWrapper: {value: function(model, className)
	{
		var wrapper, label, field, mandatory;
		
		barmatz.utils.DataTypes.isNotUndefined(model);
		barmatz.utils.DataTypes.isInstanceOf(model, barmatz.forms.fields.FormFieldModel);
		barmatz.utils.DataTypes.isTypeOf(className, 'string', true);
		
		wrapper = this.createElement('div', className);
		label = wrapper.appendChild(this.createElementWithContent('label', '', model.label ? model.label : ''));
		field = wrapper.appendChild(this.createFormFieldElement(model));
		mandatory = wrapper.appendChild(this.createElementWithContent('span', '', mandatory ? '*' : ''));

		return {wrapper: wrapper, label: label, field: field, mandatory: mandatory};
	}},
	createSubmitButton: {value: function(label, clickHandler)
	{
		var wrapper, button;
		
		barmatz.utils.DataTypes.isNotUndefined(label);
		barmatz.utils.DataTypes.isNotUndefined(clickHandler);
		barmatz.utils.DataTypes.isTypeOf(clickHandler, 'function');
		wrapper = this.createElement('div');
		button = this.createElementWithContent('button', '', label);
		button.addEventListener('click', clickHandler);
		wrapper.appendChild(button);
		
		return wrapper;
	}},
	createBuilderToolbox: {value: function()
	{
		return this.createElement('ul', 'forms-builder-toolbox');
	}},
	createBuilderMenu: {value: function()
	{
		return this.createElement('ul', 'forms-builder-menu');
	}},
	createBuilderWorkspace: {value: function()
	{
		return this.createElement('div', 'forms-builder-workspace');
	}},
	createBuilderPropertiesPanel: {value: function()
	{
		return this.createElement('div', 'forms-builder-properties-panel');
	}},
	createToolboxItem: {value: function(label)
	{
		barmatz.utils.DataTypes.isNotUndefined(label);
		barmatz.utils.DataTypes.isTypeOf(label, 'string');
		return this.createElementWithContent('li', 'forms-toolbox-item', label);
	}},
	createMenuItem: {value: function(label)
	{
		barmatz.utils.DataTypes.isNotUndefined(label);
		barmatz.utils.DataTypes.isTypeOf(label, 'string');
		return this.createElementWithContent('li', 'forms-menu-item rounded-corner', label);
	}},
	createWorkspaceItemWrapper: {value: function(model)
	{
		var fieldWrapper, label, field, mandatory, deleteButton;
		
		barmatz.utils.DataTypes.isNotUndefined(model);
		barmatz.utils.DataTypes.isInstanceOf(model, barmatz.forms.fields.FormFieldModel);
		
		deleteButton = this.createElement('span', 'forms-delete ui-icon ui-icon-circle-close');
		fieldWrapper = this.createFieldWrapper(model, 'forms-workspace-item');
		fieldWrapper.field.disabled = true;
		fieldWrapper.wrapper.insertBefore(this.createElement('span', 'forms-grip ui-icon ui-icon-grip-dotted-vertical'), fieldWrapper.wrapper.childNodes[0]);
		fieldWrapper.wrapper.appendChild(deleteButton);
		
		return {wrapper: fieldWrapper.wrapper, label: fieldWrapper.label, field: fieldWrapper.field, mandatory: fieldWrapper.mandatory, deleteButton: deleteButton};
	}},
	createPropertiesPanelItem: {value: function(model)
	{
		var wrapper;
		
		barmatz.utils.DataTypes.isNotUndefined(model);
		barmatz.utils.DataTypes.isInstanceOf(model, barmatz.forms.fields.FormFieldModel);
		
		wrapper = this.createElement('div');
		wrapper.appendChild(this.createElementWithContent('div', 'forms-header', barmatz.utils.String.firstLetterToUpperCase(model.type)));
		
		if(model instanceof barmatz.forms.fields.FormFieldModel)
		{
			wrapper.appendChild(this.createPropertiesPanelItemField('string', 'name', 'name', model.name, onFieldValueChange));
			wrapper.appendChild(this.createPropertiesPanelItemField('string', 'label', 'label', model.label, onFieldValueChange));
			wrapper.appendChild(this.createPropertiesPanelItemField('boolean', 'mandatory', 'mandatory', model.mandatory, onFieldValueChange));
			wrapper.appendChild(this.createPropertiesPanelItemField('string', 'default', 'default value', model.default, onFieldValueChange));
			wrapper.appendChild(this.createPropertiesPanelItemField('string', 'value', 'value', model.value, onFieldValueChange));
			wrapper.appendChild(this.createPropertiesPanelItemField('boolean', 'enabled', 'enabled', model.enabled, onFieldValueChange));
		}
		
		if(model instanceof barmatz.forms.fields.FormFileFieldModel)
			wrapper.appendChild(this.createPropertiesPanelItemField('string', 'accept', 'accept', model.accept, onFieldValueChange));

		if(model instanceof barmatz.forms.fields.FormTextFieldModel)
		{
			wrapper.appendChild(this.createPropertiesPanelItemField('string', 'min', 'min', model.min, onFieldValueChange));
			wrapper.appendChild(this.createPropertiesPanelItemField('string', 'max', 'max', model.max, onFieldValueChange));
		}
		
		if(model instanceof barmatz.forms.fields.FormCheckboxFieldModel)
		{
			wrapper.appendChild(this.createPropertiesPanelItemField('boolean', 'checked', 'checked', model.checked, onFieldValueChange));
			wrapper.appendChild(this.createPropertiesPanelItemField('boolean', 'default checked', 'defaultChecked', model.defaultChecked, onFieldValueChange));
		}
		
		return wrapper;
		
		function onFieldValueChange(event)
		{
			try
			{
				model[event.target.name] = event.target.value;
			}
			catch(error)
			{
				try
				{
					model[event.target.name] = event.target.value == 'yes' ? true : false;
				}
				catch(error)
				{
					model[event.target.name] = parseFloat(event.target.value);
				}
			}
		}
	}},
	createPropertiesPanelItemField: {value: function(type, name, label, value, changeHandler)
	{
		var field;
		
		barmatz.utils.DataTypes.isNotUndefined(type);
		barmatz.utils.DataTypes.isNotUndefined(name);
		barmatz.utils.DataTypes.isNotUndefined(label);
		barmatz.utils.DataTypes.isNotUndefined(value);
		barmatz.utils.DataTypes.isNotUndefined(changeHandler);
		barmatz.utils.DataTypes.isTypeOf(type, 'string');
		barmatz.utils.DataTypes.isTypeOf(name, 'string');
		barmatz.utils.DataTypes.isTypeOf(label, 'string');
		barmatz.utils.DataTypes.isTypeOf(changeHandler, 'function');
		
		switch(type)
		{
			default:
				throw new Error('unknown type');
				break;
			case 'string':
				field = this.createElement('input');
				field.type = 'text';
				field.value = value;
				break;
			case 'boolean':
				field = this.createElement('select');
				field.appendChild(this.createElementWithContent('option', '', 'no'));
				field.appendChild(this.createElementWithContent('option', '', 'yes'));
				field.selectedIndex = value ? 1 : 0;
				break;
		}
		
		field.name = name;
		field.addEventListener('change', changeHandler);

		return this.createElementWithContent('div', 'forms-item', [this.createElementWithContent('label', '', label), field]);
	}},
	createDialog: {value: function(title, content, container)
	{
		var dialog = this.createElementWithContent('div', 'forms-dialog', content);
		dialog.title = title;
		(container || this.BODY_ELEMENT).appendChild(dialog);
		jQuery(dialog).dialog({autoOpen: false});
		return dialog;
	}},
	destroyDialog: {value: function(dialog)
	{
		jQuery(dialog).dialog('destroy');
		dialog.parentElement.removeChild(dialog);
	}},
	createNewFieldDialogWrapper: {value: function()
	{
		var dialog, nameField, wrapper;
		
		nameField = this.createElement('input');
		nameField.type = 'text';
		
		wrapper = this.createElementWithContent('div', '', [
			this.createElementWithContent('label', '', 'Field name'),
			nameField
		]);
		
		dialog = this.createDialog('New Field', wrapper);
		
		barmatz.utils.CSS.verticalAlignChildren(wrapper);
		
		jQuery(dialog).dialog({
			closeOnEscape: false,
			dialogClass: 'forms-builder-dialog-prompt',
			draggable: false, 
			modal: true
		});
		
		return {wrapper: dialog, nameField: nameField};
	}}
});
/** barmatz.forms.factories.ModelFactory **/
window.barmatz.forms.factories.ModelFactory = function(){};

Object.defineProperties(barmatz.forms.factories.ModelFactory,
{
	createFormFieldModel: {value: function(type, name)
	{
		barmatz.utils.DataTypes.isNotUndefined(type);
		barmatz.utils.DataTypes.isNotUndefined(name);
		barmatz.utils.DataTypes.isTypeOf(type, 'string');
		barmatz.utils.DataTypes.isTypeOf(name, 'string');
		
		switch(type)
		{
			default:
				return new barmatz.forms.fields.FormFieldModel(type, name);
				break;
			case barmatz.forms.fields.FormFieldTypes.TEXT:
				return new barmatz.forms.fields.FormTextFieldModel(name);
				break;
			case barmatz.forms.fields.FormFieldTypes.PASSWORD:
				return new barmatz.forms.fields.FormPasswordFieldModel(name);
				break;
			case barmatz.forms.fields.FormFieldTypes.CHECKBOX:
				return new barmatz.forms.fields.FormCheckboxFieldModel(name);
				break;
			case barmatz.forms.fields.FormFieldTypes.RADIO:
				return new barmatz.forms.fields.FormRadioFieldModel(name);
				break;
			case barmatz.forms.fields.FormFieldTypes.FILE:
				return new barmatz.forms.fields.FormFileFieldModel(name);
				break;
			case barmatz.forms.fields.FormFieldTypes.HIDDEN:
				return new barmatz.forms.fields.FormHiddenFieldModel(name);
				break;
		}
	}},
	createMenuItemModel: {value: function(label)
	{
		barmatz.utils.DataTypes.isNotUndefined(label);
		barmatz.utils.DataTypes.isTypeOf(label, 'string');
		return new barmatz.forms.ui.MenuItemModel(label);
	}},
	createToolboxItemModel: {value: function(type, label)
	{
		barmatz.utils.DataTypes.isNotUndefined(type);
		barmatz.utils.DataTypes.isNotUndefined(label);
		barmatz.utils.DataTypes.isTypeOf(type, 'string');
		barmatz.utils.DataTypes.isTypeOf(label, 'string');
		return new barmatz.forms.ui.ToolboxItemModel(type, label);
	}},
	createCollectionModel: {value: function()
	{
		return new barmatz.forms.CollectionModel();
	}},
	createMenuModel: {value: function()
	{
		return new barmatz.forms.ui.MenuModel();
	}},
	createToolboxModel: {value: function()
	{
		return new barmatz.forms.ui.ToolboxModel();
	}},
	createWorkspaceModel: {value: function()
	{
		return new barmatz.forms.ui.WorkspaceModel();
	}}
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
		
		barmatz.utils.DataTypes.isNotUndefined(request);
		barmatz.utils.DataTypes.isInstanceOf(request, barmatz.net.Request);

		if(request.data && request.method == barmatz.net.Methods.GET)
			url += (url.indexOf('?') > -1 ? '&' : '?') + barmatz.net.Loader.serialize(request.data);
		
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
	barmatz.utils.DataTypes.isNotUndefined(url);
	barmatz.utils.DataTypes.isTypeOf(url, 'string');
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
		barmatz.utils.DataTypes.isTypeOf(value, 'string');
		this.set('method', value);
	}},
	async: {get: function()
	{
		return this.get('async');
	}, set: function(value)
	{
		barmatz.utils.DataTypes.isTypeOf(value, 'boolean');
		this.set('async', value);
	}},
	credentials: {get: function()
	{
		return this.get('credentials');
	}, set: function(value)
	{
		barmatz.utils.DataTypes.isInstanceOf(value, barmatz.net.RequestCredentils);
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
		barmatz.utils.DataTypes.isTypeOf(value, 'string');
		this.set('user', value);
	}},
	password: {get: function()
	{
		return this.get('password');
	}, set: function(value)
	{
		barmatz.utils.DataTypes.isTypeOf(value, 'string');
		this.set('password', value);
	}}
});
/** barmatz.net.Response **/
window.barmatz.net.Response = function(url, data, type, status, headers)
{
	barmatz.utils.DataTypes.isNotUndefined(url);
	barmatz.utils.DataTypes.isTypeOf(url, 'string');
	barmatz.utils.DataTypes.isNotUndefined(data);
	barmatz.utils.DataTypes.isNotUndefined(type);
	barmatz.utils.DataTypes.isTypeOf(type, 'string');
	barmatz.utils.DataTypes.isNotUndefined(status);
	barmatz.utils.DataTypes.isTypeOf(status, 'number');
	barmatz.utils.DataTypes.isNotUndefined(headers);
	barmatz.utils.DataTypes.isInstanceOf(headers, Array);
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
