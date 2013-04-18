/** barmatz.forms.ui.LeadsController **/
window.barmatz.forms.ui.LeadsController = function(userModel, formsListModel, formsListView, leadsListModel, leadsListWrapperView, leadsListView, containerView, panelsView)
{
	var formsListDictionary, loadingDialog;
	
	barmatz.utils.DataTypes.isNotUndefined(userModel);
	barmatz.utils.DataTypes.isNotUndefined(formsListModel);
	barmatz.utils.DataTypes.isNotUndefined(formsListView);
	barmatz.utils.DataTypes.isNotUndefined(leadsListModel);
	barmatz.utils.DataTypes.isNotUndefined(leadsListWrapperView);
	barmatz.utils.DataTypes.isNotUndefined(leadsListView);
	barmatz.utils.DataTypes.isNotUndefined(containerView);
	barmatz.utils.DataTypes.isNotUndefined(panelsView);
	barmatz.utils.DataTypes.isInstanceOf(userModel, barmatz.forms.users.UserModel);
	barmatz.utils.DataTypes.isInstanceOf(formsListModel, barmatz.forms.CollectionModel);
	barmatz.utils.DataTypes.isInstanceOf(leadsListModel, barmatz.forms.CollectionModel);
	barmatz.utils.DataTypes.isInstanceOf(leadsListWrapperView, HTMLElement);
	barmatz.utils.DataTypes.isInstanceOf(leadsListView, HTMLElement);
	barmatz.utils.DataTypes.isInstanceOf(containerView, HTMLElement);
	barmatz.utils.DataTypes.isInstanceOf(panelsView, HTMLElement);
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
			barmatz.forms.factories.DOMFactory.createAlertPromptDialog('Error', message, true)
		);
	}
	
	function addLoadingDialog()
	{
		loadingDialog = barmatz.forms.factories.DOMFactory.createLoadingDialog();
	}
	 
	function removeLoadingDialog()
	{
		barmatz.forms.factories.DOMFactory.destroyLoadingDialog(loadingDialog);
		loadingDialog = null;
	}
	
	function populateLeadsListView()
	{
		leadsListWrapperView.innerHTML = '';
		leadsListWrapperView.appendChild(leadsListView);
	}
	
	function emptyLeadsListModel()
	{
		var i;
		for(i = leadsListModel.numItems; i > 0; i--)
			leadsListModel.removeItemAt(i - 1);
	}
	
	function emptyLeadsListView()
	{
		leadsListWrapperView.innerHTML = 'No form selected';
	}
	
	function loadLead(model)
	{
		barmatz.utils.DataTypes.isNotUndefined(model);
		barmatz.utils.DataTypes.isInstanceOf(model, barmatz.forms.FormModel);
		emptyLeadsListModel();
		addFormModelListeners(model);
		addLoadingDialog();
		model.getLeads();
	}
	
	function addUserModelListeners()
	{
		userModel.addEventListener(barmatz.events.UserModelEvent.GET_FORMS_SUCCESS, onUserModelGetFormsSuccess);
		userModel.addEventListener(barmatz.events.UserModelEvent.GET_FORMS_FAIL, onUserModelGetFormsFail);
	}
	
	function removeUserModelListeners()
	{
		userModel.removeEventListener(barmatz.events.UserModelEvent.GET_FORMS_SUCCESS, onUserModelGetFormsSuccess);
		userModel.removeEventListener(barmatz.events.UserModelEvent.GET_FORMS_FAIL, onUserModelGetFormsFail);
	}
	
	function addFormModelListeners(model)
	{
		barmatz.utils.DataTypes.isNotUndefined(model);
		barmatz.utils.DataTypes.isInstanceOf(model, barmatz.forms.FormModel);
		model.addEventListener(barmatz.events.FormModelEvent.GET_LEADS_SUCCESS, onFormModelGetLeadsSuccess);
		model.addEventListener(barmatz.events.FormModelEvent.GET_LEADS_FAIL, onFormModelGetLeadsFail);
	}
	
	function removeFormModelListeners(model)
	{
		barmatz.utils.DataTypes.isNotUndefined(model);
		barmatz.utils.DataTypes.isInstanceOf(model, barmatz.forms.FormModel);
		model.removeEventListener(barmatz.events.FormModelEvent.GET_LEADS_SUCCESS, onFormModelGetLeadsSuccess);
		model.removeEventListener(barmatz.events.FormModelEvent.GET_LEADS_FAIL, onFormModelGetLeadsFail);
	}
	
	function onLeadsListModelItemAdded(event)
	{
		populateLeadsListView();
	}
	
	function onLeadsListModelItemRemoved(event)
	{
		if(leadsListModel.numItems == 0)
			emptyLeadsListView();
	}
	
	function onFormsListModelItemAdded(event)
	{
		var element;
		
		barmatz.utils.DataTypes.isNotUndefined(event);
		barmatz.utils.DataTypes.isInstanceOf(event, barmatz.events.CollectionEvent);
		
		element = formsListView.childNodes[event.index];
		
		formsListDictionary.add(event.item, element);
		element.addEventListener('click', onFormsListItemClick);
	}
	
	function onFormsListModelItemRemoved(event)
	{
		barmatz.utils.DataTypes.isNotUndefined(event);
		barmatz.utils.DataTypes.isInstanceOf(event, barmatz.events.CollectionEvent);
		
		formsListDictionary.get(event.item).removeEventListener('click', onFormsListItemClick);
		formsListDictionary.remove(event.item);
	}
	
	function onFormsListItemClick(event)
	{
		loadLead(formsListDictionary.find(event.target));
	}
	
	function onUserModelGetFormsSuccess(event)
	{
		var i;
		
		barmatz.utils.DataTypes.isNotUndefined(event);
		barmatz.utils.DataTypes.isInstanceOf(event, barmatz.events.UserModelEvent);
		
		removeUserModelListeners();
		removeLoadingDialog();
		
		for(i = 0; i < event.forms.length; i++)
			formsListModel.addItem(event.forms[i]);
	}
	
	function onUserModelGetFormsFail(event)
	{
		removeUserModelListeners();
		removeLoadingDialog();
		alertError('Error getting user forms');
	}
	
	function onFormModelGetLeadsSuccess(event)
	{
		var model, data, i;
		
		barmatz.utils.DataTypes.isNotUndefined(event);
		barmatz.utils.DataTypes.isInstanceOf(event, barmatz.events.FormModelEvent);
		
		removeFormModelListeners(event.target);
		removeLoadingDialog();
		
		for(i = 0; i < event.leads.length; i++)
		{
			data = event.leads[i];
			model = barmatz.forms.factories.ModelFactory.createLeadModel();
			model.created = barmatz.utils.Date.toDate(data.created);
			model.data = data.data;
			model.ip = data.ip;
			model.referer = data.referer;
			leadsListModel.addItem(model);
		}
	}
	
	function onFormModelGetLeadsFail(event)
	{
		removeFormModelListeners(event.target);
		removeLoadingDialog();
		alertError('Error getting leads');
	}
};

barmatz.forms.ui.LeadsController.prototype = new barmatz.mvc.Controller();
barmatz.forms.ui.LeadsController.prototype.constructor = barmatz.forms.ui.LeadsController;