/** barmatz.forms.fields.FieldModel **/
window.barmatz.forms.fields.FieldModel = function(type, name)
{
	barmatz.utils.DataTypes.isNotUndefined(type);
	barmatz.utils.DataTypes.isNotUndefined(name);
	barmatz.utils.DataTypes.isTypeOf(type, 'string', true);
	barmatz.utils.DataTypes.isTypeOf(name, 'string', true);
	barmatz.forms.TypeModel.call(this, type);
	this.set('name', name);
	this.set('label', '');
	this.set('mandatory', false);
	this.set('value', '');
	this.set('enabled', true);
	this.set('validatorCode', barmatz.forms.ValidationModel.NONE);
};

barmatz.forms.fields.FieldModel.prototype = new barmatz.forms.TypeModel(null);
barmatz.forms.fields.FieldModel.prototype.constructor = barmatz.forms.fields.FieldModel;

Object.defineProperties(barmatz.forms.fields.FieldModel.prototype,
{
	name: {get: function()
	{
		return this.get('name');
	}, set: function(value)
	{
		barmatz.utils.DataTypes.isTypeOf(value, 'string');
		this.set('name', value);
	}},
	label: {get: function()
	{
		return this.get('label');
	}, set: function(value)
	{
		barmatz.utils.DataTypes.isTypeOf(value, 'string');
		this.set('label', value);
	}},
	mandatory: {get: function()
	{
		return this.get('mandatory');
	}, set: function(value)
	{
		barmatz.utils.DataTypes.isTypeOf(value, 'boolean');
		this.set('mandatory', value);
	}},
	value: {get: function()
	{
		return this.get('value');
	}, set: function(value)
	{
		this.set('value', value);
	}},
	enabled: {get: function()
	{
		return this.get('enabled');
	}, set: function(value)
	{
		barmatz.utils.DataTypes.isTypeOf(value, 'boolean');
		this.set('enabled', value);
	}},
	availableValidators: {get: function()
	{
		return barmatz.forms.ValidationModel.EQUALS +
			   barmatz.forms.ValidationModel.VALID_EMAIL +
			   barmatz.forms.ValidationModel.VALID_PHONE +
			   barmatz.forms.ValidationModel.MIN_LENGTH +
			   barmatz.forms.ValidationModel.MAX_LENGTH +
			   barmatz.forms.ValidationModel.EXAC_LENGTH +
			   barmatz.forms.ValidationModel.GREATER_THAN +
			   barmatz.forms.ValidationModel.LESSER_THAN +
			   barmatz.forms.ValidationModel.DIGITS_ONLY +
			   barmatz.forms.ValidationModel.NOT_DIGITS;
	}},
	validatorCode: {get: function()
	{
		return this.get('validatorCode');
	}, set: function(value)
	{
		barmatz.utils.DataTypes.isTypeOf(value, 'number');
		this.set('validatorCode', value);
	}},
	clone: {value: function()
	{
		var clone = new barmatz.forms.fields.FieldModel(this.type, this.name);
		clone.label = this.label;
		clone.mandatory = this.mandatory;
		clone.value = this.value;
		clone.enabled = this.enabled;
		clone.validatorCode = this.validatorCode;
		return clone;
	}},
	toHTML: {value: function()
	{
		return '<div class="forms-form-item"><label>' + this.label + '</label><input type="' + this.type + '"' + (this.enabled ? '' : ' disabled="disabled"') + ' name="' + this.name + '" value="' + this.value + '"/></div>';
	}}
});