/** barmatz.forms.fields.HiddenFieldModel **/
barmatz.forms.fields.HiddenFieldModel = function(name)
{
	barmatz.utils.DataTypes.isTypeOf(name, 'string');
	barmatz.forms.fields.FieldModel.call(this, barmatz.forms.fields.FieldTypes.HIDDEN, name);
};
barmatz.forms.fields.HiddenFieldModel.prototype = new barmatz.forms.fields.FieldModel(null, null);
barmatz.forms.fields.HiddenFieldModel.prototype.constructor = barmatz.forms.fields.HiddenFieldModel;
barmatz.forms.fields.HiddenFieldModel.prototype.clone = function()
{
	var clone = new barmatz.forms.fields.HiddenFieldModel(this.getName());
	clone.setLabel(this.getLabel());
	clone.setMandatory(this.getMandatory());
	clone.setValue(this.getValue());
	clone.setEnabled(this.getEnabled());
	clone.setValidator(this.getValidator().clone());
	return clone;
};