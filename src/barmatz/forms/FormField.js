/** barmatz.forms.FormField **/
window.barmatz.forms.FormField = function(type, name)
{
	if(type === undefined)
		throw new ReferenceError('expected property type is undefined');
	else if(type && typeof type != 'string')
		throw new TypeError('type is not a String');

	if(name === undefined)
		throw new ReferenceError('expected property name is undefined');
	else if(name && typeof name != 'string')
		throw new TypeError('name is not a String');
	
	barmatz.mvc.Model.call(this);
	
	this.set('type', type);
	this.set('name', name);
	this.set('default', null);
	this.set('value', null);
	this.set('enabled', null);
};

barmatz.forms.FormField.prototype = new barmatz.mvc.Model();
barmatz.forms.FormField.prototype.constructor = barmatz.forms.FormField;

Object.defineProperties(barmatz.forms.FormField.prototype,
{
	type: {get: function()
	{
		return this.get('type');
	}},
	name: {get: function()
	{
		return this.get('name');
	}},
	default: {get: function()
	{
		return this.get('default');
	}, set: function(value)
	{
		this.set('default', value);
	}},
	value: {get: function()
	{
		var value = this.get('value');
		return value == null ? this.default : value;
	}, set: function(value)
	{
		this.set('value', value);
	}},
	enabled: {get: function()
	{
		return this.get('enabled');
	}, set: function(value)
	{
		this.set('enabled', value);
	}}
});