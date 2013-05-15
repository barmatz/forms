/** barmatz.forms.ui.AbstractDataTableDecorator **/
barmatz.forms.ui.AbstractDataTableDecorator = function(table)
{
	barmatz.events.EventDispatcher.call(this);
	this._table = table;
};
barmatz.forms.ui.AbstractDataTableDecorator.prototype = new barmatz.events.EventDispatcher();
barmatz.forms.ui.AbstractDataTableDecorator.prototype.constructor = barmatz.forms.ui.AbstractDataTableDecorator;
barmatz.forms.ui.AbstractDataTableDecorator.prototype.getElement = function()
{
	return this._table.getElement();
};
barmatz.forms.ui.AbstractDataTableDecorator.prototype.getHeaders = function()
{
	return this._table.getHeaders();
};
barmatz.forms.ui.AbstractDataTableDecorator.prototype.setHeaders = function(value)
{
	barmatz.utils.DataTypes.isInstanceOf(value, window.Array);
	this._table.setHeaders(value);
};
barmatz.forms.ui.AbstractDataTableDecorator.prototype.getData = function()
{
	return this._table.getData();
};
barmatz.forms.ui.AbstractDataTableDecorator.prototype.setData = function(value)
{
	barmatz.utils.DataTypes.isInstanceOf(value, window.Array, true);
	this._table.setData(value);
};
barmatz.forms.ui.AbstractDataTableDecorator.prototype.getCurrentPage = function()
{
	return this._table.getCurrentPage();
};
barmatz.forms.ui.AbstractDataTableDecorator.prototype.setCurrentPage = function(value)
{
	barmatz.utils.DataTypes.isTypeOf(value, 'number');
	this._table.setCurrentPage(value);
};
barmatz.forms.ui.AbstractDataTableDecorator.prototype.getTotalPages = function()
{
	return this._table.getTotalPages();
};
barmatz.forms.ui.AbstractDataTableDecorator.prototype.getItemsPerPage = function()
{
	return this._table.getItemsPerPage();
};
barmatz.forms.ui.AbstractDataTableDecorator.prototype.setItemsPerPage = function(value)
{
	barmatz.utils.DataTypes.isTypeOf(value, 'number');
	this._table.setItemsPerPage(value);
};
barmatz.forms.ui.AbstractDataTableDecorator.prototype.nextPage = function()
{
	return this._table.nextPage();
};
barmatz.forms.ui.AbstractDataTableDecorator.prototype.prevPage = function()
{
	return this._table.prevPage();
};