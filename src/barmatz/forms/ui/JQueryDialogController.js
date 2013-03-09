/** barmatz.forms.ui.JQueryPromptDialogController **/
window.barmatz.forms.ui.JQueryPromptDialogController = function(model, view, fieldView)
{
	var _this = this;
	
	barmatz.utils.DataTypes.isNotUndefined(model);
	barmatz.utils.DataTypes.isNotUndefined(view);
	barmatz.utils.DataTypes.isNotUndefined(fieldView);
	barmatz.utils.DataTypes.isInstanceOf(model, barmatz.mvc.Model, true);
	barmatz.utils.DataTypes.isInstanceOf(view, HTMLElement, true);
	barmatz.utils.DataTypes.isInstanceOf(fieldView, HTMLInputElement, true);
	barmatz.forms.ui.PromptDialogController.call(this, model, view, fieldView);
	
	view.addEventListener('keydown', onViewKeyDown);
	jQuery(view).dialog({buttons: {Ok: onViewOk}});
	
	function onViewOk(event)
	{
		_this._submitDialog();
	}
	
	function onViewKeyDown(event)
	{
		if(event.keyCode == 13)
			_this._submitDialog();
	}
};

barmatz.forms.ui.JQueryPromptDialogController.prototype = new barmatz.forms.ui.PromptDialogController(null, null, null);
barmatz.forms.ui.JQueryPromptDialogController.prototype.constructor = barmatz.forms.ui.JQueryPromptDialogController;

Object.defineProperties(barmatz.forms.ui.JQueryPromptDialogController.prototype,
{
	_submitDialog: {value: function()
	{
		this._model.name = this._fieldView.value;
		barmatz.forms.factories.DOMFactory.destroyDialog(this._view);
	}}
});