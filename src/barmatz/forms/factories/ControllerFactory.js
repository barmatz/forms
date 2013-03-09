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
	createBuilderController: {value: function(model, view)
	{
		barmatz.utils.DataTypes.isNotUndefined(model);
		barmatz.utils.DataTypes.isNotUndefined(view);
		barmatz.utils.DataTypes.isInstanceOf(model, barmatz.forms.ui.BuilderModel);
		barmatz.utils.DataTypes.isInstanceOf(view, HTMLElement);
		return new barmatz.forms.ui.BuilderController(model, view);
	}},
	createWorkspaceItemController: {value: function(model, labelView, fieldView, mandatoryView, deleteButtonView)
	{
		barmatz.utils.DataTypes.isNotUndefined(model);
		barmatz.utils.DataTypes.isNotUndefined(labelView);
		barmatz.utils.DataTypes.isNotUndefined(fieldView);
		barmatz.utils.DataTypes.isNotUndefined(mandatoryView);
		barmatz.utils.DataTypes.isNotUndefined(deleteButtonView);
		barmatz.utils.DataTypes.isInstanceOf(model, barmatz.forms.fields.FieldModel);
		barmatz.utils.DataTypes.isInstanceOf(labelView, HTMLElement);
		barmatz.utils.DataTypes.isInstanceOf(fieldView, HTMLElement);
		barmatz.utils.DataTypes.isInstanceOf(mandatoryView, HTMLElement);
		barmatz.utils.DataTypes.isInstanceOf(deleteButtonView, HTMLElement);
		return new barmatz.forms.ui.WorkspaceItemController(model, labelView, fieldView, mandatoryView, deleteButtonView);
	}},
	createJQueryPromptDialogController: {value: function(model, view, fieldView)
	{
		barmatz.utils.DataTypes.isNotUndefined(model);
		barmatz.utils.DataTypes.isNotUndefined(view);
		barmatz.utils.DataTypes.isNotUndefined(fieldView);
		barmatz.utils.DataTypes.isInstanceOf(model, barmatz.mvc.Model);
		barmatz.utils.DataTypes.isInstanceOf(view, HTMLElement);
		barmatz.utils.DataTypes.isInstanceOf(fieldView, HTMLInputElement);
		return new barmatz.forms.ui.JQueryPromptDialogController(model, view, fieldView);
	}}
});