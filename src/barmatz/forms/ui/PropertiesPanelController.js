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
		barmatz.utils.DataTypes.isInstanceOf(value, barmatz.forms.fields.FormFieldModel, true);
		
		this._model = value;
		
		if(this._model)
		{
			this._view.innerHTML = '';
			this._view.appendChild(barmatz.forms.factories.DOMFactory.createPropertiesPanelItem(this._model));
		}
		else
			this._view.innerHTML = 'No item selected';
	}}
});