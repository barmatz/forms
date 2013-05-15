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
	},
	filter: function(array, callback, thisObject)
	{
		(function()
		{
			if(!Array.prototype.filter)
			{
			  Array.prototype.filter = function(fun /*, thisp*/)
			  {
			    "use strict";
			 
			    if (this == null)
			      throw new TypeError();
			 
			    var t = Object(this);
			    var len = t.length >>> 0;
			    if (typeof fun != "function")
			      throw new TypeError();
			 
			    var res = [];
			    var thisp = arguments[1];
			    for (var i = 0; i < len; i++)
			    {
			      if (i in t)
			      {
			        var val = t[i]; // in case fun mutates this
			        if (fun.call(thisp, val, i, t))
			          res.push(val);
			      }
			    }
			 
			    return res;
			  };
			}
		})();
		
		return array.filter(callback, thisObject);
	}
};