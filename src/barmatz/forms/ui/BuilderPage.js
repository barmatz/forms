/** barmatz.forms.ui.BuilderPage **/
barmatz.forms.ui.BuilderPage = function(container)
{
	var _this, builderPageModel, formModel, userModel;
	
	barmatz.utils.DataTypes.isInstanceOf(container, window.HTMLElement, true);
	
	if(!container)
		container = barmatz.forms.factories.DOMFactory.getBodyElement();
	
	barmatz.forms.ui.Page.call(this, container);
	
	_this = this;
	
	initModels();
	initPanels();
	initController();
	
	function initModels()
	{
		initBuilderPageModel();
		initFormModel();
		initUserModel();
	}
	
	function initBuilderPageModel()
	{
		builderPageModel = barmatz.forms.factories.ModelFactory.createBuilderPageModel();
	}
	
	function initFormModel()
	{
		formModel = barmatz.forms.factories.ModelFactory.createFormModel();
		formModel.setName('Unnamed form');
	}

	function initUserModel()
	{
		userModel = barmatz.forms.factories.ModelFactory.createUserModel();
		userModel.getData();
	}
	
	function initMenu()
	{
		barmatz.utils.Array.forEach(
			['New', 'Save', 'Save as', 'Load', 'Rename', 'Export', 'Delete', 'Properties', 'Logout'], 
			function(item, index, collection)
			{
				this.addItem(barmatz.forms.factories.ModelFactory.createMenuItemModel(item, function(){}));
			},
			_this._menuModel
		);
		barmatz.forms.factories.ControllerFactory.createBuilderMenuController(formModel, userModel, _this._menuView.children[0], _this._menuView.children[1], _this._menuView.children[2], _this._menuView.children[3], _this._menuView.children[4], _this._menuView.children[5], _this._menuView.children[6], _this._menuView.children[7], _this._menuView.children[8], container);
	}
	
	function initPanels()
	{
		_this._contentView.appendChild(barmatz.forms.factories.DOMFactory.createPanels([
            barmatz.forms.factories.ModelFactory.createPanelModel('forms-toolbox-panel', getToolbox()),
            barmatz.forms.factories.ModelFactory.createPanelModel('forms-workspace-panel', getWorkspace()),
            barmatz.forms.factories.ModelFactory.createPanelModel('forms-properties-panel', getProperties())
        ]));
	}
	
	function initController()
	{
		barmatz.forms.factories.ControllerFactory.createBuilderPageController(builderPageModel, formModel);
	}
	
	function getToolbox()
	{
		var model, view;
		model = barmatz.forms.factories.ModelFactory.createToolboxModel();
		view = barmatz.forms.factories.DOMFactory.createToolbox();
		barmatz.utils.Array.forEach(
			[
				[barmatz.forms.fields.FieldTypes.HTML_CONTENT, 'HTML content'],
				[barmatz.forms.fields.FieldTypes.TEXT_FIELD, 'Text field'],
				[barmatz.forms.fields.FieldTypes.TEXT_AREA, 'Text area'],
				[barmatz.forms.fields.FieldTypes.PASSWORD, 'Password field'],
				[barmatz.forms.fields.FieldTypes.CHECKBOX, 'Checkbox field'],
				//[barmatz.forms.fields.FieldTypes.RADIO, 'Radio field'],
				[barmatz.forms.fields.FieldTypes.DROPBOX, 'Dropbox field'],
				[barmatz.forms.fields.FieldTypes.PHONE, 'Phone field']
			], 
			function(item, index, collection)
			{
				model.addItem(barmatz.forms.factories.ModelFactory.createToolboxItemModel(item[0], item[1], barmatz.forms.factories.ModelFactory.createFieldModel(item[0], '')));
			}
		);
		barmatz.forms.factories.ControllerFactory.createToolboxController(model, view);
		barmatz.forms.factories.ControllerFactory.createBuilderToolboxController(formModel, model, view);
		return view;
	}
	
	function getWorkspace()
	{
		var wrapper = barmatz.forms.factories.DOMFactory.createWorkspaceWrapper();
		barmatz.forms.factories.ControllerFactory.createBuilderWorkspaceController(builderPageModel, formModel, wrapper.formName, wrapper.saveStatus, wrapper.workspace, container);
		return wrapper.wrapper;
	}
	
	function getProperties()
	{
		var view = barmatz.forms.factories.DOMFactory.createProperties();
		barmatz.forms.factories.ControllerFactory.createBuilderPropertiesController(builderPageModel, view);
		return view;
	}
};
barmatz.forms.ui.BuilderPage.prototype = new barmatz.forms.ui.Page(); 
barmatz.forms.ui.BuilderPage.prototype.constructor = barmatz.forms.ui.BuilderPage; 