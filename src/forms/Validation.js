window.barmatz.forms.Validation = function(){};

Object.defineProperties(barmatz.forms.Validation, 
{
	EMAIL_REGEX: {value: /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/},
	TRIM_REGEX: {value: /(^\s*|\s*$)/},
	PHONE_REGEX: {value: /[\s\-]/g},
	NOT_LETTERS_REGEX: {value: /\W/g},
	NOT_DIGITS_REGEX: {value: /\D/g},
	NOT_SPECIAL_CHARS_REGEX: {value: /[^`!@#\$%\^&\*\(\)\-_=\+\[\]\{\},\.\<\>\/\?|\\]/g},
	MIN_LENGTH: {value: 1},
	MAX_LENGTH: {value: 2},
	NOT_EMPTY: {value: 3},
	VALID_EMAIL: {value: 4},
	VALID_PHONE: {value: 5},
	CONTAINS_LETTERS: {value: 6},
	CONTAINS_DIGITS: {value: 7},
	CONTAINS_SPECIAL_CHARS: {value: 7},
	trim: {value: function(value)
	{
		return value.replace(this.TRIM_REGEX, '');
	}},
	delete: {value: function(value, pattern)
	{
		return value.replace(pattern, '');
	}},
	minLength: {value: function(value, min)
	{
		return this.trim(value).length > min;
	}},
	maxLength: {value: function(value, max)
	{
		return this.trim(value).length < max;
	}},
	notEmpty: {value: function(value)
	{
		return this.minLength(value, 0);
	}},
	validEmail: {value: function(value)
	{
		return this.EMAIL_REGEX.test(this.trim(value));
	}},
	validPhone: {value: function(value)
	{
		return this.notEmpty(this.delete(this.trim(value), this.PHONE_REGEX));
	}},
	containsLetters: {value: function(value)
	{
		return this.notEmpty(this.delete(this.trim(value), this.NOT_LETTERS_REGEX));
	}},
	containsDigits: {value: function(value)
	{
		return this.notEmpty(this.delete(this.trim(value), this.NOT_DIGITS_REGEX));
	}},
	containsSpecialCharacters: {value: function(value)
	{
		return this.notEmpty(this.delete(this.trim(value), this.NOT_SPECIAL_CHARS_REGEX));
	}},
});