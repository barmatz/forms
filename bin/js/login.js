/** namespaces **/
barmatz = {
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
/** barmatz.utils.Array **/
barmatz.utils.Array = {
	toArray: function(object)
	{
		var array = [];
		
		this.forEach(object, function(item, index, collection)
		{
			array[index] = item;
		});
		
		return array;
	},
	forEach: function(array, callback, thisObject)
	{
		var i;
		for(i = 0; i < array.length; i++)
			callback.call(thisObject || this, array[i], i, array);
	}
};
/** barmatz.utils.DataTypes **/
barmatz.utils.DataTypes = {
	UNDEFINED_ERROR: 'expected property is undefined',
	INVALID_VALUE_ERROR: 'value is not valid',
	WRONG_TYPE: 'data type is wrong',
	WRONG_INSTANCE: 'instance is wrong object',
	WRONG_TYPE_INSTANCE: 'data type is wrong or instance is wrong object',
	VALUE_NULL: 'value is null',
	_recursiveVlidation: function(value, collection, method, errorMessage, allowNull)
	{
		var errors;

		if(!allowNull)
			this.isValid(value);
		else if(allowNull && value == null)
			return true;
		
		errors = 0;
		barmatz.utils.Array.forEach(collection, function(item, index, collection)
		{
			try
			{
				method.call(this, value, item, allowNull);
			}
			catch(error)
			{
				errors++;
			}
		}, this);
		
		if(errors == collection.length)
			if(!this.throwError(TypeError, errorMessage))
				return false;
		
		return true;
	},
	getSilent: function()
	{
		return this._silent || false;
	}, 
	setSilent: function(value)
	{
		this._silent = value;
	},
	applySilent: function(method)
	{
		var returnValue, args;
		
		args = barmatz.utils.Array.toArray(arguments).slice(1, arguments.length);
		
		this.setSilent(true);
		returnValue = this[method].apply(this, args);
		this.setSilent(false);
		
		return returnValue;
	},
	throwError: function(error, message)
	{
		if(this.getSilent())
			return false;
		else
		{
			throw new error(message);
			return true;
		}
	},
	isNotUndefined: function(value)
	{
		if(value === undefined)
			if(!this.throwError(ReferenceError, this.UNDEFINED_ERROR))
				return false;
		return true;
	},
	isValid: function(value)
	{
		if(value == null)
			if(!this.throwError(TypeError, this.INVALID_VALUE_ERROR))
				return false;
		return true;
	},
	isAllowNull: function(value)
	{
		if(value === null)
			if(!this.throwError(TypeError, this.VALUE_NULL))
			return false;
		return true;
	},
	isTypeOf: function(value, type, allowNull)
	{
		if(!allowNull)
			this.isValid(value);
		else if(allowNull && value == null)
			return true;
		if(typeof value != type)
			if(!this.throwError(TypeError, this.WRONG_TYPE))
				return false;
		return true;
	},
	isTypesOf: function(value, types, allowNull)
	{
		this._recursiveVlidation(value, types, this.isTypeOf, this.WRONG_INSTANCE, allowNull);
		return true;
	},
	isInstanceOf: function(instance, object, allowNull)
	{
		if(!allowNull)
			this.isValid(instance);
		else if(allowNull && instance == null)
			return true;
		if(!(instance instanceof object))
			if(!this.throwError(TypeError, this.WRONG_INSTANCE))
				return false;
		return true;
	},
	isInstancesOf: function(instances, objects, allowNull)
	{
		this._recursiveVlidation(instances, objects, this.isInstanceOf, this.WRONG_INSTANCE, allowNull);
		return true;
	},
	isTypeOrInstance: function(value, type, object, allowNull)
	{
		if(!allowNull)
			this.isValid(value);
		else if(allowNull && value == null)
			return true;
		if(typeof value != type || !(value instanceof object))
			if(!this.throwError(TypeError, this.WRONG_TYPE_INSTANCE))
				return false;
		return true;
	},
	isTypesOrInstances: function(value, types, objects, allowNull)
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
	}
};
/** barmatz.events.Event **/
barmatz.events.Event = function(type)
{
	barmatz.utils.DataTypes.isNotUndefined(type);
	barmatz.utils.DataTypes.isTypeOf(type, 'string', true);
	this._type = type;
};

barmatz.events.Event.prototype = {
	getTarget: function()
	{
		return this._target;
	},
	getType: function()
	{
		return this._type;
	},
	clone: function()
	{
		var event = new barmatz.events.Event(this.getType());
		event._target = this.getTarget();
		return event;
	},
	formatToString: function(className)
	{
		var parameters = [], key, i;
		
		arguments = barmatz.utils.Array.toArray(arguments);
		
		for(i = 1; i < arguments.length; i++)
		{
			key = arguments[i];
			
			if(!this.hasOwnProperty(key))
				key = '_' + key;
				
			parameters.push(arguments[i] + '=' + this[key]);
		}
		
		return '[' + className + '(' + parameters.join(', ') + ')]';
	},
	toString: function()
	{
		return this.formatToString('Event', 'type');
	}
};
/** barmatz.events.EventDispatcher **/
barmatz.events.EventDispatcher = function(target)
{
	this._target = target || this;
	this._listeners = {};
};

barmatz.events.EventDispatcher.prototype = {
	addEventListener: function(type, listener)
	{
		barmatz.utils.DataTypes.isTypeOf(type, 'string');
		barmatz.utils.DataTypes.isTypeOf(listener, 'function');
		
		if(!this._listeners[type])
			this._listeners[type] = [];
		
		this._listeners[type].push(listener);
	},
	dispatchEvent: function(event)
	{
		var queue, i;
		
		barmatz.utils.DataTypes.isInstanceOf(event, barmatz.events.Event);
		
		event._target = this._target;
		
		for(i in this._listeners)
		{
			if(i === event.getType())
			{
				queue = [];
				
				barmatz.utils.Array.forEach(this._listeners[i], function(item, index, collection)
				{
					queue.push(item);
				});
				barmatz.utils.Array.forEach(queue, function(item, index, collection)
				{
					item.call(this, event);
				}, this);				
			}
		}
	},
	hasEventListener: function(type)
	{
		return this._listeners[type] ? true : false;
	},
	removeEventListener: function(type, listener)
	{
		if(this._listeners[type])
		{
			barmatz.utils.Array.forEach(this._listeners[type], function(item, index, collection)
			{
				if(item === listener)
					collection.splice(index, 1);
			}, this);
			
			if(this._listeners[type].length == 0)
				delete this._listeners[type];
		}
	},
	toJSON: function()
	{
		var object, i;
		
		object = {};
		
		for(i in this)
			object[i] = this[i];
		
		delete object._target;
		delete object._listeners;
		
		return object;
	}
};
/** barmatz.events.LoaderEvent **/
barmatz.events.LoaderEvent = function(type)
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

barmatz.events.LoaderEvent.UNSENT = 'unsent';
barmatz.events.LoaderEvent.OPENED = 'opened';
barmatz.events.LoaderEvent.HEADERS_RECEIVED = 'headersReceived';
barmatz.events.LoaderEvent.LOADING = 'loading';
barmatz.events.LoaderEvent.COMPLETE = 'complete';
barmatz.events.LoaderEvent.SUCCESS = 'success';
barmatz.events.LoaderEvent.ERROR = 'error';
barmatz.events.LoaderEvent.prototype = new barmatz.events.Event(null);
barmatz.events.LoaderEvent.prototype.constructor = barmatz.events.LoaderEvent;
barmatz.events.LoaderEvent.prototype.getRequest = function()
{
	return this._request;
};
barmatz.events.LoaderEvent.prototype.getResponse = function()
{
	return this._response;
};
barmatz.events.LoaderEvent.prototype.clone = function()
{
	var event = new barmatz.events.LoaderEvent(this.getType());
	event._target = this.getTarget();
	event._request = this.getRequest();
	event._response = this.getResponse();
	return event;
};
barmatz.events.LoaderEvent.prototype.toString = function()
{
	switch(this.getType())
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
};
/** barmatz.events.ModelEvent **/
barmatz.events.ModelEvent = function(type)
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
barmatz.events.ModelEvent.VALUE_CHANGED = 'valueChanged';
barmatz.events.ModelEvent.prototype = new barmatz.events.Event(null);
barmatz.events.ModelEvent.prototype.constructor = barmatz.events.ModelEvent;
barmatz.events.ModelEvent.prototype.getKey = function()
{
	return this._key;
};
barmatz.events.ModelEvent.prototype.getValue = function()
{
	return this._value;
};
barmatz.events.ModelEvent.prototype.clone = function()
{
	var event = new barmatz.events.ModelEvent(this.getType());
	event._target = this.getTarget();
	event._key = this.getKey();
	event._value = this.getValue();
	return event;
};
barmatz.events.ModelEvent.prototype.toString = function()
{
	return this.formatToString('ModelEvent', 'type', 'key', 'value');
};
/** barmatz.events.UserEvent **/
barmatz.events.UserEvent = function(type)
{
	barmatz.utils.DataTypes.isNotUndefined(type);
	barmatz.utils.DataTypes.isTypeOf(type, 'string');
	barmatz.events.Event.call(this, type);
	
	this._forms = null;
	this._targetURL = null;
	
	switch(type)
	{
		case barmatz.events.UserEvent.GET_FORMS_SUCCESS:
			this._forms = arguments[1];
			break;
		case barmatz.events.UserEvent.LOGIN_SUCCESS:
			this._targetURL = arguments[1];
			break;
	}
};

