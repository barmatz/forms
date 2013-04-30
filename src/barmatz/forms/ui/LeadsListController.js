/** barmatz.forms.ui.LeadsListController **/
barmatz.forms.ui.LeadsListController = function(model, view)
{
	barmatz.utils.DataTypes.isInstanceOf(model, barmatz.forms.CollectionModel);
	barmatz.utils.DataTypes.isInstanceOf(view, window.HTMLElement);
	barmatz.forms.CollectionController.call(this, model, view);
};
barmatz.forms.ui.LeadsListController.prototype = new barmatz.forms.CollectionController(null, null);
barmatz.forms.ui.LeadsListController.prototype.constructor = barmatz.forms.ui.LeadsListController;
barmatz.forms.ui.LeadsListController.prototype._createItemViewFromModel = function(model)
{
	barmatz.utils.DataTypes.isInstanceOf(model, barmatz.forms.LeadModel);
	return barmatz.forms.factories.DOMFactory.createLeadsListItem(model, this._view.children.length);
};