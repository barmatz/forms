window.barmatz.forms.FormItemModel = function(type, validation, validationParams)
{
	if(typeof type != 'string')
		throw new TypeError('type is not a String');

	if(validation && typeof validation != 'function')
		throw new TypeError('validation is not a Function');
	
	if(validationParams && !(validationParams instanceof 'Array'))
		throw new TypeError('validationParams is not an Array');
	
	barmatz.mvc.Model.call(this);

	this.set('type', type);
	this.set('validation', validation);
	this.set('validationParams', validationParams);
};

barmatz.forms.FormItemModel.prototype = new barmatz.dom.DOMModel();
barmatz.forms.FormItemModel.prototype.constructor = barmatz.forms.FormItemModel;

Object.defineProperties(barmatz.forms.FormItemModel.prototype,
{
	type: {get: function()
	{
		return this.get('type');
	}},
	validation: {get: function()
	{
		return this.get('validation');
	}},
	validationParams: {get: function()
	{
		return this.get('validationParams');
	}}
});