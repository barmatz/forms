/** barmatz.forms.ui.UserFormsListItemController **/
window.barmatz.forms.ui.UserFormsListItemController = function(model, view, nameView, createdView, fingerprintView)
{
	var activeView;
	
	barmatz.utils.DataTypes.isNotUndefined(model);
	barmatz.utils.DataTypes.isNotUndefined(view);
	barmatz.utils.DataTypes.isNotUndefined(nameView);
	barmatz.utils.DataTypes.isNotUndefined(createdView);
	barmatz.utils.DataTypes.isNotUndefined(fingerprintView);
	barmatz.utils.DataTypes.isInstanceOf(model, barmatz.forms.FormModel);
	barmatz.utils.DataTypes.isInstanceOf(view, HTMLElement);
	barmatz.utils.DataTypes.isInstanceOf(nameView, HTMLElement);
	barmatz.utils.DataTypes.isInstanceOf(createdView, HTMLElement);
	barmatz.utils.DataTypes.isInstanceOf(fingerprintView, HTMLElement);
	barmatz.mvc.Controller.call(this);

	nameView.innerHTML = model.name;
	createdView.innerHTML = formatDateToString(model.created);
	fingerprintView.innerHTML = model.fingerprint;
	view.addEventListener('mouseover', onViewMouseOver);
	
	model.addEventListener(barmatz.events.ModelEvent.VALUE_CHANGED, onModelValueChanged);
	
	function formatDateToString(date)
	{
		barmatz.utils.DataTypes.isNotUndefined(date);
		barmatz.utils.DataTypes.isInstanceOf(date, Date);
		return barmatz.utils.Date.toString(date, 'dd/mm/yyyy hh:ii');
	}
	
	function onModelValueChanged(event)
	{
		barmatz.utils.DataTypes.isNotUndefined(event);
		barmatz.utils.DataTypes.isInstanceOf(event, barmatz.events.ModelEvent);
		
		switch(event.key)
		{
			case 'name':
				nameView.innerHTML = event.value;
				break;
			case 'created':
				createdView.innerHTML = formatDateToString(event.value);
				break;
			case 'fingerprint':
				fingerprintView.innerHTML = event.value;
				break;
		}
	}
	
	function onViewClick(event)
	{
		barmatz.utils.DataTypes.isNotUndefined(event);
		barmatz.utils.DataTypes.isInstanceOf(event, MouseEvent);
		model.loadById(model.id);
	}
	
	function onViewMouseOver(event)
	{
		barmatz.utils.DataTypes.isNotUndefined(event);
		barmatz.utils.DataTypes.isInstanceOf(event, MouseEvent);
		barmatz.utils.CSS.addClass(event.currentTarget, 'ui-state-hover');
		event.currentTarget.removeEventListener('mouseover', onViewMouseOver);
		event.currentTarget.addEventListener('click', onViewClick);
		event.currentTarget.addEventListener('mouseout', onViewMouseOut);
		event.currentTarget.addEventListener('mousedown', onViewMouseDown);
	}
	
	function onViewMouseOut(event)
	{
		barmatz.utils.DataTypes.isNotUndefined(event);
		barmatz.utils.DataTypes.isInstanceOf(event, MouseEvent);
		barmatz.utils.CSS.removeClass(event.currentTarget, 'ui-state-hover');
		event.currentTarget.addEventListener('mouseover', onViewMouseOver);
		event.currentTarget.removeEventListener('click', onViewClick);
		event.currentTarget.removeEventListener('mouseout', onViewMouseOut);
		event.currentTarget.removeEventListener('mousedown', onViewMouseDown);
	}
	
	function onViewMouseDown(event)
	{
		barmatz.utils.DataTypes.isNotUndefined(event);
		barmatz.utils.DataTypes.isInstanceOf(event, MouseEvent);
		activeView = event.currentTarget;
		barmatz.utils.CSS.addClass(activeView, 'ui-state-active');
		activeView.removeEventListener('mousedown', onViewMouseDown);
		window.addEventListener('mouseup', onViewMouseUp);
	}
	
	function onViewMouseUp(event)
	{
		barmatz.utils.DataTypes.isNotUndefined(event);
		barmatz.utils.DataTypes.isInstanceOf(event, MouseEvent);
		barmatz.utils.CSS.removeClass(activeView, 'ui-state-active');
		activeView.addEventListener('mousedown', onViewMouseDown);
		window.removeEventListener('mouseup', onViewMouseUp);
		activeView = null;
	}
};

barmatz.forms.ui.UserFormsListItemController.prototype = new barmatz.mvc.Controller();
barmatz.forms.ui.UserFormsListItemController.prototype.constructor = barmatz.forms.ui.UserFormsListItemController;