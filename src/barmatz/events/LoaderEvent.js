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