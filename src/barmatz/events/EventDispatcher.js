/** barmatz.events.EventDispatcher **/
barmatz.events.EventDispatcher = function(target)
{
	this._target = target || this;
	this._listeners = {};
};

barmatz.events.EventDispatcher.prototype = {
	addEventListener: function(type, listener)
	{
		barmatz.utils.DataTypes.isTypeOf(type, 'string');
		barmatz.utils.DataTypes.isTypeOf(listener, 'function');
		
		if(!this._listeners[type])
			this._listeners[type] = [];
		
		this._listeners[type].push(listener);
	},
	dispatchEvent: function(event)
	{
		var queue, i;
		
		barmatz.utils.DataTypes.isInstanceOf(event, barmatz.events.Event);
		
		event._target = this._target;
		
		for(i in this._listeners)
		{
			if(i === event.getType())
			{
				queue = [];
				
				barmatz.utils.Array.forEach(this._listeners[i], function(item, index, collection)
				{
					queue.push(item);
				});
				barmatz.utils.Array.forEach(queue, function(item, index, collection)
				{
					item.call(this, event);
				}, this);				
			}
		}
	},
	hasEventListener: function(type)
	{
		return this._listeners[type] ? true : false;
	},
	removeEventListener: function(type, listener)
	{
		if(this._listeners[type])
		{
			barmatz.utils.Array.forEach(this._listeners[type], function(item, index, collection)
			{
				if(item === listener)
					collection.splice(index, 1);
			}, this);
			
			if(this._listeners[type].length == 0)
				delete this._listeners[type];
		}
	},
	toJSON: function()
	{
		var object, i;
		
		object = {};
		
		for(i in this)
			object[i] = this[i];
		
		delete object._target;
		delete object._listeners;
		
		return object;
	}
};