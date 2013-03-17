/** barmatz.events.UserModelEvent **/
window.barmatz.events.UserModelEvent = function(type)
{
	barmatz.utils.DataTypes.isNotUndefined(type);
	barmatz.utils.DataTypes.isInstanceOf(type, 'string');
	barmatz.events.Event.call(this, type);
};

barmatz.events.UserModelEvent.prototype = new barmatz.events.Event(null);
barmatz.events.UserModelEvent.prototype.constructor = barmatz.events.UserModelEvent;

Object.defineProperties(barmatz.events.UserModelEvent,
{
	LOGIN_SUCCESS: {value: 'loginSuccess'},
	LOGIN_FAIL: {value: 'loginFail'}
});
Object.defineProperties(barmatz.events.UserModelEvent.prototype,
{
	clone: {value: function()
	{
		var event = new barmatz.events.UserModelEvent(this.type);
		event._target = this.target;
		return event;
	}},
	toString: {value: function()
	{
		return this.formatToString('UserModelEvent', 'type');
	}}
});