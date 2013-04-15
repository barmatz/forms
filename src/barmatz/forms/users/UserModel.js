/** barmatz.forms.users.UserModel **/
window.barmatz.forms.users.UserModel = function()
{
	barmatz.forms.CollectionModel.call(this);
};

barmatz.forms.users.UserModel.prototype = new barmatz.forms.CollectionModel();
barmatz.forms.users.UserModel.prototype.constructor = barmatz.forms.users.UserModel;

Object.defineProperties(barmatz.forms.users.UserModel.prototype,
{
	id: {get: function()
	{
		return this.get('id');
	}},
	userName: {get: function()
	{
		return this.get('userName');
	}},
	firstName: {get: function()
	{
		return this.get('firstName');
	}},
	lastName: {get: function()
	{
		return this.get('lastName');
	}},
	created: {get: function()
	{
		return this.get('created');
	}},
	active: {get: function()
	{
		return this.get('active');
	}},
	addItem: {value: function(item)
	{
		barmatz.utils.DataTypes.isNotUndefined(item);
		barmatz.utils.DataTypes.isInstanceOf(item, barmatz.forms.FormModel);
		barmatz.forms.CollectionModel.prototype.addItem.call(this, item);
	}},
	addItemAt: {value: function(item, index)
	{
		barmatz.utils.DataTypes.isNotUndefined(item);
		barmatz.utils.DataTypes.isNotUndefined(index);
		barmatz.utils.DataTypes.isInstanceOf(item, barmatz.forms.FormModel);
		barmatz.utils.DataTypes.isTypeOf(index, 'number');
		barmatz.forms.CollectionModel.prototype.addItemAt.call(this, item, index);
	}},
	removeItem: {value: function(item)
	{
		barmatz.utils.DataTypes.isNotUndefined(item);
		barmatz.utils.DataTypes.isInstanceOf(item, barmatz.forms.FormModel);
		barmatz.forms.CollectionModel.prototype.removeItem.call(this, item);
	}},
	getItemIndex: {value: function(item)
	{
		barmatz.utils.DataTypes.isNotUndefined(item);
		barmatz.utils.DataTypes.isInstanceOf(item, barmatz.forms.FormModel);
		barmatz.forms.CollectionModel.prototype.getItemIndex.call(this, item);
	}},
	setItemIndex: {value: function(item, index)
	{
		barmatz.utils.DataTypes.isNotUndefined(item);
		barmatz.utils.DataTypes.isNotUndefined(index);
		barmatz.utils.DataTypes.isInstanceOf(item, barmatz.forms.FormModel);
		barmatz.utils.DataTypes.isTypeOf(index, 'number');
		barmatz.forms.CollectionModel.prototype.setItemIndex.call(this, item, index);
	}},
	getForms: {value: function()
	{
		var _this = this;
		
		this.id == null ? loadUserData() : loadFormsData();
		
		function loadUserData()
		{
			addLoadUserDataListeners();
			_this.getData();
		}
		
		function loadFormsData()
		{
			var request, loader;
			
			request = new barmatz.net.Request(barmatz.forms.Config.BASE_URL + '/api/user/forms.php');
			request.method = barmatz.net.Methods.GET;
			request.data = {u: _this.id};
			
			loader = new barmatz.net.Loader();
			addLoadFormsDataListeners(loader);
			loader.load(request);
		}
		
		function addLoadFormsDataListeners(loader)
		{
			barmatz.utils.DataTypes.isNotUndefined(loader);
			barmatz.utils.DataTypes.isInstanceOf(loader, barmatz.net.Loader);
			loader.addEventListener(barmatz.events.LoaderEvent.SUCCESS, onLoadFormsDataSuccess);
			loader.addEventListener(barmatz.events.LoaderEvent.ERROR, onLoadFormsDataError);
		}
		
		function removeLoadFormsDataListeners(loader)
		{
			barmatz.utils.DataTypes.isNotUndefined(loader);
			barmatz.utils.DataTypes.isInstanceOf(loader, barmatz.net.Loader);
			loader.removeEventListener(barmatz.events.LoaderEvent.SUCCESS, onLoadFormsDataSuccess);
			loader.removeEventListener(barmatz.events.LoaderEvent.ERROR, onLoadFormsDataError);
		}
		
		function addLoadUserDataListeners()
		{
			_this.addEventListener(barmatz.events.UserModelEvent.DATA_LOAD_SUCCESS, onLoadUserDataSucces);
			_this.addEventListener(barmatz.events.UserModelEvent.DATA_LOAD_FAIL, onLoadUserDataFail);
		}
		
		function removeLoadUserDataListeners()
		{
			_this.removeEventListener(barmatz.events.UserModelEvent.DATA_LOAD_SUCCESS, onLoadUserDataSucces);
			_this.removeEventListener(barmatz.events.UserModelEvent.DATA_LOAD_FAIL, onLoadUserDataFail);
		}
		
		function parseFormsData(data)
		{
			var form, i;
			
			barmatz.utils.DataTypes.isNotUndefined(data);
			barmatz.utils.DataTypes.isInstanceOf(data, Array);
			
			for(i = 0; i < data.length; i++)
			{
				form = barmatz.forms.factories.ModelFactory.createFormModel();
				form.created = barmatz.utils.Date.toDate(data[i].created);
				form.fingerprint = data[i].fingerprint;
				form.name = data[i].name;
				data[i] = form;
			}
		}
		
		function onLoadUserDataSucces(event)
		{
			removeLoadUserDataListeners();
			loadFormsData();
		}
		
		function onLoadUserDataFail(event)
		{
			removeLoadUserDataListeners();
			_this.dispatchEvent(new barmatz.events.UserModelEvent(barmatz.events.UserModelEvent.GET_FORMS_FAIL));
		}
		
		function onLoadFormsDataSuccess(event)
		{
			var data;
			
			barmatz.utils.DataTypes.isNotUndefined(event);
			barmatz.utils.DataTypes.isInstanceOf(event, barmatz.events.LoaderEvent);
			
			removeLoadFormsDataListeners(event.target);
				
			try
			{
				data = JSON.parse(event.response.data);
			}
			catch(error)
			{
				onLoadFormsDataError(event);
				return;
			}
			
			parseFormsData(data);
			_this.dispatchEvent(new barmatz.events.UserModelEvent(barmatz.events.UserModelEvent.GET_FORMS_SUCCESS, data));
		}
		
		function onLoadFormsDataError(event)
		{
			barmatz.utils.DataTypes.isNotUndefined(event);
			barmatz.utils.DataTypes.isInstanceOf(event, barmatz.events.LoaderEvent);
			removeLoadFormsDataListeners(event.target);
			_this.dispatchEvent(new barmatz.events.UserModelEvent(barmatz.events.UserModelEvent.GET_FORMS_FAIL));
		}
	}},
	getData: {value: function()
	{
		var _this = this, request, loader;
		
		request = new barmatz.net.Request(barmatz.forms.Config.BASE_URL + '/api/user/user.php');
		request.method = barmatz.net.Methods.GET;
		
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
			
			barmatz.utils.DataTypes.isNotUndefined(event);
			barmatz.utils.DataTypes.isInstanceOf(event, barmatz.events.LoaderEvent);
			
			removeLoaderListeners();
			
			try
			{
				data = JSON.parse(event.response.data);
			}
			catch(error)
			{
				onLoaderError(event);
				return;
			}
			
			_this.set('id', data.id);
			_this.set('userName', data.userName);
			_this.set('firstName', data.first_name);
			_this.set('lastName', data.last_name);
			_this.set('created', barmatz.utils.Date.toDate(data.created));
			_this.set('active', data.active == '1' ? true : false);
			_this.dispatchEvent(new barmatz.events.UserModelEvent(barmatz.events.UserModelEvent.DATA_LOAD_SUCCESS));
		}
	
		function onLoaderError(event)
		{
			removeLoaderListeners();
			_this.dispatchEvent(new barmatz.events.UserModelEvent(barmatz.events.UserModelEvent.DATA_LOAD_FAIL));
		}
	}},
	login: {value: function(userName, password)
	{
		var _this, request, loader;
		
		barmatz.utils.DataTypes.isNotUndefined(userName);
		barmatz.utils.DataTypes.isNotUndefined(password);
		barmatz.utils.DataTypes.isTypeOf(userName, 'string');
		barmatz.utils.DataTypes.isTypeOf(password, 'string');
		
		_this = this;
		
		request = new barmatz.net.Request(barmatz.forms.Config.BASE_URL + '/api/user/login.php');
		request.method = barmatz.net.Methods.POST;
		request.data = {u: userName, p: password};
		
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
			
			barmatz.utils.DataTypes.isNotUndefined(event);
			barmatz.utils.DataTypes.isInstanceOf(event, barmatz.events.LoaderEvent);

			removeLoaderListeners();
			
			try
			{
				data = JSON.parse(event.response.data);
			}
			catch(error)
			{
				onLoaderError(event);
				return;
			}
			
			_this.set('id', data.user.id);
			_this.dispatchEvent(new barmatz.events.UserModelEvent(barmatz.events.UserModelEvent.LOGIN_SUCCESS, data.target));
		}
		
		function onLoaderError(event)
		{
			removeLoaderListeners();
			_this.dispatchEvent(new barmatz.events.UserModelEvent(barmatz.events.UserModelEvent.LOGIN_FAIL));
		}
	}},
	logout: {value: function()
	{
		var _this, request, loader;
		
		_this = this;
		
		request = new barmatz.net.Request(barmatz.forms.Config.BASE_URL + '/api/user/logout.php');
		request.method = barmatz.net.Methods.POST;
		
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
			_this.dispatchEvent(new barmatz.events.FormModelEvent(barmatz.events.UserModelEvent.LOGOUT_SUCCESS));
		}
		
		function onLoaderError(event)
		{
			removeLoaderListeners();
			_this.dispatchEvent(new barmatz.events.FormModelEvent(barmatz.events.UserModelEvent.LOGOUT_FAIL));
		}
	}}
});