/** barmatz.forms.TypeModel **/
window.barmatz.forms.TypeModel = function(type)
{
	barmatz.utils.DataTypes.isNotUndefined(type);
	barmatz.utils.DataTypes.isTypeOf(type, 'string', true);
	barmatz.mvc.Model.call(this);
	this.set('type', type);
};

barmatz.forms.TypeModel.prototype = new barmatz.mvc.Model();
barmatz.forms.TypeModel.prototype.constructor = barmatz.forms.TypeModel;

Object.defineProperties(barmatz.forms.TypeModel.prototype, 
{
	type: {get: function()
	{
		return this.get('type');
	}}
});