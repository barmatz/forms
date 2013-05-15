/** barmatz.forms.ui.NewFieldDialogController **/
barmatz.forms.ui.NewFieldDialogController = function(model, view, nameFieldView, labelFieldView, dialogContainerView)
{
	barmatz.utils.DataTypes.isInstanceOf(model, barmatz.forms.fields.FieldModel);
	barmatz.utils.DataTypes.isInstanceOf(view, window.HTMLElement);
	barmatz.utils.DataTypes.isInstanceOf(nameFieldView, HTMLInputElement);
	barmatz.utils.DataTypes.isInstanceOf(labelFieldView, HTMLInputElement);
	barmatz.forms.ui.jquery.JQueryPromptDialogController.call(this, model, view, dialogContainerView);
	
	this._nameFieldView = nameFieldView;
	this._labelFieldView = labelFieldView;
	this._errorDialog = null;
};
barmatz.forms.ui.NewFieldDialogController.prototype = new barmatz.forms.ui.jquery.JQueryPromptDialogController(null, null);
barmatz.forms.ui.NewFieldDialogController.prototype.constructor = barmatz.forms.ui.NewFieldDialogController;
barmatz.forms.ui.NewFieldDialogController.prototype._submitDialog = function(dialogContainerView)
{
	barmatz.utils.DataTypes.isInstanceOf(dialogContainerView, window.HTMLElement, true);

	if(barmatz.forms.Validator.notEmpty(this._nameFieldView.value))
	{
		if(this._errorDialog)
		{
			if(barmatz.forms.factories.DOMFactory.isDialog(this._errorDialog))
				barmatz.forms.factories.DOMFactory.destroyDialog(this._errorDialog);
			this._errorDialog = null;
		}

		this._model.setName(this._nameFieldView.value);
		this._model.setLabel(this._labelFieldView.value);
		barmatz.forms.factories.DOMFactory.destroyDialog(this._view);
	}
	else if(!this._errorDialog)
	{
		this._errorDialog = barmatz.forms.factories.DOMFactory.createAlertPromptDialog('Error', 'A field must have a name!', true, dialogContainerView);
		barmatz.forms.factories.ControllerFactory.createJQueryDialogController(this._errorDialog);
	}
};