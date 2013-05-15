/** barmatz.utils.Bitwise **/
barmatz.utils.Bitwise = {
	slice: function(bitA, bitB)
	{
		var bits;
		
		barmatz.utils.DataTypes.isTypeOf(bitA, 'number');
		barmatz.utils.DataTypes.isTypeOf(bitB, 'number');
		
		bits = this.parseBit(bitA);
		barmatz.utils.Array.forEach(this.parseBit(bitB), function(item, index, collection)
		{
			index = bits.indexOf(item);
			
			if(index > -1)
				bits.splice(index, 1);
		});
		
		return this.concat.apply(this, bits);
	},
	concat: function()
	{
		var result, filterredBits, bits;
		
		bits = [];
		filterredBits = [];
		result = 0;
		barmatz.utils.Array.forEach(arguments, function(item, index, collection)
		{
			bits = bits.concat(this.parseBit(item));
		}, this);
		filterredBits = barmatz.utils.Array.filter(bits, function(a,b,c)
		{
			return filterredBits.indexOf(a) >= 0 ? false : filterredBits.push(a) >= 0;
		});
		barmatz.utils.Array.forEach(filterredBits, function(item, index, collection)
		{
			result += item;
		});		
		
		return result;
	},
	parseBit: function(bit)
	{
		var bits, i;
		
		barmatz.utils.DataTypes.isTypeOf(bit, 'number');
		
		bits = [];
		
		for(i = 1; i <= bit; i = i << 1)
			if(i & bit)
				bits.push(i);
		
		return bits;
	},
	contains: function(bitA, bitB)
	{
		return bitA & bitB ? true : false;
	}
};