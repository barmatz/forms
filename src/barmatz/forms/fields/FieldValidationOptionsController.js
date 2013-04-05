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
	}
	
	function changeModelByOption(option, bit)
	{
		barmatz.utils.DataTypes.isNotUndefined(option);
		barmatz.utils.DataTypes.isNotUndefined(bit);
		barmatz.utils.DataTypes.isInstanceOf(option, HTMLInputElement);
		barmatz.utils.DataTypes.isTypeOf(bit, 'number');

		model.validator.code = option.checked ? model.validator.code ? barmatz.utils.Bitwise.concat(model.validator.code, bit) : bit : barmatz.utils.Bitwise.slice(model.validator.code, bit); 
		
		switch(bit)
		{
			case barmatz.forms.ValidationModel.EQUALS:
				getOptionParameters(option, 'Equals to', 'equals');
				break;
			case barmatz.forms.ValidationModel.EXAC_LENGTH:
				getOptionParameters(option, 'Exact length', 'exactLength');
				break;
			case barmatz.forms.ValidationModel.MAX_LENGTH:
				getOptionParameters(option, 'Maximum length', 'maxLength');
				break;
			case barmatz.forms.ValidationModel.MIN_LENGTH:
				getOptionParameters(option, 'Minimum length', 'minLength');
				break;
			case barmatz.forms.ValidationModel.GREATER_THAN:
				getOptionParameters(option, 'Greater than', 'greaterThan');
				break;
			case barmatz.forms.ValidationModel.LESSER_THAN:
				getOptionParameters(option, 'Lesser than', 'lesserThan');
				break;
		}
	}
	
	function getOptionParameters(option, label, key)
	{
		var field;
		
		barmatz.utils.DataTypes.isNotUndefined(option);
		barmatz.utils.DataTypes.isNotUndefined(label);
		barmatz.utils.DataTypes.isNotUndefined(key);
		barmatz.utils.DataTypes.isInstanceOf(option, HTMLInputElement);
		barmatz.utils.DataTypes.isTypeOf(label, 'string');
		barmatz.utils.DataTypes.isTypeOf(key, 'string');
		
		if(option.checked)
			field = barmatz.forms.factories.DOMFactory.createChangePropertyPromptDialogWrapper('', label, model.validator[key] || '', function(event)
			{
				model.validator[key] = field.value;
			}, true).field;
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