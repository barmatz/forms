/** barmatz.forms.fields.FileFieldModel **/
barmatz.forms.fields.FileFieldModel = function(name)
{
	barmatz.utils.DataTypes.isTypeOf(name, 'string');
	barmatz.forms.fields.FieldModel.call(this, barmatz.forms.fields.FieldTypes.FILE, name);
	this.set('accept', []);
};
barmatz.forms.fields.FileFieldModel.prototype = new barmatz.forms.fields.FieldModel(null, null);
barmatz.forms.fields.FileFieldModel.prototype.constructor = barmatz.forms.fields.FileFieldModel;
barmatz.forms.fields.FileFieldModel.prototype.getAccept = function()
{
	return this.get('accept');
};
barmatz.forms.fields.FileFieldModel.prototype.setAccept = function(value)
{
	barmatz.utils.DataTypes.isInstanceOf(value, window.Array);
	this.set('accept', value);
};
barmatz.forms.fields.FileFieldModel.prototype.clone = function()
{
	var clone = new barmatz.forms.fields.FileFieldModel(this.getName());
	clone.setLabel(this.getLabel());
	clone.setMandatory(this.getMandatory());
	clone.setValue(this.getValue());
	clone.setEnabled(this.getEnabled());
	clone.setValidator(this.getValidator().clone());
	clone.setAccept(this.getAccept());
	return clone;
};