/** barmatz.forms.CollectionController **/
window.barmatz.forms.CollectionController = function(model, view)
{
	var _this = this;
	
	barmatz.utils.DataTypes.isInstanceOf(model, barmatz.forms.CollectionModel, true);
	barmatz.utils.DataTypes.isInstanceOf(view, HTMLElement, true);
	barmatz.mvc.Controller.call(this);

	this._model = model;
	
	if(model)
	{
		model.addEventListener(barmatz.events.CollectionEvent.ADDED, onModelAdded);
		model.addEventListener(barmatz.events.CollectionEvent.REMOVED, onModelRemoved);
		model.forEach(function(item, index, collection)
		{
			addItemModelToView(item);
		});
	}
	
	function addItemModelToView(model)
	{
		barmatz.utils.DataTypes.isNotUndefined(model);
		barmatz.utils.DataTypes.isInstanceOf(model, barmatz.mvc.Model);
		view.appendChild(_this._createItemViewFromModel(model));
	}
	
	function onModelAdded(event)
	{
		barmatz.utils.DataTypes.isNotUndefined(event);
		barmatz.utils.DataTypes.isInstanceOf(event, barmatz.events.CollectionEvent);
		addItemModelToView(event.item);
	}
	
	function onModelRemoved(event)
	{
		barmatz.utils.DataTypes.isNotUndefined(event);
		barmatz.utils.DataTypes.isInstanceOf(event, barmatz.events.CollectionEvent);
		view.removeChild(view.childNodes[event.index]);
	}
};

barmatz.forms.CollectionController.prototype = new barmatz.mvc.Controller();
barmatz.forms.CollectionController.prototype.constructor = barmatz.forms.CollectionController;

Object.defineProperties(barmatz.forms.CollectionController.prototype,
{
	_createItemViewFromModel: {value: function(model)
	{
		throw new Error('method must be overridden');
	}}
});