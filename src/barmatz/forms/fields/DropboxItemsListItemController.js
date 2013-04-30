/** barmatz.forms.fields.DropboxItemsListItemController **/
barmatz.forms.fields.DropboxItemsListItemController = function(model, labelView, valueView, editButtonView, dialogContainerView)
{
	barmatz.utils.DataTypes.isInstanceOf(model, barmatz.forms.fields.DropboxItemModel);
	barmatz.utils.DataTypes.isInstanceOf(labelView, window.HTMLElement);
	barmatz.utils.DataTypes.isInstanceOf(valueView, window.HTMLElement);
	barmatz.utils.DataTypes.isInstanceOf(editButtonView, window.HTMLElement);
	barmatz.utils.DataTypes.isInstanceOf(dialogContainerView, window.HTMLElement, true);
	barmatz.mvc.Controller.call(this);
	
	labelView.innerHTML = model.getLabel();
	valueView.innerHTML = model.getValue();
	
	model.addEventListener(barmatz.events.ModelEvent.VALUE_CHANGED, onModelValueChanged);
	editButtonView.addEventListener('click', onEditButtonViewClick);
	
	function onModelValueChanged(event)
	{
		var value;
		
		barmatz.utils.DataTypes.isInstanceOf(event, barmatz.events.ModelEvent);
		
		value = event.getValue();
		
		switch(event.getKey())
		{
			case 'label':
				labelView.innerHTML = value;
				break;
			case 'value':
				valueView.innerHTML = value;
				break;
		}
	}
	
	function onEditButtonViewClick(event)
	{
		barmatz.forms.factories.ControllerFactory.createJQueryDialogController(barmatz.forms.factories.DOMFactory.createDropboxItemDialog(model.getLabel(), model.getValue(), onEditConfirm, true, dialogContainerView));
	}
	
	function onEditConfirm(label, value)
	{
		barmatz.utils.DataTypes.isTypeOf(label, 'string');
		barmatz.utils.DataTypes.isTypeOf(value, 'string');
		model.setLabel(label);
		model.setValue(value);
	}
};
barmatz.forms.fields.DropboxItemsListItemController.prototype = new barmatz.mvc.Controller();
barmatz.forms.fields.DropboxItemsListItemController.prototype.constructor = barmatz.forms.fields.DropboxItemsListItemController;