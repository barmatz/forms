/** barmatz.events.CollectionEvent **/
barmatz.events.CollectionEvent = function(type)
{
	barmatz.utils.DataTypes.isNotUndefined(type);
	barmatz.utils.DataTypes.isTypeOf(type, 'string');
	barmatz.events.Event.call(this, type);
	
	this._item = null;
	this._index = NaN;
	
	switch(type)
	{
		case barmatz.events.CollectionEvent.ITEM_ADDED:
		case barmatz.events.CollectionEvent.ITEM_REMOVED:
			this._item = arguments[1];
			this._index = arguments[2];
			break;
	}
};
barmatz.events.CollectionEvent.ITEM_ADDED = 'itemAdded';
barmatz.events.CollectionEvent.ITEM_REMOVED = 'itemRemoved';
barmatz.events.CollectionEvent.prototype = new barmatz.events.Event(null);
barmatz.events.CollectionEvent.prototype.constructor = barmatz.events.CollectionEvent;
barmatz.events.CollectionEvent.prototype.getItem = function()
{
	return this._item;
};
barmatz.events.CollectionEvent.prototype.getIndex = function()
{
	return this._index;
};
barmatz.events.CollectionEvent.prototype.clone = function()
{
	var event = new barmatz.events.CollectionEvent(this.getType());
	
	event._target = this.target;
	
	switch(event.getType())
	{
		case barmatz.events.CollectionEvent.ITEM_ADDED:
		case barmatz.events.CollectionEvent.ITEM_REMOVED:
			event._item = this.getItem();
			event._index = this.getIndex();
			break;
	}
	
	return event;
};
barmatz.events.CollectionEvent.prototype.toString = function()
{
	switch(this.getType())
	{
		default:
			return this.formatToString('CollectionEvent', 'type');
			break;
		case barmatz.events.CollectionEvent.ITEM_ADDED:
		case barmatz.events.CollectionEvent.ITEM_REMOVED:
			return this.formatToString('CollectionEvent', 'type', 'item', 'index');
			break;
	}
};