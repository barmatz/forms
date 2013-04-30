/** barmatz.forms.ui.JQueryDialogController **/
barmatz.forms.ui.JQueryDialogController = function(view)
{
	barmatz.utils.DataTypes.isInstanceOf(view, window.HTMLElement);
	
	if(!barmatz.forms.factories.DOMFactory.isDialog(view))
		throw new Error('view is not a dialog');
	
	barmatz.mvc.Controller.call(this);
	
	$view = jQuery(view);
	window.addEventListener('resize', onWindowResize);
	
	function onWindowResize(event)
	{
		try
		{
			if($view.dialog('isOpen'))
				$view.dialog('close').dialog('open');
		}
		catch(error){}
	}
};
barmatz.forms.ui.JQueryDialogController.prototype = new barmatz.mvc.Controller();
barmatz.forms.ui.JQueryDialogController.prototype.constructor = barmatz.forms.ui.JQueryDialogController;