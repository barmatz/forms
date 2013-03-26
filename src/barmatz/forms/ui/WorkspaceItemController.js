/** barmatz.forms.ui.WorkspaceItemController **/
window.barmatz.forms.ui.WorkspaceItemController = function(model, labelView, fieldView, mandatoryView, deleteButtonView)
{
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
	
	setViewValue('name', model.name);
	setViewValue('label', model.label);
	setViewValue('mandatory', model.mandatory);
	setViewValue('default', model.default);
	setViewValue('value', model.value);
	setViewValue('enabled', model.enabled);
	setViewValue('max', model.max);
	setViewValue('checked', model.checked);
	setViewValue('defaultChecked', model.defaultChecked);
	setViewValue('accept', model.accept);
	setViewValue('rows', model.rows);
	
	function setViewValue(key, value)
	{
		switch(key)
		{
			default:
				throw new Error('unknown key');
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
			case 'default':
				fieldView.defaultValue = value;
				break;
			case 'value':
				fieldView.value = value;
				break;
			case 'enabled':
				fieldView.disabled = !value;
				break;
			case 'max':
				fieldView.maxLength = value;
				break;
			case 'checked':
				fieldView.checked = value;
				break;
			case 'defaultChecked':
				fieldView.defaultChecked = value;
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
		}
	}
	
	function onModelValueChanged(event)
	{
		barmatz.utils.DataTypes.isNotUndefined(event);
		barmatz.utils.DataTypes.isInstanceOf(event, barmatz.events.ModelEvent);
		setViewValue(event.key, event.value);
	}
};

barmatz.forms.ui.WorkspaceItemController.prototype = new barmatz.mvc.Controller();
barmatz.forms.ui.WorkspaceItemController.prototype.constructor = barmatz.forms.ui.WorkspaceItemController;