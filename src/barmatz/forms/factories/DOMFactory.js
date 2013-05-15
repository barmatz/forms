/** barmatz.forms.factories.DOMFactory **/
barmatz.forms.factories.DOMFactory = {
	getBodyElement: function()
	{
		if(!this._bodyElement)
			this._bodyElement = document.getElementsByTagName('body')[0];
		return this._bodyElement;
	},
	createStylesheet: function(href)
	{
		var link;
		
		barmatz.utils.DataTypes.isNotUndefined(href);
		barmatz.utils.DataTypes.isTypeOf(href, 'string');
		
		link = this.createElement('link');
		link.rel = 'stylesheet';
		link.type = 'text/css';
		link.href = href;
		return link;
	},
	addContent: function(content, container)
	{
		barmatz.utils.DataTypes.isNotUndefined(content);
		barmatz.utils.DataTypes.isInstanceOf(container, window.HTMLElement);
		
		if(content instanceof window.HTMLElement)
			container.appendChild(content);
		else if(content instanceof window.Array)
			barmatz.utils.Array.forEach(content, function(item, index, collection)
			{
				this.addContent(item, container);
			}, this);
		else
			container.innerHTML += content.toString();
	},
	clearElement: function(element)
	{
		barmatz.utils.DataTypes.isInstanceOf(element, window.HTMLElement);
		element.innerHTML = '';
	},
	createElement: function(tagName, className)
	{
		var element;
		
		barmatz.utils.DataTypes.isNotUndefined(tagName);
		barmatz.utils.DataTypes.isTypeOf(tagName, 'string');
		barmatz.utils.DataTypes.isTypeOf(className, 'string', true);
		
		element = document.createElement(tagName);
		
		if(className)
			element.className = className;
		
		return element;
	},
	createElementWithContent: function(tagName, className, content, appendChildWrapper)
	{
		var _this, element;
		
		barmatz.utils.DataTypes.isTypeOf(tagName, 'string');
		barmatz.utils.DataTypes.isTypeOf(className, 'string', true);
		barmatz.utils.DataTypes.isNotUndefined(content);
		barmatz.utils.DataTypes.isTypeOf(appendChildWrapper, 'function', true);
		
		_this = this;
		element = this.createElement(tagName, className);
		this.addContent(content, element);
		
		return element;
	},
	createButton: function(label, clickHandler, className)
	{
		var button;
		
		barmatz.utils.DataTypes.isTypeOf(label, 'string');
		barmatz.utils.DataTypes.isTypeOf(clickHandler, 'function', true);
		barmatz.utils.DataTypes.isTypeOf(className, 'string', true);
		
		button = this.createElementWithContent('button', className || '', label);
		
		if(clickHandler != null)
			button.addEventListener('click', clickHandler);
		
		this.formatButton(button);
		
		return button;
	},
	formatButton: function(button)
	{
		barmatz.utils.DataTypes.isInstanceOf(button, window.HTMLElement);
		jQuery(button).button();
	},
	createDropboxElement: function(model, selectedIndex)
	{
		var _this, dropbox;
		
		barmatz.utils.DataTypes.isNotUndefined(model);
		barmatz.utils.DataTypes.isInstanceOf(model, barmatz.forms.fields.DropboxModel);
		barmatz.utils.DataTypes.isTypeOf(selectedIndex, 'number', true);
		
		_this = this;
		dropbox = this.createElement('select');
		dropbox.name = model.getName();
		
		model.forEach(function(item, index, collection)
		{
			dropbox.appendChild(_this.createDropboxItemElement(item));
		});
		
		if(selectedIndex)
			dropbox.selectedIndex = selectedIndex;
		
		return dropbox;
	},
	createDropboxItemElement: function(model)
	{
		var item;
	
		barmatz.utils.DataTypes.isNotUndefined(model);
		barmatz.utils.DataTypes.isInstanceOf(model, barmatz.forms.fields.DropboxItemModel);
		
		item = this.createElementWithContent('option', '', model.getLabel());
		item.value = model.getValue();
		
		return item;
	},
	createFormWrapper: function(model)
	{
		var _this, wrapper;
		
		barmatz.utils.DataTypes.isInstanceOf(model, barmatz.forms.FormModel);
		
		_this = this;
		wrapper = {
			form: barmatz.forms.factories.DOMFactory.createElement('form'),
			submitButton: barmatz.forms.factories.DOMFactory.createElementWithContent('button', 'forms-form-submit-button', model.getSubmitButtonLabel()),
			container: barmatz.forms.factories.DOMFactory.createElement('div', 'forms-form-wrapper forms-layout-' + model.getLayoutId())
		};

		wrapper.container.appendChild(this.createStylesheet(barmatz.forms.Config.BASE_URL + '/css/form.css'));

		barmatz.utils.Array.forEach(model.getStylesheets(), function(item, index, collection)
		{
			wrapper.container.appendChild(_this.createStylesheet(item));
		});

		
		switch(model.getDirection())
		{
			default:
				throw new Error('Unknown direction');
				break;
			case barmatz.forms.Directions.LTR:
				barmatz.utils.CSS.addClass(wrapper.container, 'forms-ltr');
				break;
			case barmatz.forms.Directions.RTL:
				barmatz.utils.CSS.addClass(wrapper.container, 'forms-rtl');
				break;
		}
		
		model.forEach(function(item, index, collection)
		{
			var field, errorMessage;
			
			field = _this.createFormFieldElement(item);
			
			if(!(item instanceof barmatz.forms.fields.HTMLContentModel))
				field.name = item.getName();
			
			if(item instanceof barmatz.forms.fields.FieldModel)
			{
				if(item instanceof barmatz.forms.fields.PhoneFieldModel)
					field.getElementsByTagName('input')[0].style.width = item.getWidth() + 'px';
				else
					field.style.width = item.getWidth() + 'px';
			}
			
			errorMessage = _this.createFormFieldErrorMessageElement();
			
			if(item instanceof barmatz.forms.fields.HTMLContentModel)
				wrapper.form.appendChild(_this.createFormFieldElement(item));
			else if(item instanceof barmatz.forms.fields.HiddenFieldModel)
				wrapper.form.appendChild(field);
			else
			{
				wrapper.form.appendChild(_this.createElementWithContent('div', 'forms-form-item', [
					_this.createElementWithContent('label', '', item.getLabel()), field,
				    _this.createElementWithContent('span', 'forms-form-item-mandatory', item.getMandatory() ? '*' : ''), errorMessage
				]));
				barmatz.forms.factories.ControllerFactory.createFieldController(item, field, errorMessage);
			}
		});

		wrapper.form.appendChild(this.createElementWithContent('div', 'forms-form-item forms-form-submit', wrapper.submitButton));
		wrapper.container.appendChild(wrapper.form);
		
		return wrapper;
		
	},
	createFormFieldElement: function(model)
	{
		var _this, field, type;
		
		barmatz.utils.DataTypes.isInstanceOf(model, barmatz.forms.fields.FormItemModel);
		
		_this = this;
		type = model.getType();
		field = this.createElement(getElementTagName(type || barmatz.forms.fields.FieldTypes.HTML_CONTENT));
		
		if(model instanceof barmatz.forms.fields.PhoneFieldModel)
			createPhoneField();
		
		if(field.tagName.toLowerCase() == 'input')
			field.type = type;
		
		setFieldPropertiesByModel(field, model);
		
		return field;
		
		function setFieldPropertiesByModel(field, model)
		{
			var max, prefix;
			
			barmatz.utils.DataTypes.isNotUndefined(field);
			barmatz.utils.DataTypes.isNotUndefined(model);
			barmatz.utils.DataTypes.isInstanceOf(field, window.HTMLElement);
			barmatz.utils.DataTypes.isInstanceOf(model, barmatz.forms.fields.FormItemModel);
			
			if(field.hasOwnProperty('value'))
				field.value = model.getValue();
			
			if(field.hasOwnProperty('enabled'))
				field.enabled = model.getEnabled();
			
			if(model instanceof barmatz.forms.fields.TextFieldModel)
			{
				max = model.getMax();
				if(!isNaN(max))
					field.maxLength = max;
			}
			
			if(model instanceof barmatz.forms.fields.CheckboxFieldModel)
				field.checked = model.getChecked();
			
			if(model instanceof barmatz.forms.fields.FileFieldModel)
				field.accept = model.getAccept();
			
			if(model instanceof barmatz.forms.fields.TextAreaFieldModel)
			{
				field.rows = model.getRows();
				field.cols = model.getCols();
			}
			
			if(model instanceof barmatz.forms.fields.DropboxModel)
			{
				field.multiple = model.getMultiple();
				
				model.forEach(function(item, index, collection)
				{
					field.appendChild(_this.createDropboxItemElement(item));
				});
			}
			
			if(model instanceof barmatz.forms.fields.PhoneFieldModel)
			{
				prefix = model.getPrefix();
				field.getElementsByTagName('select')[0].value = prefix;
				field.getElementsByTagName('input')[0].value = model.getValue().replace(prefix, '');
			}

			if(model instanceof barmatz.forms.fields.HTMLContentModel)
				field.innerHTML = model.getContent();
		}
		
		function getElementTagName(type)
		{
			barmatz.utils.DataTypes.isNotUndefined(type);
			barmatz.utils.DataTypes.isTypeOf(type, 'string');
			
			switch(type)
			{
				default:
					throw new Error('Unknown type');
					break;
				case barmatz.forms.fields.FieldTypes.HTML_CONTENT:
					return 'div';
					break;
				case barmatz.forms.fields.FieldTypes.TEXT_FIELD:
				case barmatz.forms.fields.FieldTypes.PASSWORD:
				case barmatz.forms.fields.FieldTypes.CHECKBOX:
				case barmatz.forms.fields.FieldTypes.RADIO:
				case barmatz.forms.fields.FieldTypes.FILE:
				case barmatz.forms.fields.FieldTypes.HIDDEN:
					return 'input';
					break;
				case barmatz.forms.fields.FieldTypes.TEXT_AREA:
					return 'textarea';
					break;
				case barmatz.forms.fields.FieldTypes.DROPBOX:
					return 'select';
					break;
				case barmatz.forms.fields.FieldTypes.PHONE:
					return 'div';
					break;
			}
		}
		
		function createPhoneField()
		{
			var phoneField, prefixModel;
			
			phoneField = _this.createElement('input');
			phoneField.name = 'phone';
			phoneField.maxLength = 7;
			
			prefixModel = barmatz.forms.factories.ModelFactory.createDropboxModel('phone-prefix');
			prefixModel.addItem(barmatz.forms.factories.ModelFactory.createDropboxItemModel('', ''));
			
			barmatz.forms.fields.PhonePrefixes.forEach(function(prefix)
			{
				prefixModel.addItem(barmatz.forms.factories.ModelFactory.createDropboxItemModel(prefix, prefix));
			});
	
			barmatz.utils.CSS.addClass(field, 'forms-phone-field');
			field.dir = 'ltr';
			field.appendChild(_this.createDropboxElement(prefixModel));
			field.appendChild(phoneField)
		}
	},
	createFieldWrapper: function(model, className)
	{
		var wrapper, label, field, mandatory;
		
		barmatz.utils.DataTypes.isNotUndefined(model);
		barmatz.utils.DataTypes.isInstanceOf(model, barmatz.forms.fields.FieldModel);
		barmatz.utils.DataTypes.isTypeOf(className, 'string', true);
		
		wrapper = this.createElement('div', className);
		label = wrapper.appendChild(this.createElementWithContent('label', '', model.getLabel() || ''));
		field = wrapper.appendChild(this.createFormFieldElement(model));
		mandatory = wrapper.appendChild(this.createElementWithContent('span', '', model.getMandatory() ? '*' : ''));
	
		return {wrapper: wrapper, label: label, field: field, mandatory: mandatory};
	},
	createSubmitButton: function(label, clickHandler)
	{
		var wrapper, button;
		
		barmatz.utils.DataTypes.isNotUndefined(label);
		barmatz.utils.DataTypes.isNotUndefined(clickHandler);
		barmatz.utils.DataTypes.isTypeOf(clickHandler, 'function');
		wrapper = this.createElement('div');
		button = this.createButton(label, clickHandler);
		wrapper.appendChild(button);
		
		return wrapper;
	},
	createToolbox: function()
	{
		return this.createElement('ul');
	},
	createWorkspaceWrapper: function(formName, saveStatus)
	{
		var formNameElement, saveStatusElement, workspaceElement;
		
		barmatz.utils.DataTypes.isTypeOf(formName, 'string', true);
		barmatz.utils.DataTypes.isTypeOf(saveStatus, 'string', true);
		
		formNameElement = this.createElementWithContent('h1', 'forms-workspace-header-form-name', formName || '');
		saveStatusElement = this.createElementWithContent('h3', 'forms-workspace-header-save-status', saveStatus || '');
		workspaceElement = this.createElement('table', 'forms-workspace-items');
	
		return {wrapper: this.createElementWithContent('div', 'forms-workspace-wrapper', [this.createElementWithContent('div', 'forms-workspace-header', [formNameElement, saveStatusElement]), workspaceElement]), formName: formNameElement, saveStatus: saveStatusElement, workspace: workspaceElement};
	},
	createProperties: function()
	{
		return this.createElement('div');
	},
	createToolboxItem: function(label)
	{
		barmatz.utils.DataTypes.isNotUndefined(label);
		barmatz.utils.DataTypes.isTypeOf(label, 'string');
		return this.createElementWithContent('li', 'forms-toolbox-item', label);
	},
	createWorkspaceItemWrapper: function(model)
	{
		var _this, isFieldModel, wrapper, grip, label, field, mandatory, deleteButton;
		
		barmatz.utils.DataTypes.isNotUndefined(model);
		barmatz.utils.DataTypes.isInstanceOf(model, barmatz.forms.fields.FormItemModel);
		
		_this = this;
		isFieldModel = model instanceof barmatz.forms.fields.FieldModel;
		wrapper = this.createElement('tr', 'forms-workspace-item');
		grip = this.createElement('span', 'forms-grip ui-icon ui-icon-grip-solid-vertical');
		label = this.createElementWithContent('label', '', isFieldModel && model.getLabel() ? model.getLabel() : '');
		field = this.createFormFieldElement(model);
		mandatory = this.createElementWithContent('span', 'forms-form-item-mandatory', isFieldModel && model.getMandatory() ? '*' : '');
		deleteButton = this.createDeleteButton();
		
		if(model instanceof barmatz.forms.fields.HiddenFieldModel)
		{
			field.type = 'text';
			field.disabled = true;
			barmatz.utils.CSS.addClass(field, 'opacity-quarter');
		}
		
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
	},
	createPropertiesItemWarpper: function(model)
	{
		var _this, returnWrapper;
		
		barmatz.utils.DataTypes.isNotUndefined(model);
		barmatz.utils.DataTypes.isInstanceOf(model, barmatz.forms.fields.FormItemModel);
		
		_this = this;
		returnWrapper = {};
		
		returnWrapper.wrapper = this.createElement('div');
		returnWrapper.wrapper.appendChild(this.createElementWithContent('h2', 'forms-header', barmatz.utils.String.firstLetterToUpperCase(model.getType()) + ' field'));
		
		if(model instanceof barmatz.forms.fields.AbstractFieldModel)
			returnWrapper.nameField = addFieldToWrapper('string', 'name', 'name', model.getName());
		
		if(model instanceof barmatz.forms.fields.HiddenFieldModel)
			returnWrapper.valueField = addFieldToWrapper('string', 'value', 'value', model.getValue());
		
		if(model instanceof barmatz.forms.fields.FieldModel)
		{
			returnWrapper.labelField = addFieldToWrapper('string', 'label', 'label', model.getLabel());
			returnWrapper.mandatoryField = addFieldToWrapper('boolean', 'mandatory', 'mandatory', model.getMandatory());
			returnWrapper.enabledField = addFieldToWrapper('boolean', 'enabled', 'enabled', model.getEnabled());
			returnWrapper.widthField = addFieldToWrapper('number', 'width', 'width', model.getWidth());
		}
		
		if(model instanceof barmatz.forms.fields.FileFieldModel)
			returnWrapper.acceptField = addFieldToWrapper('string', 'accept', 'accept', model.getAccept().toString());
	
		if(model instanceof barmatz.forms.fields.TextFieldModel)
		{
			returnWrapper.descriptionField = addFieldToWrapper('string', 'description', 'description', model.getDescription());
			returnWrapper.maxField = addFieldToWrapper('number', 'max', 'max', model.getMax());
		}
		
		if(model instanceof barmatz.forms.fields.TextAreaFieldModel)
		{
			returnWrapper.rowsField = addFieldToWrapper('number', 'rows', 'rows', model.getRows());
			returnWrapper.colsField = addFieldToWrapper('number', 'cols', 'columns', model.getCols());
		}
		
		if(model instanceof barmatz.forms.fields.CheckboxFieldModel)
			returnWrapper.checkedField = addFieldToWrapper('boolean', 'checked', 'checked', model.getChecked());
		
		if(model instanceof barmatz.forms.fields.DropboxModel)
		{
			returnWrapper.multipleField = addFieldToWrapper('boolean', 'multiple', 'multiple', model.getMultiple());
			returnWrapper.editItemsButton = addFieldToWrapper('button', '', 'Edit items');
		}
	
		if(model instanceof barmatz.forms.fields.FieldModel)
			returnWrapper.validationOptionsButton = addFieldToWrapper('button', '', 'Validation options');
		
		if(model instanceof barmatz.forms.fields.HTMLContentModel)
			returnWrapper.editContentButton = addFieldToWrapper('button', '', 'Edit content');
		
		return returnWrapper;
		
		function addFieldToWrapper(type, name, label, value)
		{
			var fieldWrapper;
			
			barmatz.utils.DataTypes.isTypeOf(type, 'string');
			barmatz.utils.DataTypes.isTypeOf(name, 'string');
			barmatz.utils.DataTypes.isTypeOf(label, 'string');
	
			fieldWrapper = _this.createPropertiesItemFieldWrapper(type, name, label, value, onFieldValueChange);
			returnWrapper.wrapper.appendChild(fieldWrapper.wrapper);
			return fieldWrapper.field;
		}
		
		function onFieldValueChange(event)
		{
			var key, value;
			
			key = 'set' + barmatz.utils.String.firstLetterToUpperCase(event.target.name);
			value = event.target.value;
	
			try
			{
				model[key](value);
			}
			catch(error)
			{
				try
				{
					model[key](value.replace(/(^\s+|(,)\s+|\s+$)/g, '$2').split(','));
				}
				catch(error)
				{
					try
					{
						model[key](value == true || value == 'true' ? true : false);
					}
					catch(error)
					{
						try
						{
							model[key](parseFloat(value));
						}
						catch(error)
						{
							throw new Error('Unable to assign value to model. ' + error.message);
						}
					}
				}
			}
		}
	},
	createPropertiesItemFieldWrapper: function(type, name, label, value, changeHandler)
	{
		var content, field;
		
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
			case 'array':
				field = this.createElement('select');
				barmatz.utils.Array.forEach(value, function(item, index, collection)
				{
					field.appendChild(this.createElement('option')).innerHTML = item;
				});
				break;
			case 'boolean':
				field = this.createDropboxElement(barmatz.forms.factories.ModelFactory.createDropboxModel(name, [
					barmatz.forms.factories.ModelFactory.createDropboxItemModel('No', false),
					barmatz.forms.factories.ModelFactory.createDropboxItemModel('Yes', true)
				]), value ? 1 : 0);
				break;
			case 'button':
				field = this.createButton(label);
				break;
		}
		
		field.name = name;
		field.addEventListener('change', changeHandler);
		
		content = [];
	
		if(type != 'button')
			content.push(this.createElementWithContent('label', '', label));
		
		content.push(field);
	
		return {wrapper: this.createElementWithContent('div', 'forms-item', content), field: field};
	},
	createDialog: function(title, content, open, container)
	{
		var dialog;
		
		barmatz.utils.DataTypes.isTypeOf(title, 'string');
		barmatz.utils.DataTypes.isTypesOrInstances(content, ['string'], [window.HTMLElement, window.Array]);
		barmatz.utils.DataTypes.isTypeOf(open, 'boolean', true);
		barmatz.utils.DataTypes.isInstanceOf(container, window.HTMLElement, true);
		
		dialog = this.createElementWithContent('div', 'forms-dialog', content);
		dialog.title = title;
		(container || this.getBodyElement()).appendChild(dialog);
		jQuery(dialog).dialog({appendTo: dialog.parentElement, autoOpen: open === undefined ? true : open, modal: true});
		return dialog;
	},
	isDialog: function(dialog)
	{
		return /forms\-dialog/.test(dialog.className);
	},
	destroyDialog: function(dialog)
	{
		jQuery(dialog).dialog('destroy');
		barmatz.utils.CSS.removeClass(dialog, 'forms-dialog');
		dialog.parentElement.removeChild(dialog);
	},
	createNewFieldDialogWrapper: function(model, open, container)
	{
		var _this, dialog, nameField, labelField, wrapper, form, formTableOptions;
	
		barmatz.utils.DataTypes.isNotUndefined(model);
		barmatz.utils.DataTypes.isInstanceOf(model, barmatz.forms.fields.AbstractFieldModel);
		barmatz.utils.DataTypes.isTypeOf(open, 'boolean', true);
		barmatz.utils.DataTypes.isInstanceOf(container, window.HTMLElement, true);
		
		_this = this;
		wrapper = {};
		wrapper.nameField = getField(model.getName());
		formTableOptions = new barmatz.forms.ui.DataTableOptions();
		formTableOptions.getBodyRows().push(getRowContent('Name', wrapper.nameField));
		
		if(model.hasOwnProperty('getLabel'))
		{
			wrapper.labelField = getField(model.getLabel());
			formTableOptions.getBodyRows().push(getRowContent('Label', wrapper.labelField));
		}
		
		form = this.createTable(formTableOptions);
		wrapper.wrapper = this.createElementWithContent('div', '', form);
		wrapper.dialog = this.createDialog('New Field', wrapper.wrapper, open, container);
		
		jQuery(dialog).dialog({
			closeOnEscape: false,
			dialogClass: 'forms-dialog-prompt'
		});
		
		return wrapper;
		
		function getRowContent(label, field)
		{
			barmatz.utils.DataTypes.isNotUndefined(label);
			barmatz.utils.DataTypes.isNotUndefined(field);
			barmatz.utils.DataTypes.isTypeOf(label, 'string');
			barmatz.utils.DataTypes.isInstanceOf(field, window.HTMLElement);
			return [_this.createElementWithContent('label', '', label), field];
		}
		
		function getField(value)
		{
			var field;
	
			barmatz.utils.DataTypes.isNotUndefined(value);
			barmatz.utils.DataTypes.isTypeOf(value, 'string');
			
			field = _this.createElement('input');
			field.type = 'text';
			field.value = value;
			return field;
		}
	},
	createPromptDialog: function(title, content, confirmHandler, open, container)
	{
		var _this, dialog;
	
		barmatz.utils.DataTypes.isNotUndefined(title);
		barmatz.utils.DataTypes.isNotUndefined(content);
		barmatz.utils.DataTypes.isNotUndefined(confirmHandler);
		barmatz.utils.DataTypes.isTypeOf(title, 'string');
		barmatz.utils.DataTypes.isTypesOrInstances(content, ['string'], [window.HTMLElement, window.Array]);
		barmatz.utils.DataTypes.isTypeOf(confirmHandler, 'function');
		barmatz.utils.DataTypes.isTypeOf(open, 'boolean', true);
		barmatz.utils.DataTypes.isInstanceOf(container, window.HTMLElement, true);
		
		_this = this;
		dialog = this.createDialog(title, content, open, container);
		
		jQuery(dialog).dialog({
			buttons: {OK: onOKButtonClick, Cancel: onCancelButtonClick}
		});
		
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
	},
	createExportPromptDialog: function(fingerprint, loadingMessage, open, container)
	{
		var dir, embedCode, textarea;
		
		barmatz.utils.DataTypes.isNotUndefined(fingerprint);
		barmatz.utils.DataTypes.isTypeOf(loadingMessage, 'string', true);
		barmatz.utils.DataTypes.isTypeOf(open, 'boolean', true);
		barmatz.utils.DataTypes.isInstanceOf(container, window.HTMLElement, true);
		
		dir = location.href.replace(location.hash, '').replace(location.search, '').replace(/(^\w+:\/\/.+)\/.+\..+$/, '$1') + '/js'; 
		embedCode = '<div id="formContainer" name="formContainer" fingerprint="' + fingerprint + '">' + (loadingMessage || '') + '</div>' +
					'<script type="text/javascript">' +
					'(function(w,d)' +
					'{' +
						'w.barmatz && w.barmatz.forms && !w.barmatz.forms.embed' +
						' ? barmatz.forms.embed(\'' + fingerprint + '\')' +
						' : l(\'' + dir + '/embed.js\');' +
						'function l(s)' +
						'{' +
							'a=d.createElement(\'script\');' +
							'a.src=s;' +
							'b=d.getElementsByTagName(\'script\')[0];' +
							'b.parentNode.insertBefore(a,b);' +
						'}' +
					'})(window,document)' +
					'</script>';
		
		textarea = this.createElementWithContent('textarea', 'forms-dialog-export-embedcode', embedCode);
		textarea.readOnly = true;
		textarea.addEventListener('click', function(event)
		{
			event.currentTarget.focus();
			event.currentTarget.select();
		});
		
		return this.createAlertPromptDialog('Export', this.createElementWithContent('div', '', [
			this.createElementWithContent('div', '', 'Copy past this code into your site inside the body tag where you want the form to appear:'),
			textarea
		]), open, container);
	},
	createChangePropertyPromptDialogWrapper: function(title, key, value, confirmHandler, open, container)
	{
		var field, wrapper;
	
		barmatz.utils.DataTypes.isTypeOf(title, 'string');
		barmatz.utils.DataTypes.isTypeOf(key, 'string');
		barmatz.utils.DataTypes.isTypeOf(confirmHandler, 'function');
		barmatz.utils.DataTypes.isTypeOf(open, 'boolean', true);
		barmatz.utils.DataTypes.isInstanceOf(container, window.HTMLElement, true);
		
		field = this.createElement('input');
		field.type = 'text';
		field.value = value;
		wrapper = this.createElementWithContent('div', '', [this.createElementWithContent('label', '', key), field]);
		return {wrapper: wrapper, dialog: this.createPromptDialog(title, wrapper, confirmHandler, open, container), field: field};
	},
	createAlertPromptDialog: function(title, content, open, container)
	{
		var _this, dialog;
		
		barmatz.utils.DataTypes.isNotUndefined(title);
		barmatz.utils.DataTypes.isNotUndefined(content);
		barmatz.utils.DataTypes.isTypeOf(title, 'string');
		barmatz.utils.DataTypes.isTypesOrInstances(content, ['string'], [window.HTMLElement, window.Array]);
		barmatz.utils.DataTypes.isTypeOf(open, 'boolean', true);
		barmatz.utils.DataTypes.isInstanceOf(container, window.HTMLElement, true);
		
		_this = this;
		dialog = this.createDialog(title, content, open, container);
		
		jQuery(dialog).dialog({
			buttons: {OK: onOKButtonClick}
		});
		
		function onOKButtonClick(event)
		{
			_this.destroyDialog(dialog);
		}
		
		return dialog;
		
	},
	createConfirmPromptDialog: function(message, confirmHandler, open, container)
	{
		barmatz.utils.DataTypes.isNotUndefined(message);
		barmatz.utils.DataTypes.isNotUndefined(confirmHandler);
		barmatz.utils.DataTypes.isTypeOf(message, 'string');
		barmatz.utils.DataTypes.isTypeOf(confirmHandler, 'function');
		barmatz.utils.DataTypes.isTypeOf(open, 'boolean', true);
		barmatz.utils.DataTypes.isInstanceOf(container, window.HTMLElement, true);
		return this.createPromptDialog('Confirm', message, confirmHandler, open, container);
	},
	createPanels: function(panels)
	{
		var options, model, i; 
		
		barmatz.utils.DataTypes.isInstanceOf(panels, window.Array);
		
		options = new barmatz.forms.ui.DataTableOptions();
		options.setClassName('forms-wrapper');
		options.getBodyRows().push([]);
		barmatz.utils.Array.forEach(panels, function(item, index, collection)
		{
			options.getBodyRows()[0].push(item.getContent());
			options.getBodyColumnsClassNames().push(item.getClassName());
		});
		
		return this.createTable(options);
	},
	createMenuWrapper: function()
	{
		var icon, menu, wrapper;
		icon = this.createMenuIcon();
		menu = this.createMenu();
		wrapper = this.createElementWithContent('div', 'forms-menu', [icon, menu]);
		return {wrapper: wrapper, icon: icon, menu: menu};
	},
	createMenuIcon: function()
	{
		return this.createSettingsButton();
	},
	createMenu: function()
	{
		return this.createElement('ul');
	},
	createMenuItem: function(model)
	{
		var anchor;
	
		barmatz.utils.DataTypes.isNotUndefined(model);
		barmatz.utils.DataTypes.isInstanceOf(model, barmatz.forms.ui.MenuItemModel);
	
		anchor = this.createElementWithContent('a', '', model.getLabel());
		anchor.href = 'javascript:void(0);';
		anchor.addEventListener('click', model.getClickHandler());
		
		return this.createElementWithContent('li', '', anchor);
	},
	createIconButton: function(name)
	{
		var button;
		
		barmatz.utils.DataTypes.isNotUndefined(name);
		barmatz.utils.DataTypes.isTypeOf(name, 'string');
		
		button = this.createElementWithContent('span', 'ui-icon-wrapper ui-state-default ui-corner-all', this.createElement('span', 'ui-icon ui-icon-' + name));
		jQuery(button).button();
		
		return button;
	},
	createEditButton: function()
	{
		return this.createIconButton('pencil');
	},
	createDeleteButton: function()
	{
		return this.createIconButton('trash');
	},
	createSettingsButton: function()
	{
		return this.createIconButton('gear');
	},
	createLoadingDialog: function(container)
	{
		barmatz.utils.DataTypes.isInstanceOf(container, window.HTMLElement, true);
		return (container || barmatz.forms.factories.DOMFactory.getBodyElement()).appendChild(this.createElement('div', 'loading-image ui-front'));
	},
	destroyLoadingDialog: function(dialog)
	{
		barmatz.utils.DataTypes.isInstanceOf(dialog, window.HTMLElement);
		
		if(dialog.parentElement)
			dialog.parentElement.removeChild(dialog);
	},
	createLoginFormDialogWrapper: function(open, container)
	{
		var _this, dialog, wrapper, wrapperOptions, userNameField, passwordField, errorField;

		barmatz.utils.DataTypes.isTypeOf(open, 'boolean', true);
		barmatz.utils.DataTypes.isInstanceOf(container, window.HTMLElement, true);
		
		_this = this;
		wrapperOptions = new barmatz.forms.ui.DataTableOptions();
		userNameField = addField('username', 'User', 'text');
		passwordField = addField('password', 'Password', 'password');
		wrapper = this.createTable(wrapperOptions);
		errorField = this.createElementWithContent('div', 'forms-error-wrapper ui-state-error ui-corner-all', [this.createElement('span', 'ui-icon ui-icon-alert'), this.createElementWithContent('span', '', 'Username and/or password are incorrect')]);
		dialog = this.createDialog('Login', [wrapper, errorField], open, container);
	
		jQuery(dialog).dialog({dialogClass: 'forms-dialog-prompt', buttons: {Submit: function(){}}});
		
		return {dialog: dialog, userNameField: userNameField, passwordField: passwordField, submitButton: dialog.parentElement.getElementsByTagName('button')[1], errorField: errorField};
	
		function addField(name, label, type)
		{
			var field;
			
			barmatz.utils.DataTypes.isNotUndefined(name);
			barmatz.utils.DataTypes.isNotUndefined(label);
			barmatz.utils.DataTypes.isNotUndefined(type);
			barmatz.utils.DataTypes.isTypeOf(name, 'string');
			barmatz.utils.DataTypes.isTypeOf(label, 'string');
			barmatz.utils.DataTypes.isTypeOf(type, 'string');
			
			field = _this.createElement('input');
			field.name = name;
			field.type = type;
			wrapperOptions.getBodyRows().push([_this.createElementWithContent('label', '', label), field]);
			
			return field;
		}
	},
	createCollectionListDialog: function(title, content, className, open, container)
	{
		var dialog;
		
		barmatz.utils.DataTypes.isNotUndefined(title);
		barmatz.utils.DataTypes.isNotUndefined(content);
		barmatz.utils.DataTypes.isTypeOf(title, 'string');
		barmatz.utils.DataTypes.isTypesOrInstances(content, ['string'], [window.HTMLElement, window.Array]);
		barmatz.utils.DataTypes.isTypeOf(className, 'string', true);
		barmatz.utils.DataTypes.isTypeOf(open, 'boolean', true);
		barmatz.utils.DataTypes.isInstanceOf(container, window.HTMLElement, true);
		
		dialog = this.createDialog(title, content, open, container);
		jQuery(dialog).dialog({autoOpen: true, dialogClass: 'forms-dialog-collection-list' + (className ? ' ' + className : '')});
		return dialog;
	},
	createUserFormsListDialog: function(open, container)
	{
		barmatz.utils.DataTypes.isTypeOf(open, 'boolean', true);
		barmatz.utils.DataTypes.isInstanceOf(container, window.HTMLElement, true);
		return this.createCollectionListDialog('Your forms', this.createUserFormsList(), 'forms-dialog-user-forms forms-clickable-td', open, container);
	},
	createUserFormsList: function()
	{
		var options = new barmatz.forms.ui.DataTableOptions();
		options.getHeadColumns().push('Name');
		options.getHeadColumns().push('Created');
		options.getHeadColumns().push('Fingerprint');
		return this.createTable(options);
	},
	createUserFormsListItem: function(index)
	{
		barmatz.utils.DataTypes.isNotUndefined(index);
		barmatz.utils.DataTypes.isTypeOf(index, 'number');
		return this.createElementWithContent('tr', 'ui-widget ui-state-default ui-corner-all ui-button-text-only ' + (index % 2 == 0 ? 'even' : 'odd'), [this.createElement('td'), this.createElement('td'), this.createElement('td')]);
	},
	createDropboxItemsListDialogWrapper: function(open, container)
	{
		var addButton, resetButton;
		
		barmatz.utils.DataTypes.isTypeOf(open, 'boolean', true);
		barmatz.utils.DataTypes.isInstanceOf(container, window.HTMLElement, true);
		
		addButton = this.createButton('Add item');
		resetButton = this.createButton('Reset');
		
		return {dialog: this.createCollectionListDialog('Items', [this.createDropboxItemsList(), this.createElementWithContent('div', 'forms-dialog-footer', [addButton, resetButton])], 'forms-dialog-dropbox-items', open, container), addButton: addButton, resetButton: resetButton};
	},
	createDropboxItemsList: function()
	{
		var options = new barmatz.forms.ui.DataTableOptions();
		options.getHeadColumns().push('Key', 'Value', '');
		return this.createTable(options);
	},
	createDropboxItemDialog: function(label, value, confirmHandler, open, container)
	{
		var _this, options, keyField, valueField;
		
		barmatz.utils.DataTypes.isNotUndefined(label);
		barmatz.utils.DataTypes.isNotUndefined(value);
		barmatz.utils.DataTypes.isNotUndefined(confirmHandler);
		barmatz.utils.DataTypes.isTypeOf(label, 'string', true);
		barmatz.utils.DataTypes.isTypeOf(confirmHandler, 'function');
		barmatz.utils.DataTypes.isTypeOf(open, 'boolean', true);
		barmatz.utils.DataTypes.isInstanceOf(container, window.HTMLElement, true);
		
		_this = this;
		options = new barmatz.forms.ui.DataTableOptions();
		labelField = addRow('label', label || '');
		valueField = addRow('Value', value || '');
		return this.createPromptDialog(labelField != null ? 'Edit item' : 'New item', this.createTable(options), onConfirm, open, container);
		
		function addRow(key, value)
		{
			var field;
			
			barmatz.utils.DataTypes.isNotUndefined(key);
			barmatz.utils.DataTypes.isNotUndefined(value);
			barmatz.utils.DataTypes.isTypeOf(key, 'string');
			
			field = _this.createElement('input');
			field.value = value;
			options.getBodyRows().push([_this.createElementWithContent('label', '', key), field]);
			
			return field;
		}
		
		function onConfirm()
		{
			confirmHandler(labelField.value, valueField.value);
		}
	},
	createDropboxItemsListItemWrapper: function(index)
	{
		var wrapper, labelElement, valueElement, editButton, deleteButton;
		
		barmatz.utils.DataTypes.isNotUndefined(index);
		barmatz.utils.DataTypes.isTypeOf(index, 'number');
		
		labelElement = this.createElement('div');
		valueElement = this.createElement('div');
		editButton = this.createEditButton();
		deleteButton = this.createDeleteButton();
		wrapper = this.createTableRow([labelElement, valueElement, this.createElementWithContent('div', '', [editButton, deleteButton])], ['', '', 'forms-list-actions'], 'ui-widget ui-state-default ui-corner-all ui-button-text-only ' + (index % 2 == 0 ? 'even' : 'odd'));
		
		return {wrapper: wrapper, labelElement: labelElement, valueElement: valueElement, editButton: editButton, deleteButton: deleteButton};
	},
	createTable: function(options)
	{
		var _this, headColumns, content;
		
		barmatz.utils.DataTypes.isInstanceOf(options, barmatz.forms.ui.DataTableOptions);
		
		_this = this;
		headColumns = options.getHeadColumns();
		content = [];
		
		if(headColumns.length > 0)
			content.push(this.createElementWithContent('thead', options.getHeadClassName(), this.createTableRow(headColumns, options.getHeadColumnsClassNames(), options.getHeadRowClassName(), true)));
		
		content.push(this.createElementWithContent('tbody', options.getBodyClassName(), getBodyRows()));
		
		return this.createElementWithContent('table', options.getClassName(), content);
		
		function getBodyRows()
		{
			var rows = [], bodyRowsClassNames;
			
			bodyRowsClassNames = options.getBodyRowsClassNames();
			
			barmatz.utils.Array.forEach(options.getBodyRows(), function(item, index, collection)
			{
				rows.push(_this.createTableRow(item, options.getBodyColumnsClassNames(), bodyRowsClassNames[index % bodyRowsClassNames.length]));
			});
			
			return rows;
		}
	},
	createTableRow: function(content, contentClassNames, className, isHead)
	{
		var columns;
		
		barmatz.utils.DataTypes.isInstanceOf(content, window.Array);
		barmatz.utils.DataTypes.isInstanceOf(contentClassNames, window.Array, true);
		barmatz.utils.DataTypes.isTypeOf(className, 'string', true);
		barmatz.utils.DataTypes.isTypeOf(isHead, 'boolean', true);
		
		columns = [];
		
		barmatz.utils.Array.forEach(content, function(item, index, collection)
		{
			columns.push(this.createTableColumn(item, contentClassNames ? contentClassNames[index % contentClassNames.length] : null, isHead)); 
		}, this);
		
		return this.createElementWithContent('tr', className, columns);
	},
	createTableColumn: function(content, className, isHead)
	{
		barmatz.utils.DataTypes.isNotUndefined(content);
		barmatz.utils.DataTypes.isTypeOf(className, 'string', true);
		barmatz.utils.DataTypes.isTypeOf(isHead, 'boolean', true);
		return this.createElementWithContent(isHead ? 'th' : 'td', className, content);
	},
	createFormPropertiesDialogWrapper: function(model, confirmHandler, open, container)
	{
		var properties, dialog;
	
		barmatz.utils.DataTypes.isInstanceOf(model, barmatz.forms.FormModel);
		barmatz.utils.DataTypes.isTypeOf(confirmHandler, 'function');
		barmatz.utils.DataTypes.isTypeOf(open, 'boolean', true);
		barmatz.utils.DataTypes.isInstanceOf(container, window.HTMLElement, true);
		
		properties = this.createFormPropertiesWrapper(model);
		dialog = this.createPromptDialog('Properties', properties.wrapper, confirmHandler, open, container);
		properties.dialog = dialog;
		
		jQuery(dialog).dialog({dialogClass: 'forms-dialog-form-properties'});
		
		return properties;
		
	},
	createFormPropertiesWrapper: function(model)
	{
		var _this, returnValue, options;
		
		barmatz.utils.DataTypes.isNotUndefined(model);
		barmatz.utils.DataTypes.isInstanceOf(model, barmatz.forms.FormModel);
	
		_this = this;
		options = new barmatz.forms.ui.DataTableOptions();
		returnValue = {};
		
		returnValue.nameField = createField('Name');
		returnValue.nameField.value = model.getName();
		
		returnValue.submitButtonLabelField = createField('Submit button label');
		returnValue.submitButtonLabelField.value = model.getSubmitButtonLabel();
		
		returnValue.targetEmailField = createField('Target email');
		returnValue.targetEmailField.value = model.getTargetEmail();
		
		returnValue.directionField = createDropbox('Direction', 'formDirection', [barmatz.forms.Directions.LTR, barmatz.forms.Directions.RTL]);
		returnValue.directionField.value = model.getDirection();
		
		returnValue.languageField = createDropbox('Language', 'formlanguage', ['en', 'he']);
		returnValue.languageField.value = model.getLanguage();
		
		returnValue.layoutIdField = createDropbox('Layout', 'formLayoutId', ['1', '2']);
		returnValue.layoutIdField.value = model.getLayoutId();
		
		returnValue.stylesheetsField = createField('Stylesheets');
		returnValue.stylesheetsField.value = model.getStylesheets().join(' ');
		
		returnValue.methodField = createDropbox('Method', 'formMethod', [barmatz.forms.Methods.GET, barmatz.forms.Methods.POST]);
		returnValue.methodField.value = model.getMethod();
		
		returnValue.encodingField = createDropbox('Encoding', 'formEncoding', [barmatz.net.Encoding.FORM, barmatz.net.Encoding.FILES]);
		returnValue.encodingField.value = model.getEncoding();
		
		returnValue.externalAPIField = createField('External API');
		returnValue.externalAPIField.value = model.getExternalAPI() || '';
		
		returnValue.wrapper = this.createTable(options); 
		
		return returnValue;
		
		function createField(label, content)
		{
			var field, row;
			
			barmatz.utils.DataTypes.isNotUndefined(label);
			barmatz.utils.DataTypes.isTypeOf(label, 'string');
			
			field = content || _this.createElement('input');
			row = [_this.createElementWithContent('label', '', label), field];
			options.getBodyRows().push(row);
			return field;
		}
		
		function createDropbox(label, name, values)
		{
			var model, key;
			
			barmatz.utils.DataTypes.isNotUndefined(label);
			barmatz.utils.DataTypes.isNotUndefined(name);
			barmatz.utils.DataTypes.isNotUndefined(values);
			barmatz.utils.DataTypes.isTypeOf(label, 'string');
			barmatz.utils.DataTypes.isTypeOf(name, 'string');
			barmatz.utils.DataTypes.isTypesOrInstances(values, ['object'], [window.Array]);
			
			model = barmatz.forms.factories.ModelFactory.createDropboxModel(name);
			
			if(values instanceof window.Array)
				for(key = 0; key < values.length; key++)
					model.addItem(barmatz.forms.factories.ModelFactory.createDropboxItemModel(values instanceof window.Array ? values[key] : key, values[key]));
			else
				for(key in values)
					model.addItem(barmatz.forms.factories.ModelFactory.createDropboxItemModel(values instanceof window.Array ? values[key] : key, values[key]));
	
			return createField(label, _this.createDropboxElement(model));
		}
	},
	createFieldValidationOptionsDialogWrapper: function(model, open, container)
	{
		var fieldValidationOptionsWrapper;
		
		barmatz.utils.DataTypes.isNotUndefined(model);
		barmatz.utils.DataTypes.isInstanceOf(model, barmatz.forms.fields.FieldModel);
		barmatz.utils.DataTypes.isTypeOf(open, 'boolean', true);
		barmatz.utils.DataTypes.isInstanceOf(container, window.HTMLElement, true);
		
		fieldValidationOptionsWrapper = this.createFieldValidationOptionsWrapper(model);
		
		return {
			dialog: this.createDialog(barmatz.utils.String.firstLetterToUpperCase(model.getType()) + ' field "' + model.getName() + '" validation options', fieldValidationOptionsWrapper.wrapper, open, container), 
			options: fieldValidationOptionsWrapper.options
		};
	},
	createFieldValidationOptionsWrapper: function(model)
	{
		var wrapper, options, fieldValidatorWrapper, bits;
		
		barmatz.utils.DataTypes.isNotUndefined(model);
		barmatz.utils.DataTypes.isInstanceOf(model, barmatz.forms.fields.FieldModel);
		
		wrapper = this.createElement('div');
		bits = barmatz.utils.Bitwise.parseBit(model.getAvailableValidators());
		options = {};
		barmatz.utils.Array.forEach(bits, function(item, index, collection)
		{
			fieldValidatorWrapper = this.createFieldValidatorWrapper(item);
			options[item] = fieldValidatorWrapper.checkbox;
			wrapper.appendChild(fieldValidatorWrapper.wrapper);
		}, this);
		
		barmatz.utils.DOM.sort(wrapper, function(elementA, elementB)
		{
			var a, b;
			
			a = elementA.getElementsByTagName('span')[0].innerHTML;
			b = elementB.getElementsByTagName('span')[0].innerHTML;
			
			return a > b ? 1 : a < b ? -1 : 0;
		});
	
		return {wrapper: wrapper, options: options};
	},
	createFieldValidatorWrapper: function(bit)
	{
		var wrapper, checkbox, label;
		
		barmatz.utils.DataTypes.isNotUndefined(bit);
		barmatz.utils.DataTypes.isTypeOf(bit, 'number');
		
		checkbox = this.createElement('input');
		checkbox.type = 'checkbox';
		
		label = this.createElement('span');
		
		wrapper = this.createElement('div');
		wrapper.appendChild(checkbox);
		wrapper.appendChild(label);
		
		switch(bit)
		{
			default:
				throw new Error('Unknown bit');
				break;
			case barmatz.forms.Validator.EQUALS:
				label.innerHTML = 'equals...';
				break;
			case barmatz.forms.Validator.VALID_EMAIL:
				label.innerHTML = 'valid email';
				break;
			case barmatz.forms.Validator.VALID_PHONE:
				label.innerHTML = 'valid phone number';
				break;
			case barmatz.forms.Validator.MIN_LENGTH:
				label.innerHTML = 'minimum length...';
				break;
			case barmatz.forms.Validator.MAX_LENGTH:
				label.innerHTML = 'maximum length...';
				break;
			case barmatz.forms.Validator.EXACT_LENGTH:
				label.innerHTML = 'exact length...';
				break;
			case barmatz.forms.Validator.GREATER_THAN:
				label.innerHTML = 'number greater than...';
				break;
			case barmatz.forms.Validator.LESSER_THAN:
				label.innerHTML = 'number lesser than...';
				break;
			case barmatz.forms.Validator.DIGITS_ONLY:
				label.innerHTML = 'only digits';
				break;
			case barmatz.forms.Validator.NOT_DIGITS:
				label.innerHTML = 'not digits';
				break;
		}
		
		return {wrapper: wrapper, checkbox: checkbox}; 
	},
	createFormFieldErrorMessageElement: function()
	{
		return this.createElement('ul', 'forms-form-item-error-message');
	},
	createFormFieldErrorMessageItemElement: function(message)
	{
		barmatz.utils.DataTypes.isNotUndefined(message);
		barmatz.utils.DataTypes.isTypeOf(message, 'string');
		return this.createElementWithContent('li', 'forms-form-item-error-message-item', message);
	},
	createHiddenValueDialogWrapper: function(fieldName, value, confirmHandler, open, container)
	{
		var _this, dialog, wrapper, valueField, specialValuesDropboxModel, specialValuesDropboxElement;
		
		barmatz.utils.DataTypes.isTypeOf(fieldName, 'string');
		barmatz.utils.DataTypes.isTypeOf(value, 'string');
		barmatz.utils.DataTypes.isTypeOf(confirmHandler, 'function');
		
		_this = this;

		valueField = this.createElement('input');
		valueField.value = value;
		
		wrapper = this.createElement('div');
		wrapper.appendChild(this.createElementWithContent('label', '', 'Value'));
		wrapper.appendChild(valueField);
		wrapper.appendChild(this.createButton('Special values', onSpecialValuesButtonClick));
		
		dialog = this.createPromptDialog('Hidden value for field ' + fieldName, wrapper, confirmHandler, open, container);
		jQuery(dialog).dialog({width: '395px'});
		
		return {dialog: dialog, valueField: valueField};
		
		function onSpecialValuesButtonClick(event)
		{
			if(!specialValuesDropboxModel)
				specialValuesDropboxModel = barmatz.forms.factories.ModelFactory.createDropboxModel('specialValues', [
	  				barmatz.forms.factories.ModelFactory.createDropboxItemModel('Page referer', '${page_ref}')
	  			]);
			
			if(!specialValuesDropboxElement)
				specialValuesDropboxElement = _this.createDropboxElement(specialValuesDropboxModel);
			
			_this.createPromptDialog('Special values', specialValuesDropboxElement, onSpecialValueConfirmed, true, container);
		}
		
		function onSpecialValueConfirmed(event)
		{
			valueField.value = specialValuesDropboxElement.value;
		}
	},
	createHTMLContentEditorDialogWrapper: function(content, confirmHandler, open, container, initHandler)
	{
		var wrapper, dialog, editor;
		
		barmatz.utils.DataTypes.isTypeOf(content, 'string', true);
		barmatz.utils.DataTypes.isTypeOf(confirmHandler, 'function');
		barmatz.utils.DataTypes.isTypeOf(open, 'boolean', true);
		barmatz.utils.DataTypes.isInstanceOf(container, window.HTMLElement, true);
		barmatz.utils.DataTypes.isTypeOf(initHandler, 'function', true);
		
		wrapper = this.createElement('div');
		dialog = this.createPromptDialog('HTML content editor', wrapper, confirmHandler, open, container);
		editor = this.createHTMLContentEditor(wrapper, content, onEditorInit);
		
		jQuery(dialog).dialog({dialogClass: 'forms-dialog-html-content-editor'});
	
		return {dialog: dialog, editor: editor};
		
		function onEditorInit(event)
		{
			setTimeout(function()
			{
				jQuery(dialog).dialog('close').dialog('open');

				if(initHandler != null)
					initHandler(event);
			},1);
		}
	},
	createHTMLContentEditor: function(parent, content, initHandler)
	{
		var editor, textArea;
		
		barmatz.utils.DataTypes.isInstanceOf(parent, window.HTMLElement);
		barmatz.utils.DataTypes.isTypeOf(content, 'string', true);
		barmatz.utils.DataTypes.isTypeOf(initHandler, 'function', true);
	
		textArea = this.createElement('textarea');
		textArea.id = 'htmlContentEditor' + new Date().getTime();
		textArea.innerHTML = content || '';
		parent.appendChild(textArea);
		editor = new tinymce.Editor(textArea.id, {
			plugins: 'advlist autolink lists link image charmap print preview hr anchor pagebreak ' +
					 'searchreplace wordcount visualblocks visualchars code fullscreen ' +
					 'insertdatetime media nonbreaking save table contextmenu directionality ' +
					 'emoticons template paste',
			toolbar1: 'insertfile undo redo | styleselect | bold italic | alignleft aligncenter ' +
					  'alignright alignjustify | bullist numlist outdent indent | link image'
		}, tinymce.EditorManager);
		editor.on('init', initHandler);
		editor.render();
			
		return textArea;
	},
	destroyHTMLContentEditor: function(editor)
	{
		barmatz.utils.DataTypes.isInstanceOf(editor, tinymce.Editor);
		editor.destroy(true);
	},
	createLeadsFormsListElement: function()
	{
		return this.createElement('ul');
	},
	createLeadsFormsListItem: function(model)
	{
		barmatz.utils.DataTypes.isInstanceOf(model, barmatz.forms.FormModel);
		return this.createElementWithContent('li', 'forms-leads-forms-list-item', model.getName());
	},
	createLeadsListWrapper: function()
	{
		var options, table;
		
		options = new barmatz.forms.ui.DataTableOptions();
		options.setHeadRowClassName('forms-leads-list-head');
		options.getHeadColumns().push('Received', 'Referer', 'IP');
		
		table = this.createTable(options);
		
		return {wrapper: this.createElementWithContent('div', 'forms-leads-list-wrapper', table), table: table, body: table.getElementsByTagName('tbody')[0]};
	},
	createLeadsListItem: function(model, index)
	{
		barmatz.utils.DataTypes.isInstanceOf(model, barmatz.forms.LeadModel);
		barmatz.utils.DataTypes.isTypeOf(index, 'number');
		return this.createTableRow([barmatz.utils.Date.toString(model.getCreated(), 'dd/mm/yyyy hh:ii'), model.getReferer() || '', model.getIP() || ''], [], 'forms-leads-list-item ' + (index % 2 == 0 ? 'even' : 'odd'));
	}
}