/** barmatz.forms.ui.ToolboxItemModel **/
barmatz.forms.ui.ToolboxItemModel = function(type, label, fieldModel)
{
	barmatz.utils.DataTypes.isTypeOf(type, 'string');
	barmatz.utils.DataTypes.isTypeOf(label, 'string');
	barmatz.utils.DataTypes.isInstanceOf(fieldModel, barmatz.forms.fields.FormItemModel);
	barmatz.forms.TypeModel.call(this, type);
	this.set('label', label);
	this.set('fieldModel', fieldModel);
};
barmatz.forms.ui.ToolboxItemModel.prototype = new barmatz.forms.TypeModel(null);
barmatz.forms.ui.ToolboxItemModel.prototype.constructor = barmatz.forms.ui.ToolboxItemModel;
barmatz.forms.ui.ToolboxItemModel.prototype.getLabel = function()
{
	return this.get('label');
};
barmatz.forms.ui.ToolboxItemModel.prototype.setLabel = function(value)
{
	barmatz.utils.DataTypes.isTypeOf(label, 'string');
	this.set('label', value);
};
barmatz.forms.ui.ToolboxItemModel.prototype.getFieldModel = function()
{
	return this.get('fieldModel');
};