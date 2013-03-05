/** barmatz.forms.ui.ToolboxController **/
window.barmatz.forms.ui.ToolboxController = function(model, view)
{
	barmatz.forms.CollectionController.call(this, model, view);
};

barmatz.forms.ui.ToolboxController.prototype = new barmatz.forms.CollectionController(null, null);
barmatz.forms.ui.ToolboxController.prototype.constructor = barmatz.forms.ui.ToolboxController;

Object.defineProperties(barmatz.forms.ui.ToolboxController.prototype,
{
	_createItemViewFromModel: {value: function(model)
	{
		barmatz.utils.DataTypes.isNotUndefined(model);
		barmatz.utils.DataTypes.isInstanceOf(model, barmatz.forms.ui.ToolboxItemModel);
		return barmatz.forms.factories.DOMFactory.createToolboxItem(model.label);
	}}
});