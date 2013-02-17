/** barmatz.forms.FormTextField **/
window.barmatz.forms.FormTextField = function(name)
{
	if(name === undefined)
		throw new ReferenceError('expected property name is undefined');
	else if(typeof name != 'string')
		throw new TypeError('name is not a String');
	
	barmatz.forms.FormField.call(this, barmatz.forms.FormFieldType.TEXT, name);
};

barmatz.forms.FormTextField.prototype = new barmatz.forms.FormField(null, null);
barmatz.forms.FormTextField.prototype.constructor = barmatz.forms.FormTextField;