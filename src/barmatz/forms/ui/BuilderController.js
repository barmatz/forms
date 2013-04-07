/** barmatz.forms.ui.BuilderController **/
window.barmatz.forms.ui.BuilderController = function(formModel, userModel, containerView, panelsView, formNameView, saveStatusView, menuModel, menuView, toolboxModel, toolboxView, workspaceView, propertiesController)
{
	var loadingDialog;
	
	barmatz.utils.DataTypes.isNotUndefined(formModel);
	barmatz.utils.DataTypes.isNotUndefined(userModel);
	barmatz.utils.DataTypes.isNotUndefined(containerView);
	barmatz.utils.DataTypes.isNotUndefined(panelsView);
	barmatz.utils.DataTypes.isNotUndefined(formNameView);
	barmatz.utils.DataTypes.isNotUndefined(saveStatusView);
	barmatz.utils.DataTypes.isNotUndefined(menuModel);
	barmatz.utils.DataTypes.isNotUndefined(menuView);
	barmatz.utils.DataTypes.isNotUndefined(toolboxModel);
	barmatz.utils.DataTypes.isNotUndefined(toolboxView);
	barmatz.utils.DataTypes.isNotUndefined(workspaceView);
	barmatz.utils.DataTypes.isNotUndefined(propertiesController);
	barmatz.utils.DataTypes.isInstanceOf(formModel, barmatz.forms.FormModel);
	barmatz.utils.DataTypes.isInstanceOf(userModel, barmatz.forms.users.UserModel);
	barmatz.utils.DataTypes.isInstanceOf(containerView, HTMLElement);
	barmatz.utils.DataTypes.isInstanceOf(panelsView, HTMLElement);
	barmatz.utils.DataTypes.isInstanceOf(formNameView, HTMLElement);
	barmatz.utils.DataTypes.isInstanceOf(saveStatusView, HTMLElement);
	barmatz.utils.DataTypes.isInstanceOf(menuModel, barmatz.forms.ui.MenuModel);
	barmatz.utils.DataTypes.isInstanceOf(menuView, HTMLElement);
	barmatz.utils.DataTypes.isInstanceOf(toolboxModel, barmatz.forms.ui.ToolboxModel);
	barmatz.utils.DataTypes.isInstanceOf(toolboxView, HTMLElement);
	barmatz.utils.DataTypes.isInstanceOf(workspaceView, HTMLElement);
	barmatz.utils.DataTypes.isInstanceOf(propertiesController, barmatz.forms.ui.PropertiesController);
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
		formModel.addEventListener(barmatz.events.FormModelEvent.SAVING, onFormModelSaving);
		formModel.addEventListener(barmatz.events.FormModelEvent.SAVED, onFormModelSaved);
		formModel.addEventListener(barmatz.events.FormModelEvent.ERROR_SAVING, onFormModelErrorSaving);
		updateFormName();
	}
	
	function initMenu()
	{
		menuModel.addEventListener(barmatz.events.CollectionEvent.ITEM_ADDED, onMenuModelItemAdded);
		menuModel.addEventListener(barmatz.events.CollectionEvent.ITEM_REMOVED, onMenuModelItemRemoved);
		addMenuItem('New', onMenuNewClick);
		addMenuItem('Save', onMenuSaveClick);
		addMenuItem('Save as', onMenuSaveAsClick);
		addMenuItem('Load', onMenuLoadClick);
		addMenuItem('Rename', onMenuRenameClick);
		addMenuItem('Export', onMenuExportClick);
		addMenuItem('Delete', onMenuDeleteClick);
		addMenuItem('Properties', onMenuPropertiesClick);
		containerView.appendChild(menuView);
	}
	
	function initPanels()
	{
		containerView.appendChild(panelsView);
	}
	
	function initToolbox()
	{
		toolboxModel.addEventListener(barmatz.events.CollectionEvent.ITEM_ADDED, onToolboxModelItemAdded);
		toolboxModel.addEventListener(barmatz.events.CollectionEvent.ITEM_REMOVED, onToolboxModelItemRemoved);
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
		barmatz.utils.DataTypes.isNotUndefined(label);
		barmatz.utils.DataTypes.isNotUndefined(clickHandler);
		barmatz.utils.DataTypes.isTypeOf(label, 'string');
		barmatz.utils.DataTypes.isTypeOf(clickHandler, 'function');
		menuModel.addItem(barmatz.forms.factories.ModelFactory.createMenuItemModel(label, clickHandler));
	}
	
	function addToolboxItem(type, label)
	{
		barmatz.utils.DataTypes.isNotUndefined(type);
		barmatz.utils.DataTypes.isNotUndefined(label);
		barmatz.utils.DataTypes.isTypeOf(type, 'string');
		barmatz.utils.DataTypes.isTypeOf(label, 'string');
		toolboxModel.addItem(barmatz.forms.factories.ModelFactory.createToolboxItemModel(type, label, barmatz.forms.factories.ModelFactory.createFieldModel(type, '')));
		toolboxView.childNodes[toolboxModel.numItems - 1].addEventListener('click', onToolboxItemViewClick);
	}
	
	function updateFormName()
	{
		formNameView.innerHTML = formModel.name;
		updateDocumentTitle();
	}
	
	function updateDocumentTitle()
	{
		var title, separator, index;
		title = document.title;
		seperator = ' -';
		index = title.indexOf(seperator);
		document.title = (title.indexOf(seperator) > -1 ? title.substring(0, title.indexOf(seperator)) : title) + seperator + ' ' + formModel.name; 
	}
	
	function addLoadingView()
	{
		loadingDialog = barmatz.forms.factories.DOMFactory.createLoadingDialog();
	}
	
	function removeLoadingView()
	{
		barmatz.forms.factories.DOMFactory.destroyLoadingDialog(loadingDialog);
		loadingDialog = null;
	}
	
	function removeLoadingViewWithMessage(title, message)
	{
		barmatz.utils.DataTypes.isNotUndefined(title);
		barmatz.utils.DataTypes.isNotUndefined(message);
		barmatz.utils.DataTypes.isTypeOf(title, 'string');
		barmatz.utils.DataTypes.isTypeOf(message, 'string');
		removeLoadingView();
		barmatz.forms.factories.DOMFactory.createAlertPromptDialog(title, message, true);
	}
	
	function addFromModelDeleteEventListeners()
	{
		formModel.addEventListener(barmatz.events.FormModelEvent.DELETING, onFormModelDeleting);
		formModel.addEventListener(barmatz.events.FormModelEvent.DELETED, onFormModelDeleted);
		formModel.addEventListener(barmatz.events.FormModelEvent.DELETION_FAIL, onFormModelDeletionFail);
	}
	
	function removeFromModelDeleteEventListeners()
	{
		formModel.removeEventListener(barmatz.events.FormModelEvent.DELETING, onFormModelDeleting);
		formModel.removeEventListener(barmatz.events.FormModelEvent.DELETED, onFormModelDeleted);
		formModel.removeEventListener(barmatz.events.FormModelEvent.DELETION_FAIL, onFormModelDeletionFail);
	}
	
	function onMenuModelItemAdded(event)
	{
		barmatz.utils.DataTypes.isNotUndefined(event);
		barmatz.utils.DataTypes.isInstanceOf(event, barmatz.events.CollectionEvent);
	}
	
	function onMenuModelItemRemoved(event)
	{
		barmatz.utils.DataTypes.isNotUndefined(event);
		barmatz.utils.DataTypes.isInstanceOf(event, barmatz.events.CollectionEvent);
	}
	
	function onToolboxModelItemAdded(event)
	{
		barmatz.utils.DataTypes.isNotUndefined(event);
		barmatz.utils.DataTypes.isInstanceOf(event, barmatz.events.CollectionEvent);
	}

	function onToolboxModelItemRemoved(event)
	{
		barmatz.utils.DataTypes.isNotUndefined(event);
		barmatz.utils.DataTypes.isInstanceOf(event, barmatz.events.CollectionEvent);
	}
	
	function onFormModelValueChanged(event)
	{
		barmatz.utils.DataTypes.isNotUndefined(event);
		barmatz.utils.DataTypes.isInstanceOf(event, barmatz.events.ModelEvent);
		
		switch(event.key)
		{
			case 'name':
				updateFormName();
				break;
			case 'id':
				saveStatusView.innerHTML = '';
				break;
		}
	}
	
	function onFormModelItemAdded(event)
	{
		barmatz.utils.DataTypes.isNotUndefined(event);
		barmatz.utils.DataTypes.isInstanceOf(event, barmatz.events.CollectionEvent);
		propertiesController.model = event.item;
		workspaceView.childNodes[event.index].addEventListener('click', onWorkspaceViewItemClick);
	}
	
	function onFormModelItemRemoved(event)
	{
		barmatz.utils.DataTypes.isNotUndefined(event);
		barmatz.utils.DataTypes.isInstanceOf(event, barmatz.events.CollectionEvent);
		propertiesController.model = formModel.numItems > 0 ? formModel.getItemAt(event.index - 1) : null;
	}
	
	function onFormModelSaving(event)
	{
		barmatz.utils.DataTypes.isNotUndefined(event);
		barmatz.utils.DataTypes.isInstanceOf(event, barmatz.events.FormModelEvent);
		addLoadingView();
		saveStatusView.innerHTML = 'saving...';
	}
	
	function onFormModelSaved(event)
	{
		barmatz.utils.DataTypes.isNotUndefined(event);
		barmatz.utils.DataTypes.isInstanceOf(event, barmatz.events.FormModelEvent);
		removeLoadingViewWithMessage('Success', 'Form saved successfully');
		saveStatusView.innerHTML = 'last saved at ' + barmatz.utils.Date.toString(new Date(), 'hh:ii dd/mm/yy');
	}
	
	function onFormModelErrorSaving(event)
	{
		barmatz.utils.DataTypes.isNotUndefined(event);
		barmatz.utils.DataTypes.isInstanceOf(event, barmatz.events.FormModelEvent);
		removeLoadingViewWithMessage('Error', 'Error saving form');
		saveStatusView.innerHTML = 'error saving!';
	}
	
	function onToolboxItemViewClick(event)
	{
		barmatz.utils.DataTypes.isNotUndefined(event);
		barmatz.utils.DataTypes.isInstanceOf(event, MouseEvent);
		formModel.addItem(toolboxModel.getItemAt(Array.prototype.slice.call(toolboxView.childNodes).indexOf(event.target)).fieldModel.clone());
	}
	
	function onWorkspaceViewItemClick(event)
	{
		barmatz.utils.DataTypes.isNotUndefined(event);
		barmatz.utils.DataTypes.isInstanceOf(event, MouseEvent);
		propertiesController.model = formModel.getItemAt(Array.prototype.slice.call(workspaceView.childNodes).indexOf(event.currentTarget));
	}
	
	function onFormModelDeleting(event) 
	{
		barmatz.utils.DataTypes.isNotUndefined(event);
		barmatz.utils.DataTypes.isInstanceOf(event, barmatz.events.FormModelEvent);
		addLoadingView();
	}
	
	function onFormModelDeleted(event) 
	{
		barmatz.utils.DataTypes.isNotUndefined(event);
		barmatz.utils.DataTypes.isInstanceOf(event, barmatz.events.FormModelEvent);
		removeLoadingViewWithMessage('Success', 'Form deleted.');
		removeFromModelDeleteEventListeners();
		formModel.reset();
	}
	
	function onFormModelDeletionFail(event) 
	{
		barmatz.utils.DataTypes.isNotUndefined(event);
		barmatz.utils.DataTypes.isInstanceOf(event, barmatz.events.FormModelEvent);
		removeLoadingViewWithMessage('Error', 'Error deleting form. Try again.');
		removeFromModelDeleteEventListeners();
	}
	
	function onMenuNewClick(event)
	{
		formRenameField = barmatz.forms.factories.DOMFactory.createChangePropertyPromptDialogWrapper('New form', 'Name', formModel.name, onResetFromConfirm, true).field;
	}
	
	function onMenuSaveClick(event)
	{
		formModel.save(userModel);
	}
	
	function onMenuSaveAsClick(event)
	{
		formRenameField = barmatz.forms.factories.DOMFactory.createChangePropertyPromptDialogWrapper('Save as', 'Form name', formModel.name, onSaveFromAsConfirm, true).field;
	}
	
	function onMenuLoadClick(event)
	{
		var dialog = barmatz.forms.factories.DOMFactory.createUserFormsListDialog();
		barmatz.forms.factories.ControllerFactory.createUserFormsListController(formModel, userModel, dialog.getElementsByTagName('tbody')[0], dialog);
	}
	
	function onMenuRenameClick(event)
	{
		formRenameField = barmatz.forms.factories.DOMFactory.createChangePropertyPromptDialogWrapper('Rename form', 'Name', formModel.name, onRenameFromConfirm, true).field;
	}
	
	function onMenuExportClick(event)
	{
		if(barmatz.utils.DataTypes.applySilent('isValid', formModel.fingerprint))
			barmatz.forms.factories.DOMFactory.createExportPromptDialog(formModel.fingerprint, true);
		else
			barmatz.forms.factories.DOMFactory.createAlertPromptDialog('Failed to export', 'You must save the form before exporting!', true);
	}
	
	function onMenuDeleteClick(event)
	{
		barmatz.forms.factories.DOMFactory.createConfirmPromptDialog('Are you sure you want to delete this form?', onDeleteFormConfirm, true);
	}
	
	function onMenuPropertiesClick(event)
	{
		var wrapper = barmatz.forms.factories.DOMFactory.createFormPropertiesDialogWrapper(formModel, onChangeFormPropertiesConfirm, true);
		
		function onChangeFormPropertiesConfirm(event)
		{
			formModel.name = wrapper.nameField.value;
			formModel.method = wrapper.methodField.value;
			formModel.encoding = wrapper.encodingField.value;
			formModel.submitButtonLabel = wrapper.submitButtonLabelField.value;
			formModel.direction = wrapper.directionField.value;
			formModel.stylesheets = wrapper.stylesheetsField.value.replace(/\s+/, ' ').split(' ');
			formModel.targetEmail = wrapper.targetEmailField.value;
		}
	}
	
	function onDeleteFormConfirm(event)
	{
		addFromModelDeleteEventListeners();
		formModel.delete();
		formModel.reset();
		formModel.name = 'Unnamed form';
	}
	
	function onSaveFromAsConfirm(event)
	{
		formModel.saveAs(userModel, formRenameField.value);
	}
	
	function onRenameFromConfirm(event)
	{
		formModel.name = formRenameField.value;
	}
	
	function onResetFromConfirm(event)
	{
		formModel.reset();
		formModel.name = formRenameField.value;
	}
};

barmatz.forms.ui.BuilderController.prototype = new barmatz.mvc.Controller();
barmatz.forms.ui.BuilderController.prototype.constructor = barmatz.forms.ui.BuilderController;