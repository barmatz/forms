/** namespaces **/
window.barmatz = {
	events: {},
	forms: {
		factories: {},
		fields: {},
		ui: {},
		users: {}
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
	}},
	addClass: {value: function(element, className)
	{
		barmatz.utils.DataTypes.isNotUndefined(element);
		barmatz.utils.DataTypes.isNotUndefined(className);
		barmatz.utils.DataTypes.isInstanceOf(element, HTMLElement);
		barmatz.utils.DataTypes.isTypeOf(className, 'string');
		
		if(element.className.indexOf(className) == -1)
			element.className += ' ' + className;
	}},
	removeClass: {value: function(element, className)
	{
		barmatz.utils.DataTypes.isNotUndefined(element);
		barmatz.utils.DataTypes.isNotUndefined(className);
		barmatz.utils.DataTypes.isInstanceOf(element, HTMLElement);
		barmatz.utils.DataTypes.isTypeOf(className, 'string');
		
		element.className = element.className.replace(new RegExp('^' + className + '\\s?|\\s' + className + '[^\\S]?', 'g'), ' ').replace(/\s+/g, ' ').replace(/^\s+|\s+$/, '');
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
	}},
	removeAllChildren: {value: function(element)
	{
		barmatz.utils.DataTypes.isNotUndefined(element);
		barmatz.utils.DataTypes.isInstanceOf(element, HTMLElement);
		while(element.childNodes.length > 0)
			element.removeChild(element.lastChild);
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
				method.call(this, value, collection[i], allowNull);
			}
			catch(error)
			{
				errors++;
			}
		}
		
		if(errors == collection.length)
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
	isInstacnesOf: {value: function(instances, objects, allowNull)
	{
		this._recursiveVlidation(instances, objects, this.isInstanceOf, this.WRONG_INSTANCE, allowNull);
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
/** barmatz.utils.Date **/
window.barmatz.utils.Date = function(){};

Object.defineProperties(barmatz.utils.Date,
{
	toDate: {value: function(string)
	{
		var isoExp, date, month, parts;
		
		barmatz.utils.DataTypes.isNotUndefined(string);
		barmatz.utils.DataTypes.isTypeOf(string, 'string');
		
		isoExp = /^(\d{4})-(\d{2})-(\d{2})\s(\d{2}):(\d{2}):(\d{2})$/;
        date = new Date(NaN);
        parts = isoExp.exec(string);

		if(parts)
		{
			month = +parts[2];
			date.setFullYear(parts[1], month - 1, parts[3]);
			date.setHours(parts[4]);
			date.setMinutes(parts[5]);
			date.setSeconds(parts[6]);
		}
		return date;
	}},
	toString: {value: function(date, format)
	{
		barmatz.utils.DataTypes.isNotUndefined(date);
		barmatz.utils.DataTypes.isNotUndefined(format);
		barmatz.utils.DataTypes.isInstanceOf(date, Date);
		barmatz.utils.DataTypes.isTypeOf(format, 'string');
		
		return format.replace(/d{2}/, leadingZero(date.getDate())).
			   replace(/d{1}/, date.getDate()).
			   replace(/n{1}/, date.getDay() + 1).
			   replace(/m{3}/, leadingDoubleZero(date.getMilliseconds())).
			   replace(/m{2}/, leadingZero(date.getMonth() + 1)).
			   replace(/m{1}/, date.getMonth() + 1).
			   replace(/y{4}/, date.getFullYear()).
			   replace(/y{2}/, date.getFullYear().toString().substring(2, 4)).
			   replace(/h{2}/, leadingZero(date.getHours())).
			   replace(/h{1}/, date.getHours()).
			   replace(/H{1}/, (date.getHours() % 12)).
			   replace(/i{2}/, leadingZero(date.getMinutes())).
			   replace(/i{1}/, date.getMinutes()).
			   replace(/s{2}/, leadingZero(date.getSeconds())).
			   replace(/s{1}/, date.getSeconds()).
			   replace(/D{1}/, this.getDayName(date)).
			   replace(/M{1}/, this.getMonthName(date)).
			   replace(/A{1}/, date.getHours() < 13 ? 'am' : 'pm');
			   
		function leadingZero(number)
		{
			return (number < 10 ? '0': '') + number.toString();
		}
		
		function leadingDoubleZero(number)
		{
			return (number < 100 ? '00': '') + number.toString();
		}
	}},
	getDayName: {value: function(date)
	{
		barmatz.utils.DataTypes.isNotUndefined(date);
		barmatz.utils.DataTypes.isInstanceOf(date, Date);
		return  ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'][date.getDay()];
	}},
	getMonthName: {value: function(date)
	{
		barmatz.utils.DataTypes.isNotUndefined(date);
		barmatz.utils.DataTypes.isInstanceOf(date, Date);
		return  ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'][date.getMonth()];
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
		case barmatz.events.BuilderEvent.FORM_ITEM_ADDED:
		case barmatz.events.BuilderEvent.FORM_ITEM_REMOVED:
		case barmatz.events.BuilderEvent.MENU_ITEM_ADDED:
		case barmatz.events.BuilderEvent.MENU_ITEM_REMOVED:
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
	FORM_ITEM_ADDED: {value: 'formItemAdded'},
	FORM_ITEM_REMOVED: {value: 'formItemRemoved'},
	MENU_ITEM_ADDED: {value: 'menuItemAdded'},
	MENU_ITEM_REMOVED: {value: 'menuItemRemoved'},
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
			case barmatz.events.BuilderEvent.FORM_ITEM_ADDED:
			case barmatz.events.BuilderEvent.FORM_ITEM_REMOVE:
			case barmatz.events.BuilderEvent.MENU_ITEM_ADDED:
			case barmatz.events.BuilderEvent.MENU_ITEM_REMOVE:
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
			case barmatz.events.BuilderEvent.FORM_ITEM_ADDED:
			case barmatz.events.BuilderEvent.FORM_ITEM_REMOVE:
			case barmatz.events.BuilderEvent.MENU_ITEM_ADDED:
			case barmatz.events.BuilderEvent.MENU_ITEM_REMOVE:
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
		switch(type)
		{
			case barmatz.events.CollectionEvent.ITEM_ADDED:
			case barmatz.events.CollectionEvent.ITEM_REMOVED:
				event._field = this.field;
				event._index = this.index;
				break;
		}
		return event;
	}},
	toString: {value: function()
	{
		switch(type)
		{
			default:
				return this.formatToString('CollectionEvent', 'type');
				break;
			case barmatz.events.CollectionEvent.ITEM_ADDED:
			case barmatz.events.CollectionEvent.ITEM_REMOVED:
				return this.formatToString('CollectionEvent', 'type', 'item', 'index');
				break;
		}
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

/** barmatz.events.FormModelEvent **/
window.barmatz.events.FormModelEvent = function(type)
{
	barmatz.utils.DataTypes.isNotUndefined(type);
	barmatz.utils.DataTypes.isTypeOf(type, 'string');
	barmatz.events.Event.call(this, type);
};

barmatz.events.FormModelEvent.prototype = new barmatz.events.Event(null);
barmatz.events.FormModelEvent.prototype.constructor = barmatz.events.FormModelEvent;

Object.defineProperties(barmatz.events.FormModelEvent,
{
	SAVING: {value: 'saving'},
	SAVED: {value: 'saved'},
	ERROR_SAVING: {value: 'errorSaving'},
	LOADING_FORM: {value: 'loadingForm'},
	LOADING_FORM_COMPLETE: {value: 'loadingFormComplete'},
	LOADING_FORM_ERROR: {value: 'loadingFormError'},
	DELETING: {value: 'deleting'},
	DELETED: {value: 'deleted'},
	DELETION_FAIL: {value: 'deletionFail'}
}); 
Object.defineProperties(barmatz.events.FormModelEvent.prototype, 
{
	clone: {value: function()
	{
		var event = new FormModelEvent(type);
		event._target = this.target;
		return event;
	}},
	toString: {value: function()
	{
		switch(this.type)
		{
			default:
				return this.formatToString('FormModelEvent', 'type');
				break;
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
/** barmatz.events.UserModelEvent **/
window.barmatz.events.UserModelEvent = function(type)
{
	barmatz.utils.DataTypes.isNotUndefined(type);
	barmatz.utils.DataTypes.isTypeOf(type, 'string');
	barmatz.events.Event.call(this, type);
	
	this._forms = null;
	
	switch(type)
	{
		case barmatz.events.UserModelEvent.GET_FORMS_SUCCESS:
			this._forms = arguments[1];
			break;
	}
};

barmatz.events.UserModelEvent.prototype = new barmatz.events.Event(null);
barmatz.events.UserModelEvent.prototype.constructor = barmatz.events.UserModelEvent;

Object.defineProperties(barmatz.events.UserModelEvent,
{
	LOGIN_SUCCESS: {value: 'loginSuccess'},
	LOGIN_FAIL: {value: 'loginFail'},
	DATA_LOAD_SUCCESS: {value: 'dataLoadSuccess'},
	DATA_LOAD_FAIL: {value: 'dataLoadFail'},
	GET_FORMS_SUCCESS: {value: 'getFormsSuccess'},
	GET_FORMS_FAIL: {value: 'getFormsFail'}
});
Object.defineProperties(barmatz.events.UserModelEvent.prototype,
{
	forms: {get: function()
	{
		return this._forms;
	}},
	clone: {value: function()
	{
		var event = new barmatz.events.UserModelEvent(this.type);
		event._target = this.target;
		
		switch(type)
		{
			case barmatz.events.UserModelEvent.GET_FORMS_SUCCESS:
				event._forms = this.forms;
				break;
		}
		
		return event;
	}},
	toString: {value: function()
	{
		switch(type)
		{
			default:
				return this.formatToString('UserModelEvent', 'type');
				break;
			case barmatz.events.UserModelEvent.GET_FORMS_SUCCESS:
				return this.formatToString('UserModelEvent', 'type', 'forms');
				break;
		}
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
		
		if(view.childNodes[event.index])
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
		var items = this.get('items');
		return items ? items.length : 0;
	}},
	addItem: {value: function(item)
	{
		barmatz.utils.DataTypes.isNotUndefined(item);
		barmatz.utils.DataTypes.isInstanceOf(item, barmatz.mvc.Model);
		this.addItemAt(item, this.get('items').length);
	}},
	addItemAt: {value: function(item, index)
	{
		barmatz.utils.DataTypes.isNotUndefined(item);
		barmatz.utils.DataTypes.isNotUndefined(index);
		barmatz.utils.DataTypes.isInstanceOf(item, barmatz.mvc.Model);
		barmatz.utils.DataTypes.isTypeOf(index, 'number');
		this.get('items').splice(index, 0, item);
		this.dispatchEvent(new barmatz.events.CollectionEvent(barmatz.events.CollectionEvent.ITEM_ADDED, item, index));
	}},
	removeItem: {value: function(item)
	{
		barmatz.utils.DataTypes.isNotUndefined(item);
		barmatz.utils.DataTypes.isInstanceOf(item, barmatz.mvc.Model);
		this.removeItemAt(this.getItemIndex(item));
	}},
	removeItemAt: {value: function(index)
	{
		barmatz.utils.DataTypes.isNotUndefined(index);
		barmatz.utils.DataTypes.isTypeOf(index, 'number');
		this.dispatchEvent(new barmatz.events.CollectionEvent(barmatz.events.CollectionEvent.ITEM_REMOVED, this.get('items').splice(index, 1)[0], index));
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
	}},
	find: {value: function(filter)
	{
		
		barmatz.utils.DataTypes.isNotUndefined(filter);
		barmatz.utils.DataTypes.isTypeOf(filter, 'function');
		return this.get('items').filter(filter);
	}},
	toString: {value: function()
	{
		var values = [];
		
		this.forEach(function(item, index, collection)
		{
			values.push(item.toString());
		});
		
		return values.join(', ');
	}},
	toArray: {value: function()
	{
		return this.get('items').slice(0);
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
	barmatz.forms.fields.FieldModel.call(this, barmatz.forms.fields.FieldTypes.TEXT_FIELD, name);
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
	}},
	toString: {value: function()
	{
		return this.label + '=' + this.value;
	}}
});
/** barmatz.forms.fields.DropboxModel **/
window.barmatz.forms.fields.DropboxModel = function(name, items)
{
	barmatz.utils.DataTypes.isNotUndefined(name);
	barmatz.utils.DataTypes.isTypeOf(name, 'string', true);
	barmatz.utils.DataTypes.isInstanceOf(items, Array, true);
	barmatz.forms.fields.FieldModel.call(this, barmatz.forms.fields.FieldTypes.DROPBOX, name);
	
	this.set('items', new barmatz.forms.CollectionModel());
	
	if(items)
		while(items.length > this.numItems)
			this.addItem(items[this.numItems]);
};

barmatz.forms.fields.DropboxModel.prototype = new barmatz.forms.fields.FieldModel(null, null);
barmatz.forms.fields.DropboxModel.prototype.constructor = barmatz.forms.fields.DropboxModel;

Object.defineProperties(barmatz.forms.fields.DropboxModel.prototype,
{
	numItems: {get: function()
	{
		return this.get('items').numItems;
	}},
	addItem: {value: function(item)
	{
		barmatz.utils.DataTypes.isNotUndefined(item);
		barmatz.utils.DataTypes.isInstanceOf(item, barmatz.forms.fields.DropboxItemModel);
		return this.get('items').addItem(item);
	}},
	addItemAt: {value: function(item, index)
	{
		barmatz.utils.DataTypes.isNotUndefined(item);
		barmatz.utils.DataTypes.isNotUndefined(index);
		barmatz.utils.DataTypes.isInstanceOf(item, barmatz.forms.fields.DropboxItemModel);
		barmatz.utils.DataTypes.isTypeOf(index, 'number');
		return this.get('items').addItemAt(item, index);
	}},
	removeItem: {value: function(item)
	{
		barmatz.utils.DataTypes.isNotUndefined(item);
		barmatz.utils.DataTypes.isInstanceOf(item, barmatz.forms.fields.DropboxItemModel);
		return this.get('items').removeItem(item);
	}},
	removeItemAt: {value: function(index)
	{
		barmatz.utils.DataTypes.isNotUndefined(index);
		barmatz.utils.DataTypes.isTypeOf(index, 'number');
		return this.get('items').removeItemAt(index);
	}},
	getItemAt: {value: function(index)
	{
		barmatz.utils.DataTypes.isNotUndefined(index);
		barmatz.utils.DataTypes.isTypeOf(index, 'number');
		return this.get('items').getItemAt(index);
	}},
	getItemIndex: {value: function(item)
	{
		barmatz.utils.DataTypes.isNotUndefined(item);
		barmatz.utils.DataTypes.isInstanceOf(item, barmatz.forms.fields.DropboxItemModel);
		return this.get('items').getItemIndex(item);
	}},
	setItemIndex: {value: function(item, index)
	{
		barmatz.utils.DataTypes.isNotUndefined(item);
		barmatz.utils.DataTypes.isNotUndefined(index);
		barmatz.utils.DataTypes.isInstanceOf(item, barmatz.forms.fields.DropboxItemModel);
		barmatz.utils.DataTypes.isTypeOf(index, 'number');
		return this.get('items').setItemIndex(item, index);
	}},
	forEach: {value: function(handler)
	{
		barmatz.utils.DataTypes.isNotUndefined(handler);
		barmatz.utils.DataTypes.isTypeOf(handler, 'function');
		return this.get('items').forEach(handler);
	}},
	find: {value: function(filter)
	{
		return this.get('items').find(filter);
	}},
	clone: {value: function()
	{
		var clone = new barmatz.forms.fields.DropboxModel(this.name, this.get('items').toArray());
		clone.label = this.label;
		clone.mandatory = this.mandatory;
		clone.default = this.default;
		clone.value = this.value;
		clone.enabled = this.enabled;
		return clone;
	}},
	toString: {value: function()
	{
		return this.get('items').toString();
	}}
});
/** barmatz.forms.fields.FieldTypes **/
window.barmatz.forms.fields.FieldTypes = function(){};

Object.defineProperties(barmatz.forms.fields.FieldTypes,
{
	TEXT_AREA: {value: 'textArea'},
	TEXT_FIELD: {value: 'textField'},
	DROPBOX: {value: 'dropbox'},
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
/** barmatz.forms.fields.TextAreaFieldModel **/
window.barmatz.forms.fields.TextAreaFieldModel = function(name)
{
	barmatz.utils.DataTypes.isNotUndefined(name);
	barmatz.utils.DataTypes.isTypeOf(name, 'string', true);
	barmatz.forms.fields.FieldModel.call(this, barmatz.forms.fields.FieldTypes.TEXT_AREA, name);
};

barmatz.forms.fields.TextAreaFieldModel.prototype = new barmatz.forms.fields.FieldModel(null, null);
barmatz.forms.fields.TextAreaFieldModel.prototype.constructor = barmatz.forms.fields.TextAreaFieldModel;

Object.defineProperties(barmatz.forms.fields.TextAreaFieldModel.prototype, {});
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
/** barmatz.forms.ui.Builder **/
window.barmatz.forms.ui.Builder = function()
{
	var userModel, formModel, formRenameField, menuModel, menuViewWrapper, toolboxModel, toolboxView, workspaceViewWrapper, propertiesView, propertiesController;
	
	initUserModel();
	initForm();
	initMenu();
	initToolbox();
	initWorkspace();
	initProperties();
	initController();
	
	function initController()
	{
		barmatz.forms.factories.ControllerFactory.createBuilderController(
			formModel, userModel, barmatz.forms.factories.DOMFactory.BODY_ELEMENT, 
			barmatz.forms.factories.DOMFactory.createPanels([
				barmatz.forms.factories.ModelFactory.createPanelModel('forms-toolbox-panel', toolboxView),
				barmatz.forms.factories.ModelFactory.createPanelModel('forms-workspace-panel', workspaceViewWrapper.wrapper),
				barmatz.forms.factories.ModelFactory.createPanelModel('forms-properties-panel', propertiesView)
			]),
			workspaceViewWrapper.formName, workspaceViewWrapper.saveStatus, menuModel, menuViewWrapper.wrapper, toolboxModel, toolboxView, workspaceViewWrapper.workspace, propertiesController
		);
	}
	
	function initUserModel()
	{
		userModel = barmatz.forms.factories.ModelFactory.createUserModel();
		userModel.getData();
	}
	
	function initForm()
	{
		formModel = barmatz.forms.factories.ModelFactory.createFormModel();
		formModel.name = 'Unnamed form';
	}
	
	function initMenu()
	{
		menuModel = barmatz.forms.factories.ModelFactory.createMenuModel();
		menuViewWrapper = barmatz.forms.factories.DOMFactory.createMenuWrapper(); 
		barmatz.forms.factories.ControllerFactory.createMenuController(menuModel, menuViewWrapper.icon, menuViewWrapper.menu);
	}
	
	function initToolbox()
	{
		toolboxModel = barmatz.forms.factories.ModelFactory.createToolboxModel();
		toolboxView = barmatz.forms.factories.DOMFactory.createToolbox();
		barmatz.forms.factories.ControllerFactory.createToolboxController(toolboxModel, toolboxView);
	}
	
	function initWorkspace()
	{
		workspaceViewWrapper = barmatz.forms.factories.DOMFactory.createWorkspaceWrapper('', '');
		barmatz.forms.factories.ControllerFactory.createWorkspaceController(formModel, workspaceViewWrapper.workspace);
	}
	
	function initProperties()
	{
		propertiesView = barmatz.forms.factories.DOMFactory.createProperties();
		propertiesController = barmatz.forms.factories.ControllerFactory.createPropertiesController(propertiesView);
	}
};
/** barmatz.forms.ui.BuilderController **/
window.barmatz.forms.ui.BuilderController = function(formModel, userModel, containerView, panelsView, formNameView, saveStatusView, menuModel, menuView, toolboxModel, toolboxView, workspaceView, propertiesController)
{
	var loadingDialog;
	
	barmatz.utils.DataTypes.isNotUndefined(formModel);
	barmatz.utils.DataTypes.isNotUndefined(userModel);
	barmatz.utils.DataTypes.isNotUndefined(containerView);
	barmatz.utils.DataTypes.isNotUndefined(panelsView);
	barmatz.utils.DataTypes.isNotUndefined(formNameView);
	barmatz.utils.DataTypes.isNotUndefined(saveStatusView);
	barmatz.utils.DataTypes.isNotUndefined(menuModel);
	barmatz.utils.DataTypes.isNotUndefined(menuView);
	barmatz.utils.DataTypes.isNotUndefined(toolboxModel);
	barmatz.utils.DataTypes.isNotUndefined(toolboxView);
	barmatz.utils.DataTypes.isNotUndefined(workspaceView);
	barmatz.utils.DataTypes.isNotUndefined(propertiesController);
	barmatz.utils.DataTypes.isInstanceOf(formModel, barmatz.forms.FormModel);
	barmatz.utils.DataTypes.isInstanceOf(userModel, barmatz.forms.users.UserModel);
	barmatz.utils.DataTypes.isInstanceOf(containerView, HTMLElement);
	barmatz.utils.DataTypes.isInstanceOf(panelsView, HTMLElement);
	barmatz.utils.DataTypes.isInstanceOf(formNameView, HTMLElement);
	barmatz.utils.DataTypes.isInstanceOf(saveStatusView, HTMLElement);
	barmatz.utils.DataTypes.isInstanceOf(menuModel, barmatz.forms.ui.MenuModel);
	barmatz.utils.DataTypes.isInstanceOf(menuView, HTMLElement);
	barmatz.utils.DataTypes.isInstanceOf(toolboxModel, barmatz.forms.ui.ToolboxModel);
	barmatz.utils.DataTypes.isInstanceOf(toolboxView, HTMLElement);
	barmatz.utils.DataTypes.isInstanceOf(workspaceView, HTMLElement);
	barmatz.utils.DataTypes.isInstanceOf(propertiesController, barmatz.forms.ui.PropertiesController);
	barmatz.mvc.Controller.call(this);
	
	initForm();
	initMenu();
	initPanels();
	initToolbox();
	
	function initForm()
	{
		formModel.addEventListener(barmatz.events.ModelEvent.VALUE_CHANGED, onFormModelValueChanged);
		formModel.addEventListener(barmatz.events.CollectionEvent.ITEM_ADDED, onFormModelItemAdded);
		formModel.addEventListener(barmatz.events.CollectionEvent.ITEM_REMOVED, onFormModelItemRemoved);
		formModel.addEventListener(barmatz.events.FormModelEvent.SAVING, onFormModelSaving);
		formModel.addEventListener(barmatz.events.FormModelEvent.SAVED, onFormModelSaved);
		formModel.addEventListener(barmatz.events.FormModelEvent.ERROR_SAVING, onFormModelErrorSaving);
		updateFormName();
	}
	
	function initMenu()
	{
		menuModel.addEventListener(barmatz.events.CollectionEvent.ITEM_ADDED, onMenuModelItemAdded);
		menuModel.addEventListener(barmatz.events.CollectionEvent.ITEM_REMOVED, onMenuModelItemRemoved);
		addMenuItem('New', onMenuNewClick);
		addMenuItem('Save', onMenuSaveClick);
		addMenuItem('Save as', onMenuSaveAsClick);
		addMenuItem('Load', onMenuLoadClick);
		addMenuItem('Rename', onMenuRenameClick);
		addMenuItem('Export', onMenuExportClick);
		addMenuItem('Delete', onMenuDeleteClick);
		addMenuItem('Properties', onMenuPropertiesClick);
		containerView.appendChild(menuView);
	}
	
	function initPanels()
	{
		containerView.appendChild(panelsView);
	}
	
	function initToolbox()
	{
		toolboxModel.addEventListener(barmatz.events.CollectionEvent.ITEM_ADDED, onToolboxModelItemAdded);
		toolboxModel.addEventListener(barmatz.events.CollectionEvent.ITEM_REMOVED, onToolboxModelItemRemoved);
		addToolboxItem(barmatz.forms.fields.FieldTypes.TEXT_FIELD, 'Text field');
		addToolboxItem(barmatz.forms.fields.FieldTypes.TEXT_AREA, 'Text area');
		addToolboxItem(barmatz.forms.fields.FieldTypes.PASSWORD, 'Password field');
		addToolboxItem(barmatz.forms.fields.FieldTypes.CHECKBOX, 'Checkbox field');
		addToolboxItem(barmatz.forms.fields.FieldTypes.RADIO, 'Radio field');
		addToolboxItem(barmatz.forms.fields.FieldTypes.DROPBOX, 'Dropbox field');
	}
	
	function addMenuItem(label, clickHandler)
	{
		barmatz.utils.DataTypes.isNotUndefined(label);
		barmatz.utils.DataTypes.isNotUndefined(clickHandler);
		barmatz.utils.DataTypes.isTypeOf(label, 'string');
		barmatz.utils.DataTypes.isTypeOf(clickHandler, 'function');
		menuModel.addItem(barmatz.forms.factories.ModelFactory.createMenuItemModel(label, clickHandler));
	}
	
	function addToolboxItem(type, label)
	{
		barmatz.utils.DataTypes.isNotUndefined(type);
		barmatz.utils.DataTypes.isNotUndefined(label);
		barmatz.utils.DataTypes.isTypeOf(type, 'string');
		barmatz.utils.DataTypes.isTypeOf(label, 'string');
		toolboxModel.addItem(barmatz.forms.factories.ModelFactory.createToolboxItemModel(type, label, barmatz.forms.factories.ModelFactory.createFieldModel(type, '')));
		toolboxView.childNodes[toolboxModel.numItems - 1].addEventListener('click', onToolboxItemViewClick);
	}
	
	function updateFormName()
	{
		formNameView.innerHTML = formModel.name;
		updateDocumentTitle();
	}
	
	function updateDocumentTitle()
	{
		var title, separator, index;
		title = document.title;
		seperator = ' -';
		index = title.indexOf(seperator);
		document.title = (title.indexOf(seperator) > -1 ? title.substring(0, title.indexOf(seperator)) : title) + seperator + ' ' + formModel.name; 
	}
	
	function addLoadingView()
	{
		loadingDialog = barmatz.forms.factories.DOMFactory.createLoadingDialog();
	}
	
	function removeLoadingView()
	{
		barmatz.forms.factories.DOMFactory.destroyLoadingDialog(loadingDialog);
		loadingDialog = null;
	}
	
	function removeLoadingViewWithMessage(title, message)
	{
		barmatz.utils.DataTypes.isNotUndefined(title);
		barmatz.utils.DataTypes.isNotUndefined(message);
		barmatz.utils.DataTypes.isTypeOf(title, 'string');
		barmatz.utils.DataTypes.isTypeOf(message, 'string');
		removeLoadingView();
		barmatz.forms.factories.DOMFactory.createAlertPromptDialog(title, message, true);
	}
	
	function addFromModelDeleteEventListeners()
	{
		formModel.addEventListener(barmatz.events.FormModelEvent.DELETING, onFormModelDeleting);
		formModel.addEventListener(barmatz.events.FormModelEvent.DELETED, onFormModelDeleted);
		formModel.addEventListener(barmatz.events.FormModelEvent.DELETION_FAIL, onFormModelDeletionFail);
	}
	
	function removeFromModelDeleteEventListeners()
	{
		formModel.removeEventListener(barmatz.events.FormModelEvent.DELETING, onFormModelDeleting);
		formModel.removeEventListener(barmatz.events.FormModelEvent.DELETED, onFormModelDeleted);
		formModel.removeEventListener(barmatz.events.FormModelEvent.DELETION_FAIL, onFormModelDeletionFail);
	}
	
	function onMenuModelItemAdded(event)
	{
		barmatz.utils.DataTypes.isNotUndefined(event);
		barmatz.utils.DataTypes.isInstanceOf(event, barmatz.events.CollectionEvent);
	}
	
	function onMenuModelItemRemoved(event)
	{
		barmatz.utils.DataTypes.isNotUndefined(event);
		barmatz.utils.DataTypes.isInstanceOf(event, barmatz.events.CollectionEvent);
	}
	
	function onToolboxModelItemAdded(event)
	{
		barmatz.utils.DataTypes.isNotUndefined(event);
		barmatz.utils.DataTypes.isInstanceOf(event, barmatz.events.CollectionEvent);
	}

	function onToolboxModelItemRemoved(event)
	{
		barmatz.utils.DataTypes.isNotUndefined(event);
		barmatz.utils.DataTypes.isInstanceOf(event, barmatz.events.CollectionEvent);
	}
	
	function onFormModelValueChanged(event)
	{
		barmatz.utils.DataTypes.isNotUndefined(event);
		barmatz.utils.DataTypes.isInstanceOf(event, barmatz.events.ModelEvent);
		
		switch(event.key)
		{
			case 'name':
				updateFormName();
				break;
			case 'id':
				saveStatusView.innerHTML = '';
				break;
		}
	}
	
	function onFormModelItemAdded(event)
	{
		barmatz.utils.DataTypes.isNotUndefined(event);
		barmatz.utils.DataTypes.isInstanceOf(event, barmatz.events.CollectionEvent);
		propertiesController.model = event.item;
		workspaceView.childNodes[event.index].addEventListener('click', onWorkspaceViewItemClick);
	}
	
	function onFormModelItemRemoved(event)
	{
		barmatz.utils.DataTypes.isNotUndefined(event);
		barmatz.utils.DataTypes.isInstanceOf(event, barmatz.events.CollectionEvent);
		propertiesController.model = formModel.numItems > 0 ? formModel.getItemAt(event.index - 1) : null;
	}
	
	function onFormModelSaving(event)
	{
		barmatz.utils.DataTypes.isNotUndefined(event);
		barmatz.utils.DataTypes.isInstanceOf(event, barmatz.events.FormModelEvent);
		addLoadingView();
		saveStatusView.innerHTML = 'saving...';
	}
	
	function onFormModelSaved(event)
	{
		barmatz.utils.DataTypes.isNotUndefined(event);
		barmatz.utils.DataTypes.isInstanceOf(event, barmatz.events.FormModelEvent);
		removeLoadingViewWithMessage('Success', 'Form saved successfully');
		saveStatusView.innerHTML = 'last saved at ' + barmatz.utils.Date.toString(new Date(), 'hh:ii dd/mm/yy');
	}
	
	function onFormModelErrorSaving(event)
	{
		barmatz.utils.DataTypes.isNotUndefined(event);
		barmatz.utils.DataTypes.isInstanceOf(event, barmatz.events.FormModelEvent);
		removeLoadingViewWithMessage('Error', 'Error saving form');
		saveStatusView.innerHTML = 'error saving!';
	}
	
	function onToolboxItemViewClick(event)
	{
		barmatz.utils.DataTypes.isNotUndefined(event);
		barmatz.utils.DataTypes.isInstanceOf(event, MouseEvent);
		formModel.addItem(toolboxModel.getItemAt(Array.prototype.slice.call(toolboxView.childNodes).indexOf(event.target)).fieldModel.clone());
	}
	
	function onWorkspaceViewItemClick(event)
	{
		barmatz.utils.DataTypes.isNotUndefined(event);
		barmatz.utils.DataTypes.isInstanceOf(event, MouseEvent);
		propertiesController.model = formModel.getItemAt(Array.prototype.slice.call(workspaceView.childNodes).indexOf(event.currentTarget));
	}
	
	function onFormModelDeleting(event) 
	{
		barmatz.utils.DataTypes.isNotUndefined(event);
		barmatz.utils.DataTypes.isInstanceOf(event, barmatz.events.FormModelEvent);
		addLoadingView();
	}
	
	function onFormModelDeleted(event) 
	{
		barmatz.utils.DataTypes.isNotUndefined(event);
		barmatz.utils.DataTypes.isInstanceOf(event, barmatz.events.FormModelEvent);
		removeLoadingViewWithMessage('Success', 'Form deleted.');
		removeFromModelDeleteEventListeners();
		formModel.reset();
	}
	
	function onFormModelDeletionFail(event) 
	{
		barmatz.utils.DataTypes.isNotUndefined(event);
		barmatz.utils.DataTypes.isInstanceOf(event, barmatz.events.FormModelEvent);
		removeLoadingViewWithMessage('Error', 'Error deleting form. Try again.');
		removeFromModelDeleteEventListeners();
	}
	
	function onMenuNewClick(event)
	{
		formRenameField = barmatz.forms.factories.DOMFactory.createChangePropertyPromptDialog('New form', 'Name', formModel.name, onResetFromConfirm, true).field;
	}
	
	function onMenuSaveClick(event)
	{
		formModel.save(userModel);
	}
	
	function onMenuSaveAsClick(event)
	{
		formRenameField = barmatz.forms.factories.DOMFactory.createChangePropertyPromptDialog('Save as', 'Form name', formModel.name, onSaveFromAsConfirm, true).field;
	}
	
	function onMenuLoadClick(event)
	{
		var dialog = barmatz.forms.factories.DOMFactory.createUserFormsListDialog();
		barmatz.forms.factories.ControllerFactory.createUserFormsListController(formModel, userModel, dialog.getElementsByTagName('tbody')[0], dialog);
	}
	
	function onMenuRenameClick(event)
	{
		formRenameField = barmatz.forms.factories.DOMFactory.createChangePropertyPromptDialog('Rename form', 'Name', formModel.name, onRenameFromConfirm, true).field;
	}
	
	function onMenuExportClick(event)
	{
		if(barmatz.utils.DataTypes.applySilent('isValid', formModel.id))
			formModel.getFingerprint(function(fingerprint)
			{
				barmatz.forms.factories.DOMFactory.createExportPromptDialog(fingerprint, true);
			});
		else
			barmatz.forms.factories.DOMFactory.createAlertPromptDialog('Failed to export', 'You must save the form before exporting!', true);
	}
	
	function onMenuDeleteClick(event)
	{
		addFromModelDeleteEventListeners();
		formModel.delete();
	}
	
	function onMenuPropertiesClick(event)
	{
		debugger;
	}
	
	function onSaveFromAsConfirm(event)
	{
		formModel.saveAs(userModel, formRenameField.value);
	}
	
	function onRenameFromConfirm(event)
	{
		formModel.name = formRenameField.value;
	}
	
	function onResetFromConfirm(event)
	{
		formModel.reset();
		formModel.name = formRenameField.value;
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
	this.set('formModel', barmatz.forms.factories.ModelFactory.createFormModel());
	this.set('menuModel', barmatz.forms.factories.ModelFactory.createMenuModel());
	this.set('menuViewWrapper', barmatz.forms.factories.DOMFactory.createMenuWrapper());
	this.set('toolboxModel', barmatz.forms.factories.ModelFactory.createToolboxModel());
	this.set('toolboxView', barmatz.forms.factories.DOMFactory.createBuilderToolbox());
	this.set('workspaceViewWrapper', barmatz.forms.factories.DOMFactory.createBuilderWorkspaceWrapper());
	this.set('propertiesView', barmatz.forms.factories.DOMFactory.createBuilderProperties());
	this.set('propertiesController', barmatz.forms.factories.ControllerFactory.createpropertiesController(this.propertiesView));
	
	barmatz.forms.factories.ControllerFactory.createMenuController(this.get('menuModel'), this.get('menuViewWrapper').menu, this.get('menuViewWrapper').icon);
	barmatz.forms.factories.ControllerFactory.createToolboxController(this.get('toolboxModel'), this.toolboxView);
	barmatz.forms.factories.ControllerFactory.createWorkspaceController(this.get('formModel'), this.get('workspaceViewWrapper').workspace);
	
	this.get('formModel').addEventListener(barmatz.events.ModelEvent.VALUE_CHANGED, onFormModelValueChanged);
	this.get('formModel').addEventListener(barmatz.events.CollectionEvent.ITEM_ADDED, onModelItemAddedOrRemoved);
	this.get('formModel').addEventListener(barmatz.events.CollectionEvent.ITEM_REMOVED, onModelItemAddedOrRemoved);
	this.get('menuModel').addEventListener(barmatz.events.CollectionEvent.ITEM_ADDED, onModelItemAddedOrRemoved);
	this.get('menuModel').addEventListener(barmatz.events.CollectionEvent.ITEM_REMOVED, onModelItemAddedOrRemoved);
	this.get('toolboxModel').addEventListener(barmatz.events.CollectionEvent.ITEM_ADDED, onModelItemAddedOrRemoved);
	this.get('toolboxModel').addEventListener(barmatz.events.CollectionEvent.ITEM_REMOVED, onModelItemAddedOrRemoved);
	
	function onFormModelValueChanged(event)
	{
		switch(event.key)
		{
			case 'name':
				_this.get('workspaceViewWrapper').formName.innerHTML = event.value;
				break;
		}
	}
	
	function onModelItemAddedOrRemoved(event)
	{
		var type;
		
		barmatz.utils.DataTypes.isNotUndefined(event);
		barmatz.utils.DataTypes.isInstanceOf(event, barmatz.events.CollectionEvent);
		
		switch(event.target)
		{
			default:
				throw new Error('unknown target');
				break;
			case _this.get('formModel'):
				applyActionToAddedOrRemovedModelItemFromEvent(event, function()
				{
					debugger;
					type = barmatz.events.BuilderEvent.FORM_ITEM_ADDED;
					_this.propertiesControllerModel = event.item;
				}, function()
				{
					type = barmatz.events.BuilderEvent.FORM_ITEM_REMOVED;
					_this.propertiesControllerModel = _this.numWorkspaceModelItems > 0 ? _this.getFormModelItemAt(event.index < _this.numWorkspaceModelItems ? event.index : event.index - 1) : null;
				});
			break;
			case _this.get('menuModel'):
				applyActionToAddedOrRemovedModelItemFromEvent(event, function()
				{
					type = barmatz.events.BuilderEvent.MENU_ITEM_ADDED;
				}, function()
				{
					type = barmatz.events.BuilderEvent.MENU_ITEM_REMOVED;
				});
			break;
			case _this.get('toolboxModel'):
				applyActionToAddedOrRemovedModelItemFromEvent(event, function()
				{
					type = barmatz.events.BuilderEvent.TOOLBOX_ITEM_ADDED;
				}, function()
				{
					type = barmatz.events.BuilderEvent.TOOLBOX_ITEM_REMOVED;
				});
		}
		
		_this.dispatchEvent(new barmatz.events.BuilderEvent(type, event.item, event.index));
	}
	
	function applyActionToAddedOrRemovedModelItemFromEvent(event, addedAction, removedAction)
	{
		switch(event.type)
		{
			default:
				throw new Error('unknown event type');
				break;
			case barmatz.events.CollectionEvent.ITEM_ADDED:
				addedAction();
				break;
			case barmatz.events.CollectionEvent.ITEM_REMOVED:
				removedAction();
				break;
		}
	}
};

barmatz.forms.ui.BuilderModel.prototype = new barmatz.mvc.Model();
barmatz.forms.ui.BuilderModel.prototype.constructor = barmatz.forms.ui.BuilderModel;

Object.defineProperties(barmatz.forms.ui.BuilderModel.prototype, 
{
	formName: {get: function()
	{
		return this.get('formModel').name;
	}, set: function(value)
	{
		barmatz.utils.DataTypes.isTypeOf(value, 'string');
		this.get('formModel').name = value;
	}},
	menuView: {get: function()
	{
		return this.get('menuViewWrapper').wrapper; 
	}},
	toolboxView: {get: function()
	{
		return this.get('toolboxView'); 
	}},
	workspaceView: {get: function()
	{
		return this.get('workspaceViewWrapper').wrapper; 
	}},
	propertiesView: {get: function()
	{
		return this.get('propertiesView'); 
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
	propertiesControllerModel: {get: function()
	{
		return this.get('propertiesControllerModel');
	}, set: function(value)
	{
		barmatz.utils.DataTypes.isInstanceOf(value, barmatz.forms.fields.FieldModel, true);
		this.set('propertiesControllerModel', value);
		this.get('propertiesController').model = value;
	}},
	addMenuItem: {value: function(label, clickHandler)
	{
		barmatz.utils.DataTypes.isNotUndefined(label);
		barmatz.utils.DataTypes.isNotUndefined(clickHandler);
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
		this.get('toolboxModel').addItem(barmatz.forms.factories.ModelFactory.createToolboxItemModel(type, label, barmatz.forms.factories.ModelFactory.createFieldModel(type, '')));
	}},
	addToolboxItemToForm: {value: function(item)
	{
		barmatz.utils.DataTypes.isNotUndefined(item);
		barmatz.utils.DataTypes.isInstanceOf(item, HTMLElement);
		this.addFormItem(this.getFieldModelFromToolboxModelAt(this.getIndexOfView(item)).clone());
	}},
	addFormItem: {value: function(item)
	{
		barmatz.utils.DataTypes.isNotUndefined(item);
		barmatz.utils.DataTypes.isInstanceOf(item, barmatz.forms.fields.FieldModel);
		this.get('formModel').addItem(item);
	}},
	getFormModelItemAt: {value: function(index)
	{
		barmatz.utils.DataTypes.isNotUndefined(index);
		barmatz.utils.DataTypes.isTypeOf(index, 'number');
		return this.get('formModel').getItemAt(index);
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
	getWorkspaceModelItemFromView: {value: function(view)
	{
		barmatz.utils.DataTypes.isNotUndefined(view);
		barmatz.utils.DataTypes.isInstanceOf(view, HTMLElement);
		return this.getFormModelItemAt(this.getIndexOfView(view));
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
	}},
	newForm: {value: function()
	{
		this.get('formModel').reset();
	}}
});
/** barmatz.forms.ui.CollectionDialogController **/
window.barmatz.forms.ui.CollectionDialogController = function(model, view)
{
	barmatz.utils.DataTypes.isNotUndefined(model);
	barmatz.utils.DataTypes.isNotUndefined(view);
	barmatz.utils.DataTypes.isInstanceOf(model, barmatz.forms.CollectionModel);
	barmatz.utils.DataTypes.isInstanceOf(view, HTMLTableElement);
	barmatz.forms.CollectionController.call(this, model, view);
};

barmatz.forms.ui.CollectionDialogController.prototype = new barmatz.forms.CollectionController();
barmatz.forms.ui.CollectionDialogController.prototype.constructor = barmatz.forms.ui.CollectionDialogController;

Object.defineProperties(barmatz.forms.ui.CollectionDialogController.prototype,
{
	_createItemViewFromModel: {value: function(model)
	{
		barmatz.utils.DataTypes.isNotUndefined(model);
		barmatz.utils.DataTypes.isInstanceOf(model, barmatz.mvc.Model);
		return barmatz.forms.factories.DOMFactory.createTableRow(model);
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
/** barmatz.forms.ui.Login **/
window.barmatz.forms.ui.Login = function()
{
	var loginFormWrapper = barmatz.forms.factories.DOMFactory.createLoginFormDialogWrapper();
	barmatz.forms.factories.ControllerFactory.createLoginController(barmatz.forms.factories.ModelFactory.createUserModel(), loginFormWrapper.userNameField, loginFormWrapper.passwordField, loginFormWrapper.submitButton, loginFormWrapper.errorField);
};
/** barmatz.forms.ui.MenuController **/
window.barmatz.forms.ui.MenuController = function(model, iconView, itemsView)
{
	var cachedItemsViewDisplay, menuInitiated;
	
	barmatz.utils.DataTypes.isNotUndefined(model);
	barmatz.utils.DataTypes.isNotUndefined(iconView);
	barmatz.utils.DataTypes.isNotUndefined(itemsView);
	barmatz.utils.DataTypes.isInstanceOf(model, barmatz.forms.ui.MenuModel);
	barmatz.utils.DataTypes.isInstanceOf(iconView, HTMLElement);
	barmatz.utils.DataTypes.isInstanceOf(itemsView, HTMLElement);
	barmatz.forms.CollectionController.call(this);

	initModel();
	initViews();
	
	function initModel()
	{
		model.addEventListener(barmatz.events.ModelEvent.VALUE_CHANGED, onModelValueChanged);
		model.addEventListener(barmatz.events.CollectionEvent.ITEM_ADDED, onModelItemAdded);
		model.addEventListener(barmatz.events.CollectionEvent.ITEM_REMOVED, onModelItemRemoved);
		model.forEach(iterateModelItems);
	}
	
	function initViews()
	{
		iconView.addEventListener('click', onIconViewClick);
		jQuery(itemsView).menu();
		showOrHideItems();
	}
	
	function showItems()
	{
		itemsView.style.display = cachedItemsViewDisplay || 'block';
		cachedItemsViewDisplay = null;
		window.addEventListener('click', onWindowClick);
	}
	
	function hideItems()
	{
		cachedItemsViewDisplay = barmatz.utils.CSS.getStyle(itemsView).display;
		itemsView.style.display = 'none';
		window.removeEventListener('click', onWindowClick);
	}
	
	function iterateModelItems(item, index, collection)
	{
		addModelItemToView(item);
	}
	
	function addModelItemToView(model)
	{
		barmatz.utils.DataTypes.isNotUndefined(model);
		barmatz.utils.DataTypes.isInstanceOf(model, barmatz.forms.ui.MenuItemModel);
		model.view = itemsView.appendChild(barmatz.forms.factories.DOMFactory.createMenuItem(model));
		model.view.addEventListener('click', model.clickHandler);
		
		if(menuInitiated)
			jQuery(itemsView).menu('destroy');
		else
			menuInitiated = true;
		
		jQuery(itemsView).menu();
		showOrHideItems();
	}
	
	function removeModelItemFromView(element)
	{
		barmatz.utils.DataTypes.isNotUndefined(element);
		barmatz.utils.DataTypes.isInstanceOf(element, HTMLElement);
		itemsView.removeChild(element);
		element.removeEventListener('click', model.clickHandler);
	}
	
	function showOrHideItems()
	{
		model.open ? showItems() : hideItems();
	}
	
	function onModelValueChanged(event)
	{
		barmatz.utils.DataTypes.isNotUndefined(event);
		barmatz.utils.DataTypes.isInstanceOf(event, barmatz.events.ModelEvent);
		
		switch(event.key)
		{
			case 'open':
				showOrHideItems();
				break;
		}
	}
	
	function onModelItemAdded(event)
	{
		barmatz.utils.DataTypes.isNotUndefined(event);
		barmatz.utils.DataTypes.isInstanceOf(event, barmatz.events.CollectionEvent);
		addModelItemToView(event.target.getItemAt(event.index));
	}
	
	function onModelItemRemoved(event)
	{
		barmatz.utils.DataTypes.isNotUndefined(event);
		barmatz.utils.DataTypes.isInstanceOf(event, barmatz.events.CollectionEvent);
		removeModelItemFromView(view.childNodes[event.index]);
	}
	
	function onIconViewClick(event)
	{
		barmatz.utils.DataTypes.isNotUndefined(event);
		barmatz.utils.DataTypes.isInstanceOf(event, MouseEvent);
		model.toggle();
	}
	
	function onWindowClick(event)
	{
		barmatz.utils.DataTypes.isNotUndefined(event);
		barmatz.utils.DataTypes.isInstanceOf(event, MouseEvent);
		
		if(event.target != iconView && !barmatz.utils.DOM.isChildOf(event.target, iconView))
			model.hide();
	}
};

barmatz.forms.ui.MenuController.prototype = new barmatz.forms.CollectionController();
barmatz.forms.ui.MenuController.prototype.constructor = barmatz.forms.ui.MenuController;

Object.defineProperties(barmatz.forms.ui.MenuController.prototype, {});
/** barmatz.forms.ui.MenuItemModel **/
window.barmatz.forms.ui.MenuItemModel = function(label, clickHandler)
{
	barmatz.utils.DataTypes.isNotUndefined(label);
	barmatz.utils.DataTypes.isNotUndefined(clickHandler);
	barmatz.utils.DataTypes.isTypeOf(label, 'string');
	barmatz.utils.DataTypes.isTypeOf(clickHandler, 'function');
	barmatz.mvc.Model.call(this);
	this.set('label', label);
	this.set('clickHandler', clickHandler);
};

barmatz.forms.ui.MenuItemModel.prototype = new barmatz.mvc.Model();
barmatz.forms.ui.MenuItemModel.prototype.constructor = barmatz.forms.ui.MenuItemModel;

Object.defineProperties(barmatz.forms.ui.MenuItemModel.prototype, 
{
	label: {get: function()
	{
		return this.get('label');
	}, set: function(value)
	{
		barmatz.utils.DataTypes.isTypeOf(label, 'string');
		this.set('label', value);
	}},
	clickHandler: {get: function()
	{
		var _this = this;
		return function(event)
		{
			event.stopImmediatePropagation();
			_this.get('clickHandler').call(_this, event);
		};
	}, set: function(value)
	{
		barmatz.utils.DataTypes.isTypeOf(label, 'function');
		this.set('clickHandler', value);
	}},
	view: {get: function()
	{
		return this.get('view');
	}, set: function(value)
	{
		barmatz.utils.DataTypes.isInstanceOf(value, HTMLElement, true);
		this.set('view', value);
	}}
});
/** barmatz.forms.ui.MenuModel **/
window.barmatz.forms.ui.MenuModel = function()
{
	barmatz.forms.CollectionModel.call(this);
	this.set('open', false);
};

barmatz.forms.ui.MenuModel.prototype = new barmatz.forms.CollectionModel();
barmatz.forms.ui.MenuModel.prototype.constructor = barmatz.forms.ui.MenuModel;

Object.defineProperties(barmatz.forms.ui.MenuModel.prototype,
{
	open: {get: function()
	{
		return this.get('open');
	}},
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
		return barmatz.forms.CollectionModel.prototype.getItemIndex.call(this, item);
	}},
	setItemIndex: {value: function(item, index)
	{
		barmatz.utils.DataTypes.isNotUndefined(item);
		barmatz.utils.DataTypes.isNotUndefined(index);
		barmatz.utils.DataTypes.isInstanceOf(item, barmatz.forms.ui.MenuItemModel);
		barmatz.utils.DataTypes.isTypeOf(index, 'number');
		return barmatz.forms.CollectionModel.prototype.setItemIndex.call(this, item, index);
	}},
	toggle: {value: function()
	{
		this.open ? this.hide() : this.show();
	}},
	show: {value: function()
	{
		this.set('open', true);
	}},
	hide: {value: function()
	{
		this.set('open', false);
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
/** barmatz.forms.ui.PanelModel **/
window.barmatz.forms.ui.PanelModel = function(className, content)
{
	barmatz.utils.DataTypes.isNotUndefined(className);
	barmatz.utils.DataTypes.isNotUndefined(content);
	barmatz.utils.DataTypes.isTypeOf(className, 'string');
	barmatz.utils.DataTypes.isTypesOrInstances(content, ['string'], [HTMLElement, Array]);
	barmatz.mvc.Model.call(this);
	this.set('className', className);
	this.set('content', content);
};

barmatz.forms.ui.PanelModel.prototype = new barmatz.mvc.Model();
barmatz.forms.ui.PanelModel.prototype.constructor = barmatz.forms.ui.PanelModel;

Object.defineProperties(barmatz.forms.ui.PanelModel.prototype,
{
	className: {get: function()
	{
		return this.get('className');
	}, set: function(value)
	{
		barmatz.utils.DataTypes.isTypeOf(className, 'string', true);
		this.set('className', value);
	}},
	content: {get: function()
	{
		return this.get('content');
	}, set: function(value)
	{
		barmatz.utils.DataTypes.isTypesOrInstances(content, ['string'], [HTMLElement, Array], true);
		this.set('content', value);
	}}
});
/** barmatz.forms.ui.PropertiesController **/
window.barmatz.forms.ui.PropertiesController = function(view)
{
	barmatz.utils.DataTypes.isNotUndefined(view);
	barmatz.utils.DataTypes.isInstanceOf(view, HTMLElement);
	barmatz.mvc.Controller.call(this);
	this._view = view;
	this.model = null;
};

barmatz.forms.ui.PropertiesController.prototype = new barmatz.mvc.Controller();
barmatz.forms.ui.PropertiesController.prototype.constructor = barmatz.forms.ui.PropertiesController;

Object.defineProperties(barmatz.forms.ui.PropertiesController.prototype,
{
	model: {get: function()
	{
		return this._model;
	}, set: function(value)
	{
		var _this, itemsWrapper;
		
		barmatz.utils.DataTypes.isInstanceOf(value, barmatz.forms.fields.FieldModel, true);
		
		if(this._model)
			this._model.removeEventListener(barmatz.events.ModelEvent.VALUE_CHANGED, onModelValueChanged);
		
		this._model = value;
		this._view.innerHTML = '';
		
		if(this._model)
		{
			itemsWrapper = barmatz.forms.factories.DOMFactory.createPropertiesItemWarpper(this._model);
			
			if(itemsWrapper.itemsField)
				itemsWrapper.itemsField.addEventListener('focus', onItemsFieldFocus);
			
			this._model.addEventListener(barmatz.events.ModelEvent.VALUE_CHANGED, onModelValueChanged);
			this._view.appendChild(itemsWrapper.wrapper);
		}
		else
			this._view.appendChild(barmatz.forms.factories.DOMFactory.createElementWithContent('h2', 'forms-filler', 'No item selected'));
		
		function onItemsFieldFocus(event)
		{
			var model;
			
			barmatz.utils.DataTypes.isNotUndefined(event);
			barmatz.utils.DataTypes.isInstanceOf(event, Event);

			model = barmatz.forms.factories.ModelFactory.createCollectionModel();
			model.addEventListener(barmatz.events.CollectionEvent.ITEM_ADDED, onModeItemAdded);
			model.addEventListener(barmatz.events.CollectionEvent.ITEM_REMOVED, onModeItemRemoved);
			barmatz.forms.factories.ControllerFactory.createCollectionDialogController(model, barmatz.forms.factories.DOMFactory.createCollectionDialog());
			
			function onModeItemAdded(event)
			{
				barmatz.utils.DataTypes.isNotUndefined(event);
				barmatz.utils.DataTypes.isInstanceOf(event, barmatz.events.CollectionEvent);
				_this._model.addItemAt(event.item, event.index);
			}
			
			function onModeItemRemoved(event)
			{
				barmatz.utils.DataTypes.isNotUndefined(event);
				barmatz.utils.DataTypes.isInstanceOf(event, barmatz.events.CollectionEvent);
				_this._model.removeItemAt(event.item, event.index);
			}
		}
		
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
/** barmatz.forms.ui.TableOptions **/
window.barmatz.forms.ui.TableOptions = function()
{
	this._headClassName = '';
	this._headColumns = [];
	this._headColumnsClassNames = [];
	this._headRowClassName = '';
	this._bodyClassName = '';
	this._bodyRows = [];
	this._bodyRowsClassNames = [];
	this._bodyColumnsClassNames = [];
	this._className = '';
};

Object.defineProperties(barmatz.forms.ui.TableOptions.prototype, 
{
	headClassName: {get: function()
	{
		return this._headClassName;
	}, set: function(value)
	{
		barmatz.utils.DataTypes.isTypeOf(value, 'string', true);
		this._headClassName = value;
	}},
	headColumns: {get: function()
	{
		return this._headColumns;
	}, set: function(value)
	{
		barmatz.utils.DataTypes.isInstanceOf(value, Array, true);
		this._headColumns = value;
	}},
	headColumnsClassNames: {get: function()
	{
		return this._headColumnsClassNames;
	}, set: function(value)
	{
		barmatz.utils.DataTypes.isInstanceOf(value, Array, true);
		this._headColumnsClassNames = value;
	}},
	headRowClassName: {get: function()
	{
		return this._headRowClassName;
	}, set: function(value)
	{
		barmatz.utils.DataTypes.isTypeOf(value, 'string', true);
		this._headRowClassName = value;
	}},
	bodyClassName: {get: function()
	{
		return this._bodyClassName;
	}, set: function(value)
	{
		barmatz.utils.DataTypes.isTypeOf(value, 'string', true);
		this._bodyClassName = value;
	}},
	bodyColumnsClassNames: {get: function()
	{
		return this._bodyColumnsClassNames;
	}, set: function(value)
	{
		barmatz.utils.DataTypes.isInstanceOf(value, Array, true);
		this._bodyColumnsClassNames = value;
	}},
	bodyRows: {get: function()
	{
		return this._bodyRows;
	}, set: function(value)
	{
		barmatz.utils.DataTypes.isInstanceOf(value, Array, true);
		this._bodyRows = value;
	}},
	bodyRowsClassNames: {get: function()
	{
		return this._bodyRowsClassNames;
	}, set: function(value)
	{
		barmatz.utils.DataTypes.isInstanceOf(value, Array, true);
		this._bodyRowsClassNames = value;
	}},
	className: {get: function()
	{
		return this._className;
	}, set: function(value)
	{
		barmatz.utils.DataTypes.isTypeOf(value, 'string', true);
		this._className = value;
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
window.barmatz.forms.ui.ToolboxItemModel = function(type, label, fieldModel)
{
	barmatz.utils.DataTypes.isNotUndefined(type);
	barmatz.utils.DataTypes.isNotUndefined(label);
	barmatz.utils.DataTypes.isNotUndefined(fieldModel);
	barmatz.utils.DataTypes.isTypeOf(type, 'string');
	barmatz.utils.DataTypes.isTypeOf(label, 'string');
	barmatz.utils.DataTypes.isInstanceOf(fieldModel, barmatz.forms.fields.FieldModel);
	barmatz.forms.TypeModel.call(this, type);
	this.set('label', label);
	this.set('fieldModel', fieldModel);
};

barmatz.forms.ui.ToolboxItemModel.prototype = new barmatz.forms.TypeModel(null);
barmatz.forms.ui.ToolboxItemModel.prototype.constructor = barmatz.forms.ui.ToolboxItemModel;

Object.defineProperties(barmatz.forms.ui.ToolboxItemModel.prototype, 
{
	label: {get: function()
	{
		return this.get('label');
	}, set: function(value)
	{
		barmatz.utils.DataTypes.isTypeOf(label, 'string');
		this.set('label', value);
	}},
	fieldModel: {get: function()
	{
		return this.get('fieldModel');
	}}
});
/** barmatz.forms.ui.ToolboxModel **/
window.barmatz.forms.ui.ToolboxModel = function()
{
	barmatz.forms.CollectionModel.call(this);
};

barmatz.forms.ui.ToolboxModel.prototype = new barmatz.forms.CollectionModel();
barmatz.forms.ui.ToolboxModel.prototype.constructor = barmatz.forms.ui.ToolboxModel;

Object.defineProperties(barmatz.forms.ui.ToolboxModel.prototype,
{
	addItem: {value: function(item)
	{
		barmatz.utils.DataTypes.isNotUndefined(item);
		barmatz.utils.DataTypes.isInstanceOf(item, barmatz.forms.ui.ToolboxItemModel);
		barmatz.forms.CollectionModel.prototype.addItem.call(this, item);
	}},
	addItemAt: {value: function(item, index)
	{
		barmatz.utils.DataTypes.isNotUndefined(item);
		barmatz.utils.DataTypes.isNotUndefined(index);
		barmatz.utils.DataTypes.isInstanceOf(item, barmatz.forms.ui.ToolboxItemModel);
		barmatz.utils.DataTypes.isTypeOf(index, 'number');
		barmatz.forms.CollectionModel.prototype.addItemAt.call(this, item, index);
	}},
	removeItem: {value: function(item)
	{
		barmatz.utils.DataTypes.isNotUndefined(item);
		barmatz.utils.DataTypes.isInstanceOf(item, barmatz.forms.ui.ToolboxItemModel);
		barmatz.forms.CollectionModel.prototype.removeItem.call(this, item);
	}},
	getItemIndex: {value: function(item)
	{
		barmatz.utils.DataTypes.isNotUndefined(item);
		barmatz.utils.DataTypes.isInstanceOf(item, barmatz.forms.ui.ToolboxItemModel);
		barmatz.forms.CollectionModel.prototype.getItemIndex.call(this, item);
	}},
	getFieldModelAt: {value: function(index)
	{
		barmatz.utils.DataTypes.isNotUndefined(index);
		barmatz.utils.DataTypes.isTypeOf(index, 'number');
		return this.getItemAt(index).fieldModel;
	}}
});
/** barmatz.forms.ui.UserFormsListController **/
window.barmatz.forms.ui.UserFormsListController = function(formModel, userModel, view, dialogView)
{
	var loadingDialog;
	
	barmatz.utils.DataTypes.isNotUndefined(formModel);
	barmatz.utils.DataTypes.isNotUndefined(userModel);
	barmatz.utils.DataTypes.isNotUndefined(view);
	barmatz.utils.DataTypes.isNotUndefined(dialogView);
	barmatz.utils.DataTypes.isInstanceOf(formModel, barmatz.forms.FormModel);
	barmatz.utils.DataTypes.isInstanceOf(userModel, barmatz.forms.users.UserModel);
	barmatz.utils.DataTypes.isInstanceOf(view, HTMLElement);
	barmatz.utils.DataTypes.isInstanceOf(dialogView, HTMLElement);
	barmatz.forms.CollectionController.call(this);
	
	getForms();
	
	function getForms()
	{
		loadingDialog = barmatz.forms.factories.DOMFactory.createLoadingDialog();
		addUserModelListeners();
		userModel.getForms();
	}
	
	function getFormsComplete()
	{
		barmatz.forms.factories.DOMFactory.destroyLoadingDialog(loadingDialog);
		removeUserModelListeners();
	}
	
	function setFormsViews(models)
	{
		var modelitemView, i;
		
		barmatz.utils.DataTypes.isNotUndefined(models);
		barmatz.utils.DataTypes.isInstanceOf(models, Array);
		barmatz.utils.DOM.removeAllChildren(view);
		
		for(i = 0; i < models.length; i++)
		{
			model = models[i];
			model.addEventListener(barmatz.events.FormModelEvent.LOADING_FORM, onFormModelLoadingForm);
			itemView = view.appendChild(barmatz.forms.factories.DOMFactory.createUserFormsListItem(i));
			barmatz.forms.factories.ControllerFactory.createUserFormsListItemController(model, itemView, itemView.childNodes[0], itemView.childNodes[1], itemView.childNodes[2]);
		}
		
		jQuery(dialogView).dialog('close').dialog('open');
	}
	
	function addUserModelListeners()
	{
		userModel.addEventListener(barmatz.events.UserModelEvent.GET_FORMS_SUCCESS, onModelGetFormsSuccess);
		userModel.addEventListener(barmatz.events.UserModelEvent.GET_FORMS_FAIL, onModelGetFormsFail);
	}
	
	function removeUserModelListeners()
	{
		userModel.removeEventListener(barmatz.events.UserModelEvent.GET_FORMS_SUCCESS, onModelGetFormsSuccess);
		userModel.removeEventListener(barmatz.events.UserModelEvent.GET_FORMS_FAIL, onModelGetFormsFail);
	}
	
	function sortFromModels(model1, model2)
	{
		var date1 = model1.created.getTime(), date2 = model2.created.getTime();
		return date1 < date2 ? 1 : date1 > date2 ? -1 : 0;
	}
	
	function addFormModelLoadingFormEvents(model)
	{
		barmatz.utils.DataTypes.isNotUndefined(model);
		barmatz.utils.DataTypes.isInstanceOf(model, barmatz.forms.FormModel);
		model.addEventListener(barmatz.events.FormModelEvent.LOADING_FORM_COMPLETE, onFormModelLoadingFormComplete);
		model.addEventListener(barmatz.events.FormModelEvent.LOADING_FORM_ERROR, onFormModelLoadingFormError);
	}
	
	function removeFormModelLoadingFormEvents(model)
	{
		barmatz.utils.DataTypes.isNotUndefined(model);
		barmatz.utils.DataTypes.isInstanceOf(model, barmatz.forms.FormModel);
		model.removeEventListener(barmatz.events.FormModelEvent.LOADING_FORM_COMPLETE, onFormModelLoadingFormComplete);
		model.removeEventListener(barmatz.events.FormModelEvent.LOADING_FORM_ERROR, onFormModelLoadingFormError);
	}
	
	function formModelStartLoading(model) 
	{
		barmatz.utils.DataTypes.isNotUndefined(model);
		barmatz.utils.DataTypes.isInstanceOf(model, barmatz.forms.FormModel);
		loadingDialog = barmatz.forms.factories.DOMFactory.createLoadingDialog();
		addFormModelLoadingFormEvents(model);
	}
	
	function formModelStopLoading(model) 
	{
		barmatz.utils.DataTypes.isNotUndefined(model);
		barmatz.utils.DataTypes.isInstanceOf(model, barmatz.forms.FormModel);
		barmatz.forms.factories.DOMFactory.destroyLoadingDialog(loadingDialog);
		removeFormModelLoadingFormEvents(model);
	}
	
	function switchFormModel(model)
	{
		barmatz.utils.DataTypes.isNotUndefined(model);
		barmatz.utils.DataTypes.isInstanceOf(model, barmatz.forms.FormModel);
		formModel.id = model.id;
		formModel.name = model.name;
		formModel.created = model.created;
		formModel.fingerprint = model.fingerprint;
		
		while(formModel.numItems > 0)
			formModel.removeItemAt(formModel.numItems - 1);
		
		while(formModel.numItems < model.numItems)
			formModel.addItem(model.getItemAt(formModel.numItems));
	}
	
	function onFormModelLoadingForm(event)
	{
		barmatz.utils.DataTypes.isNotUndefined(event);
		barmatz.utils.DataTypes.isInstanceOf(event, barmatz.events.FormModelEvent);
		event.target.removeEventListener(barmatz.events.FormModelEvent.LOADING_FORM, onFormModelLoadingForm);
		formModelStartLoading(event.target);
	}
	
	function onFormModelLoadingFormComplete(event) 
	{
		barmatz.utils.DataTypes.isNotUndefined(event);
		barmatz.utils.DataTypes.isInstanceOf(event, barmatz.events.FormModelEvent);
		formModelStopLoading(event.target);
		switchFormModel(event.target);
		barmatz.forms.factories.DOMFactory.destroyDialog(dialogView);
	}
	
	function onFormModelLoadingFormError(event) 
	{
		barmatz.utils.DataTypes.isNotUndefined(event);
		barmatz.utils.DataTypes.isInstanceOf(event, barmatz.events.FormModelEvent);
		formModelStopLoading(event.target);
		barmatz.forms.factories.DOMFactory.createAlertPromptDialog('Error', 'An error has occured. Please try again later.', true);
	}
	
	function onModelGetFormsSuccess(event)
	{
		barmatz.utils.DataTypes.isNotUndefined(event);
		barmatz.utils.DataTypes.isInstanceOf(event, barmatz.events.UserModelEvent);
		getFormsComplete();
		setFormsViews(event.forms.sort(sortFromModels));
	}
	
	function onModelGetFormsFail(event)
	{
		barmatz.utils.DataTypes.isNotUndefined(event);
		barmatz.utils.DataTypes.isInstanceOf(event, barmatz.events.UserModelEvent);
		barmatz.forms.factories.DOMFactory.createAlertPromptDialog('Error', 'An error has occured. Please try again later.', true);
		getFormsComplete();
	}
};

barmatz.forms.ui.UserFormsListController.prototype = new barmatz.forms.CollectionController();
barmatz.forms.ui.UserFormsListController.prototype.constructor = barmatz.forms.ui.UserFormsListController;
/** barmatz.forms.ui.UserFormsListItemController **/
window.barmatz.forms.ui.UserFormsListItemController = function(model, view, nameView, createdView, fingerprintView)
{
	var activeView;
	
	barmatz.utils.DataTypes.isNotUndefined(model);
	barmatz.utils.DataTypes.isNotUndefined(view);
	barmatz.utils.DataTypes.isNotUndefined(nameView);
	barmatz.utils.DataTypes.isNotUndefined(createdView);
	barmatz.utils.DataTypes.isNotUndefined(fingerprintView);
	barmatz.utils.DataTypes.isInstanceOf(model, barmatz.forms.FormModel);
	barmatz.utils.DataTypes.isInstanceOf(view, HTMLElement);
	barmatz.utils.DataTypes.isInstanceOf(nameView, HTMLElement);
	barmatz.utils.DataTypes.isInstanceOf(createdView, HTMLElement);
	barmatz.utils.DataTypes.isInstanceOf(fingerprintView, HTMLElement);
	barmatz.mvc.Controller.call(this);

	nameView.innerHTML = model.name;
	createdView.innerHTML = formatDateToString(model.created);
	fingerprintView.innerHTML = model.fingerprint;
	view.addEventListener('mouseover', onViewMouseOver);
	
	model.addEventListener(barmatz.events.ModelEvent.VALUE_CHANGED, onModelValueChanged);
	
	function formatDateToString(date)
	{
		barmatz.utils.DataTypes.isNotUndefined(date);
		barmatz.utils.DataTypes.isInstanceOf(date, Date);
		return barmatz.utils.Date.toString(date, 'dd/mm/yyyy hh:ii');
	}
	
	function onModelValueChanged(event)
	{
		barmatz.utils.DataTypes.isNotUndefined(event);
		barmatz.utils.DataTypes.isInstanceOf(event, barmatz.events.ModelEvent);
		
		switch(event.key)
		{
			case 'name':
				nameView.innerHTML = event.value;
				break;
			case 'created':
				createdView.innerHTML = formatDateToString(event.value);
				break;
			case 'fingerprint':
				fingerprintView.innerHTML = event.value;
				break;
		}
	}
	
	function onViewClick(event)
	{
		barmatz.utils.DataTypes.isNotUndefined(event);
		barmatz.utils.DataTypes.isInstanceOf(event, MouseEvent);
		model.loadById(model.id);
	}
	
	function onViewMouseOver(event)
	{
		barmatz.utils.DataTypes.isNotUndefined(event);
		barmatz.utils.DataTypes.isInstanceOf(event, MouseEvent);
		barmatz.utils.CSS.addClass(event.currentTarget, 'ui-state-hover');
		event.currentTarget.removeEventListener('mouseover', onViewMouseOver);
		event.currentTarget.addEventListener('click', onViewClick);
		event.currentTarget.addEventListener('mouseout', onViewMouseOut);
		event.currentTarget.addEventListener('mousedown', onViewMouseDown);
	}
	
	function onViewMouseOut(event)
	{
		barmatz.utils.DataTypes.isNotUndefined(event);
		barmatz.utils.DataTypes.isInstanceOf(event, MouseEvent);
		barmatz.utils.CSS.removeClass(event.currentTarget, 'ui-state-hover');
		event.currentTarget.addEventListener('mouseover', onViewMouseOver);
		event.currentTarget.removeEventListener('click', onViewClick);
		event.currentTarget.removeEventListener('mouseout', onViewMouseOut);
		event.currentTarget.removeEventListener('mousedown', onViewMouseDown);
	}
	
	function onViewMouseDown(event)
	{
		barmatz.utils.DataTypes.isNotUndefined(event);
		barmatz.utils.DataTypes.isInstanceOf(event, MouseEvent);
		activeView = event.currentTarget;
		barmatz.utils.CSS.addClass(activeView, 'ui-state-active');
		activeView.removeEventListener('mousedown', onViewMouseDown);
		window.addEventListener('mouseup', onViewMouseUp);
	}
	
	function onViewMouseUp(event)
	{
		barmatz.utils.DataTypes.isNotUndefined(event);
		barmatz.utils.DataTypes.isInstanceOf(event, MouseEvent);
		barmatz.utils.CSS.removeClass(activeView, 'ui-state-active');
		activeView.addEventListener('mousedown', onViewMouseDown);
		window.removeEventListener('mouseup', onViewMouseUp);
		activeView = null;
	}
};

barmatz.forms.ui.UserFormsListItemController.prototype = new barmatz.mvc.Controller();
barmatz.forms.ui.UserFormsListItemController.prototype.constructor = barmatz.forms.ui.UserFormsListItemController;
/** barmatz.forms.ui.WorkspaceController **/
window.barmatz.forms.ui.WorkspaceController = function(model, view)
{
	var selectedItemIndex;

	barmatz.utils.DataTypes.isNotUndefined(model);
	barmatz.utils.DataTypes.isNotUndefined(view);
	barmatz.utils.DataTypes.isInstanceOf(model, barmatz.forms.CollectionModel);
	barmatz.utils.DataTypes.isInstanceOf(view, HTMLElement);
	barmatz.forms.CollectionController.call(this, model, view);
	
	model.addEventListener(barmatz.events.CollectionEvent.ITEM_ADDED, onModelItemAdded);
	setViewToSortable();
	
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
		model.setItemIndex(model.getItemAt(selectedItemIndex), getIndexFromSortEvent(ui.item[0]));
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
/** barmatz.forms.FormModel **/
window.barmatz.forms.FormModel = function()
{
	barmatz.forms.CollectionModel.call(this);
	this.set('name', '');
};

barmatz.forms.FormModel.prototype = new barmatz.forms.CollectionModel();
barmatz.forms.FormModel.prototype.constructor = barmatz.forms.FormModel;

Object.defineProperties(barmatz.forms.FormModel.prototype, 
{
	id: {get: function()
	{
		return this.get('id');
	}, set: function(value)
	{
		barmatz.utils.DataTypes.isTypeOf(value, 'number');
		this.set('id', value);
	}},
	name: {get: function()
	{
		return this.get('name');
	}, set: function(value)
	{
		barmatz.utils.DataTypes.isTypeOf(value, 'string');
		this.set('name', value);
	}},
	created: {get: function()
	{
		return this.get('created');
	}, set: function(value)
	{
		barmatz.utils.DataTypes.isInstanceOf(value, Date);
		this.set('created', value);
	}},
	fingerprint: {get: function()
	{
		return this.get('fingerprint');
	}, set: function(value)
	{
		barmatz.utils.DataTypes.isTypeOf(value, 'string');
		this.set('fingerprint', value);
	}},
	addItem: {value: function(item)
	{
		barmatz.utils.DataTypes.isNotUndefined(item);
		barmatz.utils.DataTypes.isInstanceOf(item, barmatz.forms.fields.FieldModel);
		barmatz.forms.CollectionModel.prototype.addItem.call(this, item);
	}},
	addItemAt: {value: function(item, index)
	{
		barmatz.utils.DataTypes.isNotUndefined(item);
		barmatz.utils.DataTypes.isNotUndefined(index);
		barmatz.utils.DataTypes.isInstanceOf(item, barmatz.forms.fields.FieldModel);
		barmatz.utils.DataTypes.isTypeOf(index, 'number');
		barmatz.forms.CollectionModel.prototype.addItemAt.call(this, item, index);
	}},
	removeItem: {value: function(item)
	{
		barmatz.utils.DataTypes.isNotUndefined(item);
		barmatz.utils.DataTypes.isInstanceOf(item, barmatz.forms.fields.FieldModel);
		barmatz.forms.CollectionModel.prototype.removeItem.call(this, item);
	}},
	getItemIndex: {value: function(item)
	{
		barmatz.utils.DataTypes.isNotUndefined(item);
		barmatz.utils.DataTypes.isInstanceOf(item, barmatz.forms.fields.FieldModel);
		return barmatz.forms.CollectionModel.prototype.getItemIndex.call(this, item);
	}},
	setItemIndex: {value: function(item, index)
	{
		barmatz.utils.DataTypes.isNotUndefined(item);
		barmatz.utils.DataTypes.isNotUndefined(index);
		barmatz.utils.DataTypes.isInstanceOf(item, barmatz.forms.fields.FieldModel);
		barmatz.utils.DataTypes.isTypeOf(index, 'number');
		return barmatz.forms.CollectionModel.prototype.setItemIndex.call(this, item, index);
	}},
	toJSON: {value: function()
	{
		var object = {fields: []};
		
		this.forEach(function(item, index, collection)
		{
			var field = {type: item.type};
			
			if(item instanceof barmatz.forms.fields.FieldModel)
			{
				field.name = item.name;
				field.label = item.label;
				field.mandatory = item.mandatory;
				field.default = item.default;
				field.enabled = item.enabled;
			}
			
			if(item instanceof barmatz.forms.fields.FileFieldModel)
				field.accept = item.accept;

			if(item instanceof barmatz.forms.fields.TextFieldModel)
				field.max = item.max;
			
			if(item instanceof barmatz.forms.fields.CheckboxFieldModel)
			{
				field.checked = item.checked;
				field.defaultChecked = item.defaultChecked;
			}
			
			object.fields.push(field);
		});
		
		return JSON.stringify(object);
	}},
	reset: {value: function()
	{
		this.set('name', '');
		this.set('id', null);
		while(this.numItems > 0)
			this.removeItemAt(this.numItems - 1);
	}},
	save: {value: function(model)
	{
		var _this = this, request, loader;

		barmatz.utils.DataTypes.isNotUndefined(model);
		barmatz.utils.DataTypes.isInstanceOf(model, barmatz.forms.users.UserModel);
		
		this.dispatchEvent(new barmatz.events.FormModelEvent(barmatz.events.FormModelEvent.SAVING));

		request = new barmatz.net.Request('api/form/save.php');
		request.method = barmatz.net.Methods.POST;
		request.data = {i: this.id || null, n: this.name, d: this.toJSON()};
		loader = new barmatz.net.Loader();
		loader.addEventListener(barmatz.events.LoaderEvent.DONE, onLoaderDone);
		loader.load(request);
		
		function onLoaderDone(event)
		{
			var response, data;
			
			barmatz.utils.DataTypes.isNotUndefined(event);
			barmatz.utils.DataTypes.isInstanceOf(event, barmatz.events.LoaderEvent);
			
			event.target.removeEventListener(barmatz.events.LoaderEvent.DONE, onLoaderDone);
			
			response = event.response;
			
			if(response && response.status == 200)
			{
				data = response.data ? JSON.parse(response.data) : null;
				
				if(data && data.id)
					_this.set('id', data.id);
				
				_this.dispatchEvent(new barmatz.events.FormModelEvent(barmatz.events.FormModelEvent.SAVED));
			}
			else
				_this.dispatchEvent(new barmatz.events.FormModelEvent(barmatz.events.FormModelEvent.ERROR_SAVING));
		}
	}},
	saveAs: {value: function(model, name)
	{
		barmatz.utils.DataTypes.isNotUndefined(model);
		barmatz.utils.DataTypes.isInstanceOf(model, barmatz.forms.users.UserModel);
		barmatz.utils.DataTypes.isNotUndefined(name);
		barmatz.utils.DataTypes.isTypeOf(name, 'string');
		this.set('id', null);
		this.set('name', name);
		this.save(model);
	}},
	getFingerprint: {value: function(callback)
	{
		var _this, fingerprint;
		
		barmatz.utils.DataTypes.isNotUndefined(callback);
		barmatz.utils.DataTypes.isTypeOf(callback, 'function');
		
		_this = this;
		fingerprint = this.get('fingerprint');
		
		if(fingerprint)
			callback(fingerprint);
		else
			loadFingerprint();
		
		function loadFingerprint()
		{
			var request, loader;
			
			request = new barmatz.net.Request('api/form.php');
			request.method = barmatz.net.Methods.GET;
			request.data = {i: _this.get('id')};
			
			loader = new barmatz.net.Loader();
			loader.addEventListener(barmatz.events.LoaderEvent.DONE, onLoaderDone);
			loader.load(request);
		}
		
		function onLoaderDone(event)
		{
			var response, data;
			
			barmatz.utils.DataTypes.isNotUndefined(event);
			barmatz.utils.DataTypes.isInstanceOf(event, barmatz.events.LoaderEvent);
			
			event.target.removeEventListener(barmatz.events.LoaderEvent.DONE, onLoaderDone);

			response = event.response;
			
			if(response && response.status == 200)
			{
				data = response.data ? JSON.parse(response.data) : null;
				
				if(data && data.fingerprint)
				{
					_this.set('fingerprint', data.fingerprint);
					callback(data.fingerprint);
				}
			}
		}
	}},
	loadById: {value: function(id)
	{
		var _this, request, loader;
		
		barmatz.utils.DataTypes.isNotUndefined(id);	
		barmatz.utils.DataTypes.isTypeOf(id, 'number');
		
		_this = this;
		
		this.dispatchEvent(new barmatz.events.FormModelEvent(barmatz.events.FormModelEvent.LOADING_FORM));
		
		request = new barmatz.net.Request('api/form.php');
		request.method = barmatz.net.Methods.GET;
		request.data = {i: id};
		
		loader = new barmatz.net.Loader();
		loader.addEventListener(barmatz.events.LoaderEvent.DONE, onLoaderDone);
		loader.load(request);
		
		function parseFieldsData(data)
		{
			var field, name;
			
			while(_this.numItems > 0)
				_this.removeItemAt(_this.numItems);
			
			for(i in data)
			{
				try
				{
					name = data[i].name;
					
					switch(data[i].type)
					{
						default:
							throw new Error('Unknown type');
							break;
						case barmatz.forms.fields.FieldTypes.TEXT_AREA:
							field = new barmatz.forms.fields.TextAreaFieldModel(name);
							break;
						case barmatz.forms.fields.FieldTypes.TEXT_FIELD:
							field = new barmatz.forms.fields.TextFieldModel(name);
							break;
						case barmatz.forms.fields.FieldTypes.DROPBOX:
							field = new barmatz.forms.fields.DropboxModel(name);
							break;
						case barmatz.forms.fields.FieldTypes.PASSWORD:
							field = new barmatz.forms.fields.PasswordFieldModel(name);
							break;
						case barmatz.forms.fields.FieldTypes.CHECKBOX:
							field = new barmatz.forms.fields.CheckboxFieldModel(name);
							break;
						case barmatz.forms.fields.FieldTypes.RADIO:
							field = new barmatz.forms.fields.RadioFieldModel(name);
							break;
						case barmatz.forms.fields.FieldTypes.FILE:
							field = new barmatz.forms.fields.FileFieldModel(name);
							break;
						case barmatz.forms.fields.FieldTypes.HIDDEN:
							field = new barmatz.forms.fields.HiddenFieldModel(name);
							break;
					}
					
					if(field instanceof barmatz.forms.fields.FieldModel)
					{
						field.label = data[i].label;
						field.mandatory = data[i].mandatory;
						field.default = data[i].default;
						field.enabled = data[i].enabled;
					}
					
					if(field instanceof barmatz.forms.fields.FileFieldModel)
						field.accept = data[i].accept;
	
					if(field instanceof barmatz.forms.fields.TextFieldModel)
						field.max = parseInt(data[i].max);
					
					if(field instanceof barmatz.forms.fields.CheckboxFieldModel)
					{
						field.checked = data[i].checked;
						field.defaultChecked = data[i].defaultChecked;
					}
					
					_this.addItem(field);
				}
				catch(error){}
			}
		}
		
		function onLoaderDone(event)
		{
			var response, data;

			barmatz.utils.DataTypes.isNotUndefined(event);
			barmatz.utils.DataTypes.isInstanceOf(event, barmatz.events.LoaderEvent);
			event.target.addEventListener(barmatz.events.LoaderEvent.DONE, onLoaderDone);
			
			response = event.response;
			
			if(response && response.status == 200)
			{
				data = response.data ? JSON.parse(response.data) : null;
				
				if(data)
				{
					_this.id = parseInt(data.id);
					_this.name = data.name;
					_this.fingerprint = data.fingerprint;
					_this.created = barmatz.utils.Date.toDate(data.created);
					parseFieldsData(JSON.parse(data.data).fields);
					_this.dispatchEvent(new barmatz.events.FormModelEvent(barmatz.events.FormModelEvent.LOADING_FORM_COMPLETE));
				}
				else
					_this.dispatchEvent(new barmatz.events.FormModelEvent(barmatz.events.FormModelEvent.LOADING_FORM_ERROR));
			}
			else
				_this.dispatchEvent(new barmatz.events.FormModelEvent(barmatz.events.FormModelEvent.LOADING_FORM_ERROR));
		}
	}},
	delete: {value: function()
	{
		var _this, request, loader;
		
		_this = this;
		
		this.dispatchEvent(new barmatz.events.FormModelEvent(barmatz.events.FormModelEvent.DELETING));

		request = new barmatz.net.Request('api/form/delete.php');
		request.method = barmatz.net.Methods.POST;
		request.data = {i: this.get('id')};
		
		loader = new barmatz.net.Loader();
		loader.addEventListener(barmatz.events.LoaderEvent.DONE, onLoaderDone);
		loader.load(request);
		
		function onLoaderDone(event)
		{
			var response;

			barmatz.utils.DataTypes.isNotUndefined(event);
			barmatz.utils.DataTypes.isInstanceOf(event, barmatz.events.LoaderEvent);
			event.target.addEventListener(barmatz.events.LoaderEvent.DONE, onLoaderDone);
			
			response = event.response;
			
			if(response && response.status == 200)
				_this.dispatchEvent(new barmatz.events.FormModelEvent(barmatz.events.FormModelEvent.DELETED));
			else
				_this.dispatchEvent(new barmatz.events.FormModelEvent(barmatz.events.FormModelEvent.DELETION_FAIL));
		}
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
	createLoginController: {value: function(model, userNameFieldView, passwordFieldView, submitButtonView, errorFieldView)
	{
		barmatz.utils.DataTypes.isNotUndefined(model);
		barmatz.utils.DataTypes.isNotUndefined(userNameFieldView);
		barmatz.utils.DataTypes.isNotUndefined(passwordFieldView);
		barmatz.utils.DataTypes.isNotUndefined(submitButtonView);
		barmatz.utils.DataTypes.isNotUndefined(errorFieldView);
		barmatz.utils.DataTypes.isInstanceOf(model, barmatz.forms.users.UserModel);
		barmatz.utils.DataTypes.isInstanceOf(userNameFieldView, HTMLElement);
		barmatz.utils.DataTypes.isInstanceOf(passwordFieldView, HTMLElement);
		barmatz.utils.DataTypes.isInstanceOf(submitButtonView, HTMLElement);
		barmatz.utils.DataTypes.isInstanceOf(errorFieldView, HTMLElement);
		return new barmatz.forms.users.LogingController(model, userNameFieldView, passwordFieldView, submitButtonView, errorFieldView);
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
	createPropertiesController: {value: function(view)
	{
		barmatz.utils.DataTypes.isNotUndefined(view);
		barmatz.utils.DataTypes.isInstanceOf(view, HTMLElement);
		return new barmatz.forms.ui.PropertiesController(view);
	}},
	createBuilderController: {value: function(formModel, userModel, containerView, panelsView, formNameView, saveStatusView, menuModel, menuView, toolboxModel, toolboxView, workspaceView, propertiesController)
	{
		barmatz.utils.DataTypes.isNotUndefined(formModel);
		barmatz.utils.DataTypes.isNotUndefined(userModel);
		barmatz.utils.DataTypes.isNotUndefined(containerView);
		barmatz.utils.DataTypes.isNotUndefined(panelsView);
		barmatz.utils.DataTypes.isNotUndefined(formNameView);
		barmatz.utils.DataTypes.isNotUndefined(saveStatusView);
		barmatz.utils.DataTypes.isNotUndefined(menuModel);
		barmatz.utils.DataTypes.isNotUndefined(menuView);
		barmatz.utils.DataTypes.isNotUndefined(toolboxModel);
		barmatz.utils.DataTypes.isNotUndefined(toolboxView);
		barmatz.utils.DataTypes.isNotUndefined(workspaceView);
		barmatz.utils.DataTypes.isNotUndefined(propertiesController);
		barmatz.utils.DataTypes.isInstanceOf(formModel, barmatz.forms.FormModel);
		barmatz.utils.DataTypes.isInstanceOf(userModel, barmatz.forms.users.UserModel);
		barmatz.utils.DataTypes.isInstanceOf(containerView, HTMLElement);
		barmatz.utils.DataTypes.isInstanceOf(panelsView, HTMLElement);
		barmatz.utils.DataTypes.isInstanceOf(formNameView, HTMLElement);
		barmatz.utils.DataTypes.isInstanceOf(saveStatusView, HTMLElement);
		barmatz.utils.DataTypes.isInstanceOf(menuModel, barmatz.forms.ui.MenuModel);
		barmatz.utils.DataTypes.isInstanceOf(menuView, HTMLElement);
		barmatz.utils.DataTypes.isInstanceOf(toolboxModel, barmatz.forms.ui.ToolboxModel);
		barmatz.utils.DataTypes.isInstanceOf(toolboxView, HTMLElement);
		barmatz.utils.DataTypes.isInstanceOf(workspaceView, HTMLElement);
		barmatz.utils.DataTypes.isInstanceOf(propertiesController, barmatz.forms.ui.PropertiesController);
		return new barmatz.forms.ui.BuilderController(formModel, userModel, containerView, panelsView, formNameView, saveStatusView, menuModel, menuView, toolboxModel, toolboxView, workspaceView, propertiesController);
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
	}},
	createMenuController: {value: function(model, iconView, itemsView)
	{
		barmatz.utils.DataTypes.isNotUndefined(model);
		barmatz.utils.DataTypes.isNotUndefined(iconView);
		barmatz.utils.DataTypes.isNotUndefined(itemsView);
		barmatz.utils.DataTypes.isInstanceOf(model, barmatz.forms.ui.MenuModel);
		barmatz.utils.DataTypes.isInstanceOf(iconView, HTMLElement);
		barmatz.utils.DataTypes.isInstanceOf(itemsView, HTMLElement);
		return new barmatz.forms.ui.MenuController(model, iconView, itemsView);
	}},
	createUserFormsListController: {value: function(formModel, userModel, view, dialogView)
	{
		barmatz.utils.DataTypes.isNotUndefined(formModel);
		barmatz.utils.DataTypes.isNotUndefined(userModel);
		barmatz.utils.DataTypes.isNotUndefined(view);
		barmatz.utils.DataTypes.isNotUndefined(dialogView);
		barmatz.utils.DataTypes.isInstanceOf(formModel, barmatz.forms.FormModel);
		barmatz.utils.DataTypes.isInstanceOf(userModel, barmatz.forms.users.UserModel);
		barmatz.utils.DataTypes.isInstanceOf(view, HTMLElement);
		barmatz.utils.DataTypes.isInstanceOf(dialogView, HTMLElement);
		return new barmatz.forms.ui.UserFormsListController(formModel, userModel, view, dialogView);
	}},
	createUserFormsListItemController: {value: function(model, view, nameView, createdView, fingerprintView)
	{
		barmatz.utils.DataTypes.isNotUndefined(model);
		barmatz.utils.DataTypes.isNotUndefined(view);
		barmatz.utils.DataTypes.isNotUndefined(nameView);
		barmatz.utils.DataTypes.isNotUndefined(createdView);
		barmatz.utils.DataTypes.isNotUndefined(fingerprintView);
		barmatz.utils.DataTypes.isInstanceOf(model, barmatz.forms.FormModel);
		barmatz.utils.DataTypes.isInstanceOf(view, HTMLElement);
		barmatz.utils.DataTypes.isInstanceOf(nameView, HTMLElement);
		barmatz.utils.DataTypes.isInstanceOf(createdView, HTMLElement);
		barmatz.utils.DataTypes.isInstanceOf(fingerprintView, HTMLElement);
		return new barmatz.forms.ui.UserFormsListItemController(model, view, nameView, createdView, fingerprintView);
	}},
	createCollectionDialogController: {value: function(model, view)
	{
		barmatz.utils.DataTypes.isNotUndefined(model);
		barmatz.utils.DataTypes.isNotUndefined(view);
		barmatz.utils.DataTypes.isInstanceOf(model, barmatz.forms.CollectionModel);
		barmatz.utils.DataTypes.isInstanceOf(view, HTMLTableElement);
		return new barmatz.forms.ui.CollectionDialogController(model, view);
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
		var _this, element;
		
		barmatz.utils.DataTypes.isNotUndefined(tagName);
		barmatz.utils.DataTypes.isTypeOf(tagName, 'string');
		barmatz.utils.DataTypes.isTypeOf(className, 'string', true);
		barmatz.utils.DataTypes.isTypesOrInstances(content, ['string'], [HTMLElement, Array]);
		barmatz.utils.DataTypes.isTypeOf(appendChildWrapper, 'function', true);
		
		_this = this;
		element = this.createElement(tagName, className);
		addContent(content, element);
		
		return element;
		
		function addContent(content, parent, wrapperTag)
		{
			var i;
			
			if(barmatz.utils.DataTypes.applySilent('isTypeOf', content, 'string'))
			{
				if(wrapperTag)
					parent.appendChild(_this.createElementWithContent(wrapperTag, '', content));
				else
					parent.innerHTML = content;
			}
			else if(barmatz.utils.DataTypes.applySilent('isInstanceOf', content, HTMLElement))
				parent.appendChild(appendChildWrapper != null ? appendChildWrapper(content) : content);
			else if(barmatz.utils.DataTypes.applySilent('isInstanceOf', content, Array))
			{
				for(i in content)
					addContent(content[i], parent, 'span');
			}
		}
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
				case barmatz.forms.fields.FieldTypes.TEXT_FIELD:
				case barmatz.forms.fields.FieldTypes.PASSWORD:
				case barmatz.forms.fields.FieldTypes.CHECKBOX:
				case barmatz.forms.fields.FieldTypes.RADIO:
				case barmatz.forms.fields.FieldTypes.FILE:
				case barmatz.forms.fields.FieldTypes.HIDDEN:
					return 'input';
					break;
				case barmatz.forms.fields.FieldTypes.TEXT_AREA:
					return 'textarea';
					break;
				case barmatz.forms.fields.FieldTypes.DROPBOX:
					return 'select';
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
	createToolbox: {value: function()
	{
		return this.createElement('ul');
	}},
	createWorkspaceWrapper: {value: function(formName, saveStatus)
	{
		var formNameElement, saveStatusElement, workspaceElement;
		
		barmatz.utils.DataTypes.isTypeOf(formName, 'string', true);
		barmatz.utils.DataTypes.isTypeOf(saveStatus, 'string', true);
		
		formNameElement = this.createElementWithContent('h1', 'forms-workspace-header-form-name', formName || '');
		saveStatusElement = this.createElementWithContent('h3', 'forms-workspace-header-save-status', saveStatus || '');
		workspaceElement = this.createElement('table', 'forms-workspace-items');

		return {wrapper: this.createElementWithContent('div', 'forms-workspace-wrapper', [this.createElementWithContent('div', 'forms-workspace-header', [formNameElement, saveStatusElement]), workspaceElement]), formName: formNameElement, saveStatus: saveStatusElement, workspace: workspaceElement};
	}},
	createProperties: {value: function()
	{
		return this.createElement('div');
	}},
	createToolboxItem: {value: function(label)
	{
		barmatz.utils.DataTypes.isNotUndefined(label);
		barmatz.utils.DataTypes.isTypeOf(label, 'string');
		return this.createElementWithContent('li', 'forms-toolbox-item', label);
	}},
	createWorkspaceItemWrapper: {value: function(model)
	{
		var _this, wrapper, grip, label, field, mandatory, deleteButton;
		
		barmatz.utils.DataTypes.isNotUndefined(model);
		barmatz.utils.DataTypes.isInstanceOf(model, barmatz.forms.fields.FieldModel);
		
		_this = this;
		wrapper = this.createElement('tr', 'forms-workspace-item');
		grip = this.createElement('span', 'forms-grip ui-icon ui-icon-grip-solid-vertical');
		label = this.createElementWithContent('label', '', model.label ? model.label : '');
		field = this.createFormFieldElement(model);
		mandatory = this.createElementWithContent('span', 'forms-workspace-item-mandatory', mandatory ? '*' : '');
		deleteButton = this.createIconButton('circle-close');
		
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
	createPropertiesItemWarpper: {value: function(model)
	{
		var _this, returnWrapper, wrapper, value;
		
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
			
			if(!(model instanceof barmatz.forms.fields.DropboxModel))
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
		
		if(model instanceof barmatz.forms.fields.DropboxModel)
		{
			value = model.toString();
			returnWrapper.itemsField = addFieldToWrapper('array', 'items', 'items', ['add item...']);
			returnWrapper.itemsField.selectedIndex = null;
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

			fieldWrapper = _this.createPropertiesItemFieldWrapper(type, name, label, value, onFieldValueChange);
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
	createPropertiesItemFieldWrapper: {value: function(type, name, label, value, changeHandler)
	{
		var field, i;
		
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
			case 'array':
				field = this.createElement('select');
				
				for(i in value)
					field.appendChild(this.createElement('option')).innerHTML = value[i];
				break;
			case 'boolean':
				field = this.createDropboxElement(barmatz.forms.factories.ModelFactory.createDropboxModel(name, [
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
		var _this, dialog, nameField, labelField, wrapper, form, formTableOptions;
		
		_this = this;
		nameField = getField();
		labelField = getField();
		
		formTableOptions = new barmatz.forms.ui.TableOptions();
		formTableOptions.bodyRows.push(getRowContent('Name', nameField));
		formTableOptions.bodyRows.push(getRowContent('Label', labelField));
		
		form = this.createTable(formTableOptions);
		wrapper = this.createElementWithContent('div', '', form);
		dialog = this.createDialog('New Field', wrapper);
		
		jQuery(dialog).dialog({
			closeOnEscape: false,
			dialogClass: 'forms-dialog-prompt'
		});
		
		return {wrapper: dialog, nameField: nameField, labelField: labelField};
		
		function getRowContent(label, field)
		{
			barmatz.utils.DataTypes.isNotUndefined(label);
			barmatz.utils.DataTypes.isNotUndefined(field);
			barmatz.utils.DataTypes.isTypeOf(label, 'string');
			barmatz.utils.DataTypes.isInstanceOf(field, HTMLElement);
			return [_this.createElementWithContent('label', '', label), field];
		}
		
		function getField()
		{
			var field = _this.createElement('input');
			field.type = 'text';
			return field;
		}
	}},
	createPromptDialog: {value: function(title, content, confirmHandler, open)
	{
		var _this, dialog;

		barmatz.utils.DataTypes.isNotUndefined(title);
		barmatz.utils.DataTypes.isNotUndefined(content);
		barmatz.utils.DataTypes.isNotUndefined(confirmHandler);
		barmatz.utils.DataTypes.isTypeOf(title, 'string');
		barmatz.utils.DataTypes.isTypesOrInstances(content, ['string'], [HTMLElement, Array]);
		barmatz.utils.DataTypes.isTypeOf(confirmHandler, 'function');
		barmatz.utils.DataTypes.isTypeOf(open, 'boolean', true);
		
		_this = this;
		dialog = this.createDialog(title, content);
		
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
	}},
	createExportPromptDialog: {value: function(id, open)
	{
		var embedCode, textarea;
		
		barmatz.utils.DataTypes.isNotUndefined(id);
		barmatz.utils.DataTypes.isTypeOf(open, 'boolean', true);
		
		embedCode = '(function(d){' +
					'var a,b,formID="' + id + '";' +
					'a=d.createElement("script");' +
					'a.src="myscript.js";' +
					'b=d.getElementsByTagName("script")[0];' +
					'b.parentNode.insertBefore(a,b);' +
					'})(document);';
		
		textarea = this.createElementWithContent('textarea', 'forms-dialog-export-embedcode', embedCode);
		textarea.readOnly = true;
		textarea.addEventListener('click', function(event)
		{
			event.currentTarget.focus();
			event.currentTarget.select();
		});
		
		return this.createAlertPromptDialog('Export', this.createElementWithContent('div', '', [
			this.createElementWithContent('div', '', 'Copy past this code into your site:'),
			textarea
		]), open);
	}},
	createChangePropertyPromptDialog: {value: function(title, key, value, confirmHandler, open)
	{
		var field, wrapper;

		barmatz.utils.DataTypes.isNotUndefined(title);
		barmatz.utils.DataTypes.isNotUndefined(key);
		barmatz.utils.DataTypes.isNotUndefined(value);
		barmatz.utils.DataTypes.isNotUndefined(confirmHandler);
		barmatz.utils.DataTypes.isTypeOf(title, 'string');
		barmatz.utils.DataTypes.isTypeOf(key, 'string');
		barmatz.utils.DataTypes.isTypeOf(confirmHandler, 'function');
		barmatz.utils.DataTypes.isTypeOf(open, 'boolean', true);
		
		field = this.createElement('input');
		field.type = 'text';
		field.value = value;
		wrapper = this.createElementWithContent('div', '', [this.createElementWithContent('label', '', key), field]);
		return {wrapper: wrapper, dialog: this.createPromptDialog(title, wrapper, confirmHandler, open), field: field};
	}},
	createAlertPromptDialog: {value: function(title, content, open)
	{
		var _this, dialog;
		
		barmatz.utils.DataTypes.isNotUndefined(title);
		barmatz.utils.DataTypes.isNotUndefined(content);
		barmatz.utils.DataTypes.isTypeOf(title, 'string');
		barmatz.utils.DataTypes.isTypesOrInstances(content, ['string'], [HTMLElement, Array]);
		barmatz.utils.DataTypes.isTypeOf(open, 'boolean', true);
		
		_this = this;
		dialog = this.createDialog(title, content);
		
		jQuery(dialog).dialog({
			buttons: {OK: onOKButtonClick}
		});
		
		if(open)
			jQuery(dialog).dialog('open');
		
		function onOKButtonClick(event)
		{
			_this.destroyDialog(dialog);
		}
		
		return dialog;
		
	}},
	createConfirmPromptDialog: {value: function(message, confirmHandler, open)
	{
		barmatz.utils.DataTypes.isNotUndefined(message);
		barmatz.utils.DataTypes.isNotUndefined(confirmHandler);
		barmatz.utils.DataTypes.isTypeOf(message, 'string');
		barmatz.utils.DataTypes.isTypeOf(confirmHandler, 'function');
		barmatz.utils.DataTypes.isTypeOf(open, 'boolean', true);
		return this.createPromptDialog('Confirm', message, confirmHandler, open);
	}},
	createPanels: {value: function(panels)
	{
		var options, model, i; 
		
		barmatz.utils.DataTypes.isNotUndefined(panels);
		barmatz.utils.DataTypes.isInstanceOf(panels, Array);
		
		options = new barmatz.forms.ui.TableOptions();
		options.className = 'forms-wrapper';
		options.bodyRows.push([]);
		
		for(i = 0; i < panels.length; i++)
		{
			model = panels[i];
			options.bodyRows[0].push(model.content);
			options.bodyColumnsClassNames.push(model.className);
		}
		
		return this.createTable(options);
	}},
	createMenuWrapper: {value: function()
	{
		var icon, menu, wrapper;
		icon = this.createMenuIcon();
		menu = this.createMenu();
		wrapper = this.createElementWithContent('div', 'forms-menu', [icon, menu]);
		return {wrapper: wrapper, icon: icon, menu: menu};
	}},
	createMenuIcon: {value: function()
	{
		return this.createIconButton('gear');
	}},
	createMenu: {value: function()
	{
		return this.createElement('ul');
	}},
	createMenuItem: {value: function(model)
	{
		var anchor;

		barmatz.utils.DataTypes.isNotUndefined(model);
		barmatz.utils.DataTypes.isInstanceOf(model, barmatz.forms.ui.MenuItemModel);

		anchor = this.createElementWithContent('a', '', model.label);
		anchor.href = 'javascript:void(0);';
		anchor.addEventListener('click', model.clickHandler);
		
		return this.createElementWithContent('li', '', anchor);
	}},
	createIconButton: {value: function(name)
	{
		var button;
		
		barmatz.utils.DataTypes.isNotUndefined(name);
		barmatz.utils.DataTypes.isTypeOf(name, 'string');
		
		button = this.createElementWithContent('span', 'ui-icon-wrapper ui-state-default ui-corner-all', this.createElement('span', 'ui-icon ui-icon-' + name));
		jQuery(button).button();
		
		return button;
	}},
	createLoadingDialog: {value: function()
	{
		return barmatz.forms.factories.DOMFactory.BODY_ELEMENT.appendChild(this.createElement('div', 'loading-image ui-front'));
	}},
	destroyLoadingDialog: {value: function(dialog)
	{
		barmatz.utils.DataTypes.isNotUndefined(dialog);
		barmatz.utils.DataTypes.isInstanceOf(dialog, HTMLElement);
		dialog.parentElement.removeChild(dialog);
	}},
	createLoginFormDialogWrapper: {value: function()
	{
		var _this, dialog, wrapper, wrapperOptions, userNameField, passwordField, errorField;
		
		_this = this;
		wrapperOptions = new barmatz.forms.ui.TableOptions();
		userNameField = addField('username', 'User', 'text');
		passwordField = addField('password', 'Password', 'password');
		wrapper = this.createTable(wrapperOptions);
		errorField = this.createElementWithContent('div', 'forms-error-wrapper ui-state-error ui-corner-all', [this.createElement('span', 'ui-icon ui-icon-alert'), this.createElementWithContent('span', '', 'Username and/or password are incorrect')]);
		dialog = this.createDialog('Login', [wrapper, errorField]);

		jQuery(dialog).dialog({autoOpen: true, dialogClass: 'forms-dialog-prompt', buttons: {Submit: function(){}}});
		
		return {dialog: dialog, userNameField: userNameField, passwordField: passwordField, submitButton: dialog.parentElement.getElementsByTagName('button')[1], errorField: errorField};

		function addField(name, label, type)
		{
			var field;
			
			barmatz.utils.DataTypes.isNotUndefined(name);
			barmatz.utils.DataTypes.isNotUndefined(label);
			barmatz.utils.DataTypes.isNotUndefined(type);
			barmatz.utils.DataTypes.isTypeOf(name, 'string');
			barmatz.utils.DataTypes.isTypeOf(label, 'string');
			barmatz.utils.DataTypes.isTypeOf(type, 'string');
			
			field = _this.createElement('input');
			field.name = name;
			field.type = type;
			wrapperOptions.bodyRows.push([_this.createElementWithContent('label', '', label), field]);
			
			return field;
		}
	}},
	createUserFormsListDialog: {value: function()
	{
		var dialog = this.createDialog('Your forms', this.createUserFormsList());
		jQuery(dialog).dialog({autoOpen: true, dialogClass: 'forms-dialog-user-forms'});
		return dialog;
	}},
	createUserFormsList: {value: function()
	{
		var options = new barmatz.forms.ui.TableOptions();
		options.headColumns.push('Name');
		options.headColumns.push('Created');
		options.headColumns.push('Fingerprint');
		return this.createTable(options);
	}},
	createUserFormsListItem: {value: function(index)
	{
		barmatz.utils.DataTypes.isNotUndefined(index);
		barmatz.utils.DataTypes.isTypeOf(index, 'number');
		return this.createElementWithContent('tr', 'ui-widget ui-state-default ui-corner-all ui-button-text-only ' + (index % 2 == 0 ? 'even' : 'odd'), [this.createElement('td'), this.createElement('td'), this.createElement('td')]);
	}},
	createTable: {value: function(options)
	{
		var _this, content;
		
		barmatz.utils.DataTypes.isNotUndefined(options);
		barmatz.utils.DataTypes.isInstanceOf(options, barmatz.forms.ui.TableOptions);
		
		_this = this;
		content = [];
		
		if(options.headColumns && options.headColumns.length > 0)
			content.push(this.createElementWithContent('thead', options.headClassName, this.createTableRow(options.headColumns, options.headColumnsClassNames, options.headRowClassName, true)));
		
		content.push(this.createElementWithContent('tbody', options.bodyClassName, getBodyRows()));
		
		return this.createElementWithContent('table', options.className, content);
		
		function getBodyRows()
		{
			var rows = [], i;
			
			for(i = 0; i < options.bodyRows.length; i++)
				rows.push(_this.createTableRow(options.bodyRows[i], options.bodyColumnsClassNames, options.bodyRowsClassNames[i % options.bodyRowsClassNames.length]));
			
			return rows;
		}
	}},
	createTableRow: {value: function(content, contentClassNames, className, isHead)
	{
		var columns, i;
		
		barmatz.utils.DataTypes.isNotUndefined(content);
		barmatz.utils.DataTypes.isInstanceOf(content, Array);
		barmatz.utils.DataTypes.isInstanceOf(contentClassNames, Array, true);
		barmatz.utils.DataTypes.isTypeOf(className, 'string', true);
		barmatz.utils.DataTypes.isTypeOf(isHead, 'boolean', true);
		
		columns = [];
		
		for(i = 0; i < content.length; i++)
			columns.push(this.createTableColumn(content[i], contentClassNames[i % contentClassNames.length], isHead)); 
		
		return this.createElementWithContent('tr', className, columns);
	}},
	createTableColumn: {value: function(content, className, isHead)
	{
		barmatz.utils.DataTypes.isNotUndefined(content);
		barmatz.utils.DataTypes.isTypesOrInstances(content, ['string'], [HTMLElement, Array]);
		barmatz.utils.DataTypes.isTypeOf(className, 'string', true);
		barmatz.utils.DataTypes.isTypeOf(isHead, 'boolean', true);
		return this.createElementWithContent(isHead ? 'th' : 'td', className, content);
	}}
});
/** barmatz.forms.factories.ModelFactory **/
window.barmatz.forms.factories.ModelFactory = function(){};

Object.defineProperties(barmatz.forms.factories.ModelFactory,
{
	createUserModel: {value: function()
	{
		return new barmatz.forms.users.UserModel();
	}},
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
			case barmatz.forms.fields.FieldTypes.TEXT_AREA:
				return new barmatz.forms.fields.TextAreaFieldModel(name);
				break;
			case barmatz.forms.fields.FieldTypes.TEXT_FIELD:
				return new barmatz.forms.fields.TextFieldModel(name);
				break;
			case barmatz.forms.fields.FieldTypes.DROPBOX:
				return new barmatz.forms.fields.DropboxModel(name);
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
	createToolboxModel: {value: function()
	{
		return new barmatz.forms.ui.ToolboxModel();
	}},
	createToolboxItemModel: {value: function(type, label, fieldModel)
	{
		barmatz.utils.DataTypes.isNotUndefined(type);
		barmatz.utils.DataTypes.isNotUndefined(label);
		barmatz.utils.DataTypes.isNotUndefined(fieldModel);
		barmatz.utils.DataTypes.isTypeOf(type, 'string');
		barmatz.utils.DataTypes.isTypeOf(label, 'string');
		barmatz.utils.DataTypes.isInstanceOf(fieldModel, barmatz.forms.fields.FieldModel);
		return new barmatz.forms.ui.ToolboxItemModel(type, label, fieldModel);
	}},
	createCollectionModel: {value: function()
	{
		return new barmatz.forms.CollectionModel();
	}},
	createDropboxItemModel: {value: function(label, value)
	{
		barmatz.utils.DataTypes.isNotUndefined(label);
		barmatz.utils.DataTypes.isTypeOf(label, 'string');
		return new barmatz.forms.fields.DropboxItemModel(label, value);
	}},
	createDropboxModel: {value: function(name, items)
	{
		barmatz.utils.DataTypes.isNotUndefined(name);
		barmatz.utils.DataTypes.isTypeOf(name, 'string', true);
		barmatz.utils.DataTypes.isInstanceOf(items, Array, true);
		return new barmatz.forms.fields.DropboxModel(name, items);
	}},
	createBuilderModel: {value: function()
	{
		return new barmatz.forms.ui.BuilderModel();
	}},
	createMenuModel: {value: function()
	{
		return new barmatz.forms.ui.MenuModel();
	}},
	createMenuItemModel: {value: function(label, clickHandler)
	{
		barmatz.utils.DataTypes.isNotUndefined(label);
		barmatz.utils.DataTypes.isNotUndefined(clickHandler);
		barmatz.utils.DataTypes.isTypeOf(label, 'string');
		barmatz.utils.DataTypes.isTypeOf(clickHandler, 'function');
		return new barmatz.forms.ui.MenuItemModel(label, clickHandler);
	}},
	createFormModel: {value: function()
	{
		return new barmatz.forms.FormModel();
	}},
	createPanelModel: {value: function(className, content)
	{
		barmatz.utils.DataTypes.isNotUndefined(className);
		barmatz.utils.DataTypes.isNotUndefined(content);
		barmatz.utils.DataTypes.isTypeOf(className, 'string');
		barmatz.utils.DataTypes.isTypesOrInstances(content, ['string'], [HTMLElement, Array]);
		return new barmatz.forms.ui.PanelModel(className, content);
	}}
});
/** barmatz.forms.users.LogingController **/
window.barmatz.forms.users.LogingController = function(model, userNameFieldView, passwordFieldView, submitButtonView, errorFieldView)
{
	var errorFieldViewCachedDisplay, loadingView;
	
	barmatz.utils.DataTypes.isNotUndefined(model);
	barmatz.utils.DataTypes.isNotUndefined(userNameFieldView);
	barmatz.utils.DataTypes.isNotUndefined(passwordFieldView);
	barmatz.utils.DataTypes.isNotUndefined(submitButtonView);
	barmatz.utils.DataTypes.isNotUndefined(errorFieldView);
	barmatz.utils.DataTypes.isInstanceOf(model, barmatz.forms.users.UserModel);
	barmatz.utils.DataTypes.isInstanceOf(userNameFieldView, HTMLElement);
	barmatz.utils.DataTypes.isInstanceOf(passwordFieldView, HTMLElement);
	barmatz.utils.DataTypes.isInstanceOf(submitButtonView, HTMLElement);
	barmatz.utils.DataTypes.isInstanceOf(errorFieldView, HTMLElement);
	barmatz.mvc.Controller.call(this);
	
	hideErrorFieldView();
	waitingForInput();
	
	function showErrorFieldView() 
	{
		errorFieldView.style.display = errorFieldViewCachedDisplay;
		errorFieldViewCachedDisplay = null;
	}
	
	function hideErrorFieldView() 
	{
		errorFieldViewCachedDisplay = errorFieldView.style.display;
		errorFieldView.style.display = 'none';
	}
	
	function showLoading()
	{
		loadingView = barmatz.forms.factories.DOMFactory.createLoadingDialog();
	}
	
	function hideLoading()
	{
		barmatz.forms.factories.DOMFactory.destroyLoadingDialog(loadingView);
		loadingView = null;
	}
	
	function waitingForServer()
	{
		model.addEventListener(barmatz.events.UserModelEvent.LOGIN_SUCCESS, onModelLoginSuccess);
		model.addEventListener(barmatz.events.UserModelEvent.LOGIN_FAIL, onModelLoginFail);
		submitButtonView.removeEventListener('click', onSubmitButtonClick);
		window.removeEventListener('keydown', onKeyDown);
	}
	
	function waitingForInput()
	{
		model.removeEventListener(barmatz.events.UserModelEvent.LOGIN_SUCCESS, onModelLoginSuccess);
		model.removeEventListener(barmatz.events.UserModelEvent.LOGIN_FAIL, onModelLoginFail);
		submitButtonView.addEventListener('click', onSubmitButtonClick);
		window.addEventListener('keydown', onKeyDown);
	}
	
	function submit()
	{
		showLoading();
		waitingForServer();
		model.login(userNameFieldView.value, passwordFieldView.value);
	}
	
	function onKeyDown(event)
	{
		barmatz.utils.DataTypes.isNotUndefined(event);
		barmatz.utils.DataTypes.isInstanceOf(event, KeyboardEvent);
		
		if(event.keyCode == 13)
			submit();
	}
	
	function onSubmitButtonClick(event)
	{
		barmatz.utils.DataTypes.isNotUndefined(event);
		barmatz.utils.DataTypes.isInstanceOf(event, MouseEvent);
		submit();
	}
	
	function onModelLoginSuccess(event)
	{
		location.href = 'builder.php';
		hideLoading();
		hideErrorFieldView();
		waitingForInput();
	}
	
	function onModelLoginFail(event)
	{
		passwordFieldView.value = '';
		hideLoading();
		showErrorFieldView();
		waitingForInput();
	}
};
/** barmatz.forms.users.UserModel **/
window.barmatz.forms.users.UserModel = function()
{
	barmatz.forms.CollectionModel.call(this);
};

barmatz.forms.users.UserModel.prototype = new barmatz.forms.CollectionModel();
barmatz.forms.users.UserModel.prototype.constructor = barmatz.forms.users.UserModel;

Object.defineProperties(barmatz.forms.users.UserModel.prototype,
{
	id: {get: function()
	{
		return this.get('id');
	}},
	userName: {get: function()
	{
		return this.get('userName');
	}},
	firstName: {get: function()
	{
		return this.get('firstName');
	}},
	lastName: {get: function()
	{
		return this.get('lastName');
	}},
	created: {get: function()
	{
		return this.get('created');
	}},
	active: {get: function()
	{
		return this.get('active');
	}},
	addItem: {value: function(item)
	{
		barmatz.utils.DataTypes.isNotUndefined(item);
		barmatz.utils.DataTypes.isInstanceOf(item, barmatz.forms.FormModel);
		barmatz.forms.CollectionModel.prototype.addItem.call(this, item);
	}},
	addItemAt: {value: function(item, index)
	{
		barmatz.utils.DataTypes.isNotUndefined(item);
		barmatz.utils.DataTypes.isNotUndefined(index);
		barmatz.utils.DataTypes.isInstanceOf(item, barmatz.forms.FormModel);
		barmatz.utils.DataTypes.isTypeOf(index, 'number');
		barmatz.forms.CollectionModel.prototype.addItemAt.call(this, item, index);
	}},
	removeItem: {value: function(item)
	{
		barmatz.utils.DataTypes.isNotUndefined(item);
		barmatz.utils.DataTypes.isInstanceOf(item, barmatz.forms.FormModel);
		barmatz.forms.CollectionModel.prototype.removeItem.call(this, item);
	}},
	getItemIndex: {value: function(item)
	{
		barmatz.utils.DataTypes.isNotUndefined(item);
		barmatz.utils.DataTypes.isInstanceOf(item, barmatz.forms.FormModel);
		barmatz.forms.CollectionModel.prototype.getItemIndex.call(this, item);
	}},
	setItemIndex: {value: function(item, index)
	{
		barmatz.utils.DataTypes.isNotUndefined(item);
		barmatz.utils.DataTypes.isNotUndefined(index);
		barmatz.utils.DataTypes.isInstanceOf(item, barmatz.forms.FormModel);
		barmatz.utils.DataTypes.isTypeOf(index, 'number');
		barmatz.forms.CollectionModel.prototype.setItemIndex.call(this, item, index);
	}},
	getForms: {value: function()
	{
		var _this = this;
		
		this.id == null ? loadUserData() : loadFormsData();
		
		function loadUserData()
		{
			addLoadUserDataListeners();
			_this.getData();
		}
		
		function loadFormsData()
		{
			var request, loader;
			
			request = new barmatz.net.Request('api/user/forms.php');
			request.method = barmatz.net.Methods.GET;
			request.data = {u: _this.id};
			
			loader = new barmatz.net.Loader();
			loader.addEventListener(barmatz.events.LoaderEvent.DONE, onLoadFormsDataDone);
			loader.load(request);
		}
		
		function addLoadUserDataListeners()
		{
			_this.addEventListener(barmatz.events.UserModelEvent.DATA_LOAD_SUCCESS, onLoadUserDataSucces);
			_this.addEventListener(barmatz.events.UserModelEvent.DATA_LOAD_FAIL, onLoadUserDataFail);
		}
		
		function removeLoadUserDataListeners()
		{
			_this.removeEventListener(barmatz.events.UserModelEvent.DATA_LOAD_SUCCESS, onLoadUserDataSucces);
			_this.removeEventListener(barmatz.events.UserModelEvent.DATA_LOAD_FAIL, onLoadUserDataFail);
		}
		
		function parseFormsData(data)
		{
			var form, i;
			
			barmatz.utils.DataTypes.isNotUndefined(data);
			barmatz.utils.DataTypes.isInstanceOf(data, Array);
			
			for(i in data)
			{
				form = new barmatz.forms.FormModel();
				form.created = barmatz.utils.Date.toDate(data[i].created);
				form.fingerprint = data[i].fingerprint;
				form.id = parseInt(data[i].id);
				form.name = data[i].name;
				data[i] = form;
			}
		}
		
		function onLoadUserDataSucces(event)
		{
			removeLoadUserDataListeners();
			loadFormsData();
		}
		
		function onLoadUserDataFail(event)
		{
			removeLoadUserDataListeners();
			_this.dispatchEvent(new barmatz.events.UserModelEvent(barmatz.events.UserModelEvent.GET_FORMS_FAIL));
		}
		
		function onLoadFormsDataDone(event)
		{
			var response, data;
			
			barmatz.utils.DataTypes.isNotUndefined(event);
			barmatz.utils.DataTypes.isInstanceOf(event, barmatz.events.LoaderEvent);
			
			event.target.removeEventListener(barmatz.events.LoaderEvent.DONE, onLoadFormsDataDone);

			response = event.response;
			
			if(response && response.status == 200)
			{
				data = response.data ? JSON.parse(response.data) : null;
					
				if(data)
				{
					parseFormsData(data);
					_this.dispatchEvent(new barmatz.events.UserModelEvent(barmatz.events.UserModelEvent.GET_FORMS_SUCCESS, data));
				}
				else
					_this.dispatchEvent(new barmatz.events.UserModelEvent(barmatz.events.UserModelEvent.GET_FORMS_FAIL));
			}
			else
				_this.dispatchEvent(new barmatz.events.UserModelEvent(barmatz.events.UserModelEvent.GET_FORMS_FAIL));
		}
	}},
	getData: {value: function()
	{
		var _this = this, request, loader;
		
		request = new barmatz.net.Request('api/user/user.php');
		request.method = barmatz.net.Methods.GET;
		
		loader = new barmatz.net.Loader();
		loader.addEventListener(barmatz.events.LoaderEvent.DONE, onLoaderDone);
		loader.load(request);
		
		function onLoaderDone(event)
		{
			var response, data;
			
			barmatz.utils.DataTypes.isNotUndefined(event);
			barmatz.utils.DataTypes.isInstanceOf(event, barmatz.events.LoaderEvent);
			
			event.target.removeEventListener(barmatz.events.LoaderEvent.DONE, onLoaderDone);

			response = event.response;
			
			if(response && response.status == 200)
			{
				data = response.data ? JSON.parse(response.data) : null;
				
				if(data)
				{
					_this.set('id', data.id);
					_this.set('userName', data.userName);
					_this.set('firstName', data.first_name);
					_this.set('lastName', data.last_name);
					_this.set('created', barmatz.utils.Date.toDate(data.created));
					_this.set('active', data.active == '1' ? true : false);
					_this.dispatchEvent(new barmatz.events.UserModelEvent(barmatz.events.UserModelEvent.DATA_LOAD_SUCCESS));
				}
				else
					_this.dispatchEvent(new barmatz.events.UserModelEvent(barmatz.events.UserModelEvent.DATA_LOAD_FAIL));
			}
			else
				_this.dispatchEvent(new barmatz.events.UserModelEvent(barmatz.events.UserModelEvent.DATA_LOAD_FAIL));
				
		}
	}},
	login: {value: function(userName, password)
	{
		var _this, request, loader;
		
		barmatz.utils.DataTypes.isNotUndefined(userName);
		barmatz.utils.DataTypes.isNotUndefined(password);
		barmatz.utils.DataTypes.isTypeOf(userName, 'string');
		barmatz.utils.DataTypes.isTypeOf(password, 'string');
		
		_this = this;
		
		request = new barmatz.net.Request('api/user/login.php');
		request.method = barmatz.net.Methods.POST;
		request.data = {u: userName, p: password};
		
		loader = new barmatz.net.Loader();
		loader.addEventListener(barmatz.events.LoaderEvent.DONE, onLoadDone);
		loader.load(request);
		
		function onLoadDone(event)
		{
			var response, data;
			
			barmatz.utils.DataTypes.isNotUndefined(event);
			barmatz.utils.DataTypes.isInstanceOf(event, barmatz.events.LoaderEvent);

			event.target.removeEventListener(barmatz.events.LoaderEvent.DONE, onLoadDone);
			
			response = event.response;
			
			if(response && response.status == 200)
			{
				data = response.data ? JSON.parse(response.data) : null;
				_this.set('id', data.id);
				_this.dispatchEvent(new barmatz.events.FormModelEvent(barmatz.events.UserModelEvent.LOGIN_SUCCESS));
			}
			else
				_this.dispatchEvent(new barmatz.events.FormModelEvent(barmatz.events.UserModelEvent.LOGIN_FAIL));
		}
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
		
		this._xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
		
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
					_this.dispatchEvent(new barmatz.events.LoaderEvent(type, new barmatz.net.Response(request.url, _this._xhr.responseText, _this._xhr.responseType || '', _this._xhr.status, _this._xhr.getAllResponseHeaders().split('\n'))));
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
	this.set('data', {});
};

barmatz.net.Request.prototype = new barmatz.mvc.Model();
barmatz.net.Request.prototype.constructor = barmatz.net.Request;

Object.defineProperties(barmatz.net.Request.prototype,
{
	data: {get: function()
	{
		return this.get('data');
	}, set: function(value)
	{
		this.set('data', value);
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
