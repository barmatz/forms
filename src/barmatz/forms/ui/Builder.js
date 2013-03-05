/** barmatz.forms.ui.Builder **/
window.barmatz.forms.ui.Builder = function(container)
{
	var controller, menuModel, menuView, toolboxModel, toolboxView, workspaceModel, workspaceView, propertiesPanelView, propertiesPanelController;
	
	barmatz.utils.DataTypes.isNotUndefined(container);
	barmatz.utils.DataTypes.isInstanceOf(container, HTMLElement);
	
	menuModel = barmatz.forms.factories.ModelFactory.createMenuModel();
	addItemToMenuModel('New');
	addItemToMenuModel('Save');
	addItemToMenuModel('Export');
	menuView = container.appendChild(barmatz.forms.factories.DOMFactory.createBuilderMenu());
	barmatz.forms.factories.ControllerFactory.createMenuController(menuModel, menuView);

	toolboxModel = barmatz.forms.factories.ModelFactory.createToolboxModel();
	addItemToToolboxModel(barmatz.forms.fields.FormFieldTypes.TEXT, 'Text field');
	addItemToToolboxModel(barmatz.forms.fields.FormFieldTypes.PASSWORD, 'Password field');
	addItemToToolboxModel(barmatz.forms.fields.FormFieldTypes.CHECKBOX, 'Checkbox');
	addItemToToolboxModel(barmatz.forms.fields.FormFieldTypes.RADIO, 'Radio button');
	addItemToToolboxModel(barmatz.forms.fields.FormFieldTypes.FILE, 'File field');
	addItemToToolboxModel(barmatz.forms.fields.FormFieldTypes.HIDDEN, 'Hidden field');
	
	toolboxView = container.appendChild(barmatz.forms.factories.DOMFactory.createBuilderToolbox());
	barmatz.forms.factories.ControllerFactory.createToolboxController(toolboxModel, toolboxView);

	workspaceModel = barmatz.forms.factories.ModelFactory.createWorkspaceModel();
	workspaceView = container.appendChild(barmatz.forms.factories.DOMFactory.createBuilderWorkspace());
	barmatz.forms.factories.ControllerFactory.createWorkspaceController(workspaceModel, workspaceView);
	
	propertiesPanelView = container.appendChild(barmatz.forms.factories.DOMFactory.createBuilderPropertiesPanel());
	propertiesPanelController = barmatz.forms.factories.ControllerFactory.createPropertiesPanelController(propertiesPanelView);
	
	controller = barmatz.forms.factories.ControllerFactory.createBuilderController(toolboxModel, toolboxView, workspaceModel, workspaceView, propertiesPanelController, propertiesPanelView);
	
	function addItemToMenuModel(label)
	{
		barmatz.utils.DataTypes.isNotUndefined(label);
		barmatz.utils.DataTypes.isTypeOf(label, 'string');
		menuModel.addItem(barmatz.forms.factories.ModelFactory.createMenuItemModel(label));
	}
	
	function addItemToToolboxModel(type, label)
	{
		barmatz.utils.DataTypes.isNotUndefined(type);
		barmatz.utils.DataTypes.isNotUndefined(label);
		barmatz.utils.DataTypes.isTypeOf(type, 'string');
		barmatz.utils.DataTypes.isTypeOf(label, 'string');
		toolboxModel.addItem(barmatz.forms.factories.ModelFactory.createToolboxItemModel(type, label), barmatz.forms.factories.ModelFactory.createFormFieldModel(type, ''));
	}
};