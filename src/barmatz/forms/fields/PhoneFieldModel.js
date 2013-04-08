/** barmatz.forms.fields.PhoneFieldModel **/
window.barmatz.forms.fields.PhoneFieldModel = function(name)
{
	barmatz.utils.DataTypes.isNotUndefined(name);
	barmatz.utils.DataTypes.isTypeOf(name, 'string', true);
	barmatz.forms.fields.FieldModel.call(this, barmatz.forms.fields.FieldTypes.PHONE, name);
	this.set('prefix', '');
};

barmatz.forms.fields.PhoneFieldModel.prototype = new barmatz.forms.fields.FieldModel(null, null);
barmatz.forms.fields.PhoneFieldModel.prototype.constructor = barmatz.forms.fields.PhoneFieldModel;

Object.defineProperties(barmatz.forms.fields.PhoneFieldModel.prototype,
{
	prefix: {get: function()
	{
		return this.get('prefix');
	}},
	value: {get: function()
	{
		return this.get('value');
	}, set: function(value)
	{
		var prefixes, prefixesRegex, maxLength;
		
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
		
		maxLength = value.length + this.prefix.length;
		
		if(maxLength > 7)
			value = value.substring(0, maxLength);
		
		this.set('value', value);
	}},
	clone: {value: function()
	{
		var clone = new barmatz.forms.fields.PhoneFieldModel(this.name);
		clone.label = this.label;
		clone.mandatory = this.mandatory;
		clone.value = this.value;
		clone.enabled = this.enabled;
		clone.validator = this.validator.clone();
		return clone;
	}}
});