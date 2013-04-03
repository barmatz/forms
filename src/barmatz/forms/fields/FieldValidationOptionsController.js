/** barmatz.forms.fields.FieldValidationOptionsController **/
window.barmatz.forms.fields.FieldValidationOptionsController = function(model, options)
{
	var option, i;
	
	barmatz.utils.DataTypes.isNotUndefined(model);
	barmatz.utils.DataTypes.isNotUndefined(options);
	barmatz.utils.DataTypes.isInstanceOf(model, barmatz.forms.fields.FieldModel);
	barmatz.utils.DataTypes.isTypeOf(options, 'object');
	barmatz.mvc.Controller.call(this);
	
	for(i in options)
	{
		option = options[i];
		option.addEventListener('change', onOptionChange);
		
		if(barmatz.utils.Bitwise.contains(model.validatorCode, parseInt(i)))
			option.checked = true;
	}
	
	function onOptionChange(event)
	{
		barmatz.utils.DataTypes.isNotUndefined(event);
		barmatz.utils.DataTypes.isInstanceOf(event, Event);
		
		for(i in options)
		{
			option = event.currentTarget;
			
			if(options[i] == option)
			{
				i = parseInt(i);
				model.validatorCode = option.checked ? barmatz.utils.Bitwise.concat(model.validatorCode, i) : barmatz.utils.Bitwise.slice(model.validatorCode, i); 
			}
		}
	}
		
};

barmatz.forms.fields.FieldValidationOptionsController.prototype = new barmatz.mvc.Controller();
barmatz.forms.fields.FieldValidationOptionsController.prototype.constructor = barmatz.forms.fields.FieldValidationOptionsController;