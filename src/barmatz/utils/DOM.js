/** barmatz.utils.DOM **/
window.barmatz.utils.DOM = function(){};

Object.defineProperties(barmatz.utils.DOM,
{
	isChildOf: {value: function(child, parent)
	{
		var element;
		
		barmatz.utils.DataTypes.isNotUndefined(child);
		barmatz.utils.DataTypes.isNotUndefined(parent);
		barmatz.utils.DataTypes.isInstanceOf(child, HTMLElement);
		barmatz.utils.DataTypes.isInstanceOf(parent, HTMLElement);

		element = child.parentElement;
		
		while(element != null)
		{
			if(element == parent)
				return true;
			element = element.parentElement;
		}
		
		return false;
	}},
	removeAllChildren: {value: function(element)
	{
		barmatz.utils.DataTypes.isNotUndefined(element);
		barmatz.utils.DataTypes.isInstanceOf(element, HTMLElement);
		while(element.childNodes.length > 0)
			element.removeChild(element.lastChild);
	}},
	sort: {value: function(element, compareFunction)
	{
		var children, i;

		barmatz.utils.DataTypes.isNotUndefined(element);
		barmatz.utils.DataTypes.isNotUndefined(compareFunction);
		barmatz.utils.DataTypes.isInstanceOf(element, HTMLElement);
		barmatz.utils.DataTypes.isTypeOf(compareFunction, 'function');
		
		children = Array.prototype.slice.call(element.childNodes).sort(compareFunction);
		
		for(i = 0; i < children.length; i++)
			element.appendChild(children[i]);
	}}
});