/** barmatz.forms.ui.BuilderMenuController **/
window.barmatz.forms.ui.BuilderMenuController = function(model, menuView, iconView)
{
	var menuOpened, menuInitiated, openedMenuDisplayStyleCache;
	
	barmatz.utils.DataTypes.isNotUndefined(model);
	barmatz.utils.DataTypes.isNotUndefined(menuView);
	barmatz.utils.DataTypes.isNotUndefined(iconView);
	barmatz.utils.DataTypes.isInstanceOf(model, barmatz.forms.ui.MenuModel);
	barmatz.utils.DataTypes.isInstanceOf(menuView, HTMLElement);
	barmatz.utils.DataTypes.isInstanceOf(iconView, HTMLElement);
	barmatz.forms.CollectionController.call(this, model, menuView);
	closeMenu();
	
	if(model)
	{
		model.addEventListener(barmatz.events.CollectionEvent.ITEM_ADDED, onModelItemAdded);
		setViewAsMenu();
	}
	
	function setViewAsMenu()
	{
		if(menuInitiated)
			jQuery(menuView).menu('destroy');
		else
			menuInitiated = true;
		
		jQuery(menuView).menu();
		menuOpened ? openMenu() : closeMenu();
	}
	
	function openMenu()
	{
		menuOpened = true;
		menuView.style.display = openedMenuDisplayStyleCache;
		iconView.removeEventListener('click', onIconViewClick);
		window.addEventListener('click', onWindowClick);
	}
	
	function closeMenu()
	{
		menuOpened = false;
		openedMenuDisplayStyleCache = menuView.style.display;
		menuView.style.display = 'none';
		iconView.addEventListener('click', onIconViewClick);
		window.removeEventListener('click', onWindowClick);
	}
	
	function onIconViewClick(event)
	{
		openMenu();
	}
	
	function onWindowClick(event)
	{
		if(!barmatz.utils.DOM.isChildOf(event.target, iconView))
			closeMenu();
	}
	
	function onModelItemAdded(event)
	{
		barmatz.utils.DataTypes.isNotUndefined(event);
		barmatz.utils.DataTypes.isInstanceOf(event, barmatz.events.CollectionEvent);
		setViewAsMenu();
	}
};

barmatz.forms.ui.BuilderMenuController.prototype = new barmatz.forms.CollectionController(null, null);
barmatz.forms.ui.BuilderMenuController.prototype.constructor = barmatz.forms.ui.BuilderMenuController;

Object.defineProperties(barmatz.forms.ui.BuilderMenuController.prototype,
{
	_createItemViewFromModel: {value: function(model)
	{
		barmatz.utils.DataTypes.isNotUndefined(model);
		barmatz.utils.DataTypes.isInstanceOf(model, barmatz.forms.ui.MenuItemModel);
		return barmatz.forms.factories.DOMFactory.createBuilderMenuItem(model);
	}}
});