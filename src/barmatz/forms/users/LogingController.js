/** barmatz.forms.users.LogingController **/
window.barmatz.forms.users.LogingController = function(model, userNameFieldView, passwordFieldView, submitButtonView, errorFieldView)
{
	var errorFieldViewCachedDisplay, loadingView;
	
	barmatz.utils.DataTypes.isNotUndefined(model);
	barmatz.utils.DataTypes.isNotUndefined(userNameFieldView);
	barmatz.utils.DataTypes.isNotUndefined(passwordFieldView);
	barmatz.utils.DataTypes.isNotUndefined(submitButtonView);
	barmatz.utils.DataTypes.isNotUndefined(errorFieldView);
	barmatz.utils.DataTypes.isInstanceOf(model, barmatz.forms.users.UserModel);
	barmatz.utils.DataTypes.isInstanceOf(userNameFieldView, HTMLElement);
	barmatz.utils.DataTypes.isInstanceOf(passwordFieldView, HTMLElement);
	barmatz.utils.DataTypes.isInstanceOf(submitButtonView, HTMLElement);
	barmatz.utils.DataTypes.isInstanceOf(errorFieldView, HTMLElement);
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
		loadingView = barmatz.forms.factories.DOMFactory.createLoadingDialog();
		barmatz.forms.factories.ControllerFactory.createJQueryDialogController(loadingView);
	}
	
	function hideLoading()
	{
		barmatz.forms.factories.DOMFactory.destroyLoadingDialog(loadingView);
		loadingView = null;
	}
	
	function waitingForServer()
	{
		model.addEventListener(barmatz.events.UserModelEvent.LOGIN_SUCCESS, onModelLoginSuccess);
		model.addEventListener(barmatz.events.UserModelEvent.LOGIN_FAIL, onModelLoginFail);
		submitButtonView.removeEventListener('click', onSubmitButtonClick);
		window.removeEventListener('keydown', onKeyDown);
	}
	
	function waitingForInput()
	{
		model.removeEventListener(barmatz.events.UserModelEvent.LOGIN_SUCCESS, onModelLoginSuccess);
		model.removeEventListener(barmatz.events.UserModelEvent.LOGIN_FAIL, onModelLoginFail);
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
		barmatz.utils.DataTypes.isNotUndefined(event);
		barmatz.utils.DataTypes.isInstanceOf(event, KeyboardEvent);
		
		if(event.keyCode == 13)
			submit();
	}
	
	function onSubmitButtonClick(event)
	{
		barmatz.utils.DataTypes.isNotUndefined(event);
		barmatz.utils.DataTypes.isInstanceOf(event, MouseEvent);
		submit();
	}
	
	function onModelLoginSuccess(event)
	{
		location.href = 'builder.php';
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