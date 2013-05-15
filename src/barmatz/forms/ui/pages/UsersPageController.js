/** barmatz.forms.ui.pages.UsersPageController **/
barmatz.forms.ui.pages.UsersPageController = function(pageModel, contentModel, newUserView, findUserView, allUsersView)
{
	barmatz.utils.DataTypes.isInstanceOf(pageModel, barmatz.forms.ui.pages.UsersPageModel);
	barmatz.utils.DataTypes.isInstanceOf(contentModel, barmatz.forms.ui.ContentModel);
	barmatz.mvc.Controller.call(this);
	
	pageModel.addEventListener(barmatz.events.PageEvent.STATE_SWITCHED, onPageModelStateSwitched);
	
	function onPageModelStateSwitched(event)
	{
		var state = pageModel.getState();
		
		if(state)
			switch(state)
			{
				default:
					throw new Error('Unknown state');
				break;
				case barmatz.forms.ui.pages.UsersPageModel.NEW_USER_STATE:
					contentModel.setContent(newUserView);
					break;
				case barmatz.forms.ui.pages.UsersPageModel.FIND_USER_STATE:
					contentModel.setContent(findUserView);
					break;
				case barmatz.forms.ui.pages.UsersPageModel.ALL_USERS_STATE:
					contentModel.setContent(allUsersView);
					break;
			}
	}
};
barmatz.forms.ui.pages.UsersPageController.prototype = new barmatz.mvc.Controller();
barmatz.forms.ui.pages.UsersPageController.prototype.constructor = barmatz.forms.ui.pages.UsersPageController;