/** barmatz.forms.ui.PromptDialogController **/
window.barmatz.forms.ui.PromptDialogController = function(model, view)
{
	barmatz.utils.DataTypes.isNotUndefined(model);
	barmatz.utils.DataTypes.isNotUndefined(view);
	barmatz.utils.DataTypes.isInstanceOf(model, barmatz.mvc.Model, true);
	barmatz.utils.DataTypes.isInstanceOf(view, HTMLElement, true);
	barmatz.forms.ui.DialogController.call(this, model, view);
};

barmatz.forms.ui.PromptDialogController.prototype = new barmatz.forms.ui.DialogController(null, null);
barmatz.forms.ui.PromptDialogController.prototype.constructor = barmatz.forms.ui.PromptDialogController;

Object.defineProperties(barmatz.forms.ui.PromptDialogController.prototype, 
{
	_submitDialog: {value: function()
	{
		throw new Error('method must be overridden');
	}}
});