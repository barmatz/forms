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
/** barmatz.events.BuilderEvent **/
window.barmatz.events.BuilderEvent = function(type)
{
	barmatz.utils.DataTypes.isNotUndefined(type);
	barmatz.utils.DataTypes.isTypeOf(type, 'string');
	barmatz.events.Event.call(this, type);
	
	this._item = null;
	this._index = NaN;
	
	switch(type)
	{
		case barmatz.events.BuilderEvent.TOOLBOX_ITEM_ADDED:
		case barmatz.events.BuilderEvent.TOOLBOX_ITEM_REMOVE:
		case barmatz.events.BuilderEvent.WORKSPACE_ITEM_ADDED:
		case barmatz.events.BuilderEvent.WORKSPACE_ITEM_REMOVE:
			this._item = arguments[1];
			this._index = arguments[2];
			break;
	}
};

barmatz.events.BuilderEvent.prototype = new barmatz.events.Event(null);
barmatz.events.BuilderEvent.prototype.constructor = barmatz.events.BuilderEvent;

Object.defineProperties(barmatz.events.BuilderEvent, 
{
	TOOLBOX_ITEM_ADDED: {value: 'toolboxItemAdded'},
	TOOLBOX_ITEM_REMOVED: {value: 'toolboxItemRemoved'},
	WORKSPACE_ITEM_ADDED: {value: 'workspaceItemAdded'},
	WORKSPACE_ITEM_REMOVED: {value: 'workspaceItemRemoved'}
});
Object.defineProperties(barmatz.events.BuilderEvent.prototype,
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
		var event;
		
		switch(type)
		{
			default:
				event = new barmatz.events.BuilderEvent(type);
				break;
			case barmatz.events.BuilderEvent.TOOLBOX_ITEM_ADDED:
			case barmatz.events.BuilderEvent.TOOLBOX_ITEM_REMOVE:
			case barmatz.events.BuilderEvent.WORKSPACE_ITEM_ADDED:
			case barmatz.events.BuilderEvent.WORKSPACE_ITEM_REMOVE:
				event = new barmatz.events.BuilderEvent(type, this.item, this.index);
				break;
		}
		
		event._target = this.target;
		return event;
	}},
	toString: {value: function()
	{
		switch(type)
		{
			default:
				return this.formatToString('BuilderEvent', 'type');
				break;
			case barmatz.events.BuilderEvent.TOOLBOX_ITEM_ADDED:
			case barmatz.events.BuilderEvent.TOOLBOX_ITEM_REMOVE:
			case barmatz.events.BuilderEvent.WORKSPACE_ITEM_ADDED:
			case barmatz.events.BuilderEvent.WORKSPACE_ITEM_REMOVE:
				return this.formatToString('BuilderEvent', 'type', 'item', 'index');
				break;
		}
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
		case barmatz.events.CollectionEvent.ITEM_ADDED:
		case barmatz.events.CollectionEvent.ITEM_REMOVED:
			this._item = arguments[1];
			this._index = arguments[2];
			break;
	}
};

barmatz.events.CollectionEvent.prototype = new barmatz.events.Event(null);
barmatz.events.CollectionEvent.prototype.constructor = barmatz.events.CollectionEvent;

Object.defineProperties(barmatz.events.CollectionEvent,
{
	ITEM_ADDED: {value: 'itemAdded'},
	ITEM_REMOVED: {value: 'itemRemoved'}
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
		model.addEventListener(barmatz.events.CollectionEvent.ITEM_ADDED, onModelItemAdded);
		model.addEventListener(barmatz.events.CollectionEvent.ITEM_REMOVED, onModelItemRemoved);
		model.forEach(function(item, index, collection)
		{
			_this._addItemModelToView(item);
		});
	}
	
	function onModelItemAdded(event)
	{
		barmatz.utils.DataTypes.isNotUndefined(event);
		barmatz.utils.DataTypes.isInstanceOf(event, barmatz.events.CollectionEvent);
		_this._addItemModelToView(event.item);
	}
	
	function onModelItemRemoved(event)
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
		this.dispatchEvent(new barmatz.events.CollectionEvent(barmatz.events.CollectionEvent.ITEM_ADDED, item, items.length - 1));
	}},
	removeItem: {value: function(item)
	{
		var items, index;
		
		barmatz.utils.DataTypes.isNotUndefined(item);
		barmatz.utils.DataTypes.isInstanceOf(item, barmatz.mvc.Model);
		
		items = this.get('items')
		index = items.indexOf(item);
		items.splice(index, 1);
		this.dispatchEvent(new barmatz.events.CollectionEvent(barmatz.events.CollectionEvent.ITEM_REMOVED, item, index));
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
/** barmatz.forms.fields.FieldModel **/
window.barmatz.forms.fields.FieldModel = function(type, name)
{
	barmatz.utils.DataTypes.isNotUndefined(type);
	barmatz.utils.DataTypes.isNotUndefined(name);
	barmatz.utils.DataTypes.isTypeOf(type, 'string', true);
	barmatz.utils.DataTypes.isTypeOf(name, 'string', true);
	barmatz.forms.TypeModel.call(this, type);
	this.set('name', name);
	this.set('label', '');
	this.set('mandatory', false);
	this.set('default', '');
	this.set('value', '');
	this.set('enabled', true);
};

barmatz.forms.fields.FieldModel.prototype = new barmatz.forms.TypeModel(null);
barmatz.forms.fields.FieldModel.prototype.constructor = barmatz.forms.fields.FieldModel;

Object.defineProperties(barmatz.forms.fields.FieldModel.prototype,
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
		this.set('enabled', value);
	}},
	clone: {value: function()
	{
		var clone = new barmatz.forms.fields.FieldModel(this.type, this.name);
		clone.label = this.label;
		clone.mandatory = this.mandatory;
		clone.default = this.default;
		clone.value = this.value;
		clone.enabled = this.enabled;
		return clone;
	}}
});
/** barmatz.forms.fields.TextFieldModel **/
window.barmatz.forms.fields.TextFieldModel = function(name)
{
	barmatz.utils.DataTypes.isNotUndefined(name);
	barmatz.utils.DataTypes.isTypeOf(name, 'string', true);
	barmatz.forms.fields.FieldModel.call(this, barmatz.forms.fields.FieldTypes.TEXT, name);
	this.set('max', NaN);
};

barmatz.forms.fields.TextFieldModel.prototype = new barmatz.forms.fields.FieldModel(null, null);
barmatz.forms.fields.TextFieldModel.prototype.constructor = barmatz.forms.fields.TextFieldModel;

Object.defineProperties(barmatz.forms.fields.TextFieldModel.prototype,
{
	max: {get: function()
	{
		return this.get('max');
	}, set: function(value)
	{
		barmatz.utils.DataTypes.isTypeOf(value, 'number');
		this.set('max', value);
	}},
	clone: {value: function()
	{
		var clone = new barmatz.forms.fields.TextFieldModel(this.name);
		clone.label = this.label;
		clone.mandatory = this.mandatory;
		clone.default = this.default;
		clone.value = this.value;
		clone.enabled = this.enabled;
		clone.max = this.max;
		return clone;
	}}
});
/** barmatz.forms.fields.CheckboxFieldModel **/
window.barmatz.forms.fields.CheckboxFieldModel = function(name)
{
	barmatz.utils.DataTypes.isNotUndefined(name);
	barmatz.utils.DataTypes.isTypeOf(name, 'string', true);
	barmatz.forms.fields.FieldModel.call(this, barmatz.forms.fields.FieldTypes.CHECKBOX, name);
	this.set('checked', false);
	this.set('defaultChecked', false);
};

barmatz.forms.fields.CheckboxFieldModel.prototype = new barmatz.forms.fields.FieldModel(null, null);
barmatz.forms.fields.CheckboxFieldModel.prototype.constructor = barmatz.forms.fields.CheckboxFieldModel;

