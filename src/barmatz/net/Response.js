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