/** barmatz.events.ModelEvent **/
barmatz.events.ModelEvent = function(type)
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
barmatz.events.ModelEvent.VALUE_CHANGED = 'valueChanged';
barmatz.events.ModelEvent.prototype = new barmatz.events.Event(null);
barmatz.events.ModelEvent.prototype.constructor = barmatz.events.ModelEvent;
barmatz.events.ModelEvent.prototype.getKey = function()
{
	return this._key;
};
barmatz.events.ModelEvent.prototype.getValue = function()
{
	return this._value;
};
barmatz.events.ModelEvent.prototype.clone = function()
{
	var event = new barmatz.events.ModelEvent(this.getType());
	event._target = this.getTarget();
	event._key = this.getKey();
	event._value = this.getValue();
	return event;
};
barmatz.events.ModelEvent.prototype.toString = function()
{
	return this.formatToString('ModelEvent', 'type', 'key', 'value');
};