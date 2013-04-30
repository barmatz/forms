/** barmatz.mvc.Model **/
barmatz.mvc.Model = function()
{
	barmatz.events.EventDispatcher.call(this);
};
barmatz.mvc.Model.prototype = new barmatz.events.EventDispatcher();
barmatz.mvc.Model.prototype.constructor = barmatz.mvc.Model;
barmatz.mvc.Model.prototype.get = function(key)
{
	return this['_' + key];
};
barmatz.mvc.Model.prototype.set = function(key, value)
{
	barmatz.utils.DataTypes.isNotUndefined(key);
	barmatz.utils.DataTypes.isNotUndefined(value);
	this['_' + key] = value;
	this.dispatchEvent(new barmatz.events.ModelEvent(barmatz.events.ModelEvent.VALUE_CHANGED, key, value));
};