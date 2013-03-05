/** barmatz.forms.fields.FormHiddenFieldModel **/
window.barmatz.forms.fields.FormHiddenFieldModel = function(name)
{
	barmatz.utils.DataTypes.isNotUndefined(name);
	barmatz.utils.DataTypes.isTypeOf(name, 'string');
	barmatz.forms.fields.FormFieldModel.call(this, barmatz.forms.fields.FormFieldTypes.HIDDEN, name);
};

barmatz.forms.fields.FormHiddenFieldModel.prototype = new barmatz.forms.fields.FormFieldModel(null, null);
barmatz.forms.fields.FormHiddenFieldModel.prototype.constructor = barmatz.forms.fields.FormHiddenFieldModel;