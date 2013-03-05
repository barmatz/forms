/** barmatz.forms.factories.DOMFactory **/
window.barmatz.forms.factories.DOMFactory = function(){};

Object.defineProperties(barmatz.forms.factories.DOMFactory,
{
	BODY_ELEMENT: {get: function()
	{
		if(!this._bodyElement)
			this._bodyElement = document.getElementsByTagName('body')[0];
		return this._bodyElement;
	}},
	createElement: {value: function(tagName, className)
	{
		var element;
		
		barmatz.utils.DataTypes.isNotUndefined(tagName);
		barmatz.utils.DataTypes.isTypeOf(tagName, 'string');
		barmatz.utils.DataTypes.isTypeOf(className, 'string', true);
		
		element = document.createElement(tagName);
		
		if(className)
			element.className = className;
		
		return element;
	}},
	createElementWithContent: {value: function(tagName, className, content, appendChildWrapper)
	{
		var element;
		
		barmatz.utils.DataTypes.isNotUndefined(tagName);
		barmatz.utils.DataTypes.isTypeOf(tagName, 'string');
		barmatz.utils.DataTypes.isTypeOf(className, 'string', true);
		
		if(barmatz.utils.DataTypes.isTypesOrInstances(content, ['string'], [HTMLElement, Array], true))
		{
			if(barmatz.utils.DataTypes.isTypeOf(appendChildWrapper, 'function', true))
			{
				element = this.createElement(tagName, className);
				
				if(barmatz.utils.DataTypes.applySilent('isTypeOf', content, 'string'))
					element.innerHTML = content;
				else if(barmatz.utils.DataTypes.applySilent('isInstanceOf', content, HTMLElement))
					element.appendChild(content);
				else if(barmatz.utils.DataTypes.applySilent('isInstanceOf', content, Array))
				{
					while(element.childNodes.length < content.length)
						element.appendChild(appendChildWrapper != null ? appendChildWrapper(content[element.childNodes.length]) : content[element.childNodes.length]);
				}
				
				return element;
			}
		}
		
		return null;
	}},
	createFormFieldElement: {value: function(model)
	{
		var field, key;
		
		barmatz.utils.DataTypes.isNotUndefined(model);
		barmatz.utils.DataTypes.isInstanceOf(model, barmatz.forms.fields.FormFieldModel);
		field = this.createElement(getElementTagName(model.type));
		
		if(field.tagName.toLowerCase() == 'input')
			field.type = model.type;
		
		for(key in model)
			if(field.hasOwnProperty(key))
				field[key] = model[key];
		
		return field;
		
		function getElementTagName(type)
		{
			switch(type)
			{
				case barmatz.forms.fields.FormFieldTypes.TEXT:
				case barmatz.forms.fields.FormFieldTypes.PASSWORD:
				case barmatz.forms.fields.FormFieldTypes.CHECKBOX:
				case barmatz.forms.fields.FormFieldTypes.RADIO:
				case barmatz.forms.fields.FormFieldTypes.FILE:
				case barmatz.forms.fields.FormFieldTypes.HIDDEN:
					return 'input';
					break;
			}
		}
	}},
	createFieldWrapper: {value: function(model, className)
	{
		var wrapper, label, field, mandatory;
		
		barmatz.utils.DataTypes.isNotUndefined(model);
		barmatz.utils.DataTypes.isInstanceOf(model, barmatz.forms.fields.FormFieldModel);
		barmatz.utils.DataTypes.isTypeOf(className, 'string', true);
		
		wrapper = this.createElement('div', className);
		label = wrapper.appendChild(this.createElementWithContent('label', '', model.label ? model.label : ''));
		field = wrapper.appendChild(this.createFormFieldElement(model));
		mandatory = wrapper.appendChild(this.createElementWithContent('span', '', mandatory ? '*' : ''));

		return {wrapper: wrapper, label: label, field: field, mandatory: mandatory};
	}},
	createSubmitButton: {value: function(label, clickHandler)
	{
		var wrapper, button;
		
		barmatz.utils.DataTypes.isNotUndefined(label);
		barmatz.utils.DataTypes.isNotUndefined(clickHandler);
		barmatz.utils.DataTypes.isTypeOf(clickHandler, 'function');
		wrapper = this.createElement('div');
		button = this.createElementWithContent('button', '', label);
		button.addEventListener('click', clickHandler);
		wrapper.appendChild(button);
		
		return wrapper;
	}},
	createBuilderToolbox: {value: function()
	{
		return this.createElement('ul', 'forms-builder-toolbox');
	}},
	createBuilderMenu: {value: function()
	{
		return this.createElement('ul', 'forms-builder-menu');
	}},
	createBuilderWorkspace: {value: function()
	{
		return this.createElement('div', 'forms-builder-workspace');
	}},
	createBuilderPropertiesPanel: {value: function()
	{
		return this.createElement('div', 'forms-builder-properties-panel');
	}},
	createToolboxItem: {value: function(label)
	{
		barmatz.utils.DataTypes.isNotUndefined(label);
		barmatz.utils.DataTypes.isTypeOf(label, 'string');
		return this.createElementWithContent('li', 'forms-toolbox-item', label);
	}},
	createMenuItem: {value: function(label)
	{
		barmatz.utils.DataTypes.isNotUndefined(label);
		barmatz.utils.DataTypes.isTypeOf(label, 'string');
		return this.createElementWithContent('li', 'forms-menu-item rounded-corner', label);
	}},
	createWorkspaceItemWrapper: {value: function(model)
	{
		var fieldWrapper, label, field, mandatory, deleteButton;
		
		barmatz.utils.DataTypes.isNotUndefined(model);
		barmatz.utils.DataTypes.isInstanceOf(model, barmatz.forms.fields.FormFieldModel);
		
		deleteButton = this.createElement('span', 'forms-delete ui-icon ui-icon-circle-close');
		fieldWrapper = this.createFieldWrapper(model, 'forms-workspace-item');
		fieldWrapper.field.disabled = true;
		fieldWrapper.wrapper.insertBefore(this.createElement('span', 'forms-grip ui-icon ui-icon-grip-dotted-vertical'), fieldWrapper.wrapper.childNodes[0]);
		fieldWrapper.wrapper.appendChild(deleteButton);
		
		return {wrapper: fieldWrapper.wrapper, label: fieldWrapper.label, field: fieldWrapper.field, mandatory: fieldWrapper.mandatory, deleteButton: deleteButton};
	}},
	createPropertiesPanelItem: {value: function(model)
	{
		var wrapper;
		
		barmatz.utils.DataTypes.isNotUndefined(model);
		barmatz.utils.DataTypes.isInstanceOf(model, barmatz.forms.fields.FormFieldModel);
		
		wrapper = this.createElement('div');
		wrapper.appendChild(this.createElementWithContent('div', 'forms-header', barmatz.utils.String.firstLetterToUpperCase(model.type)));
		
		if(model instanceof barmatz.forms.fields.FormFieldModel)
		{
			wrapper.appendChild(this.createPropertiesPanelItemField('string', 'name', 'name', model.name, onFieldValueChange));
			wrapper.appendChild(this.createPropertiesPanelItemField('string', 'label', 'label', model.label, onFieldValueChange));
			wrapper.appendChild(this.createPropertiesPanelItemField('boolean', 'mandatory', 'mandatory', model.mandatory, onFieldValueChange));
			wrapper.appendChild(this.createPropertiesPanelItemField('string', 'default', 'default value', model.default, onFieldValueChange));
			wrapper.appendChild(this.createPropertiesPanelItemField('string', 'value', 'value', model.value, onFieldValueChange));
			wrapper.appendChild(this.createPropertiesPanelItemField('boolean', 'enabled', 'enabled', model.enabled, onFieldValueChange));
		}
		
		if(model instanceof barmatz.forms.fields.FormFileFieldModel)
			wrapper.appendChild(this.createPropertiesPanelItemField('string', 'accept', 'accept', model.accept, onFieldValueChange));

		if(model instanceof barmatz.forms.fields.FormTextFieldModel)
		{
			wrapper.appendChild(this.createPropertiesPanelItemField('string', 'min', 'min', model.min, onFieldValueChange));
			wrapper.appendChild(this.createPropertiesPanelItemField('string', 'max', 'max', model.max, onFieldValueChange));
		}
		
		if(model instanceof barmatz.forms.fields.FormCheckboxFieldModel)
		{
			wrapper.appendChild(this.createPropertiesPanelItemField('boolean', 'checked', 'checked', model.checked, onFieldValueChange));
			wrapper.appendChild(this.createPropertiesPanelItemField('boolean', 'default checked', 'defaultChecked', model.defaultChecked, onFieldValueChange));
		}
		
		return wrapper;
		
		function onFieldValueChange(event)
		{
			try
			{
				model[event.target.name] = event.target.value;
			}
			catch(error)
			{
				try
				{
					model[event.target.name] = event.target.value == 'yes' ? true : false;
				}
				catch(error)
				{
					model[event.target.name] = parseFloat(event.target.value);
				}
			}
		}
	}},
	createPropertiesPanelItemField: {value: function(type, name, label, value, changeHandler)
	{
		var field;
		
		barmatz.utils.DataTypes.isNotUndefined(type);
		barmatz.utils.DataTypes.isNotUndefined(name);
		barmatz.utils.DataTypes.isNotUndefined(label);
		barmatz.utils.DataTypes.isNotUndefined(value);
		barmatz.utils.DataTypes.isNotUndefined(changeHandler);
		barmatz.utils.DataTypes.isTypeOf(type, 'string');
		barmatz.utils.DataTypes.isTypeOf(name, 'string');
		barmatz.utils.DataTypes.isTypeOf(label, 'string');
		barmatz.utils.DataTypes.isTypeOf(changeHandler, 'function');
		
		switch(type)
		{
			default:
				throw new Error('unknown type');
				break;
			case 'string':
				field = this.createElement('input');
				field.type = 'text';
				field.value = value;
				break;
			case 'boolean':
				field = this.createElement('select');
				field.appendChild(this.createElementWithContent('option', '', 'no'));
				field.appendChild(this.createElementWithContent('option', '', 'yes'));
				field.selectedIndex = value ? 1 : 0;
				break;
		}
		
		field.name = name;
		field.addEventListener('change', changeHandler);

		return this.createElementWithContent('div', 'forms-item', [this.createElementWithContent('label', '', label), field]);
	}},
	createDialog: {value: function(title, content, container)
	{
		var dialog = this.createElementWithContent('div', 'forms-dialog', content);
		dialog.title = title;
		(container || this.BODY_ELEMENT).appendChild(dialog);
		return dialog;
	}},
	destroyDialog: {value: function(dialog)
	{
		jQuery(dialog).dialog('destroy');
		dialog.parentElement.removeChild(dialog);
	}},
	createNewFieldDialog: {value: function(okHandler)
	{
		var dialog, nameField;
		
		barmatz.utils.DataTypes.isNotUndefined(okHandler);
		barmatz.utils.DataTypes.isTypeOf(okHandler, 'function');
		
		nameField = this.createElement('input');
		nameField.type = 'text';
		
		dialog = this.createDialog('New Field', this.createElementWithContent('div', '', [
			this.createElementWithContent('label', '', 'Field name'),
			nameField
		]));
		
		jQuery(dialog).dialog({
			buttons: {Ok: function()
			{
				okHandler(dialog, nameField);
			}}, 
			closeOnEscape: false, 
			draggable: false, 
			modal: true,
			open: function(event, ui)
			{
				jQuery(event.target.parentElement).find('.ui-dialog-titlebar-close').hide();
			}
		});
		
		return dialog;
	}}
});