barmatz.events.UserEvent.LOGIN_SUCCESS = 'loginSuccess';
barmatz.events.UserEvent.LOGIN_FAIL = 'loginFail';
barmatz.events.UserEvent.LOGOUT_SUCCESS = 'logoutSuccess';
barmatz.events.UserEvent.LOGOUT_FAIL = 'logoutFail';
barmatz.events.UserEvent.DATA_LOAD_SUCCESS = 'dataLoadSuccess';
barmatz.events.UserEvent.DATA_LOAD_FAIL = 'dataLoadFail';
barmatz.events.UserEvent.GET_FORMS_SUCCESS = 'getFormsSuccess';
barmatz.events.UserEvent.GET_FORMS_FAIL = 'getFormsFail';
barmatz.events.UserEvent.prototype = new barmatz.events.Event(null);
barmatz.events.UserEvent.prototype.constructor = barmatz.events.UserEvent;
barmatz.events.UserEvent.prototype.getForms = function()
{
	return this._forms;
};
barmatz.events.UserEvent.prototype.getTargetURL = function()
{
	return this._targetURL;
};
barmatz.events.UserEvent.prototype.clone = function()
{
	var event = new barmatz.events.UserEvent(this.getType());
	event._target = this.getTarget();
	
	switch(event.getType())
	{
		case barmatz.events.UserEvent.GET_FORMS_SUCCESS:
			event._forms = this.getForms();
			break;
		case barmatz.events.UserEvent.LOGIN_SUCCESS:
			event._targetURL = this.getTargetURL();
			break;
	}
	
	return event;
};
barmatz.events.UserEvent.prototype.toString = function()
{
	switch(this.getType())
	{
		default:
			return this.formatToString('UserEvent', 'type');
			break;
		case barmatz.events.UserEvent.GET_FORMS_SUCCESS:
			return this.formatToString('UserEvent', 'type', 'forms');
			break;
		case barmatz.events.UserEvent.LOGIN_SUCCESS:
			return this.formatToString('UserEvent', 'type', 'targetURL');
			break;
	}
};
/** barmatz.mvc.Controller **/
barmatz.mvc.Controller = function(){};
/** barmatz.mvc.Model **/
barmatz.mvc.Model = function()
{
	barmatz.events.EventDispatcher.call(this);
};
barmatz.mvc.Model.prototype = new barmatz.events.EventDispatcher();
barmatz.mvc.Model.prototype.constructor = barmatz.mvc.Model;
barmatz.mvc.Model.prototype.get = function(key)
{
	return this['_' + key];
};
barmatz.mvc.Model.prototype.set = function(key, value)
{
	barmatz.utils.DataTypes.isNotUndefined(key);
	barmatz.utils.DataTypes.isNotUndefined(value);
	this['_' + key] = value;
	this.dispatchEvent(new barmatz.events.ModelEvent(barmatz.events.ModelEvent.VALUE_CHANGED, key, value));
};
/** barmatz.net.Encoding **/
barmatz.net.Encoding = {
	HTML5: 'text/plain',
	FORM: 'application/x-www-form-urlencoded',
	FILES: 'multipart/form-data'
};
/** barmatz.net.Loader **/
barmatz.net.Loader = function()
{
	barmatz.events.EventDispatcher.call(this);
	
	this.__xhr = null;
};

barmatz.net.Loader.UNSENT = 'UNSENT';
barmatz.net.Loader.OPENED = 'OPENED';
barmatz.net.Loader.HEADERS_RECEIVED = 'HEADERS_RECEIVED';
barmatz.net.Loader.LOADING = 'LOADING';
barmatz.net.Loader.DONE = 'DONE';
barmatz.net.Loader.serialize = function(object, prefix)
{
	var result, key, value;
	
	barmatz.utils.DataTypes.isNotUndefined(object);
	
	result = [];
	 
	for(key in object)
	{
		value = object[key];
		key = prefix ? prefix + "[" + key + "]" : key;
		result.push(typeof value == "object" ? this.serialize(value, key) : encodeURIComponent(key) + "=" + encodeURIComponent(value));
	}
	
	return result.join("&");
};
barmatz.net.Loader.prototype = new barmatz.events.EventDispatcher();
barmatz.net.Loader.prototype.constructor = barmatz.net.Loader;
barmatz.net.Loader.prototype._xhr = function()
{
	if(!this.__xhr)
		this.__xhr = window.XDomainRequest ? new XDomainRequest() : window.XMLHttpRequest ? new XMLHttpRequest() : new ActiveXObject('Microsoft.XMLHTTP');
		
	if(!this.__xhr)
		throw new Error('XMLHttpRequest is not supported');
	
	return this.__xhr;
};
barmatz.net.Loader.prototype.getState = function()
{
	switch(this._xhr().readyState)
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
};
barmatz.net.Loader.prototype.abort = function()
{
	this._xhr().abort();
};
barmatz.net.Loader.prototype.load = function(request)
{
	var _this, xhr, url, data, credentials, headers, contentTypeSet, params;
	
	barmatz.utils.DataTypes.isInstanceOf(request, barmatz.net.Request);
	
	_this = this;
	xhr = this._xhr();
	url = request.getURL();
	data = request.getData();
	credentials = request.getCredentials();
	headers = request.getHeaders();

	if(data && request.getMethod() == barmatz.net.Methods.GET)
		url += (url.indexOf('?') > -1 ? '&' : '?') + barmatz.net.Loader.serialize(data);
	
	if(xhr instanceof XMLHttpRequest)
		xhr.addEventListener('readystatechange', onReadyStateChange);
	else if(isXDomainRequest())
	{
		xhr.onerror = onXHRError;
		xhr.onload = onXHRLoad;
		xhr.onprogress = onXHRProgress;
		xhr.ontimeout = onXHRTimeout;
	}
		
	params = [request.getMethod(), url];
	
	if(isXDomainRequest())
	{
		params.push(request.getAsync());
		if(credentials)
			params.push(credentials.getUser() || null, credentials.getPassword() || null);
	}
	
	try
	{
		xhr.open.apply(xhr, params);
	
		if(!isXDomainRequest())
		{
			if(headers)
				barmatz.utils.Array.forEach(headers, function(item, index, collection)
				{
					xhr.setRequestHeader(item.getHeader(), item.getValue());
					if(item.getHeader().toLowerCase() == 'content-type')
						contentTypeSet = true;
				});
			
			if(!contentTypeSet)
				xhr.setRequestHeader('Content-Type', barmatz.net.Encoding.FORM);
		}
		
		params = [];
		
		if(request.getMethod() == barmatz.net.Methods.POST)
			params.push(barmatz.net.Loader.serialize(data));
	
		xhr.send.apply(xhr, params);
	}
	catch(error)
	{
		_this.dispatchEvent(new barmatz.events.LoaderEvent(barmatz.events.LoaderEvent.COMPLETE));
		_this.dispatchEvent(new barmatz.events.LoaderEvent(barmatz.events.LoaderEvent.ERROR, getResponse()));
	}
	
	function isXDomainRequest()
	{
		return window.XDomainRequest && xhr instanceof XDomainRequest;
	}
	
	function getResponse()
	{
		return new barmatz.net.Response(request.getURL(), xhr.responseText, xhr.responseType || xhr.contentType || '', xhr.status || NaN, xhr.getAllResponseHeaders != null ? xhr.getAllResponseHeaders().split('\n') : []);
	}
	
	function onXHRError()
	{
		_this.dispatchEvent(new barmatz.events.LoaderEvent(barmatz.events.LoaderEvent.COMPLETE));
		_this.dispatchEvent(new barmatz.events.LoaderEvent(barmatz.events.LoaderEvent.ERROR, getResponse()));
	}
	
	function onXHRLoad()
	{
		_this.dispatchEvent(new barmatz.events.LoaderEvent(barmatz.events.LoaderEvent.SUCCESS, getResponse()));
		_this.dispatchEvent(new barmatz.events.LoaderEvent(barmatz.events.LoaderEvent.COMPLETE));
	}
	
	function onXHRProgress()
	{
		_this.dispatchEvent(new barmatz.events.LoaderEvent(barmatz.events.LoaderEvent.LOADING, request));
	}
	
	function onXHRTimeout()
	{
		_this.dispatchEvent(new barmatz.events.LoaderEvent(barmatz.events.LoaderEvent.COMPLETE));
		_this.dispatchEvent(new barmatz.events.LoaderEvent(barmatz.events.LoaderEvent.ERROR, getResponse()));
	}
	
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
				_this.dispatchEvent(new barmatz.events.LoaderEvent(barmatz.events.LoaderEvent.COMPLETE));
				
				response = getResponse();
				
				if(response.getStatus() == 200)
					_this.dispatchEvent(new barmatz.events.LoaderEvent(barmatz.events.LoaderEvent.SUCCESS, response));
				else
					_this.dispatchEvent(new barmatz.events.LoaderEvent(barmatz.events.LoaderEvent.ERROR, response));
				break;
		}
	}
};
/** barmatz.net.Methods **/
barmatz.net.Methods = {
	GET: 'GET',
	POST: 'POST',
	PUT: 'PUT',
	DELETE: 'DELETE'	
};
/** barmatz.net.Request */
barmatz.net.Request = function(url)
{
	barmatz.utils.DataTypes.isNotUndefined(url);
	barmatz.utils.DataTypes.isTypeOf(url, 'string');
	barmatz.mvc.Model.call(this);
	this.set('url', url);
	this.set('method', barmatz.net.Methods.GET);
	this.set('async', true);
	this.set('data', {});
	this.set('credentials', null);
	this.set('headers', []);
};

