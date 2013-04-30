/** barmatz.utils.String **/
barmatz.utils.String = {
	firstLetterToUpperCase: function(string)
	{
		return string.substring(0, 1).toUpperCase() + string.substring(1, string.length);
	}
};