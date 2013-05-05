/** barmatz.forms.ui.BuilderWorkspaceController **/
barmatz.forms.ui.BuilderWorkspaceController = function(builderPageModel, formModel, formNameView, formSaveStatusView, itemsView, dialogContainerView)
{
	var loadingDialog;
	
	barmatz.utils.DataTypes.isInstanceOf(builderPageModel, barmatz.forms.ui.BuilderPageModel);
	barmatz.utils.DataTypes.isInstanceOf(formModel, barmatz.forms.FormModel);
	barmatz.utils.DataTypes.isInstanceOf(itemsView, window.HTMLElement);
	barmatz.utils.DataTypes.isInstanceOf(formNameView, window.HTMLElement);
	barmatz.utils.DataTypes.isInstanceOf(dialogContainerView, window.HTMLElement, true);
	barmatz.forms.ui.WorkspaceController.call(this, formModel, itemsView, dialogContainerView);
	
	formModel.addEventListener(barmatz.events.ModelEvent.VALUE_CHANGED, onFormModelValueChanged);
	formModel.addEventListener(barmatz.events.CollectionEvent.ITEM_ADDED, onFormModelItemAdded);
	formModel.addEventListener(barmatz.events.FormEvent.SAVING, onFormModelSaving);
	formModel.addEventListener(barmatz.events.FormEvent.SAVED, onFormModelSaved);
	formModel.addEventListener(barmatz.events.FormEvent.ERROR_SAVING, onFormModelErrorSaving);
	updateFormName();
	
	function updateFormName()
	{
		formNameView.innerHTML = formModel.getName();
		updateDocumentTitle();
	}
	
	function updateDocumentTitle()
	{
		var title, separator, index;
		title = document.title;
		seperator = ' -';
		index = title.indexOf(seperator);
		document.title = (title.indexOf(seperator) > -1 ? title.substring(0, title.indexOf(seperator)) : title) + seperator + ' ' + formModel.getName(); 
	}
	
	function addLoadingView()
	{
		if(!loadingDialog)
			loadingDialog = barmatz.forms.factories.DOMFactory.createLoadingDialog();
	}
	
	function removeLoadingView()
	{
		if(loadingDialog)
		{
			barmatz.forms.factories.DOMFactory.destroyLoadingDialog(loadingDialog);
			loadingDialog = null;
		}
	}
	
	function onFormModelValueChanged(event)
	{
		barmatz.utils.DataTypes.isInstanceOf(event, barmatz.events.ModelEvent);
		barmatz.forms.factories.DOMFactory.clearElement(formSaveStatusView);
		
		switch(event.getKey())
		{
			case 'name':
				updateFormName();
				break;
		}
	}
	
	function onFormModelItemAdded(event)
	{
		barmatz.utils.DataTypes.isInstanceOf(event, barmatz.events.CollectionEvent);
		itemsView.children[event.getIndex()].addEventListener('click', onWorkspaceViewItemClick);
	}
	
	function onWorkspaceViewItemClick(event)
	{
		barmatz.utils.DataTypes.isInstanceOf(event, MouseEvent);
		builderPageModel.setSelectedFormItem(formModel.getItemAt(barmatz.utils.Array.toArray(itemsView.children).indexOf(event.currentTarget)));
	}
	
	function onFormModelSaving(event)
	{
		addLoadingView();
		formSaveStatusView.innerHTML = 'saving...';
	}
	
	function onFormModelSaved(event)
	{
		removeLoadingViewWithMessage('Success', 'Form saved successfully');
		formSaveStatusView.innerHTML = 'last saved at ' + barmatz.utils.Date.toString(new Date(), 'hh:ii dd/mm/yy');
	}
	
	function onFormModelErrorSaving(event)
	{
		removeLoadingViewWithMessage('Error', 'Error saving form');
		formSaveStatusView.innerHTML = 'error saving!';
	}
};
barmatz.forms.ui.BuilderWorkspaceController.prototype = new barmatz.forms.ui.WorkspaceController(null, null);
barmatz.forms.ui.BuilderWorkspaceController.prototype.constructor = barmatz.forms.ui.BuilderWorkspaceController;