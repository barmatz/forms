/** barmatz.utils.Window **/
window.barmatz.utils.Window = function(){};

Object.defineProperties(barmatz.utils.Window, 
{
	height: {get: function()
	{
		if(document.body && document.body.offsetHeight)
			return document.body.offsetHeight;
		else if(document.compatMode == 'CSS1Compat' && document.documentElement && document.documentElement.offsetHeight) 
			return document.documentElement.offsetHeight;
		else if(window.innerHeight)
			return window.innerHeight;
		else
			return NaN;
	}},
	width: {get: function()
	{
		if(document.body && document.body.offsetWidth)
			return document.body.offsetWidth;
		else if(document.compatMode == 'CSS1Compat' && document.documentElement && document.documentElement.offsetWidth) 
			return document.documentElement.offsetWidth;
		else if(window.innerWidth)
			return window.innerWidth;
		else
			return NaN;
	}}
});