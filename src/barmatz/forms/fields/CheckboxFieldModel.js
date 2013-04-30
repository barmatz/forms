/** barmatz.forms.fields.CheckboxFieldModel **/
barmatz.forms.fields.CheckboxFieldModel = function(name)
{
	barmatz.utils.DataTypes.isNotUndefined(name);
	barmatz.utils.DataTypes.isTypeOf(name, 'string', true);
	barmatz.forms.fields.FieldModel.call(this, barmatz.forms.fields.FieldTypes.CHECKBOX, name);
	this.set('checked', false);
};
barmatz.forms.fields.CheckboxFieldModel.prototype = new barmatz.forms.fields.FieldModel(null, null);
barmatz.forms.fields.CheckboxFieldModel.prototype.constructor = barmatz.forms.fields.CheckboxFieldModel;
barmatz.forms.fields.CheckboxFieldModel.prototype.getChecked = function()
{
	return this.get('checked');
};
barmatz.forms.fields.CheckboxFieldModel.prototype.setChecked = function(value)
{
	barmatz.utils.DataTypes.isTypeOf(value, 'boolean');
	this.set('checked', value);
};
barmatz.forms.fields.CheckboxFieldModel.prototype.getValue = function()
{
	return this.getChecked() ? this.get('value') : '';
};
barmatz.forms.fields.CheckboxFieldModel.prototype.clone = function()
{
	var clone = new barmatz.forms.fields.CheckboxFieldModel(this.getName());
	clone.setLabel(this.getLabel());
	clone.setMandatory(this.getMandatory());
	clone.setValue(this.getValue());
	clone.setEnabled(this.getEnabled());
	clone.setValidator(this.getValidator().clone());
	clone.setChecked(this.getChecked());
	return clone;
};