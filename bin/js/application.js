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
/** barmatz.utils.Bitwise **/
window.barmatz.utils.Bitwise = function(){};

Object.defineProperties(barmatz.utils.Bitwise,
{
	slice: {value: function(bitA, bitB)
	{
		var bitsA, bitsB, index, i;
		
		barmatz.utils.DataTypes.isNotUndefined(bitA);
		barmatz.utils.DataTypes.isNotUndefined(bitB);
		barmatz.utils.DataTypes.isTypeOf(bitA, 'number');
		barmatz.utils.DataTypes.isTypeOf(bitB, 'number');
		
		bitsA = this.parseBit(bitA);
		bitsB = this.parseBit(bitB);
		
		for(i = 0; i < bitsB.length; i++)
		{
			index = bitsA.indexOf(bitsB[i]);
			
			if(index > -1)
				bitsA.splice(index, 1);
		}
		
		return this.concat.apply(this, bitsA);
	}},
	concat: {value: function()
	{
		var result, filterredBits, bits, i;
		
		bits = [];
		filterredBits = [];
		result = 0;
		
		for(i = 0; i < arguments.length; i++)
			bits = bits.concat(this.parseBit(arguments[i]));
		
		filterredBits = bits.filter(function(a,b,c)
		{
			return filterredBits.indexOf(a) >= 0 ? false : filterredBits.push(a) >= 0;
		});
		
		for(i = 0; i < filterredBits.length; i++)
			result += filterredBits[i];
		
		return result;
	}},
	parseBit: {value: function(bit)
	{
		var bits, i;
		
		barmatz.utils.DataTypes.isNotUndefined(bit);
		barmatz.utils.DataTypes.isTypeOf(bit, 'number');
		
		bits = [];
		
		for(i  = 1; i <= bit; i = i << 1)
			if(i & bit)
				bits.push(i);
		
		return bits;
	}},
	contains: {value: function(bitA, bitB)
	{
		return bitA & bitB ? true : false;
	}}
});
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
	}},
	sort: {value: function(element, compareFunction)
	{
		var children, i;

		barmatz.utils.DataTypes.isNotUndefined(element);
		barmatz.utils.DataTypes.isNotUndefined(compareFunction);
		barmatz.utils.DataTypes.isInstanceOf(element, HTMLElement);
		barmatz.utils.DataTypes.isTypeOf(compareFunction, 'function');
		
		children = Array.prototype.slice.call(element.childNodes).sort(compareFunction);
		
		for(i = 0; i < children.length; i++)
			element.appendChild(children[i]);
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
			if(!this.throwError(TypeError, errorMessage))
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
	throwError: {value: function(error, message)
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
			if(!this.throwError(ReferenceError, this.UNDEFINED_ERROR))
				return false;
		return true;
	}},
	isValid: {value: function(value)
	{
		if(value == null)
			if(!this.throwError(TypeError, this.INVALID_VALUE_ERROR))
				return false;
		return true;
	}},
	isAllowNull: {value: function(value)
	{
		if(value == null)
			if(!this.throwError(TypeError, this.VALUE_NULL))
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
			if(!this.throwError(TypeError, this.WRONG_TYPE))
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
			if(!this.throwError(TypeError, this.WRONG_INSTANCE))
				return false;
		return true;
	}},
	isInstancesOf: {value: function(instances, objects, allowNull)
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
			if(!this.throwError(TypeError, this.WRONG_TYPE_INSTANCE))
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
			isInstance = this.isInstancesOf(value, objects, allowNull);
		}
		catch(error){}
		
		if(!isType && !isInstance)
			if(!this.throwError(TypeError, this.WRONG_TYPE_INSTANCE))
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
				for(c = 0; c < this._listeners[i].length; c++)
				{
					this._listeners[i][c].call(this, event);
					if(!this._listeners[i])
						break;
				}
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
	}},
	toJSON: {value: function()
	{
		var object, i;
		
		object = {};
		
		for(i in this)
			object[i] = this[i];
		
		delete object._target;
		delete object._listeners;
		
		return object;
	}}
});

/** barmatz.events.FieldModelEvent **/
window.barmatz.events.FieldModelEvent = function(type)
{
	barmatz.utils.DataTypes.isNotUndefined(type);
	barmatz.utils.DataTypes.isTypeOf(type, 'string');
	barmatz.events.Event.call(this, type);
	
	this._errors = null;
	
	switch(type)
	{
		case barmatz.events.FieldModelEvent.INVALID:
			this._errors = arguments[1];
			break;
	}
};

barmatz.events.FieldModelEvent.prototype = new barmatz.events.Event(null);
barmatz.events.FieldModelEvent.prototype.constructor = barmatz.events.FieldModelEvent;

