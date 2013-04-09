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
	
	function addFormToContainer(model)
	{
		var container, wrapper, field, submitButton, i;
		
		container = dictionary.get(model);
		wrapper = barmatz.forms.factories.DOMFactory.createElement('div', 'forms-form-wrapper forms-layout-' + model.layoutId);
		form = barmatz.forms.factories.DOMFactory.createElement('form');
		submitButton = barmatz.forms.factories.DOMFactory.createElementWithContent('button', 'forms-form-submit-button', model.submitButtonLabel);
		
		container.innerHTML = '';
		container.appendChild(barmatz.forms.factories.DOMFactory.createStylesheet('http://www.quiz.co.il/css/form.css'));
		
		switch(model.direction)
		{
			default:
				throw new Error('Unknown direction');
				break;
			case barmatz.forms.Directions.LTR:
				barmatz.utils.CSS.addClass(wrapper, 'forms-ltr');
				break;
			case barmatz.forms.Directions.RTL:
				barmatz.utils.CSS.addClass(wrapper, 'forms-rtl');
				break;
		}

		for(i in model.stylesheets)
			container.appendChild(barmatz.forms.factories.DOMFactory.createStylesheet(model.stylesheets[i]));
		
		model.forEach(function(item, index, collection)
		{
			var field, errorMessage;
			
			field = barmatz.forms.factories.DOMFactory.createFormFieldElement(item);
			field.name = item.name;
			
			if(item instanceof barmatz.forms.fields.PhoneFieldModel)
				field.getElementsByTagName('input')[0].style.width = item.width + 'px';
			else
				field.style.width = item.width + 'px';
			
			errorMessage = barmatz.forms.factories.DOMFactory.createFormFieldErrorMessageElement();
			
			form.appendChild(barmatz.forms.factories.DOMFactory.createElementWithContent('div', 'forms-form-item', [
				barmatz.forms.factories.DOMFactory.createElementWithContent('label', '', item.label),
				field,
				barmatz.forms.factories.DOMFactory.createElementWithContent('span', 'forms-form-item-mandatory', item.mandatory ? '*' : ''),
				 errorMessage
			]));
			barmatz.forms.factories.ControllerFactory.createFieldController(item, field, errorMessage);
		});
		
		form.appendChild(barmatz.forms.factories.DOMFactory.createElementWithContent('div', 'forms-form-item forms-form-submit', submitButton));
		wrapper.appendChild(form);
		container.appendChild(wrapper);
		
		barmatz.forms.factories.ControllerFactory.createFormController(model, form, submitButton);
	}
	
	function onLoadingFormComplete(event)
	{
		addFormToContainer(event.target);
		removeFormModelListeners(event.target);
		dictionary.remove(event.target);
	}
	
	function onLoadingFormError(event)
	{
		removeFormModelListeners(event.target);
		dictionary.get(event.target).innerHTML = 'Error loading form';
		dictionary.remove(event.target);
	}
};
barmatz.forms.embed();