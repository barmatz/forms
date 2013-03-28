/** embed **/
barmatz.forms.embed = function(fingerprint)
{
	var dictionary = new barmatz.utils.Dictionary();
	
	getContainers();
	
	function getContainers()
	{
		var containers, i;
		
		containers = Array.prototype.slice.call(document.getElementsByName('formContainer')).filter(filterFormContainers);

		for(i in containers)
			embedForm(containers[i]);
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
		model.addEventListener(barmatz.events.FormModelEvent.LOADING_FORM_COMPLETE, onLoadingFormComplete);
		model.addEventListener(barmatz.events.FormModelEvent.LOADING_FORM_ERROR, onLoadingFormError);
	}
	
	function removeFormModelListeners(model)
	{
		model.removeEventListener(barmatz.events.FormModelEvent.LOADING_FORM_COMPLETE, onLoadingFormComplete);
		model.removeEventListener(barmatz.events.FormModelEvent.LOADING_FORM_ERROR, onLoadingFormError);
	}
	
	function onLoadingFormComplete(event)
	{
		var container = dictionary.get(event.target);
		dictionary.remove(event.target);
		removeFormModelListeners(event.target);
		container.innerHTML = event.target.toHTML();
		barmatz.forms.factories.ControllerFactory.createFormController(event.target, container.getElementsByTagName('form')[0]);
	}
	
	function onLoadingFormError(event)
	{
		removeFormModelListeners(event.target);
		dictionary.get(event.target).innerHTML = 'Error loading form';
		dictionary.remove(event.target);
	}
};
barmatz.forms.embed();