/** barmatz.forms.ui.NewFieldDialogController **/
window.barmatz.forms.ui.NewFieldDialogController = function(model, view, nameFieldView, labelFieldView)
{
	barmatz.utils.DataTypes.isNotUndefined(model);
	barmatz.utils.DataTypes.isNotUndefined(view);
	barmatz.utils.DataTypes.isNotUndefined(nameFieldView);
	barmatz.utils.DataTypes.isNotUndefined(labelFieldView);
	barmatz.utils.DataTypes.isInstanceOf(model, barmatz.mvc.Model);
	barmatz.utils.DataTypes.isInstanceOf(view, HTMLElement);
	barmatz.utils.DataTypes.isInstanceOf(nameFieldView, HTMLInputElement);
	barmatz.utils.DataTypes.isInstanceOf(labelFieldView, HTMLInputElement);
	barmatz.forms.ui.JQueryPromptDialogController.call(this, model, view);
	
	this._nameFieldView = nameFieldView;
	this._labelFieldView = labelFieldView;
};

barmatz.forms.ui.NewFieldDialogController.prototype = new barmatz.forms.ui.JQueryPromptDialogController(null, null);
barmatz.forms.ui.NewFieldDialogController.prototype.constructor = barmatz.forms.ui.NewFieldDialogController;

Object.defineProperties(barmatz.forms.ui.NewFieldDialogController.prototype, 
{
	_submitDialog: {value: function()
	{
		this._model.name = this._nameFieldView.value;
		this._model.label = this._labelFieldView.value;
		barmatz.forms.factories.DOMFactory.destroyDialog(this._view);
	}}
});