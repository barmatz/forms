/** embed **/
barmatz.forms.embed = function(fingerprint)
{
	var dictionary = new barmatz.utils.Dictionary();
	
	getContainers();
	
	function getContainers()
	{
		var containers = barmatz.utils.Array.filter(barmatz.utils.Array.toArray(document.getElementsByName('formContainer')), filterFormContainers);
		barmatz.utils.Array.forEach(containers, function(item, index, collection)
		{
			embedForm(item);
		});
	}
	
	function filterFormContainers(element)
	{
		return !fingerprint || element.getAttribute('fingerprint') == fingerprint;
	}
	
	function embedForm(container)
	{
		loadFormForContainer(container);
	}
	
	function loadFormForContainer(container)
	{
		var formModel = barmatz.forms.factories.ModelFactory.createFormModel();
		dictionary.add(formModel, container);
		addFormModelListeners(formModel);
		formModel.loadByFingerprint(container.getAttribute('fingerprint'));
	}

	function addFormModelListeners(model)
	{
		model.addEventListener(barmatz.events.FormEvent.LOADING_FORM_COMPLETE, onLoadingFormComplete);
		model.addEventListener(barmatz.events.FormEvent.LOADING_FORM_ERROR, onLoadingFormError);
	}
	
	function removeFormModelListeners(model)
	{
		model.removeEventListener(barmatz.events.FormEvent.LOADING_FORM_COMPLETE, onLoadingFormComplete);
		model.removeEventListener(barmatz.events.FormEvent.LOADING_FORM_ERROR, onLoadingFormError);
	}
	
	function addFormToContainer(model)
	{
		var container, wrapper;
		
		container = dictionary.get(model);
		wrapper = barmatz.forms.factories.DOMFactory.createFormWrapper(model);
		barmatz.forms.factories.DOMFactory.clearElement(container);
		container.appendChild(wrapper.container);
		barmatz.forms.factories.ControllerFactory.createFormController(model, wrapper.form, wrapper.submitButton);
	}
	
	function onLoadingFormComplete(event)
	{
		var model;
		
		barmatz.utils.DataTypes.isInstanceOf(event, barmatz.events.FormEvent);
		
		model = event.getTarget();
		
		addFormToContainer(model);
		removeFormModelListeners(model);
		dictionary.remove(model);
	}
	
	function onLoadingFormError(event)
	{
		var model
		
		barmatz.utils.DataTypes.isInstanceOf(event, barmatz.events.FormEvent);
		
		model = event.getTarget();
		
		removeFormModelListeners(model);
		dictionary.get(model).innerHTML = 'Error loading form';
		dictionary.remove(model);
	}
};
barmatz.forms.embed();