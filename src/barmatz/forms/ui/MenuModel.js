/** barmatz.forms.ui.MenuModel **/
window.barmatz.forms.ui.MenuModel = function()
{
	barmatz.forms.CollectionModel.call(this);
	this.set('open', false);
};

barmatz.forms.ui.MenuModel.prototype = new barmatz.forms.CollectionModel();
barmatz.forms.ui.MenuModel.prototype.constructor = barmatz.forms.ui.MenuModel;

Object.defineProperties(barmatz.forms.ui.MenuModel.prototype,
{
	open: {get: function()
	{
		return this.get('open');
	}},
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
		return barmatz.forms.CollectionModel.prototype.getItemIndex.call(this, item);
	}},
	setItemIndex: {value: function(item, index)
	{
		barmatz.utils.DataTypes.isNotUndefined(item);
		barmatz.utils.DataTypes.isNotUndefined(index);
		barmatz.utils.DataTypes.isInstanceOf(item, barmatz.forms.ui.MenuItemModel);
		barmatz.utils.DataTypes.isTypeOf(index, 'number');
		return barmatz.forms.CollectionModel.prototype.setItemIndex.call(this, item, index);
	}},
	toggle: {value: function()
	{
		this.open ? this.hide() : this.show();
	}},
	show: {value: function()
	{
		this.set('open', true);
	}},
	hide: {value: function()
	{
		this.set('open', false);
	}}
});