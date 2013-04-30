/** barmatz.forms.ui.MenuItemModel **/
barmatz.forms.ui.MenuItemModel = function(label, clickHandler)
{
	barmatz.utils.DataTypes.isTypeOf(label, 'string');
	barmatz.utils.DataTypes.isTypeOf(clickHandler, 'function');
	barmatz.mvc.Model.call(this);
	this.set('label', label);
	this.set('clickHandler', clickHandler);
};
barmatz.forms.ui.MenuItemModel.prototype = new barmatz.mvc.Model();
barmatz.forms.ui.MenuItemModel.prototype.constructor = barmatz.forms.ui.MenuItemModel;
barmatz.forms.ui.MenuItemModel.prototype.getLabel = function()
{
	return this.get('label');
};
barmatz.forms.ui.MenuItemModel.prototype.setLabel = function(value)
{
	barmatz.utils.DataTypes.isTypeOf(label, 'string');
	this.set('label', value);
};
barmatz.forms.ui.MenuItemModel.prototype.getClickHandler = function()
{
	var _this = this;
	return function(event)
	{
		barmatz.utils.DataTypes.isInstanceOf(event, MouseEvent);
		if(event.target === event.currentTarget)
			_this.get('clickHandler').call(_this, event);
	};
};
barmatz.forms.ui.MenuItemModel.prototype.setClickHandler = function(value)
{
	barmatz.utils.DataTypes.isTypeOf(value, 'function');
	this.set('clickHandler', value);
};