/** barmatz.forms.ui.LeadsFormsListController **/
window.barmatz.forms.ui.LeadsFormsListController = function(model, view)
{
	barmatz.utils.DataTypes.isNotUndefined(model);
	barmatz.utils.DataTypes.isNotUndefined(view);
	barmatz.utils.DataTypes.isInstanceOf(model, barmatz.forms.CollectionModel);
	barmatz.utils.DataTypes.isInstanceOf(view, HTMLElement);
	barmatz.forms.CollectionController.call(this, model, view);
};

barmatz.forms.ui.LeadsFormsListController.prototype = new barmatz.forms.CollectionController();
barmatz.forms.ui.LeadsFormsListController.prototype.constructor = barmatz.forms.ui.LeadsFormsListController;

Object.defineProperties(barmatz.forms.ui.LeadsFormsListController.prototype,
{
	_createItemViewFromModel: {value: function(model)
	{
		barmatz.utils.DataTypes.isNotUndefined(model);
		barmatz.utils.DataTypes.isInstanceOf(model, barmatz.forms.FormModel);
		return barmatz.forms.factories.DOMFactory.createLeadsFormsListItem(model);
	}}
});