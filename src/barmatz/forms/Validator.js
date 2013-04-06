/** barmatz.forms.Validator **/
window.barmatz.forms.Validator = function()
{
	barmatz.mvc.Model.call(this);
};

barmatz.forms.Validator.prototype = new barmatz.mvc.Model();
barmatz.forms.Validator.prototype.constructor = barmatz.forms.Validator;

Object.defineProperties(barmatz.forms.Validator,
{
	NONE: {value: 0X0},
	NOT_EMPTY: {value: 0X1},
	EQUALS: {value: 0x2},
	VALID_EMAIL: {value: 0x4},
	VALID_PHONE: {value: 0x8},
	MIN_LENGTH: {value: 0x10},
	MAX_LENGTH: {value: 0x20},
	EXACT_LENGTH: {value: 0x40},
	GREATER_THAN: {value: 0x80},
	LESSER_THAN: {value: 0x100},
	DIGITS_ONLY: {value: 0x200},
	NOT_DIGITS: {value: 0x400},
	trim: {value: function(string)
	{
		barmatz.utils.DataTypes.isNotUndefined(string);
		barmatz.utils.DataTypes.isTypeOf(string, 'string');
		return string.replace(/(^\s+|\s+$)/g, '');
	}},
	notEmpty: {value: function(value)
	{
		barmatz.utils.DataTypes.isNotUndefined(value);
		barmatz.utils.DataTypes.isTypeOf(value, 'string');
		return this.trim(value).length != 0;
	}},
	equals: {value: function(value, pattern)
	{
		barmatz.utils.DataTypes.isNotUndefined(value);
		barmatz.utils.DataTypes.isNotUndefined(pattern);
		barmatz.utils.DataTypes.isTypeOf(value, 'string');
		barmatz.utils.DataTypes.isTypesOrInstances(pattern, ['string'], [RegExp]);
		return new RegExp(pattern).test(value);
	}},
	validEmail: {value: function(value)
	{
		barmatz.utils.DataTypes.isNotUndefined(value);
		barmatz.utils.DataTypes.isTypeOf(value, 'string');
		return this.equals(value, /^[a-z0-9!#$%&'*+\/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+\/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+([a-z].+)\b$/);
	}},
	validPhone: {value: function(prefix, number)
	{
		barmatz.utils.DataTypes.isNotUndefined(prefix);
		barmatz.utils.DataTypes.isNotUndefined(number);
		barmatz.utils.DataTypes.isTypeOf(prefix, 'string');
		barmatz.utils.DataTypes.isTypeOf(number, 'string');
		return this.digitsOnly(prefix) && this.equals(number, /^[2-9]\d{6}$/);
	}},
	maxLength: {value: function(value, length)
	{
		barmatz.utils.DataTypes.isNotUndefined(value);
		barmatz.utils.DataTypes.isNotUndefined(length);
		barmatz.utils.DataTypes.isTypeOf(value, 'string');
		barmatz.utils.DataTypes.isTypeOf(length, 'number');
		return value.length <= length;
	}},
	minLength: {value: function(value, length)
	{
		barmatz.utils.DataTypes.isNotUndefined(value);
		barmatz.utils.DataTypes.isNotUndefined(length);
		barmatz.utils.DataTypes.isTypeOf(value, 'string');
		barmatz.utils.DataTypes.isTypeOf(length, 'number');
		return value.length >= length;
	}},
	exactLength: {value: function(value, length)
	{
		barmatz.utils.DataTypes.isNotUndefined(value);
		barmatz.utils.DataTypes.isNotUndefined(length);
		barmatz.utils.DataTypes.isTypeOf(value, 'string');
		barmatz.utils.DataTypes.isTypeOf(length, 'number');
		return value.length == length;
	}},
	greaterThan: {value: function(valueA, valueB)
	{
		barmatz.utils.DataTypes.isNotUndefined(valueA);
		barmatz.utils.DataTypes.isNotUndefined(valueB);
		barmatz.utils.DataTypes.isTypeOf(valueA, 'number');
		barmatz.utils.DataTypes.isTypeOf(valueB, 'number');
		return valueA > valueB;
	}},
	lesserThan: {value: function(valueA, valueB)
	{
		barmatz.utils.DataTypes.isNotUndefined(valueA);
		barmatz.utils.DataTypes.isNotUndefined(valueB);
		barmatz.utils.DataTypes.isTypeOf(valueA, 'number');
		barmatz.utils.DataTypes.isTypeOf(valueB, 'number');
		return valueA < valueB;
	}},
	digitsOnly: {value: function(value)
	{
		barmatz.utils.DataTypes.isNotUndefined(value);
		barmatz.utils.DataTypes.isTypeOf(value, 'string');
		return this.equals(value, /^\d*$/);
	}},
	notDigits: {value: function(value)
	{
		barmatz.utils.DataTypes.isNotUndefined(value);
		barmatz.utils.DataTypes.isTypeOf(value, 'string');
		return this.equals(value, /^\D*$/);
	}}
});