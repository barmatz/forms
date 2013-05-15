/** barmatz.forms.ui.WorkspaceItemController **/
barmatz.forms.ui.WorkspaceItemController = function(model, labelView, fieldView, mandatoryView, deleteButtonView)
{
	var fieldDictionary;
	
	barmatz.utils.DataTypes.isInstanceOf(model, barmatz.forms.fields.FormItemModel);
	barmatz.utils.DataTypes.isInstanceOf(labelView, window.HTMLElement);
	barmatz.utils.DataTypes.isInstanceOf(fieldView, window.HTMLElement);
	barmatz.utils.DataTypes.isInstanceOf(mandatoryView, window.HTMLElement);
	barmatz.utils.DataTypes.isInstanceOf(deleteButtonView, window.HTMLElement);
	
	barmatz.mvc.Controller.call(this);

	model.addEventListener(barmatz.events.ModelEvent.VALUE_CHANGED, onModelValueChanged);
	
	if(model instanceof barmatz.forms.fields.DropboxModel)
	{
		fieldDictionary = new barmatz.utils.Dictionary();
		model.addEventListener(barmatz.events.CollectionEvent.ITEM_ADDED, onModelItemAdded);
		model.addEventListener(barmatz.events.CollectionEvent.ITEM_REMOVED, onModelItemRemoved);
		model.forEach(function(item, index, collection)
		{
			addItem(item, index);
		});
	}
	
	if(model instanceof barmatz.forms.fields.AbstractFieldModel)
	{
		setViewValue('name', model.getName());
		setViewValue('value', model.getValue());
	}

	if(model instanceof barmatz.forms.fields.FieldModel)
	{
		setViewValue('label', model.getLabel());
		setViewValue('mandatory', model.getMandatory());
		setViewValue('enabled', model.getEnabled());
	}
	
	if(model instanceof barmatz.forms.fields.TextFieldModel)
		setViewValue('max', model.getMax());

	if(model instanceof barmatz.forms.fields.CheckboxFieldModel)
		setViewValue('checked', model.getChecked());
	
	if(model instanceof barmatz.forms.fields.FileFieldModel)
		setViewValue('accept', model.getAccept());
	
	if(model instanceof barmatz.forms.fields.TextAreaFieldModel)
	{
		setViewValue('cols', model.getCols());
		setViewValue('rows', model.getRows());
	}
	
	if(model instanceof barmatz.forms.fields.HTMLContentModel)
		setViewValue('content', model.getContent());
	
	function setViewValue(key, value)
	{
		switch(key)
		{
			default:
				throw new Error('unknown key');
				break;
			case 'validator':
			case 'description':
			case 'prefix':
				break;
			case 'name':
				fieldView.name = value;
				break;
			case 'label':
				labelView.innerHTML = value;
				break;
			case 'mandatory':
				mandatoryView.innerHTML = value ? '*' : '';
				break;
			case 'value':
				fieldView.value = value;
				break;
			case 'enabled':
				if(model instanceof barmatz.forms.fields.PhoneFieldModel)
				{
					fieldView.getElementsByTagName('select')[0].disabled = !value;
					fieldView.getElementsByTagName('input')[0].disabled = !value;
				}
				else
					fieldView.disabled = !value;
				break;
			case 'max':
				fieldView.maxLength = value;
				break;
			case 'checked':
				fieldView.checked = value;
				break;
			case 'accept':
				fieldView.accept = value;
				break;
			case 'rows':
				fieldView.rows = value;
				break;
			case 'cols':
				fieldView.cols = value;
				break;
			case 'multiple':
				fieldView.multiple = value;
				break;
			case 'width':
				if(model instanceof barmatz.forms.fields.PhoneFieldModel)
					fieldView.getElementsByTagName('input')[0].style.width = value + 'px';
				else
					fieldView.style.width = value + 'px';
				break;
			case 'content':
				fieldView.innerHTML = value;
				break;
		}
	}
	
	function addItem(model, index)
	{
		var view;
		
		barmatz.utils.DataTypes.isInstanceOf(model, barmatz.forms.fields.DropboxItemModel);
		barmatz.utils.DataTypes.isTypeOf(index, 'number');
		
		view = fieldView.children[index] || fieldView.appendChild(barmatz.forms.factories.DOMFactory.createDropboxItemElement(model));
		model.addEventListener(barmatz.events.ModelEvent.VALUE_CHANGED, onModelItemValueChanged);
		fieldDictionary.add(model, view);
	}
	
	function removeItem(model)
	{
		barmatz.utils.DataTypes.isInstanceOf(model, barmatz.forms.fields.DropboxItemModel);
		model.removeEventListener(barmatz.events.ModelEvent.VALUE_CHANGED, onModelItemValueChanged);
		fieldView.removeChild(fieldDictionary.get(model));
		fieldDictionary.remove(model);
	}
	
	function onModelValueChanged(event)
	{
		barmatz.utils.DataTypes.isInstanceOf(event, barmatz.events.ModelEvent);
		setViewValue(event.getKey(), event.getValue());
	}
	
	function onModelItemAdded(event)
	{
		barmatz.utils.DataTypes.isInstanceOf(event, barmatz.events.CollectionEvent);
		addItem(event.getItem(), event.getIndex());
	}

	function onModelItemRemoved(event) 
	{
		barmatz.utils.DataTypes.isInstanceOf(event, barmatz.events.CollectionEvent);
		removeItem(event.getItem());
	}
	
	function onModelItemValueChanged(event)
	{
		var field, value;
		
		barmatz.utils.DataTypes.isInstanceOf(event, barmatz.events.ModelEvent);
		
		field = fieldDictionary.get(event.getTarget());
		value = event.getValue();

		switch(event.getKey())
		{
			default:
				throw new Error('Unknown key');
				break;
			case 'label':
				field.innerHTML = value;
				break;
			case 'value':
				field.value = value;
				break;
		}
	}
};
barmatz.forms.ui.WorkspaceItemController.prototype = new barmatz.mvc.Controller();
barmatz.forms.ui.WorkspaceItemController.prototype.constructor = barmatz.forms.ui.WorkspaceItemController;