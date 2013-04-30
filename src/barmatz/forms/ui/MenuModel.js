/** barmatz.forms.ui.MenuModel **/
barmatz.forms.ui.MenuModel = function()
{
	barmatz.forms.CollectionModel.call(this);
	this.set('open', false);
};
barmatz.forms.ui.MenuModel.prototype = new barmatz.forms.CollectionModel();
barmatz.forms.ui.MenuModel.prototype.constructor = barmatz.forms.ui.MenuModel;
barmatz.forms.ui.MenuModel.prototype.isOpen = function()
{
	return this.get('open');
};
barmatz.forms.ui.MenuModel.prototype.addItem = function(item)
{
	barmatz.utils.DataTypes.isInstanceOf(item, barmatz.forms.ui.MenuItemModel);
	barmatz.forms.CollectionModel.prototype.addItem.call(this, item);
};
barmatz.forms.ui.MenuModel.prototype.removeItem = function(item)
{
	barmatz.utils.DataTypes.isInstanceOf(item, barmatz.forms.ui.MenuItemModel);
	barmatz.forms.CollectionModel.prototype.removeItem.call(this, item);
};
barmatz.forms.ui.MenuModel.prototype.getItemIndex = function(item)
{
	barmatz.utils.DataTypes.isInstanceOf(item, barmatz.forms.ui.MenuItemModel);
	return barmatz.forms.CollectionModel.prototype.getItemIndex.call(this, item);
};
barmatz.forms.ui.MenuModel.prototype.setItemIndex = function(item, index)
{
	barmatz.utils.DataTypes.isInstanceOf(item, barmatz.forms.ui.MenuItemModel);
	barmatz.utils.DataTypes.isTypeOf(index, 'number');
	return barmatz.forms.CollectionModel.prototype.setItemIndex.call(this, item, index);
};
barmatz.forms.ui.MenuModel.prototype.toggle = function()
{
	this.isOpen() ? this.hide() : this.show();
};
barmatz.forms.ui.MenuModel.prototype.show = function()
{
	this.set('open', true);
};
barmatz.forms.ui.MenuModel.prototype.hide = function()
{
	this.set('open', false);
};
