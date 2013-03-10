/** barmatz.forms.ui.JQueryPromptDialogController **/
window.barmatz.forms.ui.JQueryPromptDialogController = function(model, view)
{
	var _this = this;
	
	barmatz.utils.DataTypes.isNotUndefined(model);
	barmatz.utils.DataTypes.isNotUndefined(view);
	barmatz.utils.DataTypes.isInstanceOf(model, barmatz.mvc.Model, true);
	barmatz.utils.DataTypes.isInstanceOf(view, HTMLElement, true);
	barmatz.forms.ui.PromptDialogController.call(this, model, view);
	
	if(view)
	{
		view.addEventListener('keydown', onViewKeyDown);
		jQuery(view).dialog({buttons: {Ok: onViewOk}});
	}
	
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

barmatz.forms.ui.JQueryPromptDialogController.prototype = new barmatz.forms.ui.PromptDialogController(null, null);
barmatz.forms.ui.JQueryPromptDialogController.prototype.constructor = barmatz.forms.ui.JQueryPromptDialogController;

Object.defineProperties(barmatz.forms.ui.JQueryPromptDialogController.prototype, {});