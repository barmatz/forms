/** barmatz.forms.fields.HTMLContentModel **/
window.barmatz.forms.fields.HTMLContentModel = function()
{
	barmatz.forms.fields.FormItemModel.call(this, barmatz.forms.fields.FieldTypes.HTML_CONTENT);
	this.set('content', '');
};

barmatz.forms.fields.HTMLContentModel.prototype = new barmatz.forms.fields.FormItemModel(null);
barmatz.forms.fields.HTMLContentModel.prototype.constructor = barmatz.forms.fields.HTMLContentModel;

Object.defineProperties(barmatz.forms.fields.HTMLContentModel.prototype,
{
	content: {get: function()
	{
		return this.get('content');
	}, set: function(value)
	{
		this.set('content', value);
	}},
	clone: {value: function()
	{
		var clone = new barmatz.forms.fields.HTMLContentModel();
		clone.type = this.type;
		clone.content = this.content;
		return clone;
	}}
});