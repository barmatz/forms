/** barmatz.forms.ui.PanelModel **/
window.barmatz.forms.ui.PanelModel = function(className, content)
{
	barmatz.utils.DataTypes.isNotUndefined(className);
	barmatz.utils.DataTypes.isNotUndefined(content);
	barmatz.utils.DataTypes.isTypeOf(className, 'string');
	barmatz.utils.DataTypes.isTypesOrInstances(content, ['string'], [HTMLElement, Array]);
	barmatz.mvc.Model.call(this);
	this.set('className', className);
	this.set('content', content);
};

barmatz.forms.ui.PanelModel.prototype = new barmatz.mvc.Model();
barmatz.forms.ui.PanelModel.prototype.constructor = barmatz.forms.ui.PanelModel;

Object.defineProperties(barmatz.forms.ui.PanelModel.prototype,
{
	className: {get: function()
	{
		return this.get('className');
	}, set: function(value)
	{
		barmatz.utils.DataTypes.isTypeOf(className, 'string', true);
		this.set('className', value);
	}},
	content: {get: function()
	{
		return this.get('content');
	}, set: function(value)
	{
		barmatz.utils.DataTypes.isTypesOrInstances(content, ['string'], [HTMLElement, Array], true);
		this.set('content', value);
	}}
});