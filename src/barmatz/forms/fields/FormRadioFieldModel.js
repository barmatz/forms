/** barmatz.forms.fields.FormRadioFieldModel **/
window.barmatz.forms.fields.FormRadioFieldModel = function(name)
{
	barmatz.utils.DataTypes.isNotUndefined(name);
	barmatz.utils.DataTypes.isTypeOf(name, 'string');
	barmatz.forms.fields.FormCheckboxFieldModel.call(this, name);
	this.set('type', barmatz.forms.fields.FormFieldTypes.RADIO);
};

barmatz.forms.fields.FormRadioFieldModel.prototype = new barmatz.forms.fields.FormCheckboxFieldModel(null);
barmatz.forms.fields.FormRadioFieldModel.prototype.constructor = barmatz.forms.fields.FormRadioFieldModel;

Object.defineProperties(barmatz.forms.fields.FormRadioFieldModel.prototype,
{
	clone: {value: function()
	{
		var clone = new barmatz.forms.fields.FormRadioFieldModel(this.name);
		clone.label = this.label;
		clone.mandatory = this.mandatory;
		clone.default = this.default;
		clone.value = this.value;
		clone.enabled = this.enabled;
		return clone;
	}}
});