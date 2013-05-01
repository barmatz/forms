/** barmatz.forms.fields.FieldValidationOptionsController **/
barmatz.forms.fields.FieldValidationOptionsController = function(model, views, dialogContainerView)
{
	barmatz.utils.DataTypes.isInstanceOf(model, barmatz.forms.fields.FieldModel);
	barmatz.utils.DataTypes.isTypeOf(views, 'object');
	barmatz.utils.DataTypes.isInstanceOf(dialogContainerView, window.HTMLElement, true);
	barmatz.mvc.Controller.call(this);
	
	initViews();
	
	function initViews()
	{
		var i;
		for(i in views)
			initView(views[i], parseInt(i));
	}
	
	function initView(view, bit)
	{
		var code; 
		
		barmatz.utils.DataTypes.isInstanceOf(view, HTMLInputElement);
		barmatz.utils.DataTypes.isTypeOf(bit, 'number');
		
		code = model.getValidator().getCode();

		view.addEventListener('click', onViewClick);
		
		if(barmatz.utils.Bitwise.contains(code, bit))
			view.checked = true;
		
		if(model instanceof barmatz.forms.fields.PhoneFieldModel && barmatz.utils.Bitwise.contains(code, barmatz.forms.Validator.VALID_PHONE))
			view.disabled = true;
	}
	
	function changeModelByView(view, bit)
	{
		var code;
		
		barmatz.utils.DataTypes.isInstanceOf(view, HTMLInputElement);
		barmatz.utils.DataTypes.isTypeOf(bit, 'number');
		
		code = model.getValidator().getCode();
		
		switch(bit)
		{
			case barmatz.forms.Validator.EQUALS:
				setViewParameters(view, 'Equals to', 'equals');
				break;
			case barmatz.forms.Validator.EXACT_LENGTH:
				setViewParameters(view, 'Exact length', 'exactLength', true);
				break;
			case barmatz.forms.Validator.MAX_LENGTH:
				setViewParameters(view, 'Maximum length', 'maxLength', true);
				break;
			case barmatz.forms.Validator.MIN_LENGTH:
				setViewParameters(view, 'Minimum length', 'minLength', true);
				break;
			case barmatz.forms.Validator.GREATER_THAN:
				setViewParameters(view, 'Greater than', 'greaterThan', true);
				break;
			case barmatz.forms.Validator.LESSER_THAN:
				setViewParameters(view, 'Lesser than', 'lesserThan', true);
				break;
		}

		if(view.checked)
		{
			if(code)
				bit = barmatz.utils.Bitwise.concat(code, bit);
		}
		else
			bit = barmatz.utils.Bitwise.slice(code, bit); 
		
		model.getValidator().setCode(bit); 
	}
	
	function setViewParameters(view, label, key, isNumber)
	{
		var dialogWrapper, field;
		
		barmatz.utils.DataTypes.isInstanceOf(view, HTMLInputElement);
		barmatz.utils.DataTypes.isTypeOf(label, 'string');
		barmatz.utils.DataTypes.isTypeOf(key, 'string');
		
		if(view.checked)
		{
			dialogWrapper = barmatz.forms.factories.DOMFactory.createChangePropertyPromptDialogWrapper('', label, model.getValidator()[key] || '', function(event)
			{
				model.getValidator()[key] = isNumber ? parseFloat(field.value) : field.value;
			}, true, dialogContainerView);
			field = dialogWrapper.field;
			barmatz.forms.factories.ControllerFactory.createJQueryDialogController(dialogWrapper.dialog);
		}
		else
			delete model.getValidator()[key];
	}
	
	function onViewClick(event)
	{
		var i;
		for(i in views)
			if(views[i] == event.currentTarget)
				changeModelByView(views[i], parseInt(i));
	}
};
barmatz.forms.fields.FieldValidationOptionsController.prototype = new barmatz.mvc.Controller();
barmatz.forms.fields.FieldValidationOptionsController.prototype.constructor = barmatz.forms.fields.FieldValidationOptionsController;