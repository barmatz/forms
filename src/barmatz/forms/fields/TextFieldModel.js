/** barmatz.forms.fields.TextFieldModel **/
barmatz.forms.fields.TextFieldModel = function(name)
{
	barmatz.utils.DataTypes.isTypeOf(name, 'string', true);
	barmatz.forms.fields.FieldModel.call(this, barmatz.forms.fields.FieldTypes.TEXT_FIELD, name);
	this.set('max', NaN);
	this.set('description', '');
};
barmatz.forms.fields.TextFieldModel.prototype = new barmatz.forms.fields.FieldModel(null, null);
barmatz.forms.fields.TextFieldModel.prototype.constructor = barmatz.forms.fields.TextFieldModel;
barmatz.forms.fields.TextFieldModel.prototype.getMax = function()
{
	return this.get('max');
};
barmatz.forms.fields.TextFieldModel.prototype.setMax = function(value)
{
	barmatz.utils.DataTypes.isTypeOf(value, 'number');
	this.set('max', value);
};
barmatz.forms.fields.TextFieldModel.prototype.getDescription = function()
{
	return this.get('description');
};
barmatz.forms.fields.TextFieldModel.prototype.setDescription = function(value)
{
	this.set('description', value);
};
barmatz.forms.fields.TextFieldModel.prototype.clone = function()
{
	var clone = new barmatz.forms.fields.TextFieldModel(this.getName());
	clone.setLabel(this.getLabel());
	clone.setMandatory(this.getMandatory());
	clone.setValue(this.getValue());
	clone.setEnabled(this.getEnabled());
	clone.setValidator(this.getValidator().clone());
	clone.setMax(this.getMax());
	clone.setDescription(this.getDescription());
	return clone;
};