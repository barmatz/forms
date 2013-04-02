/** barmatz.forms.FormModel **/
window.barmatz.forms.FormModel = function()
{
	barmatz.forms.CollectionModel.call(this);
	this.set('id', '');
	this.set('name', '');
	this.set('submitButtonLabel', 'Submit');
	this.set('method', barmatz.forms.Methods.GET);
	this.set('encoding', barmatz.net.Encoding.FORM);
	this.set('created', null);
	this.set('fingerprint', null);
};

barmatz.forms.FormModel.prototype = new barmatz.forms.CollectionModel();
barmatz.forms.FormModel.prototype.constructor = barmatz.forms.FormModel;

Object.defineProperties(barmatz.forms.FormModel.prototype, 
{
	name: {get: function()
	{
		return this.get('name');
	}, set: function(value)
	{
		barmatz.utils.DataTypes.isTypeOf(value, 'string');
		this.set('name', value);
	}},
	submitButtonLabel: {get: function()
	{
		return this.get('submitButtonLabel');
	}, set: function(value)
	{
		barmatz.utils.DataTypes.isTypeOf(value, 'string');
		this.set('submitButtonLabel', value);
	}},
	method: {get: function()
	{
		return this.get('method');
	}, set: function(value)
	{
		barmatz.utils.DataTypes.isTypeOf(value, 'string');
		this.set('method', value);
	}},
	encoding: {get: function()
	{
		return this.get('encoding');
	}, set: function(value)
	{
		barmatz.utils.DataTypes.isTypeOf(value, 'string');
		this.set('encoding', value);
	}},
	created: {get: function()
	{
		return this.get('created');
	}, set: function(value)
	{
		barmatz.utils.DataTypes.isInstanceOf(value, Date);
		this.set('created', value);
	}},
	fingerprint: {get: function()
	{
		return this.get('fingerprint');
	}, set: function(value)
	{
		barmatz.utils.DataTypes.isTypeOf(value, 'string');

		if(!this.fingerprint)
			this.set('fingerprint', value);
	}},
	addItem: {value: function(item)
	{
		barmatz.utils.DataTypes.isNotUndefined(item);
		barmatz.utils.DataTypes.isInstanceOf(item, barmatz.forms.fields.FieldModel);
		barmatz.forms.CollectionModel.prototype.addItem.call(this, item);
	}},
	addItemAt: {value: function(item, index)
	{
		barmatz.utils.DataTypes.isNotUndefined(item);
		barmatz.utils.DataTypes.isNotUndefined(index);
		barmatz.utils.DataTypes.isInstanceOf(item, barmatz.forms.fields.FieldModel);
		barmatz.utils.DataTypes.isTypeOf(index, 'number');
		barmatz.forms.CollectionModel.prototype.addItemAt.call(this, item, index);
	}},
	removeItem: {value: function(item)
	{
		barmatz.utils.DataTypes.isNotUndefined(item);
		barmatz.utils.DataTypes.isInstanceOf(item, barmatz.forms.fields.FieldModel);
		barmatz.forms.CollectionModel.prototype.removeItem.call(this, item);
	}},
	getItemIndex: {value: function(item)
	{
		barmatz.utils.DataTypes.isNotUndefined(item);
		barmatz.utils.DataTypes.isInstanceOf(item, barmatz.forms.fields.FieldModel);
		return barmatz.forms.CollectionModel.prototype.getItemIndex.call(this, item);
	}},
	setItemIndex: {value: function(item, index)
	{
		barmatz.utils.DataTypes.isNotUndefined(item);
		barmatz.utils.DataTypes.isNotUndefined(index);
		barmatz.utils.DataTypes.isInstanceOf(item, barmatz.forms.fields.FieldModel);
		barmatz.utils.DataTypes.isTypeOf(index, 'number');
		return barmatz.forms.CollectionModel.prototype.setItemIndex.call(this, item, index);
	}},
	toHTML: {value: function()
	{
		var fields = '';
		
		this.forEach(function(item, index, collection)
		{
			fields += item.toHTML();
		});
		
		return '<link rel="stylesheet" type="text/css" href="http://www.quiz.co.il/css/form.css"/>' +
			   '<div class="forms-form-wrapper">' +
				   '<form onsubmit="return false;">' + 
					   fields + 
					   '<div class="forms-form-item forms-form-submit">' +
					   		'<input type="submit" value="' + this.submitButtonLabel + '"/>' +
					   '</div>' +
				   '</form>' +
			   '</div>';
	}},
	toJSON: {value: function()
	{
		var object = {name: this.name, submitButtonLabel: this.submitButtonLabel, method: this.method, encoding: this.encoding, created: this.created ? this.created.valueOf() : NaN, fingerprint: this.fingerprint, fields: []};
		
		this.forEach(function(item, index, collection)
		{
			var field = {type: item.type};
			
			if(item instanceof barmatz.forms.fields.FieldModel)
			{
				field.name = item.name;
				field.label = item.label;
				field.mandatory = item.mandatory;
				field.enabled = item.enabled;
			}
			
			if(item instanceof barmatz.forms.fields.FileFieldModel)
				field.accept = item.accept;

			if(item instanceof barmatz.forms.fields.TextFieldModel)
				field.max = item.max;
			
			if(item instanceof barmatz.forms.fields.TextAreaFieldModel)
			{
				field.rows = item.rows;
				field.cols = item.cols;
			}
			
			if(item instanceof barmatz.forms.fields.CheckboxFieldModel)
				field.checked = item.checked;
			
			if(item instanceof barmatz.forms.fields.DropboxModel)
			{
				field.items = [];
				item.forEach(function(item, index, collection)
				{
					field.items.push({label: item.label, value: item.value});
				});
			}
			
			object.fields.push(field);
		});
		
		return JSON.stringify(object);
	}},
	reset: {value: function()
	{
		this.set('id', '');
		this.set('name', '');
		this.set('method', barmatz.forms.Methods.GET);
		this.set('encoding', barmatz.net.Encoding.FORM);
		this.set('created', null);
		this.set('fingerprint', null);
		while(this.numItems > 0)
			this.removeItemAt(this.numItems - 1);
	}},
	save: {value: function(model)
	{
		var _this = this, request, loader;

		barmatz.utils.DataTypes.isNotUndefined(model);
		barmatz.utils.DataTypes.isInstanceOf(model, barmatz.forms.users.UserModel);
		
		this.dispatchEvent(new barmatz.events.FormModelEvent(barmatz.events.FormModelEvent.SAVING));

		request = new barmatz.net.Request('http://quiz.co.il/api/form/save.php');
		request.method = barmatz.net.Methods.POST;
		request.data = {f: this.fingerprint || null, n: this.name, d: this.toJSON()};
		loader = new barmatz.net.Loader();
		loader.addEventListener(barmatz.events.LoaderEvent.DONE, onLoaderDone);
		loader.load(request);
		
		function onLoaderDone(event)
		{
			var response, data;
			
			barmatz.utils.DataTypes.isNotUndefined(event);
			barmatz.utils.DataTypes.isInstanceOf(event, barmatz.events.LoaderEvent);
			
			event.target.removeEventListener(barmatz.events.LoaderEvent.DONE, onLoaderDone);
			
			response = event.response;
			
			if(response && response.status == 200)
			{
				data = response.data ? JSON.parse(response.data) : null;
				
				if(data && data.fingerprint)
					_this.set('fingerprint', data.fingerprint);
				
				_this.dispatchEvent(new barmatz.events.FormModelEvent(barmatz.events.FormModelEvent.SAVED));
			}
			else
				_this.dispatchEvent(new barmatz.events.FormModelEvent(barmatz.events.FormModelEvent.ERROR_SAVING));
		}
	}},
	saveAs: {value: function(model, name)
	{
		barmatz.utils.DataTypes.isNotUndefined(model);
		barmatz.utils.DataTypes.isInstanceOf(model, barmatz.forms.users.UserModel);
		barmatz.utils.DataTypes.isNotUndefined(name);
		barmatz.utils.DataTypes.isTypeOf(name, 'string');
		this.set('id', null);
		this.set('name', name);
		this.save(model);
	}},
	loadByFingerprint: {value: function(fingerprint)
	{
		var _this, request, loader;
		
		barmatz.utils.DataTypes.isNotUndefined(fingerprint);	
		barmatz.utils.DataTypes.isTypeOf(fingerprint, 'string');
		
		_this = this;
		
		this.dispatchEvent(new barmatz.events.FormModelEvent(barmatz.events.FormModelEvent.LOADING_FORM));
		
		request = new barmatz.net.Request('http://quiz.co.il/api/form.php');
		request.method = barmatz.net.Methods.GET;
		request.data = {f: fingerprint};
		
		loader = new barmatz.net.Loader();
		loader.addEventListener(barmatz.events.LoaderEvent.DONE, onLoaderDone);
		loader.load(request);
		
		function parseFieldsData(data)
		{
			var field, name, dataItem, i, c;
			
			while(_this.numItems > 0)
				_this.removeItemAt(_this.numItems);
			
			for(i in data)
			{
				name = data[i].name;
				
				switch(data[i].type)
				{
					default:
						throw new Error('Unknown type');
						break;
					case barmatz.forms.fields.FieldTypes.TEXT_AREA:
						field = new barmatz.forms.fields.TextAreaFieldModel(name);
						break;
					case barmatz.forms.fields.FieldTypes.TEXT_FIELD:
						field = new barmatz.forms.fields.TextFieldModel(name);
						break;
					case barmatz.forms.fields.FieldTypes.DROPBOX:
						field = new barmatz.forms.fields.DropboxModel(name);
						break;
					case barmatz.forms.fields.FieldTypes.PASSWORD:
						field = new barmatz.forms.fields.PasswordFieldModel(name);
						break;
					case barmatz.forms.fields.FieldTypes.CHECKBOX:
						field = new barmatz.forms.fields.CheckboxFieldModel(name);
						break;
					case barmatz.forms.fields.FieldTypes.RADIO:
						field = new barmatz.forms.fields.RadioFieldModel(name);
						break;
					case barmatz.forms.fields.FieldTypes.FILE:
						field = new barmatz.forms.fields.FileFieldModel(name);
						break;
					case barmatz.forms.fields.FieldTypes.HIDDEN:
						field = new barmatz.forms.fields.HiddenFieldModel(name);
						break;
					case barmatz.forms.fields.FieldTypes.PHONE:
						field = new barmatz.forms.fields.PhoneFieldModel(name);
						break;
				}
				
				if(field instanceof barmatz.forms.fields.FieldModel)
				{
					field.label = data[i].label;
					field.mandatory = data[i].mandatory;
					field.enabled = data[i].enabled;
				}
				
				if(field instanceof barmatz.forms.fields.FileFieldModel)
					field.accept = data[i].accept;

				if(field instanceof barmatz.forms.fields.TextFieldModel)
					field.max = parseInt(data[i].max);
				
				if(field instanceof barmatz.forms.fields.CheckboxFieldModel)
					field.checked = data[i].checked;
				
				if(field instanceof barmatz.forms.fields.DropboxModel)
				{
					for(c in data[i].items)
					{
						dataItem = data[i].items[c];
						field.addItem(barmatz.forms.factories.ModelFactory.createDropboxItemModel(dataItem.label, dataItem.value));
					}
				
				}
				
				_this.addItem(field);
			}
		}
		
		function onLoaderDone(event)
		{
			var response, data, parsedData;

			barmatz.utils.DataTypes.isNotUndefined(event);
			barmatz.utils.DataTypes.isInstanceOf(event, barmatz.events.LoaderEvent);
			event.target.addEventListener(barmatz.events.LoaderEvent.DONE, onLoaderDone);
			
			response = event.response;
			
			if(response && response.status == 200)
			{
				data = response.data ? JSON.parse(response.data) : null;
				
				if(data)
				{
					_this.set('fingerprint', data.fingerprint);
					
					data = data.data;
					
					_this.name = data.name;
					_this.submitButtonLabel = data.submitButtonLabel;
					_this.created = new Date(data.created);
					_this.method = data.method;
					_this.encoding = data.encoding;
					parseFieldsData(data.fields);
					_this.dispatchEvent(new barmatz.events.FormModelEvent(barmatz.events.FormModelEvent.LOADING_FORM_COMPLETE));
				}
				else
					_this.dispatchEvent(new barmatz.events.FormModelEvent(barmatz.events.FormModelEvent.LOADING_FORM_ERROR));
			}
			else
				_this.dispatchEvent(new barmatz.events.FormModelEvent(barmatz.events.FormModelEvent.LOADING_FORM_ERROR));
		}
	}},
	delete: {value: function()
	{
		var _this, request, loader;
		
		_this = this;
		
		this.dispatchEvent(new barmatz.events.FormModelEvent(barmatz.events.FormModelEvent.DELETING));

		request = new barmatz.net.Request('http://quiz.co.il/api/form/delete.php');
		request.method = barmatz.net.Methods.POST;
		request.data = {f: this.fingerprint};
		
		loader = new barmatz.net.Loader();
		loader.addEventListener(barmatz.events.LoaderEvent.DONE, onLoaderDone);
		loader.load(request);
		
		function onLoaderDone(event)
		{
			var response;

			barmatz.utils.DataTypes.isNotUndefined(event);
			barmatz.utils.DataTypes.isInstanceOf(event, barmatz.events.LoaderEvent);
			event.target.removeEventListener(barmatz.events.LoaderEvent.DONE, onLoaderDone);
			
			response = event.response;
			
			if(response && response.status == 200)
				_this.dispatchEvent(new barmatz.events.FormModelEvent(barmatz.events.FormModelEvent.DELETED));
			else
				_this.dispatchEvent(new barmatz.events.FormModelEvent(barmatz.events.FormModelEvent.DELETION_FAIL));
		}
	}},
	submit: {value: function(data)
	{
		var _this, request, loader;
		
		barmatz.utils.DataTypes.isNotUndefined(data);
		barmatz.utils.DataTypes.isTypeOf(data, 'object');
		
		_this = this;
		
		_this.dispatchEvent(new barmatz.events.FormModelEvent(barmatz.events.FormModelEvent.SUBMITTING));

		request = new barmatz.net.Request('http://www.quiz.co.il/api/form/submit.php');
		request.method = this.method;
		request.data = {f: this.fingerprint, d: JSON.stringify(data)};
		request.headers = [new barmatz.net.RequestHeader('Content-Type', this.encoding)];
		
		loader = new barmatz.net.Loader();
		loader.addEventListener(barmatz.events.LoaderEvent.DONE, onLoaderDone);
		loader.load(request);
		
		function onLoaderDone(event)
		{
			var response;
			
			barmatz.utils.DataTypes.isNotUndefined(event);
			barmatz.utils.DataTypes.isInstanceOf(event, barmatz.events.LoaderEvent);
			event.target.removeEventListener(barmatz.events.LoaderEvent.DONE, onLoaderDone);
			
			response = event.response;
			
			if(response && response.status == 200)
				_this.dispatchEvent(new barmatz.events.FormModelEvent(barmatz.events.FormModelEvent.SUBMITTED));
			else
				_this.dispatchEvent(new barmatz.events.FormModelEvent(barmatz.events.FormModelEvent.SUBMISSION_FAILED));
			
		}
	}}
});