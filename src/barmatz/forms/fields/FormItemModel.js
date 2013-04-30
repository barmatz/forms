/** barmatz.forms.fields.FormItemModel **/
barmatz.forms.fields.FormItemModel = function(type)
{
	barmatz.utils.DataTypes.isTypeOf(type, 'string', true);
	barmatz.forms.TypeModel.call(this, type);
};
barmatz.forms.fields.FormItemModel.prototype = new barmatz.forms.TypeModel(null);
barmatz.forms.fields.FormItemModel.prototype.constructor = barmatz.forms.fields.FormItemModel;