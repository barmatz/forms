/** barmatz.forms.FormPasswordField **/
window.barmatz.forms.FormPasswordField = function(name)
{
	if(name === undefined)
		throw new ReferenceError('expected property name is undefined');
	else if(typeof name != 'string')
		throw new TypeError('name is not a String');
	
	barmatz.forms.FormTextField.call(this, name);
	
	this.set('type', barmatz.forms.FormFieldType.PASSWORD);
};

barmatz.forms.FormPasswordField.prototype = new barmatz.forms.FormTextField(null);
barmatz.forms.FormPasswordField.prototype.constructor = barmatz.forms.FormPasswordField;