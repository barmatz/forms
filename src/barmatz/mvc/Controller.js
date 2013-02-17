/** barmatz.mvc.Controller **/
window.barmatz.mvc.Controller = function()
{
	barmatz.events.EventDispatcher.call(this);
};

barmatz.mvc.Controller.prototype = new barmatz.events.EventDispatcher();
barmatz.mvc.Controller.prototype.constructor = barmatz.mvc.Controller;