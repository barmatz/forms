/** barmatz.forms.ui.PropertiesController **/
window.barmatz.forms.ui.PropertiesController = function(view)
{
	barmatz.utils.DataTypes.isNotUndefined(view);
	barmatz.utils.DataTypes.isInstanceOf(view, HTMLElement);
	barmatz.mvc.Controller.call(this);
	this._view = view;
	this.model = null;
};

barmatz.forms.ui.PropertiesController.prototype = new barmatz.mvc.Controller();
barmatz.forms.ui.PropertiesController.prototype.constructor = barmatz.forms.ui.PropertiesController;

Object.defineProperties(barmatz.forms.ui.PropertiesController.prototype,
{
	model: {get: function()
	{
		return this._model;
	}, set: function(value)
	{
		var _this, itemsWrapper;
		
		barmatz.utils.DataTypes.isInstanceOf(value, barmatz.forms.fields.FieldModel, true);
		
		if(this._model)
			this._model.removeEventListener(barmatz.events.ModelEvent.VALUE_CHANGED, onModelValueChanged);
		
		this._model = value;
		this._view.innerHTML = '';
		
		if(this._model)
		{
			itemsWrapper = barmatz.forms.factories.DOMFactory.createPropertiesItemWarpper(this._model);
			
			if(itemsWrapper.itemsField)
				itemsWrapper.itemsField.addEventListener('focus', onItemsFieldFocus);
			
			this._model.addEventListener(barmatz.events.ModelEvent.VALUE_CHANGED, onModelValueChanged);
			this._view.appendChild(itemsWrapper.wrapper);
		}
		else
			this._view.appendChild(barmatz.forms.factories.DOMFactory.createElementWithContent('h2', 'forms-filler', 'No item selected'));
		
		function onItemsFieldFocus(event)
		{
			var model;
			
			barmatz.utils.DataTypes.isNotUndefined(event);
			barmatz.utils.DataTypes.isInstanceOf(event, Event);

			model = barmatz.forms.factories.ModelFactory.createCollectionModel();
			model.addEventListener(barmatz.events.CollectionEvent.ITEM_ADDED, onModeItemAdded);
			model.addEventListener(barmatz.events.CollectionEvent.ITEM_REMOVED, onModeItemRemoved);
			barmatz.forms.factories.ControllerFactory.createCollectionDialogController(model, barmatz.forms.factories.DOMFactory.createCollectionDialog());
			
			function onModeItemAdded(event)
			{
				barmatz.utils.DataTypes.isNotUndefined(event);
				barmatz.utils.DataTypes.isInstanceOf(event, barmatz.events.CollectionEvent);
				_this._model.addItemAt(event.item, event.index);
			}
			
			function onModeItemRemoved(event)
			{
				barmatz.utils.DataTypes.isNotUndefined(event);
				barmatz.utils.DataTypes.isInstanceOf(event, barmatz.events.CollectionEvent);
				_this._model.removeItemAt(event.item, event.index);
			}
		}
		
		function onModelValueChanged(event)
		{
			barmatz.utils.DataTypes.isNotUndefined(event);
			barmatz.utils.DataTypes.isInstanceOf(event, barmatz.events.ModelEvent);
			
			switch(event.key)
			{
				default:
					throw new Error('unknown key');
					break;
				case 'name':
					itemsWrapper.nameField.value = event.value;
					break;
				case 'label':
					itemsWrapper.labelField.value = event.value;
					break;
				case 'mandatory':
					itemsWrapper.mandatoryField.value = event.value;
					break;
				case 'enabled':
					itemsWrapper.enabledField.value = event.value;
					break;
				case 'max':
					itemsWrapper.maxField.value = isNaN(event.value) ? '' : event.value;
					break;
				case 'checked':
					itemsWrapper.checkedField.value = event.value;
					break;
				case 'accept':
					itemsWrapper.acceptField.value = event.value.join(', ');
					break;
				case 'rows':
					itemsWrapper.rowsField.value = event.value;
					break;
				case 'cols':
					itemsWrapper.colsField.value = event.value;
					break;
				case 'multiple':
					itemsWrapper.multipleField.value = event.value;
					break;
			}
		}
	}}
});