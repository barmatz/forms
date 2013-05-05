/** barmatz.forms.ui.BuilderMenuController **/
barmatz.forms.ui.BuilderMenuController = function(formModel, userModel, newButtonView, saveButtonView, saveAsButtonView, loadButtonView, renameButtonView, exportButtonView, deleteButtonView, propertiesButtonView, logoutButtonView, dialogContainerView)
{
	var dialogWrapper, loadingDialog, formRenameField;
	
	barmatz.utils.DataTypes.isInstanceOf(formModel, barmatz.forms.FormModel);
	barmatz.utils.DataTypes.isInstanceOf(userModel, barmatz.forms.users.UserModel);
	barmatz.utils.DataTypes.isInstanceOf(newButtonView, window.HTMLElement);
	barmatz.utils.DataTypes.isInstanceOf(saveButtonView, window.HTMLElement);
	barmatz.utils.DataTypes.isInstanceOf(saveAsButtonView, window.HTMLElement);
	barmatz.utils.DataTypes.isInstanceOf(loadButtonView, window.HTMLElement);
	barmatz.utils.DataTypes.isInstanceOf(renameButtonView, window.HTMLElement);
	barmatz.utils.DataTypes.isInstanceOf(exportButtonView, window.HTMLElement);
	barmatz.utils.DataTypes.isInstanceOf(deleteButtonView, window.HTMLElement);
	barmatz.utils.DataTypes.isInstanceOf(propertiesButtonView, window.HTMLElement);
	barmatz.utils.DataTypes.isInstanceOf(logoutButtonView, window.HTMLElement);
	barmatz.utils.DataTypes.isInstanceOf(dialogContainerView, window.HTMLElement, true);
	barmatz.mvc.Controller.call(this);
	
	newButtonView.addEventListener('click', onMenuNewClick);
	saveButtonView.addEventListener('click', onMenuSaveClick);
	saveAsButtonView.addEventListener('click', onMenuSaveAsClick);
	loadButtonView.addEventListener('click', onMenuLoadClick);
	renameButtonView.addEventListener('click', onMenuRenameClick);
	exportButtonView.addEventListener('click', onMenuExportClick);
	deleteButtonView.addEventListener('click', onMenuDeleteClick);
	propertiesButtonView.addEventListener('click', onMenuPropertiesClick);
	logoutButtonView.addEventListener('click', onMenuLogoutClick);
	
	function createRenamePrompt(title, label, value, confirmHandler)
	{
		dialogWrapper = barmatz.forms.factories.DOMFactory.createChangePropertyPromptDialogWrapper(title, label, value, confirmHandler, true, dialogContainerView);
		formRenameField = dialogWrapper.field;
		barmatz.forms.factories.ControllerFactory.createJQueryDialogController(dialogWrapper.dialog);
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
	
	function addFromModelDeleteEventListeners()
	{
		formModel.addEventListener(barmatz.events.FormEvent.DELETING, onFormModelDeleting);
		formModel.addEventListener(barmatz.events.FormEvent.DELETED, onFormModelDeleted);
		formModel.addEventListener(barmatz.events.FormEvent.DELETION_FAIL, onFormModelDeletionFail);
	}
	
	function removeFromModelDeleteEventListeners()
	{
		formModel.removeEventListener(barmatz.events.FormEvent.DELETING, onFormModelDeleting);
		formModel.removeEventListener(barmatz.events.FormEvent.DELETED, onFormModelDeleted);
		formModel.removeEventListener(barmatz.events.FormEvent.DELETION_FAIL, onFormModelDeletionFail);
	}
	
	function removeLoadingViewWithMessage(title, message)
	{
		barmatz.utils.DataTypes.isTypeOf(title, 'string');
		barmatz.utils.DataTypes.isTypeOf(message, 'string');
		removeLoadingView();
		barmatz.forms.factories.ControllerFactory.createJQueryDialogController(barmatz.forms.factories.DOMFactory.createAlertPromptDialog(title, message, true, dialogContainerView));
	}
	
	function onMenuNewClick(event)
	{
		createRenamePrompt('New form', 'Name', formModel.getName(), onResetFromConfirm);
	}
	
	function onMenuSaveClick(event)
	{
		formModel.save(userModel);
	}
	
	function onMenuSaveAsClick(event)
	{
		createRenamePrompt('Save as', 'Form name', formModel.getName(), onSaveFromAsConfirm);
	}
	
	function onMenuLoadClick(event)
	{
		var dialog = barmatz.forms.factories.DOMFactory.createUserFormsListDialog(true, dialogContainerView);
		barmatz.forms.factories.ControllerFactory.createJQueryDialogController(dialog);
		barmatz.forms.factories.ControllerFactory.createUserFormsListController(formModel, userModel, dialog.getElementsByTagName('tbody')[0], dialog);
	}
	
	function onMenuRenameClick(event)
	{
		createRenamePrompt('Rename form', 'Name', formModel.getName(), onRenameFromConfirm);
	}
	
	function onMenuExportClick(event)
	{
		var dialog, fingerprint;
		
		fingerprint = formModel.getFingerprint();
		
		if(barmatz.utils.DataTypes.applySilent('isValid', fingerprint))
			dialog = barmatz.forms.factories.DOMFactory.createExportPromptDialog(fingerprint, 'Loading...', true, dialogContainerView);
		else
			dialog = barmatz.forms.factories.DOMFactory.createAlertPromptDialog('Failed to export', 'You must save the form before exporting!', true, dialogContainerView);
		
		barmatz.forms.factories.ControllerFactory.createJQueryDialogController(dialog);
	}
	
	function onMenuDeleteClick(event)
	{
		barmatz.forms.factories.ControllerFactory.createJQueryDialogController(barmatz.forms.factories.DOMFactory.createConfirmPromptDialog('Are you sure you want to delete this form?', onDeleteFormConfirm, true, dialogContainerView));
	}
	
	function onMenuPropertiesClick(event)
	{
		var wrapper = barmatz.forms.factories.DOMFactory.createFormPropertiesDialogWrapper(formModel, onChangeFormPropertiesConfirm, true, dialogContainerView);
		
		barmatz.forms.factories.ControllerFactory.createJQueryDialogController(wrapper.dialog);
		
		function onChangeFormPropertiesConfirm(event)
		{
			formModel.setName(wrapper.nameField.value);
			formModel.setMethod(wrapper.methodField.value);
			formModel.setEncoding(wrapper.encodingField.value);
			formModel.setSubmitButtonLabel(wrapper.submitButtonLabelField.value);
			formModel.setDirection(wrapper.directionField.value);
			formModel.setStylesheets(wrapper.stylesheetsField.value.replace(/\s+/, ' ').split(' '));
			formModel.setTargetEmail(wrapper.targetEmailField.value);
			formModel.setLayoutId(parseInt(wrapper.layoutIdField.value));
			formModel.setLanguage(wrapper.languageField.value);
			formModel.setExternalAPI(wrapper.externalAPIField.value);
		}
	}
	
	function onMenuLogoutClick(event)
	{
		barmatz.forms.factories.ControllerFactory.createJQueryDialogController(
			barmatz.forms.factories.DOMFactory.createPromptDialog('Logout', 'Are you sure you want to logout?', onLogoutConfrim, true)
		);
	}
	
	function onDeleteFormConfirm(event)
	{
		addFromModelDeleteEventListeners();
		formModel.deleteForm();
		formModel.reset();
		formModel.setName('Unnamed form');
	}
	
	function onSaveFromAsConfirm(event)
	{
		formModel.saveAs(userModel, formRenameField.value);
	}
	
	function onRenameFromConfirm(event)
	{
		formModel.setName(formRenameField.value);
	}
	
	function onResetFromConfirm(event)
	{
		formModel.reset();
		formModel.setName(formRenameField.value);
	}
	
	function onLogoutConfrim(event)
	{
		userModel.addEventListener(barmatz.events.UserEvent.LOGOUT_SUCCESS, onUserModelLogoutSuccess);
		userModel.addEventListener(barmatz.events.UserEvent.LOGOUT_FAIL, onUserModelLogoutFail);
		userModel.logout();
	}
	
	function onUserModelLogoutSuccess(event)
	{
		userModel.removeEventListener(barmatz.events.UserEvent.LOGOUT_SUCCESS, onUserModelLogoutSuccess);
		userModel.removeEventListener(barmatz.events.UserEvent.LOGOUT_FAIL, onUserModelLogoutFail);
		barmatz.forms.factories.ControllerFactory.createJQueryDialogController(
			barmatz.forms.factories.DOMFactory.createAlertPromptDialog('Logout', 'You have successfully logged out', true)
		);
		location.href = barmatz.forms.Config.BASE_URL + '/login.php';
	}
	
	function onUserModelLogoutFail(event)
	{
		barmatz.forms.factories.ControllerFactory.createJQueryDialogController(
			barmatz.forms.factories.DOMFactory.createAlertPromptDialog('Logout', 'An error has occurred, please try again', true)
		);
	}
	
	function onFormModelDeleting(event) 
	{
		addLoadingView();
	}
	
	function onFormModelDeleted(event) 
	{
		removeLoadingViewWithMessage('Success', 'Form deleted.');
		removeFromModelDeleteEventListeners();
		formModel.reset();
	}
	
	function onFormModelDeletionFail(event) 
	{
		removeLoadingViewWithMessage('Error', 'Error deleting form. Try again.');
		removeFromModelDeleteEventListeners();
	}
};
barmatz.forms.ui.BuilderMenuController.prototype = new barmatz.mvc.Controller();
barmatz.forms.ui.BuilderMenuController.prototype.constructor = barmatz.forms.ui.BuilderMenuController;