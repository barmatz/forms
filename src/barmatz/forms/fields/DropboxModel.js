/** barmatz.forms.fields.DropboxModel **/
window.barmatz.forms.fields.DropboxModel = function(items)
{
	barmatz.utils.DataTypes.isInstanceOf(items, Array, true);
	barmatz.forms.CollectionModel.call(this);
	
	if(items)
		while(items.length > this.numItems)
			this.addItem(items[this.numItems]);
};

barmatz.forms.fields.DropboxModel.prototype = new barmatz.forms.CollectionModel();
barmatz.forms.fields.DropboxModel.prototype.constructor = barmatz.forms.fields.DropboxModel;

Object.defineProperties(barmatz.forms.fields.DropboxModel.prototype,
{
	addItem: {value: function(item)
	{
		barmatz.utils.DataTypes.isNotUndefined(item);
		barmatz.utils.DataTypes.isInstanceOf(item, barmatz.forms.fields.DropboxItemModel);
		barmatz.forms.CollectionModel.prototype.addItem.call(this, item);
	}},
	addItemAt: {value: function(item, index)
	{
		barmatz.utils.DataTypes.isNotUndefined(item);
		barmatz.utils.DataTypes.isNotUndefined(index);
		barmatz.utils.DataTypes.isInstanceOf(item, barmatz.forms.fields.DropboxItemModel);
		barmatz.utils.DataTypes.isTypeOf(index, 'number');
		barmatz.forms.CollectionModel.prototype.addItemAt.call(this, item, index);
	}},
	removeItem: {value: function(item)
	{
		barmatz.utils.DataTypes.isNotUndefined(item);
		barmatz.utils.DataTypes.isInstanceOf(item, barmatz.forms.fields.DropboxItemModel);
		barmatz.forms.CollectionModel.prototype.removeItem.call(this, item);
	}},
	getItemIndex: {value: function(item)
	{
		barmatz.utils.DataTypes.isNotUndefined(item);
		barmatz.utils.DataTypes.isInstanceOf(item, barmatz.forms.fields.DropboxItemModel);
		barmatz.forms.CollectionModel.prototype.getItemIndex.call(this, item);
	}}
});