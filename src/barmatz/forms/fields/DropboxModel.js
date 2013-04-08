/** barmatz.forms.fields.DropboxModel **/
window.barmatz.forms.fields.DropboxModel = function(name, items)
{
	var _this;
	
	barmatz.utils.DataTypes.isNotUndefined(name);
	barmatz.utils.DataTypes.isTypeOf(name, 'string', true);
	barmatz.utils.DataTypes.isInstanceOf(items, Array, true);
	barmatz.forms.fields.FieldModel.call(this, barmatz.forms.fields.FieldTypes.DROPBOX, name);
	
	_this = this;
	
	this.set('multiple', false);
	this.set('items', new barmatz.forms.CollectionModel());
	this.get('items').addEventListener(barmatz.events.CollectionEvent.ITEM_ADDED, onItemsItemAdded);
	this.get('items').addEventListener(barmatz.events.CollectionEvent.ITEM_REMOVED, onItemsItemRemoved);
	
	if(items)
		while(items.length > this.numItems)
			this.addItem(items[this.numItems]);
	
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

Object.defineProperties(barmatz.forms.fields.DropboxModel.prototype,
{
	multiple: {get: function()
	{
		return this.get('multiple');
	}, set: function(value)
	{
		barmatz.utils.DataTypes.isTypeOf(value, 'boolean');
		this.set('multiple', value);
	}},
	numItems: {get: function()
	{
		return this.get('items').numItems;
	}},
	addItem: {value: function(item)
	{
		barmatz.utils.DataTypes.isNotUndefined(item);
		barmatz.utils.DataTypes.isInstanceOf(item, barmatz.forms.fields.DropboxItemModel);
		return this.get('items').addItem(item);
	}},
	addItemAt: {value: function(item, index)
	{
		barmatz.utils.DataTypes.isNotUndefined(item);
		barmatz.utils.DataTypes.isNotUndefined(index);
		barmatz.utils.DataTypes.isInstanceOf(item, barmatz.forms.fields.DropboxItemModel);
		barmatz.utils.DataTypes.isTypeOf(index, 'number');
		return this.get('items').addItemAt(item, index);
	}},
	removeItem: {value: function(item)
	{
		barmatz.utils.DataTypes.isNotUndefined(item);
		barmatz.utils.DataTypes.isInstanceOf(item, barmatz.forms.fields.DropboxItemModel);
		return this.get('items').removeItem(item);
	}},
	removeItemAt: {value: function(index)
	{
		barmatz.utils.DataTypes.isNotUndefined(index);
		barmatz.utils.DataTypes.isTypeOf(index, 'number');
		return this.get('items').removeItemAt(index);
	}},
	getItemAt: {value: function(index)
	{
		barmatz.utils.DataTypes.isNotUndefined(index);
		barmatz.utils.DataTypes.isTypeOf(index, 'number');
		return this.get('items').getItemAt(index);
	}},
	getItemIndex: {value: function(item)
	{
		barmatz.utils.DataTypes.isNotUndefined(item);
		barmatz.utils.DataTypes.isInstanceOf(item, barmatz.forms.fields.DropboxItemModel);
		return this.get('items').getItemIndex(item);
	}},
	setItemIndex: {value: function(item, index)
	{
		barmatz.utils.DataTypes.isNotUndefined(item);
		barmatz.utils.DataTypes.isNotUndefined(index);
		barmatz.utils.DataTypes.isInstanceOf(item, barmatz.forms.fields.DropboxItemModel);
		barmatz.utils.DataTypes.isTypeOf(index, 'number');
		return this.get('items').setItemIndex(item, index);
	}},
	forEach: {value: function(handler)
	{
		barmatz.utils.DataTypes.isNotUndefined(handler);
		barmatz.utils.DataTypes.isTypeOf(handler, 'function');
		return this.get('items').forEach(handler);
	}},
	find: {value: function(filter)
	{
		return this.get('items').find(filter);
	}},
	clone: {value: function()
	{
		var clone = new barmatz.forms.fields.DropboxModel(this.name, this.get('items').toArray());
		clone.label = this.label;
		clone.mandatory = this.mandatory;
		clone.value = this.value;
		clone.enabled = this.enabled;
		clone.validator = this.validator.clone();
		clone.multiple = this.multiple;
		return clone;
	}},
	toString: {value: function()
	{
		return this.get('items').toString();
	}}
});