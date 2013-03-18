/** barmatz.forms.ui.UserFormsListController **/
window.barmatz.forms.ui.UserFormsListController = function(formModel, userModel, view, dialogView)
{
	var loadingDialog;
	
	barmatz.utils.DataTypes.isNotUndefined(formModel);
	barmatz.utils.DataTypes.isNotUndefined(userModel);
	barmatz.utils.DataTypes.isNotUndefined(view);
	barmatz.utils.DataTypes.isNotUndefined(dialogView);
	barmatz.utils.DataTypes.isInstanceOf(formModel, barmatz.forms.FormModel);
	barmatz.utils.DataTypes.isInstanceOf(userModel, barmatz.forms.users.UserModel);
	barmatz.utils.DataTypes.isInstanceOf(view, HTMLElement);
	barmatz.utils.DataTypes.isInstanceOf(dialogView, HTMLElement);
	barmatz.forms.CollectionController.call(this);
	
	getForms();
	
	function getForms()
	{
		loadingDialog = barmatz.forms.factories.DOMFactory.createLoadingDialog();
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
		var modelitemView, i;
		
		barmatz.utils.DataTypes.isNotUndefined(models);
		barmatz.utils.DataTypes.isInstanceOf(models, Array);
		barmatz.utils.DOM.removeAllChildren(view);
		
		for(i = 0; i < models.length; i++)
		{
			model = models[i];
			model.addEventListener(barmatz.events.FormModelEvent.LOADING_FORM, onFormModelLoadingForm);
			itemView = view.appendChild(barmatz.forms.factories.DOMFactory.createUserFormsListItem(i));
			barmatz.forms.factories.ControllerFactory.createUserFormsListItemController(model, itemView, itemView.childNodes[0], itemView.childNodes[1], itemView.childNodes[2]);
		}
		
		jQuery(dialogView).dialog('close').dialog('open');
	}
	
	function addUserModelListeners()
	{
		userModel.addEventListener(barmatz.events.UserModelEvent.GET_FORMS_SUCCESS, onModelGetFormsSuccess);
		userModel.addEventListener(barmatz.events.UserModelEvent.GET_FORMS_FAIL, onModelGetFormsFail);
	}
	
	function removeUserModelListeners()
	{
		userModel.removeEventListener(barmatz.events.UserModelEvent.GET_FORMS_SUCCESS, onModelGetFormsSuccess);
		userModel.removeEventListener(barmatz.events.UserModelEvent.GET_FORMS_FAIL, onModelGetFormsFail);
	}
	
	function sortFromModels(model1, model2)
	{
		var date1 = model1.created.getTime(), date2 = model2.created.getTime();
		return date1 < date2 ? 1 : date1 > date2 ? -1 : 0;
	}
	
	function addFormModelLoadingFormEvents(model)
	{
		barmatz.utils.DataTypes.isNotUndefined(model);
		barmatz.utils.DataTypes.isInstanceOf(model, barmatz.forms.FormModel);
		model.addEventListener(barmatz.events.FormModelEvent.LOADING_FORM_COMPLETE, onFormModelLoadingFormComplete);
		model.addEventListener(barmatz.events.FormModelEvent.LOADING_FORM_ERROR, onFormModelLoadingFormError);
	}
	
	function removeFormModelLoadingFormEvents(model)
	{
		barmatz.utils.DataTypes.isNotUndefined(model);
		barmatz.utils.DataTypes.isInstanceOf(model, barmatz.forms.FormModel);
		model.removeEventListener(barmatz.events.FormModelEvent.LOADING_FORM_COMPLETE, onFormModelLoadingFormComplete);
		model.removeEventListener(barmatz.events.FormModelEvent.LOADING_FORM_ERROR, onFormModelLoadingFormError);
	}
	
	function formModelStartLoading(model) 
	{
		barmatz.utils.DataTypes.isNotUndefined(model);
		barmatz.utils.DataTypes.isInstanceOf(model, barmatz.forms.FormModel);
		loadingDialog = barmatz.forms.factories.DOMFactory.createLoadingDialog();
		addFormModelLoadingFormEvents(model);
	}
	
	function formModelStopLoading(model) 
	{
		barmatz.utils.DataTypes.isNotUndefined(model);
		barmatz.utils.DataTypes.isInstanceOf(model, barmatz.forms.FormModel);
		barmatz.forms.factories.DOMFactory.destroyLoadingDialog(loadingDialog);
		removeFormModelLoadingFormEvents(model);
	}
	
	function switchFormModel(model)
	{
		barmatz.utils.DataTypes.isNotUndefined(model);
		barmatz.utils.DataTypes.isInstanceOf(model, barmatz.forms.FormModel);
		formModel.id = model.id;
		formModel.name = model.name;
		formModel.created = model.created;
		formModel.fingerprint = model.fingerprint;
		
		while(formModel.numItems > 0)
			formModel.removeItemAt(formModel.numItems - 1);
		
		while(formModel.numItems < model.numItems)
			formModel.addItem(model.getItemAt(formModel.numItems));
	}
	
	function onFormModelLoadingForm(event)
	{
		barmatz.utils.DataTypes.isNotUndefined(event);
		barmatz.utils.DataTypes.isInstanceOf(event, barmatz.events.FormModelEvent);
		event.target.removeEventListener(barmatz.events.FormModelEvent.LOADING_FORM, onFormModelLoadingForm);
		formModelStartLoading(event.target);
	}
	
	function onFormModelLoadingFormComplete(event) 
	{
		barmatz.utils.DataTypes.isNotUndefined(event);
		barmatz.utils.DataTypes.isInstanceOf(event, barmatz.events.FormModelEvent);
		formModelStopLoading(event.target);
		switchFormModel(event.target);
		barmatz.forms.factories.DOMFactory.destroyDialog(dialogView);
	}
	
	function onFormModelLoadingFormError(event) 
	{
		barmatz.utils.DataTypes.isNotUndefined(event);
		barmatz.utils.DataTypes.isInstanceOf(event, barmatz.events.FormModelEvent);
		formModelStopLoading(event.target);
		barmatz.forms.factories.DOMFactory.createAlertPromptDialog('Error', 'An error has occured. Please try again later.', true);
	}
	
	function onModelGetFormsSuccess(event)
	{
		barmatz.utils.DataTypes.isNotUndefined(event);
		barmatz.utils.DataTypes.isInstanceOf(event, barmatz.events.UserModelEvent);
		getFormsComplete();
		setFormsViews(event.forms.sort(sortFromModels));
	}
	
	function onModelGetFormsFail(event)
	{
		barmatz.utils.DataTypes.isNotUndefined(event);
		barmatz.utils.DataTypes.isInstanceOf(event, barmatz.events.UserModelEvent);
		barmatz.forms.factories.DOMFactory.createAlertPromptDialog('Error', 'An error has occured. Please try again later.', true);
		getFormsComplete();
	}
};

barmatz.forms.ui.UserFormsListController.prototype = new barmatz.forms.CollectionController();
barmatz.forms.ui.UserFormsListController.prototype.constructor = barmatz.forms.ui.UserFormsListController;