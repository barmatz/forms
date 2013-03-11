window.barmatz.forms.ui.BuilderController = function(model, view)
{
	barmatz.utils.DataTypes.isNotUndefined(model);
	barmatz.utils.DataTypes.isNotUndefined(view);
	barmatz.utils.DataTypes.isInstanceOf(model, barmatz.forms.ui.BuilderModel);
	barmatz.utils.DataTypes.isInstanceOf(view, HTMLElement);
	barmatz.mvc.Controller.call(this);
	
	model.addEventListener(barmatz.events.BuilderEvent.WORKSPACE_ITEM_ADDED, onModelWorkspaceItemAdded);
	model.addEventListener(barmatz.events.BuilderEvent.TOOLBOX_ITEM_ADDED, onModelToolboxItemAdded);
	model.addEventListener(barmatz.events.BuilderEvent.TOOLBOX_ITEM_REMOVED, onModelToolboxItemRemoved);
	model.addMenuItem('New', onMenuNewItemClick);
	model.addMenuItem('Load', onMenuLoadItemClick);
	model.addMenuItem('Save', onMenuSaveItemClick);
	model.addMenuItem('Save as', onMenuSaveAsItemClick);
	model.addMenuItem('Rename', onMenuRenameItemClick);
	model.addMenuItem('Export', onMenuExportItemClick);
	model.addToolboxItem(barmatz.forms.fields.FieldTypes.TEXT, 'Text field');
	model.addToolboxItem(barmatz.forms.fields.FieldTypes.PASSWORD, 'Password field');
	model.addToolboxItem(barmatz.forms.fields.FieldTypes.CHECKBOX, 'Checkbox');
	model.addToolboxItem(barmatz.forms.fields.FieldTypes.RADIO, 'Radio button');
	//model.addToolboxItem(barmatz.forms.fields.FieldTypes.FILE, 'File field');
	//model.addToolboxItem(barmatz.forms.fields.FieldTypes.HIDDEN, 'Hidden field');
	
	model.formName = 'Unnamed form';
	
	view.appendChild(model.menuView);
	view.appendChild(barmatz.forms.factories.DOMFactory.createBuilderPanels([
		barmatz.forms.factories.ModelFactory.createPanelModel('forms-builder-toolbox-panel', model.toolboxView), 
		barmatz.forms.factories.ModelFactory.createPanelModel('forms-builder-workspace-panel', model.workspaceView), 
		barmatz.forms.factories.ModelFactory.createPanelModel('forms-builder-properties-panel', model.propertiesPanelView)
	]));
	
	function addToolboxViewItemListeners(item)
	{
		barmatz.utils.DataTypes.isNotUndefined(item);
		barmatz.utils.DataTypes.isInstanceOf(item, HTMLElement);
		item.addEventListener('click', onModelToolboxViewItemClick);
	}
	
	function removeToolboxViewItemListeners(item)
	{
		barmatz.utils.DataTypes.isNotUndefined(item);
		barmatz.utils.DataTypes.isInstanceOf(item, HTMLElement);
		item.removeEventListener('click', onModelToolboxViewItemClick);
	}
	
	function onModelToolboxItemAdded(event)
	{
		barmatz.utils.DataTypes.isNotUndefined(event);
		barmatz.utils.DataTypes.isInstanceOf(event, barmatz.events.BuilderEvent);
		addToolboxViewItemListeners(model.getToolboxItemViewAt(event.index));
	}
	
	function onModelToolboxItemRemoved(event)
	{
		barmatz.utils.DataTypes.isNotUndefined(event);
		barmatz.utils.DataTypes.isInstanceOf(event, barmatz.events.BuilderEvent);
		removeToolboxViewItemListeners(toolboxView.childNodes[event.index]);
	}

	function onModelToolboxViewItemClick(event)
	{
		barmatz.utils.DataTypes.isNotUndefined(event);
		barmatz.utils.DataTypes.isInstanceOf(event, MouseEvent);
		model.workspaceViewClickHandler = onModelWorkspaceViewClick;
		model.addWorkspaceItemFromToolbox(event.target);
		event.stopImmediatePropagation();
	}
	
	function onModelWorkspaceItemAdded(event)
	{
		barmatz.utils.DataTypes.isNotUndefined(event);
		barmatz.utils.DataTypes.isInstanceOf(event, barmatz.events.BuilderEvent);
		model.workspaceViewItemClickHandler = onModelWorkspaceViewItemClick;
		model.setWorkspaceViewItemClickHandlerAt(event.index, onModelWorkspaceViewItemClick);
	}
	
	function onModelWorkspaceViewItemClick(event)
	{
		barmatz.utils.DataTypes.isNotUndefined(event);
		barmatz.utils.DataTypes.isInstanceOf(event, MouseEvent);
		event.stopImmediatePropagation();
		model.workspaceViewClickHandler = onModelWorkspaceViewClick;
		model.propertiesPanelControllerModel = model.getWorkspaceModelItemFromView(event.currentTarget);
	}
	
	function onModelWorkspaceViewClick(event)
	{
		model.propertiesPanelControllerModel = null;
		model.workspaceViewClickHandler = null;
	}
	
	function onMenuNewItemClick(event)
	{
		console.log('new');
	}
	
	function onMenuRenameItemClick(event)
	{
		var field = barmatz.forms.factories.DOMFactory.createChangePropertyPromptDialog('Rename', 'name', model.formName, onRenameConfirm, true).field;
		
		function onRenameConfirm(event)
		{
			model.formName = field.value;
		}
	}
	
	function onMenuSaveItemClick(event)
	{
		console.log('save');
	}
	
	function onMenuSaveAsItemClick(event)
	{
		console.log('save as');
	}
	
	function onMenuLoadItemClick(event)
	{
		console.log('load');
	}
	
	function onMenuExportItemClick(event)
	{
		console.log('export');
	}
};

barmatz.forms.ui.BuilderController.prototype = new barmatz.mvc.Controller();
barmatz.forms.ui.BuilderController.prototype.constructor = barmatz.forms.ui.BuilderController;