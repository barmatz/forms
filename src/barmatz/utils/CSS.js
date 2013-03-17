/** barmatz.utils.CSS **/
window.barmatz.utils.CSS = function(){};

Object.defineProperties(barmatz.utils.CSS, 
{
	getStyle: {value: function(element)
	{
		barmatz.utils.DataTypes.isNotUndefined(element);
		barmatz.utils.DataTypes.isInstanceOf(element, HTMLElement);
		
		if(element.currentStyle)
			return element.currentStyle;
		else if(document.defaultView && document.defaultView.getComputedStyle)
			return document.defaultView.getComputedStyle(element);
		else
			return element.style;
	}},
	unitToPixal: {value: function(element, value)
	{
		barmatz.utils.DataTypes.isNotUndefined(element);
		barmatz.utils.DataTypes.isNotUndefined(value);
		barmatz.utils.DataTypes.isInstanceOf(element, HTMLElement);
		barmatz.utils.DataTypes.isTypeOf(value, 'string');
		
		if(/em/.test(value))
			return this.emToPixal(element, parseFloat(value));
		else if(/px/.test(value))
			return parseFloat(value);
		else
			return 0;
	}},
	emToPixal: {value: function(element, value)
	{
		barmatz.utils.DataTypes.isNotUndefined(element);
		barmatz.utils.DataTypes.isNotUndefined(value);
		barmatz.utils.DataTypes.isInstanceOf(element, HTMLElement);
		barmatz.utils.DataTypes.isTypeOf(value, 'number');
		return parseFloat(this.getStyle(element).fontSize) * value;
	}},
	absoluteHeight: {value: function(element)
	{
		barmatz.utils.DataTypes.isNotUndefined(element);
		barmatz.utils.DataTypes.isInstanceOf(element, HTMLElement);
		return element.offsetHeight + this.unitToPixal(element, this.getStyle(element).marginTop) + this.unitToPixal(element, this.getStyle(element).marginBottom) + this.unitToPixal(element, this.getStyle(element).borderTop) + this.unitToPixal(element, this.getStyle(element).borderBottom);
	}},
	absoluteWidth: {value: function(element)
	{
		barmatz.utils.DataTypes.isNotUndefined(element);
		barmatz.utils.DataTypes.isInstanceOf(element, HTMLElement);
		return element.offsetWidth + this.unitToPixal(element, this.getStyle(element).marginLeft) + this.unitToPixal(element, this.getStyle(element).marginRight) + this.unitToPixal(element, this.getStyle(element).borderLeft) + this.unitToPixal(element, this.getStyle(element).borderRight);
	}},
	verticalAlign: {value: function(element)
	{
		var parent;
		
		barmatz.utils.DataTypes.isNotUndefined(element);
		barmatz.utils.DataTypes.isInstanceOf(element, HTMLElement);
		
		parent = element.parentElement;
		
		if(parent)
			element.style.marginTop = ((parent.offsetHeight * .5) - (this.absoluteHeight(element) * .5)) + 'px';
	}},
	verticalAlignChildren: {value: function(element)
	{
		var i;
		
		barmatz.utils.DataTypes.isNotUndefined(element);
		barmatz.utils.DataTypes.isInstanceOf(element, HTMLElement);
		
		for(i = 0; i < element.childNodes.length; i++)
			this.verticalAlign(element.childNodes[i]);
	}},
	addClass: {value: function(element, className)
	{
		barmatz.utils.DataTypes.isNotUndefined(element);
		barmatz.utils.DataTypes.isNotUndefined(className);
		barmatz.utils.DataTypes.isInstanceOf(element, HTMLElement);
		barmatz.utils.DataTypes.isTypeOf(className, 'string');
		
		if(element.className.indexOf(className) == -1)
			element.className += ' ' + className;
	}},
	removeClass: {value: function(element, className)
	{
		barmatz.utils.DataTypes.isNotUndefined(element);
		barmatz.utils.DataTypes.isNotUndefined(className);
		barmatz.utils.DataTypes.isInstanceOf(element, HTMLElement);
		barmatz.utils.DataTypes.isTypeOf(className, 'string');
		
		element.className = element.className.replace(new RegExp('^' + className + '\\s?|\\s' + className + '[^\\S]?', 'g'), ' ').replace(/\s+/g, ' ').replace(/^\s+|\s+$/, '');
	}}
});