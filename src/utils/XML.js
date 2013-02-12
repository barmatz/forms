window.barmatz.utils.XML = function(){};

Object.defineProperties(barmatz.utils.XML, 
{ 
	stringToXML: {value: function(str)
	{
		var doc, parser;
		
		if(window.ActiveXObject)
		{
			doc = new ActiveXObject('Microsoft.XMLDOM');
			doc.async='false';
			doc.loadXML(str);
		} 
		else 
			doc = new DOMParser().parseFromString(str,'text/xml');
	
		return doc;
	}},
	xmlToJSON: {value: function(xml)
	{
		var obj = {}, attribute, item, nodeName, old, i;
		
		if(xml.nodeType == 1) 
		{
			if(xml.attributes.length > 0) 
			{
				for(i = 0; i < xml.attributes.length; i++) 
				{
					attribute = xml.attributes.item(i);
					obj[attribute.nodeName] = attribute.nodeValue;
				}
			}
		} 
		else if(xml.nodeType == 3) 
			obj = xml.nodeValue;
		
		if(xml.hasChildNodes()) 
		{
			for(i = 0; i < xml.childNodes.length; i++) 
			{
				item = xml.childNodes.item(i);
				nodeName = item.nodeName;
				
				if(typeof obj[nodeName] == 'undefined') 
					obj[nodeName == '#text' ? 'content' : nodeName] = this.xmlToJSON(item);
				else 
				{
					if(typeof obj[nodeName].length == 'undefined') 
					{
						old = obj[nodeName];
						obj[nodeName] = [];
						obj[nodeName].push(old);
					}
		
					obj[nodeName].push(this.xmlToJSON(item));
				}
			}
		}
		
		return obj;
	}}
});