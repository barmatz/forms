/** barmatz.forms.fields.TextAreaFieldModel **/
barmatz.forms.fields.TextAreaFieldModel = function(name)
{
	barmatz.utils.DataTypes.isTypeOf(name, 'string', true);
	barmatz.forms.fields.FieldModel.call(this, barmatz.forms.fields.FieldTypes.TEXT_AREA, name);
	this.set('rows', 2);
	this.set('cols', 20);
};
barmatz.forms.fields.TextAreaFieldModel.prototype = new barmatz.forms.fields.FieldModel(null, null);
barmatz.forms.fields.TextAreaFieldModel.prototype.constructor = barmatz.forms.fields.TextAreaFieldModel;
barmatz.forms.fields.TextAreaFieldModel.prototype.getRows = function()
{
	return this.get('rows');
};
barmatz.forms.fields.TextAreaFieldModel.prototype.setRows = function(value)
{
	this.set('rows', value);
};
barmatz.forms.fields.TextAreaFieldModel.prototype.getCols = function()
{
	return this.get('cols');
};
barmatz.forms.fields.TextAreaFieldModel.prototype.setCols = function(value)
{
	this.set('cols', value);
};
barmatz.forms.fields.TextAreaFieldModel.prototype.clone = function()
{
	var clone = new barmatz.forms.fields.TextAreaFieldModel(this.getName());
	clone.setLabel(this.getLabel());
	clone.setMandatory(this.getMandatory());
	clone.setValue(this.getValue());
	clone.setEnabled(this.getEnabled());
	clone.setValidator(this.getValidator().clone());
	clone.setRows(this.getRows());
	clone.setCols(this.getCols());
	return clone;
};