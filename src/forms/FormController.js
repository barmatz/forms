window.barmatz.forms.FormController = function(model, view, submitButton)
{
	if(!(model instanceof barmatz.forms.FormModel))
		throw new TypeError('model is not a FormModel object');

	if(!(view instanceof HTMLFormElement))
		throw new TypeError('model is not an HTMLFormElement object');
	
	if(!(submitButton instanceof HTMLButtonElement || (submitButton instanceof HTMLInputElement && (submitButton.type == 'button' || submitButton.type == 'submit'))))
		throw new TypeError('submitButton is not an HTMLButtonElement object or HTMLInputElement object with type set to button or submit');
	
	barmatz.mvc.Controller.call(this);
	
	this.model = model;
	this.view = view;
	this.submitButton = submitButton;
	
	updateView();
	
	model.addEventListener(barmatz.events.ModelEvent.VALUE_CHANGED, onModelValueChanged);
	submitButton.addEventListener('click', onSubmitButtonClick);
	
	function updateView()
	{
		updateModelValueInView('id');
		updateModelValueInView('action');
		updateModelValueInView('method');
		updateModelValueInView('width', 'style.width');
	}
	
	function updateModelValueInView(modelKey, viewKey)
	{
		if(viewKey === undefined)
			viewKey = modelKey;
			
		if(view[viewKey] != model[modelKey])
			barmatz.utils.Objects.setNested(view, viewKey, model[modelKey]);
	}
	
	function onModelValueChanged(event)
	{
		updateView();
	}
	
	function onSubmitButtonClick(event)
	{
		model.submit();
	}
};

barmatz.forms.FormController.prototype = new barmatz.mvc.Controller();
barmatz.forms.FormController.prototype.constructor = barmatz.forms.FormController;
