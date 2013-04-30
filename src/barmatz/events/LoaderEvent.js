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