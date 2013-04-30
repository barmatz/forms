/** barmatz.events.FieldEvent **/
barmatz.events.FieldEvent = function(type)
{
	barmatz.utils.DataTypes.isNotUndefined(type);
	barmatz.utils.DataTypes.isTypeOf(type, 'string');
	barmatz.events.Event.call(this, type);
	
	this._errors = null;
	
	switch(type)
	{
		case barmatz.events.FieldEvent.INVALID:
			this._errors = arguments[1];
			break;
	}
};
barmatz.events.FieldEvent.VALID = 'valid';
barmatz.events.FieldEvent.INVALID = 'invalid';
barmatz.events.FieldEvent.prototype = new barmatz.events.Event(null);
barmatz.events.FieldEvent.prototype.constructor = barmatz.events.FieldEvent;
barmatz.events.FieldEvent.prototype.getErrors = function()
{
	return this._errors;
};
barmatz.events.FieldEvent.prototype.clone = function()
{
	var event = new barmatz.events.FieldEvent(this.getType());
	event._target = this.getTarget();
	event._errors = this.getErrors();
	return event;
};
barmatz.events.FieldEvent.prototype.toString = function()
{
	switch(this.type)
	{
		default:
			return this.formatToString('FieldEvent', 'type');
			break;
		case barmatz.events.FieldEvent.INVALID:
			return this.formatToString('FieldEvent', 'type', 'errors');
			break;
	}
};