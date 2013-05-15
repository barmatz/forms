/** barmatz.forms.ui.pages.Page **/
barmatz.forms.ui.pages.Page = function(container)
{
	var _this;
	
	barmatz.utils.DataTypes.isInstanceOf(container, window.HTMLElement, true);
	
	_this = this;
	this._menuModel = null;
	this._menuView = null;
	this._contentModel = null;
	this._contentView = null;
	
	if(container)
	{
		initMenu();
		initContent();
		barmatz.forms.factories.ControllerFactory.createPageController(this._contentView);
	}
	
	function initMenu()
	{
		var viewWrapper = barmatz.forms.factories.DOMFactory.createMenuWrapper(); 
		_this._menuModel = barmatz.forms.factories.ModelFactory.createMenuModel();
		_this._menuView = viewWrapper.menu;
		barmatz.forms.factories.ControllerFactory.createMenuController(_this._menuModel, viewWrapper.icon, _this._menuView);
		container.appendChild(viewWrapper.wrapper);
	}
	
	function initContent()
	{
		_this._contentModel = barmatz.forms.factories.ModelFactory.createContentModel();
		_this._contentView = container.appendChild(barmatz.forms.factories.DOMFactory.createElement('div', 'forms-page'));
		barmatz.forms.factories.ControllerFactory.createContentController(_this._contentModel, _this._contentView);
	}
};