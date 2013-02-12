window.barmatz.forms.FormModel = function(id, action, method)
{
	barmatz.mvc.Model.call(this);
	this.items = [];
	this.set('id', id);
	this.set('action', action);
	this.set('method', method);
	this.set('width', '100%');
};

barmatz.forms.FormModel.prototype = new barmatz.mvc.Model();
barmatz.forms.FormModel.prototype.constructor = barmatz.forms.FormModel;

Object.defineProperties(barmatz.forms.FormModel.prototype, 
{
	id: {get: function()
	{
		return this.get('id');
	}},
	action: {get: function()
	{
		return this.get('action');
	}},
	method: {get: function()
	{
		return this.get('method');
	}},
	width: {get: function()
	{
		return this.get('width');
	}, set: function(value)
	{
		this.set('width', value);
	}},
	addItem: {value: function(item)
	{
		if(!(item instanceof barmatz.forms.FormItemModel))
			throw new TypeError('item is not a FormItemModel object');
		
		this.items.push(item);
	}},
	removeItem: {value: function(item)
	{
		var i;
		
		if(!(item instanceof barmatz.forms.FormItemModel))
			throw new TypeError('item is not a FormItemModel object');
		
		for(i = 0; i < this.items.length; i++)
		{
			if(this.items[i] === item)
			{
				this.items.splice(i, 1);
				break;
			}
		}
	}},
	validate: {value: function()
	{
		var item, i;
		
		for(i in this.items)
		{
			item = this.items[i];
			
			if(item.validationParams)
				item.validation.apply(item, [item.value].concat(item.validationParams));
			else
				item.validation(item.value);
		}
	}},
	submit: {value: function()
	{
		console.log('submit!!');
	}}
});
