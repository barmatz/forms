window.barmatz.forms.ui.BuilderController = function(toolboxModel, toolboxView, workspaceModel, workspaceView, propertiesPanelController, propertiesPanelView)
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
	barmatz.mvc.Controller.call(this);
	
	window.addEventListener('resize', onWindowResize);
	workspaceModel.addEventListener(barmatz.events.CollectionEvent.ADDED, onWorkspaceModelAdded);
	workspaceModel.addEventListener(barmatz.events.CollectionEvent.REMOVED, onWorkspaceModelRemoved);
	toolboxModel.addEventListener(barmatz.events.CollectionEvent.ADDED, onToolboxModelAdded);
	toolboxModel.addEventListener(barmatz.events.CollectionEvent.REMOVED, onToolboxModelRemoved);
	forEachToolboxViewItem();
	resizeUI();
	
	function forEachToolboxViewItem()
	{
		var i = 0;
		for(; i < toolboxView.childNodes.length; i++)
			addToolboxViewItemListeners(toolboxView.childNodes[i]);
	}
	
	function addToolboxViewItemListeners(item)
	{
		barmatz.utils.DataTypes.isNotUndefined(item);
		barmatz.utils.DataTypes.isInstanceOf(item, HTMLElement);
		item.addEventListener('click', onToolboxViewItemClick);
	}
	
	function removeToolboxViewItemListeners(item)
	{
		barmatz.utils.DataTypes.isNotUndefined(item);
		barmatz.utils.DataTypes.isInstanceOf(item, HTMLElement);
		item.removeEventListener('click', onToolboxViewItemClick);
	}
	
	function getIndexOfView(view)
	{
		return Array.prototype.slice.call(view.parentElement.childNodes).indexOf(view);
	}
	
	function resizeUI()
	{
		workspaceView.style.width = (barmatz.utils.Window.width - barmatz.utils.CSS.absoluteWidth(toolboxView) - barmatz.utils.CSS.absoluteWidth(propertiesPanelView)) + 'px';
	}
	
	function onWindowResize(event)
	{
		resizeUI();
	}
	
	function onWorkspaceViewClick(event)
	{
		propertiesPanelController.model = null;
		workspaceView.removeEventListener('click', onWorkspaceViewClick);
	}
	
	function onToolboxViewItemClick(event)
	{
		barmatz.utils.DataTypes.isNotUndefined(event);
		barmatz.utils.DataTypes.isInstanceOf(event, MouseEvent);
		workspaceModel.addItem(toolboxModel.getFieldModelAt(getIndexOfView(event.target)).clone());
		event.stopImmediatePropagation();
		workspaceView.addEventListener('click', onWorkspaceViewClick);
	}
	
	function onWorkspaceViewItemClick(event)
	{
		barmatz.utils.DataTypes.isNotUndefined(event);
		barmatz.utils.DataTypes.isInstanceOf(event, MouseEvent);
		event.stopImmediatePropagation();
		workspaceView.addEventListener('click', onWorkspaceViewClick);
		propertiesPanelController.model = workspaceModel.getItemAt(getIndexOfView(event.currentTarget));
	}
	
	function onWorkspaceModelAdded(event)
	{
		barmatz.utils.DataTypes.isNotUndefined(event);
		barmatz.utils.DataTypes.isInstanceOf(event, barmatz.events.CollectionEvent);
		workspaceView.childNodes[event.index].addEventListener('click', onWorkspaceViewItemClick);
		propertiesPanelController.model = event.item;
	}
	
	function onWorkspaceModelRemoved(event)
	{
		barmatz.utils.DataTypes.isNotUndefined(event);
		barmatz.utils.DataTypes.isInstanceOf(event, barmatz.events.CollectionEvent);
		if(workspaceModel.numItems == 0)
			propertiesPanelController.model = null;
	}
	
	function onToolboxModelAdded(event)
	{
		barmatz.utils.DataTypes.isNotUndefined(event);
		barmatz.utils.DataTypes.isInstanceOf(event, barmatz.events.CollectionEvent);
		addToolboxViewItemListeners(toolboxView.childNodes[event.index]);
	}
	
	function onToolboxModelRemoved(event)
	{
		barmatz.utils.DataTypes.isNotUndefined(event);
		barmatz.utils.DataTypes.isInstanceOf(event, barmatz.events.CollectionEvent);
		removeToolboxViewItemListeners(toolboxView.childNodes[event.index]);
	}
};

barmatz.forms.ui.BuilderController.prototype = new barmatz.mvc.Controller();
barmatz.forms.ui.BuilderController.prototype.constructor = barmatz.forms.ui.BuilderController;

Object.defineProperties(barmatz.forms.ui.BuilderController.prototype, {});