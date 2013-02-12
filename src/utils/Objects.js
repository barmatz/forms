window.barmatz.utils.Objects = function(){};

Object.defineProperties(barmatz.utils.Objects, 
{
	setNested: {value: function(object, key, value)
	{
		var keys = key.split('.'), i = 0;
		
		while(i < keys.length - 1)
		{
			object = object[keys[i]];
			i++;
		}
		
		object[keys[i]] = value;
	}}
});