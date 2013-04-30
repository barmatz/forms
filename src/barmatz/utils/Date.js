/** barmatz.utils.Date **/
barmatz.utils.Date = {
	isInvalid: function(date)
	{
		barmatz.utils.DataTypes.isInstanceOf(date, Date);
		return isNaN(date.getTime()) ? true : false;
	},
	toDate: function(string)
	{
		var isoExp, date, month, parts;
		
		barmatz.utils.DataTypes.isTypeOf(string, 'string');
		
		isoExp = /^(\d{4})-(\d{2})-(\d{2})\s(\d{2}):(\d{2}):(\d{2})$/;
        date = new Date(NaN);
        parts = isoExp.exec(string);

		if(parts)
		{
			month = +parts[2];
			date.setFullYear(parts[1], month - 1, parts[3]);
			date.setHours(parts[4]);
			date.setMinutes(parts[5]);
			date.setSeconds(parts[6]);
		}
		return date;
	},
	toString: function(date, format)
	{
		barmatz.utils.DataTypes.isInstanceOf(date, Date, true);
		barmatz.utils.DataTypes.isTypeOf(format, 'string');
		
		if(!date || this.isInvalid(date))
			return 'Invalid date';
		else
			return format.replace(/d{2}/, leadingZero(date.getDate())).
				   replace(/d{1}/, date.getDate()).
				   replace(/n{1}/, date.getDay() + 1).
				   replace(/m{3}/, leadingDoubleZero(date.getMilliseconds())).
				   replace(/m{2}/, leadingZero(date.getMonth() + 1)).
				   replace(/m{1}/, date.getMonth() + 1).
				   replace(/y{4}/, date.getFullYear()).
				   replace(/y{2}/, date.getFullYear().toString().substring(2, 4)).
				   replace(/h{2}/, leadingZero(date.getHours())).
				   replace(/h{1}/, date.getHours()).
				   replace(/H{1}/, (date.getHours() % 12)).
				   replace(/i{2}/, leadingZero(date.getMinutes())).
				   replace(/i{1}/, date.getMinutes()).
				   replace(/s{2}/, leadingZero(date.getSeconds())).
				   replace(/s{1}/, date.getSeconds()).
				   replace(/D{1}/, this.getDayName(date)).
				   replace(/M{1}/, this.getMonthName(date)).
				   replace(/A{1}/, date.getHours() < 13 ? 'am' : 'pm');
			   
		function leadingZero(number)
		{
			return (number < 10 ? '0': '') + number.toString();
		}
		
		function leadingDoubleZero(number)
		{
			return (number < 100 ? '00': '') + number.toString();
		}
	},
	getDayName: function(date)
	{
		barmatz.utils.DataTypes.isInstanceOf(date, Date);
		return  ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'][date.getDay()];
	},
	getMonthName: function(date)
	{
		barmatz.utils.DataTypes.isInstanceOf(date, Date);
		return  ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'][date.getMonth()];
	}
};