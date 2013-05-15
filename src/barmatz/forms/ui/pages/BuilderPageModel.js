/** barmatz.forms.ui.pages.BuilderPageModel **/
barmatz.forms.ui.pages.BuilderPageModel = function()
{
	barmatz.forms.ui.pages.PageModel.call(this);
	this.set('selectedFormItem', null);
};
barmatz.forms.ui.pages.BuilderPageModel.prototype = new barmatz.forms.ui.pages.PageModel();
barmatz.forms.ui.pages.BuilderPageModel.prototype.constructor = barmatz.forms.ui.pages.BuilderPageModel;
barmatz.forms.ui.pages.BuilderPageModel.prototype.getSelectedFormItem = function()
{
	return this.get('selectedFormItem');
};
barmatz.forms.ui.pages.BuilderPageModel.prototype.setSelectedFormItem = function(value)
{
	this.set('selectedFormItem', value);
};