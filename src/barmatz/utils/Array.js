/** barmatz.utils.Array **/
barmatz.utils.Array = {
	toArray: function(object)
	{
		var array = [];
		
		this.forEach(object, function(item, index, collection)
		{
			array[index] = item;
		});
		
		return array;
	},
	forEach: function(array, callback, thisObject)
	{
		var i;
		for(i = 0; i < array.length; i++)
			callback.call(thisObject || this, array[i], i, array);
	}
};