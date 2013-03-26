/** barmatz.forms.ui.MenuController **/
window.barmatz.forms.ui.MenuController = function(model, iconView, itemsView)
{
	var cachedItemsViewDisplay, menuInitiated;
	
	barmatz.utils.DataTypes.isNotUndefined(model);
	barmatz.utils.DataTypes.isNotUndefined(iconView);
	barmatz.utils.DataTypes.isNotUndefined(itemsView);
	barmatz.utils.DataTypes.isInstanceOf(model, barmatz.forms.ui.MenuModel);
	barmatz.utils.DataTypes.isInstanceOf(iconView, HTMLElement);
	barmatz.utils.DataTypes.isInstanceOf(itemsView, HTMLElement);
	barmatz.forms.CollectionController.call(this);

	initModel();
	initViews();
	
	function initModel()
	{
		model.addEventListener(barmatz.events.ModelEvent.VALUE_CHANGED, onModelValueChanged);
		model.addEventListener(barmatz.events.CollectionEvent.ITEM_ADDED, onModelItemAdded);
		model.addEventListener(barmatz.events.CollectionEvent.ITEM_REMOVED, onModelItemRemoved);
		model.forEach(iterateModelItems);
	}
	
	function initViews()
	{
		iconView.addEventListener('click', onIconViewClick);
		jQuery(itemsView).menu();
		showOrHideItems();
	}
	
	function showItems()
	{
		itemsView.style.display = cachedItemsViewDisplay || 'block';
		cachedItemsViewDisplay = null;
		window.addEventListener('click', onWindowClick);
	}
	
	function hideItems()
	{
		cachedItemsViewDisplay = barmatz.utils.CSS.getStyle(itemsView).display;
		itemsView.style.display = 'none';
		window.removeEventListener('click', onWindowClick);
	}
	
	function iterateModelItems(item, index, collection)
	{
		addModelItemToView(item);
	}
	
	function addModelItemToView(model)
	{
		barmatz.utils.DataTypes.isNotUndefined(model);
		barmatz.utils.DataTypes.isInstanceOf(model, barmatz.forms.ui.MenuItemModel);
		itemsView.appendChild(barmatz.forms.factories.DOMFactory.createMenuItem(model)).addEventListener('click', model.clickHandler);
		
		if(menuInitiated)
			jQuery(itemsView).menu('destroy');
		else
			menuInitiated = true;
		
		jQuery(itemsView).menu();
		showOrHideItems();
	}
	
	function removeModelItemFromView(element)
	{
		barmatz.utils.DataTypes.isNotUndefined(element);
		barmatz.utils.DataTypes.isInstanceOf(element, HTMLElement);
		itemsView.removeChild(element);
		element.removeEventListener('click', model.clickHandler);
	}
	
	function showOrHideItems()
	{
		model.opened ? showItems() : hideItems();
	}
	
	function onModelValueChanged(event)
	{
		barmatz.utils.DataTypes.isNotUndefined(event);
		barmatz.utils.DataTypes.isInstanceOf(event, barmatz.events.ModelEvent);
		
		switch(event.key)
		{
			case 'opened':
				showOrHideItems();
				break;
		}
	}
	
	function onModelItemAdded(event)
	{
		barmatz.utils.DataTypes.isNotUndefined(event);
		barmatz.utils.DataTypes.isInstanceOf(event, barmatz.events.CollectionEvent);
		addModelItemToView(event.target.getItemAt(event.index));
	}
	
	function onModelItemRemoved(event)
	{
		barmatz.utils.DataTypes.isNotUndefined(event);
		barmatz.utils.DataTypes.isInstanceOf(event, barmatz.events.CollectionEvent);
		removeModelItemFromView(view.childNodes[event.index]);
	}
	
	function onIconViewClick(event)
	{
		barmatz.utils.DataTypes.isNotUndefined(event);
		barmatz.utils.DataTypes.isInstanceOf(event, MouseEvent);
		model.toggle();
	}
	
	function onWindowClick(event)
	{
		barmatz.utils.DataTypes.isNotUndefined(event);
		barmatz.utils.DataTypes.isInstanceOf(event, MouseEvent);
		
		if(event.target != iconView && !barmatz.utils.DOM.isChildOf(event.target, iconView))
			model.hide();
	}
};

barmatz.forms.ui.MenuController.prototype = new barmatz.forms.CollectionController();
barmatz.forms.ui.MenuController.prototype.constructor = barmatz.forms.ui.MenuController;

Object.defineProperties(barmatz.forms.ui.MenuController.prototype, {});