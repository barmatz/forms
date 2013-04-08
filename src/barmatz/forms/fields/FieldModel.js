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
	this.set('validator', barmatz.forms.factories.ModelFactory.createValidatorModel());
	this.set('width', NaN);
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
		return barmatz.forms.Validator.EQUALS +
			   barmatz.forms.Validator.VALID_EMAIL +
			   barmatz.forms.Validator.VALID_PHONE +
			   barmatz.forms.Validator.MIN_LENGTH +
			   barmatz.forms.Validator.MAX_LENGTH +
			   barmatz.forms.Validator.EXACT_LENGTH +
			   barmatz.forms.Validator.GREATER_THAN +
			   barmatz.forms.Validator.LESSER_THAN +
			   barmatz.forms.Validator.DIGITS_ONLY +
			   barmatz.forms.Validator.NOT_DIGITS;
	}},
	validator: {get: function()
	{
		return this.get('validator');
	}, set: function(value)
	{
		barmatz.utils.DataTypes.isInstanceOf(value, barmatz.forms.fields.ValidatorModel);
		this.set('validator', value);
	}},
	width: {get: function()
	{
		return this.get('width');
	}, set: function(value)
	{
		barmatz.utils.DataTypes.isTypeOf(value, 'number');
		this.set('width', value);
	}},
	validate: {value: function()
	{
		var errors, bits, i;
		
		errors = 0;
		
		if(this.mandatory)
			if(!barmatz.forms.Validator.notEmpty(this.value))
				errors = barmatz.utils.Bitwise.concat(errors, barmatz.forms.Validator.NOT_EMPTY);
		
		if(this.validator.code)
		{
			bits = barmatz.utils.Bitwise.parseBit(this.validator.code);
			
			for(i in bits)
				switch(bits[i])
				{
					default:
						throw new Error('Unknown validation code');
						break;
					case barmatz.forms.Validator.NONE:
					case barmatz.forms.Validator.NOT_EMPTY:
						break;
					case barmatz.forms.Validator.EQUALS:
						if(!barmatz.forms.Validator.equals(this.value, this.validator.equals))
							errors = barmatz.utils.Bitwise.concat(errors, barmatz.forms.Validator.EQUALS);
						break;
					case barmatz.forms.Validator.VALID_EMAIL:
						if(!barmatz.forms.Validator.validEmail(this.value))
							errors = barmatz.utils.Bitwise.concat(errors, barmatz.forms.Validator.VALID_EMAIL);
						break;
					case barmatz.forms.Validator.VALID_PHONE:
						if(!barmatz.forms.Validator.validPhone(this.value))
							errors = barmatz.utils.Bitwise.concat(errors, barmatz.forms.Validator.VALID_PHONE);
						break;
					case barmatz.forms.Validator.MIN_LENGTH:
						if(!barmatz.forms.Validator.minLength(this.value, this.validator.minLength))
							errors = barmatz.utils.Bitwise.concat(errors, barmatz.forms.Validator.MIN_LENGTH);
						break;
					case barmatz.forms.Validator.MAX_LENGTH:
						if(!barmatz.forms.Validator.maxLength(this.value, this.validator.maxLength))
							errors = barmatz.utils.Bitwise.concat(errors, barmatz.forms.Validator.MAX_LENGTH);
						break;
					case barmatz.forms.Validator.EXACT_LENGTH:
						if(!barmatz.forms.Validator.exactLength(this.value, this.validator.exactLength))
							errors = barmatz.utils.Bitwise.concat(errors, barmatz.forms.Validator.EXACT_LENGTH);
						break;
					case barmatz.forms.Validator.GREATER_THAN:
						if(!barmatz.forms.Validator.greaterThan(parseFloat(this.value), this.validator.greaterThan))
							errors = barmatz.utils.Bitwise.concat(errors, barmatz.forms.Validator.GREATER_THAN);
						break;
					case barmatz.forms.Validator.LESSER_THAN:
						if(!barmatz.forms.Validator.lesserThan(parseFloat(this.value), this.validator.lesserThan))
							errors = barmatz.utils.Bitwise.concat(errors, barmatz.forms.Validator.LESSER_THAN);
						break;
					case barmatz.forms.Validator.DIGITS_ONLY:
						if(!barmatz.forms.Validator.digitsOnly(this.value))
							errors = barmatz.utils.Bitwise.concat(errors, barmatz.forms.Validator.DIGITS_ONLY);
						break;
					case barmatz.forms.Validator.NOT_DIGITS:
						if(!barmatz.forms.Validator.notDigits(this.value))
							errors = barmatz.utils.Bitwise.concat(errors, barmatz.forms.Validator.NOT_DIGITS);
						break;
				}
		}
		
		if(errors > 0)
		{
			this.dispatchEvent(new barmatz.events.FieldModelEvent(barmatz.events.FieldModelEvent.INVALID, errors));
			return false;
		}
		else
		{
			this.dispatchEvent(new barmatz.events.FieldModelEvent(barmatz.events.FieldModelEvent.VALID));
			return true;
		}
			
	}},
	clone: {value: function()
	{
		var clone = new barmatz.forms.fields.FieldModel(this.type, this.name);
		clone.label = this.label;
		clone.mandatory = this.mandatory;
		clone.value = this.value;
		clone.enabled = this.enabled;
		clone.validator = this.validator.clone();
		clone.width = this.width;
		return clone;
	}}
});