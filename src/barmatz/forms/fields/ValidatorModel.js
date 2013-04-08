/** barmatz.forms.fields.ValidatorModel **/
window.barmatz.forms.fields.ValidatorModel = function()
{
	barmatz.mvc.Model.call(this);
	this.set('code', barmatz.forms.Validator.NONE);
};

barmatz.forms.fields.ValidatorModel.prototype = new barmatz.mvc.Model();
barmatz.forms.fields.ValidatorModel.prototype.constructor = barmatz.forms.fields.ValidatorModel;

Object.defineProperties(barmatz.forms.fields.ValidatorModel.prototype,
{
	code: {get: function()
	{
		return this.get('code');
	}, set: function(value)
	{
		barmatz.utils.DataTypes.isTypeOf(value, 'number');
		this.set('code', value);
	}},
	clone: {value: function()
	{
		var object, i;
		
		object = new barmatz.forms.fields.ValidatorModel();
		object.code = this.code;
		
		for(i in this)
			object[i] = this[i];
		
		return object;
	}}
});