/** barmatz.forms.ui.BuilderPropertiesController **/
barmatz.forms.ui.BuilderPropertiesController = function(builderPageModel, view)
{
	var _this;
	
	barmatz.utils.DataTypes.isInstanceOf(builderPageModel, barmatz.forms.ui.pages.BuilderPageModel);
	barmatz.utils.DataTypes.isInstanceOf(view, window.HTMLElement);
	barmatz.forms.ui.PropertiesController.call(this, view);
	
	_this = this;
	_this.setModel(builderPageModel.getSelectedFormItem());
	builderPageModel.addEventListener(barmatz.events.ModelEvent.VALUE_CHANGED, onBuilderPageModelValueChanged);
	
	function onBuilderPageModelValueChanged(event)
	{
		barmatz.utils.DataTypes.isInstanceOf(event, barmatz.events.ModelEvent);

		switch(event.getKey())
		{
			case 'selectedFormItem':
				_this.setModel(event.getValue());
				break;
		}
	}
};
barmatz.forms.ui.BuilderPropertiesController.prototype = new barmatz.forms.ui.PropertiesController();
barmatz.forms.ui.BuilderPropertiesController.prototype.constructor = barmatz.forms.ui.BuilderPropertiesController;