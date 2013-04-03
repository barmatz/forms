/** barmatz.forms.factories.ControllerFactory **/
window.barmatz.forms.factories.ControllerFactory = function(){};

Object.defineProperties(barmatz.forms.factories.ControllerFactory,
{
	createLoginController: {value: function(model, userNameFieldView, passwordFieldView, submitButtonView, errorFieldView)
	{
		barmatz.utils.DataTypes.isNotUndefined(model);
		barmatz.utils.DataTypes.isNotUndefined(userNameFieldView);
		barmatz.utils.DataTypes.isNotUndefined(passwordFieldView);
		barmatz.utils.DataTypes.isNotUndefined(submitButtonView);
		barmatz.utils.DataTypes.isNotUndefined(errorFieldView);
		barmatz.utils.DataTypes.isInstanceOf(model, barmatz.forms.users.UserModel);
		barmatz.utils.DataTypes.isInstanceOf(userNameFieldView, HTMLElement);
		barmatz.utils.DataTypes.isInstanceOf(passwordFieldView, HTMLElement);
		barmatz.utils.DataTypes.isInstanceOf(submitButtonView, HTMLElement);
		barmatz.utils.DataTypes.isInstanceOf(errorFieldView, HTMLElement);
		return new barmatz.forms.users.LogingController(model, userNameFieldView, passwordFieldView, submitButtonView, errorFieldView);
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
	createPropertiesController: {value: function(view)
	{
		barmatz.utils.DataTypes.isNotUndefined(view);
		barmatz.utils.DataTypes.isInstanceOf(view, HTMLElement);
		return new barmatz.forms.ui.PropertiesController(view);
	}},
	createBuilderController: {value: function(formModel, userModel, containerView, panelsView, formNameView, saveStatusView, menuModel, menuView, toolboxModel, toolboxView, workspaceView, propertiesController)
	{
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
		return new barmatz.forms.ui.BuilderController(formModel, userModel, containerView, panelsView, formNameView, saveStatusView, menuModel, menuView, toolboxModel, toolboxView, workspaceView, propertiesController);
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
	createNewFieldDialogController: {value: function(model, view, nameFieldView, labelFieldView)
	{
		barmatz.utils.DataTypes.isNotUndefined(model);
		barmatz.utils.DataTypes.isNotUndefined(view);
		barmatz.utils.DataTypes.isNotUndefined(nameFieldView);
		barmatz.utils.DataTypes.isNotUndefined(labelFieldView);
		barmatz.utils.DataTypes.isInstanceOf(model, barmatz.mvc.Model);
		barmatz.utils.DataTypes.isInstanceOf(view, HTMLElement);
		barmatz.utils.DataTypes.isInstanceOf(nameFieldView, HTMLInputElement);
		barmatz.utils.DataTypes.isInstanceOf(labelFieldView, HTMLInputElement);
		return new barmatz.forms.ui.NewFieldDialogController(model, view, nameFieldView, labelFieldView);
	}},
	createMenuController: {value: function(model, iconView, itemsView)
	{
		barmatz.utils.DataTypes.isNotUndefined(model);
		barmatz.utils.DataTypes.isNotUndefined(iconView);
		barmatz.utils.DataTypes.isNotUndefined(itemsView);
		barmatz.utils.DataTypes.isInstanceOf(model, barmatz.forms.ui.MenuModel);
		barmatz.utils.DataTypes.isInstanceOf(iconView, HTMLElement);
		barmatz.utils.DataTypes.isInstanceOf(itemsView, HTMLElement);
		return new barmatz.forms.ui.MenuController(model, iconView, itemsView);
	}},
	createUserFormsListController: {value: function(formModel, userModel, view, dialogView)
	{
		barmatz.utils.DataTypes.isNotUndefined(formModel);
		barmatz.utils.DataTypes.isNotUndefined(userModel);
		barmatz.utils.DataTypes.isNotUndefined(view);
		barmatz.utils.DataTypes.isNotUndefined(dialogView);
		barmatz.utils.DataTypes.isInstanceOf(formModel, barmatz.forms.FormModel);
		barmatz.utils.DataTypes.isInstanceOf(userModel, barmatz.forms.users.UserModel);
		barmatz.utils.DataTypes.isInstanceOf(view, HTMLElement);
		barmatz.utils.DataTypes.isInstanceOf(dialogView, HTMLElement);
		return new barmatz.forms.ui.UserFormsListController(formModel, userModel, view, dialogView);
	}},
	createUserFormsListItemController: {value: function(model, view, nameView, createdView, fingerprintView)
	{
		barmatz.utils.DataTypes.isNotUndefined(model);
		barmatz.utils.DataTypes.isNotUndefined(view);
		barmatz.utils.DataTypes.isNotUndefined(nameView);
		barmatz.utils.DataTypes.isNotUndefined(createdView);
		barmatz.utils.DataTypes.isNotUndefined(fingerprintView);
		barmatz.utils.DataTypes.isInstanceOf(model, barmatz.forms.FormModel);
		barmatz.utils.DataTypes.isInstanceOf(view, HTMLElement);
		barmatz.utils.DataTypes.isInstanceOf(nameView, HTMLElement);
		barmatz.utils.DataTypes.isInstanceOf(createdView, HTMLElement);
		barmatz.utils.DataTypes.isInstanceOf(fingerprintView, HTMLElement);
		return new barmatz.forms.ui.UserFormsListItemController(model, view, nameView, createdView, fingerprintView);
	}},
	createFormController: {value: function(model, view)
	{
		barmatz.utils.DataTypes.isNotUndefined(model);
		barmatz.utils.DataTypes.isNotUndefined(view);
		barmatz.utils.DataTypes.isInstanceOf(model, barmatz.forms.FormModel);
		barmatz.utils.DataTypes.isInstanceOf(view, HTMLFormElement);
		return new barmatz.forms.FormController(model, view);
	}},
	createDropboxItemsListController: {value: function(model, view, addButtonView, resetButtonView)
	{
		barmatz.utils.DataTypes.isNotUndefined(model);
		barmatz.utils.DataTypes.isNotUndefined(view);
		barmatz.utils.DataTypes.isNotUndefined(addButtonView);
		barmatz.utils.DataTypes.isNotUndefined(resetButtonView);
		barmatz.utils.DataTypes.isInstanceOf(model, barmatz.forms.fields.DropboxModel);
		barmatz.utils.DataTypes.isInstanceOf(view, HTMLElement);
		barmatz.utils.DataTypes.isInstanceOf(addButtonView, HTMLElement);
		barmatz.utils.DataTypes.isInstanceOf(resetButtonView, HTMLElement);
		return new barmatz.forms.fields.DropboxItemsListController(model, view, addButtonView, resetButtonView);
	}},
	createDropboxItemsListItemController: {value: function(model, labelView, valueView, editButtonView)
	{
		barmatz.utils.DataTypes.isNotUndefined(model);
		barmatz.utils.DataTypes.isNotUndefined(labelView);
		barmatz.utils.DataTypes.isNotUndefined(valueView);
		barmatz.utils.DataTypes.isNotUndefined(editButtonView);
		barmatz.utils.DataTypes.isInstanceOf(model, barmatz.forms.fields.DropboxItemModel);
		barmatz.utils.DataTypes.isInstanceOf(labelView, HTMLElement);
		barmatz.utils.DataTypes.isInstanceOf(valueView, HTMLElement);
		barmatz.utils.DataTypes.isInstanceOf(editButtonView, HTMLElement);
		return new barmatz.forms.fields.DropboxItemsListItemController(model, labelView, valueView, editButtonView);
	}},
	createFieldValidationOptionsController: {value: function(model, options)
	{
		barmatz.utils.DataTypes.isNotUndefined(model);
		barmatz.utils.DataTypes.isNotUndefined(options);
		barmatz.utils.DataTypes.isInstanceOf(model, barmatz.forms.fields.FieldModel);
		barmatz.utils.DataTypes.isTypeOf(options, 'object');
		return barmatz.forms.fields.FieldValidationOptionsController(model, options);
	}}
});