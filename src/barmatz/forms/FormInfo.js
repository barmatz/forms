/** barmatz.forms.FormInfo **/
window.barmatz.forms.FormInfo = function(id)
{
	if(id === undefined)
		throw new ReferenceError('expected property id is undefined');
	else if(typeof id != 'string')
		throw new TypeError('id is not a String');
	
	barmatz.mvc.Model.call(this);
	
	
	this.set('id', id);
	this.set('fields', []);
};

barmatz.forms.FormInfo.prototype = new barmatz.mvc.Model();
barmatz.forms.FormInfo.prototype.constructor = barmatz.forms.FormInfo;

Object.defineProperties(barmatz.forms.FormInfo.prototype,
{
	id: {get: function()
	{
		return this.get('id'); 
	}},
	fields: {get: function()
	{
		return this.get('fields');
	}},
	addField: {value: function(field)
	{
		if(!(field instanceof barmatz.forms.FormField))
			throw new TypeError('field is not a FormField obejct');
		this.fields.push(field);
		this.dispatchEvent(new barmatz.events.FormEvent(barmatz.events.FormEvent.FIELD_ADDED, field));
	}},
	addFieldAt: {value: function(field, index)
	{
		if(!(field instanceof barmatz.forms.FormField))
			throw new TypeError('field is not a FormField obejct');

		if(index < 0)
			index = 0;
		else if(index > this.fields.length)
			index = this.fields.length;
		
		this.fields.splice(index, 0, field);
		this.dispatchEvent(new barmatz.events.FormEvent(barmatz.events.FormEvent.FIELD_ADDED, field));
	}},
	removeField: {value: function(field)
	{
		if(!(field instanceof barmatz.forms.FormField))
			throw new TypeError('field is not a FormField obejct');
		
		this.removeFieldAt(this.fields.indexOf(field));
		this.dispatchEvent(new barmatz.events.FormEvent(barmatz.events.FormEvent.FIELD_REMOVED, field));
	}},
	removeFieldAt: {value: function(index)
	{
		var field;
		
		if(index < 0 || index >= this.fields.length)
			throw new Error('index is out of bounds');
		
		field = this.fields.splice(index, 1)[0];
		this.dispatchEvent(new barmatz.events.FormEvent(barmatz.events.FormEvent.FIELD_REMOVED, field));
	}}
});