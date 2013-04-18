/** barmatz.forms.LeadModel **/
window.barmatz.forms.LeadModel = function()
{
	barmatz.mvc.Model.call(this);
	this.set('created', null);
	this.set('data', null);
	this.set('ip', null);
	this.set('referer', null);
};

barmatz.forms.LeadModel.prototype = new barmatz.mvc.Model();
barmatz.forms.LeadModel.prototype.constructor = barmatz.forms.LeadModel;

Object.defineProperties(barmatz.forms.LeadModel.prototype,
{
	created: {get: function()
	{
		return this.get('created');
	}, set: function(value)
	{
		barmatz.utils.DataTypes.isInstanceOf(value, Date);
		this.set('created', value);
	}},
	data: {get: function()
	{
		return this.get('data');
	}, set: function(value)
	{
		barmatz.utils.DataTypes.isTypeOf(value, 'object');
		this.set('data', value);
	}},
	ip: {get: function()
	{
		return this.get('ip');
	}, set: function(value)
	{
		barmatz.utils.DataTypes.isTypeOf(value, 'string');
		this.set('ip', value);
	}},
	referer: {get: function()
	{
		return this.get('referer');
	}, set: function(value)
	{
		barmatz.utils.DataTypes.isTypeOf(value, 'string');
		this.set('referer', value);
	}}
});