/** barmatz.events.CollectionEvent **/
window.barmatz.events.CollectionEvent = function(type)
{
	barmatz.utils.DataTypes.isNotUndefined(type);
	barmatz.utils.DataTypes.isTypeOf(type, 'string');
	barmatz.events.Event.call(this, type);
	
	this._item = null;
	this._index = NaN;
	
	switch(type)
	{
		case barmatz.events.CollectionEvent.ADDED:
		case barmatz.events.CollectionEvent.REMOVED:
			this._item = arguments[1];
			this._index = arguments[2];
			break;
	}
};

barmatz.events.CollectionEvent.prototype = new barmatz.events.Event(null);
barmatz.events.CollectionEvent.prototype.constructor = barmatz.events.CollectionEvent;

Object.defineProperties(barmatz.events.CollectionEvent,
{
	ADDED: {value: 'added'},
	REMOVED: {value: 'removed'}
});
Object.defineProperties(barmatz.events.CollectionEvent.prototype,
{
	item: {get: function()
	{
		return this._item;
	}},
	index: {get: function()
	{
		return this._index;
	}},
	clone: {value: function(type)
	{
		var event = new barmatz.events.CollectionEvent(type);
		event._target = this.target;
		event._field = this.field;
		event._index = this.index;
		return event;
	}},
	toString: {value: function()
	{
		return this.formatToString('CollectionEvent', 'type', 'item', 'index');
	}}
});