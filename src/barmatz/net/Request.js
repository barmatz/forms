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