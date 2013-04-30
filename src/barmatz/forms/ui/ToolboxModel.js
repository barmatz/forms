/** barmatz.forms.ui.ToolboxModel **/
barmatz.forms.ui.ToolboxModel = function()
{
	barmatz.forms.CollectionModel.call(this);
};
barmatz.forms.ui.ToolboxModel.prototype = new barmatz.forms.CollectionModel();
barmatz.forms.ui.ToolboxModel.prototype.constructor = barmatz.forms.ui.ToolboxModel;
barmatz.forms.ui.ToolboxModel.prototype.addItem = function(item)
{
	barmatz.utils.DataTypes.isInstanceOf(item, barmatz.forms.ui.ToolboxItemModel);
	return barmatz.forms.CollectionModel.prototype.addItem.call(this, item);
};
barmatz.forms.ui.ToolboxModel.prototype.addItemAt = function(item, index)
{
	barmatz.utils.DataTypes.isInstanceOf(item, barmatz.forms.ui.ToolboxItemModel);
	barmatz.utils.DataTypes.isTypeOf(index, 'number');
	return barmatz.forms.CollectionModel.prototype.addItemAt.call(this, item, index);
};
barmatz.forms.ui.ToolboxModel.prototype.removeItem = function(item)
{
	barmatz.utils.DataTypes.isInstanceOf(item, barmatz.forms.ui.ToolboxItemModel);
	return barmatz.forms.CollectionModel.prototype.removeItem.call(this, item);
};
barmatz.forms.ui.ToolboxModel.prototype.getItemIndex = function(item)
{
	barmatz.utils.DataTypes.isInstanceOf(item, barmatz.forms.ui.ToolboxItemModel);
	return barmatz.forms.CollectionModel.prototype.getItemIndex.call(this, item);
};
barmatz.forms.ui.ToolboxModel.prototype.getFieldModelAt = function(index)
{
	barmatz.utils.DataTypes.isTypeOf(index, 'number');
	return this.getItemAt(index).getFieldModel();
};