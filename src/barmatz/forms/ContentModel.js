/** barmatz.forms.ContentModel **/
barmatz.forms.ContentModel = function()
{
	barmatz.mvc.Model.call(this);
	this.set('content', '');
};
barmatz.forms.ContentModel.prototype = new barmatz.mvc.Model();
barmatz.forms.ContentModel.prototype.constructor = barmatz.forms.ContentModel;
barmatz.forms.ContentModel.prototype.getContent = function()
{
	return this.get('content');
};
barmatz.forms.ContentModel.prototype.setContent = function(value)
{
	this.set('content', value != null ? value : '');
};