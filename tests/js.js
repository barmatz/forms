asyncTest('Loader', 4, function()
{
	var loader = new barmatz.net.Loader(),
		request = new barmatz.net.Request('form1.xml');
	
	loader.addEventListener(barmatz.events.LoaderEvent.OPENED, onLoaderOpened);
	loader.addEventListener(barmatz.events.LoaderEvent.HEADERS_RECEIVED, onLoaderHeadersReceived);
	loader.addEventListener(barmatz.events.LoaderEvent.LOADING, onLoaderLoading);
	loader.addEventListener(barmatz.events.LoaderEvent.DONE, onLoaderDone);
	loader.load(request);
	
	function onLoaderOpened(event)
	{
		ok(event.request, 'request opened');
	}
	
	function onLoaderHeadersReceived(event)
	{
		ok(event.response.headers.length > 0, 'headers received');
	}
	
	function onLoaderLoading(event)
	{
		ok(event.response, 'loading');
	}
	
	function onLoaderDone(event)
	{
		loader.removeEventListener(barmatz.events.LoaderEvent.OPENED, onLoaderOpened);
		loader.removeEventListener(barmatz.events.LoaderEvent.HEADERS_RECEIVED, onLoaderHeadersReceived);
		loader.removeEventListener(barmatz.events.LoaderEvent.LOADING, onLoaderLoading);
		loader.removeEventListener(barmatz.events.LoaderEvent.DONE, onLoaderDone);
		ok(event.response.data.length > 0, 'data loaded');
		start();
	}
});
asyncTest('TDD', 2, function()
{
	var loader = new barmatz.net.Loader(),
		request = new barmatz.net.Request('form1.xml'),
		xml, form;

	loader.addEventListener(barmatz.events.LoaderEvent.DONE, onLoaderDone);
	loader.load(request);
	
	function onLoaderDone(event)
	{
		xml = barmatz.utils.XML.stringToXML(event.response.data);

		form = new barmatz.forms.Form();
		form.createFromXML(xml);
		
		ok(form.id == 'form1', 'form ID is set');
		ok(form.numFields == 6, 'form fields have been added');
		start();
	}
});