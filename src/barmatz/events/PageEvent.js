/** barmatz.events.PageEvent **/
barmatz.events.PageEvent = function(type)
{
	barmatz.utils.DataTypes.isTypeOf(type, 'string');
	barmatz.events.Event.call(this, type);
	
	this._oldState = null;
	this._newState = null;
	
	switch(type)
	{
		case barmatz.events.PageEvent.SWITCHING_STATE:
		case barmatz.events.PageEvent.STATE_SWITCHED:
			this._oldState = arguments[1];
			this._newState = arguments[2];
			break;
	}
};
barmatz.events.PageEvent.SWITCHING_STATE = 'switchingState';
barmatz.events.PageEvent.STATE_SWITCHED = 'stateSwitched';
barmatz.events.PageEvent.prototype = new barmatz.events.Event('');
barmatz.events.PageEvent.prototype.constructor = barmatz.events.PageEvent;
barmatz.events.PageEvent.prototype.getOldState = function()
{
	return this._oldState;
};
barmatz.events.PageEvent.prototype.getNewState = function()
{
	return this._newState;
};
barmatz.events.PageEvent.prototype.clone = function()
{
	var event = new barmatz.events.PageEvent(this.getType());
	
	switch(event.getType())
	{
		case barmatz.events.PageEvent.SWITCHING_STATE:
		case barmatz.events.PageEvent.STATE_SWITCHED:
			evnet._oldState = this.getOldState();
			evnet._newState = this.getNewState();
			break;
	}
	
	return event;
};
barmatz.events.PageEvent.prototype.toString = function()
{
	switch(this.getType())
	{
		default:
			return this.formatToString('PageEvent', 'type');
			break;
		case barmatz.events.PageEvent.SWITCHING_STATE:
		case barmatz.events.PageEvent.STATE_SWITCHED:
			return this.formatToString('PageEvent', 'type', 'oldState', 'newState');
			break;
	}
};