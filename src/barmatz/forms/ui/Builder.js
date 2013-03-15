/** barmatz.forms.ui.Builder **/
window.barmatz.forms.ui.Builder = function()
{
	var formModel, formRenameField, menuModel, menuViewWrapper, toolboxModel, toolboxView, workspaceViewWrapper, propertiesView, propertiesController;
	
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
		formModel.reset();
		formRenameField = barmatz.forms.factories.DOMFactory.createChangePropertyPromptDialog('New form', 'Name', formModel.name, onRenameFromConfirm, true).field;
	}
	
	function onMenuSaveClick(event)
	{
		formModel.save();
	}
	
	function onMenuSaveAsClick(event)
	{
		formRenameField = barmatz.forms.factories.DOMFactory.createChangePropertyPromptDialog('Save as', 'Form name', formModel.name, onSaveFromAsConfirm, true).field;
	}
	
	function onMenuLoadClick(event)
	{
		debugger;
	}
	
	function onMenuRenameClick(event)
	{
		formRenameField = barmatz.forms.factories.DOMFactory.createChangePropertyPromptDialog('Rename form', 'Name', formModel.name, onRenameFromConfirm, true).field;
	}
	
	function onMenuExportClick(event)
	{
		debugger;
	}
	
	function onSaveFromAsConfirm(event)
	{
		formModel.saveAs(formModel.name);
	}
	
	function onRenameFromConfirm(event)
	{
		formModel.name = formRenameField.value;
	}
};