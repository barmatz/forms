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
		
		for(i in bitsB)
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
		
		for(i in arguments)
			bits = bits.concat(this.parseBit(arguments[i]));
		
		filterredBits = bits.filter(function(a,b,c)
		{
			return filterredBits.indexOf(a) >= 0 ? false : filterredBits.push(a) >= 0;
		});
		
		for(i in filterredBits)
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
	SUBMISSION_FAILED: {value: 'submissionFailed'}
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
		return this.formatToString('FormModelEvent', 'type');
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
		barmatz.forms.factories.ControllerFactory.createJQueryDialogController(loadingDialog);
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
		removeModelListeners(); 
		removeLoadingDialog();
	}
	 
	function onModelSubmitionFailed(event)
	{
		submittingForm = false;
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
	this.set('id', '');
	this.set('name', '');
	this.set('submitButtonLabel', 'Submit');
	this.set('method', barmatz.forms.Methods.GET);
	this.set('encoding', barmatz.net.Encoding.FORM);
	this.set('created', null);
	this.set('fingerprint', null);
	this.set('direction', barmatz.forms.Directions.LTR);
	this.set('targetEmail', '');
	this.set('layoutId', 1);
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
		this.set('layoutId', value);
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
				field.max = item.max;
			
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
			
			object.fields.push(field);
		});
		
		return JSON.stringify(object);
	}},
	reset: {value: function()
	{
		this.set('id', '');
		this.set('name', '');
		this.set('method', barmatz.forms.Methods.GET);
		this.set('encoding', barmatz.net.Encoding.FORM);
		this.set('created', null);
		this.set('fingerprint', null);
		this.set('stylesheets', []);
		this.set('direction', barmatz.forms.Directions.LTR);
		this.set('targetEmail', '');
		this.set('layoutId', 1);
		while(this.numItems > 0)
			this.removeItemAt(this.numItems - 1);
	}},
	save: {value: function(model)
	{
		var _this = this, request, loader;

		barmatz.utils.DataTypes.isNotUndefined(model);
		barmatz.utils.DataTypes.isInstanceOf(model, barmatz.forms.users.UserModel);
		
		this.dispatchEvent(new barmatz.events.FormModelEvent(barmatz.events.FormModelEvent.SAVING));

		request = new barmatz.net.Request('http://quiz.co.il/api/form/save.php');
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
		this.set('id', null);
		this.set('name', name);
		this.save(model);
	}},
	loadByFingerprint: {value: function(fingerprint)
	{
		var _this, request, loader;
		
		barmatz.utils.DataTypes.isNotUndefined(fingerprint);	
		barmatz.utils.DataTypes.isTypeOf(fingerprint, 'string');
		
		_this = this;
		
		this.dispatchEvent(new barmatz.events.FormModelEvent(barmatz.events.FormModelEvent.LOADING_FORM));
		
		request = new barmatz.net.Request('http://quiz.co.il/api/form.php');
		request.method = barmatz.net.Methods.GET;
		request.data = {f: fingerprint};
		
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
			
			_this.copy(data.fingerprint, data.data);
			_this.dispatchEvent(new barmatz.events.FormModelEvent(barmatz.events.FormModelEvent.LOADING_FORM_COMPLETE));
		}
		
		function onLoaderError(event)
		{
			removeLoaderListeners();
			_this.dispatchEvent(new barmatz.events.FormModelEvent(barmatz.events.FormModelEvent.LOADING_FORM_ERROR));
		}
	}},
	delete: {value: function()
	{
		var _this, request, loader;
		
		_this = this;
		
		this.dispatchEvent(new barmatz.events.FormModelEvent(barmatz.events.FormModelEvent.DELETING));

		request = new barmatz.net.Request('http://quiz.co.il/api/form/delete.php');
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

		request = new barmatz.net.Request('http://www.quiz.co.il/api/form/submit.php');
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
				field.max = parseInt(fieldData.max);
			
			if(field instanceof barmatz.forms.fields.CheckboxFieldModel)
				field.checked = fieldData.checked;
			
			if(field instanceof barmatz.forms.fields.DropboxModel)
				if(fieldData instanceof barmatz.forms.fields.DropboxModel)
					fieldData.forEach(function(item, index, collection)
					{
						addItemToField(field, item);
					});
				else
					for(i in fieldData.items)
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
/** barmatz.forms.Methods **/
window.barmatz.forms.Methods = function(){};

Object.defineProperties(barmatz.forms.Methods,
{
	GET: {value: 'GET'},
	POST: {value: 'POST'}
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
		return this.equals(value, /^[0-9]{2,3}[2-9]\d{6}$/);
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
		barmatz.utils.DataTypes.isNotUndefined(errorMessageView);
		barmatz.utils.DataTypes.isInstanceOf(model, barmatz.forms.fields.FieldModel);
		barmatz.utils.DataTypes.isInstanceOf(fieldView, HTMLElement);
		barmatz.utils.DataTypes.isInstanceOf(errorMessageView, HTMLElement);
		return new barmatz.forms.fields.FieldController(model, fieldView, errorMessageView);
	}},
	createJQueryDialogController: {value: function(view)
	{
		barmatz.utils.DataTypes.isNotUndefined(view);
		barmatz.utils.DataTypes.isInstanceOf(view, HTMLElement);
		return new barmatz.forms.ui.JQueryDialogController(view);
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
				for(i in content)
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
		barmatz.utils.DataTypes.isInstanceOf(model, barmatz.forms.fields.FieldModel);
		
		_this = this;
		field = this.createElement(getElementTagName(model.type));
		
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
			barmatz.utils.DataTypes.isInstanceOf(model, barmatz.forms.fields.FieldModel);
			
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
		var _this, wrapper, grip, label, field, mandatory, deleteButton;
		
		barmatz.utils.DataTypes.isNotUndefined(model);
		barmatz.utils.DataTypes.isInstanceOf(model, barmatz.forms.fields.FieldModel);
		
		_this = this;
		wrapper = this.createElement('tr', 'forms-workspace-item');
		grip = this.createElement('span', 'forms-grip ui-icon ui-icon-grip-solid-vertical');
		label = this.createElementWithContent('label', '', model.label ? model.label : '');
		field = this.createFormFieldElement(model);
		mandatory = this.createElementWithContent('span', 'forms-form-item-mandatory', mandatory ? '*' : '');
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
			returnWrapper.enabledField = addFieldToWrapper('boolean', 'enabled', 'enabled', model.enabled);
			returnWrapper.widthField = addFieldToWrapper('number', 'width', 'width', model.width);
		}
		
		if(model instanceof barmatz.forms.fields.FileFieldModel)
			returnWrapper.acceptField = addFieldToWrapper('array', 'accept', 'accept', model.accept);

		if(model instanceof barmatz.forms.fields.TextFieldModel)
			returnWrapper.maxField = addFieldToWrapper('number', 'max', 'max', model.max);
		
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
		
		returnWrapper.validationOptionsButton = addFieldToWrapper('button', '', 'Validation options');
		
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
				
				for(i in value)
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
	createExportPromptDialog: {value: function(fingerprint, open)
	{
		var dir, embedCode, textarea;
		
		barmatz.utils.DataTypes.isNotUndefined(fingerprint);
		barmatz.utils.DataTypes.isTypeOf(open, 'boolean', true);
		
		dir = location.href.replace(location.hash, '').replace(location.search, '').replace(/(^\w+:\/\/.+)\/.+\..+$/, '$1') + '/js'; 
		embedCode = "<div name=\"formContainer\" fingerprint=\"" + fingerprint + "\">Loading...</div>" +
					"<script type=\"text/javascript\">" +
					"(function(w,d)" +
					"{" +
						"w.barmatz && w.barmatz.forms && !w.barmatz.forms.embed" +
						" ? barmatz.forms.embed('" + fingerprint + "')" +
						" : l('" + dir + "/embed.js');" +
						"function l(s)" +
						"{" +
							"a=d.createElement('script');" +
							"a.src=s;" +
							"b=d.getElementsByTagName('script')[0];" +
							"b.parentNode.insertBefore(a,b);" +
						"}" +
					"})(window,document)" +
					"</script>";
		
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
		var _this, options, nameField, methodField, encodingField, submitButtonLabelField, stylesheetsField, directionField, targetEmailField, layoutIdField;
		
		barmatz.utils.DataTypes.isNotUndefined(model);
		barmatz.utils.DataTypes.isInstanceOf(model, barmatz.forms.FormModel);

		_this = this;
		
		options = new barmatz.forms.ui.TableOptions();
		options.bodyRows = [];
		
		nameField = createField('Name');
		nameField.value = model.name;
		
		submitButtonLabelField = createField('Submit button label');
		submitButtonLabelField.value = model.submitButtonLabel;
		
		targetEmailField = createField('Target email');
		targetEmailField.value = model.targetEmail;
		
		directionField = createDropbox('Direction', 'formDirection', [barmatz.forms.Directions.LTR, barmatz.forms.Directions.RTL]);
		directionField.value = model.direction;
		
		layoutIdField = createDropbox('Layout', 'formLayoutId', ['1', '2']);
		layoutIdField.value = model.layoutId;
		
		stylesheetsField = createField('Stylesheets');
		stylesheetsField.value = model.stylesheets.join(' ');
		
		methodField = createDropbox('Method', 'formMethod', ['GET', 'POST']);
		methodField.value = model.method;
		
		encodingField = createDropbox('Encoding', 'formEncoding', [barmatz.net.Encoding.FORM, barmatz.net.Encoding.FILES]);
		encodingField.value = model.encoding;
		
		return {wrapper: this.createTable(options), nameField: nameField, submitButtonLabelField: submitButtonLabelField, methodField: methodField, encodingField: encodingField, stylesheetsField: stylesheetsField, directionField: directionField, targetEmailField: targetEmailField, layoutIdField: layoutIdField};
		
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
	}},
	createValidatorModel: {value: function(data)
	{
		barmatz.utils.DataTypes.isTypeOf(data, 'object', true);
		return new barmatz.forms.fields.ValidatorModel(data);
	}}
});
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
	barmatz.forms.TypeModel.call(this, type);
	this.set('name', name);
	this.set('label', '');
	this.set('mandatory', false);
	this.set('value', '');
	this.set('enabled', true);
	this.set('validator', barmatz.forms.factories.ModelFactory.createValidatorModel());
	this.set('width', NaN);
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
		clone.value = this.value;
		clone.enabled = this.enabled;
		clone.validator = this.validator.clone();
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
	var settingValue, cachedErrorMessageVisibility;
	
	barmatz.utils.DataTypes.isNotUndefined(model);
	barmatz.utils.DataTypes.isNotUndefined(fieldView);
	barmatz.utils.DataTypes.isNotUndefined(errorMessageView);
	barmatz.utils.DataTypes.isInstanceOf(model, barmatz.forms.fields.FieldModel);
	barmatz.utils.DataTypes.isInstanceOf(fieldView, HTMLElement);
	barmatz.utils.DataTypes.isInstanceOf(errorMessageView, HTMLElement);
	barmatz.mvc.Controller.call(this);
	
	model.addEventListener(barmatz.events.ModelEvent.VALUE_CHANGED, onModelValueChanged);
	model.addEventListener(barmatz.events.FieldModelEvent.VALID, onModelValid);
	model.addEventListener(barmatz.events.FieldModelEvent.INVALID, onModelInvalid);
	fieldView.addEventListener('keydown', onFieldViewKeyDown);
	fieldView.addEventListener('change', onFieldViewChange);
	setModelValue();
	setErrorMessageContent();
	hideErrorMessage();
	
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
		errorMessageView.innerHTML = 'invalid';
	}
	
	function showErrorMessage()
	{
		errorMessageView.style.visibility = cachedErrorMessageVisibility;
		cachedErrorMessageVisibility = null;
	}
	
	function hideErrorMessage()
	{
		cachedErrorMessageVisibility = errorMessageView.style.visibility;
		errorMessageView.style.visibility = 'hidden';
	}
	
	function isErrorMessageHidden()
	{
		return errorMessageView.style.visibility == 'hidden';
	}
	
	function onModelValueChanged(event)
	{
		barmatz.utils.DataTypes.isNotUndefined(event);
		barmatz.utils.DataTypes.isInstanceOf(event, barmatz.events.ModelEvent);

		if(event.key == 'value')
		{
			if(!settingValue)
			{
				settingValue = true;
				fieldView.value = model.value;
				settingValue = false;
			}
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
		
		errors = barmatz.utils.Bitwise.parseBit(event.errors);
		errorMessageView.innerHTML = '';
		
		for(i in errors)
			switch(errors[i])
			{
				default:
					throw new Error('Unknown error code');
					break;
				case barmatz.forms.Validator.NONE:
					break;
				case barmatz.forms.Validator.NOT_EMPTY:
					errorMessageView.appendChild(barmatz.forms.factories.DOMFactory.createFormFieldErrorMessageItemElement('value is empty'));
					break;
				case barmatz.forms.Validator.EQUALS:
					errorMessageView.appendChild(barmatz.forms.factories.DOMFactory.createFormFieldErrorMessageItemElement('invalid value'));
					break;
				case barmatz.forms.Validator.VALID_EMAIL:
					errorMessageView.appendChild(barmatz.forms.factories.DOMFactory.createFormFieldErrorMessageItemElement('invalid email address'));
					break;
				case barmatz.forms.Validator.VALID_PHONE:
					errorMessageView.appendChild(barmatz.forms.factories.DOMFactory.createFormFieldErrorMessageItemElement('invalid phone number'));
					break;
				case barmatz.forms.Validator.MIN_LENGTH:
					errorMessageView.appendChild(barmatz.forms.factories.DOMFactory.createFormFieldErrorMessageItemElement('value must be ' + model.validator.minLength + ' characters minimum'));
					break;
				case barmatz.forms.Validator.MAX_LENGTH:
					errorMessageView.appendChild(barmatz.forms.factories.DOMFactory.createFormFieldErrorMessageItemElement('value must be ' + model.validator.maxLength + ' characters maximum'));
					break;
				case barmatz.forms.Validator.EXACT_LENGTH:
					errorMessageView.appendChild(barmatz.forms.factories.DOMFactory.createFormFieldErrorMessageItemElement('value must be exactly ' + model.validator.exactLength + ' characters'));
					break;
				case barmatz.forms.Validator.GREATER_THAN:
					errorMessageView.appendChild(barmatz.forms.factories.DOMFactory.createFormFieldErrorMessageItemElement('value must be greater than ' + model.validator.greaterThan));
					break;
				case barmatz.forms.Validator.LESSER_THAN:
					errorMessageView.appendChild(barmatz.forms.factories.DOMFactory.createFormFieldErrorMessageItemElement('valud must be lesser than ' + model.validator.lesserThan));
					break;
				case barmatz.forms.Validator.DIGITS_ONLY:
					errorMessageView.appendChild(barmatz.forms.factories.DOMFactory.createFormFieldErrorMessageItemElement('only digits are allowed'));
					break;
				case barmatz.forms.Validator.NOT_DIGITS:
					errorMessageView.appendChild(barmatz.forms.factories.DOMFactory.createFormFieldErrorMessageItemElement('cannot contain digits'));
					break;
			}
		
		if(isErrorMessageHidden())
			showErrorMessage();
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

		if(option.checked)
		{
			if(model.validator.code)
				bit = barmatz.utils.Bitwise.concat(model.validator.code, bit);
		}
		else
			bit = barmatz.utils.Bitwise.slice(model.validator.code, bit); 
		
		model.validator.code = bit; 
		
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
/** embed **/
barmatz.forms.embed = function(fingerprint)
{
	var dictionary = new barmatz.utils.Dictionary();
	
	getContainers();
	
	function getContainers()
	{
		var containers, i;
		
		containers = Array.prototype.slice.call(document.getElementsByName('formContainer')).filter(filterFormContainers);

		for(i = 0; i < containers.length; i++)
			embedForm(containers[i]);
	}
	
	function filterFormContainers(element)
	{
		return !fingerprint || element.getAttribute('fingerprint') == fingerprint;
	}
	
	function embedForm(container)
	{
		loadFormForContainer(container);
	}
	
	function loadFormForContainer(container)
	{
		var formModel = barmatz.forms.factories.ModelFactory.createFormModel();
		dictionary.add(formModel, container);
		addFormModelListeners(formModel);
		formModel.loadByFingerprint(container.getAttribute('fingerprint'));
	}

	function addFormModelListeners(model)
	{
		model.addEventListener(barmatz.events.FormModelEvent.LOADING_FORM_COMPLETE, onLoadingFormComplete);
		model.addEventListener(barmatz.events.FormModelEvent.LOADING_FORM_ERROR, onLoadingFormError);
	}
	
	function removeFormModelListeners(model)
	{
		model.removeEventListener(barmatz.events.FormModelEvent.LOADING_FORM_COMPLETE, onLoadingFormComplete);
		model.removeEventListener(barmatz.events.FormModelEvent.LOADING_FORM_ERROR, onLoadingFormError);
	}
	
	function addFormToContainer(model)
	{
		var container, wrapper, field, submitButton, i;
		
		container = dictionary.get(model);
		wrapper = barmatz.forms.factories.DOMFactory.createElement('div', 'forms-form-wrapper forms-layout-' + model.layoutId);
		form = barmatz.forms.factories.DOMFactory.createElement('form');
		submitButton = barmatz.forms.factories.DOMFactory.createElementWithContent('button', 'forms-form-submit-button', model.submitButtonLabel);
		
		container.innerHTML = '';
		container.appendChild(barmatz.forms.factories.DOMFactory.createStylesheet('http://www.quiz.co.il/css/form.css'));
		
		switch(model.direction)
		{
			default:
				throw new Error('Unknown direction');
				break;
			case barmatz.forms.Directions.LTR:
				barmatz.utils.CSS.addClass(wrapper, 'forms-ltr');
				break;
			case barmatz.forms.Directions.RTL:
				barmatz.utils.CSS.addClass(wrapper, 'forms-rtl');
				break;
		}

		for(i = 0; i < model.stylesheets.length; i++)
			container.appendChild(barmatz.forms.factories.DOMFactory.createStylesheet(model.stylesheets[i]));
		
		model.forEach(function(item, index, collection)
		{
			var field, errorMessage;
			
			field = barmatz.forms.factories.DOMFactory.createFormFieldElement(item);
			field.name = item.name;
			
			if(item instanceof barmatz.forms.fields.PhoneFieldModel)
				field.getElementsByTagName('input')[0].style.width = item.width + 'px';
			else
				field.style.width = item.width + 'px';
			
			errorMessage = barmatz.forms.factories.DOMFactory.createFormFieldErrorMessageElement();
			
			form.appendChild(barmatz.forms.factories.DOMFactory.createElementWithContent('div', 'forms-form-item', [
				barmatz.forms.factories.DOMFactory.createElementWithContent('label', '', item.label),
				field,
				barmatz.forms.factories.DOMFactory.createElementWithContent('span', 'forms-form-item-mandatory', item.mandatory ? '*' : ''),
				 errorMessage
			]));
			barmatz.forms.factories.ControllerFactory.createFieldController(item, field, errorMessage);
		});
		
		form.appendChild(barmatz.forms.factories.DOMFactory.createElementWithContent('div', 'forms-form-item forms-form-submit', submitButton));
		wrapper.appendChild(form);
		container.appendChild(wrapper);
		
		barmatz.forms.factories.ControllerFactory.createFormController(model, form, submitButton);
	}
	
	function onLoadingFormComplete(event)
	{
		addFormToContainer(event.target);
		removeFormModelListeners(event.target);
		dictionary.remove(event.target);
	}
	
	function onLoadingFormError(event)
	{
		removeFormModelListeners(event.target);
		dictionary.get(event.target).innerHTML = 'Error loading form';
		dictionary.remove(event.target);
	}
};
barmatz.forms.embed();