barmatz.net.Request.prototype = new barmatz.mvc.Model();
barmatz.net.Request.prototype.constructor = barmatz.net.Request;
barmatz.net.Request.prototype.getData = function()
{
	return this.get('data');
};
barmatz.net.Request.prototype.setData = function(value)
{
	this.set('data', value);
};
barmatz.net.Request.prototype.getURL = function()
{
	return this.get('url');
};
barmatz.net.Request.prototype.setURL = function(value)
{
	this.set('url', value);
};
barmatz.net.Request.prototype.getMethod = function()
{
	return this.get('method');
};
barmatz.net.Request.prototype.setMethod = function(value)
{
	barmatz.utils.DataTypes.isTypeOf(value, 'string');
	this.set('method', value);
};
barmatz.net.Request.prototype.getAsync = function()
{
	return this.get('async');
};
barmatz.net.Request.prototype.setAsync = function(value)
{
	barmatz.utils.DataTypes.isTypeOf(value, 'boolean');
	this.set('async', value);
};
barmatz.net.Request.prototype.getCredentials = function()
{
	return this.get('credentials');
};
barmatz.net.Request.prototype.setCredentails = function(value)
{
	barmatz.utils.DataTypes.isInstanceOf(value, barmatz.net.RequestCredentials);
	this.set('credentials', value);
};
barmatz.net.Request.prototype.getHeaders = function()
{
	return this.get('headers');
};
/** barmatz.net.Response **/
barmatz.net.Response = function(url, data, type, status, headers)
{
	barmatz.utils.DataTypes.isNotUndefined(data);
	barmatz.utils.DataTypes.isTypeOf(url, 'string');
	barmatz.utils.DataTypes.isTypeOf(type, 'string');
	barmatz.utils.DataTypes.isTypeOf(status, 'number');
	barmatz.utils.DataTypes.isInstanceOf(headers, window.Array);
	barmatz.mvc.Model.call(this);
	this.set('url', url);
	this.set('data', data);
	this.set('type', type);
	this.set('status', status);
	this.set('headers', headers);
};
barmatz.net.Response.prototype = new barmatz.mvc.Model();
barmatz.net.Response.prototype.constructor = barmatz.net.Response;
barmatz.net.Response.prototype.getURL = function()
{
	return this.get('url');
};
barmatz.net.Response.prototype.getData = function()
{
	return this.get('data');
};
barmatz.net.Response.prototype.getType = function()
{
	return this.get('type');
};
barmatz.net.Response.prototype.getStatus = function()
{
	return this.get('status');
};
barmatz.net.Response.prototype.getHeaders = function()
{
	return this.get('headers');
};
/** barmatz.forms.CollectionModel **/
barmatz.forms.CollectionModel = function()
{
	barmatz.mvc.Model.call(this);
	this.set('items', []);
};
barmatz.forms.CollectionModel.prototype = new barmatz.mvc.Model();
barmatz.forms.CollectionModel.prototype.constructor = barmatz.forms.CollectionModel;
barmatz.forms.CollectionModel.prototype.getNumItems = function()
{
	var items = this.get('items');
	return items ? items.length : 0;
};
barmatz.forms.CollectionModel.prototype.addItem = function(item)
{
	barmatz.utils.DataTypes.isInstanceOf(item, barmatz.mvc.Model);
	this.addItemAt(item, this.get('items').length);
};
barmatz.forms.CollectionModel.prototype.addItemAt = function(item, index)
{
	barmatz.utils.DataTypes.isInstanceOf(item, barmatz.mvc.Model);
	barmatz.utils.DataTypes.isTypeOf(index, 'number');
	this.get('items').splice(index, 0, item);
	this.dispatchEvent(new barmatz.events.CollectionEvent(barmatz.events.CollectionEvent.ITEM_ADDED, item, index));
};
barmatz.forms.CollectionModel.prototype.removeItem = function(item)
{
	barmatz.utils.DataTypes.isInstanceOf(item, barmatz.mvc.Model);
	this.removeItemAt(this.getItemIndex(item));
};
barmatz.forms.CollectionModel.prototype.removeItemAt = function(index)
{
	barmatz.utils.DataTypes.isTypeOf(index, 'number');
	this.dispatchEvent(new barmatz.events.CollectionEvent(barmatz.events.CollectionEvent.ITEM_REMOVED, this.get('items').splice(index, 1)[0], index));
};
barmatz.forms.CollectionModel.prototype.getItemAt = function(index)
{
	barmatz.utils.DataTypes.isTypeOf(index, 'number');
	return this.get('items')[index];
};
barmatz.forms.CollectionModel.prototype.getItemIndex = function(item)
{
	barmatz.utils.DataTypes.isInstanceOf(item, barmatz.mvc.Model);
	return this.get('items').indexOf(item);
};
barmatz.forms.CollectionModel.prototype.setItemIndex = function(item, index)
{
	var items;
	
	barmatz.utils.DataTypes.isInstanceOf(item, barmatz.mvc.Model);
	barmatz.utils.DataTypes.isTypeOf(index, 'number');
	
	items = this.get('items');
	items.splice(items.indexOf(item), 1);
	items.splice(index, 0, item);
};
barmatz.forms.CollectionModel.prototype.forEach = function(handler)
{
	barmatz.utils.DataTypes.isTypeOf(handler, 'function');
	barmatz.utils.Array.forEach(this.get('items'), function(item, index, collection)
	{
		handler.apply(this, arguments);
	}, this);
};
barmatz.forms.CollectionModel.prototype.find = function(filter)
{
	
	barmatz.utils.DataTypes.isTypeOf(filter, 'function');
	return this.get('items').filter(filter);
};
barmatz.forms.CollectionModel.prototype.toString = function()
{
	var values = [];
	
	this.forEach(function(item, index, collection)
	{
		values.push(item.toString());
	});
	
	return values.join(', ');
};
barmatz.forms.CollectionModel.prototype.toArray = function()
{
	return this.get('items').slice(0);
};

/** barmatz.forms.Config **/
barmatz.forms.Config = {
	BASE_URL: 'http://localhost:8080/clients/ofirvardi/forms/'
};

