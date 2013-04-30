/** barmatz.forms.fields.DropboxItemModel **/
barmatz.forms.fields.DropboxItemModel = function(label, value)
{
	barmatz.utils.DataTypes.isNotUndefined(label);
	barmatz.utils.DataTypes.isTypeOf(label, 'string');
	barmatz.mvc.Model.call(this);
	this.set('label', label);
	this.set('value', barmatz.utils.DataTypes.applySilent('isNotUndefined', value) ? value : null);
};
barmatz.forms.fields.DropboxItemModel.prototype = new barmatz.mvc.Model();
barmatz.forms.fields.DropboxItemModel.prototype.constructor = barmatz.forms.fields.DropboxItemModel;
barmatz.forms.fields.DropboxItemModel.prototype.getLabel = function()
{
	return this.get('label');
};
barmatz.forms.fields.DropboxItemModel.prototype.setLabel = function(value)
{
	barmatz.utils.DataTypes.isTypeOf(value, 'string');
	this.set('label', value);
};
barmatz.forms.fields.DropboxItemModel.prototype.getValue = function()
{
	return this.get('value');
};
barmatz.forms.fields.DropboxItemModel.prototype.setValue = function(value)
{
	this.set('value', value);
};
barmatz.forms.fields.DropboxItemModel.prototype.toString = function()
{
	return this.getLabel() + '=' + this.getValue();
};