/** barmatz.forms.fields.RadioFieldModel **/
barmatz.forms.fields.RadioFieldModel = function(name)
{
	barmatz.utils.DataTypes.isTypeOf(name, 'string');
	barmatz.forms.fields.CheckboxFieldModel.call(this, name);
	this.set('type', barmatz.forms.fields.FieldTypes.RADIO);
};
barmatz.forms.fields.RadioFieldModel.prototype = new barmatz.forms.fields.CheckboxFieldModel(null);
barmatz.forms.fields.RadioFieldModel.prototype.constructor = barmatz.forms.fields.RadioFieldModel;
barmatz.forms.fields.RadioFieldModel.prototype.clone = function()
{
	var clone = new barmatz.forms.fields.RadioFieldModel(this.getName());
	clone.setLabel(this.getLabel());
	clone.setMandatory(this.getMandatory());
	clone.setValue(this.getValue());
	clone.setEnabled(this.getEnabled());
	clone.setValidator(this.getValidator().clone());
	clone.setChecked(this.getChecked());
	return clone;
};