/** barmatz.net.RequestHeader **/
window.barmatz.net.RequestHeader = function(header, value)
{
	barmatz.utils.DataTypes.isNotUndefined(header);
	barmatz.utils.DataTypes.isNotUndefined(value);
	barmatz.utils.DataTypes.isTypeOf(header, 'string');
	barmatz.utils.DataTypes.isTypeOf(value, 'string');
	barmatz.mvc.Model.call(this);
	this.set('header', header);
	this.set('value', value);
};

barmatz.net.RequestHeader.prototype = new barmatz.mvc.Model();
barmatz.net.RequestHeader.prototype.constructor = barmatz.net.RequestHeader;

Object.defineProperties(barmatz.net.RequestHeader.prototype,
{
	header: {get: function()
	{
		return this.get('header');
	}, set: function(value)
	{
		barmatz.utils.DataTypes.isTypeOf(value, 'string');
		this.set('header', value);
	}},
	value: {get: function()
	{
		return this.get('value');
	}, set: function(value)
	{
		barmatz.utils.DataTypes.isTypeOf(value, 'string');
		this.set('value', value);
	}}
});