/** barmatz.forms.ui.JQueryPromptDialogController **/
barmatz.forms.ui.JQueryPromptDialogController = function(model, view, dialogContainerView)
{
	var _this = this;
	
	barmatz.utils.DataTypes.isInstanceOf(model, barmatz.mvc.Model, true);
	barmatz.utils.DataTypes.isInstanceOf(view, window.HTMLElement, true);
	barmatz.utils.DataTypes.isInstanceOf(dialogContainerView, window.HTMLElement, true);
	
	if(view && !barmatz.forms.factories.DOMFactory.isDialog(view))
		throw new Error('view is not a dialog');
		
	barmatz.forms.ui.PromptDialogController.call(this, model, view);
		
	if(view)
	{
		view.addEventListener('keydown', onViewKeyDown);
		jQuery(view).dialog({buttons: {Ok: onViewOk}});
	}
	
	function onViewOk(event)
	{
		_this._submitDialog(dialogContainerView);
	}
	
	function onViewKeyDown(event)
	{
		barmatz.utils.DataTypes.isInstanceOf(event, KeyboardEvent);
		
		if(event.keyCode == 13)
			_this._submitDialog(dialogContainerView);
	}
};
barmatz.forms.ui.JQueryPromptDialogController.prototype = new barmatz.forms.ui.PromptDialogController(null, null);
barmatz.forms.ui.JQueryPromptDialogController.prototype.constructor = barmatz.forms.ui.JQueryPromptDialogController;