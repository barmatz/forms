/** barmatz.forms.factories.ModelFactory **/
window.barmatz.forms.factories.ModelFactory = function(){};

Object.defineProperties(barmatz.forms.factories.ModelFactory,
{
	createFormFieldModel: {value: function(type, name)
	{
		barmatz.utils.DataTypes.isNotUndefined(type);
		barmatz.utils.DataTypes.isNotUndefined(name);
		barmatz.utils.DataTypes.isTypeOf(type, 'string');
		barmatz.utils.DataTypes.isTypeOf(name, 'string');
		
		switch(type)
		{
			default:
				return new barmatz.forms.fields.FormFieldModel(type, name);
				break;
			case barmatz.forms.fields.FormFieldTypes.TEXT:
				return new barmatz.forms.fields.FormTextFieldModel(name);
				break;
			case barmatz.forms.fields.FormFieldTypes.PASSWORD:
				return new barmatz.forms.fields.FormPasswordFieldModel(name);
				break;
			case barmatz.forms.fields.FormFieldTypes.CHECKBOX:
				return new barmatz.forms.fields.FormCheckboxFieldModel(name);
				break;
			case barmatz.forms.fields.FormFieldTypes.RADIO:
				return new barmatz.forms.fields.FormRadioFieldModel(name);
				break;
			case barmatz.forms.fields.FormFieldTypes.FILE:
				return new barmatz.forms.fields.FormFileFieldModel(name);
				break;
			case barmatz.forms.fields.FormFieldTypes.HIDDEN:
				return new barmatz.forms.fields.FormHiddenFieldModel(name);
				break;
		}
	}},
	createMenuItemModel: {value: function(label)
	{
		barmatz.utils.DataTypes.isNotUndefined(label);
		barmatz.utils.DataTypes.isTypeOf(label, 'string');
		return new barmatz.forms.ui.MenuItemModel(label);
	}},
	createToolboxItemModel: {value: function(type, label)
	{
		barmatz.utils.DataTypes.isNotUndefined(type);
		barmatz.utils.DataTypes.isNotUndefined(label);
		barmatz.utils.DataTypes.isTypeOf(type, 'string');
		barmatz.utils.DataTypes.isTypeOf(label, 'string');
		return new barmatz.forms.ui.ToolboxItemModel(type, label);
	}},
	createCollectionModel: {value: function()
	{
		return new barmatz.forms.CollectionModel();
	}},
	createMenuModel: {value: function()
	{
		return new barmatz.forms.ui.MenuModel();
	}},
	createToolboxModel: {value: function()
	{
		return new barmatz.forms.ui.ToolboxModel();
	}},
	createWorkspaceModel: {value: function()
	{
		return new barmatz.forms.ui.WorkspaceModel();
	}}
});