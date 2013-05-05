/** barmatz.forms.ui.ContentModel **/
barmatz.forms.ui.ContentModel = function()
{
	barmatz.mvc.Model.call(this);
	this.set('content', '');
};
barmatz.forms.ui.ContentModel.prototype = new barmatz.mvc.Model();
barmatz.forms.ui.ContentModel.prototype.constructor = barmatz.forms.ui.ContentModel;
barmatz.forms.ui.ContentModel.prototype.getContent = function()
{
	return this.get('content');
};
barmatz.forms.ui.ContentModel.prototype.setContent = function(value)
{
	this.set('content', value != null ? value : '');
};