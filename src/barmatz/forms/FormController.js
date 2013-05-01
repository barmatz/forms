/** barmatz.forms.FormController **/
barmatz.forms.FormController = function(model, formView, submitButtonView)
{
	var submittingForm, loadingDialog;

	barmatz.utils.DataTypes.isInstanceOf(model, barmatz.forms.FormModel);
	barmatz.utils.DataTypes.isInstanceOf(formView, HTMLFormElement);
	barmatz.utils.DataTypes.isInstanceOf(submitButtonView, window.HTMLElement);
	barmatz.mvc.Controller.call(this);
	
	formView.name = model.getName();
	formView.method = model.getMethod();
	formView.encoding = model.getEncoding();
	formView.setAttribute('onsubmit', 'return false;');
	formView.addEventListener('submit', onViewSubmit);
	
	function addModelListeners()
	{
		model.addEventListener(barmatz.events.FormEvent.SUBMITTING, onModelSubmitting);
		model.addEventListener(barmatz.events.FormEvent.SUBMITTED, onModelSubmitted);
		model.addEventListener(barmatz.events.FormEvent.SUBMISSION_FAILED, onModelSubmitionFailed);
	}
	 
	function removeModelListeners()
	{
		model.removeEventListener(barmatz.events.FormEvent.SUBMITTING, onModelSubmitting);
		model.removeEventListener(barmatz.events.FormEvent.SUBMITTED, onModelSubmitted);
		model.removeEventListener(barmatz.events.FormEvent.SUBMISSION_FAILED, onModelSubmitionFailed);
	}
	 
	function addLoadingDialog()
	{
		if(!loadingDialog)
			loadingDialog = barmatz.forms.factories.DOMFactory.createLoadingDialog(formView);
	}
	 
	function removeLoadingDialog()
	{
		if(loadingDialog)
		{
			barmatz.forms.factories.DOMFactory.destroyLoadingDialog(loadingDialog);
			loadingDialog = null;
		}
	}
	
	function submit()
	{
		if(!submittingForm)
		{
			addModelListeners();
			
			if(model.isValid())
				model.submit();
		}
	}
	 
	function onViewSubmit(event)
	{
		submit();
	}
	 
	function onModelSubmitting(event)
	{
		submittingForm = true;
		addLoadingDialog();
	}
	 
	function onModelSubmitted(event)
	{
		submittingForm = false;
		submitButtonView.innerHTML = barmatz.forms.Language.form.submit.success;
		submitButtonView.disabled = true;
		removeModelListeners(); 
		removeLoadingDialog();
	}
	 
	function onModelSubmitionFailed(event)
	{
		submittingForm = false;
		submitButtonView.innerHTML = barmatz.forms.Language.form.submit.error;
		removeModelListeners();
		removeLoadingDialog();
	 }
};
barmatz.forms.FormController.prototype = new barmatz.mvc.Controller();
barmatz.forms.FormController.prototype.constructor = barmatz.forms.FormController;