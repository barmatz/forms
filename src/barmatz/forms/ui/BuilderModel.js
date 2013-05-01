/** barmatz.forms.ui.BuilderModel **/
barmatz.forms.ui.BuilderModel = function(dialogContainerView)
{
	var _this, formModel, menuModel, toolboxModel;
	
	barmatz.utils.DataTypes.isInstanceOf(dialogContainerView, window.HTMLElement, true);
	barmatz.mvc.Model.call(this);

	_this = this;
	
	this.set('formModel', barmatz.forms.factories.ModelFactory.createFormModel());
	this.set('menuModel', barmatz.forms.factories.ModelFactory.createMenuModel());
	this.set('toolboxModel', barmatz.forms.factories.ModelFactory.createToolboxModel());

	formModel = this.get('formModel');
	menuModel = this.get('menuModel');
	toolboxModel = this.get('toolboxModel');

	this.set('menuViewWrapper', barmatz.forms.factories.DOMFactory.createMenuWrapper());
	this.set('toolboxView', barmatz.forms.factories.DOMFactory.createToolbox());
	this.set('workspaceViewWrapper', barmatz.forms.factories.DOMFactory.createWorkspaceWrapper());
	this.set('propertiesView', barmatz.forms.factories.DOMFactory.createProperties());
	this.set('propertiesController', barmatz.forms.factories.ControllerFactory.createPropertiesController(this.getPropertiesView()));
	
	barmatz.forms.factories.ControllerFactory.createMenuController(menuModel, this.get('menuViewWrapper').menu, this.get('menuViewWrapper').icon);
	barmatz.forms.factories.ControllerFactory.createToolboxController(toolboxModel, this.getToolboxView());
	barmatz.forms.factories.ControllerFactory.createWorkspaceController(formModel, this.get('workspaceViewWrapper').workspace, dialogContainerView);
	
	formModel.addEventListener(barmatz.events.ModelEvent.VALUE_CHANGED, onFormModelValueChanged);
	formModel.addEventListener(barmatz.events.CollectionEvent.ITEM_ADDED, onModelItemAddedOrRemoved);
	formModel.addEventListener(barmatz.events.CollectionEvent.ITEM_REMOVED, onModelItemAddedOrRemoved);
	
	menuModel.addEventListener(barmatz.events.CollectionEvent.ITEM_ADDED, onModelItemAddedOrRemoved);
	menuModel.addEventListener(barmatz.events.CollectionEvent.ITEM_REMOVED, onModelItemAddedOrRemoved);
	
	toolboxModel.addEventListener(barmatz.events.CollectionEvent.ITEM_ADDED, onModelItemAddedOrRemoved);
	toolboxModel.addEventListener(barmatz.events.CollectionEvent.ITEM_REMOVED, onModelItemAddedOrRemoved);
	
	function onFormModelValueChanged(event)
	{
		barmatz.utils.DataTypes.isInstanceOf(event, barmatz.events.ModelEvent);
		
		switch(event.getKey())
		{
			case 'name':
				_this.get('workspaceViewWrapper').formName.innerHTML = event.getValue();
				break;
		}
	}
	
	function onModelItemAddedOrRemoved(event)
	{
		var type;
		
		barmatz.utils.DataTypes.isInstanceOf(event, barmatz.events.CollectionEvent);
		
		switch(event.getTarget())
		{
			default:
				throw new Error('unknown target');
				break;
			case formModel:
				applyActionToAddedOrRemovedModelItemFromEvent(event, function()
				{
					type = barmatz.events.BuilderEvent.FORM_ITEM_ADDED;
					_this.setPropertiesControllerModel(event.getItem());
				}, function()
				{
					var index = event.getIndex();
					type = barmatz.events.BuilderEvent.FORM_ITEM_REMOVED;
					_this.setPropertiesControllerModel(_this.getNumWorkspaceModelItems() > 0 ? _this.getFormModelItemAt(index < _this.getNumWorkspaceModelItems() ? index : index - 1) : null);
				});
				break;
			case menuModel:
				applyActionToAddedOrRemovedModelItemFromEvent(event, function()
				{
					type = barmatz.events.BuilderEvent.MENU_ITEM_ADDED;
				}, function()
				{
					type = barmatz.events.BuilderEvent.MENU_ITEM_REMOVED;
				});
				break;
			case toolboxModel:
				applyActionToAddedOrRemovedModelItemFromEvent(event, function()
				{
					type = barmatz.events.BuilderEvent.TOOLBOX_ITEM_ADDED;
				}, function()
				{
					type = barmatz.events.BuilderEvent.TOOLBOX_ITEM_REMOVED;
				});
		}
		
		_this.dispatchEvent(new barmatz.events.BuilderEvent(type, event.getItem(), event.getIndex()));
	}
	
	function applyActionToAddedOrRemovedModelItemFromEvent(event, addedAction, removedAction)
	{
		switch(event.getType())
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
barmatz.forms.ui.BuilderModel.prototype.getFormName = function()
{
	return this.get('formModel').getName();
};
barmatz.forms.ui.BuilderModel.prototype.setFormName = function(value)
{
	barmatz.utils.DataTypes.isTypeOf(value, 'string');
	this.get('formModel').setName(value);
};
barmatz.forms.ui.BuilderModel.prototype.getMenuView = function()
{
	return this.get('menuViewWrapper').wrapper; 
};
barmatz.forms.ui.BuilderModel.prototype.getToolboxView = function()
{
	return this.get('toolboxView'); 
};
barmatz.forms.ui.BuilderModel.prototype.getWorkspaceView = function()
{
	return this.get('workspaceViewWrapper').wrapper; 
};
barmatz.forms.ui.BuilderModel.prototype.getPropertiesView = function()
{
	return this.get('propertiesView'); 
};
barmatz.forms.ui.BuilderModel.prototype.getWorkspaceViewClickHandler = function()
{
	return this.get('workspaceViewClickHandler');
};
barmatz.forms.ui.BuilderModel.prototype.setWorkspaceViewClipHandler = function(value)
{
	barmatz.utils.DataTypes.isTypeOf(value, 'function', true);
	
	if(value != this.getWorkspaceViewClickHandler())
	{
		if(barmatz.utils.DataTypes.applySilent('isValid', this.getWorkspaceViewClickHandler()))
			this.getWorkspaceView().removeEventListener('click', this.getWorkspaceViewClickHandler());
		
		this.set('workspaceViewClickHandler', value);
		
		if(barmatz.utils.DataTypes.applySilent('isValid', value))
			this.getWorkspaceView().addEventListener('click', value);
	}
};
barmatz.forms.ui.BuilderModel.prototype.getWorkspaceViewItemClickHandler = function()
{
	return this.get('workspaceViewItemClickHandler');
};
barmatz.forms.ui.BuilderModel.prototype.setWorkspaceViewItemClickHandler = function(value)
{
	var _this;
	
	barmatz.utils.DataTypes.isTypeOf(value, 'function', true);
	
	_this = this;
	
	if(value != this.getWorkspaceViewItemClickHandler())
	{
		if(barmatz.utils.DataTypes.applySilent('isValid', this.getWorkspaceViewItemClickHandler()))
			removeClickHandlerFromItems();
		
		this.set('workspaceViewItemClickHandler', value);
		
		if(barmatz.utils.DataTypes.applySilent('isValid', value))
			addClickHandlerToItems();
	}
	
	function addClickHandlerToItems()
	{
		addOrRemoveClickHandlerFromItems('add');
	}
	
	function removeClickHandlerFromItems()
	{
		addOrRemoveClickHandlerFromItems('remove');
	}
	
	function addOrRemoveClickHandlerFromItems(action)
	{
		var handler;
		
		barmatz.utils.DataTypes.isTypeOf(action, 'string');
		barmatz.utils.Array.forEach(_this.get('workspaceViewWrapper').workspace.children, function(item, index, collection)
		{
			handler = action == 'add' ? _this.getWorkspaceViewItemClickHandler() : null;
			
			if(handler != null)
				item.addEventListener('click', handler);
			else if(item.hasEventListener('click'))
				item.removeEventListener('click', handler);
		});
	}
};
barmatz.forms.ui.BuilderModel.prototype.getPropertiesControllerModel = function()
{
	return this.get('propertiesControllerModel');
};
barmatz.forms.ui.BuilderModel.prototype.setPropertiesControllerModel = function(value)
{
	barmatz.utils.DataTypes.isInstanceOf(value, barmatz.forms.fields.FieldModel, true);
	this.set('propertiesControllerModel', value);
	this.get('propertiesController').setModel(value);
};
barmatz.forms.ui.BuilderModel.prototype.addMenuItem = function(label, clickHandler)
{
	barmatz.utils.DataTypes.isTypeOf(label, 'string');
	barmatz.utils.DataTypes.isTypeOf(clickHandler, 'function');
	this.get('menuModel').addItem(barmatz.forms.factories.ModelFactory.createMenuItemModel(label, clickHandler));
};
barmatz.forms.ui.BuilderModel.prototype.addToolboxItem = function(type, label)
{
	barmatz.utils.DataTypes.isTypeOf(type, 'string');
	barmatz.utils.DataTypes.isTypeOf(label, 'string');
	this.get('toolboxModel').addItem(barmatz.forms.factories.ModelFactory.createToolboxItemModel(type, label, barmatz.forms.factories.ModelFactory.createFieldModel(type, '')));
};
barmatz.forms.ui.BuilderModel.prototype.addToolboxItemToForm = function(item)
{
	barmatz.utils.DataTypes.isInstanceOf(item, window.HTMLElement);
	this.addFormItem(this.getFieldModelFromToolboxModelAt(this.getIndexOfView(item)).clone());
};
barmatz.forms.ui.BuilderModel.prototype.addFormItem = function(item)
{
	barmatz.utils.DataTypes.isInstanceOf(item, barmatz.forms.fields.FieldModel);
	this.get('formModel').addItem(item);
};
barmatz.forms.ui.BuilderModel.prototype.getFormModelItemAt = function(index)
{
	barmatz.utils.DataTypes.isTypeOf(index, 'number');
	return this.get('formModel').getItemAt(index);
};
barmatz.forms.ui.BuilderModel.prototype.getIndexOfView = function(view)
{
	barmatz.utils.DataTypes.isInstanceOf(view, window.HTMLElement);
	return view.parentElement ? barmatz.utils.Array.toArray(view.parentElement.children).indexOf(view) : 0;
};
barmatz.forms.ui.BuilderModel.prototype.getFieldModelFromToolboxModelAt = function(index)
{
	barmatz.utils.DataTypes.isTypeOf(index, 'number');
	return this.get('toolboxModel').getFieldModelAt(index);
};
barmatz.forms.ui.BuilderModel.prototype.getToolboxItemViewAt = function(index)
{
	barmatz.utils.DataTypes.isTypeOf(index, 'number');
	return this.getToolboxView().children[index];
};
barmatz.forms.ui.BuilderModel.prototype.getWorkspaceModelItemFromView = function(view)
{
	barmatz.utils.DataTypes.isInstanceOf(view, window.HTMLElement);
	return this.getFormModelItemAt(this.getIndexOfView(view));
};
barmatz.forms.ui.BuilderModel.prototype.newForm = function()
{
	this.get('formModel').reset();
};