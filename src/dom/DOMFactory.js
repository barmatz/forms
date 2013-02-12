window.barmatz.dom.DOMFactory = function(){};

Object.defineProperties(barmatz.dom.DOMFactory, 
{
	createElement: {value: function(tagName, content, className, parent)
	{
		var element = document.createElement(tagName);
		
		if(className)
			element.className = className;
		
		if(content)
			element.innerHTML = content;
		
		if(parent)
			parent.appendChild(element);
		
		return element;
	}}
});