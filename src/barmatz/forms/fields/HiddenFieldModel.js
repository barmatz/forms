/** barmatz.forms.fields.HiddenFieldModel **/
barmatz.forms.fields.HiddenFieldModel = function(name)
{
	barmatz.utils.DataTypes.isTypeOf(name, 'string');
	barmatz.forms.fields.AbstractFieldModel.call(this, barmatz.forms.fields.FieldTypes.HIDDEN, name);
};
barmatz.forms.fields.HiddenFieldModel.prototype = new barmatz.forms.fields.AbstractFieldModel(null, null);
barmatz.forms.fields.HiddenFieldModel.prototype.constructor = barmatz.forms.fields.HiddenFieldModel;
barmatz.forms.fields.HiddenFieldModel.prototype.clone = function()
{
	var clone = new barmatz.forms.fields.HiddenFieldModel(this.getName());
	clone.setValue(this.getValue());
	return clone;
};