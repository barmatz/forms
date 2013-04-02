/** barmatz.forms.fields.PhoneFieldModel **/
window.barmatz.forms.fields.PhoneFieldModel = function(name)
{
	barmatz.utils.DataTypes.isNotUndefined(name);
	barmatz.utils.DataTypes.isTypeOf(name, 'string', true);
	barmatz.forms.fields.FieldModel.call(this, barmatz.forms.fields.FieldTypes.PHONE, name);
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
		var prefixes, prefixesRegex;
		
		barmatz.utils.DataTypes.isTypeOf(value, 'string', true);
		
		prefixes = [];
		
		barmatz.forms.fields.PhonePrefixes.forEach(function(prefix)
		{
			prefixes.push(prefix);
		});
		
		prefixesRegex = '^(' + prefixes.join('|') + ')';
		
		if(new RegExp(prefixesRegex).test(value))
		{
			this.set('prefix', value.replace(new RegExp(prefixesRegex + '.+$'), '$1'));
			value = value.replace(new RegExp(prefixesRegex + '(.+$)'), '$2');
		}
		else
			this.set('prefix', null);
		
		if(value.length > 7)
			value = value.substring(0, 7);
		
		this.set('value', value);
	}},
	clone: {value: function()
	{
		var clone = new barmatz.forms.fields.PhoneFieldModel(this.name);
		clone.label = this.label;
		clone.mandatory = this.mandatory;
		clone.value = this.value;
		clone.enabled = this.enabled;
		return clone;
	}},
	toHTML: {value: function()
	{
		var prefixes = '';
		
		barmatz.forms.fields.PhonePrefixes.forEach(function(prefix)
		{
			prefixes += '<option value="' + prefix + '"' + (prefix == this.prefix ? ' selected="selected"' : '') + '>' + prefix + '</option>';
		});
		
		return barmatz.forms.fields.FieldModel.prototype.toHTML.call(this).replace(/(^.+?)(\<input)(.*)(type=").+?(".+)(\/\>)(\<\/div\>$)/, '$1<span name="' + this.name + '" rel="phone"><select name="' + this.name + '-prefix">' + prefixes + '</select>$2$3$4text$5 maxLength="7"$6</span>$7');
	}}
});