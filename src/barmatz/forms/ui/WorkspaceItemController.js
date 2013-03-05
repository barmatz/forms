/** barmatz.forms.ui.WorkspaceItemController **/
window.barmatz.forms.ui.WorkspaceItemController = function(model, labelView, fieldView, mandatoryView, deleteButtonView)
{
	barmatz.utils.DataTypes.isNotUndefined(model);
	barmatz.utils.DataTypes.isNotUndefined(labelView);
	barmatz.utils.DataTypes.isNotUndefined(fieldView);
	barmatz.utils.DataTypes.isNotUndefined(mandatoryView);
	barmatz.utils.DataTypes.isNotUndefined(deleteButtonView);
	barmatz.utils.DataTypes.isInstanceOf(model, barmatz.forms.fields.FormFieldModel);
	barmatz.utils.DataTypes.isInstanceOf(labelView, HTMLElement);
	barmatz.utils.DataTypes.isInstanceOf(fieldView, HTMLElement);
	barmatz.utils.DataTypes.isInstanceOf(mandatoryView, HTMLElement);
	barmatz.utils.DataTypes.isInstanceOf(deleteButtonView, HTMLElement);
	barmatz.mvc.Controller.call(this);
	model.addEventListener(barmatz.events.ModelEvent.VALUE_CHANGED, onModelValueChanged);
	deleteButtonView.addEventListener('click', onDeleteButtonViewClick);
	
	function onModelValueChanged(event)
	{
		barmatz.utils.DataTypes.isNotUndefined(event);
		barmatz.utils.DataTypes.isInstanceOf(event, barmatz.events.ModelEvent);

		switch(event.key)
		{
			case 'name':
				fieldView.name = event.value;
				break;
			case 'label':
				labelView.innerHTML = event.value;
				break;
			case 'mandatory':
				mandatoryView.innerHTML = event.value ? '*' : '';
				break;
			case 'defaultValue':
				fieldView.defaultValue = event.value;
				break;
			case 'value':
				fieldView.value = event.value;
				break;
			case 'min':
				fieldView.min = event.value;
				break;
			case 'max':
				fieldView.max = event.value;
				break;
			case 'checked':
				fieldView.checked = event.value;
				break;
			case 'defaultChecked':
				fieldView.defaultChecked = event.value;
				break;
			case 'accept':
				fieldView.accept = event.value;
				break;
		}
	}
	
	function onDeleteButtonViewClick(event)
	{
		barmatz.utils.DataTypes.isNotUndefined(event);
		barmatz.utils.DataTypes.isInstanceOf(event, MouseEvent);
		model.removeEventListener(barmatz.events.ModelEvent.VALUE_CHANGED, onModelValueChanged);
	}
};

barmatz.forms.ui.WorkspaceItemController.prototype = new barmatz.mvc.Controller();
barmatz.forms.ui.WorkspaceItemController.prototype.constructor = barmatz.forms.ui.WorkspaceItemController;

Object.defineProperties(barmatz.forms.ui.WorkspaceItemController.prototype, {});