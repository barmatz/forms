/** barmatz.forms.ui.Leads **/
barmatz.forms.ui.Leads = function()
{
	var userModel, formsListModel, formsListView, leadsListModel, leadsListWrapper;
	
	initFormsList();
	initLeadsList();
	initUserModel();
	initController();
	
	function initFormsList()
	{
		formsListModel = barmatz.forms.factories.ModelFactory.createCollectionModel();
		formsListView = barmatz.forms.factories.DOMFactory.createLeadsFormsListElement();
		barmatz.forms.factories.ControllerFactory.createLeadsFormsListController(formsListModel, formsListView);
	}
	
	function initLeadsList()
	{
		leadsListModel = barmatz.forms.factories.ModelFactory.createCollectionModel();
		leadsListWrapper = barmatz.forms.factories.DOMFactory.createLeadsListWrapper();
		barmatz.forms.factories.ControllerFactory.createLeadsListController(leadsListModel, leadsListWrapper.body);
	}
	
	function initUserModel()
	{
		userModel = barmatz.forms.factories.ModelFactory.createUserModel();
	}
	
	function initController()
	{
		barmatz.forms.factories.ControllerFactory.createLeadsController(
			userModel, formsListModel, formsListView, leadsListModel, leadsListWrapper.wrapper, leadsListWrapper.table, barmatz.forms.factories.DOMFactory.getBodyElement(),
			barmatz.forms.factories.DOMFactory.createPanels([
 				barmatz.forms.factories.ModelFactory.createPanelModel('forms-leads-forms-list-panel', formsListView),
 				barmatz.forms.factories.ModelFactory.createPanelModel('forms-leads-list-panel', leadsListWrapper.wrapper)
 			])
		);
	}
};