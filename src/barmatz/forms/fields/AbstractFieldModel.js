/** barmatz.forms.fields.AbstractFieldModel **/
barmatz.forms.fields.AbstractFieldModel = function(type, name)
{
	barmatz.utils.DataTypes.isNotUndefined(type);
	barmatz.utils.DataTypes.isNotUndefined(name);
	barmatz.utils.DataTypes.isTypeOf(type, 'string', true);
	barmatz.utils.DataTypes.isTypeOf(name, 'string', true);
	barmatz.forms.fields.FormItemModel.call(this, type);
	this.set('name', name);
	this.set('value', '');
};
barmatz.forms.fields.AbstractFieldModel.prototype = new barmatz.forms.fields.FormItemModel(null);
barmatz.forms.fields.AbstractFieldModel.prototype.constructor = barmatz.forms.fields.AbstractFieldModel;
barmatz.forms.fields.AbstractFieldModel.prototype.getName = function()
{
	return this.get('name');
};
barmatz.forms.fields.AbstractFieldModel.prototype.setName = function(value)
{
	barmatz.utils.DataTypes.isTypeOf(value, 'string');
	this.set('name', value);
};
barmatz.forms.fields.AbstractFieldModel.prototype.getValue = function()
{
	return this.get('value');
};
barmatz.forms.fields.AbstractFieldModel.prototype.setValue = function(value)
{
	this.set('value', value);
};
barmatz.forms.fields.AbstractFieldModel.prototype.clone = function()
{
	var clone = new barmatz.forms.fields.AbstractFieldModel(this.getType(), this.getName());
	clone.setValue(this.getValue());
	return clone;
};