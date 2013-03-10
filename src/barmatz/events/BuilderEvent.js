/** barmatz.events.BuilderEvent **/
window.barmatz.events.BuilderEvent = function(type)
{
	barmatz.utils.DataTypes.isNotUndefined(type);
	barmatz.utils.DataTypes.isTypeOf(type, 'string');
	barmatz.events.Event.call(this, type);
	
	this._item = null;
	this._index = NaN;
	
	switch(type)
	{
		case barmatz.events.BuilderEvent.TOOLBOX_ITEM_ADDED:
		case barmatz.events.BuilderEvent.TOOLBOX_ITEM_REMOVE:
		case barmatz.events.BuilderEvent.WORKSPACE_ITEM_ADDED:
		case barmatz.events.BuilderEvent.WORKSPACE_ITEM_REMOVE:
			this._item = arguments[1];
			this._index = arguments[2];
			break;
	}
};

barmatz.events.BuilderEvent.prototype = new barmatz.events.Event(null);
barmatz.events.BuilderEvent.prototype.constructor = barmatz.events.BuilderEvent;

Object.defineProperties(barmatz.events.BuilderEvent, 
{
	MENU_ITEM_ADDED: {value: 'menuItemAdded'},
	MENU_ITEM_REMOVED: {value: 'menuItemRemoved'},
	TOOLBOX_ITEM_ADDED: {value: 'toolboxItemAdded'},
	TOOLBOX_ITEM_REMOVED: {value: 'toolboxItemRemoved'},
	WORKSPACE_ITEM_ADDED: {value: 'workspaceItemAdded'},
	WORKSPACE_ITEM_REMOVED: {value: 'workspaceItemRemoved'}
});
Object.defineProperties(barmatz.events.BuilderEvent.prototype,
{
	item: {get: function()
	{
		return this._item;
	}},
	index: {get: function()
	{
		return this._index;
	}},
	clone: {value: function(type)
	{
		var event;
		
		switch(type)
		{
			default:
				event = new barmatz.events.BuilderEvent(type);
				break;
			case barmatz.events.BuilderEvent.MENU_ITEM_ADDED:
			case barmatz.events.BuilderEvent.MENU_ITEM_REMOVE:
			case barmatz.events.BuilderEvent.TOOLBOX_ITEM_ADDED:
			case barmatz.events.BuilderEvent.TOOLBOX_ITEM_REMOVE:
			case barmatz.events.BuilderEvent.WORKSPACE_ITEM_ADDED:
			case barmatz.events.BuilderEvent.WORKSPACE_ITEM_REMOVE:
				event = new barmatz.events.BuilderEvent(type, this.item, this.index);
				break;
		}
		
		event._target = this.target;
		return event;
	}},
	toString: {value: function()
	{
		switch(type)
		{
			default:
				return this.formatToString('BuilderEvent', 'type');
				break;
			case barmatz.events.BuilderEvent.MENU_ITEM_ADDED:
			case barmatz.events.BuilderEvent.MENU_ITEM_REMOVE:
			case barmatz.events.BuilderEvent.TOOLBOX_ITEM_ADDED:
			case barmatz.events.BuilderEvent.TOOLBOX_ITEM_REMOVE:
			case barmatz.events.BuilderEvent.WORKSPACE_ITEM_ADDED:
			case barmatz.events.BuilderEvent.WORKSPACE_ITEM_REMOVE:
				return this.formatToString('BuilderEvent', 'type', 'item', 'index');
				break;
		}
	}}
});