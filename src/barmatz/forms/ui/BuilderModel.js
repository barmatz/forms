/** barmatz.forms.ui.BuilderModel **/
window.barmatz.forms.ui.BuilderModel = function()
{
	var _this;
	
	barmatz.mvc.Model.call(this);

	_this = this;
	this.set('menuModel', barmatz.forms.factories.ModelFactory.createMenuModel());
	this.set('menuViewWrapper', barmatz.forms.factories.DOMFactory.createBuilderMenuWrapper());
	this.set('toolboxModel', barmatz.forms.factories.ModelFactory.createToolboxModel());
	this.set('toolboxView', barmatz.forms.factories.DOMFactory.createBuilderToolbox());
	this.set('workspaceModel', barmatz.forms.factories.ModelFactory.createWorkspaceModel());
	this.set('workspaceViewWrapper', barmatz.forms.factories.DOMFactory.createBuilderWorkspaceWrapper());
	this.set('propertiesPanelView', barmatz.forms.factories.DOMFactory.createBuilderPropertiesPanel());
	this.set('propertiesPanelController', barmatz.forms.factories.ControllerFactory.createPropertiesPanelController(this.propertiesPanelView));
	
	barmatz.forms.factories.ControllerFactory.createBuilderMenuController(this.get('menuModel'), this.get('menuViewWrapper').menu, this.get('menuViewWrapper').icon);
	barmatz.forms.factories.ControllerFactory.createToolboxController(this.get('toolboxModel'), this.toolboxView);
	barmatz.forms.factories.ControllerFactory.createWorkspaceController(this.get('workspaceModel'), this.get('workspaceViewWrapper').workspace);
	
	this.get('menuModel').addEventListener(barmatz.events.CollectionEvent.ITEM_ADDED, onModelItemAddedOrRemoved);
	this.get('menuModel').addEventListener(barmatz.events.CollectionEvent.ITEM_REMOVED, onModelItemAddedOrRemoved);
	this.get('toolboxModel').addEventListener(barmatz.events.CollectionEvent.ITEM_ADDED, onModelItemAddedOrRemoved);
	this.get('toolboxModel').addEventListener(barmatz.events.CollectionEvent.ITEM_REMOVED, onModelItemAddedOrRemoved);
	this.get('workspaceModel').addEventListener(barmatz.events.CollectionEvent.ITEM_ADDED, onModelItemAddedOrRemoved);
	this.get('workspaceModel').addEventListener(barmatz.events.CollectionEvent.ITEM_REMOVED, onModelItemAddedOrRemoved);
	
	function onModelItemAddedOrRemoved(event)
	{
		var type;
		
		barmatz.utils.DataTypes.isNotUndefined(event);
		barmatz.utils.DataTypes.isInstanceOf(event, barmatz.events.CollectionEvent);
		
		switch(event.target)
		{
			default:
				throw new Error('unknown target');
				break;
			case _this.get('menuModel'):
				applyActionToAddedOrRemovedModelItemFromEvent(event, function()
				{
					type = barmatz.events.BuilderEvent.MENU_ITEM_ADDED;
				}, function()
				{
					type = barmatz.events.BuilderEvent.MENU_ITEM_REMOVED;
				});
			break;
			case _this.get('toolboxModel'):
				applyActionToAddedOrRemovedModelItemFromEvent(event, function()
				{
					type = barmatz.events.BuilderEvent.TOOLBOX_ITEM_ADDED;
				}, function()
				{
					type = barmatz.events.BuilderEvent.TOOLBOX_ITEM_REMOVED;
				});
				break;
			case _this.get('workspaceModel'):
				applyActionToAddedOrRemovedModelItemFromEvent(event, function()
				{
					type = barmatz.events.BuilderEvent.WORKSPACE_ITEM_ADDED;
					_this.propertiesPanelControllerModel = event.item;
				}, function()
				{
					type = barmatz.events.BuilderEvent.WORKSPACE_ITEM_REMOVED;
					_this.propertiesPanelControllerModel = _this.numWorkspaceModelItems > 0 ? _this.getWorkspaceModelItemAt(event.index < _this.numWorkspaceModelItems ? event.index : event.index - 1) : null;
				});
				break;
		}
		
		_this.dispatchEvent(new barmatz.events.BuilderEvent(type, event.item, event.index));
	}
	
	function applyActionToAddedOrRemovedModelItemFromEvent(event, addedAction, removedAction)
	{
		switch(event.type)
		{
			default:
				throw new Error('unknown event type');
				break;
			case barmatz.events.CollectionEvent.ITEM_ADDED:
				addedAction();
				break;
			case barmatz.events.CollectionEvent.ITEM_REMOVED:
				removedAction();
				break;
		}
	}
};

