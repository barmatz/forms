/** barmatz.forms.ui.ToolboxModel **/
window.barmatz.forms.ui.ToolboxModel = function()
{
	barmatz.forms.CollectionModel.call(this);
	this._refDictionary = new barmatz.utils.Dictionary();
};

barmatz.forms.ui.ToolboxModel.prototype = new barmatz.forms.CollectionModel();
barmatz.forms.ui.ToolboxModel.prototype.constructor = barmatz.forms.ui.ToolboxModel;

Object.defineProperties(barmatz.forms.ui.ToolboxModel.prototype,
{
	addItem: {value: function(item, ref)
	{
		barmatz.utils.DataTypes.isNotUndefined(item);
		barmatz.utils.DataTypes.isInstanceOf(item, barmatz.forms.ui.ToolboxItemModel);
		barmatz.utils.DataTypes.isNotUndefined(ref);
		barmatz.utils.DataTypes.isInstanceOf(ref, barmatz.forms.fields.FormFieldModel);
		barmatz.forms.CollectionModel.prototype.addItem.call(this, item);
		this._refDictionary.add(item, ref);
	}},
	removeItem: {value: function(item)
	{
		barmatz.utils.DataTypes.isNotUndefined(item);
		barmatz.utils.DataTypes.isInstanceOf(item, barmatz.forms.ui.ToolboxItemModel);
		barmatz.forms.CollectionModel.prototype.removeItem.call(this, item);
		this._refDictionary.remove(item);
	}},
	getItemIndex: {value: function(item)
	{
		barmatz.utils.DataTypes.isNotUndefined(item);
		barmatz.utils.DataTypes.isInstanceOf(item, barmatz.forms.ui.ToolboxItemModel);
		barmatz.forms.CollectionModel.prototype.getItemIndex.call(this, item);
	}},
	getRefItem: {value: function(item)
	{
		barmatz.utils.DataTypes.isNotUndefined(item);
		barmatz.utils.DataTypes.isInstanceOf(item, barmatz.forms.ui.ToolboxItemModel);
		return this._refDictionary.get(item);
	}}
});