Object.defineProperties(barmatz.events.FieldModelEvent,
{
	VALID: {value: 'valid'},
	INVALID: {value: 'invalid'}
}); 
Object.defineProperties(barmatz.events.FieldModelEvent.prototype, 
{
	errors: {get: function()
	{
		return this._errors;
	}},
	clone: {value: function()
	{
		var event = new FieldModelEvent(type);
		event._target = this.target;
		event._errors = this.errors;
		return event;
	}},
	toString: {value: function()
	{
		switch(this.type)
		{
			default:
				return this.formatToString('FieldModelEvent', 'type');
				break;
			case barmatz.events.FieldModelEvent.INVALID:
				return this.formatToString('FieldModelEvent', 'type', 'errors');
				break;
		}
	}}
});
/** barmatz.events.FormModelEvent **/
window.barmatz.events.FormModelEvent = function(type)
{
	barmatz.utils.DataTypes.isNotUndefined(type);
	barmatz.utils.DataTypes.isTypeOf(type, 'string');
	barmatz.events.Event.call(this, type);

	this._leads = null;
	
	switch(type)
	{
		case barmatz.events.FormModelEvent.GET_LEADS_SUCCESS:
			this._leads = arguments[1];
			break;
	}
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
	DELETION_FAIL: {value: 'deletionFail'},
	SUBMITTING: {value: 'submitting'},
	SUBMITTED: {value: 'submitted'},
	SUBMISSION_FAILED: {value: 'submissionFailed'},
	GET_LEADS_SUCCESS: {value: 'getLeadsSuccess'},
	GET_LEADS_FAIL: {value: 'getLeadsFail'}
}); 
Object.defineProperties(barmatz.events.FormModelEvent.prototype, 
{
	leads: {get: function()
	{
		return this._leads;
	}},
	clone: {value: function()
	{
		var event = new FormModelEvent(type);
		event._target = this.target;
		
		switch(type)
		{
			case barmatz.events.FormModelEvent.GET_LEADS_SUCCESS:
				event._leads = this.leads;
				break;
		}
		
		return event;
	}},
	toString: {value: function()
	{
		switch(type)
		{
			default:
				return this.formatToString('FormModelEvent', 'type');
				break;
			case barmatz.events.FormModelEvent.GET_LEADS_SUCCESS:
				return this.formatToString('FormModelEvent', 'type', 'leads');
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
		case barmatz.events.LoaderEvent.COMPLETE:
		case barmatz.events.LoaderEvent.SUCCESS:
		case barmatz.events.LoaderEvent.ERROR:
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
	COMPLETE: {value: 'complete'},
	SUCCESS: {value: 'success'},
	ERROR: {value: 'error'}
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
		switch(type)
		{
			default:
				return this.formatToString('LoaderEvent', 'type');
				break;
			case barmatz.events.LoaderEvent.UNSENT:
			case barmatz.events.LoaderEvent.OPENED:
				return this.formatToString('LoaderEvent', 'type', 'request');
			case barmatz.events.LoaderEvent.HEADERS_RECEIVED:
			case barmatz.events.LoaderEvent.LOADING:
			case barmatz.events.LoaderEvent.COMPLETE:
			case barmatz.events.LoaderEvent.SUCCESS:
			case barmatz.events.LoaderEvent.ERROR:
				return this.formatToString('LoaderEvent', 'type', 'response');
				break;
		}
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
	this._targetURL = null;
	
	switch(type)
	{
		case barmatz.events.UserModelEvent.GET_FORMS_SUCCESS:
			this._forms = arguments[1];
			break;
		case barmatz.events.UserModelEvent.LOGIN_SUCCESS:
			this._targetURL = arguments[1];
			break;
	}
};

barmatz.events.UserModelEvent.prototype = new barmatz.events.Event(null);
barmatz.events.UserModelEvent.prototype.constructor = barmatz.events.UserModelEvent;

Object.defineProperties(barmatz.events.UserModelEvent,
{
	LOGIN_SUCCESS: {value: 'loginSuccess'},
	LOGIN_FAIL: {value: 'loginFail'},
	LOGOUT_SUCCESS: {value: 'logoutSuccess'},
	LOGOUT_FAIL: {value: 'logoutFail'},
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
	targetURL: {get: function()
	{
		return this._targetURL;
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
			case barmatz.events.UserModelEvent.LOGIN_SUCCESS:
				event._targetURL = this.targetURL;
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
			case barmatz.events.UserModelEvent.LOGIN_SUCCESS:
				return this.formatToString('UserModelEvent', 'type', 'targetURL');
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
		barmatz.utils.DataTypes.isInstanceOf(model, barmatz.forms.fields.FormItemModel);
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
	createFormController: {value: function(model, formView, submitButtonView)
	{
		barmatz.utils.DataTypes.isNotUndefined(model);
		barmatz.utils.DataTypes.isNotUndefined(formView);
		barmatz.utils.DataTypes.isNotUndefined(submitButtonView);
		barmatz.utils.DataTypes.isInstanceOf(model, barmatz.forms.FormModel);
		barmatz.utils.DataTypes.isInstanceOf(formView, HTMLFormElement);
		barmatz.utils.DataTypes.isInstanceOf(submitButtonView, HTMLElement);
		return new barmatz.forms.FormController(model, formView, submitButtonView);
	}},
	createDropboxItemsListController: {value: function(model, view, addButtonView, resetButtonView)
	{
		barmatz.utils.DataTypes.isNotUndefined(model);
		barmatz.utils.DataTypes.isNotUndefined(view);
		barmatz.utils.DataTypes.isNotUndefined(addButtonView);
		barmatz.utils.DataTypes.isNotUndefined(resetButtonView);
		barmatz.utils.DataTypes.isInstanceOf(model, barmatz.forms.fields.DropboxModel);
		barmatz.utils.DataTypes.isInstanceOf(view, HTMLElement);
		barmatz.utils.DataTypes.isInstanceOf(addButtonView, HTMLElement);
		barmatz.utils.DataTypes.isInstanceOf(resetButtonView, HTMLElement);
		return new barmatz.forms.fields.DropboxItemsListController(model, view, addButtonView, resetButtonView);
	}},
	createDropboxItemsListItemController: {value: function(model, labelView, valueView, editButtonView)
	{
		barmatz.utils.DataTypes.isNotUndefined(model);
		barmatz.utils.DataTypes.isNotUndefined(labelView);
		barmatz.utils.DataTypes.isNotUndefined(valueView);
		barmatz.utils.DataTypes.isNotUndefined(editButtonView);
		barmatz.utils.DataTypes.isInstanceOf(model, barmatz.forms.fields.DropboxItemModel);
		barmatz.utils.DataTypes.isInstanceOf(labelView, HTMLElement);
		barmatz.utils.DataTypes.isInstanceOf(valueView, HTMLElement);
		barmatz.utils.DataTypes.isInstanceOf(editButtonView, HTMLElement);
		return new barmatz.forms.fields.DropboxItemsListItemController(model, labelView, valueView, editButtonView);
	}},
	createFieldValidationOptionsController: {value: function(model, options)
	{
		barmatz.utils.DataTypes.isNotUndefined(model);
		barmatz.utils.DataTypes.isNotUndefined(options);
		barmatz.utils.DataTypes.isInstanceOf(model, barmatz.forms.fields.FieldModel);
		barmatz.utils.DataTypes.isTypeOf(options, 'object');
		return new barmatz.forms.fields.FieldValidationOptionsController(model, options);
	}},
	createFieldController: {value: function(model, fieldView, errorMessageView)
	{
		barmatz.utils.DataTypes.isNotUndefined(model);
		barmatz.utils.DataTypes.isNotUndefined(fieldView);
		barmatz.utils.DataTypes.isInstanceOf(model, barmatz.forms.fields.FieldModel);
		barmatz.utils.DataTypes.isInstanceOf(fieldView, HTMLElement);
		barmatz.utils.DataTypes.isInstanceOf(errorMessageView, HTMLElement, true);
		return new barmatz.forms.fields.FieldController(model, fieldView, errorMessageView);
	}},
	createJQueryDialogController: {value: function(view)
	{
		barmatz.utils.DataTypes.isNotUndefined(view);
		barmatz.utils.DataTypes.isInstanceOf(view, HTMLElement);
		return new barmatz.forms.ui.JQueryDialogController(view);
	}},
	createLeadsController: {value: function(userModel, formsListModel, formsListView, leadsListModel, leadsListWrapperView, leadsListView, containerView, panelsView)
	{
		barmatz.utils.DataTypes.isNotUndefined(userModel);
		barmatz.utils.DataTypes.isNotUndefined(formsListModel);
		barmatz.utils.DataTypes.isNotUndefined(formsListView);
		barmatz.utils.DataTypes.isNotUndefined(leadsListModel);
		barmatz.utils.DataTypes.isNotUndefined(leadsListWrapperView);
		barmatz.utils.DataTypes.isNotUndefined(leadsListView);
		barmatz.utils.DataTypes.isNotUndefined(containerView);
		barmatz.utils.DataTypes.isNotUndefined(panelsView);
		barmatz.utils.DataTypes.isInstanceOf(userModel, barmatz.forms.users.UserModel);
		barmatz.utils.DataTypes.isInstanceOf(formsListModel, barmatz.forms.CollectionModel);
		barmatz.utils.DataTypes.isInstanceOf(leadsListModel, barmatz.forms.CollectionModel);
		barmatz.utils.DataTypes.isInstanceOf(leadsListWrapperView, HTMLElement);
		barmatz.utils.DataTypes.isInstanceOf(leadsListView, HTMLElement);
		barmatz.utils.DataTypes.isInstanceOf(containerView, HTMLElement);
		barmatz.utils.DataTypes.isInstanceOf(panelsView, HTMLElement);
		return new barmatz.forms.ui.LeadsController(userModel, formsListModel, formsListView, leadsListModel, leadsListWrapperView, leadsListView, containerView, panelsView);
	}},
	createLeadsListController: {value: function(model, view)
	{
		barmatz.utils.DataTypes.isNotUndefined(model);
		barmatz.utils.DataTypes.isNotUndefined(view);
		barmatz.utils.DataTypes.isInstanceOf(model, barmatz.forms.CollectionModel);
		barmatz.utils.DataTypes.isInstanceOf(view, HTMLElement);
		return new barmatz.forms.ui.LeadsListController(model, view);
	}},
	createLeadsFormsListController: {value: function(model, view)
	{
		barmatz.utils.DataTypes.isNotUndefined(model);
		barmatz.utils.DataTypes.isNotUndefined(view);
		barmatz.utils.DataTypes.isInstanceOf(model, barmatz.forms.CollectionModel);
		barmatz.utils.DataTypes.isInstanceOf(view, HTMLElement);
		return new barmatz.forms.ui.LeadsFormsListController(model, view);
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
	createStylesheet: {value: function(href)
	{
		var link;
		
		barmatz.utils.DataTypes.isNotUndefined(href);
		barmatz.utils.DataTypes.isTypeOf(href, 'string');
		
		
		link = this.createElement('link');
		link.rel = 'stylesheet';
		link.type = 'text/css';
		link.href = href;
		return link;
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
				for(i = 0; i < content.length; i++)
					addContent(content[i], parent, 'span');
			}
		}
	}},
	createButton: {value: function(label, className)
	{
		var button;
		
		barmatz.utils.DataTypes.isNotUndefined(label);
		barmatz.utils.DataTypes.isTypeOf(label, 'string');
		barmatz.utils.DataTypes.isTypeOf(className, 'string', true);
		
		button = this.createElementWithContent('button', className || '', label);
		jQuery(button).button();
		
		return button;
	}},
	createDropboxElement: {value: function(model, selectedIndex)
	{
		var _this, dropbox;
		
		barmatz.utils.DataTypes.isNotUndefined(model);
		barmatz.utils.DataTypes.isInstanceOf(model, barmatz.forms.fields.DropboxModel);
		barmatz.utils.DataTypes.isTypeOf(selectedIndex, 'number', true);
		
		_this = this;
		dropbox = this.createElement('select');
		dropbox.name = model.name;
		
		model.forEach(function(item, index, collection)
		{
			dropbox.appendChild(_this.createDropboxItemElement(item));
		});
		
		if(selectedIndex)
			dropbox.selectedIndex = selectedIndex;
		
		return dropbox;
	}},
	createDropboxItemElement: {value: function(model)
	{
		var item;

		barmatz.utils.DataTypes.isNotUndefined(model);
		barmatz.utils.DataTypes.isInstanceOf(model, barmatz.forms.fields.DropboxItemModel);
		
		item = this.createElementWithContent('option', '', model.label);
		item.value = model.value;
		
		return item;
	}},
	createFormFieldElement: {value: function(model)
	{
		var _this, field;
		
		barmatz.utils.DataTypes.isNotUndefined(model);
		barmatz.utils.DataTypes.isInstanceOf(model, barmatz.forms.fields.FormItemModel);
		
		_this = this;
		field = this.createElement(getElementTagName(model.type || barmatz.forms.fields.FieldTypes.HTML_CONTENT));
		
		if(model instanceof barmatz.forms.fields.PhoneFieldModel)
			createPhoneField();
		
		if(field.tagName.toLowerCase() == 'input')
			field.type = model.type;
		
		setFieldPropertiesByModel(field, model);
		
		return field;
		
		function setFieldPropertiesByModel(field, model)
		{
			barmatz.utils.DataTypes.isNotUndefined(field);
			barmatz.utils.DataTypes.isNotUndefined(model);
			barmatz.utils.DataTypes.isInstanceOf(field, HTMLElement);
			barmatz.utils.DataTypes.isInstanceOf(model, barmatz.forms.fields.FormItemModel);
			
			if(!(model instanceof barmatz.forms.fields.PhoneFieldModel))
				field.value = model.value;
			
			field.enabled = model.enabled;
			
			if(model instanceof barmatz.forms.fields.TextFieldModel)
				if(!isNaN(model.max))
					field.maxLength = model.max;
			
			if(model instanceof barmatz.forms.fields.CheckboxFieldModel)
				field.checked = model.checked;
			
			if(model instanceof barmatz.forms.fields.FileFieldModel)
				field.accept = model.accept;
			
			if(model instanceof barmatz.forms.fields.TextAreaFieldModel)
			{
				field.rows = model.rows;
				field.cols = model.cols;
			}
			
			if(model instanceof barmatz.forms.fields.DropboxModel)
			{
				field.multiple = model.multiple;
				
				model.forEach(function(item, index, collection)
				{
					field.appendChild(_this.createDropboxItemElement(item));
				});
			}
			
			if(model instanceof barmatz.forms.fields.PhoneFieldModel)
			{
				field.getElementsByTagName('select')[0].value = model.prefix;
				field.getElementsByTagName('input')[0].value = model.value.replace(model.prefix, '');
			}
		}
		
		function getElementTagName(type)
		{
			barmatz.utils.DataTypes.isNotUndefined(type);
			barmatz.utils.DataTypes.isTypeOf(type, 'string');
			
			switch(type)
			{
				default:
					throw new Error('Unknown type');
					break;
				case barmatz.forms.fields.FieldTypes.HTML_CONTENT:
					return 'div';
					break;
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
				case barmatz.forms.fields.FieldTypes.PHONE:
					return 'span';
					break;
			}
		}
		
		function createPhoneField()
		{
			var phoneField, prefixModel;
			
			phoneField = _this.createElement('input');
			phoneField.name = 'phone';
			phoneField.maxLength = 7;
			
			prefixModel = barmatz.forms.factories.ModelFactory.createDropboxModel('phone-prefix');
			prefixModel.addItem(barmatz.forms.factories.ModelFactory.createDropboxItemModel('', ''));
			
			barmatz.forms.fields.PhonePrefixes.forEach(function(prefix)
			{
				prefixModel.addItem(barmatz.forms.factories.ModelFactory.createDropboxItemModel(prefix, prefix));
			});

			barmatz.utils.CSS.addClass(field, 'forms-phone-field');
			field.dir = 'ltr';
			field.appendChild(_this.createDropboxElement(prefixModel));
			field.appendChild(phoneField)
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
		button = this.createButton(label, clickHandler);
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
		var _this, isFieldModel, wrapper, grip, label, field, mandatory, deleteButton;
		
		barmatz.utils.DataTypes.isNotUndefined(model);
		barmatz.utils.DataTypes.isInstanceOf(model, barmatz.forms.fields.FormItemModel);
		
		_this = this;
		isFieldModel = model instanceof barmatz.forms.fields.FieldModel;
		wrapper = this.createElement('tr', 'forms-workspace-item');
		grip = this.createElement('span', 'forms-grip ui-icon ui-icon-grip-solid-vertical');
		label = this.createElementWithContent('label', '', isFieldModel && model.label ? model.label : '');
		field = this.createFormFieldElement(model);
		mandatory = this.createElementWithContent('span', 'forms-form-item-mandatory', isFieldModel && model.mandatory ? '*' : '');
		deleteButton = this.createDeleteButton();
		
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
		var _this, returnWrapper, wrapper;
		
		barmatz.utils.DataTypes.isNotUndefined(model);
		barmatz.utils.DataTypes.isInstanceOf(model, barmatz.forms.fields.FormItemModel);
		
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
			returnWrapper.enabledField = addFieldToWrapper('boolean', 'enabled', 'enabled', model.enabled);
			returnWrapper.widthField = addFieldToWrapper('number', 'width', 'width', model.width);
		}
		
		if(model instanceof barmatz.forms.fields.FileFieldModel)
			returnWrapper.acceptField = addFieldToWrapper('array', 'accept', 'accept', model.accept);

		if(model instanceof barmatz.forms.fields.TextFieldModel)
		{
			returnWrapper.descriptionField = addFieldToWrapper('string', 'description', 'description', model.description);
			returnWrapper.maxField = addFieldToWrapper('number', 'max', 'max', model.max);
		}
		
		if(model instanceof barmatz.forms.fields.TextAreaFieldModel)
		{
			returnWrapper.rowsField = addFieldToWrapper('number', 'rows', 'rows', model.rows);
			returnWrapper.colsField = addFieldToWrapper('number', 'cols', 'columns', model.cols);
		}
		
		if(model instanceof barmatz.forms.fields.CheckboxFieldModel)
			returnWrapper.checkedField = addFieldToWrapper('boolean', 'checked', 'checked', model.checked);
		
		if(model instanceof barmatz.forms.fields.DropboxModel)
		{
			returnWrapper.multipleField = addFieldToWrapper('boolean', 'multiple', 'multiple', model.multiple);
			returnWrapper.editItemsButton = addFieldToWrapper('button', '', 'Edit items');
		}

		if(model instanceof barmatz.forms.fields.FieldModel)
			returnWrapper.validationOptionsButton = addFieldToWrapper('button', '', 'Validation options');
		
		if(model instanceof barmatz.forms.fields.HTMLContentModel)
			returnWrapper.editContentButton = addFieldToWrapper('button', '', 'Edit content');
		
		return returnWrapper;
		
		function addFieldToWrapper(type, name, label, value)
		{
			var fieldWrapper;
			
			barmatz.utils.DataTypes.isNotUndefined(type);
			barmatz.utils.DataTypes.isNotUndefined(name);
			barmatz.utils.DataTypes.isNotUndefined(label);
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
		var content, field, i;
		
		barmatz.utils.DataTypes.isNotUndefined(type);
		barmatz.utils.DataTypes.isNotUndefined(name);
		barmatz.utils.DataTypes.isNotUndefined(label);
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
				
				for(i = 0; i < value.length; i++)
					field.appendChild(this.createElement('option')).innerHTML = value[i];
				break;
			case 'boolean':
				field = this.createDropboxElement(barmatz.forms.factories.ModelFactory.createDropboxModel(name, [
					barmatz.forms.factories.ModelFactory.createDropboxItemModel('No', false),
					barmatz.forms.factories.ModelFactory.createDropboxItemModel('Yes', true)
				]), value ? 1 : 0);
				break;
			case 'button':
				field = this.createButton(label);
				break;
		}
		
		field.name = name;
		field.addEventListener('change', changeHandler);
		
		content = [];

		if(type != 'button')
			content.push(this.createElementWithContent('label', '', label));
		
		content.push(field);

		return {wrapper: this.createElementWithContent('div', 'forms-item', content), field: field};
	}},
	createDialog: {value: function(title, content, open, container)
	{
		var dialog;
		
		barmatz.utils.DataTypes.isNotUndefined(title);
		barmatz.utils.DataTypes.isNotUndefined(content);
		barmatz.utils.DataTypes.isTypeOf(title, 'string');
		barmatz.utils.DataTypes.isTypesOrInstances(content, ['string'], [HTMLElement, Array]);
		barmatz.utils.DataTypes.isTypeOf(open, 'boolean', true);
		barmatz.utils.DataTypes.isInstanceOf(container, HTMLElement, true);
		
		dialog = this.createElementWithContent('div', 'forms-dialog', content);
		dialog.title = title;
		(container || this.BODY_ELEMENT).appendChild(dialog);
		jQuery(dialog).dialog({autoOpen: open || false, draggable: false, modal: true});
		return dialog;
	}},
	destroyDialog: {value: function(dialog)
	{
		jQuery(dialog).dialog('destroy');
		dialog.parentElement.removeChild(dialog);
	}},
	createNewFieldDialogWrapper: {value: function(model)
	{
		var _this, dialog, nameField, labelField, wrapper, form, formTableOptions;

		barmatz.utils.DataTypes.isNotUndefined(model);
		barmatz.utils.DataTypes.isInstanceOf(model, barmatz.forms.fields.FieldModel);
		
		_this = this;
		nameField = getField(model.name);
		labelField = getField(model.label);
		
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
		
		return {dialog: dialog, nameField: nameField, labelField: labelField};
		
		function getRowContent(label, field)
		{
			barmatz.utils.DataTypes.isNotUndefined(label);
			barmatz.utils.DataTypes.isNotUndefined(field);
			barmatz.utils.DataTypes.isTypeOf(label, 'string');
			barmatz.utils.DataTypes.isInstanceOf(field, HTMLElement);
			return [_this.createElementWithContent('label', '', label), field];
		}
		
		function getField(value)
		{
			var field;

			barmatz.utils.DataTypes.isNotUndefined(value);
			barmatz.utils.DataTypes.isTypeOf(value, 'string');
			
			field = _this.createElement('input');
			field.type = 'text';
			field.value = value;
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
		dialog = this.createDialog(title, content, open);
		
		jQuery(dialog).dialog({
			buttons: {OK: onOKButtonClick, Cancel: onCancelButtonClick}
		});
		
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
	createExportPromptDialog: {value: function(fingerprint, loadingMessage, open)
	{
		var dir, embedCode, textarea;
		
		barmatz.utils.DataTypes.isNotUndefined(fingerprint);
		barmatz.utils.DataTypes.isTypeOf(loadingMessage, 'string', true);
		barmatz.utils.DataTypes.isTypeOf(open, 'boolean', true);
		
		dir = location.href.replace(location.hash, '').replace(location.search, '').replace(/(^\w+:\/\/.+)\/.+\..+$/, '$1') + '/js'; 
		embedCode = '<div name="formContainer" fingerprint="' + fingerprint + '">' + (loadingMessage || '') + '</div>' +
					'<script type="text/javascript">' +
					'(function(w,d)' +
					'{' +
						'w.barmatz && w.barmatz.forms && !w.barmatz.forms.embed' +
						' ? barmatz.forms.embed(\'' + fingerprint + '\')' +
						' : l(\'' + dir + '/embed.js\');' +
						'function l(s)' +
						'{' +
							'a=d.createElement(\'script\');' +
							'a.src=s;' +
							'b=d.getElementsByTagName(\'script\')[0];' +
							'b.parentNode.insertBefore(a,b);' +
						'}' +
					'})(window,document)' +
					'</script>';
		
		textarea = this.createElementWithContent('textarea', 'forms-dialog-export-embedcode', embedCode);
		textarea.readOnly = true;
		textarea.addEventListener('click', function(event)
		{
			event.currentTarget.focus();
			event.currentTarget.select();
		});
		
		return this.createAlertPromptDialog('Export', this.createElementWithContent('div', '', [
			this.createElementWithContent('div', '', 'Copy past this code into your site inside the body tag where you want the form to appear:'),
			textarea
		]), open);
	}},
	createChangePropertyPromptDialogWrapper: {value: function(title, key, value, confirmHandler, open)
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
		dialog = this.createDialog(title, content, open);
		
		jQuery(dialog).dialog({
			buttons: {OK: onOKButtonClick}
		});
		
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
		return this.createSettingsButton();
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
	createEditButton: {value: function()
	{
		return this.createIconButton('pencil');
	}},
	createDeleteButton: {value: function()
	{
		return this.createIconButton('trash');
	}},
	createSettingsButton: {value: function()
	{
		return this.createIconButton('gear');
	}},
	createLoadingDialog: {value: function(container)
	{
		barmatz.utils.DataTypes.isInstanceOf(container, HTMLElement, true);
		return (container || barmatz.forms.factories.DOMFactory.BODY_ELEMENT).appendChild(this.createElement('div', 'loading-image ui-front'));
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
	createCollectionListDialog: {value: function(title, content, className)
	{
		var dialog;
		
		barmatz.utils.DataTypes.isNotUndefined(title);
		barmatz.utils.DataTypes.isNotUndefined(content);
		barmatz.utils.DataTypes.isTypeOf(title, 'string');
		barmatz.utils.DataTypes.isTypesOrInstances(content, ['string'], [HTMLElement, Array]);
		barmatz.utils.DataTypes.isTypeOf(className, 'string', true);
		
		dialog = this.createDialog(title, content);
		jQuery(dialog).dialog({autoOpen: true, dialogClass: 'forms-dialog-collection-list' + (className ? ' ' + className : '')});
		return dialog;
	}},
	createUserFormsListDialog: {value: function()
	{
		return this.createCollectionListDialog('Your forms', this.createUserFormsList(), 'forms-dialog-user-forms forms-clickable-td');
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
	createDropboxItemsListDialogWrapper: {value: function()
	{
		var addButton, resetButton;
		
		addButton = this.createButton('Add item');
		resetButton = this.createButton('Reset');
		
		return {dialog: this.createCollectionListDialog('Items', [this.createDropboxItemsList(), this.createElementWithContent('div', 'forms-dialog-footer', [addButton, resetButton])], 'forms-dialog-dropbox-items'), addButton: addButton, resetButton: resetButton};
	}},
	createDropboxItemsList: {value: function()
	{
		var options = new barmatz.forms.ui.TableOptions();
		options.headColumns.push('Key', 'Value', '');
		return this.createTable(options);
	}},
	createDropboxItemDialog: {value: function(labelValue, valueValue, confirmHandler)
	{
		var _this, options, keyField, valueField;
		
		barmatz.utils.DataTypes.isNotUndefined(labelValue);
		barmatz.utils.DataTypes.isNotUndefined(valueValue);
		barmatz.utils.DataTypes.isNotUndefined(confirmHandler);
		barmatz.utils.DataTypes.isTypeOf(labelValue, 'string', true);
		barmatz.utils.DataTypes.isTypeOf(confirmHandler, 'function');
		
		_this = this;
		options = new barmatz.forms.ui.TableOptions();
		labelField = addRow('label', labelValue || '');
		valueField = addRow('Value', valueValue || '');
		return this.createPromptDialog(labelField != null ? 'Edit item' : 'New item', this.createTable(options), onConfirm, true);
		
		function addRow(key, value)
		{
			var field;
			
			barmatz.utils.DataTypes.isNotUndefined(key);
			barmatz.utils.DataTypes.isNotUndefined(value);
			barmatz.utils.DataTypes.isTypeOf(key, 'string');
			
			field = _this.createElement('input');
			field.value = value;
			options.bodyRows.push([_this.createElementWithContent('label', '', key), field]);
			
			return field;
		}
		
		function onConfirm()
		{
			confirmHandler(labelField.value, valueField.value);
		}
	}},
	createDropboxItemsListItemWrapper: {value: function(index)
	{
		var wrapper, labelElement, valueElement, editButton, deleteButton;
		
		barmatz.utils.DataTypes.isNotUndefined(index);
		barmatz.utils.DataTypes.isTypeOf(index, 'number');
		
		labelElement = this.createElement('div');
		valueElement = this.createElement('div');
		editButton = this.createEditButton();
		deleteButton = this.createDeleteButton();
		wrapper = this.createTableRow([labelElement, valueElement, this.createElementWithContent('div', '', [editButton, deleteButton])], ['', '', 'forms-list-actions'], 'ui-widget ui-state-default ui-corner-all ui-button-text-only ' + (index % 2 == 0 ? 'even' : 'odd'));
		
		return {wrapper: wrapper, labelElement: labelElement, valueElement: valueElement, editButton: editButton, deleteButton: deleteButton};
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
	}},
	createFormPropertiesDialogWrapper: {value: function(model, confirmHandler, open)
	{
		var properties, dialog;

		barmatz.utils.DataTypes.isNotUndefined(model);
		barmatz.utils.DataTypes.isNotUndefined(confirmHandler);
		barmatz.utils.DataTypes.isInstanceOf(model, barmatz.forms.FormModel);
		barmatz.utils.DataTypes.isTypeOf(confirmHandler, 'function');
		barmatz.utils.DataTypes.isTypeOf(open, 'boolean', true);
		
		properties = this.createFormPropertiesWrapper(model);
		dialog = this.createPromptDialog('Properties', properties.wrapper, confirmHandler, open);
		properties.dialog = dialog;
		
		jQuery(dialog).dialog({dialogClass: 'forms-dialog-form-properties'});
		
		return properties;
		
	}},
	createFormPropertiesWrapper: {value: function(model)
	{
		var _this, returnValue, options;
		
		barmatz.utils.DataTypes.isNotUndefined(model);
		barmatz.utils.DataTypes.isInstanceOf(model, barmatz.forms.FormModel);

		_this = this;
		
		options = new barmatz.forms.ui.TableOptions();
		options.bodyRows = [];
		
		returnValue = {};
		
		returnValue.nameField = createField('Name');
		returnValue.nameField.value = model.name;
		
		returnValue.submitButtonLabelField = createField('Submit button label');
		returnValue.submitButtonLabelField.value = model.submitButtonLabel;
		
		returnValue.targetEmailField = createField('Target email');
		returnValue.targetEmailField.value = model.targetEmail;
		
		returnValue.directionField = createDropbox('Direction', 'formDirection', [barmatz.forms.Directions.LTR, barmatz.forms.Directions.RTL]);
		returnValue.directionField.value = model.direction;
		
		returnValue.languageField = createDropbox('Language', 'formlanguage', ['en', 'he']);
		returnValue.languageField.value = model.langauge;
		
		returnValue.layoutIdField = createDropbox('Layout', 'formLayoutId', ['1', '2']);
		returnValue.layoutIdField.value = model.layoutId;
		
		returnValue.stylesheetsField = createField('Stylesheets');
		returnValue.stylesheetsField.value = model.stylesheets.join(' ');
		
		returnValue.methodField = createDropbox('Method', 'formMethod', ['GET', 'POST']);
		returnValue.methodField.value = model.method;
		
		returnValue.encodingField = createDropbox('Encoding', 'formEncoding', [barmatz.net.Encoding.FORM, barmatz.net.Encoding.FILES]);
		returnValue.encodingField.value = model.encoding;
		
		returnValue.wrapper = this.createTable(options); 
		
		return returnValue;
		
		function createField(label, content)
		{
			var field, row;
			
			barmatz.utils.DataTypes.isNotUndefined(label);
			barmatz.utils.DataTypes.isTypeOf(label, 'string');
			
			field = content || _this.createElement('input');
			row = [_this.createElementWithContent('label', '', label), field];
			options.bodyRows.push(row);
			return field;
		}
		
		function createDropbox(label, name, values)
		{
			var model, key;
			
			barmatz.utils.DataTypes.isNotUndefined(label);
			barmatz.utils.DataTypes.isNotUndefined(name);
			barmatz.utils.DataTypes.isNotUndefined(values);
			barmatz.utils.DataTypes.isTypeOf(label, 'string');
			barmatz.utils.DataTypes.isTypeOf(name, 'string');
			barmatz.utils.DataTypes.isTypesOrInstances(values, ['object'], [Array]);
			
			model = barmatz.forms.factories.ModelFactory.createDropboxModel(name);
			
			if(values instanceof Array)
				for(key = 0; key < values.length; key++)
					model.addItem(barmatz.forms.factories.ModelFactory.createDropboxItemModel(values instanceof Array ? values[key] : key, values[key]));
			else
				for(key in values)
					model.addItem(barmatz.forms.factories.ModelFactory.createDropboxItemModel(values instanceof Array ? values[key] : key, values[key]));

			return createField(label, _this.createDropboxElement(model));
		}
	}},
	createFieldValidationOptionsDialogWrapper: {value: function(model)
	{
		var fieldValidationOptionsWrapper;
		
		barmatz.utils.DataTypes.isNotUndefined(model);
		barmatz.utils.DataTypes.isInstanceOf(model, barmatz.forms.fields.FieldModel);
		
		fieldValidationOptionsWrapper = this.createFieldValidationOptionsWrapper(model);
		
		return {dialog: this.createDialog(barmatz.utils.String.firstLetterToUpperCase(model.type) + ' field "' + model.name + '" validation options', fieldValidationOptionsWrapper.wrapper, true), options: fieldValidationOptionsWrapper.options};
	}},
	createFieldValidationOptionsWrapper: {value: function(model)
	{
		var wrapper, options, fieldValidatorWrapper, bits, i;
		
		barmatz.utils.DataTypes.isNotUndefined(model);
		barmatz.utils.DataTypes.isInstanceOf(model, barmatz.forms.fields.FieldModel);
		
		wrapper = this.createElement('div');
		bits = barmatz.utils.Bitwise.parseBit(model.availableValidators);
		options = {};
		
		for(i = 0; i < bits.length; i++)
		{
			fieldValidatorWrapper = this.createFieldValidatorWrapper(bits[i]);
			options[bits[i]] = fieldValidatorWrapper.checkbox;
			wrapper.appendChild(fieldValidatorWrapper.wrapper);
		}
		
		barmatz.utils.DOM.sort(wrapper, function(elementA, elementB)
		{
			var a, b;
			
			a = elementA.getElementsByTagName('span')[0].innerHTML;
			b = elementB.getElementsByTagName('span')[0].innerHTML;
			
			return a > b ? 1 : a < b ? -1 : 0;
		});

		return {wrapper: wrapper, options: options};
	}},
	createFieldValidatorWrapper: {value: function(bit)
	{
		var wrapper, checkbox, label;
		
		barmatz.utils.DataTypes.isNotUndefined(bit);
		barmatz.utils.DataTypes.isTypeOf(bit, 'number');
		
		checkbox = this.createElement('input');
		checkbox.type = 'checkbox';
		
		label = this.createElement('span');
		
		wrapper = this.createElement('div');
		wrapper.appendChild(checkbox);
		wrapper.appendChild(label);
		
		switch(bit)
		{
			default:
				throw new Error('Unknown bit');
				break;
			case barmatz.forms.Validator.EQUALS:
				label.innerHTML = 'equals...';
				break;
			case barmatz.forms.Validator.VALID_EMAIL:
				label.innerHTML = 'valid email';
				break;
			case barmatz.forms.Validator.VALID_PHONE:
				label.innerHTML = 'valid phone number';
				break;
			case barmatz.forms.Validator.MIN_LENGTH:
				label.innerHTML = 'minimum length...';
				break;
			case barmatz.forms.Validator.MAX_LENGTH:
				label.innerHTML = 'maximum length...';
				break;
			case barmatz.forms.Validator.EXACT_LENGTH:
				label.innerHTML = 'exact length...';
				break;
			case barmatz.forms.Validator.GREATER_THAN:
				label.innerHTML = 'number greater than...';
				break;
			case barmatz.forms.Validator.LESSER_THAN:
				label.innerHTML = 'number lesser than...';
				break;
			case barmatz.forms.Validator.DIGITS_ONLY:
				label.innerHTML = 'only digits';
				break;
			case barmatz.forms.Validator.NOT_DIGITS:
				label.innerHTML = 'not digits';
				break;
		}
		
		return {wrapper: wrapper, checkbox: checkbox}; 
	}},
	createFormFieldErrorMessageElement: {value: function()
	{
		return this.createElement('ul', 'forms-form-item-error-message');
	}},
	createFormFieldErrorMessageItemElement: {value: function(message)
	{
		barmatz.utils.DataTypes.isNotUndefined(message);
		barmatz.utils.DataTypes.isTypeOf(message, 'string');
		return this.createElementWithContent('li', 'forms-form-item-error-message-item', message);
	}},
	createHTMLContentEditorDialogWrapper: {value: function(confirmHandler, content)
	{
		var wrapper, dialog, editor;
		
		barmatz.utils.DataTypes.isNotUndefined(confirmHandler);
		barmatz.utils.DataTypes.isTypeOf(confirmHandler, 'function');
		barmatz.utils.DataTypes.isTypeOf(content, 'string', true);
		
		wrapper = this.createElement('div');
		dialog = this.createPromptDialog('HTML content editor', wrapper, confirmHandler, true);
		editor = this.createHTMLContentEditor(wrapper, content, onEditorInit);
		
		jQuery(dialog).dialog({dialogClass: 'forms-dialog-html-content-editor'});

		return {dialog: dialog, editor: editor};
		
		function onEditorInit()
		{
			setTimeout(function()
			{
				jQuery(dialog).dialog('close').dialog('open');
			},1);
		}
	}},
	createHTMLContentEditor: {value: function(parent, content, initHandler)
	{
		var editor, textArea;
		
		barmatz.utils.DataTypes.isNotUndefined(parent);
		barmatz.utils.DataTypes.isInstanceOf(parent, HTMLElement);
		barmatz.utils.DataTypes.isTypeOf(content, 'string', true);
		barmatz.utils.DataTypes.isTypeOf(initHandler, 'function', true);

		textArea = this.createElement('textarea');
		textArea.id = 'htmlContentEditor' + tinymce.editors.length;
		textArea.innerHTML = content || '';
		parent.appendChild(textArea);
		tinymce.init({
			selector: '#' + textArea.id, 
	        theme: 'modern',
			plugins: [
	        	'advlist autolink lists link image charmap print preview hr anchor pagebreak',
				'searchreplace wordcount visualblocks visualchars code fullscreen',
				'insertdatetime media nonbreaking save table contextmenu directionality',
				'emoticons template paste'
			],
			toolbar1: 'insertfile undo redo | styleselect | bold italic | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | link image',
			oninit: initHandler
		});
			
		return textArea;
	}},
	createLeadsFormsListElement: {value: function()
	{
		return this.createElement('ul');
	}},
	createLeadsFormsListItem: {value: function(model)
	{
		barmatz.utils.DataTypes.isNotUndefined(model);
		barmatz.utils.DataTypes.isInstanceOf(model, barmatz.forms.FormModel);
		return this.createElementWithContent('li', 'forms-leads-forms-list-item', model.name);
	}},
	createLeadsListWrapper: {value: function()
	{
		var options, table;
		
		options = new barmatz.forms.ui.TableOptions();
		options.headRowClassName = 'forms-leads-list-head';
		options.headColumns.push('Received', 'Referer', 'IP');
		
		table = this.createTable(options);
		
		return {wrapper: this.createElementWithContent('div', 'forms-leads-list-wrapper', table), table: table, body: table.getElementsByTagName('tbody')[0]};
	}},
	createLeadsListItem: {value: function(model, index)
	{
		barmatz.utils.DataTypes.isNotUndefined(model);
		barmatz.utils.DataTypes.isNotUndefined(index);
		barmatz.utils.DataTypes.isInstanceOf(model, barmatz.forms.LeadModel);
		barmatz.utils.DataTypes.isTypeOf(index, 'number');
		return this.createTableRow([barmatz.utils.Date.toString(model.created, 'dd/mm/yyyy hh:ii'), model.referer, model.ip], [], 'forms-leads-list-item ' + (index % 2 == 0 ? 'even' : 'odd'));
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
			case barmatz.forms.fields.FieldTypes.HTML_CONTENT:
				return new barmatz.forms.fields.HTMLContentModel();
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
			case barmatz.forms.fields.FieldTypes.PHONE:
				return new barmatz.forms.fields.PhoneFieldModel(name);
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
		barmatz.utils.DataTypes.isInstanceOf(fieldModel, barmatz.forms.fields.FormItemModel);
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
	}},
	createValidatorModel: {value: function(data)
	{
		barmatz.utils.DataTypes.isTypeOf(data, 'object', true);
		return new barmatz.forms.fields.ValidatorModel(data);
	}},
	createLeadModel: {value: function()
	{
		return new barmatz.forms.LeadModel();
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
/** barmatz.forms.Validator **/
window.barmatz.forms.Validator = function()
{
	barmatz.mvc.Model.call(this);
};

barmatz.forms.Validator.prototype = new barmatz.mvc.Model();
barmatz.forms.Validator.prototype.constructor = barmatz.forms.Validator;

Object.defineProperties(barmatz.forms.Validator,
{
	NONE: {value: 0X0},
	NOT_EMPTY: {value: 0X1},
	EQUALS: {value: 0x2},
	VALID_EMAIL: {value: 0x4},
	VALID_PHONE: {value: 0x8},
	MIN_LENGTH: {value: 0x10},
	MAX_LENGTH: {value: 0x20},
	EXACT_LENGTH: {value: 0x40},
	GREATER_THAN: {value: 0x80},
	LESSER_THAN: {value: 0x100},
	DIGITS_ONLY: {value: 0x200},
	NOT_DIGITS: {value: 0x400},
	trim: {value: function(string)
	{
		barmatz.utils.DataTypes.isNotUndefined(string);
		barmatz.utils.DataTypes.isTypeOf(string, 'string');
		return string.replace(/(^\s+|\s+$)/g, '');
	}},
	notEmpty: {value: function(value)
	{
		barmatz.utils.DataTypes.isNotUndefined(value);
		barmatz.utils.DataTypes.isTypeOf(value, 'string');
		return this.trim(value).length != 0;
	}},
	equals: {value: function(value, pattern)
	{
		barmatz.utils.DataTypes.isNotUndefined(value);
		barmatz.utils.DataTypes.isNotUndefined(pattern);
		barmatz.utils.DataTypes.isTypeOf(value, 'string');
		barmatz.utils.DataTypes.isTypesOrInstances(pattern, ['string'], [RegExp]);
		return new RegExp(pattern).test(value);
	}},
	validEmail: {value: function(value)
	{
		barmatz.utils.DataTypes.isNotUndefined(value);
		barmatz.utils.DataTypes.isTypeOf(value, 'string');
		return this.equals(value, /^[a-z0-9!#$%&'*+\/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+\/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+([a-z].+)\b$/);
	}},
	validPhone: {value: function(value)
	{
		barmatz.utils.DataTypes.isNotUndefined(value);
		barmatz.utils.DataTypes.isTypeOf(value, 'string');
		return this.equals(value, new RegExp('^(' + barmatz.forms.fields.PhonePrefixes.ALL.join('|') + ')[2-9][0-9]{6}$'));
	}},
	maxLength: {value: function(value, length)
	{
		barmatz.utils.DataTypes.isNotUndefined(value);
		barmatz.utils.DataTypes.isNotUndefined(length);
		barmatz.utils.DataTypes.isTypeOf(value, 'string');
		barmatz.utils.DataTypes.isTypeOf(length, 'number');
		return value.length <= length;
	}},
	minLength: {value: function(value, length)
	{
		barmatz.utils.DataTypes.isNotUndefined(value);
		barmatz.utils.DataTypes.isNotUndefined(length);
		barmatz.utils.DataTypes.isTypeOf(value, 'string');
		barmatz.utils.DataTypes.isTypeOf(length, 'number');
		return value.length >= length;
	}},
	exactLength: {value: function(value, length)
	{
		barmatz.utils.DataTypes.isNotUndefined(value);
		barmatz.utils.DataTypes.isNotUndefined(length);
		barmatz.utils.DataTypes.isTypeOf(value, 'string');
		barmatz.utils.DataTypes.isTypeOf(length, 'number');
		return value.length == length;
	}},
	greaterThan: {value: function(valueA, valueB)
	{
		barmatz.utils.DataTypes.isNotUndefined(valueA);
		barmatz.utils.DataTypes.isNotUndefined(valueB);
		barmatz.utils.DataTypes.isTypeOf(valueA, 'number');
		barmatz.utils.DataTypes.isTypeOf(valueB, 'number');
		return valueA > valueB;
	}},
	lesserThan: {value: function(valueA, valueB)
	{
		barmatz.utils.DataTypes.isNotUndefined(valueA);
		barmatz.utils.DataTypes.isNotUndefined(valueB);
		barmatz.utils.DataTypes.isTypeOf(valueA, 'number');
		barmatz.utils.DataTypes.isTypeOf(valueB, 'number');
		return valueA < valueB;
	}},
	digitsOnly: {value: function(value)
	{
		barmatz.utils.DataTypes.isNotUndefined(value);
		barmatz.utils.DataTypes.isTypeOf(value, 'string');
		return this.equals(value, /^\d*$/);
	}},
	notDigits: {value: function(value)
	{
		barmatz.utils.DataTypes.isNotUndefined(value);
		barmatz.utils.DataTypes.isTypeOf(value, 'string');
		return this.equals(value, /^\D*$/);
	}}
});
/** barmatz.forms.fields.FormItemModel **/
window.barmatz.forms.fields.FormItemModel = function(type)
{
	barmatz.utils.DataTypes.isNotUndefined(type);
	barmatz.utils.DataTypes.isTypeOf(type, 'string', true);
	barmatz.forms.TypeModel.call(this, type);
};

barmatz.forms.fields.FormItemModel.prototype = new barmatz.forms.TypeModel(null);
barmatz.forms.fields.FormItemModel.prototype.constructor = barmatz.forms.fields.FormItemModel;

Object.defineProperties(barmatz.forms.fields.FormItemModel.prototype, {});
/** barmatz.forms.fields.ValidatorModel **/
window.barmatz.forms.fields.ValidatorModel = function(data)
{
	var i;
	
	barmatz.utils.DataTypes.isTypeOf(data, 'object', true);
	barmatz.mvc.Model.call(this);
	this.set('code', barmatz.forms.Validator.NONE);

	if(data)
	{
		if(data.code)
			this.set('code', data.code);
		
		for(i in data)
			this[i] = data[i];
	}
};

barmatz.forms.fields.ValidatorModel.prototype = new barmatz.mvc.Model();
barmatz.forms.fields.ValidatorModel.prototype.constructor = barmatz.forms.fields.ValidatorModel;

Object.defineProperties(barmatz.forms.fields.ValidatorModel.prototype,
{
	code: {get: function()
	{
		return this.get('code');
	}, set: function(value)
	{
		barmatz.utils.DataTypes.isTypeOf(value, 'number');
		this.set('code', value);
	}},
	clone: {value: function()
	{
		var object, i;
		
		object = new barmatz.forms.fields.ValidatorModel();
		object.code = this.code;
		
		for(i in this)
			object[i] = this[i];
		
		return object;
	}},
	toJSON: {value: function()
	{
		var object, i;
		
		object = {code: this.code};
		
		for(i in this)
			if(typeof this[i] != 'function' && /^[^_]/.test(i))
				object[i] = this[i];
		
		return object;
	}}
});
/** barmatz.forms.fields.FieldModel **/
window.barmatz.forms.fields.FieldModel = function(type, name)
{
	barmatz.utils.DataTypes.isNotUndefined(type);
	barmatz.utils.DataTypes.isNotUndefined(name);
	barmatz.utils.DataTypes.isTypeOf(type, 'string', true);
	barmatz.utils.DataTypes.isTypeOf(name, 'string', true);
	barmatz.forms.fields.FormItemModel.call(this, type);
	this.set('name', name);
	this.set('label', '');
	this.set('mandatory', false);
	this.set('value', '');
	this.set('enabled', true);
	this.set('validator', barmatz.forms.factories.ModelFactory.createValidatorModel());
	this.set('width', NaN);
};

barmatz.forms.fields.FieldModel.prototype = new barmatz.forms.fields.FormItemModel(null);
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
	value: {get: function()
	{
		return this.get('value');
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
	availableValidators: {get: function()
	{
		return barmatz.forms.Validator.EQUALS +
			   barmatz.forms.Validator.VALID_EMAIL +
			   barmatz.forms.Validator.VALID_PHONE +
			   barmatz.forms.Validator.MIN_LENGTH +
			   barmatz.forms.Validator.MAX_LENGTH +
			   barmatz.forms.Validator.EXACT_LENGTH +
			   barmatz.forms.Validator.GREATER_THAN +
			   barmatz.forms.Validator.LESSER_THAN +
			   barmatz.forms.Validator.DIGITS_ONLY +
			   barmatz.forms.Validator.NOT_DIGITS;
	}},
	validator: {get: function()
	{
		return this.get('validator');
	}, set: function(value)
	{
		barmatz.utils.DataTypes.isInstanceOf(value, barmatz.forms.fields.ValidatorModel);
		this.set('validator', value);
	}},
	width: {get: function()
	{
		return this.get('width');
	}, set: function(value)
	{
		barmatz.utils.DataTypes.isTypeOf(value, 'number');
		this.set('width', value);
	}},
	validate: {value: function()
	{
		var errors, bits, i;
		
		errors = 0;
		
		if(this.mandatory)
			if(!barmatz.forms.Validator.notEmpty(this.value))
				errors = barmatz.utils.Bitwise.concat(errors, barmatz.forms.Validator.NOT_EMPTY);
		
		if(this.validator.code)
		{
			bits = barmatz.utils.Bitwise.parseBit(this.validator.code);
			
			for(i = 0; i < bits.length; i++)
				switch(bits[i])
				{
					default:
						throw new Error('Unknown validation code');
						break;
					case barmatz.forms.Validator.NONE:
					case barmatz.forms.Validator.NOT_EMPTY:
						break;
					case barmatz.forms.Validator.EQUALS:
						if(!barmatz.forms.Validator.equals(this.value, this.validator.equals))
							errors = barmatz.utils.Bitwise.concat(errors, barmatz.forms.Validator.EQUALS);
						break;
					case barmatz.forms.Validator.VALID_EMAIL:
						if(!barmatz.forms.Validator.validEmail(this.value))
							errors = barmatz.utils.Bitwise.concat(errors, barmatz.forms.Validator.VALID_EMAIL);
						break;
					case barmatz.forms.Validator.VALID_PHONE:
						if(!barmatz.forms.Validator.validPhone(this.value))
							errors = barmatz.utils.Bitwise.concat(errors, barmatz.forms.Validator.VALID_PHONE);
						break;
					case barmatz.forms.Validator.MIN_LENGTH:
						if(!barmatz.forms.Validator.minLength(this.value, this.validator.minLength))
							errors = barmatz.utils.Bitwise.concat(errors, barmatz.forms.Validator.MIN_LENGTH);
						break;
					case barmatz.forms.Validator.MAX_LENGTH:
						if(!barmatz.forms.Validator.maxLength(this.value, this.validator.maxLength))
							errors = barmatz.utils.Bitwise.concat(errors, barmatz.forms.Validator.MAX_LENGTH);
						break;
					case barmatz.forms.Validator.EXACT_LENGTH:
						if(!barmatz.forms.Validator.exactLength(this.value, this.validator.exactLength))
							errors = barmatz.utils.Bitwise.concat(errors, barmatz.forms.Validator.EXACT_LENGTH);
						break;
					case barmatz.forms.Validator.GREATER_THAN:
						if(!barmatz.forms.Validator.greaterThan(parseFloat(this.value), this.validator.greaterThan))
							errors = barmatz.utils.Bitwise.concat(errors, barmatz.forms.Validator.GREATER_THAN);
						break;
					case barmatz.forms.Validator.LESSER_THAN:
						if(!barmatz.forms.Validator.lesserThan(parseFloat(this.value), this.validator.lesserThan))
							errors = barmatz.utils.Bitwise.concat(errors, barmatz.forms.Validator.LESSER_THAN);
						break;
					case barmatz.forms.Validator.DIGITS_ONLY:
						if(!barmatz.forms.Validator.digitsOnly(this.value))
							errors = barmatz.utils.Bitwise.concat(errors, barmatz.forms.Validator.DIGITS_ONLY);
						break;
					case barmatz.forms.Validator.NOT_DIGITS:
						if(!barmatz.forms.Validator.notDigits(this.value))
							errors = barmatz.utils.Bitwise.concat(errors, barmatz.forms.Validator.NOT_DIGITS);
						break;
				}
		}
		
		if(errors > 0)
		{
			this.dispatchEvent(new barmatz.events.FieldModelEvent(barmatz.events.FieldModelEvent.INVALID, errors));
			return false;
		}
		else
		{
			this.dispatchEvent(new barmatz.events.FieldModelEvent(barmatz.events.FieldModelEvent.VALID));
			return true;
		}
			
	}},
	clone: {value: function()
	{
		var clone = new barmatz.forms.fields.FieldModel(this.type, this.name);
		clone.label = this.label;
		clone.mandatory = this.mandatory;
		clone.value = this.value;
		clone.enabled = this.enabled;
		clone.validator = this.validator.clone();
		clone.width = this.width;
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
	this.set('description', '');
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
	description: {get: function()
	{
		return this.get('description');
	}, set: function(value)
	{
		this.set('description', value);
	}},
	clone: {value: function()
	{
		var clone = new barmatz.forms.fields.TextFieldModel(this.name);
		clone.label = this.label;
		clone.mandatory = this.mandatory;
		clone.value = this.value;
		clone.enabled = this.enabled;
		clone.validator = this.validator.clone();
		clone.max = this.max;
		clone.description = this.description;
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
	value: {get: function()
	{
		return this.checked ? this.get('value') : '';
	}},
	clone: {value: function()
	{
		var clone = new barmatz.forms.fields.CheckboxFieldModel(this.name);
		clone.label = this.label;
		clone.mandatory = this.mandatory;
		clone.value = this.value;
		clone.enabled = this.enabled;
		clone.validator = this.validator.clone();
		clone.checked = this.checked;
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
/** barmatz.forms.fields.DropboxItemsListController **/
window.barmatz.forms.fields.DropboxItemsListController = function(model, view, addButtonView, resetButtonView)
{
	var cachedResetButtonViewDisplay, itemsDictionary, itemsDeleteButtonDictionary;
	
	barmatz.utils.DataTypes.isNotUndefined(model);
	barmatz.utils.DataTypes.isNotUndefined(view);
	barmatz.utils.DataTypes.isNotUndefined(addButtonView);
	barmatz.utils.DataTypes.isNotUndefined(resetButtonView);
	barmatz.utils.DataTypes.isInstanceOf(model, barmatz.forms.fields.DropboxModel);
	barmatz.utils.DataTypes.isInstanceOf(view, HTMLElement);
	barmatz.utils.DataTypes.isInstanceOf(addButtonView, HTMLElement);
	barmatz.utils.DataTypes.isInstanceOf(resetButtonView, HTMLElement);
	barmatz.forms.CollectionController.call(this);
	
	itemsDictionary = new barmatz.utils.Dictionary();
	itemsDeleteButtonDictionary = new barmatz.utils.Dictionary();
	
	model.forEach(function(item, index, collection)
	{
		addItem(item);
	});
	model.addEventListener(barmatz.events.CollectionEvent.ITEM_ADDED, onModelItemAdded);
	model.addEventListener(barmatz.events.CollectionEvent.ITEM_REMOVED, onModelItemRemoved);
	addButtonView.addEventListener('click', onAddButtonViewClick);
	resetButtonView.addEventListener('click', onResetButtonViewClick);

	if(model.numItems == 0)
		hideResetButtonView();
	
	function showResetButtonView()
	{
		resetButtonView.style.display = cachedResetButtonViewDisplay;
		cachedResetButtonViewDisplay = null;
	}
	
	function hideResetButtonView()
	{
		cachedResetButtonViewDisplay = resetButtonView.style.display;
		resetButtonView.style.display = 'none';
	}
	
	function addItem(itemModel)
	{
		var itemViewWrapper;
		
		barmatz.utils.DataTypes.isNotUndefined(itemModel);
		barmatz.utils.DataTypes.isInstanceOf(itemModel, barmatz.forms.fields.DropboxItemModel);
		
		itemViewWrapper = barmatz.forms.factories.DOMFactory.createDropboxItemsListItemWrapper(model.getItemIndex(itemModel));
		itemViewWrapper.deleteButton.addEventListener('click', onItemDeleteButtonClick);
		itemsDeleteButtonDictionary.add(itemViewWrapper.deleteButton, itemModel);
		itemsDictionary.add(itemModel, view.appendChild(itemViewWrapper.wrapper));
		barmatz.forms.factories.ControllerFactory.createDropboxItemsListItemController(itemModel, itemViewWrapper.labelElement, itemViewWrapper.valueElement, itemViewWrapper.editButton);
	}
	
	function removeItem(itemModel)
	{
		barmatz.utils.DataTypes.isNotUndefined(itemModel);
		barmatz.utils.DataTypes.isInstanceOf(itemModel, barmatz.forms.fields.DropboxItemModel);
		view.removeChild(itemsDictionary.get(itemModel));
	}
	
	function onItemDeleteButtonClick(event)
	{
		model.removeItem(itemsDeleteButtonDictionary.get(event.currentTarget));
	}
	
	function onModelItemAdded(event)
	{
		barmatz.utils.DataTypes.isNotUndefined(event);
		barmatz.utils.DataTypes.isInstanceOf(event, barmatz.events.CollectionEvent);
		addItem(event.item);
		
		if(model.numItems > 0 && resetButtonView.style.display == 'none')
			showResetButtonView();
	}
	
	function onModelItemRemoved(event)
	{
		barmatz.utils.DataTypes.isNotUndefined(event);
		barmatz.utils.DataTypes.isInstanceOf(event, barmatz.events.CollectionEvent);
		
		removeItem(event.item);

		if(model.numItems == 0)
			hideResetButtonView();
	}
	
	function onAddButtonViewClick(event)
	{
		barmatz.forms.factories.ControllerFactory.createJQueryDialogController(barmatz.forms.factories.DOMFactory.createDropboxItemDialog(null, null, onAddItemConfirm));
	}
	
	function onResetButtonViewClick(event)
	{
		while(model.numItems > 0)
			model.removeItemAt(model.numItems - 1);
	}
	
	function onAddItemConfirm(key, value)
	{
		barmatz.utils.DataTypes.isNotUndefined(key);
		barmatz.utils.DataTypes.isNotUndefined(value);
		barmatz.utils.DataTypes.isTypeOf(key, 'string');
		model.addItem(barmatz.forms.factories.ModelFactory.createDropboxItemModel(key, value));
	}
};

barmatz.forms.fields.DropboxItemsListController.prototype = new barmatz.forms.CollectionController();
barmatz.forms.fields.DropboxItemsListController.prototype.constructor = barmatz.forms.fields.DropboxItemsListController;
/** barmatz.forms.fields.DropboxItemsListItemController **/
window.barmatz.forms.fields.DropboxItemsListItemController = function(model, labelView, valueView, editButtonView)
{
	barmatz.utils.DataTypes.isNotUndefined(model);
	barmatz.utils.DataTypes.isNotUndefined(labelView);
	barmatz.utils.DataTypes.isNotUndefined(valueView);
	barmatz.utils.DataTypes.isNotUndefined(editButtonView);
	barmatz.utils.DataTypes.isInstanceOf(model, barmatz.forms.fields.DropboxItemModel);
	barmatz.utils.DataTypes.isInstanceOf(labelView, HTMLElement);
	barmatz.utils.DataTypes.isInstanceOf(valueView, HTMLElement);
	barmatz.utils.DataTypes.isInstanceOf(editButtonView, HTMLElement);
	barmatz.mvc.Controller.call(this);
	
	labelView.innerHTML = model.label;
	valueView.innerHTML = model.value;
	
	model.addEventListener(barmatz.events.ModelEvent.VALUE_CHANGED, onModelValueChanged);
	editButtonView.addEventListener('click', onEditButtonViewClick);
	
	function onModelValueChanged(event)
	{
		barmatz.utils.DataTypes.isNotUndefined(event);
		barmatz.utils.DataTypes.isInstanceOf(event, barmatz.events.ModelEvent);
		
		switch(event.key)
		{
			case 'label':
				labelView.innerHTML = event.value;
				break;
			case 'value':
				valueView.innerHTML = event.value;
				break;
		}
	}
	
	function onEditButtonViewClick(event)
	{
		barmatz.forms.factories.ControllerFactory.createJQueryDialogController(barmatz.forms.factories.DOMFactory.createDropboxItemDialog(model.label, model.value, onEditConfirm));
	}
	
	function onEditConfirm(label, value)
	{
		barmatz.utils.DataTypes.isNotUndefined(label);
		barmatz.utils.DataTypes.isNotUndefined(value);
		barmatz.utils.DataTypes.isTypeOf(label, 'string');
		barmatz.utils.DataTypes.isTypeOf(value, 'string');
		model.label = label;
		model.value = value;
	}
};

barmatz.forms.fields.DropboxItemsListItemController.prototype = new barmatz.mvc.Controller();
barmatz.forms.fields.DropboxItemsListItemController.prototype.constructor = barmatz.forms.fields.DropboxItemsListItemController;
/** barmatz.forms.fields.DropboxModel **/
window.barmatz.forms.fields.DropboxModel = function(name, items)
{
	var _this;
	
	barmatz.utils.DataTypes.isNotUndefined(name);
	barmatz.utils.DataTypes.isTypeOf(name, 'string', true);
	barmatz.utils.DataTypes.isInstanceOf(items, Array, true);
	barmatz.forms.fields.FieldModel.call(this, barmatz.forms.fields.FieldTypes.DROPBOX, name);
	
	_this = this;
	
	this.set('multiple', false);
	this.set('items', new barmatz.forms.CollectionModel());
	this.get('items').addEventListener(barmatz.events.CollectionEvent.ITEM_ADDED, onItemsItemAdded);
	this.get('items').addEventListener(barmatz.events.CollectionEvent.ITEM_REMOVED, onItemsItemRemoved);
	
	if(items)
		while(items.length > this.numItems)
			this.addItem(items[this.numItems]);
	
	function onItemsItemAdded(event)
	{
		_this.dispatchEvent(event);
	}
	
	function onItemsItemRemoved(event)
	{
		_this.dispatchEvent(event);
	}
};

barmatz.forms.fields.DropboxModel.prototype = new barmatz.forms.fields.FieldModel(null, null);
barmatz.forms.fields.DropboxModel.prototype.constructor = barmatz.forms.fields.DropboxModel;

Object.defineProperties(barmatz.forms.fields.DropboxModel.prototype,
{
	multiple: {get: function()
	{
		return this.get('multiple');
	}, set: function(value)
	{
		barmatz.utils.DataTypes.isTypeOf(value, 'boolean');
		this.set('multiple', value);
	}},
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
		clone.value = this.value;
		clone.enabled = this.enabled;
		clone.validator = this.validator.clone();
		clone.multiple = this.multiple;
		return clone;
	}},
	toString: {value: function()
	{
		return this.get('items').toString();
	}}
});
/** barmatz.forms.fields.FieldController **/
window.barmatz.forms.fields.FieldController = function(model, fieldView, errorMessageView)
{
	var settingValue, cachedErrorMessageVisibility, valueIsDescription;
	
	barmatz.utils.DataTypes.isNotUndefined(model);
	barmatz.utils.DataTypes.isNotUndefined(fieldView);
	barmatz.utils.DataTypes.isInstanceOf(model, barmatz.forms.fields.FieldModel);
	barmatz.utils.DataTypes.isInstanceOf(fieldView, HTMLElement);
	barmatz.utils.DataTypes.isInstanceOf(errorMessageView, HTMLElement, true);
	barmatz.mvc.Controller.call(this);
	
	model.addEventListener(barmatz.events.ModelEvent.VALUE_CHANGED, onModelValueChanged);
	model.addEventListener(barmatz.events.FieldModelEvent.VALID, onModelValid);
	model.addEventListener(barmatz.events.FieldModelEvent.INVALID, onModelInvalid);
	fieldView.addEventListener('focus', onFieldViewFocus);
	fieldView.addEventListener('keydown', onFieldViewKeyDown);
	fieldView.addEventListener('change', onFieldViewChange);
	setModelValue();
	addDescription();
	
	if(errorMessageView)
	{
		setErrorMessageContent();
		hideErrorMessage();
	}
	
	function addDescription()
	{
		if(model instanceof barmatz.forms.fields.TextFieldModel && !barmatz.forms.Validator.notEmpty(model.value))
		{
			fieldView.value = model.description;
			barmatz.utils.CSS.addClass(fieldView, 'forms-empty-field');
			valueIsDescription = true;
		}
	}
	
	function removeDescription()
	{
		if(valueIsDescription)
		{
			fieldView.value = '';
			barmatz.utils.CSS.removeClass(fieldView, 'forms-empty-field');
			valueIsDescription = false;
		}
	}
	
	function setModelValue()
	{
		if(!settingValue)
		{
			settingValue = true;
			
			if(model instanceof barmatz.forms.fields.PhoneFieldModel)
				model.value = fieldView.getElementsByTagName('select')[0].value + fieldView.getElementsByTagName('input')[0].value;
			else if(model instanceof barmatz.forms.fields.CheckboxFieldModel)
				model.checked = fieldView.checked;
			else
				model.value = fieldView.value;
			
			model.validate();
			
			settingValue = false;
		}

		fieldView.addEventListener('keydown', onFieldViewKeyDown);
		fieldView.removeEventListener('keyup', onFieldViewKeyUp);
	}
	
	function setErrorMessageContent()
	{
		if(errorMessageView)
			errorMessageView.innerHTML = 'invalid';
	}
	
	function showErrorMessage()
	{
		if(errorMessageView)
		{
			errorMessageView.style.visibility = cachedErrorMessageVisibility;
			cachedErrorMessageVisibility = null;
		}
	}
	
	function hideErrorMessage()
	{
		if(errorMessageView)
		{
			cachedErrorMessageVisibility = errorMessageView.style.visibility;
			errorMessageView.style.visibility = 'hidden';
		}
	}
	
	function isErrorMessageHidden()
	{
		return errorMessageView && errorMessageView.style.visibility == 'hidden';
	}
	
	function onModelValueChanged(event)
	{
		barmatz.utils.DataTypes.isNotUndefined(event);
		barmatz.utils.DataTypes.isInstanceOf(event, barmatz.events.ModelEvent);

		switch(event.key)
		{
			case 'value':
				if(!settingValue)
				{
					settingValue = true;
					fieldView.value = model.value;
					settingValue = false;
				}
				break;
			case 'description':
				addDescription();
				break;
		}
	}
	
	function onModelValid(event)
	{
		barmatz.utils.DataTypes.isNotUndefined(event);
		barmatz.utils.DataTypes.isInstanceOf(event, barmatz.events.FieldModelEvent);

		if(!isErrorMessageHidden())
			hideErrorMessage();
	}
	
	function onModelInvalid(event)
	{
		var errors, i;
		
		barmatz.utils.DataTypes.isNotUndefined(event);
		barmatz.utils.DataTypes.isInstanceOf(event, barmatz.events.FieldModelEvent);
		
		if(errorMessageView)
		{
			errors = barmatz.utils.Bitwise.parseBit(event.errors);
			errorMessageView.innerHTML = '';
			
			for(i = 0; i < errors.length; i++)
				switch(errors[i])
				{
					default:
						throw new Error('Unknown error code');
					break;
					case barmatz.forms.Validator.NONE:
						break;
					case barmatz.forms.Validator.NOT_EMPTY:
						errorMessageView.appendChild(barmatz.forms.factories.DOMFactory.createFormFieldErrorMessageItemElement(barmatz.forms.Language.form.field.errors.emptyValue));
						break;
					case barmatz.forms.Validator.EQUALS:
						errorMessageView.appendChild(barmatz.forms.factories.DOMFactory.createFormFieldErrorMessageItemElement(barmatz.forms.Language.form.field.errors.invalidValue));
						break;
					case barmatz.forms.Validator.VALID_EMAIL:
						errorMessageView.appendChild(barmatz.forms.factories.DOMFactory.createFormFieldErrorMessageItemElement(barmatz.forms.Language.form.field.errors.invalidEmail));
						break;
					case barmatz.forms.Validator.VALID_PHONE:
						errorMessageView.appendChild(barmatz.forms.factories.DOMFactory.createFormFieldErrorMessageItemElement(barmatz.forms.Language.form.field.errors.invalidPhone));
						break;
					case barmatz.forms.Validator.MIN_LENGTH:
						errorMessageView.appendChild(barmatz.forms.factories.DOMFactory.createFormFieldErrorMessageItemElement(barmatz.forms.Language.form.field.errors.minimumLength.replace(/\$\{1\}/, model.validator.minLength)));
						break;
					case barmatz.forms.Validator.MAX_LENGTH:
						errorMessageView.appendChild(barmatz.forms.factories.DOMFactory.createFormFieldErrorMessageItemElement(barmatz.forms.Language.form.field.errors.maximumLength.replace(/\$\{1\}/, model.validator.maxLength)));
						break;
					case barmatz.forms.Validator.EXACT_LENGTH:
						errorMessageView.appendChild(barmatz.forms.factories.DOMFactory.createFormFieldErrorMessageItemElement(barmatz.forms.Language.form.field.errors.exactLength.replace(/\$\{1\}/, model.validator.exactLength)));
						break;
					case barmatz.forms.Validator.GREATER_THAN:
						errorMessageView.appendChild(barmatz.forms.factories.DOMFactory.createFormFieldErrorMessageItemElement(barmatz.forms.Language.form.field.errors.greaterThan.replace(/\$\{1\}/, model.validator.greaterThan)));
						break;
					case barmatz.forms.Validator.LESSER_THAN:
						errorMessageView.appendChild(barmatz.forms.factories.DOMFactory.createFormFieldErrorMessageItemElement(barmatz.forms.Language.form.field.errors.lesserThan.replace(/\$\{1\}/, model.validator.lesserThan)));
						break;
					case barmatz.forms.Validator.DIGITS_ONLY:
						errorMessageView.appendChild(barmatz.forms.factories.DOMFactory.createFormFieldErrorMessageItemElement(barmatz.forms.Language.form.field.errors.digitsOnly));
						break;
					case barmatz.forms.Validator.NOT_DIGITS:
						errorMessageView.appendChild(barmatz.forms.factories.DOMFactory.createFormFieldErrorMessageItemElement(barmatz.forms.Language.form.field.errors.noDigits));
						break;
				}
			
			if(isErrorMessageHidden())
				showErrorMessage();
		}
	}
	
	function onFieldViewFocus(event)
	{
		fieldView.removeEventListener('focus', onFieldViewFocus);
		fieldView.addEventListener('blur', onFieldViewBlur);
		removeDescription();
	}
	
	function onFieldViewBlur(event)
	{
		fieldView.addEventListener('focus', onFieldViewFocus);
		fieldView.removeEventListener('blur', onFieldViewBlur);
		addDescription();
	}
	
	function onFieldViewKeyDown(event)
	{
		fieldView.removeEventListener('keydown', onFieldViewKeyDown);
		fieldView.addEventListener('keyup', onFieldViewKeyUp);
	}
	
	function onFieldViewChange(event)
	{
		setModelValue();
	}
	
	function onFieldViewKeyUp(event)
	{
		setModelValue();
	}
};

barmatz.forms.fields.FieldController.prototype = new barmatz.mvc.Controller();
barmatz.forms.fields.FieldController.prototype.constructor = barmatz.forms.fields.FieldController;
/** barmatz.forms.fields.FieldTypes **/
window.barmatz.forms.fields.FieldTypes = function(){};

Object.defineProperties(barmatz.forms.fields.FieldTypes,
{
	HTML_CONTENT: {value: 'htmlContent'},
	TEXT_AREA: {value: 'textArea'},
	TEXT_FIELD: {value: 'textField'},
	DROPBOX: {value: 'dropbox'},
	PASSWORD: {value: 'password'},
	CHECKBOX: {value: 'checkbox'},
	RADIO: {value: 'radio'},
	FILE: {value: 'file'},
	HIDDEN: {value: 'hidden'},
	PHONE: {value: 'phone'}
});
/** barmatz.forms.fields.FieldValidationOptionsController **/
window.barmatz.forms.fields.FieldValidationOptionsController = function(model, options)
{
	barmatz.utils.DataTypes.isNotUndefined(model);
	barmatz.utils.DataTypes.isNotUndefined(options);
	barmatz.utils.DataTypes.isInstanceOf(model, barmatz.forms.fields.FieldModel);
	barmatz.utils.DataTypes.isTypeOf(options, 'object');
	barmatz.mvc.Controller.call(this);
	
	initOptions();
	
	function initOptions()
	{
		var i;
		for(i in options)
			initOption(options[i], parseInt(i));
	}
	
	function initOption(option, bit)
	{
		barmatz.utils.DataTypes.isNotUndefined(option);
		barmatz.utils.DataTypes.isNotUndefined(bit);
		barmatz.utils.DataTypes.isInstanceOf(option, HTMLInputElement);
		barmatz.utils.DataTypes.isTypeOf(bit, 'number');

		option.addEventListener('change', onOptionChange);
		
		if(barmatz.utils.Bitwise.contains(model.validator.code, bit))
			option.checked = true;
		
		if(model instanceof barmatz.forms.fields.PhoneFieldModel && barmatz.utils.Bitwise.contains(model.validator.code, barmatz.forms.Validator.VALID_PHONE))
			option.disabled = true;
	}
	
	function changeModelByOption(option, bit)
	{
		barmatz.utils.DataTypes.isNotUndefined(option);
		barmatz.utils.DataTypes.isNotUndefined(bit);
		barmatz.utils.DataTypes.isInstanceOf(option, HTMLInputElement);
		barmatz.utils.DataTypes.isTypeOf(bit, 'number');
		
		switch(bit)
		{
			case barmatz.forms.Validator.EQUALS:
				getOptionParameters(option, 'Equals to', 'equals');
				break;
			case barmatz.forms.Validator.EXACT_LENGTH:
				getOptionParameters(option, 'Exact length', 'exactLength', true);
				break;
			case barmatz.forms.Validator.MAX_LENGTH:
				getOptionParameters(option, 'Maximum length', 'maxLength', true);
				break;
			case barmatz.forms.Validator.MIN_LENGTH:
				getOptionParameters(option, 'Minimum length', 'minLength', true);
				break;
			case barmatz.forms.Validator.GREATER_THAN:
				getOptionParameters(option, 'Greater than', 'greaterThan', true);
				break;
			case barmatz.forms.Validator.LESSER_THAN:
				getOptionParameters(option, 'Lesser than', 'lesserThan', true);
				break;
		}

		if(option.checked)
		{
			if(model.validator.code)
				bit = barmatz.utils.Bitwise.concat(model.validator.code, bit);
		}
		else
			bit = barmatz.utils.Bitwise.slice(model.validator.code, bit); 
		
		model.validator.code = bit; 
	}
	
	function getOptionParameters(option, label, key, isNumber)
	{
		var dialogWrapper, field;
		
		barmatz.utils.DataTypes.isNotUndefined(option);
		barmatz.utils.DataTypes.isNotUndefined(label);
		barmatz.utils.DataTypes.isNotUndefined(key);
		barmatz.utils.DataTypes.isInstanceOf(option, HTMLInputElement);
		barmatz.utils.DataTypes.isTypeOf(label, 'string');
		barmatz.utils.DataTypes.isTypeOf(key, 'string');
		
		if(option.checked)
		{
			dialogWrapper = barmatz.forms.factories.DOMFactory.createChangePropertyPromptDialogWrapper('', label, model.validator[key] || '', function(event)
			{
				model.validator[key] = isNumber ? parseFloat(field.value) : field.value;
			}, true);
			field = dialogWrapper.field;
			barmatz.forms.factories.ControllerFactory.createJQueryDialogController(dialogWrapper.dialog);
		}
		else
			delete model.validator[key];
	}
	
	function onOptionChange(event)
	{
		var i;
		
		barmatz.utils.DataTypes.isNotUndefined(event);
		barmatz.utils.DataTypes.isInstanceOf(event, Event);
		
		for(i in options)
			if(options[i] == event.currentTarget)
				changeModelByOption(options[i], parseInt(i));
	}
};

barmatz.forms.fields.FieldValidationOptionsController.prototype = new barmatz.mvc.Controller();
barmatz.forms.fields.FieldValidationOptionsController.prototype.constructor = barmatz.forms.fields.FieldValidationOptionsController;
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
		clone.value = this.value;
		clone.enabled = this.enabled;
		clone.validator = this.validator.clone();
		clone.accept = this.accept;
		return clone;
	}}
});
/** barmatz.forms.fields.HTMLContentModel **/
window.barmatz.forms.fields.HTMLContentModel = function()
{
	barmatz.forms.fields.FormItemModel.call(this, barmatz.forms.fields.FieldTypes.HTML_CONTENT);
	this.set('content', '');
};

barmatz.forms.fields.HTMLContentModel.prototype = new barmatz.forms.fields.FormItemModel(null);
barmatz.forms.fields.HTMLContentModel.prototype.constructor = barmatz.forms.fields.HTMLContentModel;

Object.defineProperties(barmatz.forms.fields.HTMLContentModel.prototype,
{
	content: {get: function()
	{
		return this.get('content');
	}, set: function(value)
	{
		this.set('content', value);
	}},
	clone: {value: function()
	{
		var clone = new barmatz.forms.fields.HTMLContentModel();
		clone.type = this.type;
		clone.content = this.content;
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
		clone.value = this.value;
		clone.enabled = this.enabled;
		clone.validator = this.validator.clone();
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
		clone.value = this.value;
		clone.enabled = this.enabled;
		clone.validator = this.validator.clone();
		clone.max = this.max;
		clone.description = this.description;
		return clone;
	}}
});
/** barmatz.forms.fields.PhoneFieldModel **/
window.barmatz.forms.fields.PhoneFieldModel = function(name)
{
	barmatz.utils.DataTypes.isNotUndefined(name);
	barmatz.utils.DataTypes.isTypeOf(name, 'string', true);
	barmatz.forms.fields.FieldModel.call(this, barmatz.forms.fields.FieldTypes.PHONE, name);
	this.validator.code = barmatz.forms.Validator.VALID_PHONE; 
	this.set('prefix', '');
};

barmatz.forms.fields.PhoneFieldModel.prototype = new barmatz.forms.fields.FieldModel(null, null);
barmatz.forms.fields.PhoneFieldModel.prototype.constructor = barmatz.forms.fields.PhoneFieldModel;

Object.defineProperties(barmatz.forms.fields.PhoneFieldModel.prototype,
{
	prefix: {get: function()
	{
		return this.get('prefix');
	}},
	value: {get: function()
	{
		return this.get('value');
	}, set: function(value)
	{
		var prefixes, prefixesRegex, maxLength;
		
		barmatz.utils.DataTypes.isTypeOf(value, 'string', true);
		
		prefixes = [];
		
		barmatz.forms.fields.PhonePrefixes.forEach(function(prefix)
		{
			prefixes.push(prefix);
		});
		
		prefixesRegex = '^(' + prefixes.join('|') + ')';
		
		if(new RegExp(prefixesRegex).test(value))
			this.set('prefix', value.replace(new RegExp(prefixesRegex + '.+$'), '$1'));
		else
			this.set('prefix', '');
		
		maxLength = value.length + this.prefix.length;
		
		if(maxLength > 7)
			value = value.substring(0, maxLength);
		
		this.set('value', value);
	}},
	clone: {value: function()
	{
		var clone = new barmatz.forms.fields.PhoneFieldModel(this.name);
		clone.label = this.label;
		clone.mandatory = this.mandatory;
		clone.value = this.value;
		clone.enabled = this.enabled;
		clone.validator = this.validator.clone();
		return clone;
	}}
});
/** barmatz.forms.fields.PhonePrefixes **/
window.barmatz.forms.fields.PhonePrefixes = function(){};

Object.defineProperties(barmatz.forms.fields.PhonePrefixes,
{
	ALL: {value: [
		'02', '03', '04', '08', '09', 
		'050', '052', '053', '054', '055', '056', '057', '058', '059', 
		'072', '073', '074', '075', '076', '077', '078'
	]},
	forEach: {value: function(callback)
	{
		var i;
		
		barmatz.utils.DataTypes.isNotUndefined(callback);
		barmatz.utils.DataTypes.isTypeOf(callback, 'function');
		
		for(i = 0; i < this.ALL.length; i++)
			callback(this.ALL[i]);
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
		clone.value = this.value;
		clone.enabled = this.enabled;
		clone.validator = this.validator.clone();
		clone.checked = this.checked;
		return clone;
	}}
});
/** barmatz.forms.fields.TextAreaFieldModel **/
window.barmatz.forms.fields.TextAreaFieldModel = function(name)
{
	barmatz.utils.DataTypes.isNotUndefined(name);
	barmatz.utils.DataTypes.isTypeOf(name, 'string', true);
	barmatz.forms.fields.FieldModel.call(this, barmatz.forms.fields.FieldTypes.TEXT_AREA, name);
	this.set('rows', 2);
	this.set('cols', 20);
};

barmatz.forms.fields.TextAreaFieldModel.prototype = new barmatz.forms.fields.FieldModel(null, null);
barmatz.forms.fields.TextAreaFieldModel.prototype.constructor = barmatz.forms.fields.TextAreaFieldModel;

Object.defineProperties(barmatz.forms.fields.TextAreaFieldModel.prototype,
{
	rows: {get: function()
	{
		return this.get('rows');
	}, set: function(value)
	{
		this.set('rows', value);
	}},
	cols: {get: function()
	{
		return this.get('cols');
	}, set: function(value)
	{
		this.set('cols', value);
	}},
	clone: {value: function()
	{
		var clone = new barmatz.forms.fields.TextAreaFieldModel(this.name);
		clone.label = this.label;
		clone.mandatory = this.mandatory;
		clone.value = this.value;
		clone.enabled = this.enabled;
		clone.validator = this.validator.clone();
		clone.rows = this.rows;
		clone.cols = this.cols;
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
	var dialogWrapper, loadingDialog;
	
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
		addMenuItem('Logout', onMenuLogoutClick);
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
		addToolboxItem(barmatz.forms.fields.FieldTypes.HTML_CONTENT, 'HTML content');
		addToolboxItem(barmatz.forms.fields.FieldTypes.TEXT_FIELD, 'Text field');
		addToolboxItem(barmatz.forms.fields.FieldTypes.TEXT_AREA, 'Text area');
		addToolboxItem(barmatz.forms.fields.FieldTypes.PASSWORD, 'Password field');
		addToolboxItem(barmatz.forms.fields.FieldTypes.CHECKBOX, 'Checkbox field');
		//addToolboxItem(barmatz.forms.fields.FieldTypes.RADIO, 'Radio field');
		addToolboxItem(barmatz.forms.fields.FieldTypes.DROPBOX, 'Dropbox field');
		addToolboxItem(barmatz.forms.fields.FieldTypes.PHONE, 'Phone field');
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
		barmatz.forms.factories.ControllerFactory.createJQueryDialogController(barmatz.forms.factories.DOMFactory.createAlertPromptDialog(title, message, true));
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
	
	function createRenamePrompt(title, label, value, confirmHandler)
	{
		dialogWrapper = barmatz.forms.factories.DOMFactory.createChangePropertyPromptDialogWrapper(title, label, value, confirmHandler, true);
		formRenameField = dialogWrapper.field;
		barmatz.forms.factories.ControllerFactory.createJQueryDialogController(dialogWrapper.dialog);
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
		createRenamePrompt('New form', 'Name', formModel.name, onResetFromConfirm);
	}
	
	function onMenuSaveClick(event)
	{
		formModel.save(userModel);
	}
	
	function onMenuSaveAsClick(event)
	{
		createRenamePrompt('Save as', 'Form name', formModel.name, onSaveFromAsConfirm);
	}
	
	function onMenuLoadClick(event)
	{
		var dialog = barmatz.forms.factories.DOMFactory.createUserFormsListDialog();
		barmatz.forms.factories.ControllerFactory.createJQueryDialogController(dialog);
		barmatz.forms.factories.ControllerFactory.createUserFormsListController(formModel, userModel, dialog.getElementsByTagName('tbody')[0], dialog);
	}
	
	function onMenuRenameClick(event)
	{
		createRenamePrompt('Rename form', 'Name', formModel.name, onRenameFromConfirm);
	}
	
	function onMenuExportClick(event)
	{
		var dialog;
		
		if(barmatz.utils.DataTypes.applySilent('isValid', formModel.fingerprint))
			dialog = barmatz.forms.factories.DOMFactory.createExportPromptDialog(formModel.fingerprint, 'Loading...', true);
		else
			dialog = barmatz.forms.factories.DOMFactory.createAlertPromptDialog('Failed to export', 'You must save the form before exporting!', true);
		
		barmatz.forms.factories.ControllerFactory.createJQueryDialogController(dialog);
	}
	
	function onMenuDeleteClick(event)
	{
		barmatz.forms.factories.ControllerFactory.createJQueryDialogController(barmatz.forms.factories.DOMFactory.createConfirmPromptDialog('Are you sure you want to delete this form?', onDeleteFormConfirm, true));
	}
	
	function onMenuPropertiesClick(event)
	{
		var wrapper = barmatz.forms.factories.DOMFactory.createFormPropertiesDialogWrapper(formModel, onChangeFormPropertiesConfirm, true);
		
		barmatz.forms.factories.ControllerFactory.createJQueryDialogController(wrapper.dialog);
		
		function onChangeFormPropertiesConfirm(event)
		{
			formModel.name = wrapper.nameField.value;
			formModel.method = wrapper.methodField.value;
			formModel.encoding = wrapper.encodingField.value;
			formModel.submitButtonLabel = wrapper.submitButtonLabelField.value;
			formModel.direction = wrapper.directionField.value;
			formModel.stylesheets = wrapper.stylesheetsField.value.replace(/\s+/, ' ').split(' ');
			formModel.targetEmail = wrapper.targetEmailField.value;
			formModel.layoutId = parseInt(wrapper.layoutIdField.value);
			formModel.language = wrapper.languageField.value;
		}
	}
	
	function onMenuLogoutClick(event)
	{
		barmatz.forms.factories.ControllerFactory.createJQueryDialogController(
			barmatz.forms.factories.DOMFactory.createPromptDialog('Logout', 'Are you sure you want to logout?', onLogoutConfrim, true)
		);
	}
	
	function onLogoutConfrim(event)
	{
		userModel.addEventListener(barmatz.events.UserModelEvent.LOGOUT_SUCCESS, onUserModelLogoutSuccess);
		userModel.addEventListener(barmatz.events.UserModelEvent.LOGOUT_FAIL, onUserModelLogoutFail);
		userModel.logout();
	}
	
	function onUserModelLogoutSuccess(event)
	{
		userModel.removeEventListener(barmatz.events.UserModelEvent.LOGOUT_SUCCESS, onUserModelLogoutSuccess);
		userModel.removeEventListener(barmatz.events.UserModelEvent.LOGOUT_FAIL, onUserModelLogoutFail);
		barmatz.forms.factories.ControllerFactory.createJQueryDialogController(
			barmatz.forms.factories.DOMFactory.createAlertPromptDialog('Logout', 'You have successfully logged out', true)
		);
		location.href = barmatz.forms.Config.BASE_URL + '/login.php';
	}
	
	function onUserModelLogoutFail(event)
	{
		barmatz.forms.factories.ControllerFactory.createJQueryDialogController(
			barmatz.forms.factories.DOMFactory.createAlertPromptDialog('Logout', 'An error has occurred, please try again', true)
		);
	}
	
	function onDeleteFormConfirm(event)
	{
		addFromModelDeleteEventListeners();
		formModel.deleteForm();
		formModel.reset();
		formModel.name = 'Unnamed form';
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
/** barmatz.forms.ui.JQueryDialogController **/
window.barmatz.forms.ui.JQueryDialogController = function(view)
{
	barmatz.utils.DataTypes.isNotUndefined(view);
	barmatz.utils.DataTypes.isInstanceOf(view, HTMLElement);
	barmatz.mvc.Controller.call(this);
	
	$view = jQuery(view);
	window.addEventListener('resize', onWindowResize);
	
	function onWindowResize(event)
	{
		try
		{
			if($view.dialog('isOpen'))
				$view.dialog('close').dialog('open');
		}
		catch(error){}
	}
};

barmatz.forms.ui.JQueryDialogController.prototype = new barmatz.mvc.Controller();
barmatz.forms.ui.JQueryDialogController.prototype.constructor = barmatz.forms.ui.JQueryDialogController;
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
/** barmatz.forms.ui.Leads **/
window.barmatz.forms.ui.Leads = function()
{
	var userModel, formsListModel, formsListView, leadsListModel, leadsListWrapper;
	
	initFormsList();
	initLeadsList();
	initUserModel();
	initController();
	
	function initFormsList()
	{
		formsListModel = barmatz.forms.factories.ModelFactory.createCollectionModel();
		formsListView = barmatz.forms.factories.DOMFactory.createLeadsFormsListElement();
		barmatz.forms.factories.ControllerFactory.createLeadsFormsListController(formsListModel, formsListView);
	}
	
	function initLeadsList()
	{
		leadsListModel = barmatz.forms.factories.ModelFactory.createCollectionModel();
		leadsListWrapper = barmatz.forms.factories.DOMFactory.createLeadsListWrapper();
		barmatz.forms.factories.ControllerFactory.createLeadsListController(leadsListModel, leadsListWrapper.body);
	}
	
	function initUserModel()
	{
		userModel = barmatz.forms.factories.ModelFactory.createUserModel();
	}
	
	function initController()
	{
		barmatz.forms.factories.ControllerFactory.createLeadsController(
			userModel, formsListModel, formsListView, leadsListModel, leadsListWrapper.wrapper, leadsListWrapper.table, barmatz.forms.factories.DOMFactory.BODY_ELEMENT,
			barmatz.forms.factories.DOMFactory.createPanels([
 				barmatz.forms.factories.ModelFactory.createPanelModel('forms-leads-forms-list-panel', formsListView),
 				barmatz.forms.factories.ModelFactory.createPanelModel('forms-leads-list-panel', leadsListWrapper.wrapper)
 			])
		);
	}
};
/** barmatz.forms.ui.LeadsController **/
window.barmatz.forms.ui.LeadsController = function(userModel, formsListModel, formsListView, leadsListModel, leadsListWrapperView, leadsListView, containerView, panelsView)
{
	var formsListDictionary, loadingDialog;
	
	barmatz.utils.DataTypes.isNotUndefined(userModel);
	barmatz.utils.DataTypes.isNotUndefined(formsListModel);
	barmatz.utils.DataTypes.isNotUndefined(formsListView);
	barmatz.utils.DataTypes.isNotUndefined(leadsListModel);
	barmatz.utils.DataTypes.isNotUndefined(leadsListWrapperView);
	barmatz.utils.DataTypes.isNotUndefined(leadsListView);
	barmatz.utils.DataTypes.isNotUndefined(containerView);
	barmatz.utils.DataTypes.isNotUndefined(panelsView);
	barmatz.utils.DataTypes.isInstanceOf(userModel, barmatz.forms.users.UserModel);
	barmatz.utils.DataTypes.isInstanceOf(formsListModel, barmatz.forms.CollectionModel);
	barmatz.utils.DataTypes.isInstanceOf(leadsListModel, barmatz.forms.CollectionModel);
	barmatz.utils.DataTypes.isInstanceOf(leadsListWrapperView, HTMLElement);
	barmatz.utils.DataTypes.isInstanceOf(leadsListView, HTMLElement);
	barmatz.utils.DataTypes.isInstanceOf(containerView, HTMLElement);
	barmatz.utils.DataTypes.isInstanceOf(panelsView, HTMLElement);
	barmatz.mvc.Controller.call(this);
	
	formsListDictionary = new barmatz.utils.Dictionary();
	
	addUserModelListeners();
	formsListModel.addEventListener(barmatz.events.CollectionEvent.ITEM_ADDED, onFormsListModelItemAdded);
	formsListModel.addEventListener(barmatz.events.CollectionEvent.ITEM_REMOVED, onFormsListModelItemRemoved);
	leadsListModel.addEventListener(barmatz.events.CollectionEvent.ITEM_ADDED, onLeadsListModelItemAdded);
	leadsListModel.addEventListener(barmatz.events.CollectionEvent.ITEM_REMOVED, onLeadsListModelItemRemoved);
	addLoadingDialog();
	userModel.getForms();
	containerView.appendChild(panelsView);
	emptyLeadsListView();
	
	function alertError(message)
	{
		barmatz.forms.factories.ControllerFactory.createJQueryDialogController(
			barmatz.forms.factories.DOMFactory.createAlertPromptDialog('Error', message, true)
		);
	}
	
	function addLoadingDialog()
	{
		loadingDialog = barmatz.forms.factories.DOMFactory.createLoadingDialog();
	}
	 
	function removeLoadingDialog()
	{
		barmatz.forms.factories.DOMFactory.destroyLoadingDialog(loadingDialog);
		loadingDialog = null;
	}
	
	function populateLeadsListView()
	{
		leadsListWrapperView.innerHTML = '';
		leadsListWrapperView.appendChild(leadsListView);
	}
	
	function emptyLeadsListModel()
	{
		var i;
		for(i = leadsListModel.numItems; i > 0; i--)
			leadsListModel.removeItemAt(i - 1);
	}
	
	function emptyLeadsListView()
	{
		leadsListWrapperView.innerHTML = 'No form selected';
	}
	
	function loadLead(model)
	{
		barmatz.utils.DataTypes.isNotUndefined(model);
		barmatz.utils.DataTypes.isInstanceOf(model, barmatz.forms.FormModel);
		emptyLeadsListModel();
		addFormModelListeners(model);
		addLoadingDialog();
		model.getLeads();
	}
	
	function addUserModelListeners()
	{
		userModel.addEventListener(barmatz.events.UserModelEvent.GET_FORMS_SUCCESS, onUserModelGetFormsSuccess);
		userModel.addEventListener(barmatz.events.UserModelEvent.GET_FORMS_FAIL, onUserModelGetFormsFail);
	}
	
	function removeUserModelListeners()
	{
		userModel.removeEventListener(barmatz.events.UserModelEvent.GET_FORMS_SUCCESS, onUserModelGetFormsSuccess);
		userModel.removeEventListener(barmatz.events.UserModelEvent.GET_FORMS_FAIL, onUserModelGetFormsFail);
	}
	
	function addFormModelListeners(model)
	{
		barmatz.utils.DataTypes.isNotUndefined(model);
		barmatz.utils.DataTypes.isInstanceOf(model, barmatz.forms.FormModel);
		model.addEventListener(barmatz.events.FormModelEvent.GET_LEADS_SUCCESS, onFormModelGetLeadsSuccess);
		model.addEventListener(barmatz.events.FormModelEvent.GET_LEADS_FAIL, onFormModelGetLeadsFail);
	}
	
	function removeFormModelListeners(model)
	{
		barmatz.utils.DataTypes.isNotUndefined(model);
		barmatz.utils.DataTypes.isInstanceOf(model, barmatz.forms.FormModel);
		model.removeEventListener(barmatz.events.FormModelEvent.GET_LEADS_SUCCESS, onFormModelGetLeadsSuccess);
		model.removeEventListener(barmatz.events.FormModelEvent.GET_LEADS_FAIL, onFormModelGetLeadsFail);
	}
	
	function onLeadsListModelItemAdded(event)
	{
		populateLeadsListView();
	}
	
	function onLeadsListModelItemRemoved(event)
	{
		if(leadsListModel.numItems == 0)
			emptyLeadsListView();
	}
	
	function onFormsListModelItemAdded(event)
	{
		var element;
		
		barmatz.utils.DataTypes.isNotUndefined(event);
		barmatz.utils.DataTypes.isInstanceOf(event, barmatz.events.CollectionEvent);
		
		element = formsListView.childNodes[event.index];
		
		formsListDictionary.add(event.item, element);
		element.addEventListener('click', onFormsListItemClick);
	}
	
	function onFormsListModelItemRemoved(event)
	{
		barmatz.utils.DataTypes.isNotUndefined(event);
		barmatz.utils.DataTypes.isInstanceOf(event, barmatz.events.CollectionEvent);
		
		formsListDictionary.get(event.item).removeEventListener('click', onFormsListItemClick);
		formsListDictionary.remove(event.item);
	}
	
	function onFormsListItemClick(event)
	{
		loadLead(formsListDictionary.find(event.target));
	}
	
	function onUserModelGetFormsSuccess(event)
	{
		var i;
		
		barmatz.utils.DataTypes.isNotUndefined(event);
		barmatz.utils.DataTypes.isInstanceOf(event, barmatz.events.UserModelEvent);
		
		removeUserModelListeners();
		removeLoadingDialog();
		
		for(i = 0; i < event.forms.length; i++)
			formsListModel.addItem(event.forms[i]);
	}
	
	function onUserModelGetFormsFail(event)
	{
		removeUserModelListeners();
		removeLoadingDialog();
		alertError('Error getting user forms');
	}
	
	function onFormModelGetLeadsSuccess(event)
	{
		var model, data, i;
		
		barmatz.utils.DataTypes.isNotUndefined(event);
		barmatz.utils.DataTypes.isInstanceOf(event, barmatz.events.FormModelEvent);
		
		removeFormModelListeners(event.target);
		removeLoadingDialog();
		
		for(i = 0; i < event.leads.length; i++)
		{
			data = event.leads[i];
			model = barmatz.forms.factories.ModelFactory.createLeadModel();
			model.created = barmatz.utils.Date.toDate(data.created);
			model.data = data.data;
			model.ip = data.ip;
			model.referer = data.referer;
			leadsListModel.addItem(model);
		}
	}
	
	function onFormModelGetLeadsFail(event)
	{
		removeFormModelListeners(event.target);
		removeLoadingDialog();
		alertError('Error getting leads');
	}
};

barmatz.forms.ui.LeadsController.prototype = new barmatz.mvc.Controller();
barmatz.forms.ui.LeadsController.prototype.constructor = barmatz.forms.ui.LeadsController;
/** barmatz.forms.ui.LeadsFormsListController **/
window.barmatz.forms.ui.LeadsFormsListController = function(model, view)
{
	barmatz.utils.DataTypes.isNotUndefined(model);
	barmatz.utils.DataTypes.isNotUndefined(view);
	barmatz.utils.DataTypes.isInstanceOf(model, barmatz.forms.CollectionModel);
	barmatz.utils.DataTypes.isInstanceOf(view, HTMLElement);
	barmatz.forms.CollectionController.call(this, model, view);
};

barmatz.forms.ui.LeadsFormsListController.prototype = new barmatz.forms.CollectionController();
barmatz.forms.ui.LeadsFormsListController.prototype.constructor = barmatz.forms.ui.LeadsFormsListController;

Object.defineProperties(barmatz.forms.ui.LeadsFormsListController.prototype,
{
	_createItemViewFromModel: {value: function(model)
	{
		barmatz.utils.DataTypes.isNotUndefined(model);
		barmatz.utils.DataTypes.isInstanceOf(model, barmatz.forms.FormModel);
		return barmatz.forms.factories.DOMFactory.createLeadsFormsListItem(model);
	}}
});
/** barmatz.forms.ui.LeadsListController **/
window.barmatz.forms.ui.LeadsListController = function(model, view)
{
	barmatz.utils.DataTypes.isNotUndefined(model);
	barmatz.utils.DataTypes.isNotUndefined(view);
	barmatz.utils.DataTypes.isInstanceOf(model, barmatz.forms.CollectionModel);
	barmatz.utils.DataTypes.isInstanceOf(view, HTMLElement);
	barmatz.forms.CollectionController.call(this, model, view);
};

barmatz.forms.ui.LeadsListController.prototype = new barmatz.forms.CollectionController();
barmatz.forms.ui.LeadsListController.prototype.constructor = barmatz.forms.ui.LeadsListController;

Object.defineProperties(barmatz.forms.ui.LeadsListController.prototype,
{
	_createItemViewFromModel: {value: function(model)
	{
		barmatz.utils.DataTypes.isNotUndefined(model);
		barmatz.utils.DataTypes.isInstanceOf(model, barmatz.forms.LeadModel);
		return barmatz.forms.factories.DOMFactory.createLeadsListItem(model, this._view.childNodes.length);
	}}
});
/** barmatz.forms.ui.Login **/
window.barmatz.forms.ui.Login = function()
{
	var loginFormWrapper = barmatz.forms.factories.DOMFactory.createLoginFormDialogWrapper();
	barmatz.forms.factories.ControllerFactory.createJQueryDialogController(loginFormWrapper.dialog);
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
		itemsView.appendChild(barmatz.forms.factories.DOMFactory.createMenuItem(model)).addEventListener('click', model.clickHandler);
		
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
		model.opened ? showItems() : hideItems();
	}
	
	function onModelValueChanged(event)
	{
		barmatz.utils.DataTypes.isNotUndefined(event);
		barmatz.utils.DataTypes.isInstanceOf(event, barmatz.events.ModelEvent);
		
		switch(event.key)
		{
			case 'opened':
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
			if(event.target === event.currentTarget)
				_this.get('clickHandler').call(_this, event);
		};
	}, set: function(value)
	{
		barmatz.utils.DataTypes.isTypeOf(label, 'function');
		this.set('clickHandler', value);
	}}
});
/** barmatz.forms.ui.MenuModel **/
window.barmatz.forms.ui.MenuModel = function()
{
	barmatz.forms.CollectionModel.call(this);
	this.set('opened', false);
};

barmatz.forms.ui.MenuModel.prototype = new barmatz.forms.CollectionModel();
barmatz.forms.ui.MenuModel.prototype.constructor = barmatz.forms.ui.MenuModel;

Object.defineProperties(barmatz.forms.ui.MenuModel.prototype,
{
	opened: {get: function()
	{
		return this.get('opened');
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
		this.opened ? this.hide() : this.show();
	}},
	show: {value: function()
	{
		this.set('opened', true);
	}},
	hide: {value: function()
	{
		this.set('opened', false);
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
		if(barmatz.forms.Validator.notEmpty(this._nameFieldView.value))
		{
			this._model.name = this._nameFieldView.value;
			this._model.label = this._labelFieldView.value;
			barmatz.forms.factories.DOMFactory.destroyDialog(this._view);
		}
		else
			barmatz.forms.factories.ControllerFactory.createJQueryDialogController(barmatz.forms.factories.DOMFactory.createAlertPromptDialog('Error', 'A field must have a name!', true));
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
		var _this, itemsWrapper, dialogWrapper;
		
		barmatz.utils.DataTypes.isInstanceOf(value, barmatz.forms.fields.FormItemModel, true);
		
		_this = this;
		
		if(this._model)
			this._model.removeEventListener(barmatz.events.ModelEvent.VALUE_CHANGED, onModelValueChanged);
		
		this._model = value;
		this._view.innerHTML = '';
		
		if(this._model)
		{
			itemsWrapper = barmatz.forms.factories.DOMFactory.createPropertiesItemWarpper(this._model);
			
			if(itemsWrapper.validationOptionsButton)
				itemsWrapper.validationOptionsButton.addEventListener('click', onItemsWrapperValidationOptionsButtonClick);
			
			if(itemsWrapper.editItemsButton)
				itemsWrapper.editItemsButton.addEventListener('click', onItemsWrapperEditItemsButtonClick);
			
			if(itemsWrapper.editContentButton)
				itemsWrapper.editContentButton.addEventListener('click', onItemsWrapperEditContentButtonClick);
			
			this._model.addEventListener(barmatz.events.ModelEvent.VALUE_CHANGED, onModelValueChanged);
			this._view.appendChild(itemsWrapper.wrapper);
		}
		else
			this._view.appendChild(barmatz.forms.factories.DOMFactory.createElementWithContent('h2', 'forms-filler', 'No item selected'));
		
		function onItemsWrapperValidationOptionsButtonClick(event)
		{
			dialogWrapper = barmatz.forms.factories.DOMFactory.createFieldValidationOptionsDialogWrapper(_this._model);
			barmatz.forms.factories.ControllerFactory.createJQueryDialogController(dialogWrapper.dialog);
			barmatz.forms.factories.ControllerFactory.createFieldValidationOptionsController(_this.model, dialogWrapper.options);
		}
		
		function onItemsWrapperEditItemsButtonClick(event)
		{
			dialogWrapper = barmatz.forms.factories.DOMFactory.createDropboxItemsListDialogWrapper();
			barmatz.forms.factories.ControllerFactory.createJQueryDialogController(dialogWrapper.dialog);
			barmatz.forms.factories.ControllerFactory.createDropboxItemsListController(_this._model, dialogWrapper.dialog.getElementsByTagName('tbody')[0], dialogWrapper.addButton, dialogWrapper.resetButton);
		}
		
		function onItemsWrapperEditContentButtonClick(event)
		{
			dialogWrapper = barmatz.forms.factories.DOMFactory.createHTMLContentEditorDialogWrapper(onEditContentConfrim, _this._model.content);
			barmatz.forms.factories.ControllerFactory.createJQueryDialogController(dialogWrapper.dialog);
		}
		
		function onEditContentConfrim(event)
		{
			_this._model.content = tinymce.get(dialogWrapper.editor.id).getContent();
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
				case 'value':
				case 'content':
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
				case 'enabled':
					itemsWrapper.enabledField.value = event.value;
					break;
				case 'max':
					itemsWrapper.maxField.value = isNaN(event.value) ? '' : event.value;
					break;
				case 'checked':
					itemsWrapper.checkedField.value = event.value;
					break;
				case 'accept':
					itemsWrapper.acceptField.value = event.value.join(', ');
					break;
				case 'rows':
					itemsWrapper.rowsField.value = event.value;
					break;
				case 'cols':
					itemsWrapper.colsField.value = event.value;
					break;
				case 'multiple':
					itemsWrapper.multipleField.value = event.value;
					break;
				case 'validator':
					break;
				case 'width':
					itemsWrapper.widthField.value = event.value;
					break;
				case 'description':
					itemsWrapper.descriptionField.value = event.value;
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
	barmatz.utils.DataTypes.isInstanceOf(fieldModel, barmatz.forms.fields.FormItemModel);
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
	
	function createLoadingDialog()
	{
		loadingDialog = barmatz.forms.factories.DOMFactory.createLoadingDialog();
	}
	
	function getForms()
	{
		createLoadingDialog();
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
		var model, itemView, i;
		
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
		createLoadingDialog();
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
		
		if(formModel !== model)
			formModel.copy(model.fingerprint, model);
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
		barmatz.forms.factories.ControllerFactory.createJQueryDialogController(barmatz.forms.factories.DOMFactory.createAlertPromptDialog('Error', 'An error has occured. Please try again later.', true));
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
		barmatz.forms.factories.ControllerFactory.createJQueryDialogController(barmatz.forms.factories.DOMFactory.createAlertPromptDialog('Error', 'An error has occured. Please try again later.', true));
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
		model.loadByFingerprint(model.fingerprint);
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
	
	model.addEventListener(barmatz.events.ModelEvent.VALUE_CHANGED, onModelValueChanged);
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
		var dialogWrapper;
		
		barmatz.utils.DataTypes.isNotUndefined(model);
		barmatz.utils.DataTypes.isInstanceOf(model, barmatz.forms.fields.FieldModel);
		
		dialogWrapper = barmatz.forms.factories.DOMFactory.createNewFieldDialogWrapper(model);
		jQuery(dialogWrapper.dialog).dialog('open');
		barmatz.forms.factories.ControllerFactory.createJQueryDialogController(dialogWrapper.dialog);
		barmatz.forms.factories.ControllerFactory.createNewFieldDialogController(model, dialogWrapper.dialog, dialogWrapper.nameField, dialogWrapper.labelField);
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
	
	function onModelValueChanged(event)
	{
		barmatz.utils.DataTypes.isNotUndefined(event);
		barmatz.utils.DataTypes.isInstanceOf(event, barmatz.events.ModelEvent);
		
		switch(event.key)
		{
			case 'direction':
				switch(event.value)
				{
					default:
						throw new Error('Unknown direction');
						break;
					case barmatz.forms.Directions.LTR:
						barmatz.utils.CSS.addClass(view, 'forms-ltr');
						barmatz.utils.CSS.removeClass(view, 'forms-rtl');
						break;
					case barmatz.forms.Directions.RTL:
						barmatz.utils.CSS.addClass(view, 'forms-rtl');
						barmatz.utils.CSS.removeClass(view, 'forms-ltr');
						break;
				}
				break;
		}
	}
	
	function onModelItemAdded(event)
	{
		barmatz.utils.DataTypes.isNotUndefined(event);
		barmatz.utils.DataTypes.isInstanceOf(event, barmatz.events.CollectionEvent);
		setViewToSortable();
		
		if(event.item instanceof barmatz.forms.fields.FieldModel && !event.item.name)
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
		barmatz.utils.DataTypes.isInstanceOf(model, barmatz.forms.fields.FormItemModel);
		viewWrapper = barmatz.forms.factories.DOMFactory.createWorkspaceItemWrapper(model);
		viewWrapper.deleteButton.addEventListener('click', onDeleteButtonClick);
		barmatz.forms.factories.ControllerFactory.createWorkspaceItemController(model, viewWrapper.label, viewWrapper.field, viewWrapper.mandatory, viewWrapper.deleteButton);
		
		if(model instanceof barmatz.forms.fields.FieldModel)
			barmatz.forms.factories.ControllerFactory.createFieldController(model, viewWrapper.field);
		
		return viewWrapper.wrapper;
		
		function onDeleteButtonClick(event)
		{
			barmatz.utils.DataTypes.isNotUndefined(event);
			barmatz.utils.DataTypes.isInstanceOf(event, MouseEvent);
			barmatz.forms.factories.ControllerFactory.createJQueryDialogController(barmatz.forms.factories.DOMFactory.createConfirmPromptDialog('Are you sure you want to delete this item?', onDialogConfirm, true));
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
	var fieldDictionary;
	
	barmatz.utils.DataTypes.isNotUndefined(model);
	barmatz.utils.DataTypes.isNotUndefined(labelView);
	barmatz.utils.DataTypes.isNotUndefined(fieldView);
	barmatz.utils.DataTypes.isNotUndefined(mandatoryView);
	barmatz.utils.DataTypes.isNotUndefined(deleteButtonView);
	barmatz.utils.DataTypes.isInstanceOf(model, barmatz.forms.fields.FormItemModel);
	barmatz.utils.DataTypes.isInstanceOf(labelView, HTMLElement);
	barmatz.utils.DataTypes.isInstanceOf(fieldView, HTMLElement);
	barmatz.utils.DataTypes.isInstanceOf(mandatoryView, HTMLElement);
	barmatz.utils.DataTypes.isInstanceOf(deleteButtonView, HTMLElement);
	
	barmatz.mvc.Controller.call(this);

	model.addEventListener(barmatz.events.ModelEvent.VALUE_CHANGED, onModelValueChanged);
	
	if(model instanceof barmatz.forms.fields.DropboxModel)
	{
		fieldDictionary = new barmatz.utils.Dictionary();
		model.addEventListener(barmatz.events.CollectionEvent.ITEM_ADDED, onModelItemAdded);
		model.addEventListener(barmatz.events.CollectionEvent.ITEM_REMOVED, onModelItemRemoved);
		model.forEach(function(item, index, collection)
		{
			addItem(item, index);
		});
	}
	
	if(model instanceof barmatz.forms.fields.FieldModel)
	{
		setViewValue('name', model.name);
		setViewValue('label', model.label);
		setViewValue('mandatory', model.mandatory);
		setViewValue('value', model.value);
		setViewValue('enabled', model.enabled);
	}
	
	if(model instanceof barmatz.forms.fields.TextFieldModel)
		setViewValue('max', model.max);

	if(model instanceof barmatz.forms.fields.CheckboxFieldModel)
		setViewValue('checked', model.checked);
	
	if(model instanceof barmatz.forms.fields.FileFieldModel)
		setViewValue('accept', model.accept);
	
	if(model instanceof barmatz.forms.fields.TextAreaFieldModel)
		setViewValue('rows', model.rows);
	
	if(model instanceof barmatz.forms.fields.HTMLContentModel)
		setViewValue('content', model.content);
	
	function setViewValue(key, value)
	{
		switch(key)
		{
			default:
				throw new Error('unknown key');
				break;
			case 'validator':
			case 'description':
			case 'prefix':
				break;
			case 'name':
				fieldView.name = value;
				break;
			case 'label':
				labelView.innerHTML = value;
				break;
			case 'mandatory':
				mandatoryView.innerHTML = value ? '*' : '';
				break;
			case 'value':
				fieldView.value = value;
				break;
			case 'enabled':
				if(model instanceof barmatz.forms.fields.PhoneFieldModel)
				{
					fieldView.getElementsByTagName('select')[0].disabled = !value;
					fieldView.getElementsByTagName('input')[0].disabled = !value;
				}
				else
					fieldView.disabled = !value;
				break;
			case 'max':
				fieldView.maxLength = value;
				break;
			case 'checked':
				fieldView.checked = value;
				break;
			case 'accept':
				fieldView.accept = value;
				break;
			case 'rows':
				fieldView.rows = value;
				break;
			case 'cols':
				fieldView.cols = value;
				break;
			case 'multiple':
				fieldView.multiple = value;
				break;
			case 'width':
				if(model instanceof barmatz.forms.fields.PhoneFieldModel)
					fieldView.getElementsByTagName('input')[0].style.width = value + 'px';
				else
					fieldView.style.width = value + 'px';
				break;
			case 'content':
				fieldView.innerHTML = value;
				break;
		}
	}
	
	function addItem(model, index)
	{
		var view;
		
		barmatz.utils.DataTypes.isNotUndefined(model);
		barmatz.utils.DataTypes.isNotUndefined(index);
		barmatz.utils.DataTypes.isInstanceOf(model, barmatz.forms.fields.DropboxItemModel);
		barmatz.utils.DataTypes.isTypeOf(index, 'number');
		
		view = fieldView.children[index] || fieldView.appendChild(barmatz.forms.factories.DOMFactory.createDropboxItemElement(model));
		model.addEventListener(barmatz.events.ModelEvent.VALUE_CHANGED, onModelItemValueChanged);
		fieldDictionary.add(model, view);
	}
	
	function removeItem(model)
	{
		barmatz.utils.DataTypes.isNotUndefined(model);
		barmatz.utils.DataTypes.isInstanceOf(model, barmatz.forms.fields.DropboxItemModel);
		model.removeEventListener(barmatz.events.ModelEvent.VALUE_CHANGED, onModelItemValueChanged);
		fieldView.removeChild(fieldDictionary.get(model));
		fieldDictionary.remove(model);
	}
	
	function onModelValueChanged(event)
	{
		barmatz.utils.DataTypes.isNotUndefined(event);
		barmatz.utils.DataTypes.isInstanceOf(event, barmatz.events.ModelEvent);
		setViewValue(event.key, event.value);
	}
	
	function onModelItemAdded(event)
	{
		barmatz.utils.DataTypes.isNotUndefined(event);
		barmatz.utils.DataTypes.isInstanceOf(event, barmatz.events.CollectionEvent);
		addItem(event.item, event.index);
	}

	function onModelItemRemoved(event) 
	{
		barmatz.utils.DataTypes.isNotUndefined(event);
		barmatz.utils.DataTypes.isInstanceOf(event, barmatz.events.CollectionEvent);
		removeItem(event.item);
	}
	
	function onModelItemValueChanged(event)
	{
		barmatz.utils.DataTypes.isNotUndefined(event);
		barmatz.utils.DataTypes.isInstanceOf(event, barmatz.events.ModelEvent);

		switch(event.key)
		{
			default:
				throw new Error('Unknown key');
				break;
			case 'label':
				fieldDictionary.get(event.target).innerHTML = event.value;
				break;
			case 'value':
				fieldDictionary.get(event.target).value = event.value;
				break;
		}
	}
};

barmatz.forms.ui.WorkspaceItemController.prototype = new barmatz.mvc.Controller();
barmatz.forms.ui.WorkspaceItemController.prototype.constructor = barmatz.forms.ui.WorkspaceItemController;
/** barmatz.forms.Config **/
window.barmatz.forms.Config = function(){};

Object.defineProperties(barmatz.forms.Config,
{
	//BASE_URL: {value: 'http://localhost:8080/clients/ofirvardi/forms'}
	BASE_URL: {value: 'http://www.quiz.co.il'}
});
/** barmatz.forms.Directions **/
window.barmatz.forms.Directions = function(){};

Object.defineProperties(barmatz.forms.Directions,
{
	RTL: {value: 'right'},
	LTR: {value: 'left'}
});
/** barmatz.forms.FormController **/
window.barmatz.forms.FormController = function(model, formView, submitButtonView)
{
	var submittingForm, loadingDialog;

	barmatz.utils.DataTypes.isNotUndefined(model);
	barmatz.utils.DataTypes.isNotUndefined(formView);
	barmatz.utils.DataTypes.isNotUndefined(submitButtonView);
	barmatz.utils.DataTypes.isInstanceOf(model, barmatz.forms.FormModel);
	barmatz.utils.DataTypes.isInstanceOf(formView, HTMLFormElement);
	barmatz.utils.DataTypes.isInstanceOf(submitButtonView, HTMLElement);
	barmatz.mvc.Controller.call(this);
	
	formView.name = model.name;
	formView.method = model.method;
	formView.encoding = model.encoding;
	formView.setAttribute('onsubmit', 'return false;');
	formView.addEventListener('submit', onViewSubmit);
	
	function addModelListeners()
	{
		model.addEventListener(barmatz.events.FormModelEvent.SUBMITTING, onModelSubmitting);
		model.addEventListener(barmatz.events.FormModelEvent.SUBMITTED, onModelSubmitted);
		model.addEventListener(barmatz.events.FormModelEvent.SUBMISSION_FAILED, onModelSubmitionFailed);
	}
	 
	function removeModelListeners()
	{
		model.removeEventListener(barmatz.events.FormModelEvent.SUBMITTING, onModelSubmitting);
		model.removeEventListener(barmatz.events.FormModelEvent.SUBMITTED, onModelSubmitted);
		model.removeEventListener(barmatz.events.FormModelEvent.SUBMISSION_FAILED, onModelSubmitionFailed);
	}
	 
	function addLoadingDialog()
	{
		loadingDialog = barmatz.forms.factories.DOMFactory.createLoadingDialog(formView);
	}
	 
	function removeLoadingDialog()
	{
		barmatz.forms.factories.DOMFactory.destroyLoadingDialog(loadingDialog);
		loadingDialog = null;
	}
	 
	function onViewSubmit(event)
	{
		if(!submittingForm)
		{
			addModelListeners();
			
			if(model.isValid)
				model.submit();
		}
	}
	 
	function onModelSubmitting(event)
	{
		submittingForm = true;
		addLoadingDialog();
	}
	 
	function onModelSubmitted(event)
	{
		submittingForm = false;
		submitButtonView.innerHTML = barmatz.forms.Language.form.submit.success;
		submitButtonView.disabled = true;
		removeModelListeners(); 
		removeLoadingDialog();
	}
	 
	function onModelSubmitionFailed(event)
	{
		submittingForm = false;
		submitButtonView.innerHTML = barmatz.forms.Language.form.submit.error;
		removeModelListeners();
		removeLoadingDialog();
	 }
};

barmatz.forms.FormController.prototype = new barmatz.mvc.Controller();
barmatz.forms.FormController.prototype.constructor = barmatz.forms.FormController;

Object.defineProperties(barmatz.forms.FormController.prototype, {});
/** barmatz.forms.FormModel **/
window.barmatz.forms.FormModel = function()
{
	barmatz.forms.CollectionModel.call(this);
	this.set('name', '');
	this.set('submitButtonLabel', 'Submit');
	this.set('method', barmatz.forms.Methods.GET);
	this.set('encoding', barmatz.net.Encoding.FORM);
	this.set('created', null);
	this.set('fingerprint', null);
	this.set('direction', barmatz.forms.Directions.LTR);
	this.set('targetEmail', '');
	this.set('layoutId', 1);
	this.set('language', 'en');
};

barmatz.forms.FormModel.prototype = new barmatz.forms.CollectionModel();
barmatz.forms.FormModel.prototype.constructor = barmatz.forms.FormModel;

Object.defineProperties(barmatz.forms.FormModel.prototype, 
{
	name: {get: function()
	{
		return this.get('name');
	}, set: function(value)
	{
		barmatz.utils.DataTypes.isTypeOf(value, 'string');
		this.set('name', value);
	}},
	submitButtonLabel: {get: function()
	{
		return this.get('submitButtonLabel');
	}, set: function(value)
	{
		barmatz.utils.DataTypes.isTypeOf(value, 'string');
		this.set('submitButtonLabel', value);
	}},
	method: {get: function()
	{
		return this.get('method');
	}, set: function(value)
	{
		barmatz.utils.DataTypes.isTypeOf(value, 'string');
		this.set('method', value);
	}},
	encoding: {get: function()
	{
		return this.get('encoding');
	}, set: function(value)
	{
		barmatz.utils.DataTypes.isTypeOf(value, 'string');
		this.set('encoding', value);
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

		if(!this.fingerprint)
			this.set('fingerprint', value);
	}},
	stylesheets: {get: function()
	{
		if(!this.get('stylesheets'))
			this.set('stylesheets', []);
		return this.get('stylesheets');
	}, set: function(value)
	{
		barmatz.utils.DataTypes.isInstanceOf(value, Array);
		this.set('stylesheets', value);
	}},
	direction: {get: function()
	{
		return this.get('direction');
	}, set: function(value)
	{
		barmatz.utils.DataTypes.isTypeOf(value, 'string');
		this.set('direction', value);
	}},
	targetEmail: {get: function()
	{
		return this.get('targetEmail');
	}, set: function(value)
	{
		barmatz.utils.DataTypes.isTypeOf(value, 'string');
		this.set('targetEmail', value);
	}},
	layoutId: {get: function()
	{
		return this.get('layoutId');
	}, set: function(value)
	{
		barmatz.utils.DataTypes.isTypeOf(value, 'number');
		this.set('layoutId', value);
	}},
	language: {get: function()
	{
		return this.get('language');
	}, set: function(value)
	{
		barmatz.utils.DataTypes.isTypeOf(value, 'string');
		this.set('language', value);
	}},
	addItem: {value: function(item)
	{
		barmatz.utils.DataTypes.isNotUndefined(item);
		barmatz.utils.DataTypes.isInstanceOf(item, barmatz.forms.fields.FormItemModel);
		barmatz.forms.CollectionModel.prototype.addItem.call(this, item);
	}},
	addItemAt: {value: function(item, index)
	{
		barmatz.utils.DataTypes.isNotUndefined(item);
		barmatz.utils.DataTypes.isNotUndefined(index);
		barmatz.utils.DataTypes.isInstanceOf(item, barmatz.forms.fields.FormItemModel);
		barmatz.utils.DataTypes.isTypeOf(index, 'number');
		barmatz.forms.CollectionModel.prototype.addItemAt.call(this, item, index);
	}},
	removeItem: {value: function(item)
	{
		barmatz.utils.DataTypes.isNotUndefined(item);
		barmatz.utils.DataTypes.isInstanceOf(item, barmatz.forms.fields.FormItemModel);
		barmatz.forms.CollectionModel.prototype.removeItem.call(this, item);
	}},
	getItemIndex: {value: function(item)
	{
		barmatz.utils.DataTypes.isNotUndefined(item);
		barmatz.utils.DataTypes.isInstanceOf(item, barmatz.forms.fields.FormItemModel);
		return barmatz.forms.CollectionModel.prototype.getItemIndex.call(this, item);
	}},
	setItemIndex: {value: function(item, index)
	{
		barmatz.utils.DataTypes.isNotUndefined(item);
		barmatz.utils.DataTypes.isNotUndefined(index);
		barmatz.utils.DataTypes.isInstanceOf(item, barmatz.forms.fields.FormItemModel);
		barmatz.utils.DataTypes.isTypeOf(index, 'number');
		return barmatz.forms.CollectionModel.prototype.setItemIndex.call(this, item, index);
	}},
	toJSON: {value: function()
	{
		var object = {
			name: this.name, 
			submitButtonLabel: this.submitButtonLabel, 
			method: this.method, 
			encoding: this.encoding, 
			created: this.created ? this.created.valueOf() : NaN, 
			fingerprint: this.fingerprint, 
			stylesheets: this.stylesheets, 
			direction: this.direction, 
			targetEmail: this.targetEmail, 
			layoutId: this.layoutId, 
			language: this.language, 
			fields: []
		};
		
		this.forEach(function(item, index, collection)
		{
			var field = {type: item.type};
			
			if(item instanceof barmatz.forms.fields.FieldModel)
			{
				field.name = item.name;
				field.label = item.label;
				field.mandatory = item.mandatory;
				field.enabled = item.enabled;
				field.validator = item.validator;
				field.width = item.width;
			}
			
			if(item instanceof barmatz.forms.fields.FileFieldModel)
				field.accept = item.accept;

			if(item instanceof barmatz.forms.fields.TextFieldModel)
			{
				field.max = item.max;
				field.description = item.description;
			}
			
			if(item instanceof barmatz.forms.fields.TextAreaFieldModel)
			{
				field.rows = item.rows;
				field.cols = item.cols;
			}
			
			if(item instanceof barmatz.forms.fields.CheckboxFieldModel)
				field.checked = item.checked;
			
			if(item instanceof barmatz.forms.fields.DropboxModel)
			{
				field.items = [];
				item.forEach(function(item, index, collection)
				{
					field.items.push({label: item.label, value: item.value});
				});
			}
			
			if(item instanceof barmatz.forms.fields.HTMLContentModel)
				field.content = item.content;
			
			object.fields.push(field);
		});
		
		return JSON.stringify(object);
	}},
	reset: {value: function()
	{
		this.set('name', '');
		this.set('method', barmatz.forms.Methods.GET);
		this.set('encoding', barmatz.net.Encoding.FORM);
		this.set('created', null);
		this.set('fingerprint', null);
		this.set('stylesheets', []);
		this.set('direction', barmatz.forms.Directions.LTR);
		this.set('targetEmail', '');
		this.set('layoutId', 1);
		this.set('language', 'en');
		while(this.numItems > 0)
			this.removeItemAt(this.numItems - 1);
	}},
	save: {value: function(model)
	{
		var _this = this, request, loader;

		barmatz.utils.DataTypes.isNotUndefined(model);
		barmatz.utils.DataTypes.isInstanceOf(model, barmatz.forms.users.UserModel);
		
		this.dispatchEvent(new barmatz.events.FormModelEvent(barmatz.events.FormModelEvent.SAVING));

		request = new barmatz.net.Request(barmatz.forms.Config.BASE_URL + '/api/form/save.php');
		request.method = barmatz.net.Methods.POST;
		request.data = {f: this.fingerprint || null, n: this.name, e: this.targetEmail, d: this.toJSON()};
		loader = new barmatz.net.Loader();
		addLoaderListeners();
		loader.load(request);

		function addLoaderListeners()
		{
			loader.addEventListener(barmatz.events.LoaderEvent.SUCCESS, onLoaderSuccess);
			loader.addEventListener(barmatz.events.LoaderEvent.ERROR, onLoaderError);
		}
		
		function removeLoaderListeners()
		{
			loader.removeEventListener(barmatz.events.LoaderEvent.SUCCESS, onLoaderSuccess);
			loader.removeEventListener(barmatz.events.LoaderEvent.ERROR, onLoaderError);
		}
		
		function onLoaderSuccess(event)
		{
			var data;
			
			barmatz.utils.DataTypes.isNotUndefined(event);
			barmatz.utils.DataTypes.isInstanceOf(event, barmatz.events.LoaderEvent);
			
			removeLoaderListeners();
			
			try
			{
				data = JSON.parse(event.response.data);
			}
			catch(error)
			{
				return;
			}
				
			if(data.fingerprint)
				_this.set('fingerprint', data.fingerprint);
			
			_this.dispatchEvent(new barmatz.events.FormModelEvent(barmatz.events.FormModelEvent.SAVED));
		}
		
		function onLoaderError(event)
		{
			removeLoaderListeners();
			_this.dispatchEvent(new barmatz.events.FormModelEvent(barmatz.events.FormModelEvent.ERROR_SAVING));
		}
	}},
	saveAs: {value: function(model, name)
	{
		barmatz.utils.DataTypes.isNotUndefined(model);
		barmatz.utils.DataTypes.isInstanceOf(model, barmatz.forms.users.UserModel);
		barmatz.utils.DataTypes.isNotUndefined(name);
		barmatz.utils.DataTypes.isTypeOf(name, 'string');
		this.set('name', name);
		this.save(model);
	}},
	loadByFingerprint: {value: function(fingerprint)
	{
		var _this, request, loader, stage;
		
		barmatz.utils.DataTypes.isNotUndefined(fingerprint);	
		barmatz.utils.DataTypes.isTypeOf(fingerprint, 'string');
		
		_this = this;
		
		this.dispatchEvent(new barmatz.events.FormModelEvent(barmatz.events.FormModelEvent.LOADING_FORM));
		
		loadData();
		
		function loadData()
		{
			stage = 1;
			request = new barmatz.net.Request(barmatz.forms.Config.BASE_URL + '/api/form.php');
			request.method = barmatz.net.Methods.GET;
			request.data = {f: fingerprint};
			loader = new barmatz.net.Loader();
			addLoaderListeners();
			loader.load(request);
		}
		
		function loadLanguage()
		{
			stage = 2;
			request.url = barmatz.forms.Config.BASE_URL + '/lang/form_' + _this.language + '.php';
			request.data = null;
			addLoaderListeners();
			loader.load(request);
		}

		function addLoaderListeners()
		{
			loader.addEventListener(barmatz.events.LoaderEvent.SUCCESS, onLoaderSuccess);
			loader.addEventListener(barmatz.events.LoaderEvent.ERROR, onLoaderError);
		}
		
		function removeLoaderListeners()
		{
			loader.removeEventListener(barmatz.events.LoaderEvent.SUCCESS, onLoaderSuccess);
			loader.removeEventListener(barmatz.events.LoaderEvent.ERROR, onLoaderError);
		}
		
		function onLoaderSuccess(event)
		{
			var data;

			barmatz.utils.DataTypes.isNotUndefined(event);
			barmatz.utils.DataTypes.isInstanceOf(event, barmatz.events.LoaderEvent);

			removeLoaderListeners();
			
			try
			{
				data = JSON.parse(event.response.data);
			}
			catch(error)
			{
				onLoaderError(event);
				return;
			}
			
			switch(stage)
			{
				case 1:
					_this.copy(data.fingerprint, data.data);
					loadLanguage();
					break;
				case 2:
					barmatz.forms.Language = data;
					_this.submitButtonLabel = barmatz.forms.Language.form.submit.label; 
					_this.dispatchEvent(new barmatz.events.FormModelEvent(barmatz.events.FormModelEvent.LOADING_FORM_COMPLETE));
					break;
			}
		}
		
		function onLoaderError(event)
		{
			removeLoaderListeners();
			_this.dispatchEvent(new barmatz.events.FormModelEvent(barmatz.events.FormModelEvent.LOADING_FORM_ERROR));
		}
	}},
	deleteForm: {value: function()
	{
		var _this, request, loader;
		
		_this = this;
		
		this.dispatchEvent(new barmatz.events.FormModelEvent(barmatz.events.FormModelEvent.DELETING));

		request = new barmatz.net.Request(barmatz.forms.Config.BASE_URL + '/api/form/delete.php');
		request.method = barmatz.net.Methods.POST;
		request.data = {f: this.fingerprint};
		
		loader = new barmatz.net.Loader();
		addLoaderListeners();
		loader.load(request);

		function addLoaderListeners()
		{
			loader.addEventListener(barmatz.events.LoaderEvent.SUCCESS, onLoaderSuccess);
			loader.addEventListener(barmatz.events.LoaderEvent.ERROR, onLoaderError);
		}
		
		function removeLoaderListeners()
		{
			loader.removeEventListener(barmatz.events.LoaderEvent.SUCCESS, onLoaderSuccess);
			loader.removeEventListener(barmatz.events.LoaderEvent.ERROR, onLoaderError);
		}
		
		function onLoaderSuccess(event)
		{
			barmatz.utils.DataTypes.isNotUndefined(event);
			barmatz.utils.DataTypes.isInstanceOf(event, barmatz.events.LoaderEvent);
			
			removeLoaderListeners();
			_this.dispatchEvent(new barmatz.events.FormModelEvent(barmatz.events.FormModelEvent.DELETED));
		}
		
		function onLoaderError(event)
		{
			removeLoaderListeners();
			_this.dispatchEvent(new barmatz.events.FormModelEvent(barmatz.events.FormModelEvent.DELETION_FAIL));
		}
	}},
	isValid: {get: function()
	{
		var validFields = 0;
		
		this.forEach(function(item, index, collection)
		{
			validFields += item.validate() ? 1 : 0;
		});
		
		return validFields == this.numItems;
	}},
	submit: {value: function()
	{
		var _this, request, loader, data;
		
		_this = this;
		data = {};
		
		this.dispatchEvent(new barmatz.events.FormModelEvent(barmatz.events.FormModelEvent.SUBMITTING));
		this.forEach(function(item, index, collection)
		{
			if(item instanceof barmatz.forms.fields.CheckboxFieldModel)
				data[item.name] = item.checked ? 'yes' : 'no';
			else
				data[item.name] = item.value;
		});

		request = new barmatz.net.Request(barmatz.forms.Config.BASE_URL + '/api/form/submit.php');
		request.method = this.method;
		request.data = {f: this.fingerprint, d: JSON.stringify(data)};
		request.headers = [new barmatz.net.RequestHeader('Content-Type', this.encoding)];
		
		loader = new barmatz.net.Loader();
		addLoaderListeners();
		loader.load(request);

		function addLoaderListeners()
		{
			loader.addEventListener(barmatz.events.LoaderEvent.SUCCESS, onLoaderSuccess);
			loader.addEventListener(barmatz.events.LoaderEvent.ERROR, onLoaderError);
		}
		
		function removeLoaderListeners()
		{
			loader.removeEventListener(barmatz.events.LoaderEvent.SUCCESS, onLoaderSuccess);
			loader.removeEventListener(barmatz.events.LoaderEvent.ERROR, onLoaderError);
		}
		
		function onLoaderSuccess(event)
		{
			barmatz.utils.DataTypes.isNotUndefined(event);
			barmatz.utils.DataTypes.isInstanceOf(event, barmatz.events.LoaderEvent);
			removeLoaderListeners();
			_this.dispatchEvent(new barmatz.events.FormModelEvent(barmatz.events.FormModelEvent.SUBMITTED));
		}
		
		function onLoaderError(event)
		{
			removeLoaderListeners();
			_this.dispatchEvent(new barmatz.events.FormModelEvent(barmatz.events.FormModelEvent.SUBMISSION_FAILED));
		}
	}},
	getLeads: {value: function()
	{
		var _this, request, loader;
		
		_this = this;
		
		request = new barmatz.net.Request(barmatz.forms.Config.BASE_URL + '/api/form/leads.php');
		request.method = barmatz.net.Methods.GET;
		request.data = {f: this.fingerprint};
		
		loader = new barmatz.net.Loader();
		addLoaderListeners();
		loader.load(request);
		
		function addLoaderListeners()
		{
			loader.addEventListener(barmatz.events.LoaderEvent.SUCCESS, onLoaderSuccess);
			loader.addEventListener(barmatz.events.LoaderEvent.ERROR, onLoaderError);
		}
		
		function removeLoaderListeners()
		{
			loader.removeEventListener(barmatz.events.LoaderEvent.SUCCESS, onLoaderSuccess);
			loader.removeEventListener(barmatz.events.LoaderEvent.ERROR, onLoaderError);
		}
		
		function onLoaderSuccess(event)
		{
			var data;
			
			barmatz.utils.DataTypes.isNotUndefined(event);
			barmatz.utils.DataTypes.isInstanceOf(event, barmatz.events.LoaderEvent);
			
			data = JSON.parse(event.response.data);
			
			removeLoaderListeners();
			_this.dispatchEvent(new barmatz.events.FormModelEvent(barmatz.events.FormModelEvent.GET_LEADS_SUCCESS, data));
		}
		
		function onLoaderError(event)
		{
			removeLoaderListeners();
			_this.dispatchEvent(new barmatz.events.FormModelEvent(barmatz.events.FormModelEvent.GET_LEADS_FAIL));
		}
		
	}},
	copy: {value: function(fingerprint, data)
	{
		var _this, field, fieldData, i;
		
		barmatz.utils.DataTypes.isNotUndefined(fingerprint);
		barmatz.utils.DataTypes.isNotUndefined(data);
		barmatz.utils.DataTypes.isTypeOf(fingerprint, 'string');
		barmatz.utils.DataTypes.isTypeOf(data, 'object');

		_this = this;
		this.name = data.name || '';
		this.submitButtonLabel = data.submitButtonLabel || 'Submit';
		this.created = new Date(data.created);
		this.method = data.method || barmatz.forms.Methods.GET;
		this.encoding = data.encoding || barmatz.net.Encoding.FORM;
		this.direction = data.direction || barmatz.forms.Directions.LTR;
		this.targetEmail = data.targetEmail || '';
		this.layoutId = data.layoutId || 1;
		this.language = data.language || 'en';
		this.set('fingerprint', fingerprint);
		this.set('stylesheets', data.stylesheets || []);
		

		while(this.numItems > 0)
			this.removeItemAt(this.numItems - 1);
		
		if(data instanceof barmatz.forms.FormModel)
			data.forEach(function(item, index, collection)
			{
				addField(item);
			});
		else
			for(i = 0; i < data.fields.length; i++)
				addField(data.fields[i]);
		
		function addField(fieldData)
		{
			var name, dataItem, i;

			barmatz.utils.DataTypes.isNotUndefined(fieldData);
			barmatz.utils.DataTypes.isTypeOf(fieldData, 'object');
			
			name = fieldData.name;
			
			switch(fieldData.type)
			{
				default:
					throw new Error('Unknown type');
					break;
				case barmatz.forms.fields.FieldTypes.HTML_CONTENT:
					field = new barmatz.forms.fields.HTMLContentModel();
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
				case barmatz.forms.fields.FieldTypes.PHONE:
					field = new barmatz.forms.fields.PhoneFieldModel(name);
					break;
			}
			
			if(field instanceof barmatz.forms.fields.HTMLContentModel)
				field.content = fieldData.content || '';

			if(field instanceof barmatz.forms.fields.FieldModel)
			{
				field.label = fieldData.label || '';
				field.mandatory = fieldData.mandatory || false;
				field.enabled = fieldData.enabled || true;
				field.validator = barmatz.forms.factories.ModelFactory.createValidatorModel(fieldData.validator || null);
				field.width = fieldData.width || NaN;
			}
			
			if(field instanceof barmatz.forms.fields.FileFieldModel)
				field.accept = fieldData.accept;

			if(field instanceof barmatz.forms.fields.TextFieldModel)
			{
				field.max = parseInt(fieldData.max || NaN);
				field.description = fieldData.description || '';
			}
			
			if(field instanceof barmatz.forms.fields.CheckboxFieldModel)
				field.checked = fieldData.checked;
			
			if(field instanceof barmatz.forms.fields.DropboxModel)
				if(fieldData instanceof barmatz.forms.fields.DropboxModel)
					fieldData.forEach(function(item, index, collection)
					{
						addItemToField(field, item);
					});
				else
					for(i = 0; i < fieldData.items.length; i++)
						addItemToField(field, fieldData.items[i]);
			
			_this.addItem(field);
		}
		
		function addItemToField(field, item)
		{
			barmatz.utils.DataTypes.isNotUndefined(item);
			barmatz.utils.DataTypes.isTypeOf(item, 'object');
			field.addItem(barmatz.forms.factories.ModelFactory.createDropboxItemModel(item.label, item.value));
		}
	}}
});
/** barmatz.forms.Language **/
barmatz.forms.Language = {}
/** barmatz.forms.LeadModel **/
window.barmatz.forms.LeadModel = function()
{
	barmatz.mvc.Model.call(this);
	this.set('created', null);
	this.set('data', null);
	this.set('ip', null);
	this.set('referer', null);
};

barmatz.forms.LeadModel.prototype = new barmatz.mvc.Model();
barmatz.forms.LeadModel.prototype.constructor = barmatz.forms.LeadModel;

Object.defineProperties(barmatz.forms.LeadModel.prototype,
{
	created: {get: function()
	{
		return this.get('created');
	}, set: function(value)
	{
		barmatz.utils.DataTypes.isInstanceOf(value, Date);
		this.set('created', value);
	}},
	data: {get: function()
	{
		return this.get('data');
	}, set: function(value)
	{
		barmatz.utils.DataTypes.isTypeOf(value, 'object');
		this.set('data', value);
	}},
	ip: {get: function()
	{
		return this.get('ip');
	}, set: function(value)
	{
		barmatz.utils.DataTypes.isTypeOf(value, 'string');
		this.set('ip', value);
	}},
	referer: {get: function()
	{
		return this.get('referer');
	}, set: function(value)
	{
		barmatz.utils.DataTypes.isTypeOf(value, 'string');
		this.set('referer', value);
	}}
});
/** barmatz.forms.Methods **/
window.barmatz.forms.Methods = function(){};

Object.defineProperties(barmatz.forms.Methods,
{
	GET: {value: 'GET'},
	POST: {value: 'POST'}
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
		barmatz.utils.DataTypes.isNotUndefined(event);
		barmatz.utils.DataTypes.isInstanceOf(event, barmatz.events.UserModelEvent);
		
		location.href = event.targetURL;
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
			
			request = new barmatz.net.Request(barmatz.forms.Config.BASE_URL + '/api/user/forms.php');
			request.method = barmatz.net.Methods.GET;
			request.data = {u: _this.id};
			
			loader = new barmatz.net.Loader();
			addLoadFormsDataListeners(loader);
			loader.load(request);
		}
		
		function addLoadFormsDataListeners(loader)
		{
			barmatz.utils.DataTypes.isNotUndefined(loader);
			barmatz.utils.DataTypes.isInstanceOf(loader, barmatz.net.Loader);
			loader.addEventListener(barmatz.events.LoaderEvent.SUCCESS, onLoadFormsDataSuccess);
			loader.addEventListener(barmatz.events.LoaderEvent.ERROR, onLoadFormsDataError);
		}
		
		function removeLoadFormsDataListeners(loader)
		{
			barmatz.utils.DataTypes.isNotUndefined(loader);
			barmatz.utils.DataTypes.isInstanceOf(loader, barmatz.net.Loader);
			loader.removeEventListener(barmatz.events.LoaderEvent.SUCCESS, onLoadFormsDataSuccess);
			loader.removeEventListener(barmatz.events.LoaderEvent.ERROR, onLoadFormsDataError);
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
			
			for(i = 0; i < data.length; i++)
			{
				form = barmatz.forms.factories.ModelFactory.createFormModel();
				form.created = barmatz.utils.Date.toDate(data[i].created);
				form.fingerprint = data[i].fingerprint;
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
		
		function onLoadFormsDataSuccess(event)
		{
			var data;
			
			barmatz.utils.DataTypes.isNotUndefined(event);
			barmatz.utils.DataTypes.isInstanceOf(event, barmatz.events.LoaderEvent);
			
			removeLoadFormsDataListeners(event.target);
				
			try
			{
				data = JSON.parse(event.response.data);
			}
			catch(error)
			{
				onLoadFormsDataError(event);
				return;
			}
			
			parseFormsData(data);
			_this.dispatchEvent(new barmatz.events.UserModelEvent(barmatz.events.UserModelEvent.GET_FORMS_SUCCESS, data));
		}
		
		function onLoadFormsDataError(event)
		{
			barmatz.utils.DataTypes.isNotUndefined(event);
			barmatz.utils.DataTypes.isInstanceOf(event, barmatz.events.LoaderEvent);
			removeLoadFormsDataListeners(event.target);
			_this.dispatchEvent(new barmatz.events.UserModelEvent(barmatz.events.UserModelEvent.GET_FORMS_FAIL));
		}
	}},
	getData: {value: function()
	{
		var _this = this, request, loader;
		
		request = new barmatz.net.Request(barmatz.forms.Config.BASE_URL + '/api/user/user.php');
		request.method = barmatz.net.Methods.GET;
		
		loader = new barmatz.net.Loader();
		addLoaderListeners();
		loader.load(request);
		
		function addLoaderListeners()
		{
			loader.addEventListener(barmatz.events.LoaderEvent.SUCCESS, onLoaderSuccess);
			loader.addEventListener(barmatz.events.LoaderEvent.ERROR, onLoaderError);
		}
		
		function removeLoaderListeners()
		{
			loader.removeEventListener(barmatz.events.LoaderEvent.SUCCESS, onLoaderSuccess);
			loader.removeEventListener(barmatz.events.LoaderEvent.ERROR, onLoaderError);
		}
		
		function onLoaderSuccess(event)
		{
			var data;
			
			barmatz.utils.DataTypes.isNotUndefined(event);
			barmatz.utils.DataTypes.isInstanceOf(event, barmatz.events.LoaderEvent);
			
			removeLoaderListeners();
			
			try
			{
				data = JSON.parse(event.response.data);
			}
			catch(error)
			{
				onLoaderError(event);
				return;
			}
			
			_this.set('id', data.id);
			_this.set('userName', data.userName);
			_this.set('firstName', data.first_name);
			_this.set('lastName', data.last_name);
			_this.set('created', barmatz.utils.Date.toDate(data.created));
			_this.set('active', data.active == '1' ? true : false);
			_this.dispatchEvent(new barmatz.events.UserModelEvent(barmatz.events.UserModelEvent.DATA_LOAD_SUCCESS));
		}
	
		function onLoaderError(event)
		{
			removeLoaderListeners();
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
		
		request = new barmatz.net.Request(barmatz.forms.Config.BASE_URL + '/api/user/login.php');
		request.method = barmatz.net.Methods.POST;
		request.data = {u: userName, p: password};
		
		loader = new barmatz.net.Loader();
		addLoaderListeners();
		loader.load(request);
		
		function addLoaderListeners()
		{
			loader.addEventListener(barmatz.events.LoaderEvent.SUCCESS, onLoaderSuccess);
			loader.addEventListener(barmatz.events.LoaderEvent.ERROR, onLoaderError);
		}
		
		function removeLoaderListeners()
		{
			loader.removeEventListener(barmatz.events.LoaderEvent.SUCCESS, onLoaderSuccess);
			loader.removeEventListener(barmatz.events.LoaderEvent.ERROR, onLoaderError);
		}
		
		function onLoaderSuccess(event)
		{
			var data;
			
			barmatz.utils.DataTypes.isNotUndefined(event);
			barmatz.utils.DataTypes.isInstanceOf(event, barmatz.events.LoaderEvent);

			removeLoaderListeners();
			
			try
			{
				data = JSON.parse(event.response.data);
			}
			catch(error)
			{
				onLoaderError(event);
				return;
			}
			
			_this.set('id', data.user.id);
			_this.dispatchEvent(new barmatz.events.UserModelEvent(barmatz.events.UserModelEvent.LOGIN_SUCCESS, data.target));
		}
		
		function onLoaderError(event)
		{
			removeLoaderListeners();
			_this.dispatchEvent(new barmatz.events.UserModelEvent(barmatz.events.UserModelEvent.LOGIN_FAIL));
		}
	}},
	logout: {value: function()
	{
		var _this, request, loader;
		
		_this = this;
		
		request = new barmatz.net.Request(barmatz.forms.Config.BASE_URL + '/api/user/logout.php');
		request.method = barmatz.net.Methods.POST;
		
		loader = new barmatz.net.Loader();
		addLoaderListeners();
		loader.load(request);
		
		function addLoaderListeners()
		{
			loader.addEventListener(barmatz.events.LoaderEvent.SUCCESS, onLoaderSuccess);
			loader.addEventListener(barmatz.events.LoaderEvent.ERROR, onLoaderError);
		}
		
		function removeLoaderListeners()
		{
			loader.removeEventListener(barmatz.events.LoaderEvent.SUCCESS, onLoaderSuccess);
			loader.removeEventListener(barmatz.events.LoaderEvent.ERROR, onLoaderError);
		}
		
		function onLoaderSuccess(event)
		{
			removeLoaderListeners();
			_this.dispatchEvent(new barmatz.events.FormModelEvent(barmatz.events.UserModelEvent.LOGOUT_SUCCESS));
		}
		
		function onLoaderError(event)
		{
			removeLoaderListeners();
			_this.dispatchEvent(new barmatz.events.FormModelEvent(barmatz.events.UserModelEvent.LOGOUT_FAIL));
		}
	}}
});
/** barmatz.net.Encoding **/
window.barmatz.net.Encoding = function(){};

Object.defineProperties(barmatz.net.Encoding,
{
	HTML5: {value: 'text/plain'},
	FORM: {value: 'application/x-www-form-urlencoded'},
	FILES: {value: 'multipart/form-data'}
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
		var _this, url, contentTypeSet, i;
		
		barmatz.utils.DataTypes.isNotUndefined(request);
		barmatz.utils.DataTypes.isInstanceOf(request, barmatz.net.Request);
		
		_this = this;
		url = request.url;

		if(request.data && request.method == barmatz.net.Methods.GET)
			url += (url.indexOf('?') > -1 ? '&' : '?') + barmatz.net.Loader.serialize(request.data);
		
		this._xhr.addEventListener('readystatechange', onReadyStateChange);
		
		if(request.credentials)
			this._xhr.open(request.method, url, request.async, request.credentials.user ? request.credentials.user : null, reqeust.credentials.password ? reqeust.credentials.password : null);
		else
			this._xhr.open(request.method, url, request.async);
		
		if(request.headers)
			for(i = 0; i < request.headers.length; i++)
			{
				this._xhr.setRequestHeader(request.headers[i].header, request.headers[i].value);
				if(request.headers[i].header.toLowerCase() == 'content-type')
					contentTypeSet = true;
			}
		
		if(!contentTypeSet)
			this._xhr.setRequestHeader('Content-Type', barmatz.net.Encoding.FORM);
		
		if(request.method == barmatz.net.Methods.POST)
			this._xhr.send(barmatz.net.Loader.serialize(request.data));
		else
			this._xhr.send();
		
		function onReadyStateChange(event)
		{
			var type, response;
			
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
					_this.dispatchEvent(new barmatz.events.LoaderEvent(barmatz.events.LoaderEvent.HEADERS_RECEIVED, request));
					break;
				case 3:
					_this.dispatchEvent(new barmatz.events.LoaderEvent(barmatz.events.LoaderEvent.LOADING, request));
					break;
				case 4:
					response = new barmatz.net.Response(request.url, _this._xhr.responseText, _this._xhr.responseType || '', _this._xhr.status, _this._xhr.getAllResponseHeaders().split('\n'));

					_this.dispatchEvent(new barmatz.events.LoaderEvent(barmatz.events.LoaderEvent.COMPLETE));
					
					if(response.status == 200)
						_this.dispatchEvent(new barmatz.events.LoaderEvent(barmatz.events.LoaderEvent.SUCCESS, response));
					else
						_this.dispatchEvent(new barmatz.events.LoaderEvent(barmatz.events.LoaderEvent.ERROR, response));
					break;
			}
		}
	}}
});
/** barmatz.net.Methods **/
window.barmatz.net.Methods = function(){};

Object.defineProperties(barmatz.net.Methods,
{
	GET: {value: 'GET'},
	POST: {value: 'POST'},
	PUT: {value: 'PUT'},
	DELETE: {value: 'DELETE'}	
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
	}, set: function(value)
	{
		this.set('url', value);
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
	}},
	headers: {get: function()
	{
		return this.get('headers');
	}, set: function(value)
	{
		barmatz.utils.DataTypes.isInstanceOf(value, Array);
		this.set('headers', value);
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
/** barmatz.net.RequestHeader **/
window.barmatz.net.RequestHeader = function(header, value)
{
	barmatz.utils.DataTypes.isNotUndefined(header);
	barmatz.utils.DataTypes.isNotUndefined(value);
	barmatz.utils.DataTypes.isTypeOf(header, 'string');
	barmatz.utils.DataTypes.isTypeOf(value, 'string');
	barmatz.mvc.Model.call(this);
	this.set('header', header);
	this.set('value', value);
};

barmatz.net.RequestHeader.prototype = new barmatz.mvc.Model();
barmatz.net.RequestHeader.prototype.constructor = barmatz.net.RequestHeader;

Object.defineProperties(barmatz.net.RequestHeader.prototype,
{
	header: {get: function()
	{
		return this.get('header');
	}, set: function(value)
	{
		barmatz.utils.DataTypes.isTypeOf(value, 'string');
		this.set('header', value);
	}},
	value: {get: function()
	{
		return this.get('value');
	}, set: function(value)
	{
		barmatz.utils.DataTypes.isTypeOf(value, 'string');
		this.set('value', value);
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
