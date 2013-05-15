/** barmatz.forms.ui.DataTableController **/
barmatz.forms.ui.DataTableController = function(model, tableView, headView, bodyView)
{
	barmatz.utils.DataTypes.isInstanceOf(model, barmatz.forms.ui.DataTableModel);
	barmatz.utils.DataTypes.isInstanceOf(tableView, window.HTMLTableElement);
	barmatz.utils.DataTypes.isInstanceOf(headView, window.HTMLElement);
	barmatz.utils.DataTypes.isInstanceOf(bodyView, window.HTMLElement);
	barmatz.mvc.Controller.call(this);
	
	model.addEventListener(barmatz.events.ModelEvent.VALUE_CHANGED, onModelValueChanged);
	
	function setHeaders()
	{
		barmatz.forms.factories.DOMFactory.clearElement(headView);
		headView.appendChild(barmatz.forms.factories.DOMFactory.createTableRow(model.getHeaders(), [], '', true));
	}
	
	function setData()
	{
		var i, rows, len;
		
		barmatz.forms.factories.DOMFactory.clearElement(bodyView);
		
		rows = model.getData();
		
		if(rows)
			for(i = model.getCurrentPage(), len = model.getItemsPerPage() + i; i < len; i++)
			{
				if(i < rows.length)
					bodyView.appendChild(barmatz.forms.factories.DOMFactory.createTableRow(rows[i]));
				else
					break;
			}
	}
	
	function onModelValueChanged(event)
	{
		barmatz.utils.DataTypes.isInstanceOf(event, barmatz.events.ModelEvent);
		switch(event.getKey())
		{
			case 'headers':
				setHeaders();
				break;
			case 'data':
			case 'currentPage':
			case 'itemsPerPage':
				setData();
				break;
		}
	}
};
barmatz.forms.ui.DataTableController.prototype = new barmatz.mvc.Controller();
barmatz.forms.ui.DataTableController.prototype.constructor = barmatz.forms.ui.DataTableController;