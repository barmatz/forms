/** barmatz.utils.CSS **/
barmatz.utils.CSS = { 
	getStyle: function(element)
	{
		barmatz.utils.DataTypes.isInstanceOf(element, window.HTMLElement);
		
		if(element.currentStyle)
			return element.currentStyle;
		else if(document.defaultView && document.defaultView.getComputedStyle)
			return document.defaultView.getComputedStyle(element);
		else
			return element.style;
	},
	unitToPixal: function(element, value)
	{
		barmatz.utils.DataTypes.isInstanceOf(element, window.HTMLElement);
		barmatz.utils.DataTypes.isTypeOf(value, 'string');
		return /em/.test(value) ? parseFloat(this.emToPixal(element, parseFloat(value))) : /px/.test(value) ? parseFloat(value) : 0;
	},
	emToPixal: function(element, value)
	{
		barmatz.utils.DataTypes.isInstanceOf(element, window.HTMLElement);
		barmatz.utils.DataTypes.isTypeOf(value, 'number');
		return parseFloat(this.getStyle(element).fontSize) * value;
	},
	absoluteHeight: function(element)
	{
		barmatz.utils.DataTypes.isInstanceOf(element, window.HTMLElement);
		return element.offsetHeight + this.unitToPixal(element, this.getStyle(element).marginTop) + this.unitToPixal(element, this.getStyle(element).marginBottom);
	},
	absoluteWidth: function(element)
	{
		barmatz.utils.DataTypes.isInstanceOf(element, window.HTMLElement);
		return element.offsetWidth + this.unitToPixal(element, this.getStyle(element).marginLeft) + this.unitToPixal(element, this.getStyle(element).marginRight);
	},
	verticalAlign: function(element)
	{
		var parent;
		
		barmatz.utils.DataTypes.isInstanceOf(element, window.HTMLElement);
		
		parent = element.parentElement;
		
		if(parent)
			element.style.top = ((parent.offsetHeight * .5) - (this.absoluteHeight(element) * .5)) + 'px';
	},
	verticalAlignChildren: function(element)
	{
		var i;
		
		barmatz.utils.DataTypes.isInstanceOf(element, window.HTMLElement);
		
		for(i = 0; i < element.children.length; i++)
			this.verticalAlign(element.children[i]);
	},
	addClass: function(element, className)
	{
		barmatz.utils.DataTypes.isInstanceOf(element, window.HTMLElement);
		barmatz.utils.DataTypes.isTypeOf(className, 'string');
		
		if(element.className.indexOf(className) == -1)
			element.className += ' ' + className;
	},
	removeClass: function(element, className)
	{
		barmatz.utils.DataTypes.isInstanceOf(element, window.HTMLElement);
		barmatz.utils.DataTypes.isTypeOf(className, 'string');
		element.className = element.className.replace(new RegExp('^' + className + '\\s?|\\s' + className + '[^\\S]?', 'g'), ' ').replace(/\s+/g, ' ').replace(/^\s+|\s+$/, '');
	}
};