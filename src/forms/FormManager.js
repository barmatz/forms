window.barmatz.forms.FormManager = function(){};

Object.defineProperties(barmatz.forms.FormManager,
{
	createFromXML: {value: function(xml)
	{
		var object = barmatz.utils.XML.xmlToJSON(xml);
		
		if(object.form)
			return this.createFromJSON(object.form);
		else
			throw new Error('XML format is illegal');
	}},
	createFromJSON: {value: function(object)
	{
		var formModel = new barmatz.forms.FormModel(object.id, '', 'post'),
			formView = barmatz.forms.FormFactory.createForm(),
			submitButton = barmatz.forms.FormFactory.createSubmitButton(object.submit.button),
			formController = new barmatz.forms.FormController(formModel, formView, submitButton),
			item, itemMode, itemView, itemController, wrappedItemView, i;
		
		if(object.width)
			formModel.width = object.width;
		
		if(object.item)
		{
			if(!(object.item instanceof Array))
				object.item = [object.item];
			
			for(i = 0; i < object.item.length; i++)
			{
				item = object.item[i];
				itemModel = new barmatz.forms.FormItemModel(item.type, item.validation ? barmatz.forms.FormFactory.getValidationMethodByID(parseInt(item.validation)) : null, item.validationParams ? item.validationParams.split(',') : null);
				wrappedItemView = barmatz.forms.FormFactory.createWrappedItem(item.id || 'field' + formView.childNodes.length, item.type, item.label, item.value || null, item.mandatory, item.error, item.selected === 'true' ? true : false);
				itemView = this.getFormItemFromContainer(wrappedItemView);
				itemController = new barmatz.forms.FormItemController(itemModel, itemView);
				formView.appendChild(wrappedItemView);
				formModel.addItem(itemModel);
			}
		}
		
		formView.appendChild(submitButton);
		
		return formView;
	}},
	getFormItemFromContainer: {value: function(container)
	{
		var types = ['input', 'select', 'textarea'], item, i;
		
		for(i = 0; i < types.length; i++)
		{
			item = barmatz.utils.DOM.getElements(types[i], container);
			
			if(item)
				return item;
		}
		
		return null;
	}}
});