/** barmatz.forms.fields.FormFileFieldModel **/
window.barmatz.forms.fields.FormFileFieldModel = function(name)
{
	barmatz.utils.DataTypes.isNotUndefined(name);
	barmatz.utils.DataTypes.isTypeOf(name, 'string');
	
	barmatz.forms.fields.FormFieldModel.call(this, barmatz.forms.fields.FormFieldTypes.FILE, name);
	
	this.set('accept', []);
};

barmatz.forms.fields.FormFileFieldModel.prototype = new barmatz.forms.fields.FormFieldModel(null, null);
barmatz.forms.fields.FormFileFieldModel.prototype.constructor = barmatz.forms.fields.FormFileFieldModel;

Object.defineProperties(barmatz.forms.fields.FormFileFieldModel.prototype,
{
	accept: {get: function()
	{
		return this.get('accept');
	}, set: function(value)
	{
		barmatz.utils.DataTypes.isInstanceOf(value, Array);
		this.set('accept', value);
	}},
	clone: {value: function()
	{
		var clone = new barmatz.forms.fields.FormFileFieldModel(this.name);
		clone.label = this.label;
		clone.mandatory = this.mandatory;
		clone.default = this.default;
		clone.value = this.value;
		clone.enabled = this.enabled;
		clone.accept = this.accept;
		return clone;
	}}
});