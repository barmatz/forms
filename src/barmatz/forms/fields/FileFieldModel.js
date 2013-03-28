/** barmatz.forms.fields.FileFieldModel **/
window.barmatz.forms.fields.FileFieldModel = function(name)
{
	barmatz.utils.DataTypes.isNotUndefined(name);
	barmatz.utils.DataTypes.isTypeOf(name, 'string');
	
	barmatz.forms.fields.FieldModel.call(this, barmatz.forms.fields.FieldTypes.FILE, name);
	
	this.set('accept', []);
};

barmatz.forms.fields.FileFieldModel.prototype = new barmatz.forms.fields.FieldModel(null, null);
barmatz.forms.fields.FileFieldModel.prototype.constructor = barmatz.forms.fields.FileFieldModel;

Object.defineProperties(barmatz.forms.fields.FileFieldModel.prototype,
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
		var clone = new barmatz.forms.fields.FileFieldModel(this.name);
		clone.label = this.label;
		clone.mandatory = this.mandatory;
		clone.value = this.value;
		clone.enabled = this.enabled;
		clone.accept = this.accept;
		return clone;
	}},
	toHTML: {value: function()
	{
		return barmatz.forms.fields.FieldModel.prototype.toHTML.call(this).replace(/(\<input)\s/, '$1 accept="' + this.accept.join(',') + '"');
	}}
});