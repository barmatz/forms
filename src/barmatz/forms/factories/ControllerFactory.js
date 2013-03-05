/** barmatz.forms.factories.ControllerFactory **/
window.barmatz.forms.factories.ControllerFactory = function(){};

Object.defineProperties(barmatz.forms.factories.ControllerFactory,
{
	createMenuController: {value: function(model, view)
	{
		barmatz.utils.DataTypes.isNotUndefined(model);
		barmatz.utils.DataTypes.isNotUndefined(view);
		barmatz.utils.DataTypes.isInstanceOf(model, barmatz.forms.CollectionModel);
		barmatz.utils.DataTypes.isInstanceOf(view, HTMLElement);
		return new barmatz.forms.ui.MenuController(model, view);
	}},
	createToolboxController: {value: function(model, view)
	{
		barmatz.utils.DataTypes.isNotUndefined(model);
		barmatz.utils.DataTypes.isNotUndefined(view);
		barmatz.utils.DataTypes.isInstanceOf(model, barmatz.forms.CollectionModel);
		barmatz.utils.DataTypes.isInstanceOf(view, HTMLElement);
		return new barmatz.forms.ui.ToolboxController(model, view);
	}},
	createWorkspaceController: {value: function(model, view)
	{
		barmatz.utils.DataTypes.isNotUndefined(model);
		barmatz.utils.DataTypes.isNotUndefined(view);
		barmatz.utils.DataTypes.isInstanceOf(model, barmatz.forms.CollectionModel);
		barmatz.utils.DataTypes.isInstanceOf(view, HTMLElement);
		return new barmatz.forms.ui.WorkspaceController(model, view);
	}},
	createPropertiesPanelController: {value: function(view)
	{
		barmatz.utils.DataTypes.isNotUndefined(view);
		barmatz.utils.DataTypes.isInstanceOf(view, HTMLElement);
		return new barmatz.forms.ui.PropertiesPanelController(view);
	}},
	createBuilderController: {value: function(toolboxModel, toolboxView, workspaceModel, workspaceView, propertiesPanelController, propertiesPanelView)
	{
		barmatz.utils.DataTypes.isNotUndefined(toolboxModel);
		barmatz.utils.DataTypes.isNotUndefined(toolboxView);
		barmatz.utils.DataTypes.isNotUndefined(workspaceModel);
		barmatz.utils.DataTypes.isNotUndefined(workspaceView);
		barmatz.utils.DataTypes.isNotUndefined(propertiesPanelController);
		barmatz.utils.DataTypes.isNotUndefined(propertiesPanelView);
		barmatz.utils.DataTypes.isInstanceOf(toolboxModel, barmatz.forms.CollectionModel);
		barmatz.utils.DataTypes.isInstanceOf(toolboxView, HTMLElement);
		barmatz.utils.DataTypes.isInstanceOf(workspaceModel, barmatz.forms.ui.WorkspaceModel);
		barmatz.utils.DataTypes.isInstanceOf(workspaceView, HTMLElement);
		barmatz.utils.DataTypes.isInstanceOf(propertiesPanelController, barmatz.forms.ui.PropertiesPanelController);
		barmatz.utils.DataTypes.isInstanceOf(propertiesPanelView, HTMLElement);
		return new barmatz.forms.ui.BuilderController(toolboxModel, toolboxView, workspaceModel, workspaceView, propertiesPanelController, propertiesPanelView);
	}},
	createWorkspaceItemController: {value: function(model, labelView, fieldView, mandatoryView, deleteButtonView)
	{
		barmatz.utils.DataTypes.isNotUndefined(model);
		barmatz.utils.DataTypes.isNotUndefined(labelView);
		barmatz.utils.DataTypes.isNotUndefined(fieldView);
		barmatz.utils.DataTypes.isNotUndefined(mandatoryView);
		barmatz.utils.DataTypes.isNotUndefined(deleteButtonView);
		barmatz.utils.DataTypes.isInstanceOf(model, barmatz.forms.fields.FormFieldModel);
		barmatz.utils.DataTypes.isInstanceOf(labelView, HTMLElement);
		barmatz.utils.DataTypes.isInstanceOf(fieldView, HTMLElement);
		barmatz.utils.DataTypes.isInstanceOf(mandatoryView, HTMLElement);
		barmatz.utils.DataTypes.isInstanceOf(deleteButtonView, HTMLElement);
		return new barmatz.forms.ui.WorkspaceItemController(model, labelView, fieldView, mandatoryView, deleteButtonView);
	}}
});