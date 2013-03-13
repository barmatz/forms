/** barmatz.forms.ui.ToolboxModel **/
window.barmatz.forms.ui.ToolboxModel = function()
{
	barmatz.forms.CollectionModel.call(this);
};

barmatz.forms.ui.ToolboxModel.prototype = new barmatz.forms.CollectionModel();
barmatz.forms.ui.ToolboxModel.prototype.constructor = barmatz.forms.ui.ToolboxModel;

Object.defineProperties(barmatz.forms.ui.ToolboxModel.prototype,
{
	addItem: {value: function(item)
	{
		barmatz.utils.DataTypes.isNotUndefined(item);
		barmatz.utils.DataTypes.isInstanceOf(item, barmatz.forms.ui.ToolboxItemModel);
		barmatz.forms.CollectionModel.prototype.addItem.call(this, item);
	}},
	addItemAt: {value: function(item, index)
	{
		barmatz.utils.DataTypes.isNotUndefined(item);
		barmatz.utils.DataTypes.isNotUndefined(index);
		barmatz.utils.DataTypes.isInstanceOf(item, barmatz.forms.ui.ToolboxItemModel);
		barmatz.utils.DataTypes.isTypeOf(index, 'number');
		barmatz.forms.CollectionModel.prototype.addItemAt.call(this, item, index);
	}},
	removeItem: {value: function(item)
	{
		barmatz.utils.DataTypes.isNotUndefined(item);
		barmatz.utils.DataTypes.isInstanceOf(item, barmatz.forms.ui.ToolboxItemModel);
		barmatz.forms.CollectionModel.prototype.removeItem.call(this, item);
	}},
	getItemIndex: {value: function(item)
	{
		barmatz.utils.DataTypes.isNotUndefined(item);
		barmatz.utils.DataTypes.isInstanceOf(item, barmatz.forms.ui.ToolboxItemModel);
		barmatz.forms.CollectionModel.prototype.getItemIndex.call(this, item);
	}},
	getFieldModelAt: {value: function(index)
	{
		barmatz.utils.DataTypes.isNotUndefined(index);
		barmatz.utils.DataTypes.isTypeOf(index, 'number');
		return this.getItemAt(index).fieldModel;
	}}
});