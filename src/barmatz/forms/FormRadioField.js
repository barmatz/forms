/** barmatz.forms.FormRadioField **/
window.barmatz.forms.FormRadioField = function(name)
{
	if(name === undefined)
		throw new ReferenceError('expected property name is undefined');
	else if(name && typeof name != 'string')
		throw new TypeError('name is not a String');
	
	barmatz.forms.FormCheckboxField.call(this, name);
	
	this.set('type', barmatz.forms.FormFieldType.RADIO);
};

barmatz.forms.FormRadioField.prototype = new barmatz.forms.FormCheckboxField(null);
barmatz.forms.FormRadioField.prototype.constructor = barmatz.forms.FormRadioField;