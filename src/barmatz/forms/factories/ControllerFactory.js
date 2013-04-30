/** barmatz.forms.factories.ControllerFactory **/
barmatz.forms.factories.ControllerFactory = {
	createLoginController: function(model, userNameFieldView, passwordFieldView, submitButtonView, errorFieldView, dialogContainerView)
	{
		return new barmatz.forms.users.LoginController(model, userNameFieldView, passwordFieldView, submitButtonView, errorFieldView, dialogContainerView);
	},
	createToolboxController: function(model, view)
	{
		return new barmatz.forms.ui.ToolboxController(model, view);
	},
	createWorkspaceController: function(model, view, dialogContainerView)
	{
		return new barmatz.forms.ui.WorkspaceController(model, view, dialogContainerView);
	},
	createPropertiesController: function(view)
	{
		return new barmatz.forms.ui.PropertiesController(view);
	},
	createBuilderController: function(formModel, userModel, containerView, panelsView, formNameView, saveStatusView, menuModel, menuView, toolboxModel, toolboxView, workspaceView, propertiesController, dialogContainerView)
	{
		return new barmatz.forms.ui.BuilderController(formModel, userModel, containerView, panelsView, formNameView, saveStatusView, menuModel, menuView, toolboxModel, toolboxView, workspaceView, propertiesController, dialogContainerView);
	},
	createWorkspaceItemController: function(model, labelView, fieldView, mandatoryView, deleteButtonView)
	{
		return new barmatz.forms.ui.WorkspaceItemController(model, labelView, fieldView, mandatoryView, deleteButtonView);
	},
	createNewFieldDialogController: function(model, view, nameFieldView, labelFieldView, dialogContainerView)
	{
		return new barmatz.forms.ui.NewFieldDialogController(model, view, nameFieldView, labelFieldView, dialogContainerView);
	},
	createMenuController: function(model, iconView, itemsView)
	{
		return new barmatz.forms.ui.MenuController(model, iconView, itemsView);
	},
	createUserFormsListController: function(formModel, userModel, view, dialogView, dialogContainerView)
	{
		return new barmatz.forms.ui.UserFormsListController(formModel, userModel, view, dialogView, dialogContainerView);
	},
	createUserFormsListItemController: function(model, view, nameView, createdView, fingerprintView, dialogContainerView)
	{
		return new barmatz.forms.ui.UserFormsListItemController(model, view, nameView, createdView, fingerprintView, dialogContainerView);
	},
	createFormController: function(model, formView, submitButtonView)
	{
		return new barmatz.forms.FormController(model, formView, submitButtonView);
	},
	createDropboxItemsListController: function(model, view, addButtonView, resetButtonView, dialogContainerView)
	{
		return new barmatz.forms.fields.DropboxItemsListController(model, view, addButtonView, resetButtonView, dialogContainerView);
	},
	createDropboxItemsListItemController: function(model, labelView, valueView, editButtonView, dialogContainerView)
	{
		return new barmatz.forms.fields.DropboxItemsListItemController(model, labelView, valueView, editButtonView, dialogContainerView);
	},
	createFieldValidationOptionsController: function(model, options, dialogContainerView)
	{
		return new barmatz.forms.fields.FieldValidationOptionsController(model, options, dialogContainerView);
	},
	createFieldController: function(model, fieldView, errorMessageView)
	{
		return new barmatz.forms.fields.FieldController(model, fieldView, errorMessageView);
	},
	createJQueryDialogController: function(view)
	{
		return new barmatz.forms.ui.JQueryDialogController(view);
	},
	createLeadsController: function(userModel, formsListModel, formsListView, leadsListModel, leadsListWrapperView, leadsListView, containerView, panelsView, dialogContainerView)
	{
		return new barmatz.forms.ui.LeadsController(userModel, formsListModel, formsListView, leadsListModel, leadsListWrapperView, leadsListView, containerView, panelsView, dialogContainerView);
	},
	createLeadsListController: function(model, view)
	{
		return new barmatz.forms.ui.LeadsListController(model, view);
	},
	createLeadsFormsListController: function(model, view)
	{
		return new barmatz.forms.ui.LeadsFormsListController(model, view);
	}
}