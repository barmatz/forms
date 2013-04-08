/** barmatz.forms.factories.ModelFactory **/
window.barmatz.forms.factories.ModelFactory = function(){};

Object.defineProperties(barmatz.forms.factories.ModelFactory,
{
	createUserModel: {value: function()
	{
		return new barmatz.forms.users.UserModel();
	}},
	createFieldModel: {value: function(type, name)
	{
		barmatz.utils.DataTypes.isNotUndefined(type);
		barmatz.utils.DataTypes.isNotUndefined(name);
		barmatz.utils.DataTypes.isTypeOf(type, 'string');
		barmatz.utils.DataTypes.isTypeOf(name, 'string');
		
		switch(type)
		{
			default:
				return new barmatz.forms.fields.FieldModel(type, name);
				break;
			case barmatz.forms.fields.FieldTypes.TEXT_AREA:
				return new barmatz.forms.fields.TextAreaFieldModel(name);
				break;
			case barmatz.forms.fields.FieldTypes.TEXT_FIELD:
				return new barmatz.forms.fields.TextFieldModel(name);
				break;
			case barmatz.forms.fields.FieldTypes.DROPBOX:
				return new barmatz.forms.fields.DropboxModel(name);
				break;
			case barmatz.forms.fields.FieldTypes.PASSWORD:
				return new barmatz.forms.fields.PasswordFieldModel(name);
				break;
			case barmatz.forms.fields.FieldTypes.CHECKBOX:
				return new barmatz.forms.fields.CheckboxFieldModel(name);
				break;
			case barmatz.forms.fields.FieldTypes.RADIO:
				return new barmatz.forms.fields.RadioFieldModel(name);
				break;
			case barmatz.forms.fields.FieldTypes.FILE:
				return new barmatz.forms.fields.FileFieldModel(name);
				break;
			case barmatz.forms.fields.FieldTypes.HIDDEN:
				return new barmatz.forms.fields.HiddenFieldModel(name);
				break;
			case barmatz.forms.fields.FieldTypes.PHONE:
				return new barmatz.forms.fields.PhoneFieldModel(name);
				break;
		}
	}},
	createToolboxModel: {value: function()
	{
		return new barmatz.forms.ui.ToolboxModel();
	}},
	createToolboxItemModel: {value: function(type, label, fieldModel)
	{
		barmatz.utils.DataTypes.isNotUndefined(type);
		barmatz.utils.DataTypes.isNotUndefined(label);
		barmatz.utils.DataTypes.isNotUndefined(fieldModel);
		barmatz.utils.DataTypes.isTypeOf(type, 'string');
		barmatz.utils.DataTypes.isTypeOf(label, 'string');
		barmatz.utils.DataTypes.isInstanceOf(fieldModel, barmatz.forms.fields.FieldModel);
		return new barmatz.forms.ui.ToolboxItemModel(type, label, fieldModel);
	}},
	createCollectionModel: {value: function()
	{
		return new barmatz.forms.CollectionModel();
	}},
	createDropboxItemModel: {value: function(label, value)
	{
		barmatz.utils.DataTypes.isNotUndefined(label);
		barmatz.utils.DataTypes.isTypeOf(label, 'string');
		return new barmatz.forms.fields.DropboxItemModel(label, value);
	}},
	createDropboxModel: {value: function(name, items)
	{
		barmatz.utils.DataTypes.isNotUndefined(name);
		barmatz.utils.DataTypes.isTypeOf(name, 'string', true);
		barmatz.utils.DataTypes.isInstanceOf(items, Array, true);
		return new barmatz.forms.fields.DropboxModel(name, items);
	}},
	createBuilderModel: {value: function()
	{
		return new barmatz.forms.ui.BuilderModel();
	}},
	createMenuModel: {value: function()
	{
		return new barmatz.forms.ui.MenuModel();
	}},
	createMenuItemModel: {value: function(label, clickHandler)
	{
		barmatz.utils.DataTypes.isNotUndefined(label);
		barmatz.utils.DataTypes.isNotUndefined(clickHandler);
		barmatz.utils.DataTypes.isTypeOf(label, 'string');
		barmatz.utils.DataTypes.isTypeOf(clickHandler, 'function');
		return new barmatz.forms.ui.MenuItemModel(label, clickHandler);
	}},
	createFormModel: {value: function()
	{
		return new barmatz.forms.FormModel();
	}},
	createPanelModel: {value: function(className, content)
	{
		barmatz.utils.DataTypes.isNotUndefined(className);
		barmatz.utils.DataTypes.isNotUndefined(content);
		barmatz.utils.DataTypes.isTypeOf(className, 'string');
		barmatz.utils.DataTypes.isTypesOrInstances(content, ['string'], [HTMLElement, Array]);
		return new barmatz.forms.ui.PanelModel(className, content);
	}},
	createValidatorModel: {value: function()
	{
		return new barmatz.forms.fields.ValidatorModel();
	}}
});