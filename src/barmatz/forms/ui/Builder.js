/** barmatz.forms.ui.Builder **/
window.barmatz.forms.ui.Builder = function(container)
{
	barmatz.utils.DataTypes.isNotUndefined(container);
	barmatz.utils.DataTypes.isInstanceOf(container, HTMLElement);
	barmatz.forms.factories.ControllerFactory.createBuilderController(barmatz.forms.factories.ModelFactory.createBuilderModel(), container);
};