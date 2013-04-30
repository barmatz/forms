/** barmatz.forms.ui.PanelModel **/
barmatz.forms.ui.PanelModel = function(className, content)
{
	barmatz.utils.DataTypes.isTypeOf(className, 'string');
	barmatz.utils.DataTypes.isTypesOrInstances(content, ['string'], [window.HTMLElement, window.Array]);
	barmatz.forms.ContentModel.call(this);
	this.set('className', className);
	this.set('content', content);
};
barmatz.forms.ui.PanelModel.prototype = new barmatz.forms.ContentModel();
barmatz.forms.ui.PanelModel.prototype.constructor = barmatz.forms.ui.PanelModel;
barmatz.forms.ui.PanelModel.prototype.getClassName = function()
{
	return this.get('className');
};
barmatz.forms.ui.PanelModel.prototype.setClassName = function(value)
{
	barmatz.utils.DataTypes.isTypeOf(className, 'string', true);
	this.set('className', value);
};