/** barmatz.forms.ui.UsersMenuController **/
barmatz.forms.ui.UsersMenuController = function(pageModel, newButtonView, findButtonView, allButtonView)
{
	barmatz.utils.DataTypes.isInstanceOf(pageModel, barmatz.forms.ui.pages.UsersPageModel);
	barmatz.utils.DataTypes.isInstanceOf(newButtonView, window.HTMLElement);
	barmatz.utils.DataTypes.isInstanceOf(findButtonView, window.HTMLElement);
	barmatz.utils.DataTypes.isInstanceOf(allButtonView, window.HTMLElement);
	barmatz.mvc.Controller.call(this);
	
	newButtonView.addEventListener('click', onNewButtonViewClick);
	findButtonView.addEventListener('click', onFindButtonViewClick);
	allButtonView.addEventListener('click', onAllButtonViewClick);
	
	function onNewButtonViewClick(event)
	{
		pageModel.setState(barmatz.forms.ui.pages.UsersPageModel.NEW_USER_STATE);
	}
	
	function onFindButtonViewClick(event)
	{
		pageModel.setState(barmatz.forms.ui.pages.UsersPageModel.FIND_USER_STATE);
	}
	
	function onAllButtonViewClick(event)
	{
		pageModel.setState(barmatz.forms.ui.pages.UsersPageModel.ALL_USERS_STATE);
	}
};
barmatz.forms.ui.UsersMenuController.prototype = new barmatz.mvc.Controller();
barmatz.forms.ui.UsersMenuController.prototype.constructor = barmatz.forms.ui.UsersMenuController;