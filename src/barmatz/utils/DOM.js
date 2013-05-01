/** barmatz.utils.DOM **/
barmatz.utils.DOM = {
	isChildOf: function(child, parent)
	{
		var element;
		
		barmatz.utils.DataTypes.isInstancesOf(child, [window.HTMLElement, Window]);
		barmatz.utils.DataTypes.isInstancesOf(parent, [window.HTMLElement, Window]);

		element = child.parentElement;
		
		while(element != null)
		{
			if(element == parent)
				return true;
			element = element.parentElement;
		}
		
		return false;
	},
	removeAllChildren: function(element)
	{
		barmatz.utils.DataTypes.isInstanceOf(element, window.HTMLElement);
		while(element.children.length > 0)
			element.removeChild(element.lastChild);
	},
	sort: function(element, compareFunction)
	{
		var children;

		barmatz.utils.DataTypes.isInstanceOf(element, window.HTMLElement);
		barmatz.utils.DataTypes.isTypeOf(compareFunction, 'function');
		
		children = barmatz.utils.Array.toArray(element.children).sort(compareFunction);
		barmatz.utils.Array.forEach(children, function(item, index, collection)
		{
			element.appendChild(item);
		});
	}
};