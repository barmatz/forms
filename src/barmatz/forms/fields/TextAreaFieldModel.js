/** barmatz.forms.fields.TextAreaFieldModel **/
window.barmatz.forms.fields.TextAreaFieldModel = function(name)
{
	barmatz.utils.DataTypes.isNotUndefined(name);
	barmatz.utils.DataTypes.isTypeOf(name, 'string', true);
	barmatz.forms.fields.FieldModel.call(this, barmatz.forms.fields.FieldTypes.TEXT_AREA, name);
	this.set('rows', 2);
	this.set('cols', 20);
};

barmatz.forms.fields.TextAreaFieldModel.prototype = new barmatz.forms.fields.FieldModel(null, null);
barmatz.forms.fields.TextAreaFieldModel.prototype.constructor = barmatz.forms.fields.TextAreaFieldModel;

Object.defineProperties(barmatz.forms.fields.TextAreaFieldModel.prototype,
{
	rows: {get: function()
	{
		return this.get('rows');
	}, set: function(value)
	{
		this.set('rows', value);
	}},
	cols: {get: function()
	{
		return this.get('cols');
	}, set: function(value)
	{
		this.set('cols', value);
	}},
	clone: {value: function()
	{
		var clone = new barmatz.forms.fields.TextAreaFieldModel(this.name);
		clone.label = this.label;
		clone.mandatory = this.mandatory;
		clone.value = this.value;
		clone.enabled = this.enabled;
		clone.validatorCode = this.validatorCode;
		clone.rows = this.rows;
		clone.cols = this.cols;
		return clone;
	}},
	toHTML: {value: function()
	{
		return barmatz.forms.fields.FieldModel.prototype.toHTML.call(this).replace(/(\<input.*\/\>)/, '<textarea cols="' + this.cols + '"' + (this.enabled ? '' : ' disabled="disabled"') + ' name="' + this.name + '"  rows="' + this.rows + '">' + this.value + '</textarea>');
	}}
});