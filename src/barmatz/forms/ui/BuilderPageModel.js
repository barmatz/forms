/** barmatz.forms.ui.BuilderPageModel **/
barmatz.forms.ui.BuilderPageModel = function()
{
	barmatz.mvc.Model.call(this);
	this.set('selectedFormItem', null);
};
barmatz.forms.ui.BuilderPageModel.prototype = new barmatz.mvc.Model();
barmatz.forms.ui.BuilderPageModel.prototype.constructor = barmatz.forms.ui.BuilderPageModel;
barmatz.forms.ui.BuilderPageModel.prototype.getSelectedFormItem = function()
{
	return this.get('selectedFormItem');
};
barmatz.forms.ui.BuilderPageModel.prototype.setSelectedFormItem = function(value)
{
	this.set('selectedFormItem', value);
};