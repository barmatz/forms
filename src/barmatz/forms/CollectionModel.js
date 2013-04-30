/** barmatz.forms.CollectionModel **/
barmatz.forms.CollectionModel = function()
{
	barmatz.mvc.Model.call(this);
	this.set('items', []);
};
barmatz.forms.CollectionModel.prototype = new barmatz.mvc.Model();
barmatz.forms.CollectionModel.prototype.constructor = barmatz.forms.CollectionModel;
barmatz.forms.CollectionModel.prototype.getNumItems = function()
{
	var items = this.get('items');
	return items ? items.length : 0;
};
barmatz.forms.CollectionModel.prototype.addItem = function(item)
{
	barmatz.utils.DataTypes.isInstanceOf(item, barmatz.mvc.Model);
	this.addItemAt(item, this.get('items').length);
};
barmatz.forms.CollectionModel.prototype.addItemAt = function(item, index)
{
	barmatz.utils.DataTypes.isInstanceOf(item, barmatz.mvc.Model);
	barmatz.utils.DataTypes.isTypeOf(index, 'number');
	this.get('items').splice(index, 0, item);
	this.dispatchEvent(new barmatz.events.CollectionEvent(barmatz.events.CollectionEvent.ITEM_ADDED, item, index));
};
barmatz.forms.CollectionModel.prototype.removeItem = function(item)
{
	barmatz.utils.DataTypes.isInstanceOf(item, barmatz.mvc.Model);
	this.removeItemAt(this.getItemIndex(item));
};
barmatz.forms.CollectionModel.prototype.removeItemAt = function(index)
{
	barmatz.utils.DataTypes.isTypeOf(index, 'number');
	this.dispatchEvent(new barmatz.events.CollectionEvent(barmatz.events.CollectionEvent.ITEM_REMOVED, this.get('items').splice(index, 1)[0], index));
};
barmatz.forms.CollectionModel.prototype.getItemAt = function(index)
{
	barmatz.utils.DataTypes.isTypeOf(index, 'number');
	return this.get('items')[index];
};
barmatz.forms.CollectionModel.prototype.getItemIndex = function(item)
{
	barmatz.utils.DataTypes.isInstanceOf(item, barmatz.mvc.Model);
	return this.get('items').indexOf(item);
};
barmatz.forms.CollectionModel.prototype.setItemIndex = function(item, index)
{
	var items;
	
	barmatz.utils.DataTypes.isInstanceOf(item, barmatz.mvc.Model);
	barmatz.utils.DataTypes.isTypeOf(index, 'number');
	
	items = this.get('items');
	items.splice(items.indexOf(item), 1);
	items.splice(index, 0, item);
};
barmatz.forms.CollectionModel.prototype.forEach = function(handler)
{
	var items, i;
	
	barmatz.utils.DataTypes.isTypeOf(handler, 'function');

	items = this.get('items');
	
	for(i = 0; i < items.length; i++)
		handler(items[i], i, items);
};
barmatz.forms.CollectionModel.prototype.find = function(filter)
{
	
	barmatz.utils.DataTypes.isTypeOf(filter, 'function');
	return this.get('items').filter(filter);
};
barmatz.forms.CollectionModel.prototype.toString = function()
{
	var values = [];
	
	this.forEach(function(item, index, collection)
	{
		values.push(item.toString());
	});
	
	return values.join(', ');
};
barmatz.forms.CollectionModel.prototype.toArray = function()
{
	return this.get('items').slice(0);
};
