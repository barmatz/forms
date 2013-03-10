window.barmatz.forms.ui.BuilderController = function(model, view)
{
	barmatz.utils.DataTypes.isNotUndefined(model);
	barmatz.utils.DataTypes.isNotUndefined(view);
	barmatz.utils.DataTypes.isInstanceOf(model, barmatz.forms.ui.BuilderModel);
	barmatz.utils.DataTypes.isInstanceOf(view, HTMLElement);
	barmatz.mvc.Controller.call(this);
	
	window.addEventListener('resize', onWindowResize);
	model.addEventListener(barmatz.events.BuilderEvent.WORKSPACE_ITEM_ADDED, onModelWorkspaceItemAdded);
	model.addEventListener(barmatz.events.BuilderEvent.TOOLBOX_ITEM_ADDED, onModelToolboxItemAdded);
	model.addEventListener(barmatz.events.BuilderEvent.TOOLBOX_ITEM_REMOVED, onModelToolboxItemRemoved);
	model.addMenuItem('New', onMenuNewClick);
	model.addMenuItem('Save', onMenuSaveClick);
	model.addMenuItem('Export', onMenuExportClick);
	model.addToolboxItem(barmatz.forms.fields.FieldTypes.TEXT, 'Text field');
	model.addToolboxItem(barmatz.forms.fields.FieldTypes.PASSWORD, 'Password field');
	model.addToolboxItem(barmatz.forms.fields.FieldTypes.CHECKBOX, 'Checkbox');
	model.addToolboxItem(barmatz.forms.fields.FieldTypes.RADIO, 'Radio button');
	model.addToolboxItem(barmatz.forms.fields.FieldTypes.FILE, 'File field');
	model.addToolboxItem(barmatz.forms.fields.FieldTypes.HIDDEN, 'Hidden field');
	view.appendChild(model.menuView);
	view.appendChild(model.toolboxView);
	view.appendChild(model.workspaceView);
	view.appendChild(model.propertiesPanelView);
	
	resizeUI();
	
	function resizeUI()
	{
		var workspaceStyle = barmatz.utils.CSS.getStyle(model.workspaceView);
		model.workspaceView.style.width = barmatz.utils.Window.width - barmatz.utils.CSS.absoluteWidth(model.toolboxView) - barmatz.utils.CSS.absoluteWidth(model.propertiesPanelView) - barmatz.utils.CSS.unitToPixal(model.workspaceView, workspaceStyle.borderLeft) - barmatz.utils.CSS.unitToPixal(model.workspaceView, workspaceStyle.borderRight) + 'px';
	}
	
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
	
	function onWindowResize(event)
	{
		resizeUI();
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
	
	function onMenuNewClick(event)
	{
		console.log('new');
	}
	
	function onMenuSaveClick(event)
	{
		console.log('save');
	}
	
	function onMenuExportClick(event)
	{
		console.log('exprot');
	}
};

barmatz.forms.ui.BuilderController.prototype = new barmatz.mvc.Controller();
barmatz.forms.ui.BuilderController.prototype.constructor = barmatz.forms.ui.BuilderController;