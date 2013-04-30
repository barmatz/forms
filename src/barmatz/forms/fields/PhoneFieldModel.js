/** barmatz.forms.fields.PhoneFieldModel **/
barmatz.forms.fields.PhoneFieldModel = function(name)
{
	barmatz.utils.DataTypes.isNotUndefined(name);
	barmatz.forms.fields.FieldModel.call(this, barmatz.forms.fields.FieldTypes.PHONE, name);
	this.getValidator().setCode(barmatz.forms.Validator.VALID_PHONE); 
	this.set('prefix', '');
};
barmatz.forms.fields.PhoneFieldModel.prototype = new barmatz.forms.fields.FieldModel(null, null);
barmatz.forms.fields.PhoneFieldModel.prototype.constructor = barmatz.forms.fields.PhoneFieldModel;
barmatz.forms.fields.PhoneFieldModel.prototype.getPrefix = function()
{
	return this.get('prefix');
};
barmatz.forms.fields.PhoneFieldModel.prototype.getValue = function()
{
	return this.get('value');
};
barmatz.forms.fields.PhoneFieldModel.prototype.setValue = function(value)
{
	var prefixes, prefix, prefixesRegex, maxLength;
	
	barmatz.utils.DataTypes.isTypeOf(value, 'string', true);
	
	prefixes = [];
	
	barmatz.forms.fields.PhonePrefixes.forEach(function(prefix)
	{
		prefixes.push(prefix);
	});
	
	prefixesRegex = '^(' + prefixes.join('|') + ')';
	
	if(new RegExp(prefixesRegex).test(value))
		this.set('prefix', value.replace(new RegExp(prefixesRegex + '.+$'), '$1'));
	else
		this.set('prefix', '');
	
	prefix = this.getPrefix();
	maxLength = 7;
	
	if(value.replace(prefix, '').length > maxLength)
		value = prefix + value.substring(prefix.length, maxLength);
	
	this.set('value', value);
};
barmatz.forms.fields.PhoneFieldModel.prototype.clone = function()
{
	var clone = new barmatz.forms.fields.PhoneFieldModel(this.getName());
	clone.setLabel(this.getLabel());
	clone.setMandatory(this.getMandatory());
	clone.setValue(this.getValue());
	clone.setEnabled(this.getEnabled());
	clone.setValidator(this.getValidator().clone());
	return clone;
};