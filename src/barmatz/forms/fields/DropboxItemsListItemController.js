/** barmatz.forms.fields.DropboxItemsListItemController **/
window.barmatz.forms.fields.DropboxItemsListItemController = function(model, labelView, valueView, editButtonView)
{
	barmatz.utils.DataTypes.isNotUndefined(model);
	barmatz.utils.DataTypes.isNotUndefined(labelView);
	barmatz.utils.DataTypes.isNotUndefined(valueView);
	barmatz.utils.DataTypes.isNotUndefined(editButtonView);
	barmatz.utils.DataTypes.isInstanceOf(model, barmatz.forms.fields.DropboxItemModel);
	barmatz.utils.DataTypes.isInstanceOf(labelView, HTMLElement);
	barmatz.utils.DataTypes.isInstanceOf(valueView, HTMLElement);
	barmatz.utils.DataTypes.isInstanceOf(editButtonView, HTMLElement);
	barmatz.mvc.Controller.call(this);
	
	labelView.innerHTML = model.label;
	valueView.innerHTML = model.value;
	
	model.addEventListener(barmatz.events.ModelEvent.VALUE_CHANGED, onModelValueChanged);
	editButtonView.addEventListener('click', onEditButtonViewClick);
	
	function onModelValueChanged(event)
	{
		barmatz.utils.DataTypes.isNotUndefined(event);
		barmatz.utils.DataTypes.isInstanceOf(event, barmatz.events.ModelEvent);
		
		switch(event.key)
		{
			case 'label':
				labelView.innerHTML = event.value;
				break;
			case 'value':
				valueView.innerHTML = event.value;
				break;
		}
	}
	
	function onEditButtonViewClick(event)
	{
		barmatz.forms.factories.ControllerFactory.createJQueryDialogController(barmatz.forms.factories.DOMFactory.createDropboxItemDialog(model.label, model.value, onEditConfirm));
	}
	
	function onEditConfirm(label, value)
	{
		barmatz.utils.DataTypes.isNotUndefined(label);
		barmatz.utils.DataTypes.isNotUndefined(value);
		barmatz.utils.DataTypes.isTypeOf(label, 'string');
		barmatz.utils.DataTypes.isTypeOf(value, 'string');
		model.label = label;
		model.value = value;
	}
};

barmatz.forms.fields.DropboxItemsListItemController.prototype = new barmatz.mvc.Controller();
barmatz.forms.fields.DropboxItemsListItemController.prototype.constructor = barmatz.forms.fields.DropboxItemsListItemController;