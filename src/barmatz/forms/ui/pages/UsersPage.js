/** barmatz.forms.ui.pages.UsersPage **/
barmatz.forms.ui.pages.UsersPage = function(container)
{
	var _this, pageModel, newUserView, findUserView, allUsersView;
	
	barmatz.utils.DataTypes.isInstanceOf(container, window.HTMLElement, true);
	
	if(!container)
		container = barmatz.forms.factories.DOMFactory.getBodyElement();
	
	barmatz.forms.ui.pages.Page.call(this, container);
	
	_this = this;
	
	initModels();
	initUI();
	initController();
	
	function initModels()
	{
		initPageModel();
	}
	
	function initUI()
	{
		initMenu();
		initNewUser();
		initFindUser();
		initAllUsers();
	}
	
	function initController()
	{
		barmatz.forms.factories.ControllerFactory.createUsersPageController(pageModel, _this._contentModel, newUserView, findUserView, allUsersView);
	}
	
	function initPageModel()
	{
		pageModel = barmatz.forms.factories.ModelFactory.createUsersPageModel();
	}
	
	function initMenu()
	{
		barmatz.utils.Array.forEach(
			['New', 'Find', 'View all'], 
			function(item, index, collection)
			{
				this.addItem(barmatz.forms.factories.ModelFactory.createMenuItemModel(item, function(){}));
			},
			_this._menuModel
		);
		barmatz.forms.factories.ControllerFactory.createUsersMenuController(pageModel, _this._menuView.children[0], _this._menuView.children[1], _this._menuView.children[2]);
	}
	
	function initNewUser()
	{
		var form = new barmatz.forms.users.UserForm();
		form.setFormURL(barmatz.forms.Config.BASE_URL + '/api/user/new.php');
		newUserView = form.getElement();
	}
	
	function initFindUser(){}
	
	function initAllUsers(){}
};	
barmatz.forms.ui.pages.UsersPage.prototype = new barmatz.forms.ui.pages.Page();
barmatz.forms.ui.pages.UsersPage = barmatz.forms.ui.pages.UsersPage;