/** barmatz.forms.ui.pages.PageModel **/
barmatz.forms.ui.pages.PageModel = function(firstState)
{
	barmatz.utils.DataTypes.isTypeOf(firstState, 'string', true);
	barmatz.mvc.Model.call(this);
	this.setState(firstState || null);
};
barmatz.forms.ui.pages.PageModel.prototype = new barmatz.mvc.Model();
barmatz.forms.ui.pages.PageModel.prototype.constructor = barmatz.forms.ui.pages.PageModel;
barmatz.forms.ui.pages.PageModel.prototype.getState = function()
{
	return this.get('state');
};
barmatz.forms.ui.pages.PageModel.prototype.setState = function(value)
{
	var currentState;
	barmatz.utils.DataTypes.isTypeOf(value, 'string', true);
	
	currentState = this.getState();
	
	if(currentState != value)
	{
		this.dispatchEvent(new barmatz.events.PageEvent(barmatz.events.PageEvent.SWITCHING_STATE, currentState, value));
		this.set('state', value);
		this.dispatchEvent(new barmatz.events.PageEvent(barmatz.events.PageEvent.STATE_SWITCHED, currentState, value));
	}
};