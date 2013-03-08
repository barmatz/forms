/** barmatz.forms.fields.FormHiddenFieldModel **/
window.barmatz.forms.fields.FormHiddenFieldModel = function(name)
{
	barmatz.utils.DataTypes.isNotUndefined(name);
	barmatz.utils.DataTypes.isTypeOf(name, 'string');
	barmatz.forms.fields.FormFieldModel.call(this, barmatz.forms.fields.FormFieldTypes.HIDDEN, name);
};

barmatz.forms.fields.FormHiddenFieldModel.prototype = new barmatz.forms.fields.FormFieldModel(null, null);
barmatz.forms.fields.FormHiddenFieldModel.prototype.constructor = barmatz.forms.fields.FormHiddenFieldModel;

Object.defineProperties(barmatz.forms.fields.FormHiddenFieldModel.prototype,
{
	clone: {value: function()
	{
		var clone = new barmatz.forms.fields.FormHiddenFieldModel(this.name);
		clone.label = this.label;
		clone.mandatory = this.mandatory;
		clone.default = this.default;
		clone.value = this.value;
		clone.enabled = this.enabled;
		return clone;
	}}	
});