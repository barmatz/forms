/** barmatz.forms.fields.DropboxItemsListController **/
window.barmatz.forms.fields.DropboxItemsListController = function(model, view, addButtonView, resetButtonView)
{
	var cachedResetButtonViewDisplay, itemsDictionary, itemsDeleteButtonDictionary;
	
	barmatz.utils.DataTypes.isNotUndefined(model);
	barmatz.utils.DataTypes.isNotUndefined(view);
	barmatz.utils.DataTypes.isNotUndefined(addButtonView);
	barmatz.utils.DataTypes.isNotUndefined(resetButtonView);
	barmatz.utils.DataTypes.isInstanceOf(model, barmatz.forms.fields.DropboxModel);
	barmatz.utils.DataTypes.isInstanceOf(view, HTMLElement);
	barmatz.utils.DataTypes.isInstanceOf(addButtonView, HTMLElement);
	barmatz.utils.DataTypes.isInstanceOf(resetButtonView, HTMLElement);
	barmatz.forms.CollectionController.call(this);
	
	itemsDictionary = new barmatz.utils.Dictionary();
	itemsDeleteButtonDictionary = new barmatz.utils.Dictionary();
	
	model.forEach(function(item, index, collection)
	{
		addItem(item);
	});
	model.addEventListener(barmatz.events.CollectionEvent.ITEM_ADDED, onModelItemAdded);
	model.addEventListener(barmatz.events.CollectionEvent.ITEM_REMOVED, onModelItemRemoved);
	addButtonView.addEventListener('click', onAddButtonViewClick);
	resetButtonView.addEventListener('click', onResetButtonViewClick);

	if(model.numItems == 0)
		hideResetButtonView();
	
	function showResetButtonView()
	{
		resetButtonView.style.display = cachedResetButtonViewDisplay;
		cachedResetButtonViewDisplay = null;
	}
	
	function hideResetButtonView()
	{
		cachedResetButtonViewDisplay = resetButtonView.style.display;
		resetButtonView.style.display = 'none';
	}
	
	function addItem(itemModel)
	{
		var itemViewWrapper;
		
		barmatz.utils.DataTypes.isNotUndefined(itemModel);
		barmatz.utils.DataTypes.isInstanceOf(itemModel, barmatz.forms.fields.DropboxItemModel);
		
		itemViewWrapper = barmatz.forms.factories.DOMFactory.createDropboxItemsListItemWrapper(model.getItemIndex(itemModel));
		itemViewWrapper.deleteButton.addEventListener('click', onItemDeleteButtonClick);
		itemsDeleteButtonDictionary.add(itemViewWrapper.deleteButton, itemModel);
		itemsDictionary.add(itemModel, view.appendChild(itemViewWrapper.wrapper));
		barmatz.forms.factories.ControllerFactory.createDropboxItemsListItemController(itemModel, itemViewWrapper.labelElement, itemViewWrapper.valueElement, itemViewWrapper.editButton);
	}
	
	function removeItem(itemModel)
	{
		barmatz.utils.DataTypes.isNotUndefined(itemModel);
		barmatz.utils.DataTypes.isInstanceOf(itemModel, barmatz.forms.fields.DropboxItemModel);
		view.removeChild(itemsDictionary.get(itemModel));
	}
	
	function onItemDeleteButtonClick(event)
	{
		model.removeItem(itemsDeleteButtonDictionary.get(event.currentTarget));
	}
	
	function onModelItemAdded(event)
	{
		barmatz.utils.DataTypes.isNotUndefined(event);
		barmatz.utils.DataTypes.isInstanceOf(event, barmatz.events.CollectionEvent);
		addItem(event.item);
		
		if(model.numItems > 0 && resetButtonView.style.display == 'none')
			showResetButtonView();
	}
	
	function onModelItemRemoved(event)
	{
		barmatz.utils.DataTypes.isNotUndefined(event);
		barmatz.utils.DataTypes.isInstanceOf(event, barmatz.events.CollectionEvent);
		
		removeItem(event.item);

		if(model.numItems == 0)
			hideResetButtonView();
	}
	
	function onAddButtonViewClick(event)
	{
		barmatz.forms.factories.ControllerFactory.createJQueryDialogController(barmatz.forms.factories.DOMFactory.createDropboxItemDialog(null, null, onAddItemConfirm));
	}
	
	function onResetButtonViewClick(event)
	{
		while(model.numItems > 0)
			model.removeItemAt(model.numItems - 1);
	}
	
	function onAddItemConfirm(key, value)
	{
		barmatz.utils.DataTypes.isNotUndefined(key);
		barmatz.utils.DataTypes.isNotUndefined(value);
		barmatz.utils.DataTypes.isTypeOf(key, 'string');
		model.addItem(barmatz.forms.factories.ModelFactory.createDropboxItemModel(key, value));
	}
};

barmatz.forms.fields.DropboxItemsListController.prototype = new barmatz.forms.CollectionController();
barmatz.forms.fields.DropboxItemsListController.prototype.constructor = barmatz.forms.fields.DropboxItemsListController;