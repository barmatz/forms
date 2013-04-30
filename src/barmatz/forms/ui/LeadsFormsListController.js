/** barmatz.forms.ui.LeadsFormsListController **/
barmatz.forms.ui.LeadsFormsListController = function(model, view)
{
	barmatz.utils.DataTypes.isInstanceOf(model, barmatz.forms.CollectionModel);
	barmatz.utils.DataTypes.isInstanceOf(view, window.HTMLElement);
	barmatz.forms.CollectionController.call(this, model, view);
};
barmatz.forms.ui.LeadsFormsListController.prototype = new barmatz.forms.CollectionController(null, null);
barmatz.forms.ui.LeadsFormsListController.prototype.constructor = barmatz.forms.ui.LeadsFormsListController;
barmatz.forms.ui.LeadsFormsListController.prototype._createItemViewFromModel = function(model)
{
	barmatz.utils.DataTypes.isInstanceOf(model, barmatz.forms.FormModel);
	return barmatz.forms.factories.DOMFactory.createLeadsFormsListItem(model);
};