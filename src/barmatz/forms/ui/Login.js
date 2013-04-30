/** barmatz.forms.ui.Login **/
barmatz.forms.ui.Login = function()
{
	var loginFormWrapper = barmatz.forms.factories.DOMFactory.createLoginFormDialogWrapper();
	barmatz.forms.factories.ControllerFactory.createJQueryDialogController(loginFormWrapper.dialog);
	barmatz.forms.factories.ControllerFactory.createLoginController(barmatz.forms.factories.ModelFactory.createUserModel(), loginFormWrapper.userNameField, loginFormWrapper.passwordField, loginFormWrapper.submitButton, loginFormWrapper.errorField);
};