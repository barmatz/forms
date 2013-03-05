/** barmatz.forms.fields.FormPasswordFieldModel **/
window.barmatz.forms.fields.FormPasswordFieldModel = function(name)
{
	barmatz.utils.DataTypes.isNotUndefined(name);
	barmatz.utils.DataTypes.isTypeOf(name, 'string');
	barmatz.forms.fields.FormTextFieldModel.call(this, name);
	this.set('type', barmatz.forms.fields.FormFieldTypes.PASSWORD);
};

barmatz.forms.fields.FormPasswordFieldModel.prototype = new barmatz.forms.fields.FormTextFieldModel(null);
barmatz.forms.fields.FormPasswordFieldModel.prototype.constructor = barmatz.forms.fields.FormPasswordFieldModel;