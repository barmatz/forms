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
		console.error(error.stack);
		_this.dispatchEvent(new barmatz.events.LoaderEvent(barmatz.events.LoaderEvent.COMPLETE));
		_this.dispatchEvent(new barmatz.events.LoaderEvent(barmatz.events.LoaderEvent.ERROR, getResponse()));
	}
	
	function isXDomainRequest()
	{
		return window.XDomainRequest && xhr instanceof XDomainRequest;
	}
	
	function getResponse()
	{
		var url, data, type, status, headers;
		
		url = request.getURL();
		data = xhr.responseText || null;
		type = xhr.responseType || xhr.contentType || '';
		status = xhr.status || NaN;
		
		try
		{
			headers = xhr.getAllResponseHeaders().split('\n');
		}
		catch(error)
		{
			headers = [];
		}
		
		return new barmatz.net.Response(url, data, type, status, headers);
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