/** barmatz.forms.ui.CollectionDialogController **/
barmatz.forms.ui.CollectionDialogController = function(model, view)
{
	barmatz.utils.DataTypes.isInstanceOf(model, barmatz.forms.CollectionModel);
	barmatz.utils.DataTypes.isInstanceOf(view, HTMLTableElement);
	barmatz.forms.CollectionController.call(this, model, view);
};
barmatz.forms.ui.CollectionDialogController.prototype = new barmatz.forms.CollectionController(null, null);
barmatz.forms.ui.CollectionDialogController.prototype.constructor = barmatz.forms.ui.CollectionDialogController;
barmatz.forms.ui.CollectionDialogController.prototype._createItemViewFromModel = function(model)
{
	barmatz.utils.DataTypes.isInstanceOf(model, barmatz.forms.ContentModel);
	return barmatz.forms.factories.DOMFactory.createTableRow([model.getContent()]);
};