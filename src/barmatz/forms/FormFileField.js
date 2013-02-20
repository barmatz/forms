/** barmatz.forms.FormFileField **/
window.barmatz.forms.FormFileField = function(name)
{
	if(name === undefined)
		throw new ReferenceError('expected property name is undefined');
	else if(name && typeof name != 'string')
		throw new TypeError('name is not a String');
	
	barmatz.forms.FormField.call(this, barmatz.forms.FormFieldType.FILE, name);
	
	this.set('accept', []);
};

barmatz.forms.FormFileField.prototype = new barmatz.forms.FormField(null, null);
barmatz.forms.FormFileField.prototype.constructor = barmatz.forms.FormFileField;

Object.defineProperties(barmatz.forms.FormFileField.prototype,
{
	accept: {get: function()
	{
		return this.get('accept');
	}, set: function(value)
	{
		if(value && !(value instanceof Array))
			throw new TypeError('value is not an Array');
		
		this.set('accept', value);
	}, enumerable: true}
});