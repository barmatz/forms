/** barmatz.forms.ui.LeadsController **/
barmatz.forms.ui.LeadsController = function(userModel, formsListModel, formsListView, leadsListModel, leadsListWrapperView, leadsListView, containerView, panelsView, dialogContainerView)
{
	var formsListDictionary, loadingDialog;
	
	barmatz.utils.DataTypes.isInstanceOf(userModel, barmatz.forms.users.UserModel);
	barmatz.utils.DataTypes.isInstanceOf(formsListModel, barmatz.forms.CollectionModel);
	barmatz.utils.DataTypes.isInstanceOf(formsListView, window.HTMLElement);
	barmatz.utils.DataTypes.isInstanceOf(leadsListModel, barmatz.forms.CollectionModel);
	barmatz.utils.DataTypes.isInstanceOf(leadsListWrapperView, window.HTMLElement);
	barmatz.utils.DataTypes.isInstanceOf(leadsListView, window.HTMLElement);
	barmatz.utils.DataTypes.isInstanceOf(containerView, window.HTMLElement);
	barmatz.utils.DataTypes.isInstanceOf(panelsView, window.HTMLElement);
	barmatz.utils.DataTypes.isInstanceOf(dialogContainerView, window.HTMLElement, true);
	barmatz.mvc.Controller.call(this);
	
	formsListDictionary = new barmatz.utils.Dictionary();
	
	addUserModelListeners();
	formsListModel.addEventListener(barmatz.events.CollectionEvent.ITEM_ADDED, onFormsListModelItemAdded);
	formsListModel.addEventListener(barmatz.events.CollectionEvent.ITEM_REMOVED, onFormsListModelItemRemoved);
	leadsListModel.addEventListener(barmatz.events.CollectionEvent.ITEM_ADDED, onLeadsListModelItemAdded);
	leadsListModel.addEventListener(barmatz.events.CollectionEvent.ITEM_REMOVED, onLeadsListModelItemRemoved);
	addLoadingDialog();
	userModel.getForms();
	containerView.appendChild(panelsView);
	emptyLeadsListView();
	
	function alertError(message)
	{
		barmatz.forms.factories.ControllerFactory.createJQueryDialogController(
			barmatz.forms.factories.DOMFactory.createAlertPromptDialog('Error', message, true, dialogContainerView)
		);
	}
	
	function addLoadingDialog()
	{
		if(!loadingDialog)
			loadingDialog = barmatz.forms.factories.DOMFactory.createLoadingDialog();
	}
	 
	function removeLoadingDialog()
	{
		if(loadingDialog)
		{
			barmatz.forms.factories.DOMFactory.destroyLoadingDialog(loadingDialog);
			loadingDialog = null;
		}
	}
	
	function populateLeadsListView()
	{
		leadsListWrapperView.innerHTML = '';
		leadsListWrapperView.appendChild(leadsListView);
	}
	
	function emptyLeadsListModel()
	{
		var i;
		for(i = leadsListModel.getNumItems(); i > 0; i--)
			leadsListModel.removeItemAt(i - 1);
	}
	
	function emptyLeadsListView()
	{
		leadsListWrapperView.innerHTML = 'No form selected';
	}
	
	function loadLead(model)
	{
		barmatz.utils.DataTypes.isInstanceOf(model, barmatz.forms.FormModel);
		emptyLeadsListModel();
		addFormModelListeners(model);
		addLoadingDialog();
		model.getLeads();
	}
	
	function addUserModelListeners()
	{
		userModel.addEventListener(barmatz.events.UserEvent.GET_FORMS_SUCCESS, onUserModelGetFormsSuccess);
		userModel.addEventListener(barmatz.events.UserEvent.GET_FORMS_FAIL, onUserModelGetFormsFail);
	}
	
	function removeUserModelListeners()
	{
		userModel.removeEventListener(barmatz.events.UserEvent.GET_FORMS_SUCCESS, onUserModelGetFormsSuccess);
		userModel.removeEventListener(barmatz.events.UserEvent.GET_FORMS_FAIL, onUserModelGetFormsFail);
	}
	
	function addFormModelListeners(model)
	{
		barmatz.utils.DataTypes.isInstanceOf(model, barmatz.forms.FormModel);
		model.addEventListener(barmatz.events.FormEvent.GET_LEADS_SUCCESS, onFormModelGetLeadsSuccess);
		model.addEventListener(barmatz.events.FormEvent.GET_LEADS_FAIL, onFormModelGetLeadsFail);
	}
	
	function removeFormModelListeners(model)
	{
		barmatz.utils.DataTypes.isInstanceOf(model, barmatz.forms.FormModel);
		model.removeEventListener(barmatz.events.FormEvent.GET_LEADS_SUCCESS, onFormModelGetLeadsSuccess);
		model.removeEventListener(barmatz.events.FormEvent.GET_LEADS_FAIL, onFormModelGetLeadsFail);
	}
	
	function onLeadsListModelItemAdded(event)
	{
		populateLeadsListView();
	}
	
	function onLeadsListModelItemRemoved(event)
	{
		if(leadsListModel.getNumItems() == 0)
			emptyLeadsListView();
	}
	
	function onFormsListModelItemAdded(event)
	{
		var element;
		
		barmatz.utils.DataTypes.isInstanceOf(event, barmatz.events.CollectionEvent);
		
		element = formsListView.children[event.getIndex()];
		
		formsListDictionary.add(event.getItem(), element);
		
		if(element)
			element.addEventListener('click', onFormsListItemClick);
	}
	
	function onFormsListModelItemRemoved(event)
	{
		var item;
		
		barmatz.utils.DataTypes.isInstanceOf(event, barmatz.events.CollectionEvent);
		
		item = event.getItem();
		
		formsListDictionary.get(item).removeEventListener('click', onFormsListItemClick);
		formsListDictionary.remove(item);
	}
	
	function onFormsListItemClick(event)
	{
		barmatz.utils.DataTypes.isInstanceOf(event, MouseEvent);
		loadLead(formsListDictionary.find(event.target));
	}
	
	function onUserModelGetFormsSuccess(event)
	{
		barmatz.utils.DataTypes.isInstanceOf(event, barmatz.events.UserEvent);
		removeUserModelListeners();
		removeLoadingDialog();
		barmatz.utils.Array.forEach(event.getForms(), function(item, index, collection)
		{
			formsListModel.addItem(item);
		});
	}
	
	function onUserModelGetFormsFail(event)
	{
		removeUserModelListeners();
		removeLoadingDialog();
		alertError('Error getting user forms');
	}
	
	function onFormModelGetLeadsSuccess(event)
	{
		barmatz.utils.DataTypes.isInstanceOf(event, barmatz.events.FormEvent);
		removeFormModelListeners(event.getTarget());
		removeLoadingDialog();
		barmatz.utils.Array.forEach(event.getLeads(), function(item, index, collection)
		{
			leadsListModel.addItem(item);
		});
	}
	
	function onFormModelGetLeadsFail(event)
	{
		barmatz.utils.DataTypes.isInstanceOf(event, barmatz.events.FormEvent);
		removeFormModelListeners(event.getTarget());
		removeLoadingDialog();
		alertError('Error getting leads');
	}
};
barmatz.forms.ui.LeadsController.prototype = new barmatz.mvc.Controller();
barmatz.forms.ui.LeadsController.prototype.constructor = barmatz.forms.ui.LeadsController;