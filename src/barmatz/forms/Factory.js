/** barmatz.forms.Factory **/
window.barmatz.forms.Factory = function(){};

Object.defineProperties(barmatz.forms.Factory,
{
	createFormField: {value: function(type, name, properties)
	{
		var field = getFieldByType(type, name);
		
		if(properties.label)
			field.label = properties.label;
		
		if(properties.mandatory == true || properties.mandatory == 'true')
			field.mandatory = true;
		
		setProperties(field, properties);
		
		return field;
		
		function setProperties(object, properties)
		{
			var valueKeys = ['default', 'min', 'max', 'checked', 'value', 'enabled', 'accept'],
				key, value, i;
			
			for(i = 0; i < valueKeys.length; i++)
			{
				key = valueKeys[i];
				
				if(properties[key] !== undefined)
				{
					value = properties[key];
					
					if(object[key] !== undefined)
					{
						if(key == 'accept' && !(value instanceof Array))
							value = [value];
						
						switch(value)
						{
							case 'true':
								value = true;
								break;
							case 'false':
								value = false;
								break;
						}
						
						object[key] = value;
					}
					else
						throw new Error('field of type ' + type + ' doesn\'t have property ' + key);
				}
			}
		}
		
		function getFieldByType(type, name)
		{
			switch(type)
			{
				default:
					throw new Error('unknown field type');
					break;
				case barmatz.forms.FormFieldType.TEXT:
					return new barmatz.forms.FormTextField(name);
					break;
				case barmatz.forms.FormFieldType.PASSWORD:
					return new barmatz.forms.FormPasswordField(name);
					break;
				case barmatz.forms.FormFieldType.CHECKBOX:
					return new barmatz.forms.FormCheckboxField(name);
					break;
				case barmatz.forms.FormFieldType.RADIO: 
					return new barmatz.forms.FormRadioField(name);
					break;
				case barmatz.forms.FormFieldType.FILE:
					return new barmatz.forms.FormFileField(name);
					break;
				case barmatz.forms.FormFieldType.HIDDEN:
					return new barmatz.forms.FormHiddenField(name);
					break;
			}
		}
	}},
	createFormFieldElement: {value: function(data)
	{
		var field, key;
		
		if(data === undefined)
			throw new ReferenceError('expected property data is undefined');
		else if(!(data instanceof barmatz.forms.FormField))
			throw new TypeError('data is not a FormField object');
		
		field = document.createElement(getElementTagName(data.type));
		
		if(field.tagName.toLowerCase() == 'input')
			field.type = data.type;
		
		for(key in data)
			if(field.hasOwnProperty(key))
				field[key] = data[key];
		
		return field;
		
		function getElementTagName(type)
		{
			switch(type)
			{
				case barmatz.forms.FormFieldType.TEXT:
				case barmatz.forms.FormFieldType.PASSWORD:
				case barmatz.forms.FormFieldType.CHECKBOX:
				case barmatz.forms.FormFieldType.RADIO:
				case barmatz.forms.FormFieldType.FILE:
				case barmatz.forms.FormFieldType.HIDDEN:
					return 'input';
					break;
			}
		}
	}},
	createFieldWrapper: {value: function(data)
	{
		var wrapper, label, field, mandatory;
		
		if(data === undefined)
			throw new ReferenceError('expected property data is undefined');
		else if(!(data instanceof barmatz.forms.FormField))
			throw new TypeError('data is not a FormField object');
		
		wrapper = document.createElement('div')
		
		if(data.label)
		{
			label = document.createElement('label'),
			label.innerHTML = data.label;
			wrapper.appendChild(label);
		}
		
		field = barmatz.forms.Factory.createFormFieldElement(data);
		wrapper.appendChild(field);
		
		if(data.mandatory)
		{
			mandatory = document.createElement('span');
			mandatory.innerHTML = '*';
			wrapper.appendChild(mandatory);
		}

		return wrapper;
	}},
	createSubmitButton: {value: function(data)
	{
		var wrapper, button;
		
		if(data === undefined)
			throw new ReferenceError('expected property data is undefined');
		else if(!(data instanceof barmatz.forms.Button))
			throw new TypeError('data is not a Button object');
		
		wrapper = document.createElement('div');
		
		button = document.createElement('button');
		button.innerHTML = data.label;
		
		wrapper.appendChild(button);
		
		return wrapper;
	}}
});