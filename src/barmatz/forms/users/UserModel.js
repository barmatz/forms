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
			
			request = new barmatz.net.Request('api/user/forms.php');
			request.method = barmatz.net.Methods.GET;
			request.data = {u: _this.id};
			
			loader = new barmatz.net.Loader();
			loader.addEventListener(barmatz.events.LoaderEvent.DONE, onLoadFormsDataDone);
			loader.load(request);
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
			
			for(i in data)
			{
				form = new barmatz.forms.FormModel();
				form.created = barmatz.utils.Date.toDate(data[i].created);
				form.fingerprint = data[i].fingerprint;
				form.id = parseInt(data[i].id);
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
		
		function onLoadFormsDataDone(event)
		{
			var response, data;
			
			barmatz.utils.DataTypes.isNotUndefined(event);
			barmatz.utils.DataTypes.isInstanceOf(event, barmatz.events.LoaderEvent);
			
			event.target.removeEventListener(barmatz.events.LoaderEvent.DONE, onLoadFormsDataDone);

			response = event.response;
			
			if(response && response.status == 200)
			{
				data = response.data ? JSON.parse(response.data) : null;
					
				if(data)
				{
					parseFormsData(data);
					_this.dispatchEvent(new barmatz.events.UserModelEvent(barmatz.events.UserModelEvent.GET_FORMS_SUCCESS, data));
				}
				else
					_this.dispatchEvent(new barmatz.events.UserModelEvent(barmatz.events.UserModelEvent.GET_FORMS_FAIL));
			}
			else
				_this.dispatchEvent(new barmatz.events.UserModelEvent(barmatz.events.UserModelEvent.GET_FORMS_FAIL));
		}
	}},
	getData: {value: function()
	{
		var _this = this, request, loader;
		
		request = new barmatz.net.Request('api/user/user.php');
		request.method = barmatz.net.Methods.GET;
		
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
				
				if(data)
				{
					_this.set('id', data.id);
					_this.set('userName', data.userName);
					_this.set('firstName', data.first_name);
					_this.set('lastName', data.last_name);
					_this.set('created', barmatz.utils.Date.toDate(data.created));
					_this.set('active', data.active == '1' ? true : false);
					_this.dispatchEvent(new barmatz.events.UserModelEvent(barmatz.events.UserModelEvent.DATA_LOAD_SUCCESS));
				}
				else
					_this.dispatchEvent(new barmatz.events.UserModelEvent(barmatz.events.UserModelEvent.DATA_LOAD_FAIL));
			}
			else
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
		
		request = new barmatz.net.Request('api/user/login.php');
		request.method = barmatz.net.Methods.POST;
		request.data = {u: userName, p: password};
		
		loader = new barmatz.net.Loader();
		loader.addEventListener(barmatz.events.LoaderEvent.DONE, onLoadDone);
		loader.load(request);
		
		function onLoadDone(event)
		{
			var response, data;
			
			barmatz.utils.DataTypes.isNotUndefined(event);
			barmatz.utils.DataTypes.isInstanceOf(event, barmatz.events.LoaderEvent);

			event.target.removeEventListener(barmatz.events.LoaderEvent.DONE, onLoadDone);
			
			response = event.response;
			
			if(response && response.status == 200)
			{
				try
				{
					data = response.data ? JSON.parse(response.data) : null;
					_this.set('id', data.id);
					_this.dispatchEvent(new barmatz.events.FormModelEvent(barmatz.events.UserModelEvent.LOGIN_SUCCESS));
				}
				catch(error)
				{
					_this.dispatchEvent(new barmatz.events.FormModelEvent(barmatz.events.UserModelEvent.LOGIN_FAIL));
				}
			}
			else
				_this.dispatchEvent(new barmatz.events.FormModelEvent(barmatz.events.UserModelEvent.LOGIN_FAIL));
		}
	}}
});