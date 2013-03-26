/** barmatz.forms.FormModel **/
window.barmatz.forms.FormModel = function()
{
	barmatz.forms.CollectionModel.call(this);
	this.set('name', '');
	this.set('method', barmatz.forms.Methods.GET);
	this.set('encoding', barmatz.net.Encoding.FORM);
};

barmatz.forms.FormModel.prototype = new barmatz.forms.CollectionModel();
barmatz.forms.FormModel.prototype.constructor = barmatz.forms.FormModel;

Object.defineProperties(barmatz.forms.FormModel.prototype, 
{
	id: {get: function()
	{
		return this.get('id');
	}, set: function(value)
	{
		barmatz.utils.DataTypes.isTypeOf(value, 'number');
		this.set('id', value);
	}},
	name: {get: function()
	{
		return this.get('name');
	}, set: function(value)
	{
		barmatz.utils.DataTypes.isTypeOf(value, 'string');
		this.set('name', value);
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
	toJSON: {value: function()
	{
		var object = {name: this.name, method: this.method, encoding: this.encoding, created: this.created ? this.created.valueOf() : NaN, fingerprint: this.fingerprint, fields: []};
		
		this.forEach(function(item, index, collection)
		{
			var field = {type: item.type};
			
			if(item instanceof barmatz.forms.fields.FieldModel)
			{
				field.name = item.name;
				field.label = item.label;
				field.mandatory = item.mandatory;
				field.default = item.default;
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
			{
				field.checked = item.checked;
				field.defaultChecked = item.defaultChecked;
			}
			
			object.fields.push(field);
		});
		
		return JSON.stringify(object);
	}},
	reset: {value: function()
	{
		this.set('name', '');
		this.set('id', null);
		while(this.numItems > 0)
			this.removeItemAt(this.numItems - 1);
	}},
	save: {value: function(model)
	{
		var _this = this, request, loader;

		barmatz.utils.DataTypes.isNotUndefined(model);
		barmatz.utils.DataTypes.isInstanceOf(model, barmatz.forms.users.UserModel);
		
		this.dispatchEvent(new barmatz.events.FormModelEvent(barmatz.events.FormModelEvent.SAVING));

		request = new barmatz.net.Request('api/form/save.php');
		request.method = barmatz.net.Methods.POST;
		request.data = {i: this.id || null, n: this.name, d: this.toJSON()};
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
				
				if(data && data.id)
					_this.set('id', data.id);
				
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
	getFingerprint: {value: function(callback)
	{
		var _this, fingerprint;
		
		barmatz.utils.DataTypes.isNotUndefined(callback);
		barmatz.utils.DataTypes.isTypeOf(callback, 'function');
		
		_this = this;
		fingerprint = this.get('fingerprint');
		
		if(fingerprint)
			callback(fingerprint);
		else
			loadFingerprint();
		
		function loadFingerprint()
		{
			var request, loader;
			
			request = new barmatz.net.Request('api/form.php');
			request.method = barmatz.net.Methods.GET;
			request.data = {i: _this.get('id')};
			
			loader = new barmatz.net.Loader();
			loader.addEventListener(barmatz.events.LoaderEvent.DONE, onLoaderDone);
			loader.load(request);
		}
		
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
				{
					_this.set('fingerprint', data.fingerprint);
					callback(data.fingerprint);
				}
			}
		}
	}},
	loadById: {value: function(id)
	{
		var _this, request, loader;
		
		barmatz.utils.DataTypes.isNotUndefined(id);	
		barmatz.utils.DataTypes.isTypeOf(id, 'number');
		
		_this = this;
		
		this.dispatchEvent(new barmatz.events.FormModelEvent(barmatz.events.FormModelEvent.LOADING_FORM));
		
		request = new barmatz.net.Request('api/form.php');
		request.method = barmatz.net.Methods.GET;
		request.data = {i: id};
		
		loader = new barmatz.net.Loader();
		loader.addEventListener(barmatz.events.LoaderEvent.DONE, onLoaderDone);
		loader.load(request);
		
		function parseFieldsData(data)
		{
			var field, name;
			
			while(_this.numItems > 0)
				_this.removeItemAt(_this.numItems);
			
			for(i in data)
			{
				try
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
					}
					
					if(field instanceof barmatz.forms.fields.FieldModel)
					{
						field.label = data[i].label;
						field.mandatory = data[i].mandatory;
						field.default = data[i].default;
						field.enabled = data[i].enabled;
					}
					
					if(field instanceof barmatz.forms.fields.FileFieldModel)
						field.accept = data[i].accept;
	
					if(field instanceof barmatz.forms.fields.TextFieldModel)
						field.max = parseInt(data[i].max);
					
					if(field instanceof barmatz.forms.fields.CheckboxFieldModel)
					{
						field.checked = data[i].checked;
						field.defaultChecked = data[i].defaultChecked;
					}
					
					_this.addItem(field);
				}
				catch(error){}
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
					parsedData = JSON.parse(data.data);
					_this.id = parseInt(data.id);
					_this.fingerprint = data.fingerprint;
					_this.name = parsedData.name;
					_this.created = new Date(parsedData.created);
					_this.method = parsedData.method;
					_this.encoding = parsedData.encoding;
					parseFieldsData(parsedData.fields);
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

		request = new barmatz.net.Request('api/form/delete.php');
		request.method = barmatz.net.Methods.POST;
		request.data = {i: this.get('id')};
		
		loader = new barmatz.net.Loader();
		loader.addEventListener(barmatz.events.LoaderEvent.DONE, onLoaderDone);
		loader.load(request);
		
		function onLoaderDone(event)
		{
			var response;

			barmatz.utils.DataTypes.isNotUndefined(event);
			barmatz.utils.DataTypes.isInstanceOf(event, barmatz.events.LoaderEvent);
			event.target.addEventListener(barmatz.events.LoaderEvent.DONE, onLoaderDone);
			
			response = event.response;
			
			if(response && response.status == 200)
				_this.dispatchEvent(new barmatz.events.FormModelEvent(barmatz.events.FormModelEvent.DELETED));
			else
				_this.dispatchEvent(new barmatz.events.FormModelEvent(barmatz.events.FormModelEvent.DELETION_FAIL));
		}
	}}
});