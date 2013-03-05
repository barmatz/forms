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