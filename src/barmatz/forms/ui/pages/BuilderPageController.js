/** barmatz.forms.ui.pages.BuilderPageController **/
barmatz.forms.ui.pages.BuilderPageController = function(builderPageModel, formModel)
{
	barmatz.utils.DataTypes.isInstanceOf(builderPageModel, barmatz.forms.ui.pages.BuilderPageModel);
	barmatz.utils.DataTypes.isInstanceOf(formModel, barmatz.forms.FormModel);
	barmatz.mvc.Controller.call(this);
	formModel.addEventListener(barmatz.events.CollectionEvent.ITEM_ADDED, onFormModelItemAdded);
	formModel.addEventListener(barmatz.events.CollectionEvent.ITEM_REMOVED, onFormModelItemRemoved);
	
	function onFormModelItemAdded(event)
	{
		barmatz.utils.DataTypes.isInstanceOf(event, barmatz.events.CollectionEvent);
		builderPageModel.setSelectedFormItem(event.getItem());
	}
	
	function onFormModelItemRemoved(event)
	{
		barmatz.utils.DataTypes.isInstanceOf(event, barmatz.events.CollectionEvent);
		builderPageModel.setSelectedFormItem(formModel.getNumItems() > 0 ? formModel.getItemAt(event.getIndex() - 1) : null);
	}
};
barmatz.forms.ui.pages.BuilderPageController.prototype = new barmatz.mvc.Controller();
barmatz.forms.ui.pages.BuilderPageController.prototype.constructor = barmatz.forms.ui.pages.BuilderPageController;