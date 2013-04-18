/** barmatz.forms.ui.LeadsListController **/
window.barmatz.forms.ui.LeadsListController = function(model, view)
{
	barmatz.utils.DataTypes.isNotUndefined(model);
	barmatz.utils.DataTypes.isNotUndefined(view);
	barmatz.utils.DataTypes.isInstanceOf(model, barmatz.forms.CollectionModel);
	barmatz.utils.DataTypes.isInstanceOf(view, HTMLElement);
	barmatz.forms.CollectionController.call(this, model, view);
};

barmatz.forms.ui.LeadsListController.prototype = new barmatz.forms.CollectionController();
barmatz.forms.ui.LeadsListController.prototype.constructor = barmatz.forms.ui.LeadsListController;

Object.defineProperties(barmatz.forms.ui.LeadsListController.prototype,
{
	_createItemViewFromModel: {value: function(model)
	{
		barmatz.utils.DataTypes.isNotUndefined(model);
		barmatz.utils.DataTypes.isInstanceOf(model, barmatz.forms.LeadModel);
		return barmatz.forms.factories.DOMFactory.createLeadsListItem(model, this._view.childNodes.length);
	}}
});