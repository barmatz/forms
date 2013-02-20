/** barmatz.forms.FormHiddenField **/
window.barmatz.forms.FormHiddenField = function(name)
{
	if(name === undefined)
		throw new ReferenceError('expected property name is undefined');
	else if(name && typeof name != 'string')
		throw new TypeError('name is not a String');
	
	barmatz.forms.FormField.call(this, barmatz.forms.FormFieldType.HIDDEN, name);
};

barmatz.forms.FormHiddenField.prototype = new barmatz.forms.FormField(null, null);
barmatz.forms.FormHiddenField.prototype.constructor = barmatz.forms.FormHiddenField;