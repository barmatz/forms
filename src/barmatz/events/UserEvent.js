/** barmatz.events.UserEvent **/
barmatz.events.UserEvent = function(type)
{
	barmatz.utils.DataTypes.isNotUndefined(type);
	barmatz.utils.DataTypes.isTypeOf(type, 'string');
	barmatz.events.Event.call(this, type);
	
	this._forms = null;
	this._targetURL = null;
	
	switch(type)
	{
		case barmatz.events.UserEvent.GET_FORMS_SUCCESS:
			this._forms = arguments[1];
			break;
		case barmatz.events.UserEvent.LOGIN_SUCCESS:
			this._targetURL = arguments[1];
			break;
	}
};

barmatz.events.UserEvent.LOGIN_SUCCESS = 'loginSuccess';
barmatz.events.UserEvent.LOGIN_FAIL = 'loginFail';
barmatz.events.UserEvent.LOGOUT_SUCCESS = 'logoutSuccess';
barmatz.events.UserEvent.LOGOUT_FAIL = 'logoutFail';
barmatz.events.UserEvent.DATA_LOAD_SUCCESS = 'dataLoadSuccess';
barmatz.events.UserEvent.DATA_LOAD_FAIL = 'dataLoadFail';
barmatz.events.UserEvent.GET_FORMS_SUCCESS = 'getFormsSuccess';
barmatz.events.UserEvent.GET_FORMS_FAIL = 'getFormsFail';
barmatz.events.UserEvent.prototype = new barmatz.events.Event(null);
barmatz.events.UserEvent.prototype.constructor = barmatz.events.UserEvent;
barmatz.events.UserEvent.prototype.getForms = function()
{
	return this._forms;
};
barmatz.events.UserEvent.prototype.getTargetURL = function()
{
	return this._targetURL;
};
barmatz.events.UserEvent.prototype.clone = function()
{
	var event = new barmatz.events.UserEvent(this.getType());
	event._target = this.getTarget();
	
	switch(event.getType())
	{
		case barmatz.events.UserEvent.GET_FORMS_SUCCESS:
			event._forms = this.getForms();
			break;
		case barmatz.events.UserEvent.LOGIN_SUCCESS:
			event._targetURL = this.getTargetURL();
			break;
	}
	
	return event;
};
barmatz.events.UserEvent.prototype.toString = function()
{
	switch(this.getType())
	{
		default:
			return this.formatToString('UserEvent', 'type');
			break;
		case barmatz.events.UserEvent.GET_FORMS_SUCCESS:
			return this.formatToString('UserEvent', 'type', 'forms');
			break;
		case barmatz.events.UserEvent.LOGIN_SUCCESS:
			return this.formatToString('UserEvent', 'type', 'targetURL');
			break;
	}
};