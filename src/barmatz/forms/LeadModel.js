/** barmatz.forms.LeadModel **/
barmatz.forms.LeadModel = function()
{
	barmatz.mvc.Model.call(this);
	this.set('created', null);
	this.set('data', null);
	this.set('ip', null);
	this.set('referer', null);
};
barmatz.forms.LeadModel.prototype = new barmatz.mvc.Model();
barmatz.forms.LeadModel.prototype.constructor = barmatz.forms.LeadModel;
barmatz.forms.LeadModel.prototype.getCreated = function()
{
	return this.get('created');
};
barmatz.forms.LeadModel.prototype.setCreated = function(value)
{
	barmatz.utils.DataTypes.isInstanceOf(value, Date);
	this.set('created', value);
};
barmatz.forms.LeadModel.prototype.getData = function()
{
	return this.get('data');
};
barmatz.forms.LeadModel.prototype.setData = function(value)
{
	barmatz.utils.DataTypes.isTypeOf(value, 'object');
	this.set('data', value);
};
barmatz.forms.LeadModel.prototype.getIP = function()
{
	return this.get('ip');
};
barmatz.forms.LeadModel.prototype.setIP = function(value)
{
	barmatz.utils.DataTypes.isTypeOf(value, 'string');
	this.set('ip', value);
};
barmatz.forms.LeadModel.prototype.getReferer = function()
{
	return this.get('referer');
};
barmatz.forms.LeadModel.prototype.setReferer = function(value)
{
	barmatz.utils.DataTypes.isTypeOf(value, 'string');
	this.set('referer', value);
};