/** barmatz.forms.FormCheckboxField **/
window.barmatz.forms.FormCheckboxField = function(name)
{
	if(name === undefined)
		throw new ReferenceError('expected property name is undefined');
	else if(name && typeof name != 'string')
		throw new TypeError('name is not a String');
	
	barmatz.forms.FormField.call(this, barmatz.forms.FormFieldType.CHECKBOX, name);
	
	this.set('checked', false);
};

barmatz.forms.FormCheckboxField.prototype = new barmatz.forms.FormField(null, null);
barmatz.forms.FormCheckboxField.prototype.constructor = barmatz.forms.FormCheckboxField;

Object.defineProperties(barmatz.forms.FormCheckboxField.prototype, 
{
	checked: {get: function()
	{
		return this.get('checked');
	}, set: function(value)
	{
		this.set('checked', Boolean(value));
	}, enumerable: true}
});