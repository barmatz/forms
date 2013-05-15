/** barmatz.forms.ui.pages.PageController **/
barmatz.forms.ui.pages.PageController = function(contentView)
{
	barmatz.utils.DataTypes.isInstanceOf(contentView, window.HTMLElement);
	barmatz.mvc.Controller.call(this);
	
	window.addEventListener('resize', onWindowResize);
	updateSize();
	
	function updateSize()
	{
		contentView.style.height = barmatz.utils.Window.getHeight() - contentView.offsetTop - 1 + 'px';
	}
	
	function onWindowResize(event)
	{
		updateSize();
	}
};
barmatz.forms.ui.pages.PageController.prototype = new barmatz.mvc.Controller();
barmatz.forms.ui.pages.PageController.prototype.constructor = barmatz.forms.ui.pages.PageController;