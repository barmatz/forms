/** barmatz.forms.ui.MenuController **/
barmatz.forms.ui.MenuController = function(model, iconView, itemsView)
{
	var cachedItemsViewDisplay, menuInitiated;
	
	barmatz.utils.DataTypes.isInstanceOf(model, barmatz.forms.ui.MenuModel);
	barmatz.utils.DataTypes.isInstanceOf(iconView, window.HTMLElement);
	barmatz.utils.DataTypes.isInstanceOf(itemsView, window.HTMLElement);
	barmatz.forms.CollectionController.call(this, model, itemsView);

	initModel();
	initViews();
	
	function initModel()
	{
		model.addEventListener(barmatz.events.ModelEvent.VALUE_CHANGED, onModelValueChanged);
		model.addEventListener(barmatz.events.CollectionEvent.ITEM_ADDED, onModelItemAdded);
		model.forEach(iterateModelItems);
		model.hide();
	}
	
	function initViews()
	{
		iconView.addEventListener('click', onIconViewClick);
		jQuery(itemsView).menu();
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
		if(menuInitiated)
			jQuery(itemsView).menu('destroy');
		else
			menuInitiated = true;
		
		jQuery(itemsView).menu();
		toggleItems();
	}
	
	
	function toggleItems()
	{
		model.isOpen() ? showItems() : hideItems();
	}
	
	function onModelValueChanged(event)
	{
		barmatz.utils.DataTypes.isInstanceOf(event, barmatz.events.ModelEvent);
		
		switch(event.getKey())
		{
			case 'open':
				toggleItems();
				break;
		}
	}
	
	function onModelItemAdded(event)
	{
		barmatz.utils.DataTypes.isInstanceOf(event, barmatz.events.CollectionEvent);
		addModelItemToView(event.getTarget().getItemAt(event.getIndex()));
	}
	
	function onIconViewClick(event)
	{
		model.toggle();
	}
	
	function onWindowClick(event)
	{
		barmatz.utils.DataTypes.isInstanceOf(event, MouseEvent);
		
		if(event.target != iconView && !barmatz.utils.DOM.isChildOf(event.target, iconView))
			model.hide();
	}
};
barmatz.forms.ui.MenuController.prototype = new barmatz.forms.CollectionController(null, null);
barmatz.forms.ui.MenuController.prototype.constructor = barmatz.forms.ui.MenuController;
barmatz.forms.ui.MenuController.prototype._createItemViewFromModel = function(model)
{
	barmatz.utils.DataTypes.isInstanceOf(model, barmatz.forms.ui.MenuItemModel);
	item = barmatz.forms.factories.DOMFactory.createMenuItem(model);
	item.addEventListener('click', model.clickHandler);
	return item;
};