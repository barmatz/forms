/** barmatz.forms.FormModel **/
barmatz.forms.FormModel = function()
{
	barmatz.forms.CollectionModel.call(this);
	this.set('name', '');
	this.set('submitButtonLabel', 'Submit');
	this.set('method', barmatz.forms.Methods.GET);
	this.set('encoding', barmatz.net.Encoding.FORM);
	this.set('created', new Date('Invalid'));
	this.set('fingerprint', null);
	this.set('stylesheets', []);
	this.set('direction', barmatz.forms.Directions.LTR);
	this.set('targetEmail', '');
	this.set('layoutId', 1);
	this.set('language', 'en');
	this.set('externalAPI', '');
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
barmatz.forms.FormModel.prototype.getFieldsAsJSON = function()
{
	var json = [];
	
	this.forEach(function(item, index, collection)
	{
		var field = {type: item.getType()};
		
		if(item instanceof barmatz.forms.fields.FieldModel)
		{
			field.name = item.getName();
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
	this.set('name', '');
	this.set('method', barmatz.forms.Methods.GET);
	this.set('encoding', barmatz.net.Encoding.FORM);
	this.set('created', new Date('Invalid'));
	this.set('fingerprint', null);
	this.set('stylesheets', []);
	this.set('direction', barmatz.forms.Directions.LTR);
	this.set('targetEmail', '');
	this.set('layoutId', 1);
	this.set('language', 'en');
	this.set('externalAPI', null);
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
	var _this, request, loader, stage;
	
	barmatz.utils.DataTypes.isTypeOf(fingerprint, 'string');
	
	_this = this;
	
	this.dispatchEvent(new barmatz.events.FormEvent(barmatz.events.FormEvent.LOADING_FORM));
	
	loadData();
	
	function loadData()
	{
		stage = 1;
		request = new barmatz.net.Request(barmatz.forms.Config.BASE_URL + '/api/form.php');
		request.setMethod(barmatz.net.Methods.GET);
		request.setData({f: fingerprint});
		loader = new barmatz.net.Loader();
		addLoaderListeners();
		loader.load(request);
	}
	
	function loadLanguage()
	{
		stage = 2;
		request.setURL(barmatz.forms.Config.BASE_URL + '/lang/form_' + _this.getLanguage() + '.php');
		request.setData(null);
		addLoaderListeners();
		loader.load(request);
	}

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
		var model, fieldModel, fieldData, itemData, i, c;
		
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
		model.setExternalAPI(data.externalAPI || '');

		for(i = 0; i < data.fields.length; i++)
		{
			fieldData = data.fields[i];
			fieldModel = barmatz.forms.factories.ModelFactory.createFieldModel(fieldData.type, fieldData.name);
			
			if(fieldModel instanceof barmatz.forms.fields.FieldModel)
			{
				fieldModel.setLabel(fieldData.label || '');
				fieldModel.setMandatory(fieldData.mandatory || false);
				fieldModel.setEnabled(fieldData.enabled || true);
				fieldModel.setValidator(barmatz.forms.factories.ModelFactory.createValidatorModel(fieldData.validator));
				fieldModel.setWidth(fieldData.width || NaN);
			}
			
			if(fieldModel instanceof barmatz.forms.fields.FileFieldModel)
				fieldModel.setAccept(fieldData.accept || []);

			if(fieldModel instanceof barmatz.forms.fields.TextFieldModel)
			{
				fieldModel.setMax(fieldData.max || NaN);
				fieldModel.setDescription(fieldData.description || '');
			}
			
			if(fieldModel instanceof barmatz.forms.fields.TextAreaFieldModel)
			{
				fieldModel.setRows(fieldData.rows || 2);
				fieldModel.setCols(fieldData.cols || 20);
			}
			
			if(fieldModel instanceof barmatz.forms.fields.CheckboxFieldModel)
				fieldModel.setChecked(fieldData.checked || false);
			
			if(fieldModel instanceof barmatz.forms.fields.DropboxModel)
			{
				for(c = 0; c < fieldData.items.length; c++)
				{
					itemData = fieldData.items[c];
					fieldModel.addItem(new barmatz.forms.fields.DropboxItemModel(itemData.label || '', itemData.value || ''))
				}
			}
			
			if(fieldModel instanceof barmatz.forms.fields.HTMLContentModel)
				fieldModel.setContent(fieldData.content || '');

			model.addItem(fieldModel);
		}
		
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
		}
		catch(error)
		{
			onLoaderError(event);
			return;
		}
		
		switch(stage)
		{
			case 1:
				_this.copy(data.fingerprint, objectToFormModel(data));
				loadLanguage();
				break;
			case 2:
				barmatz.forms.Language = data;
				_this.submitButtonLabel = barmatz.forms.Language.form.submit.label; 
				_this.dispatchEvent(new barmatz.events.FormEvent(barmatz.events.FormEvent.LOADING_FORM_COMPLETE));
				break;
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
		if(!(item instanceof barmatz.forms.fields.HTMLContentModel) && !item.validate())
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

	request = new barmatz.net.Request(barmatz.forms.Config.BASE_URL + '/api/form/submit.php');
	request.setMethod(this.getMethod());
	request.setData({f: this.getFingerprint(), d: JSON.stringify(data)});
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
	this.setName(data.getName() || '');
	this.setSubmitButtonLabel(data.getSubmitButtonLabel() || 'Submit');
	this.setCreated(new Date(data.getCreated().getTime()));
	this.setMethod(data.getMethod() || barmatz.forms.Methods.GET);
	this.setEncoding(data.getEncoding() || barmatz.net.Encoding.FORM);
	this.setDirection(data.getDirection() || barmatz.forms.Directions.LTR);
	this.setTargetEmail(data.getTargetEmail() || '');
	this.setLayoutId(data.getLayoutId() || 1);
	this.setLanguage(data.getLanguage() || 'en');
	this.setFingerprint(fingerprint);
	this.setStylesheets(data.getStylesheets().slice(0) || []);
	this.setExternalAPI(data.getExternalAPI() || '');

	while(this.getNumItems() > 0)
		this.removeItemAt(this.getNumItems() - 1);
	
	data.forEach(function(item, index, collection)
	{
		addField(item);
	});
	
	function addField(model)
	{
		var field, name, dataItem, i;

		barmatz.utils.DataTypes.isInstancesOf(model, [barmatz.forms.fields.FieldModel, barmatz.forms.fields.HTMLContentModel]);
		
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