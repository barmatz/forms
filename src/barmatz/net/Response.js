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