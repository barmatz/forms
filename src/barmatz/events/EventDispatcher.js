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
		var queue, i, c;
		
		barmatz.utils.DataTypes.isInstanceOf(event, barmatz.events.Event);
		
		event._target = this._target;
		
		for(i in this._listeners)
		{
			if(i === event.getType())
			{
				queue = [];
				
				for(c = 0; c < this._listeners[i].length; c++)
					queue.push(this._listeners[i][c]);
				
				for(c = 0; c < queue.length; c++)
					queue[c].call(this, event);
			}
		}
	},
	hasEventListener: function(type)
	{
		return this._listeners[type] ? true : false;
	},
	removeEventListener: function(type, listener)
	{
		var i;
		
		if(this._listeners[type])
		{
			for(i = 0; i < this._listeners[type].length; i++)
				if(this._listeners[type][i] === listener)
					this._listeners[type].splice(i, 1);
			
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