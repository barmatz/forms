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
	this.set('direction', barmatz.forms.Directions.LTR);
	this.set('targetEmail', '');
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
	stylesheets: {get: function()
	{
		if(!this.get('stylesheets'))
			this.set('stylesheets', []);
		return this.get('stylesheets');
	}, set: function(value)
	{
		barmatz.utils.DataTypes.isInstanceOf(value, Array);
		this.set('stylesheets', value);
	}},
	direction: {get: function()
	{
		return this.get('direction');
	}, set: function(value)
	{
		barmatz.utils.DataTypes.isTypeOf(value, 'string');
		this.set('direction', value);
	}},
	targetEmail: {get: function()
	{
		return this.get('targetEmail');
	}, set: function(value)
	{
		barmatz.utils.DataTypes.isTypeOf(value, 'string');
		this.set('targetEmail', value);
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
	toJSON: {value: function()
	{
		var object = {
			name: this.name, 
			submitButtonLabel: this.submitButtonLabel, 
			method: this.method, 
			encoding: this.encoding, 
			created: this.created ? this.created.valueOf() : NaN, 
			fingerprint: this.fingerprint, 
			stylesheets: this.stylesheets, 
			direction: this.direction, 
			targetEmail: this.targetEmail, 
			fields: []
		};
		
		this.forEach(function(item, index, collection)
		{
			var field = {type: item.type};
			
			if(item instanceof barmatz.forms.fields.FieldModel)
			{
				field.name = item.name;
				field.label = item.label;
				field.mandatory = item.mandatory;
				field.enabled = item.enabled;
				field.validator = item.validator;
				field.width = item.width;
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
		
		return JSON.stringify(object, function(key, value)
		{ 
			if(this === value) 
				return undefined; 
			else 
				return value;
		});
	}},
	reset: {value: function()
	{
		this.set('id', '');
		this.set('name', '');
		this.set('method', barmatz.forms.Methods.GET);
		this.set('encoding', barmatz.net.Encoding.FORM);
		this.set('created', null);
		this.set('fingerprint', null);
		this.set('stylesheets', []);
		this.set('direction', barmatz.forms.Directions.LTR);
		this.set('targetEmail', '');
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
		request.data = {f: this.fingerprint || null, n: this.name, e: this.targetEmail, d: this.toJSON()};
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
					_this.copy(data.fingerprint, data.data);
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
	isValid: {get: function()
	{
		var validFields = 0;
		
		this.forEach(function(item, index, collection)
		{
			validFields += item.validate() ? 1 : 0;
		});
		
		return validFields == this.numItems;
	}},
	submit: {value: function()
	{
		var _this, request, loader, data;
		
		_this = this;
		data = {};
		
		this.dispatchEvent(new barmatz.events.FormModelEvent(barmatz.events.FormModelEvent.SUBMITTING));
		this.forEach(function(item, index, collection)
		{
			if(item instanceof barmatz.forms.fields.CheckboxFieldModel)
				data[item.name] = item.checked ? 'yes' : 'no';
			else
				data[item.name] = item.value;
		});

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
	}},
	copy: {value: function(fingerprint, data)
	{
		var _this, field, fieldData, i;
		
		barmatz.utils.DataTypes.isNotUndefined(fingerprint);
		barmatz.utils.DataTypes.isNotUndefined(data);
		barmatz.utils.DataTypes.isTypeOf(fingerprint, 'string');
		barmatz.utils.DataTypes.isTypeOf(data, 'object');

		_this = this;
		this.name = data.name || '';
		this.submitButtonLabel = data.submitButtonLabel || 'Submit';
		this.created = new Date(data.created);
		this.method = data.method || barmatz.forms.Methods.GET;
		this.encoding = data.encoding || barmatz.net.Encoding.FORM;
		this.direction = data.direction || barmatz.forms.Directions.LTR;
		this.targetEmail = data.targetEmail || '';
		this.set('fingerprint', fingerprint);
		this.set('stylesheets', data.stylesheets || []);
		

		while(this.numItems > 0)
			this.removeItemAt(this.numItems - 1);
		
		if(data instanceof barmatz.forms.FormModel)
			data.forEach(function(item, index, collection)
			{
				addField(item);
			});
		else
			for(i in data.fields)
				addField(data.fields[i]);
		
		function addField(fieldData)
		{
			var name, dataItem, i;

			barmatz.utils.DataTypes.isNotUndefined(fieldData);
			barmatz.utils.DataTypes.isTypeOf(fieldData, 'object');
			
			name = fieldData.name;
			
			switch(fieldData.type)
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
				field.label = fieldData.label || '';
				field.mandatory = fieldData.mandatory || false;
				field.enabled = fieldData.enabled || true;
				field.validator = barmatz.forms.factories.ModelFactory.createValidatorModel(fieldData.validator || null);
				field.width = fieldData.width || NaN;
			}
			
			if(field instanceof barmatz.forms.fields.FileFieldModel)
				field.accept = fieldData.accept;

			if(field instanceof barmatz.forms.fields.TextFieldModel)
				field.max = parseInt(fieldData.max);
			
			if(field instanceof barmatz.forms.fields.CheckboxFieldModel)
				field.checked = fieldData.checked;
			
			if(field instanceof barmatz.forms.fields.DropboxModel)
				if(fieldData instanceof barmatz.forms.fields.DropboxModel)
					fieldData.forEach(function(item, index, collection)
					{
						addItemToField(field, item);
					});
				else
					for(i in fieldData.items)
						addItemToField(field, fieldData.items[i]);
			
			_this.addItem(field);
		}
		
		function addItemToField(field, item)
		{
			barmatz.utils.DataTypes.isNotUndefined(item);
			barmatz.utils.DataTypes.isTypeOf(item, 'object');
			field.addItem(barmatz.forms.factories.ModelFactory.createDropboxItemModel(item.label, item.value));
		}
	}}
});