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
	initController();
	
	function initController()
	{
		barmatz.forms.factories.ControllerFactory.createBuilderController(
			formModel, userModel, barmatz.forms.factories.DOMFactory.BODY_ELEMENT, 
			barmatz.forms.factories.DOMFactory.createPanels([
				barmatz.forms.factories.ModelFactory.createPanelModel('forms-toolbox-panel', toolboxView),
				barmatz.forms.factories.ModelFactory.createPanelModel('forms-workspace-panel', workspaceViewWrapper.wrapper),
				barmatz.forms.factories.ModelFactory.createPanelModel('forms-properties-panel', propertiesView)
			]),
			workspaceViewWrapper.formName, workspaceViewWrapper.saveStatus, menuModel, menuViewWrapper.wrapper, toolboxModel, toolboxView, workspaceViewWrapper.workspace, propertiesController
		);
	}
	
	function initUserModel()
	{
		userModel = barmatz.forms.factories.ModelFactory.createUserModel();
		userModel.getData();
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
	}
	
	function initToolbox()
	{
		toolboxModel = barmatz.forms.factories.ModelFactory.createToolboxModel();
		toolboxView = barmatz.forms.factories.DOMFactory.createToolbox();
		barmatz.forms.factories.ControllerFactory.createToolboxController(toolboxModel, toolboxView);
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
};