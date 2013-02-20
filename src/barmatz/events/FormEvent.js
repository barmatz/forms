/** barmatz.events.FormEvent **/
window.barmatz.events.FormEvent = function(type)
{
	if(type === undefined)
		throw new ReferenceError('expected property type is undefined');
	else if(typeof type != 'string')
		throw new TypeError('type is not a String');
	
	barmatz.events.Event.call(this, type);
	
	this._field = null;
	
	switch(type)
	{
		case barmatz.events.FormEvent.FIELD_ADDED:
		case barmatz.events.FormEvent.FIELD_REMOVED:
			this._field = arguments[1];
			break;
	}
};

barmatz.events.FormEvent.prototype = new barmatz.events.Event(null);
barmatz.events.FormEvent.prototype.constructor = barmatz.events.FormEvent;

Object.defineProperties(barmatz.events.FormEvent,
{
	FIELD_ADDED: {value: 'fieldAdded'},
	FIELD_REMOVED: {value: 'fieldRemoved'}
});
Object.defineProperties(barmatz.events.FormEvent.prototype,
{
	field: {get: function()
	{
		return this._field;
	}}
});