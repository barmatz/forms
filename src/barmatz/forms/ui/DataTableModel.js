/** barmatz.forms.ui.DataTableModel **/
barmatz.forms.ui.DataTableModel = function()
{
	barmatz.mvc.Model.call(this);
	this.setHeaders([]);
	this.setData([]);
	this.setItemsPerPage(1);
	this.setCurrentPage(0);
};
barmatz.forms.ui.DataTableModel.prototype = new barmatz.mvc.Model();
barmatz.forms.ui.DataTableModel.prototype.constructor = barmatz.forms.ui.DataTableModel;
barmatz.forms.ui.DataTableModel.prototype.getHeaders = function()
{
	return this.get('headers');
};
barmatz.forms.ui.DataTableModel.prototype.setHeaders = function(value)
{
	barmatz.utils.DataTypes.isInstanceOf(value, window.Array);
	this.set('headers', value);
};
barmatz.forms.ui.DataTableModel.prototype.getData = function()
{
	return this.get('data');
};
barmatz.forms.ui.DataTableModel.prototype.setData = function(value)
{
	if(value != null)
		barmatz.utils.DataTypes.isInstanceOf(value, window.Array);
	this.set('data', value);
};
barmatz.forms.ui.DataTableModel.prototype.getCurrentPage = function()
{
	return this.get('currentPage');
};
barmatz.forms.ui.DataTableModel.prototype.setCurrentPage = function(value)
{
	barmatz.utils.DataTypes.isTypeOf(value, 'number');
	this.set('currentPage', Math.min(Math.max(0, value), Math.max(this.getTotalPages() - 1, 0)));
};
barmatz.forms.ui.DataTableModel.prototype.getTotalPages = function()
{
	var data = this.getData();
	return data ? Math.ceil(data.length / this.getItemsPerPage()) : 0;
};
barmatz.forms.ui.DataTableModel.prototype.getItemsPerPage = function()
{
	return this.get('itemsPerPage');	
};
barmatz.forms.ui.DataTableModel.prototype.setItemsPerPage = function(value)
{
	barmatz.utils.DataTypes.isTypeOf(value, 'number');
	this.set('itemsPerPage', value);
};
barmatz.forms.ui.DataTableModel.prototype.nextPage = function()
{
	this.setCurrentPage(this.getCurrentPage() + 1);
	return this.getCurrentPage();
};
barmatz.forms.ui.DataTableModel.prototype.prevPage = function()
{
	this.setCurrentPage(this.getCurrentPage() - 1);
	return this.getCurrentPage();
};