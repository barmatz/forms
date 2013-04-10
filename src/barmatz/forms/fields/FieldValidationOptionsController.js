/** barmatz.forms.fields.FieldValidationOptionsController **/
window.barmatz.forms.fields.FieldValidationOptionsController = function(model, options)
{
	barmatz.utils.DataTypes.isNotUndefined(model);
	barmatz.utils.DataTypes.isNotUndefined(options);
	barmatz.utils.DataTypes.isInstanceOf(model, barmatz.forms.fields.FieldModel);
	barmatz.utils.DataTypes.isTypeOf(options, 'object');
	barmatz.mvc.Controller.call(this);
	
	initOptions();
	
	function initOptions()
	{
		var i;
		for(i in options)
			initOption(options[i], parseInt(i));
	}
	
	function initOption(option, bit)
	{
		barmatz.utils.DataTypes.isNotUndefined(option);
		barmatz.utils.DataTypes.isNotUndefined(bit);
		barmatz.utils.DataTypes.isInstanceOf(option, HTMLInputElement);
		barmatz.utils.DataTypes.isTypeOf(bit, 'number');

		option.addEventListener('change', onOptionChange);
		
		if(barmatz.utils.Bitwise.contains(model.validator.code, bit))
			option.checked = true;
		
		if(model instanceof barmatz.forms.fields.PhoneFieldModel && barmatz.utils.Bitwise.contains(model.validator.code, barmatz.forms.Validator.VALID_PHONE))
			option.disabled = true;
	}
	
	function changeModelByOption(option, bit)
	{
		barmatz.utils.DataTypes.isNotUndefined(option);
		barmatz.utils.DataTypes.isNotUndefined(bit);
		barmatz.utils.DataTypes.isInstanceOf(option, HTMLInputElement);
		barmatz.utils.DataTypes.isTypeOf(bit, 'number');

		if(option.checked)
		{
			if(model.validator.code)
				bit = barmatz.utils.Bitwise.concat(model.validator.code, bit);
		}
		else
			bit = barmatz.utils.Bitwise.slice(model.validator.code, bit); 
		
		model.validator.code = bit; 
		
		switch(bit)
		{
			case barmatz.forms.Validator.EQUALS:
				getOptionParameters(option, 'Equals to', 'equals');
				break;
			case barmatz.forms.Validator.EXACT_LENGTH:
				getOptionParameters(option, 'Exact length', 'exactLength', true);
				break;
			case barmatz.forms.Validator.MAX_LENGTH:
				getOptionParameters(option, 'Maximum length', 'maxLength', true);
				break;
			case barmatz.forms.Validator.MIN_LENGTH:
				getOptionParameters(option, 'Minimum length', 'minLength', true);
				break;
			case barmatz.forms.Validator.GREATER_THAN:
				getOptionParameters(option, 'Greater than', 'greaterThan', true);
				break;
			case barmatz.forms.Validator.LESSER_THAN:
				getOptionParameters(option, 'Lesser than', 'lesserThan', true);
				break;
		}
	}
	
	function getOptionParameters(option, label, key, isNumber)
	{
		var dialogWrapper, field;
		
		barmatz.utils.DataTypes.isNotUndefined(option);
		barmatz.utils.DataTypes.isNotUndefined(label);
		barmatz.utils.DataTypes.isNotUndefined(key);
		barmatz.utils.DataTypes.isInstanceOf(option, HTMLInputElement);
		barmatz.utils.DataTypes.isTypeOf(label, 'string');
		barmatz.utils.DataTypes.isTypeOf(key, 'string');
		
		if(option.checked)
		{
			dialogWrapper = barmatz.forms.factories.DOMFactory.createChangePropertyPromptDialogWrapper('', label, model.validator[key] || '', function(event)
			{
				model.validator[key] = isNumber ? parseFloat(field.value) : field.value;
			}, true);
			field = dialogWrapper.field;
			barmatz.forms.factories.ControllerFactory.createJQueryDialogController(dialogWrapper.dialog);
		}
		else
			delete model.validator[key];
	}
	
	function onOptionChange(event)
	{
		var i;
		
		barmatz.utils.DataTypes.isNotUndefined(event);
		barmatz.utils.DataTypes.isInstanceOf(event, Event);
		
		for(i in options)
			if(options[i] == event.currentTarget)
				changeModelByOption(options[i], parseInt(i));
	}
};

barmatz.forms.fields.FieldValidationOptionsController.prototype = new barmatz.mvc.Controller();
barmatz.forms.fields.FieldValidationOptionsController.prototype.constructor = barmatz.forms.fields.FieldValidationOptionsController;