/** barmatz.forms.ui.WorkspaceController **/
window.barmatz.forms.ui.WorkspaceController = function(model, view)
{
	var selectedItemIndex;

	barmatz.utils.DataTypes.isNotUndefined(model);
	barmatz.utils.DataTypes.isNotUndefined(view);
	barmatz.utils.DataTypes.isInstanceOf(model, barmatz.forms.CollectionModel);
	barmatz.utils.DataTypes.isInstanceOf(view, HTMLElement);
	barmatz.forms.CollectionController.call(this, model, view);
	
	model.addEventListener(barmatz.events.ModelEvent.VALUE_CHANGED, onModelValueChanged);
	model.addEventListener(barmatz.events.CollectionEvent.ITEM_ADDED, onModelItemAdded);
	setViewToSortable();
	
	function setViewToSortable()
	{
		jQuery(view).sortable({axis: 'y', containment: 'parent', helper: getSortableHelper, placeholder: 'sortable-placeholder', start: onSortingStart, stop: onSortingStopped});
	}
	
	function getSortableHelper(event, ui)
	{
		var element;
		
		barmatz.utils.DataTypes.isNotUndefined(event);
		barmatz.utils.DataTypes.isNotUndefined(ui);
		barmatz.utils.DataTypes.isInstanceOf(event, jQuery.Event);
		barmatz.utils.DataTypes.isInstanceOf(ui, jQuery);
		
		ui.children().each(function() {
			$(this).width($(this).width());
		});
		
		return ui;
		
	}
	
	function getIndexFromSortEvent(element)
	{
		barmatz.utils.DataTypes.isNotUndefined(element);
		barmatz.utils.DataTypes.isInstanceOf(element, HTMLElement);
		return Array.prototype.slice.call(element.parentElement.childNodes).indexOf(element);
	}
	
	function openNewFieldDialog(model)
	{
		var dialogWrapper;
		
		barmatz.utils.DataTypes.isNotUndefined(model);
		barmatz.utils.DataTypes.isInstanceOf(model, barmatz.forms.fields.FieldModel);
		
		dialogWrapper = barmatz.forms.factories.DOMFactory.createNewFieldDialogWrapper(model);
		jQuery(dialogWrapper.dialog).dialog('open');
		barmatz.forms.factories.ControllerFactory.createJQueryDialogController(dialogWrapper.dialog);
		barmatz.forms.factories.ControllerFactory.createNewFieldDialogController(model, dialogWrapper.dialog, dialogWrapper.nameField, dialogWrapper.labelField);
	}
	
	function onSortingStart(event, ui)
	{
		selectedItemIndex = getIndexFromSortEvent(ui.item[0]);
	}
	
	function onSortingStopped(event, ui)
	{
		model.setItemIndex(model.getItemAt(selectedItemIndex), getIndexFromSortEvent(ui.item[0]));
		selectedItemIndex = NaN;
	}
	
	function onModelValueChanged(event)
	{
		barmatz.utils.DataTypes.isNotUndefined(event);
		barmatz.utils.DataTypes.isInstanceOf(event, barmatz.events.ModelEvent);
		
		switch(event.key)
		{
			case 'direction':
				switch(event.value)
				{
					default:
						throw new Error('Unknown direction');
						break;
					case barmatz.forms.Directions.LTR:
						barmatz.utils.CSS.addClass(view, 'forms-ltr');
						barmatz.utils.CSS.removeClass(view, 'forms-rtl');
						break;
					case barmatz.forms.Directions.RTL:
						barmatz.utils.CSS.addClass(view, 'forms-rtl');
						barmatz.utils.CSS.removeClass(view, 'forms-ltr');
						break;
				}
				break;
		}
	}
	
	function onModelItemAdded(event)
	{
		barmatz.utils.DataTypes.isNotUndefined(event);
		barmatz.utils.DataTypes.isInstanceOf(event, barmatz.events.CollectionEvent);
		setViewToSortable();
		
		if(!event.item.name)
			openNewFieldDialog(event.item);
	}
};

barmatz.forms.ui.WorkspaceController.prototype = new barmatz.forms.CollectionController(null, null);
barmatz.forms.ui.WorkspaceController.prototype.constructor = barmatz.forms.ui.WorkspaceController;

Object.defineProperties(barmatz.forms.ui.WorkspaceController.prototype,
{
	_addItemModelToView: {value: function(model)
	{
		barmatz.utils.DataTypes.isNotUndefined(model);
		barmatz.utils.DataTypes.isInstanceOf(model, barmatz.mvc.Model);
		barmatz.forms.CollectionController.prototype._addItemModelToView.call(this, model);
	}},
	_createItemViewFromModel: {value: function(model)
	{
		var _this = this, viewWrapper;
		
		barmatz.utils.DataTypes.isNotUndefined(model);
		barmatz.utils.DataTypes.isInstanceOf(model, barmatz.forms.fields.FieldModel);
		viewWrapper = barmatz.forms.factories.DOMFactory.createWorkspaceItemWrapper(model);
		viewWrapper.deleteButton.addEventListener('click', onDeleteButtonClick);
		barmatz.forms.factories.ControllerFactory.createWorkspaceItemController(model, viewWrapper.label, viewWrapper.field, viewWrapper.mandatory, viewWrapper.deleteButton);
		barmatz.forms.factories.ControllerFactory.createFieldController(model, viewWrapper.field);
		return viewWrapper.wrapper;
		
		function onDeleteButtonClick(event)
		{
			barmatz.utils.DataTypes.isNotUndefined(event);
			barmatz.utils.DataTypes.isInstanceOf(event, MouseEvent);
			barmatz.forms.factories.ControllerFactory.createJQueryDialogController(barmatz.forms.factories.DOMFactory.createConfirmPromptDialog('Are you sure you want to delete this item?', onDialogConfirm, true));
			event.stopImmediatePropagation();
		}
		
		function onDialogConfirm(event)
		{
			viewWrapper.deleteButton.removeEventListener('click', onDeleteButtonClick);
			_this._model.removeItem(model);
		}
	}}
});