/** barmatz.events.FieldModelEvent **/
window.barmatz.events.FieldModelEvent = function(type)
{
	barmatz.utils.DataTypes.isNotUndefined(type);
	barmatz.utils.DataTypes.isTypeOf(type, 'string');
	barmatz.events.Event.call(this, type);
	
	this._errors = null;
	
	switch(type)
	{
		case barmatz.events.FieldModelEvent.INVALID:
			this._errors = arguments[1];
			break;
	}
};

barmatz.events.FieldModelEvent.prototype = new barmatz.events.Event(null);
barmatz.events.FieldModelEvent.prototype.constructor = barmatz.events.FieldModelEvent;

Object.defineProperties(barmatz.events.FieldModelEvent,
{
	VALID: {value: 'valid'},
	INVALID: {value: 'invalid'}
}); 
Object.defineProperties(barmatz.events.FieldModelEvent.prototype, 
{
	errors: {get: function()
	{
		return this._errors;
	}},
	clone: {value: function()
	{
		var event = new FieldModelEvent(type);
		event._target = this.target;
		event._errors = this.errors;
		return event;
	}},
	toString: {value: function()
	{
		switch(this.type)
		{
			default:
				return this.formatToString('FieldModelEvent', 'type');
				break;
			case barmatz.events.FieldModelEvent.INVALID:
				return this.formatToString('FieldModelEvent', 'type', 'errors');
				break;
		}
	}}
});