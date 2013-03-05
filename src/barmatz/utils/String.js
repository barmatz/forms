/** barmatz.utils.String **/
window.barmatz.utils.String = function(){};

Object.defineProperties(barmatz.utils.String,
{
	firstLetterToUpperCase: {value: function(string)
	{
		return string.substring(0, 1).toUpperCase() + string.substring(1, string.length);
	}}
});