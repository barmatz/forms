/** barmatz.forms.CollectionController **/
barmatz.forms.CollectionController = function(model, view)
{
	var _this = this;
	
	barmatz.utils.DataTypes.isNotUndefined(model);
	barmatz.utils.DataTypes.isNotUndefined(view);
	barmatz.utils.DataTypes.isInstanceOf(model, barmatz.mvc.Model, true);
	barmatz.utils.DataTypes.isInstanceOf(view, window.HTMLElement, true);
	barmatz.mvc.Controller.call(this);

	this._model = model;
	this._view = view;
	
	if(model)
	{
		model.addEventListener(barmatz.events.CollectionEvent.ITEM_ADDED, onModelItemAdded);
		model.addEventListener(barmatz.events.CollectionEvent.ITEM_REMOVED, onModelItemRemoved);
		model.forEach(function(item, index, collection)
		{
			_this._addItemModelToView(item);
		});
	}
	
	function onModelItemAdded(event)
	{
		barmatz.utils.DataTypes.isInstanceOf(event, barmatz.events.CollectionEvent);
		_this._addItemModelToView(event.getItem());
	}
	
	function onModelItemRemoved(event)
	{
		var index;
		
		barmatz.utils.DataTypes.isInstanceOf(event, barmatz.events.CollectionEvent);
		
		index = event.getIndex();
		
		if(view.children[index])
			view.removeChild(view.children[index]);
	}
};
barmatz.forms.CollectionController.prototype = new barmatz.mvc.Controller();
barmatz.forms.CollectionController.prototype.constructor = barmatz.forms.CollectionController;
barmatz.forms.CollectionController.prototype._addItemModelToView = function(model)
{
	var view;
	
	barmatz.utils.DataTypes.isInstanceOf(model, barmatz.mvc.Model);
	
	view = this._createItemViewFromModel(model);
	
	if(view)
		this._view.appendChild(view);
};
barmatz.forms.CollectionController.prototype._createItemViewFromModel = function(model)
{
	throw new Error('method must be overridden');
};