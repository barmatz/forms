/** barmatz.forms.fields.PhonePrefixes **/
window.barmatz.forms.fields.PhonePrefixes = function(){};

Object.defineProperties(barmatz.forms.fields.PhonePrefixes,
{
	ALL: {value: [
		'02', '03', '04', '08', '09', 
		'050', '052', '053', '054', '055', '056', '057', '058', '059', 
		'072', '073', '074', '075', '076', '077', '078'
	]},
	forEach: {value: function(callback)
	{
		var i;
		
		barmatz.utils.DataTypes.isNotUndefined(callback);
		barmatz.utils.DataTypes.isTypeOf(callback, 'function');
		
		for(i in this.ALL)
			callback(this.ALL[i]);
	}}
});