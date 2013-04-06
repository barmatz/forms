/** barmatz.events.FormModelEvent **/
window.barmatz.events.FormModelEvent = function(type)
{
	barmatz.utils.DataTypes.isNotUndefined(type);
	barmatz.utils.DataTypes.isTypeOf(type, 'string');
	barmatz.events.Event.call(this, type);
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
	SUBMISSION_FAILED: {value: 'submissionFailed'}
}); 
Object.defineProperties(barmatz.events.FormModelEvent.prototype, 
{
	clone: {value: function()
	{
		var event = new FormModelEvent(type);
		event._target = this.target;
		return event;
	}},
	toString: {value: function()
	{
		return this.formatToString('FormModelEvent', 'type');
	}}
});