/** barmatz.forms.FormModel **/
window.barmatz.forms.FormModel = function()
{
	barmatz.mvc.Model.call(this);
	
	this._fields = [];
	this.set('encoding', 'application/x-www-form-urlencoded');
	this.set('method', barmatz.forms.Methods.GET);
};

barmatz.forms.FormModel.prototype = new barmatz.mvc.Model();
barmatz.forms.FormModel.prototype.constructor = barmatz.forms.FormModel;

Object.defineProperties(barmatz.forms.FormModel,
{
	init: {value: function(ref, target)
	{
		var form;
		
		barmatz.utils.DataTypes.isNotUndefined(ref);
		barmatz.utils.DataTypes.isNotUndefined(target);
		barmatz.utils.DataTypes.isInstanceOf(target, HTMLElement);
		
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
			form = new barmatz.forms.FormModel();
			form.createFromXML(xml);
			
			for(i = 0; i < form.numFields; i++)
			{
				target.appendChild(barmatz.forms.factories.DOMFactory.createFieldWrapper(form.getFieldAt(i)).wrapper);
				barmatz.utils.CSS.verticalAlignChildren(target);
			}
			
			target.appendChild(barmatz.forms.factories.DOMFactory.createSubmitButton(form.submitButtonLabel, onSubmitButtonClick));
		}
		
		function onSubmitButtonClick(event)
		{
			form.submit();
		}
	}}
}); 
Object.defineProperties(barmatz.forms.FormModel.prototype, 
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
	submitButtonLabel: {get: function()
	{
		return this.get('submitButtonLabel');
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
		barmatz.utils.DataTypes.isNotUndefined(xml);
		barmatz.utils.DataTypes.isInstanceOf(xml, XMLDocument);
		this.createFromObject(barmatz.utils.XML.xmlToObject(xml));
	}},
	createFromObject: {value: function(object)
	{
		var _this = this;
		
		barmatz.utils.DataTypes.isNotUndefined(object);
		barmatz.utils.DataTypes.isTypeOf(object, 'object');
		setProperties(object);
		setFields(object.field instanceof Array ? object.field : [object.field]);
		this.set('submitButtonLabel', object.submit.label);
		
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
				_this.addField(barmatz.forms.factories.ModelFactory.createFieldModel(field.type, field.name, field));
			}
		}
	}},
	addField: {value: function(field)
	{
		barmatz.utils.DataTypes.isNotUndefined(field);
		barmatz.utils.DataTypes.isInstanceOf(field, barmatz.forms.fields.FieldModel);
		this._fields.push(field);
		this.dispatchEvent(new barmatz.events.CollectionEvent(barmatz.events.CollectionEvent.ITEM_ADDED, field));
	}},
	addFieldAt: {value: function(field, index)
	{
		barmatz.utils.DataTypes.isNotUndefined(field);
		barmatz.utils.DataTypes.isNotUndefined(index);
		barmatz.utils.DataTypes.isInstanceOf(field, barmatz.forms.fields.FieldModel);

		if(index < 0)
			index = 0;
		else if(index > this.numFields)
			index = this.numFields;
		
		this._fields.splice(index, 0, field);
		this.dispatchEvent(new barmatz.events.CollectionEvent(barmatz.events.CollectionEvent.ITEM_ADDED, field));
	}},
	removeField: {value: function(field)
	{
		barmatz.utils.DataTypes.isNotUndefined(field);
		barmatz.utils.DataTypes.isInstanceOf(field, barmatz.forms.fields.FieldModel);
		this.removeFieldAt(this._fields.indexOf(field));
		this.dispatchEvent(new barmatz.events.CollectionEvent(barmatz.events.CollectionEvent.ITEM_REMOVED, field));
	}},
	removeFieldAt: {value: function(index)
	{
		var field;
		
		if(index < 0 || index >= this.numFields)
			throw new Error('index is out of bounds');
		
		field = this._fields.splice(index, 1)[0];
		this.dispatchEvent(new barmatz.events.CollectionEvent(barmatz.events.CollectionEvent.ITEM_REMOVED, field));
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
		
		loader.load(request);
	}}
});