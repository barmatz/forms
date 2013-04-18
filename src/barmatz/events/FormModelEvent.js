/** barmatz.events.FormModelEvent **/
window.barmatz.events.FormModelEvent = function(type)
{
	barmatz.utils.DataTypes.isNotUndefined(type);
	barmatz.utils.DataTypes.isTypeOf(type, 'string');
	barmatz.events.Event.call(this, type);

	this._leads = null;
	
	switch(type)
	{
		case barmatz.events.FormModelEvent.GET_LEADS_SUCCESS:
			this._leads = arguments[1];
			break;
	}
};

barmatz.events.FormModelEvent.prototype = new barmatz.events.Event(null);
barmatz.events.FormModelEvent.prototype.constructor = barmatz.events.FormModelEvent;

Object.defineProperties(barmatz.events.FormModelEvent,
{
	SAVING: {value: 'saving'},
	SAVED: {value: 'saved'},
	ERROR_SAVING: {value: 'errorSaving'},
	LOADING_FORM: {value: 'loadingForm'},
	LOADING_FORM_COMPLETE: {value: 'loadingFormComplete'},
	LOADING_FORM_ERROR: {value: 'loadingFormError'},
	DELETING: {value: 'deleting'},
	DELETED: {value: 'deleted'},
	DELETION_FAIL: {value: 'deletionFail'},
	SUBMITTING: {value: 'submitting'},
	SUBMITTED: {value: 'submitted'},
	SUBMISSION_FAILED: {value: 'submissionFailed'},
	GET_LEADS_SUCCESS: {value: 'getLeadsSuccess'},
	GET_LEADS_FAIL: {value: 'getLeadsFail'}
}); 
Object.defineProperties(barmatz.events.FormModelEvent.prototype, 
{
	leads: {get: function()
	{
		return this._leads;
	}},
	clone: {value: function()
	{
		var event = new FormModelEvent(type);
		event._target = this.target;
		
		switch(type)
		{
			case barmatz.events.FormModelEvent.GET_LEADS_SUCCESS:
				event._leads = this.leads;
				break;
		}
		
		return event;
	}},
	toString: {value: function()
	{
		switch(type)
		{
			default:
				return this.formatToString('FormModelEvent', 'type');
				break;
			case barmatz.events.FormModelEvent.GET_LEADS_SUCCESS:
				return this.formatToString('FormModelEvent', 'type', 'leads');
				break;
		}
	}}
});