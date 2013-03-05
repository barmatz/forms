/** barmatz.forms.fields.FormRadioFieldModel **/
window.barmatz.forms.fields.FormRadioFieldModel = function(name)
{
	barmatz.utils.DataTypes.isNotUndefined(name);
	barmatz.utils.DataTypes.isTypeOf(name, 'string');
	barmatz.forms.fields.FormCheckboxFieldModel.call(this, name);
	this.set('type', barmatz.forms.fields.FormFieldTypes.RADIO);
};

barmatz.forms.fields.FormRadioFieldModel.prototype = new barmatz.forms.fields.FormCheckboxFieldModel(null);
barmatz.forms.fields.FormRadioFieldModel.prototype.constructor = barmatz.forms.fields.FormRadioFieldModel;