Object.defineProperties(barmatz.forms.fields.CheckboxFieldModel.prototype, 
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
	}},
	clone: {value: function()
	{
		var clone = new barmatz.forms.fields.CheckboxFieldModel(this.name);
		clone.label = this.label;
		clone.mandatory = this.mandatory;
		clone.default = this.default;
		clone.value = this.value;
		clone.enabled = this.enabled;
		clone.checked = this.checked;
		clone.defaultChecked = this.defaultChecked;
		return clone;
	}}
});
/** barmatz.forms.fields.DropboxItemModel **/
window.barmatz.forms.fields.DropboxItemModel = function(label, value)
{
	barmatz.utils.DataTypes.isNotUndefined(label);
	barmatz.utils.DataTypes.isTypeOf(label, 'string');
	barmatz.mvc.Model.call(this);
	this.set('label', label);
	this.set('value', barmatz.utils.DataTypes.applySilent('isNotUndefined', value) ? value : null);
};

barmatz.forms.fields.DropboxItemModel.prototype = new barmatz.mvc.Model();
barmatz.forms.fields.DropboxItemModel.prototype.constructor = barmatz.forms.fields.DropboxItemModel;

Object.defineProperties(barmatz.forms.fields.DropboxItemModel.prototype, 
{
	label: {get: function()
	{
		return this.get('label');
	}, set: function(value)
	{
		barmatz.utils.DataTypes.isTypeOf(value, 'string');
		this.set('label', value);
	}},
	value: {get: function()
	{
		return this.get('value');
	}, set: function(value)
	{
		this.set('value', value);
	}}
});
/** barmatz.forms.fields.DropboxModel **/
window.barmatz.forms.fields.DropboxModel = function(items)
{
	barmatz.utils.DataTypes.isInstanceOf(items, Array, true);
	barmatz.forms.CollectionModel.call(this);
	
	if(items)
		while(items.length > this.numItems)
			this.addItem(items[this.numItems]);
};

barmatz.forms.fields.DropboxModel.prototype = new barmatz.forms.CollectionModel();
barmatz.forms.fields.DropboxModel.prototype.constructor = barmatz.forms.fields.DropboxModel;

Object.defineProperties(barmatz.forms.fields.DropboxModel.prototype,
{
	addItem: {value: function(item)
	{
		barmatz.utils.DataTypes.isNotUndefined(item);
		barmatz.utils.DataTypes.isInstanceOf(item, barmatz.forms.fields.DropboxItemModel);
		barmatz.forms.CollectionModel.prototype.addItem.call(this, item);
	}},
	removeItem: {value: function(item)
	{
		barmatz.utils.DataTypes.isNotUndefined(item);
		barmatz.utils.DataTypes.isInstanceOf(item, barmatz.forms.fields.DropboxItemModel);
		barmatz.forms.CollectionModel.prototype.removeItem.call(this, item);
	}},
	getItemIndex: {value: function(item)
	{
		barmatz.utils.DataTypes.isNotUndefined(item);
		barmatz.utils.DataTypes.isInstanceOf(item, barmatz.forms.fields.DropboxItemModel);
		barmatz.forms.CollectionModel.prototype.getItemIndex.call(this, item);
	}}
});
/** barmatz.forms.fields.FieldTypes **/
window.barmatz.forms.fields.FieldTypes = function(){};

Object.defineProperties(barmatz.forms.fields.FieldTypes,
{
	TEXT: {value: 'text'},
	PASSWORD: {value: 'password'},
	CHECKBOX: {value: 'checkbox'},
	RADIO: {value: 'radio'},
	FILE: {value: 'file'},
	HIDDEN: {value: 'hidden'}
});
/** barmatz.forms.fields.FileFieldModel **/
window.barmatz.forms.fields.FileFieldModel = function(name)
{
	barmatz.utils.DataTypes.isNotUndefined(name);
	barmatz.utils.DataTypes.isTypeOf(name, 'string');
	
	barmatz.forms.fields.FieldModel.call(this, barmatz.forms.fields.FieldTypes.FILE, name);
	
	this.set('accept', []);
};

barmatz.forms.fields.FileFieldModel.prototype = new barmatz.forms.fields.FieldModel(null, null);
barmatz.forms.fields.FileFieldModel.prototype.constructor = barmatz.forms.fields.FileFieldModel;

Object.defineProperties(barmatz.forms.fields.FileFieldModel.prototype,
{
	accept: {get: function()
	{
		return this.get('accept');
	}, set: function(value)
	{
		barmatz.utils.DataTypes.isInstanceOf(value, Array);
		this.set('accept', value);
	}},
	clone: {value: function()
	{
		var clone = new barmatz.forms.fields.FileFieldModel(this.name);
		clone.label = this.label;
		clone.mandatory = this.mandatory;
		clone.default = this.default;
		clone.value = this.value;
		clone.enabled = this.enabled;
		clone.accept = this.accept;
		return clone;
	}}
});
/** barmatz.forms.fields.HiddenFieldModel **/
window.barmatz.forms.fields.HiddenFieldModel = function(name)
{
	barmatz.utils.DataTypes.isNotUndefined(name);
	barmatz.utils.DataTypes.isTypeOf(name, 'string');
	barmatz.forms.fields.FieldModel.call(this, barmatz.forms.fields.FieldTypes.HIDDEN, name);
};

barmatz.forms.fields.HiddenFieldModel.prototype = new barmatz.forms.fields.FieldModel(null, null);
barmatz.forms.fields.HiddenFieldModel.prototype.constructor = barmatz.forms.fields.HiddenFieldModel;

Object.defineProperties(barmatz.forms.fields.HiddenFieldModel.prototype,
{
	clone: {value: function()
	{
		var clone = new barmatz.forms.fields.HiddenFieldModel(this.name);
		clone.label = this.label;
		clone.mandatory = this.mandatory;
		clone.default = this.default;
		clone.value = this.value;
		clone.enabled = this.enabled;
		return clone;
	}}	
});
/** barmatz.forms.fields.PasswordFieldModel **/
window.barmatz.forms.fields.PasswordFieldModel = function(name)
{
	barmatz.utils.DataTypes.isNotUndefined(name);
	barmatz.utils.DataTypes.isTypeOf(name, 'string');
	barmatz.forms.fields.TextFieldModel.call(this, name);
	this.set('type', barmatz.forms.fields.FieldTypes.PASSWORD);
};

barmatz.forms.fields.PasswordFieldModel.prototype = new barmatz.forms.fields.TextFieldModel(null);
barmatz.forms.fields.PasswordFieldModel.prototype.constructor = barmatz.forms.fields.PasswordFieldModel;

Object.defineProperties(barmatz.forms.fields.PasswordFieldModel.prototype,
{
	clone: {value: function()
	{
		var clone = new barmatz.forms.fields.PasswordFieldModel(this.name);
		clone.label = this.label;
		clone.mandatory = this.mandatory;
		clone.default = this.default;
		clone.value = this.value;
		clone.enabled = this.enabled;
		return clone;
	}}
});
/** barmatz.forms.fields.RadioFieldModel **/
window.barmatz.forms.fields.RadioFieldModel = function(name)
{
	barmatz.utils.DataTypes.isNotUndefined(name);
	barmatz.utils.DataTypes.isTypeOf(name, 'string');
	barmatz.forms.fields.CheckboxFieldModel.call(this, name);
	this.set('type', barmatz.forms.fields.FieldTypes.RADIO);
};

barmatz.forms.fields.RadioFieldModel.prototype = new barmatz.forms.fields.CheckboxFieldModel(null);
barmatz.forms.fields.RadioFieldModel.prototype.constructor = barmatz.forms.fields.RadioFieldModel;

