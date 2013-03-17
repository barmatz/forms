/** barmatz.forms.ui.Builder **/
window.barmatz.forms.ui.Builder = function()
{
	var userModel, formModel, formRenameField, menuModel, menuViewWrapper, toolboxModel, toolboxView, workspaceViewWrapper, propertiesView, propertiesController;
	
	initUserModel();
	initForm();
	initMenu();
	initToolbox();
	initWorkspace();
	initProperties();

	barmatz.forms.factories.ControllerFactory.createBuilderController(
		formModel, barmatz.forms.factories.DOMFactory.BODY_ELEMENT, 
		barmatz.forms.factories.DOMFactory.createPanels([
			barmatz.forms.factories.ModelFactory.createPanelModel('forms-toolbox-panel', toolboxView),
			barmatz.forms.factories.ModelFactory.createPanelModel('forms-workspace-panel', workspaceViewWrapper.wrapper),
			barmatz.forms.factories.ModelFactory.createPanelModel('forms-properties-panel', propertiesView)
		]),
		workspaceViewWrapper.formName, workspaceViewWrapper.saveStatus, menuViewWrapper.wrapper, toolboxModel, toolboxView, workspaceViewWrapper.workspace, propertiesController
	);
	
	function initUserModel()
	{
		userModel = barmatz.forms.factories.ModelFactory.createUserModel();
	}
	
	function initForm()
	{
		formModel = barmatz.forms.factories.ModelFactory.createFormModel();
		formModel.name = 'Unnamed form';
	}
	
	function initMenu()
	{
		menuModel = barmatz.forms.factories.ModelFactory.createMenuModel();
		menuViewWrapper = barmatz.forms.factories.DOMFactory.createMenuWrapper(); 
		barmatz.forms.factories.ControllerFactory.createMenuController(menuModel, menuViewWrapper.icon, menuViewWrapper.menu);
		addMenuItem('New', onMenuNewClick);
		addMenuItem('Save', onMenuSaveClick);
		addMenuItem('Save as', onMenuSaveAsClick);
		addMenuItem('Load', onMenuLoadClick);
		addMenuItem('Rename', onMenuRenameClick);
		addMenuItem('Export', onMenuExportClick);
		addMenuItem('Properties', onMenuPropertiesClick);
	}
	
	function initToolbox()
	{
		toolboxModel = barmatz.forms.factories.ModelFactory.createToolboxModel();
		toolboxView = barmatz.forms.factories.DOMFactory.createToolbox();
		barmatz.forms.factories.ControllerFactory.createToolboxController(toolboxModel, toolboxView);
		addToolboxItem(barmatz.forms.fields.FieldTypes.TEXT, 'Text field');
		addToolboxItem(barmatz.forms.fields.FieldTypes.PASSWORD, 'Password field');
		addToolboxItem(barmatz.forms.fields.FieldTypes.CHECKBOX, 'Checkbox field');
		addToolboxItem(barmatz.forms.fields.FieldTypes.RADIO, 'Radio field');
	}
	
	function initWorkspace()
	{
		workspaceViewWrapper = barmatz.forms.factories.DOMFactory.createWorkspaceWrapper('', '');
		barmatz.forms.factories.ControllerFactory.createWorkspaceController(formModel, workspaceViewWrapper.workspace);
	}
	
	function initProperties()
	{
		propertiesView = barmatz.forms.factories.DOMFactory.createProperties();
		propertiesController = barmatz.forms.factories.ControllerFactory.createPropertiesController(propertiesView);
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
	}
	
	function onMenuNewClick(event)
	{
		formRenameField = barmatz.forms.factories.DOMFactory.createChangePropertyPromptDialog('New form', 'Name', formModel.name, onResetFromConfirm, true).field;
	}
	
	function onMenuSaveClick(event)
	{
		formModel.save(userModel);
	}
	
	function onMenuSaveAsClick(event)
	{
		formRenameField = barmatz.forms.factories.DOMFactory.createChangePropertyPromptDialog('Save as', 'Form name', formModel.name, onSaveFromAsConfirm, true).field;
	}
	
	function onMenuLoadClick(event)
	{
		userModel.getForms(function(forms)
		{
			barmatz.forms.factories.DOMFactory.createUserFormsListDialog(forms);
		});
	}
	
	function onMenuRenameClick(event)
	{
		formRenameField = barmatz.forms.factories.DOMFactory.createChangePropertyPromptDialog('Rename form', 'Name', formModel.name, onRenameFromConfirm, true).field;
	}
	
	function onMenuExportClick(event)
	{
		if(barmatz.utils.DataTypes.applySilent('isValid', formModel.id))
			formModel.getFingerprint(function(fingerprint)
			{
				barmatz.forms.factories.DOMFactory.createExportPromptDialog(fingerprint, true);
			});
		else
			barmatz.forms.factories.DOMFactory.createAlertPromptDialog('Failed to export', 'You must save the form before exporting!', true);
	}
	
	function onMenuPropertiesClick(event)
	{
		debugger;
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