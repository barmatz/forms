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