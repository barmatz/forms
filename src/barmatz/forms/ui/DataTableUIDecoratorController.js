/** barmatz.forms.ui.DataTableUIDecoratorController **/
barmatz.forms.ui.DataTableUIDecoratorController = function(table, prevButtonView, nextButtonView, itemsPerPageView, currentPageView)
{
	var settingItemsPerPage, settingCurrentPage;
	
	barmatz.utils.DataTypes.isInstanceOf(table, barmatz.forms.ui.DataTable);
	barmatz.utils.DataTypes.isInstanceOf(prevButtonView, window.HTMLElement);
	barmatz.utils.DataTypes.isInstanceOf(nextButtonView, window.HTMLElement);
	barmatz.utils.DataTypes.isInstanceOf(itemsPerPageView, window.HTMLInputElement);
	barmatz.utils.DataTypes.isInstanceOf(currentPageView, window.HTMLInputElement);
	barmatz.mvc.Controller.call(this);
	
	updateItemsPerPageView();
	updateCurrentPageValueView();
	table.addEventListener(barmatz.events.ModelEvent.VALUE_CHANGED, onTableValueChanged);
	prevButtonView.addEventListener('click', onPrevViewButtonClick);
	nextButtonView.addEventListener('click', onNextButtonViewClick);
	itemsPerPageView.addEventListener('change', onItemsPerPageViewChange);
	currentPageView.addEventListener('change', onCurrentPageViewChange);
	
	function updateItemsPerPageView()
	{
		itemsPerPageView.value = table.getItemsPerPage();
	}
	
	function updateCurrentPageValueView()
	{
		currentPageView.value = table.getCurrentPage() + 1;
	}
	
	function onTableValueChanged(event)
	{
		barmatz.utils.DataTypes.isInstanceOf(event, barmatz.events.ModelEvent);
		
		switch(event.getKey())
		{
			case 'itemsPerPage':
				if(!settingItemsPerPage)
				{
					settingItemsPerPage = true;
					updateItemsPerPageView();
					settingItemsPerPage = false;
				}
				break;
			case 'currentPage':
				if(!settingCurrentPage)
				{
					settingCurrentPage = true;
					updateCurrentPageValueView();
					settingCurrentPage = false;
				}
				break;
		}
	}
	
	function onPrevViewButtonClick(event)
	{
		table.prevPage();
	}
	
	function onNextButtonViewClick(event)
	{
		table.nextPage();
	}
	
	function onItemsPerPageViewChange(event)
	{
		if(!settingItemsPerPage)
		{
			settingItemsPerPage = true;
			table.setItemsPerPage(parseInt(itemsPerPageView.value));
			settingItemsPerPage = false;
		}
	}
	
	function onCurrentPageViewChange(event)
	{
		if(!settingCurrentPage)
		{
			settingCurrentPage = true;
			table.setCurrentPage(currentPageView.value - 1);
			settingCurrentPage = false;
		}
		updateCurrentPageValueView();
	}
};
barmatz.forms.ui.DataTableUIDecoratorController.prototype = new barmatz.mvc.Controller();
barmatz.forms.ui.DataTableUIDecoratorController.prototype.constructor = barmatz.forms.ui. TableUIDecoratorController;