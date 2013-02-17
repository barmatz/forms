/** barmatz.net.Request */
window.barmatz.net.Request = function(url)
{
	if(url === undefined)
		throw new ReferenceError('expected property url is undefined');
	else if(typeof url != 'string')
		throw new TypeError('url is not a String');
		
	barmatz.mvc.Model.call(this);
	this.set('url', url);
	this.set('method', barmatz.net.Request.GET);
	this.set('async', true);
};

barmatz.net.Request.prototype = new barmatz.mvc.Model();
barmatz.net.Request.prototype.constructor = barmatz.net.Request;

Object.defineProperties(barmatz.net.Request,
{
	GET: {value: 'GET'},
	POST: {value: 'POST'},
	PUT: {value: 'PUT'},
	DELETE: {value: 'DELETE'}
});
Object.defineProperties(barmatz.net.Request.prototype,
{
	url: {get: function()
	{
		return this.get('url');
	}},
	method: {get: function()
	{
		return this.get('method');
	}, set: function(value)
	{
		if(typeof value != 'string')
			throw new TypeError('value is not a String');
		
		this.set('method', value);
	}},
	async: {get: function()
	{
		return this.get('async');
	}, set: function(value)
	{
		if(typeof value != 'boolean')
			throw new TypeError('value is not a Boolean');
		
		this.set('async', value);
	}},
	credentials: {get: function()
	{
		return this.get('credentials');
	}, set: function(value)
	{
		if(!(value instanceof barmatz.net.RequestCredentils))
			throw new TypeError('value is not a RequestCredentils object');
		
		this.set('credentials', value);
	}}
});