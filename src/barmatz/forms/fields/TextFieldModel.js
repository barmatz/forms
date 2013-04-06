/** barmatz.forms.fields.TextFieldModel **/
window.barmatz.forms.fields.TextFieldModel = function(name)
{
	barmatz.utils.DataTypes.isNotUndefined(name);
	barmatz.utils.DataTypes.isTypeOf(name, 'string', true);
	barmatz.forms.fields.FieldModel.call(this, barmatz.forms.fields.FieldTypes.TEXT_FIELD, name);
	this.set('max', NaN);
};

barmatz.forms.fields.TextFieldModel.prototype = new barmatz.forms.fields.FieldModel(null, null);
barmatz.forms.fields.TextFieldModel.prototype.constructor = barmatz.forms.fields.TextFieldModel;

Object.defineProperties(barmatz.forms.fields.TextFieldModel.prototype,
{
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
		var clone = new barmatz.forms.fields.TextFieldModel(this.name);
		clone.label = this.label;
		clone.mandatory = this.mandatory;
		clone.value = this.value;
		clone.enabled = this.enabled;
		clone.validator = this.validator;
		clone.max = this.max;
		return clone;
	}}
});