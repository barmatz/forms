/** barmatz.forms.fields.FieldController **/
window.barmatz.forms.fields.FieldController = function(model, fieldView, errorMessageView)
{
	var settingValue, cachedErrorMessageVisibility;
	
	barmatz.utils.DataTypes.isNotUndefined(model);
	barmatz.utils.DataTypes.isNotUndefined(fieldView);
	barmatz.utils.DataTypes.isNotUndefined(errorMessageView);
	barmatz.utils.DataTypes.isInstanceOf(model, barmatz.forms.fields.FieldModel);
	barmatz.utils.DataTypes.isInstanceOf(fieldView, HTMLElement);
	barmatz.utils.DataTypes.isInstanceOf(errorMessageView, HTMLElement);
	barmatz.mvc.Controller.call(this);
	
	model.addEventListener(barmatz.events.ModelEvent.VALUE_CHANGED, onModelValueChanged);
	model.addEventListener(barmatz.events.FieldModelEvent.VALID, onModelValid);
	model.addEventListener(barmatz.events.FieldModelEvent.INVALID, onModelInvalid);
	fieldView.addEventListener('keydown', onFieldViewKeyDown);
	fieldView.addEventListener('change', onFieldViewChange);
	setModelValue();
	setErrorMessageContent();
	hideErrorMessage();
	
	function setModelValue()
	{
		if(!settingValue)
		{
			settingValue = true;
			
			if(model instanceof barmatz.forms.fields.PhoneFieldModel)
				model.value = fieldView.getElementsByTagName('select')[0].value + fieldView.getElementsByTagName('input')[0].value;
			else if(model instanceof barmatz.forms.fields.CheckboxFieldModel)
				model.checked = fieldView.checked;
			else
				model.value = fieldView.value;
			
			model.validate();
			
			settingValue = false;
		}

		fieldView.addEventListener('keydown', onFieldViewKeyDown);
		fieldView.removeEventListener('keyup', onFieldViewKeyUp);
	}
	
	function setErrorMessageContent()
	{
		errorMessageView.innerHTML = 'invalid';
	}
	
	function showErrorMessage()
	{
		errorMessageView.style.visibility = cachedErrorMessageVisibility;
		cachedErrorMessageVisibility = null;
	}
	
	function hideErrorMessage()
	{
		cachedErrorMessageVisibility = errorMessageView.style.visibility;
		errorMessageView.style.visibility = 'hidden';
	}
	
	function isErrorMessageHidden()
	{
		return errorMessageView.style.visibility == 'hidden';
	}
	
	function onModelValueChanged(event)
	{
		barmatz.utils.DataTypes.isNotUndefined(event);
		barmatz.utils.DataTypes.isInstanceOf(event, barmatz.events.ModelEvent);

		if(event.key == 'value')
		{
			if(!settingValue)
			{
				settingValue = true;
				fieldView.value = model.value;
				settingValue = false;
			}
		}
	}
	
	function onModelValid(event)
	{
		barmatz.utils.DataTypes.isNotUndefined(event);
		barmatz.utils.DataTypes.isInstanceOf(event, barmatz.events.FieldModelEvent);

		if(!isErrorMessageHidden())
			hideErrorMessage();
	}
	
	function onModelInvalid(event)
	{
		var errors, i;
		
		barmatz.utils.DataTypes.isNotUndefined(event);
		barmatz.utils.DataTypes.isInstanceOf(event, barmatz.events.FieldModelEvent);
		
		errors = barmatz.utils.Bitwise.parseBit(event.errors);
		errorMessageView.innerHTML = '';
		
		for(i = 0; i < errors.length; i++)
			switch(errors[i])
			{
				default:
					throw new Error('Unknown error code');
					break;
				case barmatz.forms.Validator.NONE:
					break;
				case barmatz.forms.Validator.NOT_EMPTY:
					errorMessageView.appendChild(barmatz.forms.factories.DOMFactory.createFormFieldErrorMessageItemElement('value is empty'));
					break;
				case barmatz.forms.Validator.EQUALS:
					errorMessageView.appendChild(barmatz.forms.factories.DOMFactory.createFormFieldErrorMessageItemElement('invalid value'));
					break;
				case barmatz.forms.Validator.VALID_EMAIL:
					errorMessageView.appendChild(barmatz.forms.factories.DOMFactory.createFormFieldErrorMessageItemElement('invalid email address'));
					break;
				case barmatz.forms.Validator.VALID_PHONE:
					errorMessageView.appendChild(barmatz.forms.factories.DOMFactory.createFormFieldErrorMessageItemElement('invalid phone number'));
					break;
				case barmatz.forms.Validator.MIN_LENGTH:
					errorMessageView.appendChild(barmatz.forms.factories.DOMFactory.createFormFieldErrorMessageItemElement('value must be ' + model.validator.minLength + ' characters minimum'));
					break;
				case barmatz.forms.Validator.MAX_LENGTH:
					errorMessageView.appendChild(barmatz.forms.factories.DOMFactory.createFormFieldErrorMessageItemElement('value must be ' + model.validator.maxLength + ' characters maximum'));
					break;
				case barmatz.forms.Validator.EXACT_LENGTH:
					errorMessageView.appendChild(barmatz.forms.factories.DOMFactory.createFormFieldErrorMessageItemElement('value must be exactly ' + model.validator.exactLength + ' characters'));
					break;
				case barmatz.forms.Validator.GREATER_THAN:
					errorMessageView.appendChild(barmatz.forms.factories.DOMFactory.createFormFieldErrorMessageItemElement('value must be greater than ' + model.validator.greaterThan));
					break;
				case barmatz.forms.Validator.LESSER_THAN:
					errorMessageView.appendChild(barmatz.forms.factories.DOMFactory.createFormFieldErrorMessageItemElement('valud must be lesser than ' + model.validator.lesserThan));
					break;
				case barmatz.forms.Validator.DIGITS_ONLY:
					errorMessageView.appendChild(barmatz.forms.factories.DOMFactory.createFormFieldErrorMessageItemElement('only digits are allowed'));
					break;
				case barmatz.forms.Validator.NOT_DIGITS:
					errorMessageView.appendChild(barmatz.forms.factories.DOMFactory.createFormFieldErrorMessageItemElement('cannot contain digits'));
					break;
			}
		
		if(isErrorMessageHidden())
			showErrorMessage();
	}
	
	function onFieldViewKeyDown(event)
	{
		fieldView.removeEventListener('keydown', onFieldViewKeyDown);
		fieldView.addEventListener('keyup', onFieldViewKeyUp);
	}
	
	function onFieldViewChange(event)
	{
		setModelValue();
	}
	
	function onFieldViewKeyUp(event)
	{
		setModelValue();
	}
};

barmatz.forms.fields.FieldController.prototype = new barmatz.mvc.Controller();
barmatz.forms.fields.FieldController.prototype.constructor = barmatz.forms.fields.FieldController;