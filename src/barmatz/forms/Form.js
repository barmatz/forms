/** barmatz.forms.Form **/
window.barmatz.forms.Form = function()
{
	barmatz.events.EventDispatcher.call(this);
	
	this._formInfo = null;
};

barmatz.forms.Form.prototype = new barmatz.events.EventDispatcher();
barmatz.forms.Form.prototype.constructor = barmatz.forms.Form;

Object.defineProperties(barmatz.forms.Form.prototype, 
{
	id: {get: function()
	{
		return this._formInfo ? this._formInfo.id : null;
	}},
	numFields: {get: function()
	{
		return this._formInfo && this._formInfo.fields ? this._formInfo.fields.length : 0;
	}},
	createFromXML: {value: function(xml)
	{
		if(xml === undefined)
			throw new ReferenceError('expected parameter xml is undefined');
		else if(!(xml instanceof XMLDocument))
			throw new TypeError('xml is not an XMLDocument object');
		
		this.createFromObject(barmatz.utils.XML.xmlToObject(xml));
	}},
	createFromObject: {value: function(object)
	{
		var fields, field;
		
		if(object === undefined)
			throw new ReferenceError('expected parameter object is undefined');
		else if(typeof object != 'object')
			throw new TypeError('object is not an Object');
		else if(!object.form)
			throw new Error('invalid object');
		
		this._formInfo = new barmatz.forms.FormInfo(object.form.id);
		
		fields = object.form.field instanceof Array ? object.form.field : [object.form.field];

		while(this.numFields < fields.length)
		{
			field = fields[this.numFields];
			this._formInfo.addField(new barmatz.forms.FormField(field.type, field.name));
		}
	}}
});