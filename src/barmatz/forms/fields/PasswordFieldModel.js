/** barmatz.forms.fields.PasswordFieldModel **/
barmatz.forms.fields.PasswordFieldModel = function(name)
{
	barmatz.utils.DataTypes.isTypeOf(name, 'string');
	barmatz.forms.fields.TextFieldModel.call(this, name);
	this.set('type', barmatz.forms.fields.FieldTypes.PASSWORD);
};
barmatz.forms.fields.PasswordFieldModel.prototype = new barmatz.forms.fields.TextFieldModel(null);
barmatz.forms.fields.PasswordFieldModel.prototype.constructor = barmatz.forms.fields.PasswordFieldModel;
barmatz.forms.fields.PasswordFieldModel.prototype.clone = function()
{
	var clone = new barmatz.forms.fields.PasswordFieldModel(this.getName());
	clone.setLabel(this.getLabel());
	clone.setMandatory(this.getMandatory());
	clone.setValue(this.getValue());
	clone.setEnabled(this.getEnabled());
	clone.setValidator(this.getValidator().clone());
	clone.setMax(this.getMax());
	clone.setDescription(this.getDescription());
	return clone;
};