Object.defineProperties(barmatz.forms.fields.RadioFieldModel.prototype,
{
	clone: {value: function()
	{
		var clone = new barmatz.forms.fields.RadioFieldModel(this.name);
		clone.label = this.label;
		clone.mandatory = this.mandatory;
		clone.default = this.default;
		clone.value = this.value;
		clone.enabled = this.enabled;
		return clone;
	}}
});
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
window.barmatz.forms.ui.PromptDialogController = function(model, view)
{
	barmatz.utils.DataTypes.isNotUndefined(model);
	barmatz.utils.DataTypes.isNotUndefined(view);
	barmatz.utils.DataTypes.isInstanceOf(model, barmatz.mvc.Model, true);
	barmatz.utils.DataTypes.isInstanceOf(view, HTMLElement, true);
	barmatz.forms.ui.DialogController.call(this, model, view);
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
/** barmatz.forms.ui.JQueryPromptDialogController **/
window.barmatz.forms.ui.JQueryPromptDialogController = function(model, view)
{
	var _this = this;
	
	barmatz.utils.DataTypes.isNotUndefined(model);
	barmatz.utils.DataTypes.isNotUndefined(view);
	barmatz.utils.DataTypes.isInstanceOf(model, barmatz.mvc.Model, true);
	barmatz.utils.DataTypes.isInstanceOf(view, HTMLElement, true);
	barmatz.forms.ui.PromptDialogController.call(this, model, view);
	
	if(view)
	{
		view.addEventListener('keydown', onViewKeyDown);
		jQuery(view).dialog({buttons: {Ok: onViewOk}});
	}
	
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

barmatz.forms.ui.JQueryPromptDialogController.prototype = new barmatz.forms.ui.PromptDialogController(null, null);
barmatz.forms.ui.JQueryPromptDialogController.prototype.constructor = barmatz.forms.ui.JQueryPromptDialogController;

Object.defineProperties(barmatz.forms.ui.JQueryPromptDialogController.prototype, {});
/** barmatz.forms.ui.Builder **/
window.barmatz.forms.ui.Builder = function(container)
{
	barmatz.utils.DataTypes.isNotUndefined(container);
	barmatz.utils.DataTypes.isInstanceOf(container, HTMLElement);
	barmatz.forms.factories.ControllerFactory.createBuilderController(barmatz.forms.factories.ModelFactory.createBuilderModel(), container);
};
window.barmatz.forms.ui.BuilderController = function(model, view)
{
	barmatz.utils.DataTypes.isNotUndefined(model);
	barmatz.utils.DataTypes.isNotUndefined(view);
	barmatz.utils.DataTypes.isInstanceOf(model, barmatz.forms.ui.BuilderModel);
	barmatz.utils.DataTypes.isInstanceOf(view, HTMLElement);
	barmatz.mvc.Controller.call(this);
	
	window.addEventListener('resize', onWindowResize);
	model.addEventListener(barmatz.events.BuilderEvent.WORKSPACE_ITEM_ADDED, onModelWorkspaceItemAdded);
	model.addEventListener(barmatz.events.BuilderEvent.TOOLBOX_ITEM_ADDED, onModelToolboxItemAdded);
	model.addEventListener(barmatz.events.BuilderEvent.TOOLBOX_ITEM_REMOVED, onModelToolboxItemRemoved);
	model.addMenuItem('New', onMenuNewClick);
	model.addMenuItem('Save', onMenuSaveClick);
	model.addMenuItem('Export', onMenuExportClick);
	model.addToolboxItem(barmatz.forms.fields.FieldTypes.TEXT, 'Text field');
	model.addToolboxItem(barmatz.forms.fields.FieldTypes.PASSWORD, 'Password field');
	model.addToolboxItem(barmatz.forms.fields.FieldTypes.CHECKBOX, 'Checkbox');
	model.addToolboxItem(barmatz.forms.fields.FieldTypes.RADIO, 'Radio button');
	model.addToolboxItem(barmatz.forms.fields.FieldTypes.FILE, 'File field');
	model.addToolboxItem(barmatz.forms.fields.FieldTypes.HIDDEN, 'Hidden field');
	view.appendChild(model.menuView);
	view.appendChild(model.toolboxView);
	view.appendChild(model.workspaceView);
	view.appendChild(model.propertiesPanelView);
	
	resizeUI();
	
	function resizeUI()
	{
		var workspaceStyle = barmatz.utils.CSS.getStyle(model.workspaceView);
		model.workspaceView.style.width = barmatz.utils.Window.width - barmatz.utils.CSS.absoluteWidth(model.toolboxView) - barmatz.utils.CSS.absoluteWidth(model.propertiesPanelView) - barmatz.utils.CSS.unitToPixal(model.workspaceView, workspaceStyle.borderLeft) - barmatz.utils.CSS.unitToPixal(model.workspaceView, workspaceStyle.borderRight) + 'px';
	}
	
	function addToolboxViewItemListeners(item)
	{
		barmatz.utils.DataTypes.isNotUndefined(item);
		barmatz.utils.DataTypes.isInstanceOf(item, HTMLElement);
		item.addEventListener('click', onModelToolboxViewItemClick);
	}
	
	function removeToolboxViewItemListeners(item)
	{
		barmatz.utils.DataTypes.isNotUndefined(item);
		barmatz.utils.DataTypes.isInstanceOf(item, HTMLElement);
		item.removeEventListener('click', onModelToolboxViewItemClick);
	}
	
	function onWindowResize(event)
	{
		resizeUI();
	}
	
	function onModelToolboxItemAdded(event)
	{
		barmatz.utils.DataTypes.isNotUndefined(event);
		barmatz.utils.DataTypes.isInstanceOf(event, barmatz.events.BuilderEvent);
		addToolboxViewItemListeners(model.getToolboxItemViewAt(event.index));
	}
	
	function onModelToolboxItemRemoved(event)
	{
		barmatz.utils.DataTypes.isNotUndefined(event);
		barmatz.utils.DataTypes.isInstanceOf(event, barmatz.events.BuilderEvent);
		removeToolboxViewItemListeners(toolboxView.childNodes[event.index]);
	}

	function onModelToolboxViewItemClick(event)
	{
		barmatz.utils.DataTypes.isNotUndefined(event);
		barmatz.utils.DataTypes.isInstanceOf(event, MouseEvent);
		model.workspaceViewClickHandler = onModelWorkspaceViewClick;
		model.addWorkspaceItemFromToolbox(event.target);
		event.stopImmediatePropagation();
	}
	
	function onModelWorkspaceItemAdded(event)
	{
		barmatz.utils.DataTypes.isNotUndefined(event);
		barmatz.utils.DataTypes.isInstanceOf(event, barmatz.events.BuilderEvent);
		model.workspaceViewItemClickHandler = onModelWorkspaceViewItemClick;
		model.setWorkspaceViewItemClickHandlerAt(event.index, onModelWorkspaceViewItemClick);
	}
	
	function onModelWorkspaceViewItemClick(event)
	{
		barmatz.utils.DataTypes.isNotUndefined(event);
		barmatz.utils.DataTypes.isInstanceOf(event, MouseEvent);
		event.stopImmediatePropagation();
		model.workspaceViewClickHandler = onModelWorkspaceViewClick;
		model.propertiesPanelControllerModel = model.getWorkspaceModelItemFromView(event.currentTarget);
	}
	
	function onModelWorkspaceViewClick(event)
	{
		model.propertiesPanelControllerModel = null;
		model.workspaceViewClickHandler = null;
	}
	
	function onMenuNewClick(event)
	{
		console.log('new');
	}
	
	function onMenuSaveClick(event)
	{
		console.log('save');
	}
	
	function onMenuExportClick(event)
	{
		console.log('exprot');
	}
};

barmatz.forms.ui.BuilderController.prototype = new barmatz.mvc.Controller();
barmatz.forms.ui.BuilderController.prototype.constructor = barmatz.forms.ui.BuilderController;
/** barmatz.forms.ui.BuilderModel **/
window.barmatz.forms.ui.BuilderModel = function()
{
	var _this;
	
	barmatz.mvc.Model.call(this);

	_this = this;
	this.set('menuModel', barmatz.forms.factories.ModelFactory.createMenuModel());
	this.set('menuView', barmatz.forms.factories.DOMFactory.createBuilderMenu());
	this.set('toolboxModel', barmatz.forms.factories.ModelFactory.createToolboxModel());
	this.set('toolboxView', barmatz.forms.factories.DOMFactory.createBuilderToolbox());
	this.set('workspaceModel', barmatz.forms.factories.ModelFactory.createWorkspaceModel());
	this.set('workspaceViewWrapper', barmatz.forms.factories.DOMFactory.createBuilderWorkspaceWrapper());
	this.set('propertiesPanelView', barmatz.forms.factories.DOMFactory.createBuilderPropertiesPanel());
	this.set('propertiesPanelController', barmatz.forms.factories.ControllerFactory.createPropertiesPanelController(this.propertiesPanelView));
	
	barmatz.forms.factories.ControllerFactory.createMenuController(this.get('menuModel'), this.menuView);
	barmatz.forms.factories.ControllerFactory.createToolboxController(this.get('toolboxModel'), this.toolboxView);
	barmatz.forms.factories.ControllerFactory.createWorkspaceController(this.get('workspaceModel'), this.get('workspaceViewWrapper').workspace);
	
	this.get('toolboxModel').addEventListener(barmatz.events.CollectionEvent.ITEM_ADDED, onModelItemAdded);
	this.get('toolboxModel').addEventListener(barmatz.events.CollectionEvent.ITEM_REMOVED, onModelItemRemoved);
	this.get('workspaceModel').addEventListener(barmatz.events.CollectionEvent.ITEM_ADDED, onModelItemAdded);
	this.get('workspaceModel').addEventListener(barmatz.events.CollectionEvent.ITEM_REMOVED, onModelItemRemoved);
	
	function onModelItemAdded(event)
	{
		var type;
		
		barmatz.utils.DataTypes.isNotUndefined(event);
		barmatz.utils.DataTypes.isInstanceOf(event, barmatz.events.CollectionEvent);
		
		switch(event.target)
		{
			default:
				throw new Error('unknown target');
				break;
			case _this.get('toolboxModel'):
				type = barmatz.events.BuilderEvent.TOOLBOX_ITEM_ADDED;
				break;
			case _this.get('workspaceModel'):
				type = barmatz.events.BuilderEvent.WORKSPACE_ITEM_ADDED;
				_this.propertiesPanelControllerModel = event.item;
				break;
		}
		
		_this.dispatchEvent(new barmatz.events.BuilderEvent(type, event.item, event.index));
	}
	
	function onModelItemRemoved(event)
	{
		var type;
		
		barmatz.utils.DataTypes.isNotUndefined(event);
		barmatz.utils.DataTypes.isInstanceOf(event, barmatz.events.CollectionEvent);
		
		switch(event.target)
		{
			default:
				throw new Error('unknown target');
				break;
			case _this.get('toolboxModel'):
				type = barmatz.events.BuilderEvent.TOOLBOX_ITEM_REMOVED;
				break;
			case _this.get('workspaceModel'):
				type = barmatz.events.BuilderEvent.WORKSPACE_ITEM_REMOVED;
				_this.propertiesPanelControllerModel = _this.numWorkspaceModelItems > 0 ? _this.getWorkspaceModelItemAt(event.index < _this.numWorkspaceModelItems ? event.index : event.index - 1) : null;
				break;
		}
		
		_this.dispatchEvent(new barmatz.events.BuilderEvent(type, event.item, event.index));
	}
};

barmatz.forms.ui.BuilderModel.prototype = new barmatz.mvc.Model();
barmatz.forms.ui.BuilderModel.prototype.constructor = barmatz.forms.ui.BuilderModel;

Object.defineProperties(barmatz.forms.ui.BuilderModel.prototype, 
{
	menuView: {get: function()
	{
		return this.get('menuView'); 
	}},
	toolboxView: {get: function()
	{
		return this.get('toolboxView'); 
	}},
	workspaceView: {get: function()
	{
		return this.get('workspaceViewWrapper').wrapper; 
	}},
	propertiesPanelView: {get: function()
	{
		return this.get('propertiesPanelView'); 
	}},
	workspaceViewClickHandler: {get: function()
	{
		return this.get('workspaceViewClickHandler');
	}, set: function(value)
	{
		barmatz.utils.DataTypes.isTypeOf(value, 'function', true);
		
		if(value != this.workspaceViewClickHandler)
		{
			if(barmatz.utils.DataTypes.applySilent('isValid', this.workspaceViewClickHandler))
				this.workspaceView.removeEventListener('click', this.workspaceViewClickHandler);
			
			this.set('workspaceViewClickHandler', value);
			
			if(barmatz.utils.DataTypes.applySilent('isValid', value))
				this.workspaceView.addEventListener('click', value);
		}
	}},
	workspaceViewItemClickHandler: {get: function()
	{
		return this.get('workspaceViewItemClickHandler');
	}, set: function(value)
	{
		var _this;
		
		barmatz.utils.DataTypes.isTypeOf(value, 'function', true);
		
		_this = this;
		
		if(value != this.workspaceViewItemClickHandler)
		{
			if(barmatz.utils.DataTypes.applySilent('isValid', this.workspaceViewItemClickHandler))
				removeClickHandlerFromItems();
			
			this.set('workspaceViewItemClickHandler', value);
			
			if(barmatz.utils.DataTypes.applySilent('isValid', value))
				addClickHandlerFromItems();
		}
		
		function addClickHandlerFromItems()
		{
			addOrRemoveClickHandlerFromItems('add');
		}
		
		function removeClickHandlerFromItems()
		{
			addOrRemoveClickHandlerFromItems('remove');
		}
		
		function addOrRemoveClickHandlerFromItems(action)
		{
			var i;
			
			barmatz.utils.DataTypes.isNotUndefined(action);
			barmatz.utils.DataTypes.isTypeOf(action, 'string');
			
			for(; i < _this.workspaceView.childNodes.length; i++)
				_this.setWorkspaceViewItemClickHandlerAt(i, 'add' ? _this.workspaceViewClickHandler : null);
		}
	}},
	propertiesPanelControllerModel: {get: function()
	{
		return this.get('propertiesPanelControllerModel');
	}, set: function(value)
	{
		barmatz.utils.DataTypes.isInstanceOf(value, barmatz.forms.fields.FieldModel, true);
		this.set('propertiesPanelControllerModel', value);
		this.get('propertiesPanelController').model = value;
	}},
	numWorkspaceModelItems: {get: function()
	{
		return this.get('workspaceModel').numItems;
	}},
	addMenuItem: {value: function(label, clickHandler)
	{

		barmatz.utils.DataTypes.isNotUndefined(label);
		barmatz.utils.DataTypes.isTypeOf(label, 'string');
		barmatz.utils.DataTypes.isTypeOf(clickHandler, 'function');
		this.get('menuModel').addItem(barmatz.forms.factories.ModelFactory.createMenuItemModel(label, clickHandler));
	}},
	addToolboxItem: {value: function(type, label)
	{
		barmatz.utils.DataTypes.isNotUndefined(type);
		barmatz.utils.DataTypes.isNotUndefined(label);
		barmatz.utils.DataTypes.isTypeOf(type, 'string');
		barmatz.utils.DataTypes.isTypeOf(label, 'string');
		this.get('toolboxModel').addItem(barmatz.forms.factories.ModelFactory.createToolboxItemModel(type, label), barmatz.forms.factories.ModelFactory.createFieldModel(type, ''));
	}},
	addWorkspceItem: {value: function(item)
	{
		barmatz.utils.DataTypes.isNotUndefined(item);
		barmatz.utils.DataTypes.isInstanceOf(item, barmatz.mvc.Model);
		this.get('workspaceModel').addItem(item);
	}},
	addWorkspaceItemFromToolbox: {value: function(item)
	{
		barmatz.utils.DataTypes.isNotUndefined(item);
		barmatz.utils.DataTypes.isInstanceOf(item, HTMLElement);
		this.addWorkspceItem(this.getFieldModelFromToolboxModelAt(this.getIndexOfView(item)).clone());
	}},
	getIndexOfView: {value: function(view)
	{
		barmatz.utils.DataTypes.isNotUndefined(view);
		barmatz.utils.DataTypes.isInstanceOf(view, HTMLElement);
		return Array.prototype.slice.call(view.parentElement.childNodes).indexOf(view);
	}},
	getFieldModelFromToolboxModelAt: {value: function(index)
	{
		barmatz.utils.DataTypes.isNotUndefined(index);
		barmatz.utils.DataTypes.isTypeOf(index, 'number');
		return this.get('toolboxModel').getFieldModelAt(index);
	}},
	getToolboxItemViewAt: {value: function(index)
	{
		barmatz.utils.DataTypes.isNotUndefined(index);
		barmatz.utils.DataTypes.isTypeOf(index, 'number');
		return this.toolboxView.childNodes[index];
	}},
	getWorkspaceModelItemAt: {value: function(index)
	{
		barmatz.utils.DataTypes.isNotUndefined(index);
		barmatz.utils.DataTypes.isTypeOf(index, 'number');
		return this.get('workspaceModel').getItemAt(index);
	}},
	getWorkspaceModelItemFromView: {value: function(view)
	{
		barmatz.utils.DataTypes.isNotUndefined(view);
		barmatz.utils.DataTypes.isInstanceOf(view, HTMLElement);
		return this.getWorkspaceModelItemAt(this.getIndexOfView(view));
	}},
	setWorkspaceViewItemClickHandlerAt: {value: function(index, handler)
	{
		var element;
		
		barmatz.utils.DataTypes.isNotUndefined(index);
		barmatz.utils.DataTypes.isNotUndefined(handler);
		barmatz.utils.DataTypes.isTypeOf(index, 'number');
		barmatz.utils.DataTypes.isTypeOf(handler, 'function', true);
		
		element = this.get('workspaceViewWrapper').workspace.childNodes[index];
		
		if(barmatz.utils.DataTypes.applySilent('isValid', handler))
			element.addEventListener('click', handler);
		else if(element.hasEventListener('click'))
			element.removeEventListener('click', handler);
	}}
});
/** barmatz.forms.ui.JQueryPromptDialogController **/
window.barmatz.forms.ui.JQueryPromptDialogController = function(model, view)
{
	var _this = this;
	
	barmatz.utils.DataTypes.isNotUndefined(model);
	barmatz.utils.DataTypes.isNotUndefined(view);
	barmatz.utils.DataTypes.isInstanceOf(model, barmatz.mvc.Model, true);
	barmatz.utils.DataTypes.isInstanceOf(view, HTMLElement, true);
	barmatz.forms.ui.PromptDialogController.call(this, model, view);
	
	if(view)
	{
		view.addEventListener('keydown', onViewKeyDown);
		jQuery(view).dialog({buttons: {Ok: onViewOk}});
	}
	
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

barmatz.forms.ui.JQueryPromptDialogController.prototype = new barmatz.forms.ui.PromptDialogController(null, null);
barmatz.forms.ui.JQueryPromptDialogController.prototype.constructor = barmatz.forms.ui.JQueryPromptDialogController;

Object.defineProperties(barmatz.forms.ui.JQueryPromptDialogController.prototype, {});
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
		return barmatz.forms.factories.DOMFactory.createMenuItem(model.label, model.clickHandler);
	}}
});
/** barmatz.forms.ui.MenuItemModel **/
window.barmatz.forms.ui.MenuItemModel = function(label)
{
	barmatz.utils.DataTypes.isTypeOf(label, 'string');
	barmatz.mvc.Model.call(this);
	this.set('label', label);
	this.set('clickHandler', null);
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
	}},
	clickHandler: {get: function()
	{
		return this.get('clickHandler');
	}, set: function(value)
	{
		barmatz.utils.DataTypes.isTypeOf(value, 'function', true);
		this.set('clickHandler', value);
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
/** barmatz.forms.ui.NewFieldDialogController **/
window.barmatz.forms.ui.NewFieldDialogController = function(model, view, nameFieldView, labelFieldView)
{
	barmatz.utils.DataTypes.isNotUndefined(model);
	barmatz.utils.DataTypes.isNotUndefined(view);
	barmatz.utils.DataTypes.isNotUndefined(nameFieldView);
	barmatz.utils.DataTypes.isNotUndefined(labelFieldView);
	barmatz.utils.DataTypes.isInstanceOf(model, barmatz.mvc.Model);
	barmatz.utils.DataTypes.isInstanceOf(view, HTMLElement);
	barmatz.utils.DataTypes.isInstanceOf(nameFieldView, HTMLInputElement);
	barmatz.utils.DataTypes.isInstanceOf(labelFieldView, HTMLInputElement);
	barmatz.forms.ui.JQueryPromptDialogController.call(this, model, view);
	
	this._nameFieldView = nameFieldView;
	this._labelFieldView = labelFieldView;
};

barmatz.forms.ui.NewFieldDialogController.prototype = new barmatz.forms.ui.JQueryPromptDialogController(null, null);
barmatz.forms.ui.NewFieldDialogController.prototype.constructor = barmatz.forms.ui.NewFieldDialogController;

Object.defineProperties(barmatz.forms.ui.NewFieldDialogController.prototype, 
{
	_submitDialog: {value: function()
	{
		this._model.name = this._nameFieldView.value;
		this._model.label = this._labelFieldView.value;
		barmatz.forms.factories.DOMFactory.destroyDialog(this._view);
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
		var itemsWrapper;
		
		barmatz.utils.DataTypes.isInstanceOf(value, barmatz.forms.fields.FieldModel, true);
		
		if(this._model)
			this._model.removeEventListener(barmatz.events.ModelEvent.VALUE_CHANGED, onModelValueChanged);
		
		this._model = value;
		this._view.innerHTML = '';
		
		if(this._model)
		{
			itemsWrapper = barmatz.forms.factories.DOMFactory.createPropertiesPanelItemWarpper(this._model);
			
			this._model.addEventListener(barmatz.events.ModelEvent.VALUE_CHANGED, onModelValueChanged);
			this._view.appendChild(itemsWrapper.wrapper);
		}
		else
			this._view.appendChild(barmatz.forms.factories.DOMFactory.createElementWithContent('h2', 'forms-filler', 'No item selected'));
		
		function onModelValueChanged(event)
		{
			barmatz.utils.DataTypes.isNotUndefined(event);
			barmatz.utils.DataTypes.isInstanceOf(event, barmatz.events.ModelEvent);
			
			switch(event.key)
			{
				default:
					throw new Error('unknown key');
					break;
				case 'name':
					itemsWrapper.nameField.value = event.value;
					break;
				case 'label':
					itemsWrapper.labelField.value = event.value;
					break;
				case 'mandatory':
					itemsWrapper.mandatoryField.value = event.value;
					break;
				case 'default':
					itemsWrapper.defaultValueField.value = event.value;
					break;
				case 'enabled':
					itemsWrapper.enabledField.value = event.value;
					break;
				case 'max':
					itemsWrapper.maxField.value = isNaN(event.value) ? '' : event.value;
					break;
				case 'checked':
					itemsWrapper.checkedField.value = event.value;
					break;
				case 'defaultChecked':
					itemsWrapper.defaultCheckedField.value = event.value;
					break;
				case 'accept':
					itemsWrapper.acceptField.value = event.value.join(', ');
					break;
			}
		}
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
	this._fieldDictionary = new barmatz.utils.Dictionary();
};

barmatz.forms.ui.ToolboxModel.prototype = new barmatz.forms.CollectionModel();
barmatz.forms.ui.ToolboxModel.prototype.constructor = barmatz.forms.ui.ToolboxModel;

Object.defineProperties(barmatz.forms.ui.ToolboxModel.prototype,
{
	addItem: {value: function(item, fieldModel)
	{
		barmatz.utils.DataTypes.isNotUndefined(item);
		barmatz.utils.DataTypes.isNotUndefined(fieldModel);
		barmatz.utils.DataTypes.isInstanceOf(item, barmatz.forms.ui.ToolboxItemModel);
		barmatz.utils.DataTypes.isInstanceOf(fieldModel, barmatz.forms.fields.FieldModel);
		barmatz.forms.CollectionModel.prototype.addItem.call(this, item);
		this._fieldDictionary.add(item, fieldModel);
	}},
	removeItem: {value: function(item)
	{
		barmatz.utils.DataTypes.isNotUndefined(item);
		barmatz.utils.DataTypes.isInstanceOf(item, barmatz.forms.ui.ToolboxItemModel);
		barmatz.forms.CollectionModel.prototype.removeItem.call(this, item);
		this._fieldDictionary.remove(item);
	}},
	getItemIndex: {value: function(item)
	{
		barmatz.utils.DataTypes.isNotUndefined(item);
		barmatz.utils.DataTypes.isInstanceOf(item, barmatz.forms.ui.ToolboxItemModel);
		barmatz.forms.CollectionModel.prototype.getItemIndex.call(this, item);
	}},
	getFieldModel: {value: function(item)
	{
		barmatz.utils.DataTypes.isNotUndefined(item);
		barmatz.utils.DataTypes.isInstanceOf(item, barmatz.forms.ui.ToolboxItemModel);
		return this._fieldDictionary.get(item);
	}},
	getFieldModelAt: {value: function(index)
	{
		barmatz.utils.DataTypes.isNotUndefined(index);
		barmatz.utils.DataTypes.isTypeOf(index, 'number');
		return this.getFieldModel(this.getItemAt(index));
	}}
});
/** barmatz.forms.ui.WorkspaceController **/
window.barmatz.forms.ui.WorkspaceController = function(model, view)
{
	var _this = this, selectedItemIndex;
	
	barmatz.forms.CollectionController.call(this, model, view);
	
	if(model)
	{
		model.addEventListener(barmatz.events.CollectionEvent.ITEM_ADDED, onModelItemAdded);
		setViewToSortable();
	}
	
	function setViewToSortable()
	{
		jQuery(view).sortable({axis: 'y', containment: 'parent', helper: getSortableHelper, placeholder: 'sortable-placeholder', start: onSortingStart, stop: onSortingStopped});
	}
	
	function getSortableHelper(event, ui)
	{
		var element;
		
		barmatz.utils.DataTypes.isNotUndefined(event);
		barmatz.utils.DataTypes.isNotUndefined(ui);
		barmatz.utils.DataTypes.isInstanceOf(event, jQuery.Event);
		barmatz.utils.DataTypes.isInstanceOf(ui, jQuery);
		
		ui.children().each(function() {
			$(this).width($(this).width());
		});
		
		return ui;
		
	}
	
	function getIndexFromSortEvent(element)
	{
		barmatz.utils.DataTypes.isNotUndefined(element);
		barmatz.utils.DataTypes.isInstanceOf(element, HTMLElement);
		return Array.prototype.slice.call(element.parentElement.childNodes).indexOf(element);
	}
	
	function openNewFieldDialog(model)
	{
		var dialogWarpper;
		
		barmatz.utils.DataTypes.isNotUndefined(model);
		barmatz.utils.DataTypes.isInstanceOf(model, barmatz.forms.fields.FieldModel);
		
		dialogWarpper = barmatz.forms.factories.DOMFactory.createNewFieldDialogWrapper();
		jQuery(dialogWarpper.wrapper).dialog('open');
		
		barmatz.forms.factories.ControllerFactory.createNewFieldDialogController(model, dialogWarpper.wrapper, dialogWarpper.nameField, dialogWarpper.labelField);
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
	
	function onModelItemAdded(event)
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
	_addItemModelToView: {value: function(model)
	{
		barmatz.utils.DataTypes.isNotUndefined(model);
		barmatz.utils.DataTypes.isInstanceOf(model, barmatz.mvc.Model);
		barmatz.forms.CollectionController.prototype._addItemModelToView.call(this, model);
	}},
	_createItemViewFromModel: {value: function(model)
	{
		var _this = this, viewWrapper;
		
		barmatz.utils.DataTypes.isNotUndefined(model);
		barmatz.utils.DataTypes.isInstanceOf(model, barmatz.forms.fields.FieldModel);
		viewWrapper = barmatz.forms.factories.DOMFactory.createWorkspaceItemWrapper(model);
		viewWrapper.deleteButton.addEventListener('click', onDeleteButtonClick);
		barmatz.forms.factories.ControllerFactory.createWorkspaceItemController(model, viewWrapper.label, viewWrapper.field, viewWrapper.mandatory, viewWrapper.deleteButton);
		return viewWrapper.wrapper;
		
		function onDeleteButtonClick(event)
		{
			barmatz.utils.DataTypes.isNotUndefined(event);
			barmatz.utils.DataTypes.isInstanceOf(event, MouseEvent);
			barmatz.forms.factories.DOMFactory.createConfirmPromptDialog('Are you sure you want to delete this item?', onDialogConfirm, true);
			event.stopImmediatePropagation();
		}
		
		function onDialogConfirm(event)
		{
			viewWrapper.deleteButton.removeEventListener('click', onDeleteButtonClick);
			_this._model.removeItem(model);
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
	barmatz.utils.DataTypes.isInstanceOf(model, barmatz.forms.fields.FieldModel);
	barmatz.utils.DataTypes.isInstanceOf(labelView, HTMLElement);
	barmatz.utils.DataTypes.isInstanceOf(fieldView, HTMLElement);
	barmatz.utils.DataTypes.isInstanceOf(mandatoryView, HTMLElement);
	barmatz.utils.DataTypes.isInstanceOf(deleteButtonView, HTMLElement);
	barmatz.mvc.Controller.call(this);
	model.addEventListener(barmatz.events.ModelEvent.VALUE_CHANGED, onModelValueChanged);
	
	function onModelValueChanged(event)
	{
		barmatz.utils.DataTypes.isNotUndefined(event);
		barmatz.utils.DataTypes.isInstanceOf(event, barmatz.events.ModelEvent);

		switch(event.key)
		{
			default:
				throw new Error('unknown key');
				break;
			case 'name':
				fieldView.name = event.value;
				break;
			case 'label':
				labelView.innerHTML = event.value;
				break;
			case 'mandatory':
				mandatoryView.innerHTML = event.value ? '*' : '';
				break;
			case 'default':
				fieldView.defaultValue = event.value;
				break;
			case 'value':
				fieldView.value = event.value;
				break;
			case 'enabled':
				fieldView.disabled = !event.value;
				break;
			case 'max':
				fieldView.maxLength = event.value;
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
};

barmatz.forms.ui.WorkspaceItemController.prototype = new barmatz.mvc.Controller();
barmatz.forms.ui.WorkspaceItemController.prototype.constructor = barmatz.forms.ui.WorkspaceItemController;
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
				_this.addField(barmatz.forms.factories.ModelFactory.createFieldModel(field.type, field.name, field));
			}
		}
	}},
	addField: {value: function(field)
	{
		barmatz.utils.DataTypes.isNotUndefined(field);
		barmatz.utils.DataTypes.isInstanceOf(field, barmatz.forms.fields.FieldModel);
		this._fields.push(field);
		this.dispatchEvent(new barmatz.events.CollectionEvent(barmatz.events.CollectionEvent.ITEM_ADDED, field));
	}},
	addFieldAt: {value: function(field, index)
	{
		barmatz.utils.DataTypes.isNotUndefined(field);
		barmatz.utils.DataTypes.isNotUndefined(index);
		barmatz.utils.DataTypes.isInstanceOf(field, barmatz.forms.fields.FieldModel);

		if(index < 0)
			index = 0;
		else if(index > this.numFields)
			index = this.numFields;
		
		this._fields.splice(index, 0, field);
		this.dispatchEvent(new barmatz.events.CollectionEvent(barmatz.events.CollectionEvent.ITEM_ADDED, field));
	}},
	removeField: {value: function(field)
	{
		barmatz.utils.DataTypes.isNotUndefined(field);
		barmatz.utils.DataTypes.isInstanceOf(field, barmatz.forms.fields.FieldModel);
		this.removeFieldAt(this._fields.indexOf(field));
		this.dispatchEvent(new barmatz.events.CollectionEvent(barmatz.events.CollectionEvent.ITEM_REMOVED, field));
	}},
	removeFieldAt: {value: function(index)
	{
		var field;
		
		if(index < 0 || index >= this.numFields)
			throw new Error('index is out of bounds');
		
		field = this._fields.splice(index, 1)[0];
		this.dispatchEvent(new barmatz.events.CollectionEvent(barmatz.events.CollectionEvent.ITEM_REMOVED, field));
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
	createBuilderController: {value: function(model, view)
	{
		barmatz.utils.DataTypes.isNotUndefined(model);
		barmatz.utils.DataTypes.isNotUndefined(view);
		barmatz.utils.DataTypes.isInstanceOf(model, barmatz.forms.ui.BuilderModel);
		barmatz.utils.DataTypes.isInstanceOf(view, HTMLElement);
		return new barmatz.forms.ui.BuilderController(model, view);
	}},
	createWorkspaceItemController: {value: function(model, labelView, fieldView, mandatoryView, deleteButtonView)
	{
		barmatz.utils.DataTypes.isNotUndefined(model);
		barmatz.utils.DataTypes.isNotUndefined(labelView);
		barmatz.utils.DataTypes.isNotUndefined(fieldView);
		barmatz.utils.DataTypes.isNotUndefined(mandatoryView);
		barmatz.utils.DataTypes.isNotUndefined(deleteButtonView);
		barmatz.utils.DataTypes.isInstanceOf(model, barmatz.forms.fields.FieldModel);
		barmatz.utils.DataTypes.isInstanceOf(labelView, HTMLElement);
		barmatz.utils.DataTypes.isInstanceOf(fieldView, HTMLElement);
		barmatz.utils.DataTypes.isInstanceOf(mandatoryView, HTMLElement);
		barmatz.utils.DataTypes.isInstanceOf(deleteButtonView, HTMLElement);
		return new barmatz.forms.ui.WorkspaceItemController(model, labelView, fieldView, mandatoryView, deleteButtonView);
	}},
	createNewFieldDialogController: {value: function(model, view, nameFieldView, labelFieldView)
	{
		barmatz.utils.DataTypes.isNotUndefined(model);
		barmatz.utils.DataTypes.isNotUndefined(view);
		barmatz.utils.DataTypes.isNotUndefined(nameFieldView);
		barmatz.utils.DataTypes.isNotUndefined(labelFieldView);
		barmatz.utils.DataTypes.isInstanceOf(model, barmatz.mvc.Model);
		barmatz.utils.DataTypes.isInstanceOf(view, HTMLElement);
		barmatz.utils.DataTypes.isInstanceOf(nameFieldView, HTMLInputElement);
		barmatz.utils.DataTypes.isInstanceOf(labelFieldView, HTMLInputElement);
		return new barmatz.forms.ui.NewFieldDialogController(model, view, nameFieldView, labelFieldView);
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
		barmatz.utils.DataTypes.isTypesOrInstances(content, ['string'], [HTMLElement, Array]);
		
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
	createDropboxElement: {value: function(model, selectedIndex)
	{
		var _this, dropbox;
		
		barmatz.utils.DataTypes.isNotUndefined(model);
		barmatz.utils.DataTypes.isInstanceOf(model, barmatz.forms.fields.DropboxModel);
		barmatz.utils.DataTypes.isTypeOf(selectedIndex, 'number', true);
		
		_this = this;
		dropbox = this.createElement('select');
		
		model.forEach(function(item, index, collection)
		{
			var option =_this.createElementWithContent('option', '', item.label);
			option.value = item.value;
			dropbox.appendChild(option);
		});
		
		if(selectedIndex)
			dropbox.selectedIndex = selectedIndex;
		
		return dropbox;
	}},
	createFormFieldElement: {value: function(model)
	{
		var field, key;
		
		barmatz.utils.DataTypes.isNotUndefined(model);
		barmatz.utils.DataTypes.isInstanceOf(model, barmatz.forms.fields.FieldModel);
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
				case barmatz.forms.fields.FieldTypes.TEXT:
				case barmatz.forms.fields.FieldTypes.PASSWORD:
				case barmatz.forms.fields.FieldTypes.CHECKBOX:
				case barmatz.forms.fields.FieldTypes.RADIO:
				case barmatz.forms.fields.FieldTypes.FILE:
				case barmatz.forms.fields.FieldTypes.HIDDEN:
					return 'input';
					break;
			}
		}
	}},
	createFieldWrapper: {value: function(model, className)
	{
		var wrapper, label, field, mandatory;
		
		barmatz.utils.DataTypes.isNotUndefined(model);
		barmatz.utils.DataTypes.isInstanceOf(model, barmatz.forms.fields.FieldModel);
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
	createBuilderWorkspaceWrapper: {value: function(formName, saveStatus)
	{
		var formNameElement, saveStatusElement, workspaceElement;
		
		barmatz.utils.DataTypes.isTypeOf(formName, 'string', true);
		barmatz.utils.DataTypes.isTypeOf(saveStatus, 'string', true);
		
		formNameElement = this.createElementWithContent('h1', 'forms-builder-workspace-header-form-name', formName || 'Unnamed form');
		saveStatusElement = this.createElementWithContent('h3', 'forms-builder-workspace-header-save-status', saveStatus || 'form not saved');
		workspaceElement = this.createElement('table', 'forms-builder-workspace');

		return {wrapper: this.createElementWithContent('div', 'forms-builder-workspace-wrapper', [this.createElementWithContent('div', 'forms-builder-workspace-header', [formNameElement, saveStatusElement]), workspaceElement]), formName: formNameElement, saveStatus: saveStatusElement, workspace: workspaceElement};
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
	createMenuItem: {value: function(label, clickHandler)
	{
		var item;
		
		barmatz.utils.DataTypes.isNotUndefined(label);
		barmatz.utils.DataTypes.isTypeOf(label, 'string');
		barmatz.utils.DataTypes.isTypeOf(clickHandler, 'function');
		
		item = this.createElementWithContent('li', 'forms-menu-item rounded-corner', label);
		
		if(barmatz.utils.DataTypes.applySilent('isValid', clickHandler))
			item.addEventListener('click', clickHandler);
		
		return item;
	}},
	destroyMenuItem: {value: function(item, clickHandler)
	{
		barmatz.utils.DataTypes.isNotUndefined(item);
		barmatz.utils.DataTypes.isInstanceOfOf(item, HTMLElement);
		barmatz.utils.DataTypes.isTypeOf(clickHandler, 'function');
		
		if(barmatz.utils.DataTypes.applySilent('isValid', clickHandler))
			item.removeEventListener('click', clickHandler);
		
		item.parentElement.removeChild(item);
	}},
	createWorkspaceItemWrapper: {value: function(model)
	{
		var _this, wrapper, grip, label, field, mandatory, deleteButton;
		
		barmatz.utils.DataTypes.isNotUndefined(model);
		barmatz.utils.DataTypes.isInstanceOf(model, barmatz.forms.fields.FieldModel);
		
		_this = this;
		wrapper = this.createElement('tr', 'forms-workspace-item');
		grip = this.createElement('span', 'forms-grip ui-icon ui-icon-grip-dotted-vertical');
		label = this.createElementWithContent('label', '', model.label ? model.label : '');
		field = this.createFormFieldElement(model);
		mandatory = this.createElementWithContent('span', 'forms-workspace-item-mandatory', mandatory ? '*' : '');
		deleteButton = this.createElement('span', 'forms-delete ui-icon ui-icon-circle-close');
		jQuery(deleteButton).button();
		
		addToWrapper('forms-workspace-item-grip', grip);
		addToWrapper('forms-workspace-item-label', label);
		addToWrapper('forms-workspace-item-field', [field, mandatory]);
		addToWrapper('forms-workspace-item-delete-button', deleteButton);
		
		return {wrapper: wrapper, label: label, field: field, mandatory: mandatory, deleteButton: deleteButton};
		
		function addToWrapper(className, content)
		{
			barmatz.utils.DataTypes.isNotUndefined(className);
			barmatz.utils.DataTypes.isNotUndefined(content);
			barmatz.utils.DataTypes.isTypeOf(className, 'string');
			wrapper.appendChild(_this.createElementWithContent('td', className, content));
		}
	}},
	createPropertiesPanelItemWarpper: {value: function(model)
	{
		var _this, returnWrapper, wrapper;
		
		barmatz.utils.DataTypes.isNotUndefined(model);
		barmatz.utils.DataTypes.isInstanceOf(model, barmatz.forms.fields.FieldModel);
		
		_this = this;
		returnWrapper = {};
		
		wrapper = this.createElement('div');
		wrapper.appendChild(this.createElementWithContent('h2', 'forms-header', barmatz.utils.String.firstLetterToUpperCase(model.type) + ' field'));
		
		returnWrapper.wrapper = wrapper;
		
		if(model instanceof barmatz.forms.fields.FieldModel)
		{
			returnWrapper.nameField = addFieldToWrapper('string', 'name', 'name', model.name);
			returnWrapper.labelField = addFieldToWrapper('string', 'label', 'label', model.label);
			returnWrapper.mandatoryField = addFieldToWrapper('boolean', 'mandatory', 'mandatory', model.mandatory);
			returnWrapper.defaultValueField = addFieldToWrapper('string', 'default', 'default value', model.default);
			returnWrapper.enabledField = addFieldToWrapper('boolean', 'enabled', 'enabled', model.enabled);
		}
		
		if(model instanceof barmatz.forms.fields.FileFieldModel)
			returnWrapper.acceptField = addFieldToWrapper('array', 'accept', 'accept', model.accept);

		if(model instanceof barmatz.forms.fields.TextFieldModel)
			returnWrapper.maxField = addFieldToWrapper('number', 'max', 'max', model.max);
		
		if(model instanceof barmatz.forms.fields.CheckboxFieldModel)
		{
			returnWrapper.checkedField = addFieldToWrapper('boolean', 'checked', 'checked', model.checked);
			returnWrapper.defaultCheckedField = addFieldToWrapper('boolean', 'default checked', 'defaultChecked', model.defaultChecked);
		}
		
		return returnWrapper;
		
		function addFieldToWrapper(type, name, label, value)
		{
			var fieldWrapper;
			
			barmatz.utils.DataTypes.isNotUndefined(type);
			barmatz.utils.DataTypes.isNotUndefined(name);
			barmatz.utils.DataTypes.isNotUndefined(label);
			barmatz.utils.DataTypes.isNotUndefined(value);
			barmatz.utils.DataTypes.isTypeOf(type, 'string');
			barmatz.utils.DataTypes.isTypeOf(name, 'string');
			barmatz.utils.DataTypes.isTypeOf(label, 'string');

			fieldWrapper = _this.createPropertiesPanelItemFieldWrapper(type, name, label, value, onFieldValueChange);
			wrapper.appendChild(fieldWrapper.wrapper);
			return fieldWrapper.field;
		}
		
		function onFieldValueChange(event)
		{
			barmatz.utils.DataTypes.isNotUndefined(event);
			barmatz.utils.DataTypes.isInstanceOf(event, Event);

			try
			{
				assignString();
			}
			catch(error)
			{
				try
				{
					assignArray();
				}
				catch(error)
				{
					try
					{
						assignBoolean();
					}
					catch(error)
					{
						assignNumber();
					}
				}
			}
			
			function assignString()
			{
				model[event.target.name] = event.target.value;
			}
			
			function assignArray()
			{
				model[event.target.name] = event.target.value.replace(/(^\s+|(,)\s+|\s+$)/g, '$2').split(',');
			}
			
			function assignBoolean()
			{
				model[event.target.name] = event.target.value == true || event.target.value == 'true' ? true : false;
			}
			
			function assignNumber()
			{
				model[event.target.name] = parseFloat(event.target.value);
			}
		}
	}},
	createPropertiesPanelItemFieldWrapper: {value: function(type, name, label, value, changeHandler)
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
			case 'number':
			case 'array':
				field = this.createElement('input');
				field.type = 'text';
				switch(type)
				{
					case 'string':
						field.value = value == 'NaN' ? '' : value;
						break;
					case 'number':
						field.value = isNaN(value) ? '' : value;
						break;
					case 'array':
						field.value = value.join(', ');
						break;
				}
				break;
			case 'boolean':
				field = this.createDropboxElement(barmatz.forms.factories.ModelFactory.createDropboxModel([
					barmatz.forms.factories.ModelFactory.createDropboxItemModel('No', false),
					barmatz.forms.factories.ModelFactory.createDropboxItemModel('Yes', true)
				]), value ? 1 : 0);
				break;
		}
		
		field.name = name;
		field.addEventListener('change', changeHandler);

		return {wrapper: this.createElementWithContent('div', 'forms-item', [this.createElementWithContent('label', '', label), field]), field: field};
	}},
	createDialog: {value: function(title, content, container)
	{
		var dialog;
		
		barmatz.utils.DataTypes.isNotUndefined(title);
		barmatz.utils.DataTypes.isNotUndefined(content);
		barmatz.utils.DataTypes.isTypeOf(title, 'string');
		barmatz.utils.DataTypes.isTypesOrInstances(content, ['string'], [HTMLElement, Array]);
		barmatz.utils.DataTypes.isInstanceOf(container, HTMLElement, true);
		
		dialog = this.createElementWithContent('div', 'forms-dialog', content);
		dialog.title = title;
		(container || this.BODY_ELEMENT).appendChild(dialog);
		jQuery(dialog).dialog({autoOpen: false, draggable: false, modal: true});
		return dialog;
	}},
	destroyDialog: {value: function(dialog)
	{
		jQuery(dialog).dialog('destroy');
		dialog.parentElement.removeChild(dialog);
	}},
	createNewFieldDialogWrapper: {value: function()
	{
		var _this = this, dialog, nameField, labelField, wrapper, form;
		
		form = this.createElement('table');
		nameField = addField('Name');
		labelField = addField('Label');
		wrapper = this.createElementWithContent('div', '', form);
		dialog = this.createDialog('New Field', wrapper);
		
		jQuery(dialog).dialog({
			closeOnEscape: false,
			dialogClass: 'forms-builder-dialog-prompt'
		});
		
		return {wrapper: dialog, nameField: nameField, labelField: labelField};
		
		function addField(label)
		{
			var field;
			
			barmatz.utils.DataTypes.isNotUndefined(label);
			barmatz.utils.DataTypes.isTypeOf(label, 'string');
			
			field = _this.createElement('input');
			field.type = 'text';
			barmatz.utils.CSS.verticalAlignChildren(form.appendChild(_this.createElementWithContent('tr', '', [_this.createElementWithContent('td', '', _this.createElementWithContent('label', '', label)), _this.createElementWithContent('td', '', field)])));
			return field;
		}
	}},
	createConfirmPromptDialog: {value: function(message, confirmHandler, open)
	{
		var _this;
		
		barmatz.utils.DataTypes.isNotUndefined(message);
		barmatz.utils.DataTypes.isNotUndefined(confirmHandler);
		barmatz.utils.DataTypes.isTypeOf(message, 'string');
		barmatz.utils.DataTypes.isTypeOf(confirmHandler, 'function');
		barmatz.utils.DataTypes.isTypeOf(open, 'boolean', true);
		
		_this = this;
		dialog = this.createDialog('Confirm', message);
		
		jQuery(dialog).dialog({
			buttons: {OK: onOKButtonClick, Cancel: onCancelButtonClick}
		});
		
		if(open)
			jQuery(dialog).dialog('open');
		
		return dialog;
		
		function onOKButtonClick(event)
		{
			_this.destroyDialog(dialog);
			confirmHandler(event);
		}
		
		function onCancelButtonClick()
		{
			_this.destroyDialog(dialog);
		}
	}}
});
/** barmatz.forms.factories.ModelFactory **/
window.barmatz.forms.factories.ModelFactory = function(){};

Object.defineProperties(barmatz.forms.factories.ModelFactory,
{
	createFieldModel: {value: function(type, name)
	{
		barmatz.utils.DataTypes.isNotUndefined(type);
		barmatz.utils.DataTypes.isNotUndefined(name);
		barmatz.utils.DataTypes.isTypeOf(type, 'string');
		barmatz.utils.DataTypes.isTypeOf(name, 'string');
		
		switch(type)
		{
			default:
				return new barmatz.forms.fields.FieldModel(type, name);
				break;
			case barmatz.forms.fields.FieldTypes.TEXT:
				return new barmatz.forms.fields.TextFieldModel(name);
				break;
			case barmatz.forms.fields.FieldTypes.PASSWORD:
				return new barmatz.forms.fields.PasswordFieldModel(name);
				break;
			case barmatz.forms.fields.FieldTypes.CHECKBOX:
				return new barmatz.forms.fields.CheckboxFieldModel(name);
				break;
			case barmatz.forms.fields.FieldTypes.RADIO:
				return new barmatz.forms.fields.RadioFieldModel(name);
				break;
			case barmatz.forms.fields.FieldTypes.FILE:
				return new barmatz.forms.fields.FileFieldModel(name);
				break;
			case barmatz.forms.fields.FieldTypes.HIDDEN:
				return new barmatz.forms.fields.HiddenFieldModel(name);
				break;
		}
	}},
	createMenuItemModel: {value: function(label, clickHandler)
	{
		var model;
		
		barmatz.utils.DataTypes.isNotUndefined(label);
		barmatz.utils.DataTypes.isTypeOf(label, 'string');
		barmatz.utils.DataTypes.isTypeOf(clickHandler, 'function', true);

		model = new barmatz.forms.ui.MenuItemModel(label);
		
		if(barmatz.utils.DataTypes.applySilent('isNotUndefined', clickHandler))
			model.clickHandler = clickHandler;
		
		return model;
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
	}},
	createDropboxItemModel: {value: function(label, value)
	{
		barmatz.utils.DataTypes.isNotUndefined(label);
		barmatz.utils.DataTypes.isTypeOf(label, 'string');
		return new barmatz.forms.fields.DropboxItemModel(label, value);
	}},
	createDropboxModel: {value: function(items)
	{
		barmatz.utils.DataTypes.isInstanceOf(items, Array, true);
		return new barmatz.forms.fields.DropboxModel(items);
	}},
	createBuilderModel: {value: function()
	{
		return new barmatz.forms.ui.BuilderModel();
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
