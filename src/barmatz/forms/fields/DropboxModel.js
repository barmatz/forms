/** barmatz.forms.fields.DropboxModel **/
barmatz.forms.fields.DropboxModel = function(name, items)
{
	var _this;
	
	barmatz.utils.DataTypes.isNotUndefined(name);
	barmatz.utils.DataTypes.isTypeOf(name, 'string', true);
	barmatz.utils.DataTypes.isInstanceOf(items, window.Array, true);
	barmatz.forms.fields.FieldModel.call(this, barmatz.forms.fields.FieldTypes.DROPBOX, name);
	
	_this = this;
	
	this.set('multiple', false);
	this.set('items', new barmatz.forms.CollectionModel());
	this.get('items').addEventListener(barmatz.events.CollectionEvent.ITEM_ADDED, onItemsItemAdded);
	this.get('items').addEventListener(barmatz.events.CollectionEvent.ITEM_REMOVED, onItemsItemRemoved);
	
	if(items)
		while(items.length > this.getNumItems())
			this.addItem(items[this.getNumItems()]);
	
	function onItemsItemAdded(event)
	{
		_this.dispatchEvent(event);
	}
	
	function onItemsItemRemoved(event)
	{
		_this.dispatchEvent(event);
	}
};

barmatz.forms.fields.DropboxModel.prototype = new barmatz.forms.fields.FieldModel(null, null);
barmatz.forms.fields.DropboxModel.prototype.constructor = barmatz.forms.fields.DropboxModel;
barmatz.forms.fields.DropboxModel.prototype.getMultiple = function()
{
	return this.get('multiple');
};
barmatz.forms.fields.DropboxModel.prototype.setMultiple = function(value)
{
	barmatz.utils.DataTypes.isTypeOf(value, 'boolean');
	this.set('multiple', value);
};
barmatz.forms.fields.DropboxModel.prototype.getNumItems = function()
{
	return this.get('items').getNumItems();
};
barmatz.forms.fields.DropboxModel.prototype.addItem = function(item)
{
	barmatz.utils.DataTypes.isNotUndefined(item);
	barmatz.utils.DataTypes.isInstanceOf(item, barmatz.forms.fields.DropboxItemModel);
	return this.get('items').addItem(item);
};
barmatz.forms.fields.DropboxModel.prototype.addItemAt = function(item, index)
{
	barmatz.utils.DataTypes.isNotUndefined(item);
	barmatz.utils.DataTypes.isNotUndefined(index);
	barmatz.utils.DataTypes.isInstanceOf(item, barmatz.forms.fields.DropboxItemModel);
	barmatz.utils.DataTypes.isTypeOf(index, 'number');
	return this.get('items').addItemAt(item, index);
};
barmatz.forms.fields.DropboxModel.prototype.removeItem = function(item)
{
	barmatz.utils.DataTypes.isNotUndefined(item);
	barmatz.utils.DataTypes.isInstanceOf(item, barmatz.forms.fields.DropboxItemModel);
	return this.get('items').removeItem(item);
};
barmatz.forms.fields.DropboxModel.prototype.removeItemAt = function(index)
{
	barmatz.utils.DataTypes.isNotUndefined(index);
	barmatz.utils.DataTypes.isTypeOf(index, 'number');
	return this.get('items').removeItemAt(index);
};
barmatz.forms.fields.DropboxModel.prototype.getItemAt = function(index)
{
	barmatz.utils.DataTypes.isNotUndefined(index);
	barmatz.utils.DataTypes.isTypeOf(index, 'number');
	return this.get('items').getItemAt(index);
};
barmatz.forms.fields.DropboxModel.prototype.getItemIndex = function(item)
{
	barmatz.utils.DataTypes.isNotUndefined(item);
	barmatz.utils.DataTypes.isInstanceOf(item, barmatz.forms.fields.DropboxItemModel);
	return this.get('items').getItemIndex(item);
};
barmatz.forms.fields.DropboxModel.prototype.setItemIndex = function(item, index)
{
	barmatz.utils.DataTypes.isNotUndefined(item);
	barmatz.utils.DataTypes.isNotUndefined(index);
	barmatz.utils.DataTypes.isInstanceOf(item, barmatz.forms.fields.DropboxItemModel);
	barmatz.utils.DataTypes.isTypeOf(index, 'number');
	return this.get('items').setItemIndex(item, index);
};
barmatz.forms.fields.DropboxModel.prototype.forEach = function(handler)
{
	barmatz.utils.DataTypes.isNotUndefined(handler);
	barmatz.utils.DataTypes.isTypeOf(handler, 'function');
	return this.get('items').forEach(handler);
};
barmatz.forms.fields.DropboxModel.prototype.find = function(filter)
{
	return this.get('items').find(filter);
};
barmatz.forms.fields.DropboxModel.prototype.clone = function()
{
	var clone = new barmatz.forms.fields.DropboxModel(this.getName(), this.get('items').toArray());
	clone.setLabel(this.getLabel());
	clone.setMandatory(this.getMandatory());
	clone.setValue(this.getValue());
	clone.setEnabled(this.getEnabled());
	clone.setValidator(this.getValidator().clone());
	clone.setMultiple(this.getMultiple());
	return clone;
};
barmatz.forms.fields.DropboxModel.prototype.toString = function()
{
	return this.get('items').toString();
};