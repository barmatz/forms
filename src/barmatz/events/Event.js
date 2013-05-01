/** barmatz.events.Event **/
barmatz.events.Event = function(type)
{
	barmatz.utils.DataTypes.isNotUndefined(type);
	barmatz.utils.DataTypes.isTypeOf(type, 'string', true);
	this._type = type;
};

barmatz.events.Event.prototype = {
	getTarget: function()
	{
		return this._target;
	},
	getType: function()
	{
		return this._type;
	},
	clone: function()
	{
		var event = new barmatz.events.Event(this.getType());
		event._target = this.getTarget();
		return event;
	},
	formatToString: function(className)
	{
		var parameters = [], key, i;
		
		arguments = barmatz.utils.Array.toArray(arguments);
		
		for(i = 1; i < arguments.length; i++)
		{
			key = arguments[i];
			
			if(!this.hasOwnProperty(key))
				key = '_' + key;
				
			parameters.push(arguments[i] + '=' + this[key]);
		}
		
		return '[' + className + '(' + parameters.join(', ') + ')]';
	},
	toString: function()
	{
		return this.formatToString('Event', 'type');
	}
};