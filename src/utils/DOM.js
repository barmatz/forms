window.barmatz.utils.DOM = function(){};

Object.defineProperties(barmatz.utils.DOM, 
{
	getElements: {value: function(tagName, parent)
	{
		var elements = Array.prototype.slice.call(parent.getElementsByTagName(tagName));
		return elements.length > 1 ? elements : (elements.length > 0 ? elements[0] : null);
	}}
});