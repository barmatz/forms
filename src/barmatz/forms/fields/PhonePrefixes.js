/** barmatz.forms.fields.PhonePrefixes **/
barmatz.forms.fields.PhonePrefixes = [
	'02', '03', '04', '08', '09', 
	'050', '052', '053', '054', '055', '056', '057', '058', '059', 
	'072', '073', '074', '075', '076', '077', '078'
];
barmatz.forms.fields.PhonePrefixes.forEach = function(callback)
{
	barmatz.utils.DataTypes.isTypeOf(callback, 'function');
	barmatz.utils.Array.forEach(this, function(item, index, collection)
	{
		callback(item);
	});
};