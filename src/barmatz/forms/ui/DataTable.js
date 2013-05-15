/** barmatz.forms.ui.DataTable **/
barmatz.forms.ui.DataTable = function()
{
	var _this;
	
	barmatz.events.EventDispatcher.call(this);
	
	_this = this;
	this._model = barmatz.forms.factories.ModelFactory.createTableModel();
	this._tableElement = barmatz.forms.factories.DOMFactory.createElement('table');
	this._tableHeadElement = this._tableElement.appendChild(barmatz.forms.factories.DOMFactory.createElement('thead'));
	this._tableBodyElement = this._tableElement.appendChild(barmatz.forms.factories.DOMFactory.createElement('tbody'));
	
	this._model.addEventListener(barmatz.events.ModelEvent.VALUE_CHANGED, onModelValueChanged);
	
	function onModelValueChanged(event)
	{
		_this.dispatchEvent(event);
	}
	
	barmatz.forms.factories.ControllerFactory.createTableController(this._model, this._tableElement, this._tableHeadElement, this._tableBodyElement);
};
barmatz.forms.ui.DataTable.prototype = new barmatz.events.EventDispatcher();
barmatz.forms.ui.DataTable.prototype.constructor = barmatz.forms.ui.DataTable;
barmatz.forms.ui.DataTable.prototype.getElement = function()
{
	return this._tableElement;
};
barmatz.forms.ui.DataTable.prototype.getHeaders = function()
{
	return this._model.getHeaders();
};
barmatz.forms.ui.DataTable.prototype.setHeaders = function(value)
{
	barmatz.utils.DataTypes.isInstanceOf(value, window.Array);
	this._model.setHeaders(value);
};
barmatz.forms.ui.DataTable.prototype.getData = function()
{
	return this._model.getData();
};
barmatz.forms.ui.DataTable.prototype.setData = function(value)
{
	barmatz.utils.DataTypes.isInstanceOf(value, window.Array, true);
	this._model.setData(value);
};
barmatz.forms.ui.DataTable.prototype.getCurrentPage = function()
{
	return this._model.getCurrentPage();
};
barmatz.forms.ui.DataTable.prototype.setCurrentPage = function(value)
{
	barmatz.utils.DataTypes.isTypeOf(value, 'number');
	this._model.setCurrentPage(value);
};
barmatz.forms.ui.DataTable.prototype.getTotalPages = function()
{
	return this._model.getTotalPages();
};
barmatz.forms.ui.DataTable.prototype.getItemsPerPage = function()
{
	return this._model.getItemsPerPage();
};
barmatz.forms.ui.DataTable.prototype.setItemsPerPage = function(value)
{
	barmatz.utils.DataTypes.isTypeOf(value, 'number');
	this._model.setItemsPerPage(value);
};
barmatz.forms.ui.DataTable.prototype.nextPage = function()
{
	return this._model.nextPage();
};
barmatz.forms.ui.DataTable.prototype.prevPage = function()
{
	return this._model.prevPage();
};