/** barmatz.forms.factories.ModelFactory **/
barmatz.forms.factories.ModelFactory = {
	createUserModel: function()
	{
		return new barmatz.forms.users.UserModel();
	},
	createFieldModel: function(type, name)
	{
		barmatz.utils.DataTypes.isNotUndefined(type);
		barmatz.utils.DataTypes.isTypeOf(type, 'string');
		
		switch(type)
		{
			default:
				return new barmatz.forms.fields.FieldModel(type, name);
				break;
			case barmatz.forms.fields.FieldTypes.HTML_CONTENT:
				return new barmatz.forms.fields.HTMLContentModel();
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
	},
	createToolboxModel: function()
	{
		return new barmatz.forms.ui.ToolboxModel();
	},
	createToolboxItemModel: function(type, label, fieldModel)
	{
		return new barmatz.forms.ui.ToolboxItemModel(type, label, fieldModel);
	},
	createCollectionModel: function()
	{
		return new barmatz.forms.CollectionModel();
	},
	createDropboxItemModel: function(label, value)
	{
		return new barmatz.forms.fields.DropboxItemModel(label, value);
	},
	createDropboxModel: function(name, items)
	{
		return new barmatz.forms.fields.DropboxModel(name, items);
	},
	createBuilderModel: function()
	{
		return new barmatz.forms.ui.BuilderModel();
	},
	createMenuModel: function()
	{
		return new barmatz.forms.ui.MenuModel();
	},
	createMenuItemModel: function(label, clickHandler)
	{
		return new barmatz.forms.ui.MenuItemModel(label, clickHandler);
	},
	createFormModel: function()
	{
		return new barmatz.forms.FormModel();
	},
	createPanelModel: function(className, content)
	{
		return new barmatz.forms.ui.PanelModel(className, content);
	},
	createValidatorModel: function(data)
	{
		return new barmatz.forms.fields.ValidatorModel(data);
	},
	createLeadModel: function()
	{
		return new barmatz.forms.LeadModel();
	}
}