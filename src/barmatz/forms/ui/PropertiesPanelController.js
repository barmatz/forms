/** barmatz.forms.ui.PropertiesPanelController **/
window.barmatz.forms.ui.PropertiesPanelController = function(view)
{
	barmatz.utils.DataTypes.isNotUndefined(view);
	barmatz.utils.DataTypes.isInstanceOf(view, HTMLElement);
	barmatz.mvc.Controller.call(this);
	this._view = view;
	this.model = null;
};

barmatz.forms.ui.PropertiesPanelController.prototype = new barmatz.mvc.Controller();
barmatz.forms.ui.PropertiesPanelController.prototype.constructor = barmatz.forms.ui.PropertiesPanelController;

Object.defineProperties(barmatz.forms.ui.PropertiesPanelController.prototype,
{
	model: {get: function()
	{
		return this._model;
	}, set: function(value)
	{
		var itemsWrapper;
		
		barmatz.utils.DataTypes.isInstanceOf(value, barmatz.forms.fields.FormFieldModel, true);
		
		if(this._model)
			this._model.removeEventListener(barmatz.events.ModelEvent.VALUE_CHANGED, onModelValueChanged);
		
		this._model = value;
		
		if(this._model)
		{
			itemsWrapper = barmatz.forms.factories.DOMFactory.createPropertiesPanelItemWarpper(this._model);
			
			this._model.addEventListener(barmatz.events.ModelEvent.VALUE_CHANGED, onModelValueChanged);
			this._view.innerHTML = '';
			this._view.appendChild(itemsWrapper.wrapper);
		}
		else
			this._view.innerHTML = 'No item selected';
		
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
					itemsWrapper.mandatoryField.value = event.value ? 'yes' : 'no';
					break;
				case 'default':
					itemsWrapper.defaultValueField.value = event.value;
					break;
				case 'value':
					itemsWrapper.valueField.value = event.value;
					break;
				case 'enabled':
					itemsWrapper.enabledField.value = event.value ? 'yes' : 'no';
					break;
				case 'min':
					itemsWrapper.minField.value = isNaN(event.value) ? '' : event.value;
					break;
				case 'max':
					itemsWrapper.maxField.value = isNaN(event.value) ? '' : event.value;
					break;
				case 'checked':
					itemsWrapper.checkedField.value = event.value;
					break;
				case 'defaultChecked':
					itemsWrapper.defaultCheckedField.value = event.value;
					break;
				case 'accept':
					itemsWrapper.acceptField.value = event.value;
					break;
			}
		}
	}}
});