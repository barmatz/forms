window.barmatz.forms.FormItemController = function(model, view)
{
	var viewIsCollection = view instanceof Array, i;
	
	if(!(model instanceof barmatz.forms.FormItemModel))
		throw new TypeError('model is not a FormItemModel object');
	
	if(viewIsCollection)
	{
		for(i in view)
			validateViewType(view[i]);
	}
	else
		validateViewType(view);

	
	barmatz.mvc.Controller.call(this);
	
	this.model = model;
	
	if(viewIsCollection)
		this.views = view;
	else
		this.view = view;
	
	function validateViewType(view)
	{
		if(!(view instanceof HTMLInputElement || view instanceof HTMLSelectElement || view instanceof HTMLTextAreaElement))
			throw new TypeError('view is not an HTMLElement object that is a form item(input, select or textarea)');
	}
};

barmatz.forms.FormItemController.prototype = new barmatz.mvc.Controller();
barmatz.forms.FormItemController.prototype.constructor = barmatz.forms.FormItemController;