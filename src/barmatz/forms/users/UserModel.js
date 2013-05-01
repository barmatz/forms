/** barmatz.forms.users.UserModel **/
barmatz.forms.users.UserModel = function()
{
	barmatz.forms.CollectionModel.call(this);
	this.set('id', null);
	this.set('username', null);
	this.set('lastName', null);
	this.set('created', null);
	this.set('active', false);
};
barmatz.forms.users.UserModel.prototype = new barmatz.forms.CollectionModel();
barmatz.forms.users.UserModel.prototype.constructor = barmatz.forms.users.UserModel;
barmatz.forms.users.UserModel.prototype.getId = function()
{
	return this.get('id');
};
barmatz.forms.users.UserModel.prototype.getUserName = function()
{
	return this.get('username');
};
barmatz.forms.users.UserModel.prototype.getFirstName = function()
{
	return this.get('firstName');
};
barmatz.forms.users.UserModel.prototype.getLastName = function()
{
	return this.get('lastName');
};
barmatz.forms.users.UserModel.prototype.getCreated = function()
{
	return this.get('created');
};
barmatz.forms.users.UserModel.prototype.getActive = function()
{
	return this.get('active');
};
barmatz.forms.users.UserModel.prototype.addItem = function(item)
{
	barmatz.utils.DataTypes.isInstanceOf(item, barmatz.forms.FormModel);
	barmatz.forms.CollectionModel.prototype.addItem.call(this, item);
};
barmatz.forms.users.UserModel.prototype.addItemAt = function(item, index)
{
	barmatz.utils.DataTypes.isInstanceOf(item, barmatz.forms.FormModel);
	barmatz.utils.DataTypes.isTypeOf(index, 'number');
	barmatz.forms.CollectionModel.prototype.addItemAt.call(this, item, index);
};
barmatz.forms.users.UserModel.prototype.removeItem = function(item)
{
	barmatz.utils.DataTypes.isInstanceOf(item, barmatz.forms.FormModel);
	barmatz.forms.CollectionModel.prototype.removeItem.call(this, item);
};
barmatz.forms.users.UserModel.prototype.getItemIndex = function(item)
{
	barmatz.utils.DataTypes.isInstanceOf(item, barmatz.forms.FormModel);
	return barmatz.forms.CollectionModel.prototype.getItemIndex.call(this, item);
};
barmatz.forms.users.UserModel.prototype.setItemIndex = function(item, index)
{
	barmatz.utils.DataTypes.isInstanceOf(item, barmatz.forms.FormModel);
	barmatz.utils.DataTypes.isTypeOf(index, 'number');
	barmatz.forms.CollectionModel.prototype.setItemIndex.call(this, item, index);
};
barmatz.forms.users.UserModel.prototype.getForms = function()
{
	var _this = this;
	
	this.getId() == null ? loadUserData() : loadFormsData();
	
	function loadUserData()
	{
		addLoadUserDataListeners();
		_this.getData();
	}
	
	function loadFormsData()
	{
		var request, loader;
		
		request = new barmatz.net.Request(barmatz.forms.Config.BASE_URL + '/api/user/forms.php');
		request.setMethod(barmatz.net.Methods.GET);
		request.setData({u: _this.getId()});
		
		loader = new barmatz.net.Loader();
		addLoadFormsDataListeners(loader);
		loader.load(request);
	}
	
	function addLoadFormsDataListeners(loader)
	{
		barmatz.utils.DataTypes.isInstanceOf(loader, barmatz.net.Loader);
		loader.addEventListener(barmatz.events.LoaderEvent.SUCCESS, onLoadFormsDataSuccess);
		loader.addEventListener(barmatz.events.LoaderEvent.ERROR, onLoadFormsDataError);
	}
	
	function removeLoadFormsDataListeners(loader)
	{
		barmatz.utils.DataTypes.isInstanceOf(loader, barmatz.net.Loader);
		loader.removeEventListener(barmatz.events.LoaderEvent.SUCCESS, onLoadFormsDataSuccess);
		loader.removeEventListener(barmatz.events.LoaderEvent.ERROR, onLoadFormsDataError);
	}
	
	function addLoadUserDataListeners()
	{
		_this.addEventListener(barmatz.events.UserEvent.DATA_LOAD_SUCCESS, onLoadUserDataSucces);
		_this.addEventListener(barmatz.events.UserEvent.DATA_LOAD_FAIL, onLoadUserDataFail);
	}
	
	function removeLoadUserDataListeners()
	{
		_this.removeEventListener(barmatz.events.UserEvent.DATA_LOAD_SUCCESS, onLoadUserDataSucces);
		_this.removeEventListener(barmatz.events.UserEvent.DATA_LOAD_FAIL, onLoadUserDataFail);
	}
	
	function parseFormsData(data)
	{
		barmatz.utils.DataTypes.isInstanceOf(data, window.Array);
		barmatz.utils.Array.forEach(data, function(item, index, collection)
		{
			var form = barmatz.forms.factories.ModelFactory.createFormModel();
			form.setCreated(barmatz.utils.Date.toDate(item.created));
			form.setFingerprint(item.fingerprint);
			form.setName(item.name);
			collection[index] = form;
		});
	}
	
	function onLoadUserDataSucces(event)
	{
		removeLoadUserDataListeners();
		loadFormsData();
	}
	
	function onLoadUserDataFail(event)
	{
		removeLoadUserDataListeners();
		_this.dispatchEvent(new barmatz.events.UserEvent(barmatz.events.UserEvent.GET_FORMS_FAIL));
	}
	
	function onLoadFormsDataSuccess(event)
	{
		var data;
		
		barmatz.utils.DataTypes.isInstanceOf(event, barmatz.events.LoaderEvent);
		
		removeLoadFormsDataListeners(event.getTarget());
			
		try
		{
			data = JSON.parse(event.getResponse().getData());
		}
		catch(error)
		{
			onLoadFormsDataError(event);
			return;
		}
		
		parseFormsData(data);
		_this.dispatchEvent(new barmatz.events.UserEvent(barmatz.events.UserEvent.GET_FORMS_SUCCESS, data));
	}
	
	function onLoadFormsDataError(event)
	{
		barmatz.utils.DataTypes.isInstanceOf(event, barmatz.events.LoaderEvent);
		removeLoadFormsDataListeners(event.getTarget());
		_this.dispatchEvent(new barmatz.events.UserEvent(barmatz.events.UserEvent.GET_FORMS_FAIL));
	}
};
barmatz.forms.users.UserModel.prototype.getData = function()
{
	var _this = this, request, loader;
	
	request = new barmatz.net.Request(barmatz.forms.Config.BASE_URL + '/api/user/user.php');
	request.setMethod(barmatz.net.Methods.GET);
	
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
			onLoaderError(event);
			return;
		}
		
		_this.set('username', data.username);
		_this.set('firstName', data.first_name);
		_this.set('lastName', data.last_name);
		_this.set('created', barmatz.utils.Date.toDate(data.created));
		_this.set('active', data.active == '1' ? true : false);
		_this.dispatchEvent(new barmatz.events.UserEvent(barmatz.events.UserEvent.DATA_LOAD_SUCCESS));
	}

	function onLoaderError(event)
	{
		removeLoaderListeners();
		_this.dispatchEvent(new barmatz.events.UserEvent(barmatz.events.UserEvent.DATA_LOAD_FAIL));
	}
};
barmatz.forms.users.UserModel.prototype.login = function(username, password)
{
	var _this, request, loader;
	
	barmatz.utils.DataTypes.isTypeOf(username, 'string');
	barmatz.utils.DataTypes.isTypeOf(password, 'string');
	
	_this = this;
	
	request = new barmatz.net.Request(barmatz.forms.Config.BASE_URL + '/api/user/login.php');
	request.setMethod(barmatz.net.Methods.POST);
	request.setData({u: username, p: password});
	
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
			onLoaderError(event);
			return;
		}
		
		_this.dispatchEvent(new barmatz.events.UserEvent(barmatz.events.UserEvent.LOGIN_SUCCESS, data.target));
	}
	
	function onLoaderError(event)
	{
		removeLoaderListeners();
		_this.dispatchEvent(new barmatz.events.UserEvent(barmatz.events.UserEvent.LOGIN_FAIL));
	}
};
barmatz.forms.users.UserModel.prototype.logout = function()
{
	var _this, request, loader;
	
	_this = this;
	
	request = new barmatz.net.Request(barmatz.forms.Config.BASE_URL + '/api/user/logout.php');
	request.setMethod(barmatz.net.Methods.POST);
	
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
		removeLoaderListeners();
		_this.dispatchEvent(new barmatz.events.FormEvent(barmatz.events.UserEvent.LOGOUT_SUCCESS));
	}
	
	function onLoaderError(event)
	{
		removeLoaderListeners();
		_this.dispatchEvent(new barmatz.events.FormEvent(barmatz.events.UserEvent.LOGOUT_FAIL));
	}
};