/** barmatz.forms.factories.ControllerFactory **/
barmatz.forms.factories.ControllerFactory = {
	createLoginController: function(model, userNameFieldView, passwordFieldView, submitButtonView, errorFieldView, dialogContainerView)
	{
		return new barmatz.forms.users.LoginController(model, userNameFieldView, passwordFieldView, submitButtonView, errorFieldView, dialogContainerView);
	},
	createToolboxController: function(model, view)
	{
		return new barmatz.forms.ui.ToolboxController(model, view);
	},
	createWorkspaceController: function(model, view, dialogContainerView)
	{
		return new barmatz.forms.ui.WorkspaceController(model, view, dialogContainerView);
	},
	createPropertiesController: function(view)
	{
		return new barmatz.forms.ui.PropertiesController(view);
	},
	createWorkspaceItemController: function(model, labelView, fieldView, mandatoryView, deleteButtonView)
	{
		return new barmatz.forms.ui.WorkspaceItemController(model, labelView, fieldView, mandatoryView, deleteButtonView);
	},
	createNewFieldDialogController: function(model, view, nameFieldView, labelFieldView, dialogContainerView)
	{
		return new barmatz.forms.ui.NewFieldDialogController(model, view, nameFieldView, labelFieldView, dialogContainerView);
	},
	createMenuController: function(model, iconView, itemsView)
	{
		return new barmatz.forms.ui.MenuController(model, iconView, itemsView);
	},
	createUserFormsListController: function(formModel, userModel, view, dialogView, dialogContainerView)
	{
		return new barmatz.forms.ui.UserFormsListController(formModel, userModel, view, dialogView, dialogContainerView);
	},
	createUserFormsListItemController: function(model, view, nameView, createdView, fingerprintView, dialogContainerView)
	{
		return new barmatz.forms.ui.UserFormsListItemController(model, view, nameView, createdView, fingerprintView, dialogContainerView);
	},
	createFormController: function(model, formView, submitButtonView)
	{
		return new barmatz.forms.FormController(model, formView, submitButtonView);
	},
	createDropboxItemsListController: function(model, view, addButtonView, resetButtonView, dialogContainerView)
	{
		return new barmatz.forms.fields.DropboxItemsListController(model, view, addButtonView, resetButtonView, dialogContainerView);
	},
	createDropboxItemsListItemController: function(model, labelView, valueView, editButtonView, dialogContainerView)
	{
		return new barmatz.forms.fields.DropboxItemsListItemController(model, labelView, valueView, editButtonView, dialogContainerView);
	},
	createFieldValidationOptionsController: function(model, options, dialogContainerView)
	{
		return new barmatz.forms.fields.FieldValidationOptionsController(model, options, dialogContainerView);
	},
	createFieldController: function(model, fieldView, errorMessageView)
	{
		return new barmatz.forms.fields.FieldController(model, fieldView, errorMessageView);
	},
	createJQueryDialogController: function(view)
	{
		return new barmatz.forms.ui.JQueryDialogController(view);
	},
	createLeadsController: function(userModel, formsListModel, formsListView, leadsListModel, leadsListWrapperView, leadsListView, containerView, panelsView, dialogContainerView)
	{
		return new barmatz.forms.ui.LeadsController(userModel, formsListModel, formsListView, leadsListModel, leadsListWrapperView, leadsListView, containerView, panelsView, dialogContainerView);
	},
	createLeadsListController: function(model, view)
	{
		return new barmatz.forms.ui.LeadsListController(model, view);
	},
	createLeadsFormsListController: function(model, view)
	{
		return new barmatz.forms.ui.LeadsFormsListController(model, view);
	},
	createContentController: function(model, view)
	{
		return new barmatz.forms.ui.ContentController(model, view);
	},
	createBuilderMenuController: function(formModel, userModel, newButtonView, saveButtonView, saveAsButtonView, loadButtonView, renameButtonView, exportButtonView, deleteButtonView, propertiesButtonView, logoutButtonView, dialogContainerView)
	{
		return new barmatz.forms.ui.BuilderMenuController(formModel, userModel, newButtonView, saveButtonView, saveAsButtonView, loadButtonView, renameButtonView, exportButtonView, deleteButtonView, propertiesButtonView, logoutButtonView, dialogContainerView);
	},
	createBuilderToolboxController: function(formModel, toolboxModel, toolboxView)
	{
		return new barmatz.forms.ui.BuilderToolboxController(formModel, toolboxModel, toolboxView);
	},
	createBuilderWorkspaceController: function(builderPageModel, formModel, formNameView, formSaveStatusView, itemsView, dialogContainerView)
	{
		return new barmatz.forms.ui.BuilderWorkspaceController(builderPageModel, formModel, formNameView, formSaveStatusView, itemsView, dialogContainerView)
	},
	createBuilderPropertiesController: function(builderPageModel, view)
	{
		return new barmatz.forms.ui.BuilderPropertiesController(builderPageModel, view);
	},
	createBuilderPageController: function(builderPageModel, formModel)
	{
		return new barmatz.forms.ui.BuilderPageController(builderPageModel, formModel);
	}
}
/** barmatz.forms.factories.DOMFactory **/
barmatz.forms.factories.DOMFactory = {
	getBodyElement: function()
	{
		if(!this._bodyElement)
			this._bodyElement = document.getElementsByTagName('body')[0];
		return this._bodyElement;
	},
	createStylesheet: function(href)
	{
		var link;
		
		barmatz.utils.DataTypes.isNotUndefined(href);
		barmatz.utils.DataTypes.isTypeOf(href, 'string');
		
		link = this.createElement('link');
		link.rel = 'stylesheet';
		link.type = 'text/css';
		link.href = href;
		return link;
	},
	addContent: function(content, container)
	{
		barmatz.utils.DataTypes.isTypesOrInstances(content, ['string'], [window.HTMLElement, window.Array]);
		barmatz.utils.DataTypes.isInstanceOf(container, window.HTMLElement);
		
		if(typeof content == 'string')
			container.innerHTML += content;
		else if(content instanceof window.HTMLElement)
			container.appendChild(content);
		else if(content instanceof window.Array)
			barmatz.utils.Array.forEach(content, function(item, index, collection)
			{
				this.addContent(item, container);
			}, this);
	},
	clearElement: function(element)
	{
		barmatz.utils.DataTypes.isInstanceOf(element, window.HTMLElement);
		element.innerHTML = '';
	},
	createElement: function(tagName, className)
	{
		var element;
		
		barmatz.utils.DataTypes.isNotUndefined(tagName);
		barmatz.utils.DataTypes.isTypeOf(tagName, 'string');
		barmatz.utils.DataTypes.isTypeOf(className, 'string', true);
		
		element = document.createElement(tagName);
		
		if(className)
			element.className = className;
		
		return element;
	},
	createElementWithContent: function(tagName, className, content, appendChildWrapper)
	{
		var _this, element;
		
		barmatz.utils.DataTypes.isNotUndefined(tagName);
		barmatz.utils.DataTypes.isTypeOf(tagName, 'string');
		barmatz.utils.DataTypes.isTypeOf(className, 'string', true);
		barmatz.utils.DataTypes.isTypesOrInstances(content, ['string'], [window.HTMLElement, window.Array]);
		barmatz.utils.DataTypes.isTypeOf(appendChildWrapper, 'function', true);
		
		_this = this;
		element = this.createElement(tagName, className);
		this.addContent(content, element);
		
		return element;
	},
	createButton: function(label, clickHandler, className)
	{
		var button;
		
		barmatz.utils.DataTypes.isTypeOf(label, 'string');
		barmatz.utils.DataTypes.isTypeOf(clickHandler, 'function', true);
		barmatz.utils.DataTypes.isTypeOf(className, 'string', true);
		
		button = this.createElementWithContent('button', className || '', label);
		
		if(clickHandler != null)
			button.addEventListener('click', clickHandler);
		
		jQuery(button).button();
		
		return button;
	},
	createDropboxElement: function(model, selectedIndex)
	{
		var _this, dropbox;
		
		barmatz.utils.DataTypes.isNotUndefined(model);
		barmatz.utils.DataTypes.isInstanceOf(model, barmatz.forms.fields.DropboxModel);
		barmatz.utils.DataTypes.isTypeOf(selectedIndex, 'number', true);
		
		_this = this;
		dropbox = this.createElement('select');
		dropbox.name = model.getName();
		
		model.forEach(function(item, index, collection)
		{
			dropbox.appendChild(_this.createDropboxItemElement(item));
		});
		
		if(selectedIndex)
			dropbox.selectedIndex = selectedIndex;
		
		return dropbox;
	},
	createDropboxItemElement: function(model)
	{
		var item;
	
		barmatz.utils.DataTypes.isNotUndefined(model);
		barmatz.utils.DataTypes.isInstanceOf(model, barmatz.forms.fields.DropboxItemModel);
		
		item = this.createElementWithContent('option', '', model.getLabel());
		item.value = model.getValue();
		
		return item;
	},
	createFormFieldElement: function(model)
	{
		var _this, field, type;
		
		barmatz.utils.DataTypes.isNotUndefined(model);
		barmatz.utils.DataTypes.isInstanceOf(model, barmatz.forms.fields.FormItemModel);
		
		_this = this;
		type = model.getType();
		field = this.createElement(getElementTagName(type || barmatz.forms.fields.FieldTypes.HTML_CONTENT));
		
		if(model instanceof barmatz.forms.fields.PhoneFieldModel)
			createPhoneField();
		
		if(field.tagName.toLowerCase() == 'input')
			field.type = type;
		
		setFieldPropertiesByModel(field, model);
		
		return field;
		
		function setFieldPropertiesByModel(field, model)
		{
			var max, prefix;
			
			barmatz.utils.DataTypes.isNotUndefined(field);
			barmatz.utils.DataTypes.isNotUndefined(model);
			barmatz.utils.DataTypes.isInstanceOf(field, window.HTMLElement);
			barmatz.utils.DataTypes.isInstanceOf(model, barmatz.forms.fields.FormItemModel);
			
			if(field.hasOwnProperty('value'))
				field.value = model.getValue();
			
			if(field.hasOwnProperty('enabled'))
				field.enabled = model.getEnabled();
			
			if(model instanceof barmatz.forms.fields.TextFieldModel)
			{
				max = model.getMax();
				if(!isNaN(max))
					field.maxLength = max;
			}
			
			if(model instanceof barmatz.forms.fields.CheckboxFieldModel)
				field.checked = model.getChecked();
			
			if(model instanceof barmatz.forms.fields.FileFieldModel)
				field.accept = model.getAccept();
			
			if(model instanceof barmatz.forms.fields.TextAreaFieldModel)
			{
				field.rows = model.getRows();
				field.cols = model.getCols();
			}
			
			if(model instanceof barmatz.forms.fields.DropboxModel)
			{
				field.multiple = model.getMultiple();
				
				model.forEach(function(item, index, collection)
				{
					field.appendChild(_this.createDropboxItemElement(item));
				});
			}
			
			if(model instanceof barmatz.forms.fields.PhoneFieldModel)
			{
				prefix = model.getPrefix();
				field.getElementsByTagName('select')[0].value = prefix;
				field.getElementsByTagName('input')[0].value = model.getValue().replace(prefix, '');
			}

			if(model instanceof barmatz.forms.fields.HTMLContentModel)
				field.innerHTML = model.getContent();
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
					return 'div';
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
	},
	createFieldWrapper: function(model, className)
	{
		var wrapper, label, field, mandatory;
		
		barmatz.utils.DataTypes.isNotUndefined(model);
		barmatz.utils.DataTypes.isInstanceOf(model, barmatz.forms.fields.FieldModel);
		barmatz.utils.DataTypes.isTypeOf(className, 'string', true);
		
		wrapper = this.createElement('div', className);
		label = wrapper.appendChild(this.createElementWithContent('label', '', model.getLabel() || ''));
		field = wrapper.appendChild(this.createFormFieldElement(model));
		mandatory = wrapper.appendChild(this.createElementWithContent('span', '', model.getMandatory() ? '*' : ''));
	
		return {wrapper: wrapper, label: label, field: field, mandatory: mandatory};
	},
	createSubmitButton: function(label, clickHandler)
	{
		var wrapper, button;
		
		barmatz.utils.DataTypes.isNotUndefined(label);
		barmatz.utils.DataTypes.isNotUndefined(clickHandler);
		barmatz.utils.DataTypes.isTypeOf(clickHandler, 'function');
		wrapper = this.createElement('div');
		button = this.createButton(label, clickHandler);
		wrapper.appendChild(button);
		
		return wrapper;
	},
	createToolbox: function()
	{
		return this.createElement('ul');
	},
	createWorkspaceWrapper: function(formName, saveStatus)
	{
		var formNameElement, saveStatusElement, workspaceElement;
		
		barmatz.utils.DataTypes.isTypeOf(formName, 'string', true);
		barmatz.utils.DataTypes.isTypeOf(saveStatus, 'string', true);
		
		formNameElement = this.createElementWithContent('h1', 'forms-workspace-header-form-name', formName || '');
		saveStatusElement = this.createElementWithContent('h3', 'forms-workspace-header-save-status', saveStatus || '');
		workspaceElement = this.createElement('table', 'forms-workspace-items');
	
		return {wrapper: this.createElementWithContent('div', 'forms-workspace-wrapper', [this.createElementWithContent('div', 'forms-workspace-header', [formNameElement, saveStatusElement]), workspaceElement]), formName: formNameElement, saveStatus: saveStatusElement, workspace: workspaceElement};
	},
	createProperties: function()
	{
		return this.createElement('div');
	},
	createToolboxItem: function(label)
	{
		barmatz.utils.DataTypes.isNotUndefined(label);
		barmatz.utils.DataTypes.isTypeOf(label, 'string');
		return this.createElementWithContent('li', 'forms-toolbox-item', label);
	},
	createWorkspaceItemWrapper: function(model)
	{
		var _this, isFieldModel, wrapper, grip, label, field, mandatory, deleteButton;
		
		barmatz.utils.DataTypes.isNotUndefined(model);
		barmatz.utils.DataTypes.isInstanceOf(model, barmatz.forms.fields.FormItemModel);
		
		_this = this;
		isFieldModel = model instanceof barmatz.forms.fields.FieldModel;
		wrapper = this.createElement('tr', 'forms-workspace-item');
		grip = this.createElement('span', 'forms-grip ui-icon ui-icon-grip-solid-vertical');
		label = this.createElementWithContent('label', '', isFieldModel && model.getLabel() ? model.getLabel() : '');
		field = this.createFormFieldElement(model);
		mandatory = this.createElementWithContent('span', 'forms-form-item-mandatory', isFieldModel && model.getMandatory() ? '*' : '');
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
	},
	createPropertiesItemWarpper: function(model)
	{
		var _this, returnWrapper, wrapper;
		
		barmatz.utils.DataTypes.isNotUndefined(model);
		barmatz.utils.DataTypes.isInstanceOf(model, barmatz.forms.fields.FormItemModel);
		
		_this = this;
		returnWrapper = {};
		
		wrapper = this.createElement('div');
		wrapper.appendChild(this.createElementWithContent('h2', 'forms-header', barmatz.utils.String.firstLetterToUpperCase(model.getType()) + ' field'));
		
		returnWrapper.wrapper = wrapper;
		
		if(model instanceof barmatz.forms.fields.FieldModel)
		{
			returnWrapper.nameField = addFieldToWrapper('string', 'name', 'name', model.getName());
			returnWrapper.labelField = addFieldToWrapper('string', 'label', 'label', model.getLabel());
			returnWrapper.mandatoryField = addFieldToWrapper('boolean', 'mandatory', 'mandatory', model.getMandatory());
			returnWrapper.enabledField = addFieldToWrapper('boolean', 'enabled', 'enabled', model.getEnabled());
			returnWrapper.widthField = addFieldToWrapper('number', 'width', 'width', model.getWidth());
		}
		
		if(model instanceof barmatz.forms.fields.FileFieldModel)
			returnWrapper.acceptField = addFieldToWrapper('string', 'accept', 'accept', model.getAccept().toString());
	
		if(model instanceof barmatz.forms.fields.TextFieldModel)
		{
			returnWrapper.descriptionField = addFieldToWrapper('string', 'description', 'description', model.getDescription());
			returnWrapper.maxField = addFieldToWrapper('number', 'max', 'max', model.getMax());
		}
		
		if(model instanceof barmatz.forms.fields.TextAreaFieldModel)
		{
			returnWrapper.rowsField = addFieldToWrapper('number', 'rows', 'rows', model.getRows());
			returnWrapper.colsField = addFieldToWrapper('number', 'cols', 'columns', model.getCols());
		}
		
		if(model instanceof barmatz.forms.fields.CheckboxFieldModel)
			returnWrapper.checkedField = addFieldToWrapper('boolean', 'checked', 'checked', model.getChecked());
		
		if(model instanceof barmatz.forms.fields.DropboxModel)
		{
			returnWrapper.multipleField = addFieldToWrapper('boolean', 'multiple', 'multiple', model.getMultiple());
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
			
			barmatz.utils.DataTypes.isTypeOf(type, 'string');
			barmatz.utils.DataTypes.isTypeOf(name, 'string');
			barmatz.utils.DataTypes.isTypeOf(label, 'string');
	
			fieldWrapper = _this.createPropertiesItemFieldWrapper(type, name, label, value, onFieldValueChange);
			wrapper.appendChild(fieldWrapper.wrapper);
			return fieldWrapper.field;
		}
		
		function onFieldValueChange(event)
		{
			var key, value;
			
			key = 'set' + barmatz.utils.String.firstLetterToUpperCase(event.target.name);
			value = event.target.value;
	
			try
			{
				model[key](value);
			}
			catch(error)
			{
				try
				{
					model[key](value.replace(/(^\s+|(,)\s+|\s+$)/g, '$2').split(','));
				}
				catch(error)
				{
					try
					{
						model[key](value == true || value == 'true' ? true : false);
					}
					catch(error)
					{
						try
						{
							model[key](parseFloat(value));
						}
						catch(error)
						{
							throw new Error('Unable to assign value to model. ' + error.message);
						}
					}
				}
			}
		}
	},
	createPropertiesItemFieldWrapper: function(type, name, label, value, changeHandler)
	{
		var content, field;
		
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
				barmatz.utils.Array.forEach(value, function(item, index, collection)
				{
					field.appendChild(this.createElement('option')).innerHTML = item;
				});
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
	},
	createDialog: function(title, content, open, container)
	{
		var dialog;
		
		barmatz.utils.DataTypes.isTypeOf(title, 'string');
		barmatz.utils.DataTypes.isTypesOrInstances(content, ['string'], [window.HTMLElement, window.Array]);
		barmatz.utils.DataTypes.isTypeOf(open, 'boolean', true);
		barmatz.utils.DataTypes.isInstanceOf(container, window.HTMLElement, true);
		
		dialog = this.createElementWithContent('div', 'forms-dialog', content);
		dialog.title = title;
		(container || this.getBodyElement()).appendChild(dialog);
		jQuery(dialog).dialog({appendTo: dialog.parentElement, autoOpen: open === undefined ? true : open, modal: true});
		return dialog;
	},
	isDialog: function(dialog)
	{
		return /forms\-dialog/.test(dialog.className);
	},
	destroyDialog: function(dialog)
	{
		jQuery(dialog).dialog('destroy');
		barmatz.utils.CSS.removeClass(dialog, 'forms-dialog');
		dialog.parentElement.removeChild(dialog);
	},
	createNewFieldDialogWrapper: function(model, open, container)
	{
		var _this, dialog, nameField, labelField, wrapper, form, formTableOptions;
	
		barmatz.utils.DataTypes.isNotUndefined(model);
		barmatz.utils.DataTypes.isInstanceOf(model, barmatz.forms.fields.FieldModel);
		barmatz.utils.DataTypes.isTypeOf(open, 'boolean', true);
		barmatz.utils.DataTypes.isInstanceOf(container, window.HTMLElement, true);
		
		_this = this;
		nameField = getField(model.getName());
		labelField = getField(model.getLabel());
		
		formTableOptions = new barmatz.forms.ui.TableOptions();
		formTableOptions.getBodyRows().push(getRowContent('Name', nameField), getRowContent('Label', labelField));
		
		form = this.createTable(formTableOptions);
		wrapper = this.createElementWithContent('div', '', form);
		dialog = this.createDialog('New Field', wrapper, open, container);
		
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
			barmatz.utils.DataTypes.isInstanceOf(field, window.HTMLElement);
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
	},
	createPromptDialog: function(title, content, confirmHandler, open, container)
	{
		var _this, dialog;
	
		barmatz.utils.DataTypes.isNotUndefined(title);
		barmatz.utils.DataTypes.isNotUndefined(content);
		barmatz.utils.DataTypes.isNotUndefined(confirmHandler);
		barmatz.utils.DataTypes.isTypeOf(title, 'string');
		barmatz.utils.DataTypes.isTypesOrInstances(content, ['string'], [window.HTMLElement, window.Array]);
		barmatz.utils.DataTypes.isTypeOf(confirmHandler, 'function');
		barmatz.utils.DataTypes.isTypeOf(open, 'boolean', true);
		barmatz.utils.DataTypes.isInstanceOf(container, window.HTMLElement, true);
		
		_this = this;
		dialog = this.createDialog(title, content, open, container);
		
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
	},
	createExportPromptDialog: function(fingerprint, loadingMessage, open, container)
	{
		var dir, embedCode, textarea;
		
		barmatz.utils.DataTypes.isNotUndefined(fingerprint);
		barmatz.utils.DataTypes.isTypeOf(loadingMessage, 'string', true);
		barmatz.utils.DataTypes.isTypeOf(open, 'boolean', true);
		barmatz.utils.DataTypes.isInstanceOf(container, window.HTMLElement, true);
		
		dir = location.href.replace(location.hash, '').replace(location.search, '').replace(/(^\w+:\/\/.+)\/.+\..+$/, '$1') + '/js'; 
		embedCode = '<div id="formContainer" name="formContainer" fingerprint="' + fingerprint + '">' + (loadingMessage || '') + '</div>' +
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
		]), open, container);
	},
	createChangePropertyPromptDialogWrapper: function(title, key, value, confirmHandler, open, container)
	{
		var field, wrapper;
	
		barmatz.utils.DataTypes.isTypeOf(title, 'string');
		barmatz.utils.DataTypes.isTypeOf(key, 'string');
		barmatz.utils.DataTypes.isTypeOf(confirmHandler, 'function');
		barmatz.utils.DataTypes.isTypeOf(open, 'boolean', true);
		barmatz.utils.DataTypes.isInstanceOf(container, window.HTMLElement, true);
		
		field = this.createElement('input');
		field.type = 'text';
		field.value = value;
		wrapper = this.createElementWithContent('div', '', [this.createElementWithContent('label', '', key), field]);
		return {wrapper: wrapper, dialog: this.createPromptDialog(title, wrapper, confirmHandler, open, container), field: field};
	},
	createAlertPromptDialog: function(title, content, open, container)
	{
		var _this, dialog;
		
		barmatz.utils.DataTypes.isNotUndefined(title);
		barmatz.utils.DataTypes.isNotUndefined(content);
		barmatz.utils.DataTypes.isTypeOf(title, 'string');
		barmatz.utils.DataTypes.isTypesOrInstances(content, ['string'], [window.HTMLElement, window.Array]);
		barmatz.utils.DataTypes.isTypeOf(open, 'boolean', true);
		barmatz.utils.DataTypes.isInstanceOf(container, window.HTMLElement, true);
		
		_this = this;
		dialog = this.createDialog(title, content, open, container);
		
		jQuery(dialog).dialog({
			buttons: {OK: onOKButtonClick}
		});
		
		function onOKButtonClick(event)
		{
			_this.destroyDialog(dialog);
		}
		
		return dialog;
		
	},
	createConfirmPromptDialog: function(message, confirmHandler, open, container)
	{
		barmatz.utils.DataTypes.isNotUndefined(message);
		barmatz.utils.DataTypes.isNotUndefined(confirmHandler);
		barmatz.utils.DataTypes.isTypeOf(message, 'string');
		barmatz.utils.DataTypes.isTypeOf(confirmHandler, 'function');
		barmatz.utils.DataTypes.isTypeOf(open, 'boolean', true);
		barmatz.utils.DataTypes.isInstanceOf(container, window.HTMLElement, true);
		return this.createPromptDialog('Confirm', message, confirmHandler, open, container);
	},
	createPanels: function(panels)
	{
		var options, model, i; 
		
		barmatz.utils.DataTypes.isInstanceOf(panels, window.Array);
		
		options = new barmatz.forms.ui.TableOptions();
		options.setClassName('forms-wrapper');
		options.getBodyRows().push([]);
		barmatz.utils.Array.forEach(panels, function(item, index, collection)
		{
			options.getBodyRows()[0].push(item.getContent());
			options.getBodyColumnsClassNames().push(item.getClassName());
		});
		
		return this.createTable(options);
	},
	createMenuWrapper: function()
	{
		var icon, menu, wrapper;
		icon = this.createMenuIcon();
		menu = this.createMenu();
		wrapper = this.createElementWithContent('div', 'forms-menu', [icon, menu]);
		return {wrapper: wrapper, icon: icon, menu: menu};
	},
	createMenuIcon: function()
	{
		return this.createSettingsButton();
	},
	createMenu: function()
	{
		return this.createElement('ul');
	},
	createMenuItem: function(model)
	{
		var anchor;
	
		barmatz.utils.DataTypes.isNotUndefined(model);
		barmatz.utils.DataTypes.isInstanceOf(model, barmatz.forms.ui.MenuItemModel);
	
		anchor = this.createElementWithContent('a', '', model.getLabel());
		anchor.href = 'javascript:void(0);';
		anchor.addEventListener('click', model.getClickHandler());
		
		return this.createElementWithContent('li', '', anchor);
	},
	createIconButton: function(name)
	{
		var button;
		
		barmatz.utils.DataTypes.isNotUndefined(name);
		barmatz.utils.DataTypes.isTypeOf(name, 'string');
		
		button = this.createElementWithContent('span', 'ui-icon-wrapper ui-state-default ui-corner-all', this.createElement('span', 'ui-icon ui-icon-' + name));
		jQuery(button).button();
		
		return button;
	},
	createEditButton: function()
	{
		return this.createIconButton('pencil');
	},
	createDeleteButton: function()
	{
		return this.createIconButton('trash');
	},
	createSettingsButton: function()
	{
		return this.createIconButton('gear');
	},
	createLoadingDialog: function(container)
	{
		barmatz.utils.DataTypes.isInstanceOf(container, window.HTMLElement, true);
		return (container || barmatz.forms.factories.DOMFactory.getBodyElement()).appendChild(this.createElement('div', 'loading-image ui-front'));
	},
	destroyLoadingDialog: function(dialog)
	{
		barmatz.utils.DataTypes.isInstanceOf(dialog, window.HTMLElement);
		
		if(dialog.parentElement)
			dialog.parentElement.removeChild(dialog);
	},
	createLoginFormDialogWrapper: function(open, container)
	{
		var _this, dialog, wrapper, wrapperOptions, userNameField, passwordField, errorField;

		barmatz.utils.DataTypes.isTypeOf(open, 'boolean', true);
		barmatz.utils.DataTypes.isInstanceOf(container, window.HTMLElement, true);
		
		_this = this;
		wrapperOptions = new barmatz.forms.ui.TableOptions();
		userNameField = addField('username', 'User', 'text');
		passwordField = addField('password', 'Password', 'password');
		wrapper = this.createTable(wrapperOptions);
		errorField = this.createElementWithContent('div', 'forms-error-wrapper ui-state-error ui-corner-all', [this.createElement('span', 'ui-icon ui-icon-alert'), this.createElementWithContent('span', '', 'Username and/or password are incorrect')]);
		dialog = this.createDialog('Login', [wrapper, errorField], open, container);
	
		jQuery(dialog).dialog({dialogClass: 'forms-dialog-prompt', buttons: {Submit: function(){}}});
		
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
			wrapperOptions.getBodyRows().push([_this.createElementWithContent('label', '', label), field]);
			
			return field;
		}
	},
	createCollectionListDialog: function(title, content, className, open, container)
	{
		var dialog;
		
		barmatz.utils.DataTypes.isNotUndefined(title);
		barmatz.utils.DataTypes.isNotUndefined(content);
		barmatz.utils.DataTypes.isTypeOf(title, 'string');
		barmatz.utils.DataTypes.isTypesOrInstances(content, ['string'], [window.HTMLElement, window.Array]);
		barmatz.utils.DataTypes.isTypeOf(className, 'string', true);
		barmatz.utils.DataTypes.isTypeOf(open, 'boolean', true);
		barmatz.utils.DataTypes.isInstanceOf(container, window.HTMLElement, true);
		
		dialog = this.createDialog(title, content, open, container);
		jQuery(dialog).dialog({autoOpen: true, dialogClass: 'forms-dialog-collection-list' + (className ? ' ' + className : '')});
		return dialog;
	},
	createUserFormsListDialog: function(open, container)
	{
		barmatz.utils.DataTypes.isTypeOf(open, 'boolean', true);
		barmatz.utils.DataTypes.isInstanceOf(container, window.HTMLElement, true);
		return this.createCollectionListDialog('Your forms', this.createUserFormsList(), 'forms-dialog-user-forms forms-clickable-td', open, container);
	},
	createUserFormsList: function()
	{
		var options = new barmatz.forms.ui.TableOptions();
		options.getHeadColumns().push('Name');
		options.getHeadColumns().push('Created');
		options.getHeadColumns().push('Fingerprint');
		return this.createTable(options);
	},
	createUserFormsListItem: function(index)
	{
		barmatz.utils.DataTypes.isNotUndefined(index);
		barmatz.utils.DataTypes.isTypeOf(index, 'number');
		return this.createElementWithContent('tr', 'ui-widget ui-state-default ui-corner-all ui-button-text-only ' + (index % 2 == 0 ? 'even' : 'odd'), [this.createElement('td'), this.createElement('td'), this.createElement('td')]);
	},
	createDropboxItemsListDialogWrapper: function(open, container)
	{
		var addButton, resetButton;
		
		barmatz.utils.DataTypes.isTypeOf(open, 'boolean', true);
		barmatz.utils.DataTypes.isInstanceOf(container, window.HTMLElement, true);
		
		addButton = this.createButton('Add item');
		resetButton = this.createButton('Reset');
		
		return {dialog: this.createCollectionListDialog('Items', [this.createDropboxItemsList(), this.createElementWithContent('div', 'forms-dialog-footer', [addButton, resetButton])], 'forms-dialog-dropbox-items', open, container), addButton: addButton, resetButton: resetButton};
	},
	createDropboxItemsList: function()
	{
		var options = new barmatz.forms.ui.TableOptions();
		options.getHeadColumns().push('Key', 'Value', '');
		return this.createTable(options);
	},
	createDropboxItemDialog: function(label, value, confirmHandler, open, container)
	{
		var _this, options, keyField, valueField;
		
		barmatz.utils.DataTypes.isNotUndefined(label);
		barmatz.utils.DataTypes.isNotUndefined(value);
		barmatz.utils.DataTypes.isNotUndefined(confirmHandler);
		barmatz.utils.DataTypes.isTypeOf(label, 'string', true);
		barmatz.utils.DataTypes.isTypeOf(confirmHandler, 'function');
		barmatz.utils.DataTypes.isTypeOf(open, 'boolean', true);
		barmatz.utils.DataTypes.isInstanceOf(container, window.HTMLElement, true);
		
		_this = this;
		options = new barmatz.forms.ui.TableOptions();
		labelField = addRow('label', label || '');
		valueField = addRow('Value', value || '');
		return this.createPromptDialog(labelField != null ? 'Edit item' : 'New item', this.createTable(options), onConfirm, open, container);
		
		function addRow(key, value)
		{
			var field;
			
			barmatz.utils.DataTypes.isNotUndefined(key);
			barmatz.utils.DataTypes.isNotUndefined(value);
			barmatz.utils.DataTypes.isTypeOf(key, 'string');
			
			field = _this.createElement('input');
			field.value = value;
			options.getBodyRows().push([_this.createElementWithContent('label', '', key), field]);
			
			return field;
		}
		
		function onConfirm()
		{
			confirmHandler(labelField.value, valueField.value);
		}
	},
	createDropboxItemsListItemWrapper: function(index)
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
	},
	createTable: function(options)
	{
		var _this, headColumns, content;
		
		barmatz.utils.DataTypes.isInstanceOf(options, barmatz.forms.ui.TableOptions);
		
		_this = this;
		headColumns = options.getHeadColumns();
		content = [];
		
		if(headColumns.length > 0)
			content.push(this.createElementWithContent('thead', options.getHeadClassName(), this.createTableRow(headColumns, options.getHeadColumnsClassNames(), options.getHeadRowClassName(), true)));
		
		content.push(this.createElementWithContent('tbody', options.getBodyClassName(), getBodyRows()));
		
		return this.createElementWithContent('table', options.getClassName(), content);
		
		function getBodyRows()
		{
			var rows = [], bodyRowsClassNames;
			
			bodyRowsClassNames = options.getBodyRowsClassNames();
			
			barmatz.utils.Array.forEach(options.getBodyRows(), function(item, index, collection)
			{
				rows.push(_this.createTableRow(item, options.getBodyColumnsClassNames(), bodyRowsClassNames[index % bodyRowsClassNames.length]));
			});
			
			return rows;
		}
	},
	createTableRow: function(content, contentClassNames, className, isHead)
	{
		var columns;
		
		barmatz.utils.DataTypes.isInstanceOf(content, window.Array);
		barmatz.utils.DataTypes.isInstanceOf(contentClassNames, window.Array, true);
		barmatz.utils.DataTypes.isTypeOf(className, 'string', true);
		barmatz.utils.DataTypes.isTypeOf(isHead, 'boolean', true);
		
		columns = [];
		
		barmatz.utils.Array.forEach(content, function(item, index, collection)
		{
			columns.push(this.createTableColumn(item, contentClassNames ? contentClassNames[index % contentClassNames.length] : null, isHead)); 
		}, this);
		
		return this.createElementWithContent('tr', className, columns);
	},
	createTableColumn: function(content, className, isHead)
	{
		barmatz.utils.DataTypes.isTypesOrInstances(content, ['string'], [window.HTMLElement, window.Array]);
		barmatz.utils.DataTypes.isTypeOf(className, 'string', true);
		barmatz.utils.DataTypes.isTypeOf(isHead, 'boolean', true);
		return this.createElementWithContent(isHead ? 'th' : 'td', className, content);
	},
	createFormPropertiesDialogWrapper: function(model, confirmHandler, open, container)
	{
		var properties, dialog;
	
		barmatz.utils.DataTypes.isInstanceOf(model, barmatz.forms.FormModel);
		barmatz.utils.DataTypes.isTypeOf(confirmHandler, 'function');
		barmatz.utils.DataTypes.isTypeOf(open, 'boolean', true);
		barmatz.utils.DataTypes.isInstanceOf(container, window.HTMLElement, true);
		
		properties = this.createFormPropertiesWrapper(model);
		dialog = this.createPromptDialog('Properties', properties.wrapper, confirmHandler, open, container);
		properties.dialog = dialog;
		
		jQuery(dialog).dialog({dialogClass: 'forms-dialog-form-properties'});
		
		return properties;
		
	},
	createFormPropertiesWrapper: function(model)
	{
		var _this, returnValue, options;
		
		barmatz.utils.DataTypes.isNotUndefined(model);
		barmatz.utils.DataTypes.isInstanceOf(model, barmatz.forms.FormModel);
	
		_this = this;
		options = new barmatz.forms.ui.TableOptions();
		returnValue = {};
		
		returnValue.nameField = createField('Name');
		returnValue.nameField.value = model.getName();
		
		returnValue.submitButtonLabelField = createField('Submit button label');
		returnValue.submitButtonLabelField.value = model.getSubmitButtonLabel();
		
		returnValue.targetEmailField = createField('Target email');
		returnValue.targetEmailField.value = model.getTargetEmail();
		
		returnValue.directionField = createDropbox('Direction', 'formDirection', [barmatz.forms.Directions.LTR, barmatz.forms.Directions.RTL]);
		returnValue.directionField.value = model.getDirection();
		
		returnValue.languageField = createDropbox('Language', 'formlanguage', ['en', 'he']);
		returnValue.languageField.value = model.getLanguage();
		
		returnValue.layoutIdField = createDropbox('Layout', 'formLayoutId', ['1', '2']);
		returnValue.layoutIdField.value = model.getLayoutId();
		
		returnValue.stylesheetsField = createField('Stylesheets');
		returnValue.stylesheetsField.value = model.getStylesheets().join(' ');
		
		returnValue.methodField = createDropbox('Method', 'formMethod', [barmatz.forms.Methods.GET, barmatz.forms.Methods.POST]);
		returnValue.methodField.value = model.getMethod();
		
		returnValue.encodingField = createDropbox('Encoding', 'formEncoding', [barmatz.net.Encoding.FORM, barmatz.net.Encoding.FILES]);
		returnValue.encodingField.value = model.getEncoding();
		
		returnValue.externalAPIField = createField('External API');
		returnValue.externalAPIField.value = model.getExternalAPI() || '';
		
		returnValue.wrapper = this.createTable(options); 
		
		return returnValue;
		
		function createField(label, content)
		{
			var field, row;
			
			barmatz.utils.DataTypes.isNotUndefined(label);
			barmatz.utils.DataTypes.isTypeOf(label, 'string');
			
			field = content || _this.createElement('input');
			row = [_this.createElementWithContent('label', '', label), field];
			options.getBodyRows().push(row);
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
			barmatz.utils.DataTypes.isTypesOrInstances(values, ['object'], [window.Array]);
			
			model = barmatz.forms.factories.ModelFactory.createDropboxModel(name);
			
			if(values instanceof window.Array)
				for(key = 0; key < values.length; key++)
					model.addItem(barmatz.forms.factories.ModelFactory.createDropboxItemModel(values instanceof window.Array ? values[key] : key, values[key]));
			else
				for(key in values)
					model.addItem(barmatz.forms.factories.ModelFactory.createDropboxItemModel(values instanceof window.Array ? values[key] : key, values[key]));
	
			return createField(label, _this.createDropboxElement(model));
		}
	},
	createFieldValidationOptionsDialogWrapper: function(model, open, container)
	{
		var fieldValidationOptionsWrapper;
		
		barmatz.utils.DataTypes.isNotUndefined(model);
		barmatz.utils.DataTypes.isInstanceOf(model, barmatz.forms.fields.FieldModel);
		barmatz.utils.DataTypes.isTypeOf(open, 'boolean', true);
		barmatz.utils.DataTypes.isInstanceOf(container, window.HTMLElement, true);
		
		fieldValidationOptionsWrapper = this.createFieldValidationOptionsWrapper(model);
		
		return {
			dialog: this.createDialog(barmatz.utils.String.firstLetterToUpperCase(model.getType()) + ' field "' + model.getName() + '" validation options', fieldValidationOptionsWrapper.wrapper, open, container), 
			options: fieldValidationOptionsWrapper.options
		};
	},
	createFieldValidationOptionsWrapper: function(model)
	{
		var wrapper, options, fieldValidatorWrapper, bits;
		
		barmatz.utils.DataTypes.isNotUndefined(model);
		barmatz.utils.DataTypes.isInstanceOf(model, barmatz.forms.fields.FieldModel);
		
		wrapper = this.createElement('div');
		bits = barmatz.utils.Bitwise.parseBit(model.getAvailableValidators());
		options = {};
		barmatz.utils.Array.forEach(bits, function(item, index, collection)
		{
			fieldValidatorWrapper = this.createFieldValidatorWrapper(item);
			options[item] = fieldValidatorWrapper.checkbox;
			wrapper.appendChild(fieldValidatorWrapper.wrapper);
		}, this);
		
		barmatz.utils.DOM.sort(wrapper, function(elementA, elementB)
		{
			var a, b;
			
			a = elementA.getElementsByTagName('span')[0].innerHTML;
			b = elementB.getElementsByTagName('span')[0].innerHTML;
			
			return a > b ? 1 : a < b ? -1 : 0;
		});
	
		return {wrapper: wrapper, options: options};
	},
	createFieldValidatorWrapper: function(bit)
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
	},
	createFormFieldErrorMessageElement: function()
	{
		return this.createElement('ul', 'forms-form-item-error-message');
	},
	createFormFieldErrorMessageItemElement: function(message)
	{
		barmatz.utils.DataTypes.isNotUndefined(message);
		barmatz.utils.DataTypes.isTypeOf(message, 'string');
		return this.createElementWithContent('li', 'forms-form-item-error-message-item', message);
	},
	createHTMLContentEditorDialogWrapper: function(content, confirmHandler, open, container, initHandler)
	{
		var wrapper, dialog, editor;
		
		barmatz.utils.DataTypes.isTypeOf(content, 'string', true);
		barmatz.utils.DataTypes.isTypeOf(confirmHandler, 'function');
		barmatz.utils.DataTypes.isTypeOf(open, 'boolean', true);
		barmatz.utils.DataTypes.isInstanceOf(container, window.HTMLElement, true);
		barmatz.utils.DataTypes.isTypeOf(initHandler, 'function', true);
		
		wrapper = this.createElement('div');
		dialog = this.createPromptDialog('HTML content editor', wrapper, confirmHandler, open, container);
		editor = this.createHTMLContentEditor(wrapper, content, onEditorInit);
		
		jQuery(dialog).dialog({dialogClass: 'forms-dialog-html-content-editor'});
	
		return {dialog: dialog, editor: editor};
		
		function onEditorInit(event)
		{
			setTimeout(function()
			{
				jQuery(dialog).dialog('close').dialog('open');

				if(initHandler != null)
					initHandler(event);
			},1);
		}
	},
	createHTMLContentEditor: function(parent, content, initHandler)
	{
		var editor, textArea;
		
		barmatz.utils.DataTypes.isInstanceOf(parent, window.HTMLElement);
		barmatz.utils.DataTypes.isTypeOf(content, 'string', true);
		barmatz.utils.DataTypes.isTypeOf(initHandler, 'function', true);
	
		textArea = this.createElement('textarea');
		textArea.id = 'htmlContentEditor' + new Date().getTime();
		textArea.innerHTML = content || '';
		parent.appendChild(textArea);
		editor = new tinymce.Editor(textArea.id, {
			plugins: 'advlist autolink lists link image charmap print preview hr anchor pagebreak ' +
					 'searchreplace wordcount visualblocks visualchars code fullscreen ' +
					 'insertdatetime media nonbreaking save table contextmenu directionality ' +
					 'emoticons template paste',
			toolbar1: 'insertfile undo redo | styleselect | bold italic | alignleft aligncenter ' +
					  'alignright alignjustify | bullist numlist outdent indent | link image'
		}, tinymce.EditorManager);
		editor.on('init', initHandler);
		editor.render();
			
		return textArea;
	},
	destroyHTMLContentEditor: function(editor)
	{
		barmatz.utils.DataTypes.isInstanceOf(editor, tinymce.Editor);
		editor.destroy(true);
	},
	createLeadsFormsListElement: function()
	{
		return this.createElement('ul');
	},
	createLeadsFormsListItem: function(model)
	{
		barmatz.utils.DataTypes.isInstanceOf(model, barmatz.forms.FormModel);
		return this.createElementWithContent('li', 'forms-leads-forms-list-item', model.getName());
	},
	createLeadsListWrapper: function()
	{
		var options, table;
		
		options = new barmatz.forms.ui.TableOptions();
		options.setHeadRowClassName('forms-leads-list-head');
		options.getHeadColumns().push('Received', 'Referer', 'IP');
		
		table = this.createTable(options);
		
		return {wrapper: this.createElementWithContent('div', 'forms-leads-list-wrapper', table), table: table, body: table.getElementsByTagName('tbody')[0]};
	},
	createLeadsListItem: function(model, index)
	{
		barmatz.utils.DataTypes.isInstanceOf(model, barmatz.forms.LeadModel);
		barmatz.utils.DataTypes.isTypeOf(index, 'number');
		return this.createTableRow([barmatz.utils.Date.toString(model.getCreated(), 'dd/mm/yyyy hh:ii'), model.getReferer() || '', model.getIP() || ''], [], 'forms-leads-list-item ' + (index % 2 == 0 ? 'even' : 'odd'));
	}
}
/** barmatz.forms.factories.ModelFactory **/
barmatz.forms.factories.ModelFactory = {
	createUserModel: function()
	{
		return new barmatz.forms.users.UserModel();
	},
	createFieldModel: function(type, name)
	{
		barmatz.utils.DataTypes.isNotUndefined(type);
		barmatz.utils.DataTypes.isTypeOf(type, 'string');
		
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
	},
	createToolboxModel: function()
	{
		return new barmatz.forms.ui.ToolboxModel();
	},
	createToolboxItemModel: function(type, label, fieldModel)
	{
		return new barmatz.forms.ui.ToolboxItemModel(type, label, fieldModel);
	},
	createCollectionModel: function()
	{
		return new barmatz.forms.CollectionModel();
	},
	createDropboxItemModel: function(label, value)
	{
		return new barmatz.forms.fields.DropboxItemModel(label, value);
	},
	createDropboxModel: function(name, items)
	{
		return new barmatz.forms.fields.DropboxModel(name, items);
	},
	createBuilderPageModel: function()
	{
		return new barmatz.forms.ui.BuilderPageModel();
	},
	createMenuModel: function()
	{
		return new barmatz.forms.ui.MenuModel();
	},
	createMenuItemModel: function(label, clickHandler)
	{
		return new barmatz.forms.ui.MenuItemModel(label, clickHandler);
	},
	createFormModel: function()
	{
		return new barmatz.forms.FormModel();
	},
	createPanelModel: function(className, content)
	{
		return new barmatz.forms.ui.PanelModel(className, content);
	},
	createValidatorModel: function(data)
	{
		return new barmatz.forms.fields.ValidatorModel(data);
	},
	createLeadModel: function()
	{
		return new barmatz.forms.LeadModel();
	},
	createContentModel: function()
	{
		return new barmatz.forms.ui.ContentModel();
	}
}
/** barmatz.forms.ui.JQueryDialogController **/
barmatz.forms.ui.JQueryDialogController = function(view)
{
	barmatz.utils.DataTypes.isInstanceOf(view, window.HTMLElement);
	
	if(!barmatz.forms.factories.DOMFactory.isDialog(view))
		throw new Error('view is not a dialog');
	
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
/** barmatz.forms.ui.Login **/
barmatz.forms.ui.Login = function()
{
	var loginFormWrapper = barmatz.forms.factories.DOMFactory.createLoginFormDialogWrapper();
	barmatz.forms.factories.ControllerFactory.createJQueryDialogController(loginFormWrapper.dialog);
	barmatz.forms.factories.ControllerFactory.createLoginController(barmatz.forms.factories.ModelFactory.createUserModel(), loginFormWrapper.userNameField, loginFormWrapper.passwordField, loginFormWrapper.submitButton, loginFormWrapper.errorField);
};
/** barmatz.forms.ui.TableOptions **/
barmatz.forms.ui.TableOptions = function()
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

barmatz.forms.ui.TableOptions.prototype = {
	getHeadClassName: function()
	{
		return this._headClassName;
	},
	setHeadClassName: function(value)
	{
		barmatz.utils.DataTypes.isTypeOf(value, 'string', true);
		this._headClassName = value;
	},
	getHeadColumns: function()
	{
		return this._headColumns;
	},
	setHeadColumns: function(value)
	{
		barmatz.utils.DataTypes.isInstanceOf(value, window.Array, true);
		this._headColumns = value;
	},
	getHeadColumnsClassNames: function()
	{
		return this._headColumnsClassNames;
	},
	setHeadColumnsClassNames: function(value)
	{
		barmatz.utils.DataTypes.isInstanceOf(value, window.Array, true);
		this._headColumnsClassNames = value;
	},
	getHeadRowClassName: function()
	{
		return this._headRowClassName;
	},
	setHeadRowClassName: function(value)
	{
		barmatz.utils.DataTypes.isTypeOf(value, 'string', true);
		this._headRowClassName = value;
	},
	getBodyClassName: function()
	{
		return this._bodyClassName;
	},
	setBodyClassName: function(value)
	{
		barmatz.utils.DataTypes.isTypeOf(value, 'string', true);
		this._bodyClassName = value;
	},
	getBodyColumnsClassNames: function()
	{
		return this._bodyColumnsClassNames;
	},
	setBodyColumnsClassNames: function(value)
	{
		barmatz.utils.DataTypes.isInstanceOf(value, window.Array, true);
		this._bodyColumnsClassNames = value;
	},
	getBodyRows: function()
	{
		return this._bodyRows;
	},
	setBodyRows: function(value)
	{
		barmatz.utils.DataTypes.isInstanceOf(value, window.Array, true);
		this._bodyRows = value;
	},
	getBodyRowsClassNames: function()
	{
		return this._bodyRowsClassNames;
	},
	setBodyRowsClassNames: function(value)
	{
		barmatz.utils.DataTypes.isInstanceOf(value, window.Array, true);
		this._bodyRowsClassNames = value;
	},
	getClassName: function()
	{
		return this._className;
	},
	setClassName: function(value)
	{
		barmatz.utils.DataTypes.isTypeOf(value, 'string', true);
		this._className = value;
	}
};
/** barmatz.forms.users.LoginController **/
barmatz.forms.users.LoginController = function(model, userNameFieldView, passwordFieldView, submitButtonView, errorFieldView, dialogContainerView)
{
	var errorFieldViewCachedDisplay, loadingView;
	
	barmatz.utils.DataTypes.isInstanceOf(model, barmatz.forms.users.UserModel);
	barmatz.utils.DataTypes.isInstanceOf(userNameFieldView, HTMLInputElement);
	barmatz.utils.DataTypes.isInstanceOf(passwordFieldView, HTMLInputElement);
	barmatz.utils.DataTypes.isInstanceOf(submitButtonView, window.HTMLElement);
	barmatz.utils.DataTypes.isInstanceOf(errorFieldView, window.HTMLElement);
	barmatz.utils.DataTypes.isInstanceOf(dialogContainerView, window.HTMLElement, true);
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
		loadingView = barmatz.forms.factories.DOMFactory.createLoadingDialog(dialogContainerView);
	}
	
	function hideLoading()
	{
		barmatz.forms.factories.DOMFactory.destroyLoadingDialog(loadingView);
		loadingView = null;
	}
	
	function waitingForServer()
	{
		model.addEventListener(barmatz.events.UserEvent.LOGIN_SUCCESS, onModelLoginSuccess);
		model.addEventListener(barmatz.events.UserEvent.LOGIN_FAIL, onModelLoginFail);
		submitButtonView.removeEventListener('click', onSubmitButtonClick);
		window.removeEventListener('keydown', onKeyDown);
	}
	
	function waitingForInput()
	{
		model.removeEventListener(barmatz.events.UserEvent.LOGIN_SUCCESS, onModelLoginSuccess);
		model.removeEventListener(barmatz.events.UserEvent.LOGIN_FAIL, onModelLoginFail);
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
		barmatz.utils.DataTypes.isInstanceOf(event, KeyboardEvent);
		
		if(event.keyCode == 13)
			submit();
	}
	
	function onSubmitButtonClick(event)
	{
		submit();
	}
	
	function onModelLoginSuccess(event)
	{
		barmatz.utils.DataTypes.isInstanceOf(event, barmatz.events.UserEvent);
		
		location.href = event.getTargetURL();
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
barmatz.forms.users.UserModel = function()
{
	barmatz.forms.CollectionModel.call(this);
	this.set('id', null);
	this.set('username', null);
	this.set('lastName', null);
	this.set('created', null);
	this.set('active', false);
};
barmatz.forms.users.UserModel.prototype = new barmatz.forms.CollectionModel();
barmatz.forms.users.UserModel.prototype.constructor = barmatz.forms.users.UserModel;
barmatz.forms.users.UserModel.prototype.getId = function()
{
	return this.get('id');
};
barmatz.forms.users.UserModel.prototype.getUserName = function()
{
	return this.get('username');
};
barmatz.forms.users.UserModel.prototype.getFirstName = function()
{
	return this.get('firstName');
};
barmatz.forms.users.UserModel.prototype.getLastName = function()
{
	return this.get('lastName');
};
barmatz.forms.users.UserModel.prototype.getCreated = function()
{
	return this.get('created');
};
barmatz.forms.users.UserModel.prototype.getActive = function()
{
	return this.get('active');
};
barmatz.forms.users.UserModel.prototype.addItem = function(item)
{
	barmatz.utils.DataTypes.isInstanceOf(item, barmatz.forms.FormModel);
	barmatz.forms.CollectionModel.prototype.addItem.call(this, item);
};
barmatz.forms.users.UserModel.prototype.addItemAt = function(item, index)
{
	barmatz.utils.DataTypes.isInstanceOf(item, barmatz.forms.FormModel);
	barmatz.utils.DataTypes.isTypeOf(index, 'number');
	barmatz.forms.CollectionModel.prototype.addItemAt.call(this, item, index);
};
barmatz.forms.users.UserModel.prototype.removeItem = function(item)
{
	barmatz.utils.DataTypes.isInstanceOf(item, barmatz.forms.FormModel);
	barmatz.forms.CollectionModel.prototype.removeItem.call(this, item);
};
barmatz.forms.users.UserModel.prototype.getItemIndex = function(item)
{
	barmatz.utils.DataTypes.isInstanceOf(item, barmatz.forms.FormModel);
	return barmatz.forms.CollectionModel.prototype.getItemIndex.call(this, item);
};
barmatz.forms.users.UserModel.prototype.setItemIndex = function(item, index)
{
	barmatz.utils.DataTypes.isInstanceOf(item, barmatz.forms.FormModel);
	barmatz.utils.DataTypes.isTypeOf(index, 'number');
	barmatz.forms.CollectionModel.prototype.setItemIndex.call(this, item, index);
};
barmatz.forms.users.UserModel.prototype.getForms = function()
{
	var _this = this;
	
	this.getId() == null ? loadUserData() : loadFormsData();
	
	function loadUserData()
	{
		addLoadUserDataListeners();
		_this.getData();
	}
	
	function loadFormsData()
	{
		var request, loader;
		
		request = new barmatz.net.Request(barmatz.forms.Config.BASE_URL + '/api/user/forms.php');
		request.setMethod(barmatz.net.Methods.GET);
		request.setData({u: _this.getId()});
		
		loader = new barmatz.net.Loader();
		addLoadFormsDataListeners(loader);
		loader.load(request);
	}
	
	function addLoadFormsDataListeners(loader)
	{
		barmatz.utils.DataTypes.isInstanceOf(loader, barmatz.net.Loader);
		loader.addEventListener(barmatz.events.LoaderEvent.SUCCESS, onLoadFormsDataSuccess);
		loader.addEventListener(barmatz.events.LoaderEvent.ERROR, onLoadFormsDataError);
	}
	
	function removeLoadFormsDataListeners(loader)
	{
		barmatz.utils.DataTypes.isInstanceOf(loader, barmatz.net.Loader);
		loader.removeEventListener(barmatz.events.LoaderEvent.SUCCESS, onLoadFormsDataSuccess);
		loader.removeEventListener(barmatz.events.LoaderEvent.ERROR, onLoadFormsDataError);
	}
	
	function addLoadUserDataListeners()
	{
		_this.addEventListener(barmatz.events.UserEvent.DATA_LOAD_SUCCESS, onLoadUserDataSucces);
		_this.addEventListener(barmatz.events.UserEvent.DATA_LOAD_FAIL, onLoadUserDataFail);
	}
	
	function removeLoadUserDataListeners()
	{
		_this.removeEventListener(barmatz.events.UserEvent.DATA_LOAD_SUCCESS, onLoadUserDataSucces);
		_this.removeEventListener(barmatz.events.UserEvent.DATA_LOAD_FAIL, onLoadUserDataFail);
	}
	
	function parseFormsData(data)
	{
		barmatz.utils.DataTypes.isInstanceOf(data, window.Array);
		barmatz.utils.Array.forEach(data, function(item, index, collection)
		{
			var form = barmatz.forms.factories.ModelFactory.createFormModel();
			form.setCreated(barmatz.utils.Date.toDate(item.created));
			form.setFingerprint(item.fingerprint);
			form.setName(item.name);
			collection[index] = form;
		});
	}
	
	function onLoadUserDataSucces(event)
	{
		removeLoadUserDataListeners();
		loadFormsData();
	}
	
	function onLoadUserDataFail(event)
	{
		removeLoadUserDataListeners();
		_this.dispatchEvent(new barmatz.events.UserEvent(barmatz.events.UserEvent.GET_FORMS_FAIL));
	}
	
	function onLoadFormsDataSuccess(event)
	{
		var data;
		
		barmatz.utils.DataTypes.isInstanceOf(event, barmatz.events.LoaderEvent);
		
		removeLoadFormsDataListeners(event.getTarget());
			
		try
		{
			data = JSON.parse(event.getResponse().getData());
		}
		catch(error)
		{
			onLoadFormsDataError(event);
			return;
		}
		
		parseFormsData(data);
		_this.dispatchEvent(new barmatz.events.UserEvent(barmatz.events.UserEvent.GET_FORMS_SUCCESS, data));
	}
	
	function onLoadFormsDataError(event)
	{
		barmatz.utils.DataTypes.isInstanceOf(event, barmatz.events.LoaderEvent);
		removeLoadFormsDataListeners(event.getTarget());
		_this.dispatchEvent(new barmatz.events.UserEvent(barmatz.events.UserEvent.GET_FORMS_FAIL));
	}
};
barmatz.forms.users.UserModel.prototype.getData = function()
{
	var _this = this, request, loader;
	
	request = new barmatz.net.Request(barmatz.forms.Config.BASE_URL + '/api/user/user.php');
	request.setMethod(barmatz.net.Methods.GET);
	
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
		
		barmatz.utils.DataTypes.isInstanceOf(event, barmatz.events.LoaderEvent);
		
		removeLoaderListeners();
		
		try
		{
			data = JSON.parse(event.getResponse().getData());
		}
		catch(error)
		{
			onLoaderError(event);
			return;
		}
		
		_this.set('username', data.username);
		_this.set('firstName', data.first_name);
		_this.set('lastName', data.last_name);
		_this.set('created', barmatz.utils.Date.toDate(data.created));
		_this.set('active', data.active == '1' ? true : false);
		_this.dispatchEvent(new barmatz.events.UserEvent(barmatz.events.UserEvent.DATA_LOAD_SUCCESS));
	}

	function onLoaderError(event)
	{
		removeLoaderListeners();
		_this.dispatchEvent(new barmatz.events.UserEvent(barmatz.events.UserEvent.DATA_LOAD_FAIL));
	}
};
barmatz.forms.users.UserModel.prototype.login = function(username, password)
{
	var _this, request, loader;
	
	barmatz.utils.DataTypes.isTypeOf(username, 'string');
	barmatz.utils.DataTypes.isTypeOf(password, 'string');
	
	_this = this;
	
	request = new barmatz.net.Request(barmatz.forms.Config.BASE_URL + '/api/user/login.php');
	request.setMethod(barmatz.net.Methods.POST);
	request.setData({u: username, p: password});
	
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
		
		barmatz.utils.DataTypes.isInstanceOf(event, barmatz.events.LoaderEvent);
	
		removeLoaderListeners();
		
		try
		{
			data = JSON.parse(event.getResponse().getData());
		}
		catch(error)
		{
			onLoaderError(event);
			return;
		}
		
		_this.dispatchEvent(new barmatz.events.UserEvent(barmatz.events.UserEvent.LOGIN_SUCCESS, data.target));
	}
	
	function onLoaderError(event)
	{
		removeLoaderListeners();
		_this.dispatchEvent(new barmatz.events.UserEvent(barmatz.events.UserEvent.LOGIN_FAIL));
	}
};
barmatz.forms.users.UserModel.prototype.logout = function()
{
	var _this, request, loader;
	
	_this = this;
	
	request = new barmatz.net.Request(barmatz.forms.Config.BASE_URL + '/api/user/logout.php');
	request.setMethod(barmatz.net.Methods.POST);
	
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
		_this.dispatchEvent(new barmatz.events.FormEvent(barmatz.events.UserEvent.LOGOUT_SUCCESS));
	}
	
	function onLoaderError(event)
	{
		removeLoaderListeners();
		_this.dispatchEvent(new barmatz.events.FormEvent(barmatz.events.UserEvent.LOGOUT_FAIL));
	}
};
/** login **/
new barmatz.forms.ui.Login();
