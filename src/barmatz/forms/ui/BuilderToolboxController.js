/** barmatz.forms.ui.BuilderToolboxController **/
barmatz.forms.ui.BuilderToolboxController = function(formModel, toolboxModel, toolboxView)
{
	barmatz.mvc.Controller.call(this);

	toolboxModel.addEventListener(barmatz.events.CollectionEvent.ITEM_ADDED, onToolboxModelItemAdded);
	toolboxModel.forEach(function(item, index, collection)
	{
		setToolboxItem(index);
	});
	
	function setToolboxItem(index)
	{
		toolboxView.children[index].addEventListener('click', onToolboxItemViewClick);
	}
	
	function onToolboxModelItemAdded(event)
	{
		barmatz.utils.DataType.isInstanceOf(event, barmatz.events.CollectionEvent);
		setToolboxItem(event.getIndex());
	}
	
	function onToolboxItemViewClick(event)
	{
		barmatz.utils.DataTypes.isInstanceOf(event, MouseEvent);
		formModel.addItem(toolboxModel.getItemAt(barmatz.utils.Array.toArray(toolboxView.children).indexOf(event.target)).getFieldModel().clone());
	}
};
barmatz.forms.ui.BuilderToolboxController.prototype = new barmatz.mvc.Controller();
barmatz.forms.ui.BuilderToolboxController.prototype.constructor = barmatz.forms.ui.BuilderToolboxController;