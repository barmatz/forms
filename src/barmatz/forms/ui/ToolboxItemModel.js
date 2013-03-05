/** barmatz.forms.ui.ToolboxItemModel **/
window.barmatz.forms.ui.ToolboxItemModel = function(type, label)
{
	barmatz.utils.DataTypes.isNotUndefined(type);
	barmatz.utils.DataTypes.isNotUndefined(label);
	barmatz.utils.DataTypes.isTypeOf(type, 'string');
	barmatz.utils.DataTypes.isTypeOf(label, 'string');
	barmatz.forms.TypeModel.call(this, type);
	this.set('label', label);
};

barmatz.forms.ui.ToolboxItemModel.prototype = new barmatz.forms.TypeModel(null);
barmatz.forms.ui.ToolboxItemModel.prototype.constructor = barmatz.forms.ui.ToolboxItemModel;

Object.defineProperties(barmatz.forms.ui.ToolboxItemModel.prototype, 
{
	label: {get: function()
	{
		return this._label;
	}, set: function(value)
	{
		barmatz.utils.DataTypes.isTypeOf(label, 'string');
		this._label = value;
	}}
});