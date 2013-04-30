/** barmatz.events.FormEvent **/
barmatz.events.FormEvent = function(type)
{
	barmatz.utils.DataTypes.isNotUndefined(type);
	barmatz.utils.DataTypes.isTypeOf(type, 'string');
	barmatz.events.Event.call(this, type);

	this._leads = null;
	
	switch(type)
	{
		case barmatz.events.FormEvent.GET_LEADS_SUCCESS:
			this._leads = arguments[1];
			break;
	}
};
barmatz.events.FormEvent.SAVING = 'saving';
barmatz.events.FormEvent.SAVED = 'saved';
barmatz.events.FormEvent.ERROR_SAVING = 'errorSaving';
barmatz.events.FormEvent.LOADING_FORM = 'loadingForm';
barmatz.events.FormEvent.LOADING_FORM_COMPLETE = 'loadingFormComplete';
barmatz.events.FormEvent.LOADING_FORM_ERROR = 'loadingFormError';
barmatz.events.FormEvent.DELETING = 'deleting';
barmatz.events.FormEvent.DELETED = 'deleted';
barmatz.events.FormEvent.DELETION_FAIL = 'deletionFail';
barmatz.events.FormEvent.SUBMITTING = 'submitting';
barmatz.events.FormEvent.SUBMITTED = 'submitted';
barmatz.events.FormEvent.SUBMISSION_FAILED = 'submissionFailed';
barmatz.events.FormEvent.GET_LEADS_SUCCESS = 'getLeadsSuccess';
barmatz.events.FormEvent.GET_LEADS_FAIL = 'getLeadsFail';
barmatz.events.FormEvent.prototype = new barmatz.events.Event(null);
barmatz.events.FormEvent.prototype.constructor = barmatz.events.FormEvent;
barmatz.events.FormEvent.prototype.getLeads = function()
{
	return this._leads;
};
barmatz.events.FormEvent.prototype.clone = function()
{
	var event = new barmatz.events.FormEvent(this.getType());
	event._target = this.getTarget();
	
	switch(event.getType())
	{
		case barmatz.events.FormEvent.GET_LEADS_SUCCESS:
			event._leads = this.getLeads();
			break;
	}
	
	return event;
};
barmatz.events.FormEvent.prototype.toString = function()
{
	switch(this.getType())
	{
		default:
			return this.formatToString('FormEvent', 'type');
			break;
		case barmatz.events.FormEvent.GET_LEADS_SUCCESS:
			return this.formatToString('FormEvent', 'type', 'leads');
			break;
	}
};