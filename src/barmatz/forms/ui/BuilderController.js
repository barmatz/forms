/** barmatz.forms.ui.BuilderController **/
window.barmatz.forms.ui.BuilderController = function(formModel, containerView, panelsView, formNameView, saveStatusView, menuView, toolboxModel, toolboxView, workspaceView, propertiesController)
{
	barmatz.utils.DataTypes.isNotUndefined(formModel);
	barmatz.utils.DataTypes.isNotUndefined(containerView);
	barmatz.utils.DataTypes.isNotUndefined(panelsView);
	barmatz.utils.DataTypes.isNotUndefined(formNameView);
	barmatz.utils.DataTypes.isNotUndefined(saveStatusView);
	barmatz.utils.DataTypes.isNotUndefined(menuView);
	barmatz.utils.DataTypes.isNotUndefined(toolboxModel);
	barmatz.utils.DataTypes.isNotUndefined(toolboxView);
	barmatz.utils.DataTypes.isNotUndefined(workspaceView);
	barmatz.utils.DataTypes.isNotUndefined(propertiesController);
	barmatz.utils.DataTypes.isInstanceOf(formModel, barmatz.forms.FormModel);
	barmatz.utils.DataTypes.isInstanceOf(containerView, HTMLElement);
	barmatz.utils.DataTypes.isInstanceOf(panelsView, HTMLElement);
	barmatz.utils.DataTypes.isInstanceOf(formNameView, HTMLElement);
	barmatz.utils.DataTypes.isInstanceOf(saveStatusView, HTMLElement);
	barmatz.utils.DataTypes.isInstanceOf(menuView, HTMLElement);
	barmatz.utils.DataTypes.isInstanceOf(toolboxModel, barmatz.forms.ui.ToolboxModel);
	barmatz.utils.DataTypes.isInstanceOf(toolboxView, HTMLElement);
	barmatz.utils.DataTypes.isInstanceOf(workspaceView, HTMLElement);
	barmatz.utils.DataTypes.isInstanceOf(propertiesController, barmatz.forms.ui.PropertiesController);
	barmatz.mvc.Controller.call(this);
	
	initForm();
	initMenu();
	initPanels();
	initToolbox();
	
	function initForm()
	{
		formModel.addEventListener(barmatz.events.ModelEvent.VALUE_CHANGED, onFormModelValueChanged);
		formModel.addEventListener(barmatz.events.CollectionEvent.ITEM_ADDED, onFormModelItemAdded);
		formModel.addEventListener(barmatz.events.CollectionEvent.ITEM_REMOVED, onFormModelItemRemoved);
		updateFormName();
	}
	
	function initMenu()
	{
		containerView.appendChild(menuView);
	}
	
	function initPanels()
	{
		containerView.appendChild(panelsView);
	}
	
	function initToolbox()
	{
		toolboxModel.addEventListener(barmatz.events.CollectionEvent.ITEM_ADDED, onToolboxModelItemAdded);
		toolboxModel.addEventListener(barmatz.events.CollectionEvent.ITEM_REMOVED, onToolboxModelItemRemoved);
		toolboxModel.forEach(iterateToolboxModelItems);
	}
	
	function iterateToolboxModelItems(item, index, collection)
	{
		addToolboxItemListeners(index);
	}
	
	function addToolboxItemListeners(index)
	{
		barmatz.utils.DataTypes.isNotUndefined(index);
		barmatz.utils.DataTypes.isTypeOf(index, 'number');
		toolboxView.childNodes[index].addEventListener('click', onToolboxItemViewClick);
	}
	
	function removeToolboxItemListeners(index)
	{
		barmatz.utils.DataTypes.isNotUndefined(index);
		barmatz.utils.DataTypes.isTypeOf(index, 'number');
		toolboxView.childNodes[index].removeEventListener('click', onToolboxItemViewClick);
	}
	
	function updateFormName()
	{
		formNameView.innerHTML = formModel.name;
	}
	
	function onFormModelValueChanged(event)
	{
		barmatz.utils.DataTypes.isNotUndefined(event);
		barmatz.utils.DataTypes.isInstanceOf(event, barmatz.events.ModelEvent);
		updateFormName();
	}
	
	function onToolboxModelItemAdded(event)
	{
		barmatz.utils.DataTypes.isNotUndefined(event);
		barmatz.utils.DataTypes.isInstanceOf(event, barmatz.events.CollectionEvent);
		addToolboxItemListeners(event.item);
	}
	
	function onToolboxModelItemAdded(event)
	{
		barmatz.utils.DataTypes.isNotUndefined(event);
		barmatz.utils.DataTypes.isInstanceOf(event, barmatz.events.CollectionEvent);
		addToolboxItemListeners(event.index);
	}
	
	function onToolboxModelItemRemoved(event)
	{
		barmatz.utils.DataTypes.isNotUndefined(event);
		barmatz.utils.DataTypes.isInstanceOf(event, barmatz.events.CollectionEvent);
		removeToolboxItemListeners(event.index);
	}
	
	function onToolboxItemViewClick(event)
	{
		barmatz.utils.DataTypes.isNotUndefined(event);
		barmatz.utils.DataTypes.isInstanceOf(event, MouseEvent);
		formModel.addItem(toolboxModel.getItemAt(Array.prototype.slice.call(toolboxView.childNodes).indexOf(event.target)).fieldModel.clone());
	}
	
	function onFormModelItemAdded(event)
	{
		barmatz.utils.DataTypes.isNotUndefined(event);
		barmatz.utils.DataTypes.isInstanceOf(event, barmatz.events.CollectionEvent);
		propertiesController.model = event.item;
		workspaceView.childNodes[event.index].addEventListener('click', onWorkspaceViewItemClick);
	}
	
	function onFormModelItemRemoved(event)
	{
		barmatz.utils.DataTypes.isNotUndefined(event);
		barmatz.utils.DataTypes.isInstanceOf(event, barmatz.events.CollectionEvent);
		propertiesController.model = formModel.numItems > 0 ? formModel.getItemAt(event.index - 1) : null;
	}
	
	function onWorkspaceViewItemClick(event)
	{
		barmatz.utils.DataTypes.isNotUndefined(event);
		barmatz.utils.DataTypes.isInstanceOf(event, MouseEvent);
		propertiesController.model = formModel.getItemAt(Array.prototype.slice.call(workspaceView.childNodes).indexOf(event.currentTarget));
	}
};

barmatz.forms.ui.BuilderController.prototype = new barmatz.mvc.Controller();
barmatz.forms.ui.BuilderController.prototype.constructor = barmatz.forms.ui.BuilderController;