/** barmatz.events.ModelEvent **/
window.barmatz.events.ModelEvent = function(type)
{
	barmatz.events.Event.call(this, type);
	
	switch(type)
	{
		case barmatz.events.ModelEvent.VALUE_CHANGED:
			this._key = arguments[1];
			this._value = arguments[2];
			break;
	}
};

barmatz.events.ModelEvent.prototype = new barmatz.events.Event(null);
barmatz.events.ModelEvent.prototype.constructor = barmatz.events.ModelEvent;

Object.defineProperties(barmatz.events.ModelEvent, 
{
	VALUE_CHANGED: {value: 'valueChanged'}
});
Object.defineProperties(barmatz.events.ModelEvent.prototype, 
{
	key: {get: function()
	{
		return this._key;
	}},
	value: {get: function()
	{
		return this._value;
	}},
	clone: {value: function(type)
	{
		var event = new barmatz.events.ModelEvent(type);
		event._target = this.target;
		event._key = this.key;
		event._value = this.value;
		return event;
	}},
	toString: {value: function()
	{
		return this.formatToString('ModelEvent', 'type', 'key', 'value');
	}}
});