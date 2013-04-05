/** barmatz.forms.fields.PasswordFieldModel **/
window.barmatz.forms.fields.PasswordFieldModel = function(name)
{
	barmatz.utils.DataTypes.isNotUndefined(name);
	barmatz.utils.DataTypes.isTypeOf(name, 'string');
	barmatz.forms.fields.TextFieldModel.call(this, name);
	this.set('type', barmatz.forms.fields.FieldTypes.PASSWORD);
};

barmatz.forms.fields.PasswordFieldModel.prototype = new barmatz.forms.fields.TextFieldModel(null);
barmatz.forms.fields.PasswordFieldModel.prototype.constructor = barmatz.forms.fields.PasswordFieldModel;

Object.defineProperties(barmatz.forms.fields.PasswordFieldModel.prototype,
{
	clone: {value: function()
	{
		var clone = new barmatz.forms.fields.PasswordFieldModel(this.name);
		clone.label = this.label;
		clone.mandatory = this.mandatory;
		clone.value = this.value;
		clone.enabled = this.enabled;
		clone.validator = this.validator;
		return clone;
	}}
});