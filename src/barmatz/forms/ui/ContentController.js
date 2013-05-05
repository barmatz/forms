/** barmatz.forms.ui.ContentController **/
barmatz.forms.ui.ContentController = function(model, view)
{
	barmatz.utils.DataTypes.isInstanceOf(model, barmatz.forms.ui.ContentModel);
	barmatz.utils.DataTypes.isInstanceOf(view, window.HTMLElement);
	barmatz.mvc.Controller.call(this);
	model.addEventListener(barmatz.events.ModelEvent.VALUE_CHANGED, onModelValueChanged);
	updateContent();
	
	function updateContent()
	{
		barmatz.forms.factories.DOMFactory.clearElement(view);
		barmatz.forms.factories.DOMFactory.addContent(model.getContent(), view);
	}
	
	function onModelValueChanged(event)
	{
		barmatz.utils.DataTypes.isInstanceOf(event, barmatz.events.ModelEvent);
		
		switch(event.getKey())
		{
			case 'content':
				updateContent();
				break;
		}
	}
};
barmatz.forms.ui.ContentController.prototype = new barmatz.mvc.Controller();
barmatz.forms.ui.ContentController.prototype.constructor = barmatz.forms.ui.ContentController;