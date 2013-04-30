/** barmatz.net.RequestCredentials **/
barmatz.net.RequestCredentials = function()
{
	barmatz.mvc.Model.call(this);
	this.set('user', null);
	this.set('password', null);
};
barmatz.net.RequestCredentials.prototype = new barmatz.mvc.Model();
barmatz.net.RequestCredentials.prototype.constructor = barmatz.net.RequestCredentials;
barmatz.net.RequestCredentials.prototype.getUser = function()
{
	return this.get('user');
};
barmatz.net.RequestCredentials.prototype.setUser = function(value)
{
	barmatz.utils.DataTypes.isTypeOf(value, 'string');
	this.set('user', value);
};
barmatz.net.RequestCredentials.prototype.getPassword = function()
{
	return this.get('password');
};
barmatz.net.RequestCredentials.prototype.setPassword = function(value)
{
	barmatz.utils.DataTypes.isTypeOf(value, 'string');
	this.set('password', value);
};