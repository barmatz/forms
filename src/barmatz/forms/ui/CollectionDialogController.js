/** barmatz.forms.ui.CollectionDialogController **/
window.barmatz.forms.ui.CollectionDialogController = function(model, view)
{
	barmatz.utils.DataTypes.isNotUndefined(model);
	barmatz.utils.DataTypes.isNotUndefined(view);
	barmatz.utils.DataTypes.isInstanceOf(model, barmatz.forms.CollectionModel);
	barmatz.utils.DataTypes.isInstanceOf(view, HTMLTableElement);
	barmatz.forms.CollectionController.call(this, model, view);
};

barmatz.forms.ui.CollectionDialogController.prototype = new barmatz.forms.CollectionController();
barmatz.forms.ui.CollectionDialogController.prototype.constructor = barmatz.forms.ui.CollectionDialogController;

Object.defineProperties(barmatz.forms.ui.CollectionDialogController.prototype,
{
	_createItemViewFromModel: {value: function(model)
	{
		barmatz.utils.DataTypes.isNotUndefined(model);
		barmatz.utils.DataTypes.isInstanceOf(model, barmatz.mvc.Model);
		return barmatz.forms.factories.DOMFactory.createTableRow(model);
	}}	
});