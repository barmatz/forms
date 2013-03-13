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
		barmatz.utils.DataTypes.isTypesOrInstances(content, ['string'], [HTMLElement, Array]);
		
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
	createDropboxElement: {value: function(model, selectedIndex)
	{
		var _this, dropbox;
		
		barmatz.utils.DataTypes.isNotUndefined(model);
		barmatz.utils.DataTypes.isInstanceOf(model, barmatz.forms.fields.DropboxModel);
		barmatz.utils.DataTypes.isTypeOf(selectedIndex, 'number', true);
		
		_this = this;
		dropbox = this.createElement('select');
		
		model.forEach(function(item, index, collection)
		{
			var option =_this.createElementWithContent('option', '', item.label);
			option.value = item.value;
			dropbox.appendChild(option);
		});
		
		if(selectedIndex)
			dropbox.selectedIndex = selectedIndex;
		
		return dropbox;
	}},
	createFormFieldElement: {value: function(model)
	{
		var field, key;
		
		barmatz.utils.DataTypes.isNotUndefined(model);
		barmatz.utils.DataTypes.isInstanceOf(model, barmatz.forms.fields.FieldModel);
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
				case barmatz.forms.fields.FieldTypes.TEXT:
				case barmatz.forms.fields.FieldTypes.PASSWORD:
				case barmatz.forms.fields.FieldTypes.CHECKBOX:
				case barmatz.forms.fields.FieldTypes.RADIO:
				case barmatz.forms.fields.FieldTypes.FILE:
				case barmatz.forms.fields.FieldTypes.HIDDEN:
					return 'input';
					break;
			}
		}
	}},
	createFieldWrapper: {value: function(model, className)
	{
		var wrapper, label, field, mandatory;
		
		barmatz.utils.DataTypes.isNotUndefined(model);
		barmatz.utils.DataTypes.isInstanceOf(model, barmatz.forms.fields.FieldModel);
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
	createToolbox: {value: function()
	{
		return this.createElement('ul');
	}},
	createWorkspaceWrapper: {value: function(formName, saveStatus)
	{
		var formNameElement, saveStatusElement, workspaceElement;
		
		barmatz.utils.DataTypes.isTypeOf(formName, 'string', true);
		barmatz.utils.DataTypes.isTypeOf(saveStatus, 'string', true);
		
		formNameElement = this.createElementWithContent('h1', 'forms-workspace-header-form-name', formName || '');
		saveStatusElement = this.createElementWithContent('h3', 'forms-workspace-header-save-status', saveStatus || '');
		workspaceElement = this.createElement('table', 'forms-workspace-items');

		return {wrapper: this.createElementWithContent('div', 'forms-workspace-wrapper', [this.createElementWithContent('div', 'forms-workspace-header', [formNameElement, saveStatusElement]), workspaceElement]), formName: formNameElement, saveStatus: saveStatusElement, workspace: workspaceElement};
	}},
	createProperties: {value: function()
	{
		return this.createElement('div');
	}},
	createToolboxItem: {value: function(label)
	{
		barmatz.utils.DataTypes.isNotUndefined(label);
		barmatz.utils.DataTypes.isTypeOf(label, 'string');
		return this.createElementWithContent('li', 'forms-toolbox-item', label);
	}},
	createWorkspaceItemWrapper: {value: function(model)
	{
		var _this, wrapper, grip, label, field, mandatory, deleteButton;
		
		barmatz.utils.DataTypes.isNotUndefined(model);
		barmatz.utils.DataTypes.isInstanceOf(model, barmatz.forms.fields.FieldModel);
		
		_this = this;
		wrapper = this.createElement('tr', 'forms-workspace-item');
		grip = this.createElement('span', 'forms-grip ui-icon ui-icon-grip-solid-vertical');
		label = this.createElementWithContent('label', '', model.label ? model.label : '');
		field = this.createFormFieldElement(model);
		mandatory = this.createElementWithContent('span', 'forms-workspace-item-mandatory', mandatory ? '*' : '');
		deleteButton = this.createIconButton('circle-close');
		
		addToWrapper('forms-workspace-item-grip', grip);
		addToWrapper('forms-workspace-item-label', label);
		addToWrapper('forms-workspace-item-field', [field, mandatory]);
		addToWrapper('forms-workspace-item-delete-button', deleteButton);
		
		return {wrapper: wrapper, label: label, field: field, mandatory: mandatory, deleteButton: deleteButton};
		
		function addToWrapper(className, content)
		{
			barmatz.utils.DataTypes.isNotUndefined(className);
			barmatz.utils.DataTypes.isNotUndefined(content);
			barmatz.utils.DataTypes.isTypeOf(className, 'string');
			wrapper.appendChild(_this.createElementWithContent('td', className, content));
		}
	}},
	createPropertiesItemWarpper: {value: function(model)
	{
		var _this, returnWrapper, wrapper;
		
		barmatz.utils.DataTypes.isNotUndefined(model);
		barmatz.utils.DataTypes.isInstanceOf(model, barmatz.forms.fields.FieldModel);
		
		_this = this;
		returnWrapper = {};
		
		wrapper = this.createElement('div');
		wrapper.appendChild(this.createElementWithContent('h2', 'forms-header', barmatz.utils.String.firstLetterToUpperCase(model.type) + ' field'));
		
		returnWrapper.wrapper = wrapper;
		
		if(model instanceof barmatz.forms.fields.FieldModel)
		{
			returnWrapper.nameField = addFieldToWrapper('string', 'name', 'name', model.name);
			returnWrapper.labelField = addFieldToWrapper('string', 'label', 'label', model.label);
			returnWrapper.mandatoryField = addFieldToWrapper('boolean', 'mandatory', 'mandatory', model.mandatory);
			returnWrapper.defaultValueField = addFieldToWrapper('string', 'default', 'default value', model.default);
			returnWrapper.enabledField = addFieldToWrapper('boolean', 'enabled', 'enabled', model.enabled);
		}
		
		if(model instanceof barmatz.forms.fields.FileFieldModel)
			returnWrapper.acceptField = addFieldToWrapper('array', 'accept', 'accept', model.accept);

		if(model instanceof barmatz.forms.fields.TextFieldModel)
			returnWrapper.maxField = addFieldToWrapper('number', 'max', 'max', model.max);
		
		if(model instanceof barmatz.forms.fields.CheckboxFieldModel)
		{
			returnWrapper.checkedField = addFieldToWrapper('boolean', 'checked', 'checked', model.checked);
			returnWrapper.defaultCheckedField = addFieldToWrapper('boolean', 'default checked', 'defaultChecked', model.defaultChecked);
		}
		
		return returnWrapper;
		
		function addFieldToWrapper(type, name, label, value)
		{
			var fieldWrapper;
			
			barmatz.utils.DataTypes.isNotUndefined(type);
			barmatz.utils.DataTypes.isNotUndefined(name);
			barmatz.utils.DataTypes.isNotUndefined(label);
			barmatz.utils.DataTypes.isNotUndefined(value);
			barmatz.utils.DataTypes.isTypeOf(type, 'string');
			barmatz.utils.DataTypes.isTypeOf(name, 'string');
			barmatz.utils.DataTypes.isTypeOf(label, 'string');

			fieldWrapper = _this.createPropertiesItemFieldWrapper(type, name, label, value, onFieldValueChange);
			wrapper.appendChild(fieldWrapper.wrapper);
			return fieldWrapper.field;
		}
		
		function onFieldValueChange(event)
		{
			barmatz.utils.DataTypes.isNotUndefined(event);
			barmatz.utils.DataTypes.isInstanceOf(event, Event);

			try
			{
				assignString();
			}
			catch(error)
			{
				try
				{
					assignArray();
				}
				catch(error)
				{
					try
					{
						assignBoolean();
					}
					catch(error)
					{
						assignNumber();
					}
				}
			}
			
			function assignString()
			{
				model[event.target.name] = event.target.value;
			}
			
			function assignArray()
			{
				model[event.target.name] = event.target.value.replace(/(^\s+|(,)\s+|\s+$)/g, '$2').split(',');
			}
			
			function assignBoolean()
			{
				model[event.target.name] = event.target.value == true || event.target.value == 'true' ? true : false;
			}
			
			function assignNumber()
			{
				model[event.target.name] = parseFloat(event.target.value);
			}
		}
	}},
	createPropertiesItemFieldWrapper: {value: function(type, name, label, value, changeHandler)
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
			case 'number':
			case 'array':
				field = this.createElement('input');
				field.type = 'text';
				switch(type)
				{
					case 'string':
						field.value = value == 'NaN' ? '' : value;
						break;
					case 'number':
						field.value = isNaN(value) ? '' : value;
						break;
					case 'array':
						field.value = value.join(', ');
						break;
				}
				break;
			case 'boolean':
				field = this.createDropboxElement(barmatz.forms.factories.ModelFactory.createDropboxModel([
					barmatz.forms.factories.ModelFactory.createDropboxItemModel('No', false),
					barmatz.forms.factories.ModelFactory.createDropboxItemModel('Yes', true)
				]), value ? 1 : 0);
				break;
		}
		
		field.name = name;
		field.addEventListener('change', changeHandler);

		return {wrapper: this.createElementWithContent('div', 'forms-item', [this.createElementWithContent('label', '', label), field]), field: field};
	}},
	createDialog: {value: function(title, content, container)
	{
		var dialog;
		
		barmatz.utils.DataTypes.isNotUndefined(title);
		barmatz.utils.DataTypes.isNotUndefined(content);
		barmatz.utils.DataTypes.isTypeOf(title, 'string');
		barmatz.utils.DataTypes.isTypesOrInstances(content, ['string'], [HTMLElement, Array]);
		barmatz.utils.DataTypes.isInstanceOf(container, HTMLElement, true);
		
		dialog = this.createElementWithContent('div', 'forms-dialog', content);
		dialog.title = title;
		(container || this.BODY_ELEMENT).appendChild(dialog);
		jQuery(dialog).dialog({autoOpen: false, draggable: false, modal: true});
		return dialog;
	}},
	destroyDialog: {value: function(dialog)
	{
		jQuery(dialog).dialog('destroy');
		dialog.parentElement.removeChild(dialog);
	}},
	createNewFieldDialogWrapper: {value: function()
	{
		var _this = this, dialog, nameField, labelField, wrapper, form;
		
		form = this.createElement('table');
		nameField = addField('Name');
		labelField = addField('Label');
		wrapper = this.createElementWithContent('div', '', form);
		dialog = this.createDialog('New Field', wrapper);
		
		jQuery(dialog).dialog({
			closeOnEscape: false,
			dialogClass: 'forms-dialog-prompt'
		});
		
		return {wrapper: dialog, nameField: nameField, labelField: labelField};
		
		function addField(label)
		{
			var field;
			
			barmatz.utils.DataTypes.isNotUndefined(label);
			barmatz.utils.DataTypes.isTypeOf(label, 'string');
			
			field = _this.createElement('input');
			field.type = 'text';
			form.appendChild(_this.createElementWithContent('tr', '', [_this.createElementWithContent('td', '', _this.createElementWithContent('label', '', label)), _this.createElementWithContent('td', '', field)]));
			return field;
		}
	}},
	createPromptDialog: {value: function(title, content, confirmHandler, open)
	{
		var _this, dialog;

		barmatz.utils.DataTypes.isNotUndefined(title);
		barmatz.utils.DataTypes.isNotUndefined(content);
		barmatz.utils.DataTypes.isNotUndefined(confirmHandler);
		barmatz.utils.DataTypes.isTypeOf(title, 'string');
		barmatz.utils.DataTypes.isTypesOrInstances(content, ['string'], [HTMLElement, Array]);
		barmatz.utils.DataTypes.isTypeOf(confirmHandler, 'function');
		barmatz.utils.DataTypes.isTypeOf(open, 'boolean', true);
		
		_this = this;
		dialog = this.createDialog(title, content);
		
		jQuery(dialog).dialog({
			buttons: {OK: onOKButtonClick, Cancel: onCancelButtonClick}
		});
		
		if(open)
			jQuery(dialog).dialog('open');
		
		return dialog;
		
		function onOKButtonClick(event)
		{
			_this.destroyDialog(dialog);
			confirmHandler(event);
		}
		
		function onCancelButtonClick()
		{
			_this.destroyDialog(dialog);
		}
	}},
	createChangePropertyPromptDialog: {value: function(title, key, value, confirmHandler, open)
	{
		var field, wrapper;

		barmatz.utils.DataTypes.isNotUndefined(title);
		barmatz.utils.DataTypes.isNotUndefined(key);
		barmatz.utils.DataTypes.isNotUndefined(value);
		barmatz.utils.DataTypes.isNotUndefined(confirmHandler);
		barmatz.utils.DataTypes.isTypeOf(title, 'string');
		barmatz.utils.DataTypes.isTypeOf(key, 'string');
		barmatz.utils.DataTypes.isTypeOf(confirmHandler, 'function');
		barmatz.utils.DataTypes.isTypeOf(open, 'boolean', true);
		
		field = this.createElement('input');
		field.type = 'text';
		field.value = value;
		wrapper = this.createElementWithContent('div', '', [this.createElementWithContent('label', '', key), field]);
		return {wrapper: wrapper, dialog: this.createPromptDialog(title, wrapper, confirmHandler, open), field: field};
	}},
	createConfirmPromptDialog: {value: function(message, confirmHandler, open)
	{
		barmatz.utils.DataTypes.isNotUndefined(message);
		barmatz.utils.DataTypes.isNotUndefined(confirmHandler);
		barmatz.utils.DataTypes.isTypeOf(message, 'string');
		barmatz.utils.DataTypes.isTypeOf(confirmHandler, 'function');
		barmatz.utils.DataTypes.isTypeOf(open, 'boolean', true);
		return this.createPromptDialog('Confirm', message, confirmHandler, open);
	}},
	createPanels: {value: function(panels)
	{
		var _this, i; 
		
		barmatz.utils.DataTypes.isNotUndefined(panels);
		barmatz.utils.DataTypes.isInstanceOf(panels, Array);
		
		_this = this;
		
		for(i = 0; i < panels.length; i++)
			panels[i] = getPanelElement(panels[i]);
		
		return this.createElementWithContent('table', 'forms-wrapper', this.createElementWithContent('tr', '', panels));
		
		function getPanelElement(model)
		{
			barmatz.utils.DataTypes.isNotUndefined(model);
			barmatz.utils.DataTypes.isInstanceOf(model, barmatz.forms.ui.PanelModel);
			return _this.createElementWithContent('td', model.className, model.content);
		}
	}},
	createMenuWrapper: {value: function()
	{
		var icon, menu, wrapper;
		icon = this.createMenuIcon();
		menu = this.createMenu();
		wrapper = this.createElementWithContent('div', 'forms-menu', [icon, menu]);
		return {wrapper: wrapper, icon: icon, menu: menu};
	}},
	createMenuIcon: {value: function()
	{
		return this.createIconButton('gear');
	}},
	createMenu: {value: function()
	{
		return this.createElement('ul');
	}},
	createMenuItem: {value: function(model)
	{
		var anchor;

		barmatz.utils.DataTypes.isNotUndefined(model);
		barmatz.utils.DataTypes.isInstanceOf(model, barmatz.forms.ui.MenuItemModel);

		anchor = this.createElementWithContent('a', '', model.label);
		anchor.href = '#';
		anchor.addEventListener('click', model.clickHandler);
		
		return this.createElementWithContent('li', '', anchor);
	}},
	createIconButton: {value: function(name)
	{
		var button;
		
		barmatz.utils.DataTypes.isNotUndefined(name);
		barmatz.utils.DataTypes.isTypeOf(name, 'string');
		
		button = this.createElementWithContent('span', 'ui-icon-wrapper ui-state-default ui-corner-all', this.createElement('span', 'ui-icon ui-icon-' + name));
		jQuery(button).button();
		
		return button;
	}}
});