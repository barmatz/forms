/** barmatz.forms.TypeModel **/
barmatz.forms.TypeModel = function(type)
{
	barmatz.utils.DataTypes.isNotUndefined(type);
	barmatz.utils.DataTypes.isTypeOf(type, 'string', true);
	barmatz.mvc.Model.call(this);
	this.set('type', type);
};
barmatz.forms.TypeModel.prototype = new barmatz.mvc.Model();
barmatz.forms.TypeModel.prototype.constructor = barmatz.forms.TypeModel;
barmatz.forms.TypeModel.prototype.getType = function()
{
	return this.get('type');
};