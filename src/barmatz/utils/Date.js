/** barmatz.utils.Date **/
window.barmatz.utils.Date = function(){};

Object.defineProperties(barmatz.utils.Date,
{
	toString: {value: function(date, format)
	{
		barmatz.utils.DataTypes.isNotUndefined(date);
		barmatz.utils.DataTypes.isNotUndefined(format);
		barmatz.utils.DataTypes.isInstanceOf(date, Date);
		barmatz.utils.DataTypes.isTypeOf(format, 'string');
		
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
	}},
	getDayName: {value: function(date)
	{
		barmatz.utils.DataTypes.isNotUndefined(date);
		barmatz.utils.DataTypes.isInstanceOf(date, Date);
		return  ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'][date.getDay()];
	}},
	getMonthName: {value: function(date)
	{
		barmatz.utils.DataTypes.isNotUndefined(date);
		barmatz.utils.DataTypes.isInstanceOf(date, Date);
		return  ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'][date.getMonth()];
	}}
});