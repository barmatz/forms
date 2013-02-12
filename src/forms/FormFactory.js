window.barmatz.forms.FormFactory = function(){};

Object.defineProperties(barmatz.forms.FormFactory, 
{
	TEXT: {value: 'text'},
	PASSWORD: {value: 'password'},
	RADIO: {value: 'radio'},
	CHECKBOX: {value: 'checkbox'},
	SELECT: {value: 'select'},
	OPTION: {value: 'option'},
	TEXTAREA: {value: 'textarea'},
	createForm: {value: function()
	{
		return barmatz.dom.DOMFactory.createElement('form', null, 'form');
	}},
	createElement: {value: function(type, name, value, className, parent)
	{
		var element;
		
		switch(type)
		{
			default:
				throw new Error('Unknown type');
				break;
			case this.TEXT:
			case this.PASSWORD:
			case this.RADIO:
			case this.CHECKBOX:
				element = barmatz.dom.DOMFactory.createElement('input', null, className, parent);
				element.type = type;
				break;
			case this.SELECT:
			case this.TEXTAREA:
			case this.OPTION:
				element = barmatz.dom.DOMFactory.createElement(type, null, className, parent);
				break;
		}
		
		if(name)
			element.name = name;
		
		if(value)
			element.value = value;
		
		return element;
	}},
	createWrappedItem: {value: function(id, type, label, value, isMandatory, error, selected)
	{
		var item = barmatz.dom.DOMFactory.createElement('div', null, 'form-item'),
			field, child, values, i;
		
		if(label)
			barmatz.dom.DOMFactory.createElement('label', label, 'form-item-label', item);
		
		switch(type)
		{
			default:
				throw new Error('Unknown field type');
				break;
			case this.TEXT:
			case this.PASSWORD:
			case this.TEXTAREA:
				field = this.createElement(type, id, value, 'form-item-field', item);
				break;
			case this.RADIO:
				field = barmatz.dom.DOMFactory.createElement('span', null, null, item);
				
				if(value)
				{
					values = value instanceof Array ? value : [value];
							 
					for(i = 0; i < values.length; i++)
					{
						value = values[i];
						child = this.createElement('radio', id, value.content, 'form-item-field', field);
						child.checked = value.selected;
						
						if(value.text)
							child = barmatz.dom.DOMFactory.createElement('span', value.text, null, field);
					}
				}
				break;
			case this.CHECKBOX:
				field = this.createElement('checkbox', id, value, 'form-item-field', item);
				field.checked = selected;
				break;
			case this.SELECT:
				field = this.createElement('select', id, value, 'form-item-field', item);
				
				if(value)
				{
					values = value instanceof Array ? value : [value];
					
					for(i = 0; i < values.length; i++)
					{
						value = values[i];
						child = this.createElement('option', null, value.content, null, field);
						child.innerHTML = value.text;
						child.selected = value.selected;
					}
				}
				break;
		}
		
		if(isMandatory)
			barmatz.dom.DOMFactory.createElement('span', '*', 'form-item-mandatory', item);
		
		if(error)
			barmatz.dom.DOMFactory.createElement('div', error, 'form-item-error', item);
		
		return item;
	}},
	createSubmitButton: {value: function(label, parent)
	{
		return barmatz.dom.DOMFactory.createElement('button', label, 'form-submit-button', parent);
	}},
	getValidationMethodByID: {value: function(id)
	{
		switch(id)
		{
			default:
				throw new Error('Unknown id');
				break;
			case barmatz.forms.Validation.MIN_LENGTH:
				return barmatz.forms.Validation.minLength;
				break;
			case barmatz.forms.Validation.MAX_LENGTH:
				return barmatz.forms.Validation.maxLength;
				break;
			case barmatz.forms.Validation.NOT_EMPTY:
				return barmatz.forms.Validation.notEmpty;
				break;
			case barmatz.forms.Validation.VALID_EMAIL:
				return barmatz.forms.Validation.validEmail;
				break;
			case barmatz.forms.Validation.VALID_PHONE:
				return barmatz.forms.Validation.validPhone;
				break;
			case barmatz.forms.Validation.CONTAINS_LETTERS:
				return barmatz.forms.Validation.containsLetters;
				break;
			case barmatz.forms.Validation.CONTAINS_DIGITS:
				return barmatz.forms.Validation.containsDigits;
				break;
			case barmatz.forms.Validation.CONTAINS_SPECIAL_CHARS:
				return barmatz.forms.Validation.containsSpecialCharacters;
				break;
		}
	}}
});