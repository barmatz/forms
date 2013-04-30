/** barmatz.events.BuilderEvent **/
barmatz.events.BuilderEvent = function(type)
{
	barmatz.utils.DataTypes.isTypeOf(type, 'string');
	barmatz.events.Event.call(this, type);
	
	this._item = null;
	this._index = NaN;
	
	switch(type)
	{
		case barmatz.events.BuilderEvent.FORM_ITEM_ADDED:
		case barmatz.events.BuilderEvent.FORM_ITEM_REMOVED:
		case barmatz.events.BuilderEvent.MENU_ITEM_ADDED:
		case barmatz.events.BuilderEvent.MENU_ITEM_REMOVED:
		case barmatz.events.BuilderEvent.TOOLBOX_ITEM_ADDED:
		case barmatz.events.BuilderEvent.TOOLBOX_ITEM_REMOVE:
		case barmatz.events.BuilderEvent.WORKSPACE_ITEM_ADDED:
		case barmatz.events.BuilderEvent.WORKSPACE_ITEM_REMOVE:
			this._item = arguments[1];
			this._index = arguments[2];
			break;
	}
};
barmatz.events.BuilderEvent.FORM_ITEM_ADDED = 'formItemAdded';
barmatz.events.BuilderEvent.FORM_ITEM_REMOVED = 'formItemRemoved';
barmatz.events.BuilderEvent.MENU_ITEM_ADDED = 'menuItemAdded';
barmatz.events.BuilderEvent.MENU_ITEM_REMOVED = 'menuItemRemoved';
barmatz.events.BuilderEvent.TOOLBOX_ITEM_ADDED = 'toolboxItemAdded';
barmatz.events.BuilderEvent.TOOLBOX_ITEM_REMOVED = 'toolboxItemRemoved';
barmatz.events.BuilderEvent.WORKSPACE_ITEM_ADDED = 'workspaceItemAdded';
barmatz.events.BuilderEvent.WORKSPACE_ITEM_REMOVED = 'workspaceItemRemoved';
barmatz.events.BuilderEvent.prototype = new barmatz.events.Event(null);
barmatz.events.BuilderEvent.prototype.constructor = barmatz.events.BuilderEvent;
barmatz.events.BuilderEvent.prototype.getItem = function()
{
	return this._item;
};
barmatz.events.BuilderEvent.prototype.getIndex = function()
{
	return this._index;
};
barmatz.events.BuilderEvent.prototype.clone = function()
{
	var event, type;
	
	type = this.getType();
	
	switch(type)
	{
		default:
			event = new barmatz.events.BuilderEvent(type);
			break;
		case barmatz.events.BuilderEvent.FORM_ITEM_ADDED:
		case barmatz.events.BuilderEvent.FORM_ITEM_REMOVE:
		case barmatz.events.BuilderEvent.MENU_ITEM_ADDED:
		case barmatz.events.BuilderEvent.MENU_ITEM_REMOVE:
		case barmatz.events.BuilderEvent.TOOLBOX_ITEM_ADDED:
		case barmatz.events.BuilderEvent.TOOLBOX_ITEM_REMOVE:
		case barmatz.events.BuilderEvent.WORKSPACE_ITEM_ADDED:
		case barmatz.events.BuilderEvent.WORKSPACE_ITEM_REMOVE:
			event = new barmatz.events.BuilderEvent(type, this.getItem(), this.getIndex());
			break;
	}
	
	event._target = this.getTarget();
	return event;
};
barmatz.events.BuilderEvent.prototype.toString = function()
{
	switch(this.getType())
	{
		default:
			return this.formatToString('BuilderEvent', 'type');
			break;
		case barmatz.events.BuilderEvent.FORM_ITEM_ADDED:
		case barmatz.events.BuilderEvent.FORM_ITEM_REMOVE:
		case barmatz.events.BuilderEvent.MENU_ITEM_ADDED:
		case barmatz.events.BuilderEvent.MENU_ITEM_REMOVE:
		case barmatz.events.BuilderEvent.TOOLBOX_ITEM_ADDED:
		case barmatz.events.BuilderEvent.TOOLBOX_ITEM_REMOVE:
		case barmatz.events.BuilderEvent.WORKSPACE_ITEM_ADDED:
		case barmatz.events.BuilderEvent.WORKSPACE_ITEM_REMOVE:
			return this.formatToString('BuilderEvent', 'type', 'item', 'index');
			break;
	}
};