/** barmatz.forms.fields.FieldController **/
barmatz.forms.fields.FieldController = function(model, fieldView, errorMessageView)
{
	var settingValue, cachedErrorMessageVisibility, valueIsDescription;
	
	barmatz.utils.DataTypes.isInstanceOf(model, barmatz.forms.fields.FieldModel);
	barmatz.utils.DataTypes.isInstancesOf(fieldView, [HTMLInputElement, HTMLTextAreaElement, HTMLSelectElement, HTMLSpanElement]);
	barmatz.utils.DataTypes.isInstanceOf(errorMessageView, window.HTMLElement, true);
	barmatz.mvc.Controller.call(this);
	
	model.addEventListener(barmatz.events.ModelEvent.VALUE_CHANGED, onModelValueChanged);
	model.addEventListener(barmatz.events.FieldEvent.VALID, onModelValid);
	model.addEventListener(barmatz.events.FieldEvent.INVALID, onModelInvalid);
	fieldView.addEventListener('focus', onFieldViewFocus);
	fieldView.addEventListener('change', onFieldViewChange);
	setModelValue();
	addDescription();
	
	if(errorMessageView)
	{
		setErrorMessageContent();
		hideErrorMessage();
	}
	
	function addDescription()
	{
		if(model instanceof barmatz.forms.fields.TextFieldModel && !barmatz.forms.Validator.notEmpty(model.getValue()))
		{
			fieldView.value = model.getDescription();
			barmatz.utils.CSS.addClass(fieldView, 'forms-empty-field');
			valueIsDescription = true;
		}
	}
	
	function removeDescription()
	{
		if(valueIsDescription)
		{
			fieldView.value = '';
			barmatz.utils.CSS.removeClass(fieldView, 'forms-empty-field');
			valueIsDescription = false;
		}
	}
	
	function setModelValue()
	{
		if(!settingValue)
		{
			settingValue = true;
			
			if(model instanceof barmatz.forms.fields.PhoneFieldModel)
				model.setValue(fieldView.getElementsByTagName('select')[0].value + fieldView.getElementsByTagName('input')[0].value);
			else if(model instanceof barmatz.forms.fields.CheckboxFieldModel)
				model.setChecked(fieldView.checked);
			else
				model.setValue(fieldView.value);
			
			model.validate();
			settingValue = false;
		}
	}
	
	function setErrorMessageContent()
	{
		if(errorMessageView)
			errorMessageView.innerHTML = 'invalid';
	}
	
	function showErrorMessage()
	{
		if(errorMessageView)
		{
			errorMessageView.style.visibility = cachedErrorMessageVisibility;
			cachedErrorMessageVisibility = null;
		}
	}
	
	function hideErrorMessage()
	{
		if(errorMessageView)
		{
			if(cachedErrorMessageVisibility == null)
				cachedErrorMessageVisibility = errorMessageView.style.visibility;
			errorMessageView.style.visibility = 'hidden';
		}
	}
	
	function isErrorMessageHidden()
	{
		return errorMessageView && errorMessageView.style.visibility == 'hidden';
	}
	
	function onModelValueChanged(event)
	{
		barmatz.utils.DataTypes.isInstanceOf(event, barmatz.events.ModelEvent);

		switch(event.getKey())
		{
			case 'value':
				if(!settingValue)
				{
					settingValue = true;
					fieldView.value = model.getValue();
					settingValue = false;
				}
				break;
			case 'description':
				addDescription();
				break;
		}
	}
	
	function onModelValid(event)
	{
		if(errorMessageView)
			errorMessageView.innerHTML = '';
		
		if(!isErrorMessageHidden())
			hideErrorMessage();
	}
	
	function onModelInvalid(event)
	{
		var validator;
		
		barmatz.utils.DataTypes.isInstanceOf(event, barmatz.events.FieldEvent);
		
		if(errorMessageView)
		{
			errorMessageView.innerHTML = '';
			validator = model.getValidator();
			barmatz.utils.Array.forEach(barmatz.utils.Bitwise.parseBit(event.getErrors()), function(item, index, collection)
			{
				switch(item)
				{
					default:
						throw new Error('Unknown error code');
					break;
					case barmatz.forms.Validator.NONE:
						break;
					case barmatz.forms.Validator.NOT_EMPTY:
						errorMessageView.appendChild(barmatz.forms.factories.DOMFactory.createFormFieldErrorMessageItemElement(barmatz.forms.Language.form.field.errors.emptyValue));
						break;
					case barmatz.forms.Validator.EQUALS:
						errorMessageView.appendChild(barmatz.forms.factories.DOMFactory.createFormFieldErrorMessageItemElement(barmatz.forms.Language.form.field.errors.invalidValue));
						break;
					case barmatz.forms.Validator.VALID_EMAIL:
						errorMessageView.appendChild(barmatz.forms.factories.DOMFactory.createFormFieldErrorMessageItemElement(barmatz.forms.Language.form.field.errors.invalidEmail));
						break;
					case barmatz.forms.Validator.VALID_PHONE:
						errorMessageView.appendChild(barmatz.forms.factories.DOMFactory.createFormFieldErrorMessageItemElement(barmatz.forms.Language.form.field.errors.invalidPhone));
						break;
					case barmatz.forms.Validator.MIN_LENGTH:
						errorMessageView.appendChild(barmatz.forms.factories.DOMFactory.createFormFieldErrorMessageItemElement(barmatz.forms.Language.form.field.errors.minimumLength.replace(/\$\{1\}/, validator.minLength)));
						break;
					case barmatz.forms.Validator.MAX_LENGTH:
						errorMessageView.appendChild(barmatz.forms.factories.DOMFactory.createFormFieldErrorMessageItemElement(barmatz.forms.Language.form.field.errors.maximumLength.replace(/\$\{1\}/, validator.maxLength)));
						break;
					case barmatz.forms.Validator.EXACT_LENGTH:
						errorMessageView.appendChild(barmatz.forms.factories.DOMFactory.createFormFieldErrorMessageItemElement(barmatz.forms.Language.form.field.errors.exactLength.replace(/\$\{1\}/, validator.exactLength)));
						break;
					case barmatz.forms.Validator.GREATER_THAN:
						errorMessageView.appendChild(barmatz.forms.factories.DOMFactory.createFormFieldErrorMessageItemElement(barmatz.forms.Language.form.field.errors.greaterThan.replace(/\$\{1\}/, validator.greaterThan)));
						break;
					case barmatz.forms.Validator.LESSER_THAN:
						errorMessageView.appendChild(barmatz.forms.factories.DOMFactory.createFormFieldErrorMessageItemElement(barmatz.forms.Language.form.field.errors.lesserThan.replace(/\$\{1\}/, validator.lesserThan)));
						break;
					case barmatz.forms.Validator.DIGITS_ONLY:
						errorMessageView.appendChild(barmatz.forms.factories.DOMFactory.createFormFieldErrorMessageItemElement(barmatz.forms.Language.form.field.errors.digitsOnly));
						break;
					case barmatz.forms.Validator.NOT_DIGITS:
						errorMessageView.appendChild(barmatz.forms.factories.DOMFactory.createFormFieldErrorMessageItemElement(barmatz.forms.Language.form.field.errors.noDigits));
						break;
				}
			});
			
			if(isErrorMessageHidden())
				showErrorMessage();
		}
	}
	
	function onFieldViewFocus(event)
	{
		fieldView.removeEventListener('focus', onFieldViewFocus);
		fieldView.addEventListener('blur', onFieldViewBlur);
		removeDescription();
	}
	
	function onFieldViewBlur(event)
	{
		fieldView.addEventListener('focus', onFieldViewFocus);
		fieldView.removeEventListener('blur', onFieldViewBlur);
		addDescription();
	}
	
	function onFieldViewChange(event)
	{
		barmatz.utils.DataTypes.isInstanceOf(event, Event);
		
		if(model instanceof barmatz.forms.fields.PhoneFieldModel && event.target.tagName.toLowerCase() == 'select')
			return;
			
		setModelValue();
	}
};
barmatz.forms.fields.FieldController.prototype = new barmatz.mvc.Controller();
barmatz.forms.fields.FieldController.prototype.constructor = barmatz.forms.fields.FieldController;