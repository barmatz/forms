/** barmatz.forms.ui.MenuController **/
window.barmatz.forms.ui.MenuController = function(model, view)
{
	barmatz.forms.CollectionController.call(this, model, view);
};

barmatz.forms.ui.MenuController.prototype = new barmatz.forms.CollectionController(null, null);
barmatz.forms.ui.MenuController.prototype.constructor = barmatz.forms.ui.MenuController;

Object.defineProperties(barmatz.forms.ui.MenuController.prototype,
{
	_createItemViewFromModel: {value: function(model)
	{
		barmatz.utils.DataTypes.isNotUndefined(model);
		barmatz.utils.DataTypes.isInstanceOf(model, barmatz.forms.ui.MenuItemModel);
		return barmatz.forms.factories.DOMFactory.createMenuItem(model.label, model.clickHandler);
	}}
});