/** barmatz.forms.users.LoginController **/
barmatz.forms.users.LoginController = function(model, userNameFieldView, passwordFieldView, submitButtonView, errorFieldView, dialogContainerView)
{
	var errorFieldViewCachedDisplay, loadingView;
	
	barmatz.utils.DataTypes.isInstanceOf(model, barmatz.forms.users.UserModel);
	barmatz.utils.DataTypes.isInstanceOf(userNameFieldView, HTMLInputElement);
	barmatz.utils.DataTypes.isInstanceOf(passwordFieldView, HTMLInputElement);
	barmatz.utils.DataTypes.isInstanceOf(submitButtonView, window.HTMLElement);
	barmatz.utils.DataTypes.isInstanceOf(errorFieldView, window.HTMLElement);
	barmatz.utils.DataTypes.isInstanceOf(dialogContainerView, window.HTMLElement, true);
	barmatz.mvc.Controller.call(this);
	
	hideErrorFieldView();
	waitingForInput();
	
	function showErrorFieldView() 
	{
		errorFieldView.style.display = errorFieldViewCachedDisplay;
		errorFieldViewCachedDisplay = null;
	}
	
	function hideErrorFieldView() 
	{
		errorFieldViewCachedDisplay = errorFieldView.style.display;
		errorFieldView.style.display = 'none';
	}
	
	function showLoading()
	{
		loadingView = barmatz.forms.factories.DOMFactory.createLoadingDialog(dialogContainerView);
	}
	
	function hideLoading()
	{
		barmatz.forms.factories.DOMFactory.destroyLoadingDialog(loadingView);
		loadingView = null;
	}
	
	function waitingForServer()
	{
		model.addEventListener(barmatz.events.UserEvent.LOGIN_SUCCESS, onModelLoginSuccess);
		model.addEventListener(barmatz.events.UserEvent.LOGIN_FAIL, onModelLoginFail);
		submitButtonView.removeEventListener('click', onSubmitButtonClick);
		window.removeEventListener('keydown', onKeyDown);
	}
	
	function waitingForInput()
	{
		model.removeEventListener(barmatz.events.UserEvent.LOGIN_SUCCESS, onModelLoginSuccess);
		model.removeEventListener(barmatz.events.UserEvent.LOGIN_FAIL, onModelLoginFail);
		submitButtonView.addEventListener('click', onSubmitButtonClick);
		window.addEventListener('keydown', onKeyDown);
	}
	
	function submit()
	{
		showLoading();
		waitingForServer();
		model.login(userNameFieldView.value, passwordFieldView.value);
	}
	
	function onKeyDown(event)
	{
		barmatz.utils.DataTypes.isInstanceOf(event, KeyboardEvent);
		
		if(event.keyCode == 13)
			submit();
	}
	
	function onSubmitButtonClick(event)
	{
		submit();
	}
	
	function onModelLoginSuccess(event)
	{
		barmatz.utils.DataTypes.isInstanceOf(event, barmatz.events.UserEvent);
		
		location.href = event.getTargetURL();
		hideLoading();
		hideErrorFieldView();
		waitingForInput();
	}
	
	function onModelLoginFail(event)
	{
		passwordFieldView.value = '';
		hideLoading();
		showErrorFieldView();
		waitingForInput();
	}
};