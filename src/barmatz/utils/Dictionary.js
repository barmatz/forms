/** barmatz.utils.Dictionary **/
barmatz.utils.Dictionary = function()
{
	this._keys = [];
	this._values = [];
};
barmatz.utils.Dictionary.prototype = {
	add: function(key, value)
	{
		var keyIndex = this._keys.indexOf(key);
		
		if(keyIndex >= 0)
			this._values[keyIndex] = value;
		else if(keyIndex == -1)
		{
			this._keys.push(key);
			this._values.push(value);
		}
		else
			throw new Error('an error has occured');
		
		return value;
	},
	remove: function(key)
	{
		var keyIndex, value;
		keyIndex = this._keys.indexOf(key);
		value = this.get(keyIndex);
		this._keys.splice(keyIndex, 1);
		this._values.splice(keyIndex, 1);
		return value;
	},
	get: function(key)
	{
		return this._values[this._keys.indexOf(key)];
	},
	getNext: function(key)
	{
		return this._values[this._keys.indexOf(key) + 1];
	},
	getPrev: function(key)
	{
		return this._values[this._keys.indexOf(key) - 1];
	},
	reset: function()
	{
		this._keys.splice(0, this._keys.length);
		this._values.splice(0, this._values.length);
	},
	forEach: function(callback)
	{
		var i;
		for(i = 0; i < this._keys.length; i++)
			callback(this._values[i], this._keys[i]);
	},
	find: function(value)
	{
		if(value === undefined)
			throw new ReferenceError('expected property value is undefined');
		
		return this._keys[this._values.indexOf(value)];
	}
};