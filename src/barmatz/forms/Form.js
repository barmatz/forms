/** barmatz.forms.Form **/
window.barmatz.forms.Form = function()
{
	barmatz.mvc.Model.call(this);
	
	this._fields = [];
	this.set('encoding', 'application/x-www-form-urlencoded');
	this.set('method', barmatz.forms.Methods.GET);
};

barmatz.forms.Form.prototype = new barmatz.mvc.Model();
barmatz.forms.Form.prototype.constructor = barmatz.forms.Form;

Object.defineProperties(barmatz.forms.Form,
{
	init: {value: function(ref, target)
	{
		if(ref === undefined)
			throw new ReferenceError('expected property ref is undefined');
		
		if(target === undefined)
			throw new ReferenceError('expected property target is undefined');
		else if(!(target instanceof HTMLElement))
			throw new TypeError('target is not an HTMLElement');
		
		loadForm();
		
		function loadForm()
		{
			var loader = new barmatz.net.Loader();
			loader.addEventListener(barmatz.events.LoaderEvent.DONE, onLoaderDone);
			loader.load(new barmatz.net.Request('form1.xml'));
		}
		
		function onLoaderDone(event)
		{
			event.target.removeEventListener(barmatz.events.LoaderEvent.DONE, onLoaderDone);
			generateFormFromXML(barmatz.utils.XML.stringToXML(event.response.data));
		}
		
		function generateFormFromXML(xml)
		{
			var form = new barmatz.forms.Form();

			form.createFromXML(xml);
			
			for(i = 0; i < form.numFields; i++)
				target.appendChild(barmatz.forms.Factory.createFieldWrapper(form.getFieldAt(i)));
			
			target.appendChild(barmatz.forms.Factory.createSubmitButton(form.submitButton));
		}
	}}
}); 
Object.defineProperties(barmatz.forms.Form.prototype, 
{
	id: {get: function()
	{
		return this.get('id'); 
	}, set: function(value)
	{
		this.set('id', value);
	}},
	method: {get: function()
	{
		return this.get('method');
	}, set: function(value)
	{
		if(value != barmatz.forms.Methods.GET && value != barmatz.forms.Methods.POST)
			throw new Error('value is not an allowed method');
		
		this.set('method', value);
	}},
	submitButton: {get: function()
	{
		return this.get('submitButton');
	}},
	encoding: {get: function()
	{
		return this.get('encoding');
	}, set: function(value)
	{
		this.set('encoding', value);
	}},
	uri: {get: function()
	{
		return this.get('uri');
	}, set: function(value)
	{
		this.set('uri', value);
	}},
	numFields: {get: function()
	{
		return this._fields.length;
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
		var _this = this;
		
		if(object === undefined)
			throw new ReferenceError('expected parameter object is undefined');
		else if(typeof object != 'object')
			throw new TypeError('object is not an Object');
		
		setProperties(object);
		setFields(object.field instanceof Array ? object.field : [object.field]);
		setSubmit(object.submit.label);
		
		function setProperties(form)
		{
			_this.id = form.id;
			_this.encoding = form.encoding;
			_this.method = form.method;
			_this.uri = form.uri;
		}
		
		function setFields(fields)
		{
			var field;
			
			while(_this.numFields < fields.length)
			{
				field = fields[_this.numFields];
				_this.addField(barmatz.forms.Factory.createFormField(field.type, field.name, field));
			}
		}
		
		function setSubmit(label)
		{
			_this.set('submitButton', new barmatz.forms.Button(label));
		}
	}},
	addField: {value: function(field)
	{
		if(!(field instanceof barmatz.forms.FormField))
			throw new TypeError('field is not a FormField obejct');
		
		this._fields.push(field);
		this.dispatchEvent(new barmatz.events.FormEvent(barmatz.events.FormEvent.FIELD_ADDED, field));
	}},
	addFieldAt: {value: function(field, index)
	{
		if(!(field instanceof barmatz.forms.FormField))
			throw new TypeError('field is not a FormField obejct');

		if(index < 0)
			index = 0;
		else if(index > this.numFields)
			index = this.numFields;
		
		this._fields.splice(index, 0, field);
		this.dispatchEvent(new barmatz.events.FormEvent(barmatz.events.FormEvent.FIELD_ADDED, field));
	}},
	removeField: {value: function(field)
	{
		if(!(field instanceof barmatz.forms.FormField))
			throw new TypeError('field is not a FormField obejct');
		
		this.removeFieldAt(this._fields.indexOf(field));
		this.dispatchEvent(new barmatz.events.FormEvent(barmatz.events.FormEvent.FIELD_REMOVED, field));
	}},
	removeFieldAt: {value: function(index)
	{
		var field;
		
		if(index < 0 || index >= this.numFields)
			throw new Error('index is out of bounds');
		
		field = this._fields.splice(index, 1)[0];
		this.dispatchEvent(new barmatz.events.FormEvent(barmatz.events.FormEvent.FIELD_REMOVED, field));
	}},
	getFieldAt: {value: function(index)
	{
		if(index < 0 || index >= this.numFields)
			throw new Error('index is out of bounds');
		
		return this._fields[index];
	}},
	getFieldsByType: {value: function(type)
	{
		return this._fields.filter(function(field, index, collection)
		{
			return field.type == type;
		});
	}},
	getFieldByName: {value: function(name)
	{
		return this._fields.filter(function(field, index, collection)
		{
			return field.name == name;
		})[0];
	}},
	submit: {value: function()
	{
		var request = new barmatz.net.Request(this.uri),
			loader = new barmatz.net.Loader(),
			i;
		
		for(i = 0; i < this.numFields; i++)
		{
			field = this.getFieldAt(i);
			request.data[field.name] = field.value;
		}
		
		loader.send();
	}}
});