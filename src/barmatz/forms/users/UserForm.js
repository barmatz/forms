/** barmatz.forms.users.UserForm **/
barmatz.forms.users.UserForm = function()
{
	var firstNameFieldModel, lastNameFieldModel, userNameFieldModel, password1FieldModel, password2FieldModel;

	barmatz.events.EventDispatcher.call(this);
	
	this._formModel = barmatz.forms.factories.ModelFactory.createFormModel();
	this._formModel.setLanguage('en');
	this._formModel.setDirection(barmatz.forms.Directions.LTR);
	this._formModel.setSubmitButtonLabel('Save');
	this._formModel.setMethod(barmatz.forms.Methods.POST);
	this._formModel.getData = function()
	{
		return {
			u: userNameFieldModel.getValue(),
			p: password1FieldModel.getValue(),
			f: firstNameFieldModel.getValue(),
			l: lastNameFieldModel.getValue()
		};
	};
	
	firstNameFieldModel = barmatz.forms.factories.ModelFactory.createFormFieldModel(barmatz.forms.fields.FieldTypes.TEXT_FIELD, 'firstName');
	firstNameFieldModel.setLabel('First name');
	firstNameFieldModel.setMandatory(true);
	this._formModel.addItem(firstNameFieldModel);
	
	lastNameFieldModel = barmatz.forms.factories.ModelFactory.createFormFieldModel(barmatz.forms.fields.FieldTypes.TEXT_FIELD, 'lastName');
	lastNameFieldModel.setLabel('Last name');
	lastNameFieldModel.setMandatory(true);
	this._formModel.addItem(lastNameFieldModel);
	
	userNameFieldModel = barmatz.forms.factories.ModelFactory.createFormFieldModel(barmatz.forms.fields.FieldTypes.TEXT_FIELD, 'userName');
	userNameFieldModel.setLabel('User name');
	userNameFieldModel.setMandatory(true);
	this._formModel.addItem(userNameFieldModel);
	
	password1FieldModel = barmatz.forms.factories.ModelFactory.createFormFieldModel(barmatz.forms.fields.FieldTypes.PASSWORD, 'password1');
	password1FieldModel.setLabel('Password');
	password1FieldModel.setMandatory(true);
	this._formModel.addItem(password1FieldModel);
	
	password2FieldModel = barmatz.forms.factories.ModelFactory.createFormFieldModel(barmatz.forms.fields.FieldTypes.PASSWORD, 'password2');
	password2FieldModel.setLabel('Repeat password');
	password2FieldModel.setMandatory(true);
	password2FieldModel.getValidator().setCode(barmatz.forms.Validator.EQUALS);
	password2FieldModel.getValidator().setErrorMessage('Passwords do not match');
	password2FieldModel.getValidator().equals = function()
	{
		return password1FieldModel.getValue();
	};
	this._formModel.addItem(password2FieldModel);
	
	this._formWrapper = barmatz.forms.factories.DOMFactory.createFormWrapper(this._formModel);
	
	barmatz.forms.factories.DOMFactory.formatButton(this._formWrapper.submitButton);
	barmatz.forms.factories.ControllerFactory.createFormController(this._formModel, this._formWrapper.form, this._formWrapper.submitButton);
};
barmatz.forms.users.UserForm.prototype = new barmatz.events.EventDispatcher();
barmatz.forms.users.UserForm.prototype.constructor = barmatz.forms.users.UserForm;
barmatz.forms.users.UserForm.prototype.getElement = function()
{
	return this._formWrapper.container;
};
barmatz.forms.users.UserForm.prototype.getFormURL = function()
{
	return this._formModel.getInternalAPI();
};
barmatz.forms.users.UserForm.prototype.setFormURL = function(value)
{
	barmatz.utils.DataTypes.isTypeOf(value, 'string');
	this._formModel.setInternalAPI(value);	
};