/** barmatz.forms.ui.MenuModel **/
window.barmatz.forms.ui.MenuModel = function()
{
	barmatz.forms.CollectionModel.call(this);
};

barmatz.forms.ui.MenuModel.prototype = new barmatz.forms.CollectionModel();
barmatz.forms.ui.MenuModel.prototype.constructor = barmatz.forms.ui.MenuModel;

Object.defineProperties(barmatz.forms.ui.MenuModel.prototype,
{
	addItem: {value: function(item)
	{
		barmatz.utils.DataTypes.isNotUndefined(item);
		barmatz.utils.DataTypes.isInstanceOf(item, barmatz.forms.ui.MenuItemModel);
		barmatz.forms.CollectionModel.prototype.addItem.call(this, item);
	}},
	removeItem: {value: function(item)
	{
		barmatz.utils.DataTypes.isNotUndefined(item);
		barmatz.utils.DataTypes.isInstanceOf(item, barmatz.forms.ui.MenuItemModel);
		barmatz.forms.CollectionModel.prototype.removeItem.call(this, item);
	}},
	getItemIndex: {value: function(item)
	{
		barmatz.utils.DataTypes.isNotUndefined(item);
		barmatz.utils.DataTypes.isInstanceOf(item, barmatz.forms.ui.MenuItemModel);
		barmatz.forms.CollectionModel.prototype.getItemIndex.call(this, item);
	}}
});