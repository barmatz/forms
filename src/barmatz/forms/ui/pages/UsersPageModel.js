/** barmatz.forms.ui.pages.UsersPageModel **/
barmatz.forms.ui.pages.UsersPageModel = function()
{
	barmatz.forms.ui.pages.PageModel.call(this);
};
barmatz.forms.ui.pages.UsersPageModel.NEW_USER_STATE = 'newUserState';
barmatz.forms.ui.pages.UsersPageModel.FIND_USER_STATE = 'findUserState';
barmatz.forms.ui.pages.UsersPageModel.ALL_USERS_STATE = 'allUsersState';
barmatz.forms.ui.pages.UsersPageModel.prototype = new barmatz.forms.ui.pages.PageModel();
barmatz.forms.ui.pages.UsersPageModel.prototype.constructor = barmatz.forms.ui.pages.UsersPageModel;