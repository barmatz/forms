/** barmatz.forms.ui.MenuItemModel **/
window.barmatz.forms.ui.MenuItemModel = function(label, clickHandler)
{
	barmatz.utils.DataTypes.isNotUndefined(label);
	barmatz.utils.DataTypes.isNotUndefined(clickHandler);
	barmatz.utils.DataTypes.isTypeOf(label, 'string');
	barmatz.utils.DataTypes.isTypeOf(clickHandler, 'function');
	barmatz.mvc.Model.call(this);
	this.set('label', label);
	this.set('clickHandler', clickHandler);
};

barmatz.forms.ui.MenuItemModel.prototype = new barmatz.mvc.Model();
barmatz.forms.ui.MenuItemModel.prototype.constructor = barmatz.forms.ui.MenuItemModel;

Object.defineProperties(barmatz.forms.ui.MenuItemModel.prototype, 
{
	label: {get: function()
	{
		return this.get('label');
	}, set: function(value)
	{
		barmatz.utils.DataTypes.isTypeOf(label, 'string');
		this.set('label', value);
	}},
	clickHandler: {get: function()
	{
		return this.get('clickHandler');
	}, set: function(value)
	{
		barmatz.utils.DataTypes.isTypeOf(clickHandler, 'function');
		this.set('clickHandler', value);
	}}
});