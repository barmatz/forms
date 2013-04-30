/** barmatz.forms.fields.PhonePrefixes **/
barmatz.forms.fields.PhonePrefixes = [
	'02', '03', '04', '08', '09', 
	'050', '052', '053', '054', '055', '056', '057', '058', '059', 
	'072', '073', '074', '075', '076', '077', '078'
];
barmatz.forms.fields.PhonePrefixes.forEach = function(callback)
{
	var i;
	
	barmatz.utils.DataTypes.isNotUndefined(callback);
	barmatz.utils.DataTypes.isTypeOf(callback, 'function');
	
	for(i = 0; i < this.length; i++)
		callback(this[i]);
};