/** barmatz.forms.fields.ValidatorModel **/
barmatz.forms.fields.ValidatorModel = function(data)
{
	var i;
	
	barmatz.utils.DataTypes.isTypeOf(data, 'object', true);
	barmatz.mvc.Model.call(this);
	this.set('code', barmatz.forms.Validator.NONE);
	this.set('errorMessage', null);

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
barmatz.forms.fields.ValidatorModel.prototype.getCode = function()
{
	return this.get('code');
};
barmatz.forms.fields.ValidatorModel.prototype.setCode = function(value)
{
	barmatz.utils.DataTypes.isTypeOf(value, 'number');
	this.set('code', value);
};
barmatz.forms.fields.ValidatorModel.prototype.getErrorMessage = function()
{
	return this.get('errorMessage');
},
barmatz.forms.fields.ValidatorModel.prototype.setErrorMessage = function(value)
{
	barmatz.utils.DataTypes.isTypeOf(value, 'string');
	this.set('errorMessage', value);
},
barmatz.forms.fields.ValidatorModel.prototype.clone = function()
{
	var object, i;
	
	object = new barmatz.forms.fields.ValidatorModel();
	object.setCode(this.getCode());
	object.setErrorMessage(this.getErrorMessage());
	
	for(i in this)
		object[i] = this[i];
	
	return object;
};
barmatz.forms.fields.ValidatorModel.prototype.toJSON = function()
{
	var object, key, getter, i;
	
	object = {code: this.getCode(), errorMessage: this.getErrorMessage()};
	
	for(i in this)
		if(typeof this[i] != 'function' && i != '_target' && i != '_listeners')
		{
			if(/^_/.test(i))
			{
				key = i.replace('_', '');
				getter = 'get' + barmatz.utils.String.firstLetterToUpperCase(key);
				object[key] = /^_/.test(i) && this.hasOwnProperty(getter) ? this[getter]() : this[i];
			}
			else
				object[i] = this[i];
		}
	
	return object;
};