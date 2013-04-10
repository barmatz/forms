/** barmatz.forms.fields.ValidatorModel **/
window.barmatz.forms.fields.ValidatorModel = function(data)
{
	var i;
	
	barmatz.utils.DataTypes.isTypeOf(data, 'object', true);
	barmatz.mvc.Model.call(this);
	this.set('code', barmatz.forms.Validator.NONE);

	if(data)
	{
		if(data.code)
			this.set('code', data.code);
		
		for(i in data)
			this[i] = data[i];
	}
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
	}},
	toJSON: {value: function()
	{
		var object, i;
		
		object = {code: this.code};
		
		for(i in this)
			if(typeof this[i] != 'function' && /^[^_]/.test(i))
				object[i] = this[i];
		
		return object;
	}}
});