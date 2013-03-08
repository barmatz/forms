/** barmatz.forms.fields.FormTextFieldModel **/
window.barmatz.forms.fields.FormTextFieldModel = function(name)
{
	barmatz.utils.DataTypes.isNotUndefined(name);
	barmatz.utils.DataTypes.isTypeOf(name, 'string', true);
	barmatz.forms.fields.FormFieldModel.call(this, barmatz.forms.fields.FormFieldTypes.TEXT, name);
	this.set('min', NaN);
	this.set('max', NaN);
};

barmatz.forms.fields.FormTextFieldModel.prototype = new barmatz.forms.fields.FormFieldModel(null, null);
barmatz.forms.fields.FormTextFieldModel.prototype.constructor = barmatz.forms.fields.FormTextFieldModel;

Object.defineProperties(barmatz.forms.fields.FormTextFieldModel.prototype,
{
	min: {get: function()
	{
		return this.get('min');
	}, set: function(value)
	{
		barmatz.utils.DataTypes.isTypeOf(value, 'number');
		this.set('min', value);
	}},
	max: {get: function()
	{
		return this.get('max');
	}, set: function(value)
	{
		barmatz.utils.DataTypes.isTypeOf(value, 'number');
		this.set('max', value);
	}},
	clone: {value: function()
	{
		var clone = new barmatz.forms.fields.FormTextFieldModel(this.name);
		clone.label = this.label;
		clone.mandatory = this.mandatory;
		clone.default = this.default;
		clone.value = this.value;
		clone.enabled = this.enabled;
		clone.min = this.min;
		clone.max = this.max;
		return clone;
	}}
});