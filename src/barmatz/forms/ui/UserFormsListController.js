/** barmatz.forms.ui.UserFormsListController **/
barmatz.forms.ui.UserFormsListController = function(formModel, userModel, view, dialogView, dialogContainerView)
{
	var loadingDialog;
	
	barmatz.utils.DataTypes.isInstanceOf(formModel, barmatz.forms.FormModel);
	barmatz.utils.DataTypes.isInstanceOf(userModel, barmatz.forms.users.UserModel);
	barmatz.utils.DataTypes.isInstanceOf(view, window.HTMLElement);
	barmatz.utils.DataTypes.isInstanceOf(dialogView, window.HTMLElement);
	barmatz.utils.DataTypes.isInstanceOf(dialogContainerView, window.HTMLElement, true);
	barmatz.forms.CollectionController.call(this, formModel, view);
	
	getForms();
	
	function createLoadingDialog()
	{
		loadingDialog = barmatz.forms.factories.DOMFactory.createLoadingDialog(dialogContainerView);
	}
	
	function getForms()
	{
		createLoadingDialog();
		addUserModelListeners();
		userModel.getForms();
	}
	
	function getFormsComplete()
	{
		barmatz.forms.factories.DOMFactory.destroyLoadingDialog(loadingDialog);
		removeUserModelListeners();
	}
	
	function setFormsViews(models)
	{
		barmatz.utils.DataTypes.isInstanceOf(models, window.Array);
		barmatz.utils.DOM.removeAllChildren(view);
		barmatz.utils.Array.forEach(models, function(item, index, collection)
		{
			var itemView = view.appendChild(barmatz.forms.factories.DOMFactory.createUserFormsListItem(index));
			item.addEventListener(barmatz.events.FormEvent.LOADING_FORM, onFormModelLoadingForm);
			barmatz.forms.factories.ControllerFactory.createUserFormsListItemController(item, itemView, itemView.children[0], itemView.children[1], itemView.children[2]);
		});
		jQuery(dialogView).dialog('close').dialog('open');
	}
	
	function addUserModelListeners()
	{
		userModel.addEventListener(barmatz.events.UserEvent.GET_FORMS_SUCCESS, onModelGetFormsSuccess);
		userModel.addEventListener(barmatz.events.UserEvent.GET_FORMS_FAIL, onModelGetFormsFail);
	}
	
	function removeUserModelListeners()
	{
		userModel.removeEventListener(barmatz.events.UserEvent.GET_FORMS_SUCCESS, onModelGetFormsSuccess);
		userModel.removeEventListener(barmatz.events.UserEvent.GET_FORMS_FAIL, onModelGetFormsFail);
	}
	
	function sortFromModels(model1, model2)
	{
		var date1, date2;
		date1 = model1.getCreated().getTime();
		date2 = model2.getCreated().getTime();
		return date1 < date2 ? 1 : date1 > date2 ? -1 : 0;
	}
	
	function addFormModelLoadingFormEvents(model)
	{
		barmatz.utils.DataTypes.isInstanceOf(model, barmatz.forms.FormModel);
		model.addEventListener(barmatz.events.FormEvent.LOADING_FORM_COMPLETE, onFormModelLoadingFormComplete);
		model.addEventListener(barmatz.events.FormEvent.LOADING_FORM_ERROR, onFormModelLoadingFormError);
	}
	
	function removeFormModelLoadingFormEvents(model)
	{
		barmatz.utils.DataTypes.isInstanceOf(model, barmatz.forms.FormModel);
		model.removeEventListener(barmatz.events.FormEvent.LOADING_FORM_COMPLETE, onFormModelLoadingFormComplete);
		model.removeEventListener(barmatz.events.FormEvent.LOADING_FORM_ERROR, onFormModelLoadingFormError);
	}
	
	function formModelStartLoading(model) 
	{
		barmatz.utils.DataTypes.isInstanceOf(model, barmatz.forms.FormModel);
		createLoadingDialog();
		addFormModelLoadingFormEvents(model);
	}
	
	function formModelStopLoading(model) 
	{
		barmatz.utils.DataTypes.isInstanceOf(model, barmatz.forms.FormModel);
		barmatz.forms.factories.DOMFactory.destroyLoadingDialog(loadingDialog);
		removeFormModelLoadingFormEvents(model);
	}
	
	function switchFormModel(model)
	{
		barmatz.utils.DataTypes.isInstanceOf(model, barmatz.forms.FormModel);
		
		if(formModel !== model)
			formModel.copy(model.getFingerprint(), model);
	}
	
	function onFormModelLoadingForm(event)
	{
		var target;
		
		barmatz.utils.DataTypes.isInstanceOf(event, barmatz.events.FormEvent);
		
		target = event.getTarget();
		target.removeEventListener(barmatz.events.FormEvent.LOADING_FORM, onFormModelLoadingForm);
		formModelStartLoading(target);
	}
	
	function onFormModelLoadingFormComplete(event) 
	{
		var target;
		
		barmatz.utils.DataTypes.isInstanceOf(event, barmatz.events.FormEvent);
		
		target = event.getTarget();
		formModelStopLoading(target);
		switchFormModel(target);
		barmatz.forms.factories.DOMFactory.destroyDialog(dialogView);
	}
	
	function onFormModelLoadingFormError(event) 
	{
		barmatz.utils.DataTypes.isInstanceOf(event, barmatz.events.FormEvent);
		formModelStopLoading(event.getTarget());
		barmatz.forms.factories.ControllerFactory.createJQueryDialogController(barmatz.forms.factories.DOMFactory.createAlertPromptDialog('Error', 'An error has occured. Please try again later.', true, dialogContainerView));
	}
	
	function onModelGetFormsSuccess(event)
	{
		barmatz.utils.DataTypes.isInstanceOf(event, barmatz.events.UserEvent);
		getFormsComplete();
		setFormsViews(event.getForms().sort(sortFromModels));
	}
	
	function onModelGetFormsFail(event)
	{
		barmatz.forms.factories.ControllerFactory.createJQueryDialogController(barmatz.forms.factories.DOMFactory.createAlertPromptDialog('Error', 'An error has occured. Please try again later.', true, dialogContainerView));
		getFormsComplete();
	}
};
barmatz.forms.ui.UserFormsListController.prototype = new barmatz.forms.CollectionController(null, null);
barmatz.forms.ui.UserFormsListController.prototype.constructor = barmatz.forms.ui.UserFormsListController;
barmatz.forms.ui.UserFormsListController.prototype._createItemViewFromModel  = function(model){};