/** barmatz.forms.fields.FormCheckboxFieldModel **/
window.barmatz.forms.fields.FormCheckboxFieldModel = function(name)
{
	barmatz.utils.DataTypes.isNotUndefined(name);
	barmatz.utils.DataTypes.isTypeOf(name, 'string', true);
	barmatz.forms.fields.FormFieldModel.call(this, barmatz.forms.fields.FormFieldTypes.CHECKBOX, name);
	this.set('checked', false);
	this.set('defaultChecked', false);
};

barmatz.forms.fields.FormCheckboxFieldModel.prototype = new barmatz.forms.fields.FormFieldModel(null, null);
barmatz.forms.fields.FormCheckboxFieldModel.prototype.constructor = barmatz.forms.fields.FormCheckboxFieldModel;

Object.defineProperties(barmatz.forms.fields.FormCheckboxFieldModel.prototype, 
{
	checked: {get: function()
	{
		return this.get('checked');
	}, set: function(value)
	{
		barmatz.utils.DataTypes.isTypeOf(value, 'boolean');
		this.set('checked', value);
	}},
	defaultChecked: {get: function()
	{
		return this.get('defaultChecked');
	}, set: function(value)
	{
		barmatz.utils.DataTypes.isTypeOf(value, 'boolean');
		this.set('defaultChecked', value);
	}},
	value: {get: function()
	{
		return this.checked ? this.get('value') : null;
	}}
});