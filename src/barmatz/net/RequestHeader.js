/** barmatz.net.RequestHeader **/
barmatz.net.RequestHeader = function(header, value)
{
	barmatz.utils.DataTypes.isTypeOf(header, 'string');
	barmatz.utils.DataTypes.isTypeOf(value, 'string');
	barmatz.mvc.Model.call(this);
	this.set('header', header);
	this.set('value', value);
};
barmatz.net.RequestHeader.prototype = new barmatz.mvc.Model();
barmatz.net.RequestHeader.prototype.constructor = barmatz.net.RequestHeader;
barmatz.net.RequestHeader.prototype.getHeader = function()
{
	return this.get('header');
};
barmatz.net.RequestHeader.prototype.setHeader = function(value)
{
	barmatz.utils.DataTypes.isTypeOf(value, 'string');
	this.set('header', value);
};
barmatz.net.RequestHeader.prototype.getValue = function()
{
	return this.get('value');
};
barmatz.net.RequestHeader.prototype.setValue = function(value)
{
	barmatz.utils.DataTypes.isTypeOf(value, 'string');
	this.set('value', value);
};