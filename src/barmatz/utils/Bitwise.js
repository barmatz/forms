/** barmatz.utils.Bitwise **/
barmatz.utils.Bitwise = {
	slice: function(bitA, bitB)
	{
		var bitsA, bitsB, index, i;
		
		barmatz.utils.DataTypes.isTypeOf(bitA, 'number');
		barmatz.utils.DataTypes.isTypeOf(bitB, 'number');
		
		bitsA = this.parseBit(bitA);
		bitsB = this.parseBit(bitB);
		
		for(i = 0; i < bitsB.length; i++)
		{
			index = bitsA.indexOf(bitsB[i]);
			
			if(index > -1)
				bitsA.splice(index, 1);
		}
		
		return this.concat.apply(this, bitsA);
	},
	concat: function()
	{
		var result, filterredBits, bits, i;
		
		bits = [];
		filterredBits = [];
		result = 0;
		
		for(i = 0; i < arguments.length; i++)
			bits = bits.concat(this.parseBit(arguments[i]));
		
		filterredBits = bits.filter(function(a,b,c)
		{
			return filterredBits.indexOf(a) >= 0 ? false : filterredBits.push(a) >= 0;
		});
		
		for(i = 0; i < filterredBits.length; i++)
			result += filterredBits[i];
		
		return result;
	},
	parseBit: function(bit)
	{
		var bits, i;
		
		barmatz.utils.DataTypes.isTypeOf(bit, 'number');
		
		bits = [];
		
		for(i  = 1; i <= bit; i = i << 1)
			if(i & bit)
				bits.push(i);
		
		return bits;
	},
	contains: function(bitA, bitB)
	{
		return bitA & bitB ? true : false;
	}
};