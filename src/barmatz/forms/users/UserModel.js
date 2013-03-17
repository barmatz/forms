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
	name: {get: function()
	{
		return this.get('name');
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
	getForms: {value: function(callback)
	{
		var _this;
		
		barmatz.utils.DataTypes.isNotUndefined(callback);
		barmatz.utils.DataTypes.isTypeOf(callback, 'function');
		
		_this = this;
		
		loadForms();
		
		function loadForms()
		{
			var request, loader;
			
			request = new barmatz.net.Request('api/user/forms.php');
			request.method = barmatz.net.Methods.GET;
			
			loader = new barmatz.net.Loader();
			loader.addEventListener(barmatz.events.LoaderEvent.DONE, onLoaderDone);
			loader.load(request);
		}
		
		function onLoaderDone(event)
		{
			var response;
			
			barmatz.utils.DataTypes.isNotUndefined(event);
			barmatz.utils.DataTypes.isInstanceOf(event, barmatz.events.LoaderEvent);
			
			event.target.removeEventListener(barmatz.events.LoaderEvent.DONE, onLoaderDone);

			response = event.response;
			
			if(response && response.status == 200)
			{
				data = response.data ? JSON.parse(response.data) : null;
				
				if(data && data.forms)
				{
					debugger;
					callback(data.forms);
				}
			}
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
				data = response.data ? JSON.parse(response.data) : null;
				_this.dispatchEvent(new barmatz.events.FormModelEvent(barmatz.events.UserModelEvent.LOGIN_SUCCESS));
			}
			else
				_this.dispatchEvent(new barmatz.events.FormModelEvent(barmatz.events.UserModelEvent.LOGIN_FAIL));
		}
	}}
});