/** barmatz.forms.Validator **/
barmatz.forms.Validator = {
	NONE: 0X0,
	NOT_EMPTY: 0X1,
	EQUALS: 0x2,
	VALID_EMAIL: 0x4,
	VALID_PHONE: 0x8,
	MIN_LENGTH: 0x10,
	MAX_LENGTH: 0x20,
	EXACT_LENGTH: 0x40,
	GREATER_THAN: 0x80,
	LESSER_THAN: 0x100,
	DIGITS_ONLY: 0x200,
	NOT_DIGITS: 0x400,
	trim: function(string)
	{
		barmatz.utils.DataTypes.isTypeOf(string, 'string');
		return string.replace(/(^\s+|\s+$)/g, '');
	},
	notEmpty: function(value)
	{
		barmatz.utils.DataTypes.isTypeOf(value, 'string');
		return this.trim(value).length != 0;
	},
	equals: function(value, pattern)
	{
		barmatz.utils.DataTypes.isTypeOf(value, 'string');
		barmatz.utils.DataTypes.isTypesOrInstances(pattern, ['string'], [RegExp]);
		return new RegExp(pattern).test(value);
	},
	validEmail: function(value)
	{
		barmatz.utils.DataTypes.isTypeOf(value, 'string');
		return this.equals(value, /^[a-z0-9!#$%&'*+\/=?^_`"{|}~-]+(?:\.[a-z0-9!#$%&'*+\/=?^_`"{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+([a-z].+)\b$/);
	},
	validPhone: function(value)
	{
		barmatz.utils.DataTypes.isTypeOf(value, 'string');
		return this.equals(value, new RegExp('^(' + barmatz.forms.fields.PhonePrefixes.join('|') + ')[2-9][0-9]{6}$'));
	},
	maxLength: function(value, length)
	{
		barmatz.utils.DataTypes.isTypeOf(value, 'string');
		barmatz.utils.DataTypes.isTypeOf(length, 'number');
		return value.length <= length;
	},
	minLength: function(value, length)
	{
		barmatz.utils.DataTypes.isTypeOf(value, 'string');
		barmatz.utils.DataTypes.isTypeOf(length, 'number');
		return value.length >= length;
	},
	exactLength: function(value, length)
	{
		barmatz.utils.DataTypes.isTypeOf(value, 'string');
		barmatz.utils.DataTypes.isTypeOf(length, 'number');
		return value.length == length;
	},
	greaterThan: function(valueA, valueB)
	{
		barmatz.utils.DataTypes.isTypeOf(valueA, 'number');
		barmatz.utils.DataTypes.isTypeOf(valueB, 'number');
		return valueA > valueB;
	},
	lesserThan: function(valueA, valueB)
	{
		barmatz.utils.DataTypes.isTypeOf(valueA, 'number');
		barmatz.utils.DataTypes.isTypeOf(valueB, 'number');
		return valueA < valueB;
	},
	digitsOnly: function(value)
	{
		barmatz.utils.DataTypes.isTypeOf(value, 'string');
		return this.equals(value, /^\d*$/);
	},
	notDigits: function(value)
	{
		barmatz.utils.DataTypes.isTypeOf(value, 'string');
		return this.equals(value, /^\D*$/);
	}
};