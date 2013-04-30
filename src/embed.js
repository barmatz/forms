/** embed **/
barmatz.forms.embed = function(fingerprint)
{
	var dictionary = new barmatz.utils.Dictionary();
	
	getContainers();
	
	function getContainers()
	{
		var containers, i;
		
		containers = window.Array.prototype.slice.call(document.getElementsByName('formContainer')).filter(filterFormContainers);

		for(i = 0; i < containers.length; i++)
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
		var container, wrapper, field, submitButton, stylesheets, i;
		
		container = dictionary.get(model);
		wrapper = barmatz.forms.factories.DOMFactory.createElement('div', 'forms-form-wrapper forms-layout-' + model.getLayoutId());
		form = barmatz.forms.factories.DOMFactory.createElement('form');
		submitButton = barmatz.forms.factories.DOMFactory.createElementWithContent('button', 'forms-form-submit-button', model.getSubmitButtonLabel());
		
		container.innerHTML = '';
		container.appendChild(barmatz.forms.factories.DOMFactory.createStylesheet(barmatz.forms.Config.BASE_URL + '/css/form.css'));
		
		switch(model.getDirection())
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
		
		stylesheets = model.getStylesheets();

		for(i = 0; i < stylesheets.length; i++)
			container.appendChild(barmatz.forms.factories.DOMFactory.createStylesheet(stylesheets[i]));
		
		model.forEach(function(item, index, collection)
		{
			var field, errorMessage;
			
			field = barmatz.forms.factories.DOMFactory.createFormFieldElement(item);
			
			if(!(item instanceof barmatz.forms.fields.HTMLContentModel))
				field.name = item.getName();
			
			if(item instanceof barmatz.forms.fields.FieldModel)
			{
				if(item instanceof barmatz.forms.fields.PhoneFieldModel)
					field.getElementsByTagName('input')[0].style.width = item.getWidth() + 'px';
				else
					field.style.width = item.getWidth() + 'px';
			}
			
			errorMessage = barmatz.forms.factories.DOMFactory.createFormFieldErrorMessageElement();
			
			if(item instanceof barmatz.forms.fields.HTMLContentModel)
			{
				form.appendChild(barmatz.forms.factories.DOMFactory.createFormFieldElement(item));
			}
			else
			{
				form.appendChild(barmatz.forms.factories.DOMFactory.createElementWithContent('div', 'forms-form-item', [
					barmatz.forms.factories.DOMFactory.createElementWithContent('label', '', item.getLabel()),
				    field,
				    barmatz.forms.factories.DOMFactory.createElementWithContent('span', 'forms-form-item-mandatory', item.getMandatory() ? '*' : ''),
				    errorMessage
				]));
				barmatz.forms.factories.ControllerFactory.createFieldController(item, field, errorMessage);
			}
		});
		
		form.appendChild(barmatz.forms.factories.DOMFactory.createElementWithContent('div', 'forms-form-item forms-form-submit', submitButton));
		wrapper.appendChild(form);
		container.appendChild(wrapper);
		
		barmatz.forms.factories.ControllerFactory.createFormController(model, form, submitButton);
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