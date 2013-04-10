/** barmatz.forms.FormController **/
window.barmatz.forms.FormController = function(model, formView, submitButtonView)
{
	var submittingForm, loadingDialog;

	barmatz.utils.DataTypes.isNotUndefined(model);
	barmatz.utils.DataTypes.isNotUndefined(formView);
	barmatz.utils.DataTypes.isNotUndefined(submitButtonView);
	barmatz.utils.DataTypes.isInstanceOf(model, barmatz.forms.FormModel);
	barmatz.utils.DataTypes.isInstanceOf(formView, HTMLFormElement);
	barmatz.utils.DataTypes.isInstanceOf(submitButtonView, HTMLElement);
	barmatz.mvc.Controller.call(this);
	
	formView.name = model.name;
	formView.method = model.method;
	formView.encoding = model.encoding;
	formView.setAttribute('onsubmit', 'return false;');
	formView.addEventListener('submit', onViewSubmit);
	
	function addModelListeners()
	{
		model.addEventListener(barmatz.events.FormModelEvent.SUBMITTING, onModelSubmitting);
		model.addEventListener(barmatz.events.FormModelEvent.SUBMITTED, onModelSubmitted);
		model.addEventListener(barmatz.events.FormModelEvent.SUBMISSION_FAILED, onModelSubmitionFailed);
	}
	 
	function removeModelListeners()
	{
		model.removeEventListener(barmatz.events.FormModelEvent.SUBMITTING, onModelSubmitting);
		model.removeEventListener(barmatz.events.FormModelEvent.SUBMITTED, onModelSubmitted);
		model.removeEventListener(barmatz.events.FormModelEvent.SUBMISSION_FAILED, onModelSubmitionFailed);
	}
	 
	function addLoadingDialog()
	{
		loadingDialog = barmatz.forms.factories.DOMFactory.createLoadingDialog(formView);
		barmatz.forms.factories.ControllerFactory.createJQueryDialogController(loadingDialog);
	}
	 
	function removeLoadingDialog()
	{
		barmatz.forms.factories.DOMFactory.destroyLoadingDialog(loadingDialog);
		loadingDialog = null;
	}
	 
	function onViewSubmit(event)
	{
		if(!submittingForm)
		{
			addModelListeners();
			
			if(model.isValid)
				model.submit();
		}
	}
	 
	function onModelSubmitting(event)
	{
		submittingForm = true;
		addLoadingDialog();
	}
	 
	function onModelSubmitted(event)
	{
		submittingForm = false;
		removeModelListeners(); 
		removeLoadingDialog();
	}
	 
	function onModelSubmitionFailed(event)
	{
		submittingForm = false;
		removeModelListeners();
		removeLoadingDialog();
	 }
};

barmatz.forms.FormController.prototype = new barmatz.mvc.Controller();
barmatz.forms.FormController.prototype.constructor = barmatz.forms.FormController;

Object.defineProperties(barmatz.forms.FormController.prototype, {});