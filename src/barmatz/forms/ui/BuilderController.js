/** barmatz.forms.ui.BuilderController **/
barmatz.forms.ui.BuilderController = function(formModel, userModel, containerView, panelsView, formNameView, saveStatusView, menuModel, menuView, toolboxModel, toolboxView, workspaceView, propertiesController, dialogContainerView)
{
	var dialogWrapper, loadingDialog;
	
	barmatz.utils.DataTypes.isInstanceOf(formModel, barmatz.forms.FormModel);
	barmatz.utils.DataTypes.isInstanceOf(userModel, barmatz.forms.users.UserModel);
	barmatz.utils.DataTypes.isInstanceOf(containerView, window.HTMLElement);
	barmatz.utils.DataTypes.isInstanceOf(panelsView, window.HTMLElement);
	barmatz.utils.DataTypes.isInstanceOf(formNameView, window.HTMLElement);
	barmatz.utils.DataTypes.isInstanceOf(saveStatusView, window.HTMLElement);
	barmatz.utils.DataTypes.isInstanceOf(menuModel, barmatz.forms.ui.MenuModel);
	barmatz.utils.DataTypes.isInstanceOf(menuView, window.HTMLElement);
	barmatz.utils.DataTypes.isInstanceOf(toolboxModel, barmatz.forms.ui.ToolboxModel);
	barmatz.utils.DataTypes.isInstanceOf(toolboxView, window.HTMLElement);
	barmatz.utils.DataTypes.isInstanceOf(workspaceView, window.HTMLElement);
	barmatz.utils.DataTypes.isInstanceOf(propertiesController, barmatz.forms.ui.PropertiesController);
	barmatz.utils.DataTypes.isInstanceOf(dialogContainerView, window.HTMLElement, true);
	barmatz.mvc.Controller.call(this);
	
	initForm();
	initMenu();
	initPanels();
	initToolbox();
	
	function initForm()
	{
		formModel.addEventListener(barmatz.events.ModelEvent.VALUE_CHANGED, onFormModelValueChanged);
		formModel.addEventListener(barmatz.events.CollectionEvent.ITEM_ADDED, onFormModelItemAdded);
		formModel.addEventListener(barmatz.events.CollectionEvent.ITEM_REMOVED, onFormModelItemRemoved);
		formModel.addEventListener(barmatz.events.FormEvent.SAVING, onFormModelSaving);
		formModel.addEventListener(barmatz.events.FormEvent.SAVED, onFormModelSaved);
		formModel.addEventListener(barmatz.events.FormEvent.ERROR_SAVING, onFormModelErrorSaving);
		updateFormName();
	}
	
	function initMenu()
	{
		addMenuItem('New', onMenuNewClick);
		addMenuItem('Save', onMenuSaveClick);
		addMenuItem('Save as', onMenuSaveAsClick);
		addMenuItem('Load', onMenuLoadClick);
		addMenuItem('Rename', onMenuRenameClick);
		addMenuItem('Export', onMenuExportClick);
		addMenuItem('Delete', onMenuDeleteClick);
		addMenuItem('Properties', onMenuPropertiesClick);
		addMenuItem('Logout', onMenuLogoutClick);
		containerView.appendChild(menuView);
	}
	
	function initPanels()
	{
		containerView.appendChild(panelsView);
	}
	
	function initToolbox()
	{
		addToolboxItem(barmatz.forms.fields.FieldTypes.HTML_CONTENT, 'HTML content');
		addToolboxItem(barmatz.forms.fields.FieldTypes.TEXT_FIELD, 'Text field');
		addToolboxItem(barmatz.forms.fields.FieldTypes.TEXT_AREA, 'Text area');
		addToolboxItem(barmatz.forms.fields.FieldTypes.PASSWORD, 'Password field');
		addToolboxItem(barmatz.forms.fields.FieldTypes.CHECKBOX, 'Checkbox field');
		//addToolboxItem(barmatz.forms.fields.FieldTypes.RADIO, 'Radio field');
		addToolboxItem(barmatz.forms.fields.FieldTypes.DROPBOX, 'Dropbox field');
		addToolboxItem(barmatz.forms.fields.FieldTypes.PHONE, 'Phone field');
	}
	
	function addMenuItem(label, clickHandler)
	{
		barmatz.utils.DataTypes.isTypeOf(label, 'string');
		barmatz.utils.DataTypes.isTypeOf(clickHandler, 'function');
		menuModel.addItem(barmatz.forms.factories.ModelFactory.createMenuItemModel(label, clickHandler));
	}
	
	function addToolboxItem(type, label)
	{
		barmatz.utils.DataTypes.isTypeOf(type, 'string');
		barmatz.utils.DataTypes.isTypeOf(label, 'string');
		toolboxModel.addItem(barmatz.forms.factories.ModelFactory.createToolboxItemModel(type, label, barmatz.forms.factories.ModelFactory.createFieldModel(type, '')));
		toolboxView.children[toolboxModel.getNumItems() - 1].addEventListener('click', onToolboxItemViewClick);
	}
	
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
	
	function removeLoadingViewWithMessage(title, message)
	{
		barmatz.utils.DataTypes.isTypeOf(title, 'string');
		barmatz.utils.DataTypes.isTypeOf(message, 'string');
		removeLoadingView();
		barmatz.forms.factories.ControllerFactory.createJQueryDialogController(barmatz.forms.factories.DOMFactory.createAlertPromptDialog(title, message, true, dialogContainerView));
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
	
	function createRenamePrompt(title, label, value, confirmHandler)
	{
		dialogWrapper = barmatz.forms.factories.DOMFactory.createChangePropertyPromptDialogWrapper(title, label, value, confirmHandler, true);
		formRenameField = dialogWrapper.field;
		barmatz.forms.factories.ControllerFactory.createJQueryDialogController(dialogWrapper.dialog);
	}
	
	function onFormModelValueChanged(event)
	{
		barmatz.utils.DataTypes.isInstanceOf(event, barmatz.events.ModelEvent);
		
		switch(event.getKey())
		{
			case 'name':
				updateFormName();
				break;
			case 'fingerprint':
				saveStatusView.innerHTML = '';
				break;
		}
	}
	
	function onFormModelItemAdded(event)
	{
		var view;
		
		barmatz.utils.DataTypes.isInstanceOf(event, barmatz.events.CollectionEvent);
		
		propertiesController.setModel(event.getItem());
		view = workspaceView.children[event.getIndex()];
		
		if(view)
			view.addEventListener('click', onWorkspaceViewItemClick);
	}
	
	function onFormModelItemRemoved(event)
	{
		barmatz.utils.DataTypes.isInstanceOf(event, barmatz.events.CollectionEvent);
		propertiesController.setModel(formModel.getNumItems() > 0 ? formModel.getItemAt(event.getIndex() - 1) : null);
	}
	
	function onFormModelSaving(event)
	{
		addLoadingView();
		saveStatusView.innerHTML = 'saving...';
	}
	
	function onFormModelSaved(event)
	{
		removeLoadingViewWithMessage('Success', 'Form saved successfully');
		saveStatusView.innerHTML = 'last saved at ' + barmatz.utils.Date.toString(new Date(), 'hh:ii dd/mm/yy');
	}
	
	function onFormModelErrorSaving(event)
	{
		removeLoadingViewWithMessage('Error', 'Error saving form');
		saveStatusView.innerHTML = 'error saving!';
	}
	
	function onToolboxItemViewClick(event)
	{
		barmatz.utils.DataTypes.isInstanceOf(event, MouseEvent);
		formModel.addItem(toolboxModel.getItemAt(barmatz.utils.Array.toArray(toolboxView.children).indexOf(event.target)).getFieldModel().clone());
	}
	
	function onWorkspaceViewItemClick(event)
	{
		barmatz.utils.DataTypes.isInstanceOf(event, MouseEvent);
		propertiesController.setModel(formModel.getItemAt(barmatz.utils.Array.toArray(workspaceView.children).indexOf(event.currentTarget)));
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
		var dialog = barmatz.forms.factories.DOMFactory.createUserFormsListDialog();
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
			dialog = barmatz.forms.factories.DOMFactory.createExportPromptDialog(fingerprint, 'Loading...', true);
		else
			dialog = barmatz.forms.factories.DOMFactory.createAlertPromptDialog('Failed to export', 'You must save the form before exporting!', true);
		
		barmatz.forms.factories.ControllerFactory.createJQueryDialogController(dialog);
	}
	
	function onMenuDeleteClick(event)
	{
		barmatz.forms.factories.ControllerFactory.createJQueryDialogController(barmatz.forms.factories.DOMFactory.createConfirmPromptDialog('Are you sure you want to delete this form?', onDeleteFormConfirm, true));
	}
	
	function onMenuPropertiesClick(event)
	{
		var wrapper = barmatz.forms.factories.DOMFactory.createFormPropertiesDialogWrapper(formModel, onChangeFormPropertiesConfirm, true);
		
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
};
barmatz.forms.ui.BuilderController.prototype = new barmatz.mvc.Controller();
barmatz.forms.ui.BuilderController.prototype.constructor = barmatz.forms.ui.BuilderController;