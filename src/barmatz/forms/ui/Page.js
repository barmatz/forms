/** barmatz.forms.ui.Page **/
barmatz.forms.ui.Page = function(container)
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
		_this.contentModel = barmatz.forms.factories.ModelFactory.createContentModel();
		_this._contentView = container.appendChild(barmatz.forms.factories.DOMFactory.createElement('div', 'forms-page'));
		barmatz.forms.factories.ControllerFactory.createContentController(_this.contentModel, _this._contentView);
	}
};