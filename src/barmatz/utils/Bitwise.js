/** barmatz.utils.Bitwise **/
window.barmatz.utils.Bitwise = function(){};

Object.defineProperties(barmatz.utils.Bitwise,
{
	slice: {value: function(bitA, bitB)
	{
		var bitsA, bitsB, index, i;
		
		barmatz.utils.DataTypes.isNotUndefined(bitA);
		barmatz.utils.DataTypes.isNotUndefined(bitB);
		barmatz.utils.DataTypes.isTypeOf(bitA, 'number');
		barmatz.utils.DataTypes.isTypeOf(bitB, 'number');
		
		bitsA = this.parseBit(bitA);
		bitsB = this.parseBit(bitB);
		
		for(i in bitsB)
		{
			index = bitsA.indexOf(bitsB[i]);
			
			if(index > -1)
				bitsA.splice(index, 1);
		}
		
		return this.concat.apply(this, bitsA);
	}},
	concat: {value: function()
	{
		var result, filterredBits, bits, i;
		
		bits = [];
		filterredBits = [];
		result = 0;
		
		for(i in arguments)
			bits = bits.concat(this.parseBit(arguments[i]));
		
		filterredBits = bits.filter(function(a,b,c)
		{
			return filterredBits.indexOf(a) >= 0 ? false : filterredBits.push(a) >= 0;
		});
		
		for(i in filterredBits)
			result += filterredBits[i];
		
		return result;
	}},
	parseBit: {value: function(bit)
	{
		var bits, i;
		
		barmatz.utils.DataTypes.isNotUndefined(bit);
		barmatz.utils.DataTypes.isTypeOf(bit, 'number');
		
		bits = [];
		
		for(i  = 1; i <= bit; i = i << 1)
			if(i & bit)
				bits.push(i);
		
		return bits;
	}},
	contains: {value: function(bitA, bitB)
	{
		return bitA & bitB ? true : false;
	}}
});