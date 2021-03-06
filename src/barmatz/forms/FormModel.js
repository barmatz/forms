/** barmatz.forms.FormModel **/
barmatz.forms.FormModel = function()
{
	barmatz.forms.CollectionModel.call(this);
	this.set('name', barmatz.forms.FormModel.defaults.name);
	this.set('submitButtonLabel', barmatz.forms.FormModel.defaults.submitButtonLabel);
	this.set('method', barmatz.forms.FormModel.defaults.method);
	this.set('encoding', barmatz.forms.FormModel.defaults.encoding);
	this.set('created', barmatz.forms.FormModel.defaults.created);
	this.set('fingerprint', barmatz.forms.FormModel.defaults.fingerprint);
	this.set('stylesheets', barmatz.forms.FormModel.defaults.stylesheets);
	this.set('direction', barmatz.forms.FormModel.defaults.direction);
	this.set('targetEmail', barmatz.forms.FormModel.defaults.targetEmail);
	this.set('layoutId', barmatz.forms.FormModel.defaults.layoutId);
	this.set('language', barmatz.forms.FormModel.defaults.language);
	this.set('internalAPI', barmatz.forms.FormModel.defaults.internalAPI);
	this.set('externalAPI', barmatz.forms.FormModel.defaults.externalAPI);
};
barmatz.forms.FormModel.defaults = {
	name: '',
	submitButtonLabel: 'שלח',
	method: barmatz.forms.Methods.GET,
	encoding: barmatz.net.Encoding.FORM,
	created: new Date('Invalid'),
	fingerprint: null,
	stylesheets: [],
	direction: barmatz.forms.Directions.RTL,
	targetEmail: 'randomalia@gmail.com',
	layoutId: 1,
	language: 'he',
	internalAPI: barmatz.forms.Config.BASE_URL + '/api/form/submit.php',
	externalAPI: ''
};
barmatz.forms.FormModel.prototype = new barmatz.forms.CollectionModel();
barmatz.forms.FormModel.prototype.constructor = barmatz.forms.FormModel;
barmatz.forms.FormModel.prototype.getName = function()
{
	return this.get('name');
};
barmatz.forms.FormModel.prototype.setName = function(value)
{
	barmatz.utils.DataTypes.isTypeOf(value, 'string');
	this.set('name', value);
};
barmatz.forms.FormModel.prototype.getSubmitButtonLabel = function()
{
	return this.get('submitButtonLabel');
};
barmatz.forms.FormModel.prototype.setSubmitButtonLabel = function(value)
{
	barmatz.utils.DataTypes.isTypeOf(value, 'string');
	this.set('submitButtonLabel', value);
};
barmatz.forms.FormModel.prototype.getMethod = function()
{
	return this.get('method');
};
barmatz.forms.FormModel.prototype.setMethod = function(value)
{
	barmatz.utils.DataTypes.isTypeOf(value, 'string');
	this.set('method', value);
};
barmatz.forms.FormModel.prototype.getEncoding = function()
{
	return this.get('encoding');
};
barmatz.forms.FormModel.prototype.setEncoding = function(value)
{
	barmatz.utils.DataTypes.isTypeOf(value, 'string');
	this.set('encoding', value);
};
barmatz.forms.FormModel.prototype.getCreated = function()
{
	return this.get('created');
};
barmatz.forms.FormModel.prototype.setCreated = function(value)
{
	barmatz.utils.DataTypes.isInstanceOf(value, Date);
	this.set('created', value);
};
barmatz.forms.FormModel.prototype.getFingerprint = function()
{
	return this.get('fingerprint');
};
barmatz.forms.FormModel.prototype.setFingerprint = function(value)
{
	barmatz.utils.DataTypes.isTypeOf(value, 'string');

	if(!this.fingerprint)
		this.set('fingerprint', value);
};
barmatz.forms.FormModel.prototype.getStylesheets = function()
{
	return this.get('stylesheets');
};
barmatz.forms.FormModel.prototype.setStylesheets = function(value)
{
	barmatz.utils.DataTypes.isInstanceOf(value, window.Array);
	this.set('stylesheets', value);
};
barmatz.forms.FormModel.prototype.getDirection = function()
{
	return this.get('direction');
};
barmatz.forms.FormModel.prototype.setDirection = function(value)
{
	barmatz.utils.DataTypes.isTypeOf(value, 'string');
	this.set('direction', value);
};
barmatz.forms.FormModel.prototype.getTargetEmail = function()
{
	return this.get('targetEmail');
};
barmatz.forms.FormModel.prototype.setTargetEmail = function(value)
{
	barmatz.utils.DataTypes.isTypeOf(value, 'string');
	this.set('targetEmail', value);
};
barmatz.forms.FormModel.prototype.getLayoutId = function()
{
	return this.get('layoutId');
};
barmatz.forms.FormModel.prototype.setLayoutId = function(value)
{
	barmatz.utils.DataTypes.isTypeOf(value, 'number');
	this.set('layoutId', value);
};
barmatz.forms.FormModel.prototype.getLanguage = function()
{
	return this.get('language');
};
barmatz.forms.FormModel.prototype.setLanguage = function(value)
{
	barmatz.utils.DataTypes.isTypeOf(value, 'string');
	this.set('language', value);
	this.loadLanguage();
};
barmatz.forms.FormModel.prototype.getInternalAPI = function()
{
	return this.get('internalAPI');
};
barmatz.forms.FormModel.prototype.setInternalAPI = function(value)
{
	barmatz.utils.DataTypes.isTypeOf(value, 'string');
	this.set('internalAPI', value);
};
barmatz.forms.FormModel.prototype.getExternalAPI = function()
{
	return this.get('externalAPI');
};
barmatz.forms.FormModel.prototype.setExternalAPI = function(value)
{
	barmatz.utils.DataTypes.isTypeOf(value, 'string');
	this.set('externalAPI', value);
};
barmatz.forms.FormModel.prototype.addItem = function(item)
{
	barmatz.utils.DataTypes.isInstanceOf(item, barmatz.forms.fields.FormItemModel);
	barmatz.forms.CollectionModel.prototype.addItem.call(this, item);
};
barmatz.forms.FormModel.prototype.addItemAt = function(item, index)
{
	barmatz.utils.DataTypes.isInstanceOf(item, barmatz.forms.fields.FormItemModel);
	barmatz.utils.DataTypes.isTypeOf(index, 'number');
	barmatz.forms.CollectionModel.prototype.addItemAt.call(this, item, index);
};
barmatz.forms.FormModel.prototype.removeItem = function(item)
{
	barmatz.utils.DataTypes.isInstanceOf(item, barmatz.forms.fields.FormItemModel);
	barmatz.forms.CollectionModel.prototype.removeItem.call(this, item);
};
barmatz.forms.FormModel.prototype.getItemIndex = function(item)
{
	barmatz.utils.DataTypes.isInstanceOf(item, barmatz.forms.fields.FormItemModel);
	return barmatz.forms.CollectionModel.prototype.getItemIndex.call(this, item);
};
barmatz.forms.FormModel.prototype.setItemIndex = function(item, index)
{
	barmatz.utils.DataTypes.isInstanceOf(item, barmatz.forms.fields.FormItemModel);
	barmatz.utils.DataTypes.isTypeOf(index, 'number');
	return barmatz.forms.CollectionModel.prototype.setItemIndex.call(this, item, index);
};
barmatz.forms.FormModel.prototype.getData = function(data)
{
	return {f: this.getFingerprint(), d: JSON.stringify(data)};	
},
barmatz.forms.FormModel.prototype.getFieldsAsJSON = function()
{
	var json = [];
	
	this.forEach(function(item, index, collection)
	{
		var field = {type: item.getType()};
		
		if(item instanceof barmatz.forms.fields.AbstractFieldModel)
			field.name = item.getName();
		
		if(item instanceof barmatz.forms.fields.HiddenFieldModel)
			field.value = item.getValue();
			
		if(item instanceof barmatz.forms.fields.FieldModel)
		{
			field.label = item.getLabel();
			field.mandatory = item.getMandatory();
			field.enabled = item.getEnabled();
			field.validator = item.getValidator();
			field.width = item.getWidth();
		}
		
		if(item instanceof barmatz.forms.fields.FileFieldModel)
			field.accept = item.getAccept();

		if(item instanceof barmatz.forms.fields.TextFieldModel)
		{
			field.max = item.getMax();
			field.description = item.getDescription();
		}
		
		if(item instanceof barmatz.forms.fields.TextAreaFieldModel)
		{
			field.rows = item.getRows();
			field.cols = item.getCols();
		}
		
		if(item instanceof barmatz.forms.fields.CheckboxFieldModel)
			field.checked = item.getChecked();
		
		if(item instanceof barmatz.forms.fields.DropboxModel)
		{
			field.items = [];
			item.forEach(function(item, index, collection)
			{
				field.items.push({label: item.getLabel(), value: item.getValue()});
			});
		}
		
		if(item instanceof barmatz.forms.fields.HTMLContentModel)
			field.content = item.getContent();
		
		json.push(field);
	});
	
	return JSON.stringify(json);
};
barmatz.forms.FormModel.prototype.reset = function()
{
	this.set('name', barmatz.forms.FormModel.defaults.name);
	this.set('submitButtonLabel', barmatz.forms.FormModel.defaults.submitButtonLabel);
	this.set('method', barmatz.forms.FormModel.defaults.method);
	this.set('encoding', barmatz.forms.FormModel.defaults.encoding);
	this.set('created', barmatz.forms.FormModel.defaults.created);
	this.set('fingerprint', barmatz.forms.FormModel.defaults.fingerprint);
	this.set('stylesheets', barmatz.forms.FormModel.defaults.stylesheets);
	this.set('direction', barmatz.forms.FormModel.defaults.direction);
	this.set('targetEmail', barmatz.forms.FormModel.defaults.targetEmail);
	this.set('layoutId', barmatz.forms.FormModel.defaults.layoutId);
	this.set('language', barmatz.forms.FormModel.defaults.language);
	this.set('internalAPI', barmatz.forms.FormModel.defaults.internalAPI);
	this.set('externalAPI', barmatz.forms.FormModel.defaults.externalAPI);
	while(this.getNumItems() > 0)
		this.removeItemAt(this.getNumItems() - 1);
};
barmatz.forms.FormModel.prototype.save = function(model)
{
	var _this = this, request, loader;

	barmatz.utils.DataTypes.isInstanceOf(model, barmatz.forms.users.UserModel);
	
	this.dispatchEvent(new barmatz.events.FormEvent(barmatz.events.FormEvent.SAVING));

	request = new barmatz.net.Request(barmatz.forms.Config.BASE_URL + '/api/form/save.php');
	request.setMethod(barmatz.net.Methods.POST);
	request.setData({
		fin: this.getFingerprint() || null,
		nam: this.getName(),
		fie: this.getFieldsAsJSON(),
		ema: this.getTargetEmail(),
		int: this.getInternalAPI(),
		ext: this.getExternalAPI(),
		sub: this.getSubmitButtonLabel(),
		met: this.getMethod(),
		enc: this.getEncoding(),
		sty: JSON.stringify(this.getStylesheets()),
		dir: this.getDirection(),
		lay: this.getLayoutId(),
		lan: this.getLanguage()
	});
	loader = new barmatz.net.Loader();
	addLoaderListeners();
	loader.load(request);

	function addLoaderListeners()
	{
		loader.addEventListener(barmatz.events.LoaderEvent.SUCCESS, onLoaderSuccess);
		loader.addEventListener(barmatz.events.LoaderEvent.ERROR, onLoaderError);
	}
	
	function removeLoaderListeners()
	{
		loader.removeEventListener(barmatz.events.LoaderEvent.SUCCESS, onLoaderSuccess);
		loader.removeEventListener(barmatz.events.LoaderEvent.ERROR, onLoaderError);
	}
	
	function onLoaderSuccess(event)
	{
		var data;
		
		barmatz.utils.DataTypes.isInstanceOf(event, barmatz.events.LoaderEvent);
		
		removeLoaderListeners();
		
		try
		{
			data = JSON.parse(event.getResponse().getData());
		}
		catch(error)
		{
			console.error(error.stack);
			return;
		}
			
		if(data.fingerprint)
			_this.set('fingerprint', data.fingerprint);
		
		_this.dispatchEvent(new barmatz.events.FormEvent(barmatz.events.FormEvent.SAVED));
	}
	
	function onLoaderError(event)
	{
		removeLoaderListeners();
		_this.dispatchEvent(new barmatz.events.FormEvent(barmatz.events.FormEvent.ERROR_SAVING));
	}
};
barmatz.forms.FormModel.prototype.saveAs = function(model, name)
{
	barmatz.utils.DataTypes.isInstanceOf(model, barmatz.forms.users.UserModel);
	barmatz.utils.DataTypes.isNotUndefined(name);
	barmatz.utils.DataTypes.isTypeOf(name, 'string');
	this.set('name', name);
	this.save(model);
};
barmatz.forms.FormModel.prototype.loadByFingerprint = function(fingerprint)
{
	var _this, request, loader;
	
	barmatz.utils.DataTypes.isTypeOf(fingerprint, 'string');
	
	_this = this;
	request = new barmatz.net.Request(barmatz.forms.Config.BASE_URL + '/api/form.php');
	request.setMethod(barmatz.net.Methods.GET);
	request.setData({f: fingerprint});
	loader = new barmatz.net.Loader();
	addLoaderListeners();
	loader.load(request);
	this.dispatchEvent(new barmatz.events.FormEvent(barmatz.events.FormEvent.LOADING_FORM));

	function addLoaderListeners()
	{
		loader.addEventListener(barmatz.events.LoaderEvent.SUCCESS, onLoaderSuccess);
		loader.addEventListener(barmatz.events.LoaderEvent.ERROR, onLoaderError);
	}
	
	function removeLoaderListeners()
	{
		loader.removeEventListener(barmatz.events.LoaderEvent.SUCCESS, onLoaderSuccess);
		loader.removeEventListener(barmatz.events.LoaderEvent.ERROR, onLoaderError);
	}
	
	function objectToFormModel(data)
	{
		var model, fieldModel;
		
		barmatz.utils.DataTypes.isTypeOf(data, 'object');
		
		model = barmatz.forms.factories.ModelFactory.createFormModel();
		model.setCreated(barmatz.utils.Date.toDate(data.created));
		model.setDirection(data.direction);
		model.setEncoding(data.encoding);
		model.setLanguage(data.language);
		model.setLayoutId(parseFloat(data.layoutId));
		model.setMethod(data.method);
		model.setName(data.name);
		model.setStylesheets(data.stylesheets);
		model.setSubmitButtonLabel(data.submitButtonLabel);
		model.setTargetEmail(data.email);
		model.setInternalAPI(data.internalAPI || '');
		model.setExternalAPI(data.externalAPI || '');
		barmatz.utils.Array.forEach(data.fields, function(item, index, collection)
		{
			fieldModel = barmatz.forms.factories.ModelFactory.createFormFieldModel(item.type, item.name || '');
				
			if(fieldModel instanceof barmatz.forms.fields.FieldModel)
			{
				fieldModel.setLabel(item.label || '');
				fieldModel.setMandatory(item.mandatory || false);
				fieldModel.setEnabled(item.enabled || true);
				fieldModel.setValidator(barmatz.forms.factories.ModelFactory.createValidatorModel(item.validator));
				fieldModel.setWidth(item.width || NaN);
			}
			
			if(fieldModel instanceof barmatz.forms.fields.HiddenFieldModel)
				fieldModel.setValue(item.value || '');
			
			if(fieldModel instanceof barmatz.forms.fields.FileFieldModel)
				fieldModel.setAccept(item.accept || []);
			
			if(fieldModel instanceof barmatz.forms.fields.TextFieldModel)
			{
				fieldModel.setMax(item.max || NaN);
				fieldModel.setDescription(item.description || '');
			}
			
			if(fieldModel instanceof barmatz.forms.fields.TextAreaFieldModel)
			{
				fieldModel.setRows(item.rows || 2);
				fieldModel.setCols(item.cols || 20);
			}
			
			if(fieldModel instanceof barmatz.forms.fields.CheckboxFieldModel)
				fieldModel.setChecked(item.checked || false);
			
			if(fieldModel instanceof barmatz.forms.fields.DropboxModel)
				barmatz.utils.Array.forEach(item.items, function(item, index, collection)
				{
					fieldModel.addItem(new barmatz.forms.fields.DropboxItemModel(item.label || '', item.value || ''))
				});
			
			if(fieldModel instanceof barmatz.forms.fields.HTMLContentModel)
				fieldModel.setContent(item.content || '');
			
			model.addItem(fieldModel);
		});
		
		return model;
	}
	
	function onLoaderSuccess(event)
	{
		var data;

		barmatz.utils.DataTypes.isInstanceOf(event, barmatz.events.LoaderEvent);

		removeLoaderListeners();
		
		try
		{
			data = JSON.parse(event.getResponse().getData());
			_this.copy(data.fingerprint, objectToFormModel(data));
			_this.dispatchEvent(new barmatz.events.FormEvent(barmatz.events.FormEvent.LOADING_FORM_COMPLETE));
		}
		catch(error)
		{
			console.error(error.stack);
			onLoaderError(event);
			return;
		}
	}
	
	function onLoaderError(event)
	{
		removeLoaderListeners();
		_this.dispatchEvent(new barmatz.events.FormEvent(barmatz.events.FormEvent.LOADING_FORM_ERROR));
	}
};
barmatz.forms.FormModel.prototype.deleteForm = function()
{
	var _this, request, loader;
	
	_this = this;
	
	this.dispatchEvent(new barmatz.events.FormEvent(barmatz.events.FormEvent.DELETING));

	request = new barmatz.net.Request(barmatz.forms.Config.BASE_URL + '/api/form/delete.php');
	request.setMethod(barmatz.net.Methods.POST);
	request.setData({f: this.getFingerprint()});
	
	loader = new barmatz.net.Loader();
	addLoaderListeners();
	loader.load(request);

	function addLoaderListeners()
	{
		loader.addEventListener(barmatz.events.LoaderEvent.SUCCESS, onLoaderSuccess);
		loader.addEventListener(barmatz.events.LoaderEvent.ERROR, onLoaderError);
	}
	
	function removeLoaderListeners()
	{
		loader.removeEventListener(barmatz.events.LoaderEvent.SUCCESS, onLoaderSuccess);
		loader.removeEventListener(barmatz.events.LoaderEvent.ERROR, onLoaderError);
	}
	
	function onLoaderSuccess(event)
	{
		barmatz.utils.DataTypes.isNotUndefined(event);
		barmatz.utils.DataTypes.isInstanceOf(event, barmatz.events.LoaderEvent);
		
		removeLoaderListeners();
		_this.dispatchEvent(new barmatz.events.FormEvent(barmatz.events.FormEvent.DELETED));
	}
	
	function onLoaderError(event)
	{
		removeLoaderListeners();
		_this.dispatchEvent(new barmatz.events.FormEvent(barmatz.events.FormEvent.DELETION_FAIL));
	}
};
barmatz.forms.FormModel.prototype.isValid = function()
{
	var invalidFields = 0;
	
	this.forEach(function(item, index, collection)
	{
		if(item instanceof barmatz.forms.fields.FieldModel && !item.validate())
			invalidFields++;
	});
	
	return invalidFields == 0;
};
barmatz.forms.FormModel.prototype.submit = function()
{
	var _this, request, loader, data;
	
	_this = this;
	data = {};
	
	this.dispatchEvent(new barmatz.events.FormEvent(barmatz.events.FormEvent.SUBMITTING));
	this.forEach(function(item, index, collection)
	{
		if(!(item instanceof barmatz.forms.fields.HTMLContentModel))
			data[item.getName()] = item.getValue();
	});

	request = new barmatz.net.Request(this.getInternalAPI());
	request.setMethod(this.getMethod());
	request.setData(this.getData(data));
	request.getHeaders().push(new barmatz.net.RequestHeader('Content-Type', this.getEncoding()));
	
	loader = new barmatz.net.Loader();
	addLoaderListeners();
	loader.load(request);

	function addLoaderListeners()
	{
		loader.addEventListener(barmatz.events.LoaderEvent.SUCCESS, onLoaderSuccess);
		loader.addEventListener(barmatz.events.LoaderEvent.ERROR, onLoaderError);
	}
	
	function removeLoaderListeners()
	{
		loader.removeEventListener(barmatz.events.LoaderEvent.SUCCESS, onLoaderSuccess);
		loader.removeEventListener(barmatz.events.LoaderEvent.ERROR, onLoaderError);
	}
	
	function onLoaderSuccess(event)
	{
		barmatz.utils.DataTypes.isInstanceOf(event, barmatz.events.LoaderEvent);
		removeLoaderListeners();
		_this.dispatchEvent(new barmatz.events.FormEvent(barmatz.events.FormEvent.SUBMITTED));
	}
	
	function onLoaderError(event)
	{
		removeLoaderListeners();
		_this.dispatchEvent(new barmatz.events.FormEvent(barmatz.events.FormEvent.SUBMISSION_FAILED));
	}
};
barmatz.forms.FormModel.prototype.getLeads = function()
{
	var _this, request, loader;
	
	_this = this;
	
	request = new barmatz.net.Request(barmatz.forms.Config.BASE_URL + '/api/form/leads.php');
	request.setMethod(barmatz.net.Methods.GET);
	request.setData({f: this.getFingerprint()});
	
	loader = new barmatz.net.Loader();
	addLoaderListeners();
	loader.load(request);
	
	function addLoaderListeners()
	{
		loader.addEventListener(barmatz.events.LoaderEvent.SUCCESS, onLoaderSuccess);
		loader.addEventListener(barmatz.events.LoaderEvent.ERROR, onLoaderError);
	}
	
	function removeLoaderListeners()
	{
		loader.removeEventListener(barmatz.events.LoaderEvent.SUCCESS, onLoaderSuccess);
		loader.removeEventListener(barmatz.events.LoaderEvent.ERROR, onLoaderError);
	}
	
	function onLoaderSuccess(event)
	{
		var data;
		
		barmatz.utils.DataTypes.isInstanceOf(event, barmatz.events.LoaderEvent);
		
		data = JSON.parse(event.getResponse().getData());
		
		removeLoaderListeners();
		_this.dispatchEvent(new barmatz.events.FormEvent(barmatz.events.FormEvent.GET_LEADS_SUCCESS, data));
	}
	
	function onLoaderError(event)
	{
		removeLoaderListeners();
		_this.dispatchEvent(new barmatz.events.FormEvent(barmatz.events.FormEvent.GET_LEADS_FAIL));
	}
	
};
barmatz.forms.FormModel.prototype.copy = function(fingerprint, data)
{
	var _this, field, fieldData, i;
	
	barmatz.utils.DataTypes.isTypeOf(fingerprint, 'string');
	barmatz.utils.DataTypes.isInstanceOf(data, barmatz.forms.FormModel);

	_this = this;
	
	this.setName(data.getName() || barmatz.forms.FormModel.defaults.name);
	this.setSubmitButtonLabel(data.getSubmitButtonLabel() || barmatz.forms.FormModel.defaults.submitButtonLabel);
	this.setCreated(new Date(data.getCreated().getTime()));
	this.setMethod(data.getMethod() || barmatz.forms.FormModel.defaults.method);
	this.setEncoding(data.getEncoding() || barmatz.forms.FormModel.defaults.encoding);
	this.setDirection(data.getDirection() || barmatz.forms.FormModel.defaults.direction);
	this.setTargetEmail(data.getTargetEmail() || barmatz.forms.FormModel.defaults.targetEmail);
	this.setLayoutId(data.getLayoutId() || barmatz.forms.FormModel.defaults.layoutId);
	this.setLanguage(data.getLanguage() || barmatz.forms.FormModel.defaults.language);
	this.setFingerprint(fingerprint);
	this.setStylesheets(data.getStylesheets().slice(0) || barmatz.forms.FormModel.defaults.stylesheets);
	this.setInternalAPI(data.getInternalAPI() || barmatz.forms.FormModel.defaults.internalAPI);
	this.setExternalAPI(data.getExternalAPI() || barmatz.forms.FormModel.defaults.externalAPI);

	while(this.getNumItems() > 0)
		this.removeItemAt(this.getNumItems() - 1);
	
	data.forEach(function(item, index, collection)
	{
		addField(item);
	});
	
	function addField(model)
	{
		var field, name, dataItem, i;

		barmatz.utils.DataTypes.isInstancesOf(model, [barmatz.forms.fields.AbstractFieldModel, barmatz.forms.fields.HTMLContentModel]);
		
		if(!(model instanceof barmatz.forms.fields.HTMLContentModel))
			name = model.getName();
		
		switch(model.getType())
		{
			default:
				throw new Error('Unknown type');
				break;
			case barmatz.forms.fields.FieldTypes.HTML_CONTENT:
				field = new barmatz.forms.fields.HTMLContentModel();
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
		
		if(field instanceof barmatz.forms.fields.HTMLContentModel)
			field.setContent(model.getContent() || '');

		if(field instanceof barmatz.forms.fields.HiddenFieldModel)
			field.setValue(model.getValue() || '');
			
		if(field instanceof barmatz.forms.fields.FieldModel)
		{
			field.setLabel(model.getLabel() || '');
			field.setMandatory(model.getMandatory() || false);
			field.setEnabled(model.getEnabled() || true);
			field.setValidator(barmatz.forms.factories.ModelFactory.createValidatorModel(model.getValidator() || null));
			field.setWidth(model.getWidth() || NaN);
		}
		
		if(field instanceof barmatz.forms.fields.FileFieldModel)
			field.setAccept(model.getAccept());

		if(field instanceof barmatz.forms.fields.TextFieldModel)
		{
			field.setMax(parseInt(model.getMax() || NaN));
			field.setDescription(model.getDescription() || '');
		}
		
		if(field instanceof barmatz.forms.fields.CheckboxFieldModel)
			field.setChecked(model.getChecked());
		
		if(field instanceof barmatz.forms.fields.DropboxModel)
			model.forEach(function(item, index, collection)
			{
				field.addItem(barmatz.forms.factories.ModelFactory.createDropboxItemModel(item.getLabel(), item.getValue()));
			});
		
		_this.addItem(field);
	}
};
barmatz.forms.FormModel.prototype.loadLanguage = function()
{
	var _this, loader;
	
	_this = this;
	
	loader = new barmatz.net.Loader();
	loader.addEventListener(barmatz.events.LoaderEvent.SUCCESS, onLoadLanguageSuccess);
	loader.addEventListener(barmatz.events.LoaderEvent.ERROR, onLoadLanguageError);
	loader.load(new barmatz.net.Request(barmatz.forms.Config.BASE_URL + '/lang/form_' + _this.getLanguage() + '.php'));

	function removeLoadLanguageListeners(loader)
	{
		barmatz.utils.DataTypes.isInstanceOf(loader, barmatz.net.Loader);
		loader.removeEventListener(barmatz.events.LoaderEvent.SUCCESS, onLoadLanguageSuccess);
		loader.removeEventListener(barmatz.events.LoaderEvent.ERROR, onLoadLanguageError);
	}
	
	function onLoadLanguageSuccess(event)
	{
		var data;
	
		barmatz.utils.DataTypes.isInstanceOf(event, barmatz.events.LoaderEvent);
	
		removeLoadLanguageListeners(event.getTarget());
		
		try
		{
			data = JSON.parse(event.getResponse().getData());
			barmatz.forms.Language = data;
			_this.submitButtonLabel = barmatz.forms.Language.form.submit.label; 
		}
		catch(error)
		{
			console.error(error.stack);
			return;
		}
	}
	
	function onLoadLanguageError(event)
	{
		removeLoadLanguageListeners(event.getTarget());
	}
};