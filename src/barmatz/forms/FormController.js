/** barmatz.forms.FormController **/
window.barmatz.forms.FormController = function(model, view)
{
	var submittingForm, loadingDialog;
	
	barmatz.utils.DataTypes.isNotUndefined(model);
	barmatz.utils.DataTypes.isNotUndefined(view);
	barmatz.utils.DataTypes.isInstanceOf(model, barmatz.forms.FormModel);
	barmatz.utils.DataTypes.isInstanceOf(view, HTMLFormElement);
	barmatz.mvc.Controller.call(this);
	
	 view.name = model.name;
	 view.method = model.method;
	 view.encoding = model.encoding;
	 view.addEventListener('submit', onViewSubmit);
	
	 function addModelListeners()
	 {
		 model.addEventListener(barmatz.events.FormModelEvent.SUBMITTING, onModelSubmitting);
		 model.addEventListener(barmatz.events.FormModelEvent.SUBMITTED, onModelSubmitted);
		 model.addEventListener(barmatz.events.FormModelEvent.SUBMISSION_FAILED, onModelSubmitionFailed);
	 }
	 
	 function removeModelListeners()
	 {
		 model.removeEventListener(barmatz.events.FormModelEvent.SUBMITTING, onModelSubmitting);
		 model.removeEventListener(barmatz.events.FormModelEvent.SUBMITTED, onModelSubmitted);
		 model.removeEventListener(barmatz.events.FormModelEvent.SUBMISSION_FAILED, onModelSubmitionFailed);
	 }
	 
	 function getViewData()
	 {
		 var data, elements, specialElements, element, i;
		 
		 data = {};
		 specialElements = Array.prototype.slice.call(view.getElementsByTagName('span')).filter(function(element)
		 {
			return element.hasAttribute('rel') && element.getAttribute('rel') == 'phone'; 
		 });
		 elements = Array.prototype.slice.call(view.elements).filter(function(element)
		 {
			var i;

			if(element.tagName.toLowerCase() == 'button' || element.type == 'button' || element.type == 'submit')
				return false;
			 
			for(i in specialElements)
			{
				if(specialElements[i].contains(element))
					return false;
			}
			 
			return true;
		 }).concat(specialElements);
		 
		 for(i = 0; i < elements.length; i++)
		 {
			element = elements[i];
			
			if(specialElements.indexOf(element) > -1)
			{
				switch(element.getAttribute('rel'))
				{
					case 'phone':
						data[element.getAttribute('name')] = element.getElementsByTagName('select')[0].value + element.getElementsByTagName('input')[0].value;
						break;
				}
			}
			else
				data[element.name] = element.value;
		 }
		 	
		 return data;
	 }
	 
	 function addLoadingDialog()
	 {
		 loadingDialog = barmatz.forms.factories.DOMFactory.createLoadingDialog(view);
	 }
	 
	 function removeLoadingDialog()
	 {
		 barmatz.forms.factories.DOMFactory.destroyLoadingDialog(loadingDialog);
		 loadingDialog = null;
	 }
	 
	 function onViewSubmit(event)
	 {
		 if(!submittingForm)
		 {
			 addModelListeners();
			 model.submit(getViewData());
		 }
	 }
	 
	 function onModelSubmitting(event)
	 {
		 submittingForm = true;
		 addLoadingDialog();
	 }
	 
	 function onModelSubmitted(event)
	 {
		 submittingForm = false;
		 removeModelListeners(); 
		 removeLoadingDialog();
	 }
	 
	 function onModelSubmitionFailed(event)
	 {
		 submittingForm = false;
		 removeModelListeners();
		 removeLoadingDialog();
	 }
};

barmatz.forms.FormController.prototype = new barmatz.mvc.Controller();
barmatz.forms.FormController.prototype.constructor = barmatz.forms.FormController;

Object.defineProperties(barmatz.forms.FormController.prototype, {});