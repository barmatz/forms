/** barmatz.forms.ui.WorkspaceItemController **/
window.barmatz.forms.ui.WorkspaceItemController = function(model, labelView, fieldView, mandatoryView, deleteButtonView)
{
	var fieldDictionary;
	
	barmatz.utils.DataTypes.isNotUndefined(model);
	barmatz.utils.DataTypes.isNotUndefined(labelView);
	barmatz.utils.DataTypes.isNotUndefined(fieldView);
	barmatz.utils.DataTypes.isNotUndefined(mandatoryView);
	barmatz.utils.DataTypes.isNotUndefined(deleteButtonView);
	barmatz.utils.DataTypes.isInstanceOf(model, barmatz.forms.fields.FieldModel);
	barmatz.utils.DataTypes.isInstanceOf(labelView, HTMLElement);
	barmatz.utils.DataTypes.isInstanceOf(fieldView, HTMLElement);
	barmatz.utils.DataTypes.isInstanceOf(mandatoryView, HTMLElement);
	barmatz.utils.DataTypes.isInstanceOf(deleteButtonView, HTMLElement);
	
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
	
	setViewValue('name', model.name);
	setViewValue('label', model.label);
	setViewValue('mandatory', model.mandatory);
	setViewValue('value', model.value);
	setViewValue('enabled', model.enabled);
	setViewValue('max', model.max);
	setViewValue('checked', model.checked);
	setViewValue('accept', model.accept);
	setViewValue('rows', model.rows);
	
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
		}
	}
	
	function addItem(model, index)
	{
		var view;
		
		barmatz.utils.DataTypes.isNotUndefined(model);
		barmatz.utils.DataTypes.isNotUndefined(index);
		barmatz.utils.DataTypes.isInstanceOf(model, barmatz.forms.fields.DropboxItemModel);
		barmatz.utils.DataTypes.isTypeOf(index, 'number');
		
		view = fieldView.children[index] || fieldView.appendChild(barmatz.forms.factories.DOMFactory.createDropboxItemElement(model));
		model.addEventListener(barmatz.events.ModelEvent.VALUE_CHANGED, onModelItemValueChanged);
		fieldDictionary.add(model, view);
	}
	
	function removeItem(model)
	{
		barmatz.utils.DataTypes.isNotUndefined(model);
		barmatz.utils.DataTypes.isInstanceOf(model, barmatz.forms.fields.DropboxItemModel);
		model.removeEventListener(barmatz.events.ModelEvent.VALUE_CHANGED, onModelItemValueChanged);
		fieldView.removeChild(fieldDictionary.get(model));
		fieldDictionary.remove(model);
	}
	
	function onModelValueChanged(event)
	{
		barmatz.utils.DataTypes.isNotUndefined(event);
		barmatz.utils.DataTypes.isInstanceOf(event, barmatz.events.ModelEvent);
		setViewValue(event.key, event.value);
	}
	
	function onModelItemAdded(event)
	{
		barmatz.utils.DataTypes.isNotUndefined(event);
		barmatz.utils.DataTypes.isInstanceOf(event, barmatz.events.CollectionEvent);
		addItem(event.item, event.index);
	}

	function onModelItemRemoved(event) 
	{
		barmatz.utils.DataTypes.isNotUndefined(event);
		barmatz.utils.DataTypes.isInstanceOf(event, barmatz.events.CollectionEvent);
		removeItem(event.item);
	}
	
	function onModelItemValueChanged(event)
	{
		barmatz.utils.DataTypes.isNotUndefined(event);
		barmatz.utils.DataTypes.isInstanceOf(event, barmatz.events.ModelEvent);

		switch(event.key)
		{
			default:
				throw new Error('Unknown key');
				break;
			case 'label':
				fieldDictionary.get(event.target).innerHTML = event.value;
				break;
			case 'value':
				fieldDictionary.get(event.target).value = event.value;
				break;
		}
	}
};

barmatz.forms.ui.WorkspaceItemController.prototype = new barmatz.mvc.Controller();
barmatz.forms.ui.WorkspaceItemController.prototype.constructor = barmatz.forms.ui.WorkspaceItemController;