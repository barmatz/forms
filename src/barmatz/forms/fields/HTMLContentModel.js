/** barmatz.forms.fields.HTMLContentModel **/
barmatz.forms.fields.HTMLContentModel = function()
{
	barmatz.forms.fields.FormItemModel.call(this, barmatz.forms.fields.FieldTypes.HTML_CONTENT);
	this.set('content', '');
};
barmatz.forms.fields.HTMLContentModel.prototype = new barmatz.forms.fields.FormItemModel(null);
barmatz.forms.fields.HTMLContentModel.prototype.constructor = barmatz.forms.fields.HTMLContentModel;
barmatz.forms.fields.HTMLContentModel.prototype.getContent = function()
{
	return this.get('content');
};
barmatz.forms.fields.HTMLContentModel.prototype.setContent = function(value)
{
	this.set('content', value);
};
barmatz.forms.fields.HTMLContentModel.prototype.clone = function()
{
	var clone = new barmatz.forms.fields.HTMLContentModel();
	clone.setContent(this.getContent());
	return clone;
};