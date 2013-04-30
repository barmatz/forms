/** barmatz.forms.fields.DropboxItemsListController **/
barmatz.forms.fields.DropboxItemsListController = function(model, view, addButtonView, resetButtonView, dialogContainerView)
{
	var _this, cachedResetButtonViewDisplay;
	
	barmatz.utils.DataTypes.isInstanceOf(model, barmatz.forms.fields.DropboxModel);
	barmatz.utils.DataTypes.isInstanceOf(view, window.HTMLElement);
	barmatz.utils.DataTypes.isInstanceOf(addButtonView, window.HTMLElement);
	barmatz.utils.DataTypes.isInstanceOf(resetButtonView, window.HTMLElement);
	
	_this = this;
	this._itemsDictionary = new barmatz.utils.Dictionary();
	this._itemsDeleteButtonDictionary = new barmatz.utils.Dictionary();
	this._model = model;
	this._dialogContainerView = dialogContainerView;

	barmatz.forms.CollectionController.call(this, model, view);
	
	model.addEventListener(barmatz.events.CollectionEvent.ITEM_ADDED, onModelItemAdded);
	model.addEventListener(barmatz.events.CollectionEvent.ITEM_REMOVED, onModelItemRemoved);
	addButtonView.addEventListener('click', onAddButtonViewClick);
	resetButtonView.addEventListener('click', onResetButtonViewClick);

	if(model.getNumItems() == 0)
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
	
	function onModelItemAdded(event)
	{
		if(model.getNumItems() > 0 && resetButtonView.style.display == 'none')
			showResetButtonView();
	}
	
	function onModelItemRemoved(event)
	{
		if(model.getNumItems() == 0)
			hideResetButtonView();
	}
	
	function onAddButtonViewClick(event)
	{
		barmatz.forms.factories.ControllerFactory.createJQueryDialogController(barmatz.forms.factories.DOMFactory.createDropboxItemDialog(null, null, onAddItemConfirm, true, dialogContainerView));
	}
	
	function onResetButtonViewClick(event)
	{
		while(model.getNumItems() > 0)
			model.removeItemAt(model.getNumItems() - 1);
	}
	
	function onAddItemConfirm(key, value)
	{
		barmatz.utils.DataTypes.isTypeOf(key, 'string');
		model.addItem(barmatz.forms.factories.ModelFactory.createDropboxItemModel(key, value));
	}
};
barmatz.forms.fields.DropboxItemsListController.prototype = new barmatz.forms.CollectionController(null, null);
barmatz.forms.fields.DropboxItemsListController.prototype.constructor = barmatz.forms.fields.DropboxItemsListController;
barmatz.forms.fields.DropboxItemsListController.prototype._createItemViewFromModel = function(model)
{
	var _this, itemViewWrapper;
	
	barmatz.utils.DataTypes.isInstanceOf(model, barmatz.forms.fields.DropboxItemModel);
	
	_this = this;
	itemViewWrapper = barmatz.forms.factories.DOMFactory.createDropboxItemsListItemWrapper(this._model.getItemIndex(model));
	itemViewWrapper.deleteButton.addEventListener('click', onItemDeleteButtonClick);
	this._itemsDeleteButtonDictionary.add(itemViewWrapper.deleteButton, model);
	this._itemsDictionary.add(model, _this._view.appendChild(itemViewWrapper.wrapper));
	barmatz.forms.factories.ControllerFactory.createDropboxItemsListItemController(model, itemViewWrapper.labelElement, itemViewWrapper.valueElement, itemViewWrapper.editButton, _this._dialogContainerView);
	
	return null;
	
	function onItemDeleteButtonClick(event)
	{
		_this._model.removeItem(_this._itemsDeleteButtonDictionary.get(event.currentTarget));
	}
};