/** barmatz.forms.fields.FieldModel **/
barmatz.forms.fields.FieldModel = function(type, name)
{
	barmatz.utils.DataTypes.isNotUndefined(type);
	barmatz.utils.DataTypes.isNotUndefined(name);
	barmatz.utils.DataTypes.isTypeOf(type, 'string', true);
	barmatz.utils.DataTypes.isTypeOf(name, 'string', true);
	barmatz.forms.fields.FormItemModel.call(this, type);
	this.set('name', name);
	this.set('label', '');
	this.set('mandatory', false);
	this.set('value', '');
	this.set('enabled', true);
	this.set('validator', barmatz.forms.factories.ModelFactory.createValidatorModel());
	this.set('width', NaN);
};

barmatz.forms.fields.FieldModel.prototype = new barmatz.forms.fields.FormItemModel(null);
barmatz.forms.fields.FieldModel.prototype.constructor = barmatz.forms.fields.FieldModel;
barmatz.forms.fields.FieldModel.prototype.getName = function()
{
	return this.get('name');
};
barmatz.forms.fields.FieldModel.prototype.setName = function(value)
{
	barmatz.utils.DataTypes.isTypeOf(value, 'string');
	this.set('name', value);
};
barmatz.forms.fields.FieldModel.prototype.getLabel = function()
{
	return this.get('label');
};
barmatz.forms.fields.FieldModel.prototype.setLabel = function(value)
{
	barmatz.utils.DataTypes.isTypeOf(value, 'string');
	this.set('label', value);
};
barmatz.forms.fields.FieldModel.prototype.getMandatory = function()
{
	return this.get('mandatory');
};
barmatz.forms.fields.FieldModel.prototype.setMandatory = function(value)
{
	barmatz.utils.DataTypes.isTypeOf(value, 'boolean');
	this.set('mandatory', value);
};
barmatz.forms.fields.FieldModel.prototype.getValue = function()
{
	return this.get('value');
};
barmatz.forms.fields.FieldModel.prototype.setValue = function(value)
{
	this.set('value', value);
};
barmatz.forms.fields.FieldModel.prototype.getEnabled = function()
{
	return this.get('enabled');
};
barmatz.forms.fields.FieldModel.prototype.setEnabled = function(value)
{
	barmatz.utils.DataTypes.isTypeOf(value, 'boolean');
	this.set('enabled', value);
};
barmatz.forms.fields.FieldModel.prototype.getAvailableValidators = function()
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
};
barmatz.forms.fields.FieldModel.prototype.getValidator = function()
{
	return this.get('validator');
};
barmatz.forms.fields.FieldModel.prototype.setValidator = function(value)
{
	barmatz.utils.DataTypes.isInstanceOf(value, barmatz.forms.fields.ValidatorModel);
	this.set('validator', value);
};
barmatz.forms.fields.FieldModel.prototype.getWidth = function()
{
	return this.get('width');
};
barmatz.forms.fields.FieldModel.prototype.setWidth = function(value)
{
	barmatz.utils.DataTypes.isTypeOf(value, 'number');
	this.set('width', value);
};
barmatz.forms.fields.FieldModel.prototype.validate = function()
{
	var errors, code, bits, value;
	
	errors = 0;
	
	if(this.getMandatory())
		if(!barmatz.forms.Validator.notEmpty(this.getValue()))
			errors = barmatz.utils.Bitwise.concat(errors, barmatz.forms.Validator.NOT_EMPTY);
	
	code = this.getValidator().getCode();
	
	if(code)
	{
		bits = barmatz.utils.Bitwise.parseBit(code);
		value = this.getValue();
		barmatz.utils.Array.forEach(bits, function(item, index, collection)
		{
			switch(item)
			{
				default:
					throw new Error('Unknown validation code');
				break;
				case barmatz.forms.Validator.NONE:
					break;
				case barmatz.forms.Validator.NOT_EMPTY:
					if(!this.getMandatory() && !barmatz.forms.Validator.notEmpty(this.getValue()))
						errors = barmatz.utils.Bitwise.concat(errors, barmatz.forms.Validator.NOT_EMPTY);
					break;
				case barmatz.forms.Validator.EQUALS:
					if(!barmatz.forms.Validator.equals(value, typeof this.getValidator().equals == 'function' ? this.getValidator().equals() : this.getValidator().equals))
						errors = barmatz.utils.Bitwise.concat(errors, barmatz.forms.Validator.EQUALS);
					break;
				case barmatz.forms.Validator.VALID_EMAIL:
					if(!barmatz.forms.Validator.validEmail(value))
						errors = barmatz.utils.Bitwise.concat(errors, barmatz.forms.Validator.VALID_EMAIL);
					break;
				case barmatz.forms.Validator.VALID_PHONE:
					if(!barmatz.forms.Validator.validPhone(value))
						errors = barmatz.utils.Bitwise.concat(errors, barmatz.forms.Validator.VALID_PHONE);
					break;
				case barmatz.forms.Validator.MIN_LENGTH:
					if(!barmatz.forms.Validator.minLength(value, this.getValidator().minLength))
						errors = barmatz.utils.Bitwise.concat(errors, barmatz.forms.Validator.MIN_LENGTH);
					break;
				case barmatz.forms.Validator.MAX_LENGTH:
					if(!barmatz.forms.Validator.maxLength(value, this.getValidator().maxLength))
						errors = barmatz.utils.Bitwise.concat(errors, barmatz.forms.Validator.MAX_LENGTH);
					break;
				case barmatz.forms.Validator.EXACT_LENGTH:
					if(!barmatz.forms.Validator.exactLength(value, this.getValidator().exactLength))
						errors = barmatz.utils.Bitwise.concat(errors, barmatz.forms.Validator.EXACT_LENGTH);
					break;
				case barmatz.forms.Validator.GREATER_THAN:
					if(!barmatz.forms.Validator.greaterThan(parseFloat(value), this.getValidator().greaterThan))
						errors = barmatz.utils.Bitwise.concat(errors, barmatz.forms.Validator.GREATER_THAN);
					break;
				case barmatz.forms.Validator.LESSER_THAN:
					if(!barmatz.forms.Validator.lesserThan(parseFloat(value), this.getValidator().lesserThan))
						errors = barmatz.utils.Bitwise.concat(errors, barmatz.forms.Validator.LESSER_THAN);
					break;
				case barmatz.forms.Validator.DIGITS_ONLY:
					if(!barmatz.forms.Validator.digitsOnly(value))
						errors = barmatz.utils.Bitwise.concat(errors, barmatz.forms.Validator.DIGITS_ONLY);
					break;
				case barmatz.forms.Validator.NOT_DIGITS:
					if(!barmatz.forms.Validator.notDigits(value))
						errors = barmatz.utils.Bitwise.concat(errors, barmatz.forms.Validator.NOT_DIGITS);
					break;
			}
		}, this);
	}
	
	if(errors > 0)
	{
		this.dispatchEvent(new barmatz.events.FieldEvent(barmatz.events.FieldEvent.INVALID, errors));
		return false;
	}
	else
	{
		this.dispatchEvent(new barmatz.events.FieldEvent(barmatz.events.FieldEvent.VALID));
		return true;
	}
		
};
barmatz.forms.fields.FieldModel.prototype.clone = function()
{
	var clone = new barmatz.forms.fields.FieldModel(this.getType(), this.getName());
	clone.setLabel(this.getLabel());
	clone.setMandatory(this.getMandatory());
	clone.setValue(this.getValue());
	clone.setEnabled(this.getEnabled());
	clone.setValidator(this.getValidator().clone());
	clone.setWidth(this.getWidth());
	return clone;
};