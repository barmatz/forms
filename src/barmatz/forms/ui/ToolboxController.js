/** barmatz.forms.ui.ToolboxController **/
barmatz.forms.ui.ToolboxController = function(model, view)
{
	barmatz.utils.DataTypes.isInstanceOf(model, barmatz.forms.ui.ToolboxModel);
	barmatz.utils.DataTypes.isInstanceOf(view, window.HTMLElement);
	barmatz.forms.CollectionController.call(this, model, view);
};
barmatz.forms.ui.ToolboxController.prototype = new barmatz.forms.CollectionController(null, null);
barmatz.forms.ui.ToolboxController.prototype.constructor = barmatz.forms.ui.ToolboxController;
barmatz.forms.ui.ToolboxController.prototype._createItemViewFromModel = function(model)
{
	barmatz.utils.DataTypes.isInstanceOf(model, barmatz.forms.ui.ToolboxItemModel);
	return barmatz.forms.factories.DOMFactory.createToolboxItem(model.getLabel());
};