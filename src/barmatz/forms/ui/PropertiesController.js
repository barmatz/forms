/** barmatz.forms.ui.PropertiesController **/
barmatz.forms.ui.PropertiesController = function(view)
{
	barmatz.utils.DataTypes.isInstanceOf(view, window.HTMLElement);
	barmatz.mvc.Controller.call(this);
	this._view = view;
	this.setModel(null);
};
barmatz.forms.ui.PropertiesController.prototype = new barmatz.mvc.Controller();
barmatz.forms.ui.PropertiesController.prototype.constructor = barmatz.forms.ui.PropertiesController;
barmatz.forms.ui.PropertiesController.prototype.getModel = function()
{
	return this._model;
};
barmatz.forms.ui.PropertiesController.prototype.setModel = function(value)
{
	var _this, itemsWrapper, dialogWrapper;
	
	barmatz.utils.DataTypes.isInstanceOf(value, barmatz.forms.fields.FormItemModel, true);
	
	_this = this;
	
	if(this._model)
		this._model.removeEventListener(barmatz.events.ModelEvent.VALUE_CHANGED, onModelValueChanged);
	
	this._model = value;
	this._view.innerHTML = '';
	
	if(this._model)
	{
		itemsWrapper = barmatz.forms.factories.DOMFactory.createPropertiesItemWarpper(this._model);
		
		if(itemsWrapper.validationOptionsButton)
			itemsWrapper.validationOptionsButton.addEventListener('click', onItemsWrapperValidationOptionsButtonClick);
		
		if(itemsWrapper.editItemsButton)
			itemsWrapper.editItemsButton.addEventListener('click', onItemsWrapperEditItemsButtonClick);
		
		if(itemsWrapper.editContentButton)
		{
			if(!this._model.getContent())
				openHTMLContentEditor();
			itemsWrapper.editContentButton.addEventListener('click', onItemsWrapperEditContentButtonClick);
		}
		
		this._model.addEventListener(barmatz.events.ModelEvent.VALUE_CHANGED, onModelValueChanged);
		this._view.appendChild(itemsWrapper.wrapper);
	}
	else
		this._view.appendChild(barmatz.forms.factories.DOMFactory.createElementWithContent('h2', 'forms-filler', 'No item selected'));
	
	function openHTMLContentEditor()
	{
		dialogWrapper = barmatz.forms.factories.DOMFactory.createHTMLContentEditorDialogWrapper(_this._model.getContent(), onEditContentConfrim);
		barmatz.forms.factories.ControllerFactory.createJQueryDialogController(dialogWrapper.dialog);
	}
	
	function onItemsWrapperValidationOptionsButtonClick(event)
	{
		model = _this._model;
		dialogWrapper = barmatz.forms.factories.DOMFactory.createFieldValidationOptionsDialogWrapper(model);
		barmatz.forms.factories.ControllerFactory.createJQueryDialogController(dialogWrapper.dialog);
		barmatz.forms.factories.ControllerFactory.createFieldValidationOptionsController(model, dialogWrapper.options);
	}
	
	function onItemsWrapperEditItemsButtonClick(event)
	{
		dialogWrapper = barmatz.forms.factories.DOMFactory.createDropboxItemsListDialogWrapper();
		barmatz.forms.factories.ControllerFactory.createJQueryDialogController(dialogWrapper.dialog);
		barmatz.forms.factories.ControllerFactory.createDropboxItemsListController(_this._model, dialogWrapper.dialog.getElementsByTagName('tbody')[0], dialogWrapper.addButton, dialogWrapper.resetButton);
	}
	
	function onItemsWrapperEditContentButtonClick(event)
	{
		openHTMLContentEditor();
	}
	
	function onEditContentConfrim(event)
	{
		_this._model.setContent(tinymce.get(dialogWrapper.editor.id).getContent());
	}
	
	function onModelValueChanged(event)
	{
		var value;
		
		barmatz.utils.DataTypes.isInstanceOf(event, barmatz.events.ModelEvent);
		
		value = event.getValue();
		
		switch(event.getKey())
		{
			default:
				throw new Error('unknown key');
				break;
			case 'value':
			case 'content':
			case 'prefix':
				break;
			case 'name':
				itemsWrapper.nameField.value = value ;
				break;
			case 'label':
				itemsWrapper.labelField.value = value ;
				break;
			case 'mandatory':
				itemsWrapper.mandatoryField.value = value ;
				break;
			case 'enabled':
				itemsWrapper.enabledField.value = value ;
				break;
			case 'max':
				itemsWrapper.maxField.value = isNaN(value ) ? '' : value ;
				break;
			case 'checked':
				itemsWrapper.checkedField.value = value ;
				break;
			case 'accept':
				itemsWrapper.acceptField.value = value .join(', ');
				break;
			case 'rows':
				itemsWrapper.rowsField.value = value;
				break;
			case 'cols':
				itemsWrapper.colsField.value = value;
				break;
			case 'multiple':
				itemsWrapper.multipleField.value = value;
				break;
			case 'validator':
				break;
			case 'width':
				itemsWrapper.widthField.value = value;
				break;
			case 'description':
				itemsWrapper.descriptionField.value = value;
				break;
		}
	}
};