/** barmatz.forms.FormTextField **/
window.barmatz.forms.FormTextField = function(name)
{
	if(name === undefined)
		throw new ReferenceError('expected property name is undefined');
	else if(name && typeof name != 'string')
		throw new TypeError('name is not a String');
	
	barmatz.forms.FormField.call(this, barmatz.forms.FormFieldType.TEXT, name);
	
	this.set('min', null);
	this.set('max', null);
};

barmatz.forms.FormTextField.prototype = new barmatz.forms.FormField(null, null);
barmatz.forms.FormTextField.prototype.constructor = barmatz.forms.FormTextField;

Object.defineProperties(barmatz.forms.FormTextField.prototype,
{
	min: {get: function()
	{
		return this.get('min');
	}, set: function(value)
	{
		this.set('min', value);
	}, enumerable: true},
	max: {get: function()
	{
		return this.get('max');
	}, set: function(value)
	{
		this.set('max', value);
	}, enumerable: true}
});