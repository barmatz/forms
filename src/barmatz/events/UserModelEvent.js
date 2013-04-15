/** barmatz.events.UserModelEvent **/
window.barmatz.events.UserModelEvent = function(type)
{
	barmatz.utils.DataTypes.isNotUndefined(type);
	barmatz.utils.DataTypes.isTypeOf(type, 'string');
	barmatz.events.Event.call(this, type);
	
	this._forms = null;
	this._targetURL = null;
	
	switch(type)
	{
		case barmatz.events.UserModelEvent.GET_FORMS_SUCCESS:
			this._forms = arguments[1];
			break;
		case barmatz.events.UserModelEvent.LOGIN_SUCCESS:
			this._targetURL = arguments[1];
			break;
	}
};

barmatz.events.UserModelEvent.prototype = new barmatz.events.Event(null);
barmatz.events.UserModelEvent.prototype.constructor = barmatz.events.UserModelEvent;

Object.defineProperties(barmatz.events.UserModelEvent,
{
	LOGIN_SUCCESS: {value: 'loginSuccess'},
	LOGIN_FAIL: {value: 'loginFail'},
	LOGOUT_SUCCESS: {value: 'logoutSuccess'},
	LOGOUT_FAIL: {value: 'logoutFail'},
	DATA_LOAD_SUCCESS: {value: 'dataLoadSuccess'},
	DATA_LOAD_FAIL: {value: 'dataLoadFail'},
	GET_FORMS_SUCCESS: {value: 'getFormsSuccess'},
	GET_FORMS_FAIL: {value: 'getFormsFail'}
});
Object.defineProperties(barmatz.events.UserModelEvent.prototype,
{
	forms: {get: function()
	{
		return this._forms;
	}},
	targetURL: {get: function()
	{
		return this._targetURL;
	}},
	clone: {value: function()
	{
		var event = new barmatz.events.UserModelEvent(this.type);
		event._target = this.target;
		
		switch(type)
		{
			case barmatz.events.UserModelEvent.GET_FORMS_SUCCESS:
				event._forms = this.forms;
				break;
			case barmatz.events.UserModelEvent.LOGIN_SUCCESS:
				event._targetURL = this.targetURL;
				break;
		}
		
		return event;
	}},
	toString: {value: function()
	{
		switch(type)
		{
			default:
				return this.formatToString('UserModelEvent', 'type');
				break;
			case barmatz.events.UserModelEvent.GET_FORMS_SUCCESS:
				return this.formatToString('UserModelEvent', 'type', 'forms');
				break;
			case barmatz.events.UserModelEvent.LOGIN_SUCCESS:
				return this.formatToString('UserModelEvent', 'type', 'targetURL');
				break;
		}
	}}
});