/** barmatz.forms.ui.MenuModel **/
window.barmatz.forms.ui.MenuModel = function()
{
	barmatz.forms.CollectionModel.call(this);
};

barmatz.forms.ui.MenuModel.prototype = new barmatz.forms.CollectionModel();
barmatz.forms.ui.MenuModel.prototype.constructor = barmatz.forms.ui.MenuModel;

Object.defineProperties(barmatz.forms.ui.MenuModel.prototype,
{
	addItem: {value: function(model)
	{
		barmatz.utils.DataTypes.isNotUndefined(model);
		barmatz.utils.DataTypes.isInstanceOf(model, barmatz.forms.ui.MenuItemModel);
		barmatz.forms.CollectionModel.prototype.addItem.call(this, model);
	}}
});