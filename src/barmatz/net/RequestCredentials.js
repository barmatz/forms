/** barmatz.net.RequestCredentials **/
window.barmatz.net.RequestCredentials = function()
{
	barmatz.mvc.Model.call(this);
};

barmatz.net.RequestCredentials.prototype = new barmatz.mvc.Model();
barmatz.net.RequestCredentials.prototype.constructor = barmatz.net.RequestCredentials;

Object.defineProperties(barmatz.net.RequestCredentials.prototype,
{
	user: {get: function()
	{
		return this.get('user');
	}, set: function(value)
	{
		barmatz.utils.DataTypes.isTypeOf(value, 'string');
		this.set('user', value);
	}},
	password: {get: function()
	{
		return this.get('password');
	}, set: function(value)
	{
		barmatz.utils.DataTypes.isTypeOf(value, 'string');
		this.set('password', value);
	}}
});