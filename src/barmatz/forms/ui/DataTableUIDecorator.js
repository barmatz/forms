/** barmatz.forms.ui.DataTableUIDecorator **/
barmatz.forms.ui.DataTableUIDecorator = function(table)
{
	var prevButton, nextButton, itemsPerPage, currentPage;
	
	barmatz.utils.DataTypes.isInstanceOf(table, barmatz.forms.ui.DataTable);
	barmatz.forms.ui.AbstractDataTableDecorator.call(this, table);
	
	prevButton = barmatz.forms.factories.DOMFactory.createButton('prev');
	nextButton = barmatz.forms.factories.DOMFactory.createButton('next');
	itemsPerPage = barmatz.forms.factories.DOMFactory.createElement('input');
	currentPage = barmatz.forms.factories.DOMFactory.createElement('input');
	this._tableElement = barmatz.forms.factories.DOMFactory.createElementWithContent('div', 'table-ui', table.getElement());
	this._tableElement.appendChild(barmatz.forms.factories.DOMFactory.createElementWithContent('ul', 'table-ui-nav', [
	    barmatz.forms.factories.DOMFactory.createElementWithContent('li', '', [barmatz.forms.factories.DOMFactory.createElementWithContent('span', '', 'current page'), currentPage]), 
		barmatz.forms.factories.DOMFactory.createElementWithContent('li', '', [itemsPerPage, barmatz.forms.factories.DOMFactory.createElementWithContent('span', '', 'items per page')]), 
		barmatz.forms.factories.DOMFactory.createElementWithContent('li', '', [prevButton, nextButton])
	]));
	barmatz.forms.factories.ControllerFactory.createTableUIDecoratorController(table, prevButton, nextButton, itemsPerPage, currentPage);
};
barmatz.forms.ui.DataTableUIDecorator.prototype = new barmatz.forms.ui.AbstractDataTableDecorator();
barmatz.forms.ui.DataTableUIDecorator.prototype.constructor = barmatz.forms.ui.DataTableUIDecorator;
barmatz.forms.ui.DataTableUIDecorator.prototype.getElement = function()
{
	return this._tableElement;
};