barmatz.forms.ui.BuilderModel.prototype = new barmatz.mvc.Model();
barmatz.forms.ui.BuilderModel.prototype.constructor = barmatz.forms.ui.BuilderModel;

Object.defineProperties(barmatz.forms.ui.BuilderModel.prototype, 
{
	menuView: {get: function()
	{
		return this.get('menuViewWrapper').wrapper; 
	}},
	toolboxView: {get: function()
	{
		return this.get('toolboxView'); 
	}},
	workspaceView: {get: function()
	{
		return this.get('workspaceViewWrapper').wrapper; 
	}},
	propertiesPanelView: {get: function()
	{
		return this.get('propertiesPanelView'); 
	}},
	workspaceViewClickHandler: {get: function()
	{
		return this.get('workspaceViewClickHandler');
	}, set: function(value)
	{
		barmatz.utils.DataTypes.isTypeOf(value, 'function', true);
		
		if(value != this.workspaceViewClickHandler)
		{
			if(barmatz.utils.DataTypes.applySilent('isValid', this.workspaceViewClickHandler))
				this.workspaceView.removeEventListener('click', this.workspaceViewClickHandler);
			
			this.set('workspaceViewClickHandler', value);
			
			if(barmatz.utils.DataTypes.applySilent('isValid', value))
				this.workspaceView.addEventListener('click', value);
		}
	}},
	workspaceViewItemClickHandler: {get: function()
	{
		return this.get('workspaceViewItemClickHandler');
	}, set: function(value)
	{
		var _this;
		
		barmatz.utils.DataTypes.isTypeOf(value, 'function', true);
		
		_this = this;
		
		if(value != this.workspaceViewItemClickHandler)
		{
			if(barmatz.utils.DataTypes.applySilent('isValid', this.workspaceViewItemClickHandler))
				removeClickHandlerFromItems();
			
			this.set('workspaceViewItemClickHandler', value);
			
			if(barmatz.utils.DataTypes.applySilent('isValid', value))
				addClickHandlerFromItems();
		}
		
		function addClickHandlerFromItems()
		{
			addOrRemoveClickHandlerFromItems('add');
		}
		
		function removeClickHandlerFromItems()
		{
			addOrRemoveClickHandlerFromItems('remove');
		}
		
		function addOrRemoveClickHandlerFromItems(action)
		{
			var i;
			
			barmatz.utils.DataTypes.isNotUndefined(action);
			barmatz.utils.DataTypes.isTypeOf(action, 'string');
			
			for(; i < _this.workspaceView.childNodes.length; i++)
				_this.setWorkspaceViewItemClickHandlerAt(i, 'add' ? _this.workspaceViewClickHandler : null);
		}
	}},
	propertiesPanelControllerModel: {get: function()
	{
		return this.get('propertiesPanelControllerModel');
	}, set: function(value)
	{
		barmatz.utils.DataTypes.isInstanceOf(value, barmatz.forms.fields.FieldModel, true);
		this.set('propertiesPanelControllerModel', value);
		this.get('propertiesPanelController').model = value;
	}},
	numWorkspaceModelItems: {get: function()
	{
		return this.get('workspaceModel').numItems;
	}},
	addMenuItem: {value: function(label, clickHandler)
	{
		barmatz.utils.DataTypes.isNotUndefined(label);
		barmatz.utils.DataTypes.isNotUndefined(clickHandler);
		barmatz.utils.DataTypes.isTypeOf(label, 'string');
		barmatz.utils.DataTypes.isTypeOf(clickHandler, 'function');
		this.get('menuModel').addItem(barmatz.forms.factories.ModelFactory.createMenuItemModel(label, clickHandler));
	}},
	addToolboxItem: {value: function(type, label)
	{
		barmatz.utils.DataTypes.isNotUndefined(type);
		barmatz.utils.DataTypes.isNotUndefined(label);
		barmatz.utils.DataTypes.isTypeOf(type, 'string');
		barmatz.utils.DataTypes.isTypeOf(label, 'string');
		this.get('toolboxModel').addItem(barmatz.forms.factories.ModelFactory.createToolboxItemModel(type, label), barmatz.forms.factories.ModelFactory.createFieldModel(type, ''));
	}},
	addWorkspceItem: {value: function(item)
	{
		barmatz.utils.DataTypes.isNotUndefined(item);
		barmatz.utils.DataTypes.isInstanceOf(item, barmatz.mvc.Model);
		this.get('workspaceModel').addItem(item);
	}},
	addWorkspaceItemFromToolbox: {value: function(item)
	{
		barmatz.utils.DataTypes.isNotUndefined(item);
		barmatz.utils.DataTypes.isInstanceOf(item, HTMLElement);
		this.addWorkspceItem(this.getFieldModelFromToolboxModelAt(this.getIndexOfView(item)).clone());
	}},
	getIndexOfView: {value: function(view)
	{
		barmatz.utils.DataTypes.isNotUndefined(view);
		barmatz.utils.DataTypes.isInstanceOf(view, HTMLElement);
		return Array.prototype.slice.call(view.parentElement.childNodes).indexOf(view);
	}},
	getFieldModelFromToolboxModelAt: {value: function(index)
	{
		barmatz.utils.DataTypes.isNotUndefined(index);
		barmatz.utils.DataTypes.isTypeOf(index, 'number');
		return this.get('toolboxModel').getFieldModelAt(index);
	}},
	getToolboxItemViewAt: {value: function(index)
	{
		barmatz.utils.DataTypes.isNotUndefined(index);
		barmatz.utils.DataTypes.isTypeOf(index, 'number');
		return this.toolboxView.childNodes[index];
	}},
	getWorkspaceModelItemAt: {value: function(index)
	{
		barmatz.utils.DataTypes.isNotUndefined(index);
		barmatz.utils.DataTypes.isTypeOf(index, 'number');
		return this.get('workspaceModel').getItemAt(index);
	}},
	getWorkspaceModelItemFromView: {value: function(view)
	{
		barmatz.utils.DataTypes.isNotUndefined(view);
		barmatz.utils.DataTypes.isInstanceOf(view, HTMLElement);
		return this.getWorkspaceModelItemAt(this.getIndexOfView(view));
	}},
	setWorkspaceViewItemClickHandlerAt: {value: function(index, handler)
	{
		var element;
		
		barmatz.utils.DataTypes.isNotUndefined(index);
		barmatz.utils.DataTypes.isNotUndefined(handler);
		barmatz.utils.DataTypes.isTypeOf(index, 'number');
		barmatz.utils.DataTypes.isTypeOf(handler, 'function', true);
		
		element = this.get('workspaceViewWrapper').workspace.childNodes[index];
		
		if(barmatz.utils.DataTypes.applySilent('isValid', handler))
			element.addEventListener('click', handler);
		else if(element.hasEventListener('click'))
			element.removeEventListener('click', handler);
	}}
});