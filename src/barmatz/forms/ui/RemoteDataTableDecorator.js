/** barmatz.forms.ui.RemoteDataTableDecorator **/
barmatz.forms.ui.RemoteDataTableDecorator = function(table)
{
	barmatz.forms.ui.AbstractDataTableDecorator.call(this, table);
};
barmatz.forms.ui.RemoteDataTableDecorator.prototype = new barmatz.forms.ui.AbstractDataTableDecorator();
barmatz.forms.ui.RemoteDataTableDecorator.prototype.constructor = barmatz.forms.ui.RemoteDataTableDecorator;
barmatz.forms.ui.RemoteDataTableDecorator.prototype.loadData = function(request, dataHandler)
{
	var _this, loader;
	
	barmatz.utils.DataTypes.isInstanceOf(request, barmatz.net.Request);
	barmatz.utils.DataTypes.isTypeOf(dataHandler, 'function', true);
	
	_this = this;
	loader = new barmatz.net.Loader();
	addLoaderListeners();
	loader.load(request);
	
	function addLoaderListeners()
	{
		loader.addEventListener(barmatz.events.LoaderEvent.COMPLETE, onLoaderComplete);
		loader.addEventListener(barmatz.events.LoaderEvent.ERROR, onLoaderError);
		loader.addEventListener(barmatz.events.LoaderEvent.LOADING, onLoaderLoading);
		loader.addEventListener(barmatz.events.LoaderEvent.OPENED, onLoaderOpened);
		loader.addEventListener(barmatz.events.LoaderEvent.SUCCESS, onLoaderSuccess);
	}
	
	function removeLoaderListeners()
	{
		loader.removeEventListener(barmatz.events.LoaderEvent.COMPLETE, onLoaderComplete);
		loader.removeEventListener(barmatz.events.LoaderEvent.ERROR, onLoaderError);
		loader.removeEventListener(barmatz.events.LoaderEvent.LOADING, onLoaderLoading);
		loader.removeEventListener(barmatz.events.LoaderEvent.OPENED, onLoaderOpened);
		loader.removeEventListener(barmatz.events.LoaderEvent.SUCCESS, onLoaderSuccess);
	}
	
	function onLoaderComplete(event)
	{
		barmatz.utils.DataTypes.isInstanceOf(event, barmatz.events.LoaderEvent);
		_this.dispatchEvent(event);
	}
	
	function onLoaderError(event)
	{
		barmatz.utils.DataTypes.isInstanceOf(event, barmatz.events.LoaderEvent);
		_this.dispatchEvent(event);
	}
	
	function onLoaderLoading(event)
	{
		barmatz.utils.DataTypes.isInstanceOf(event, barmatz.events.LoaderEvent);
		_this.dispatchEvent(event);
	}
	
	function onLoaderOpened(event)
	{
		barmatz.utils.DataTypes.isInstanceOf(event, barmatz.events.LoaderEvent);
		_this.setData(null);
		_this.dispatchEvent(event);
	}
	
	function onLoaderSuccess(event)
	{
		var data;
		
		barmatz.utils.DataTypes.isInstanceOf(event, barmatz.events.LoaderEvent);
		
		data = event.getResponse().getData();
		_this.setData(dataHandler != null ? dataHandler(data) : data);
		_this.dispatchEvent(event);
	}
};
