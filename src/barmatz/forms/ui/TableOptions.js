/** barmatz.forms.ui.TableOptions **/
window.barmatz.forms.ui.TableOptions = function()
{
	this._headClassName = '';
	this._headColumns = [];
	this._headColumnsClassNames = [];
	this._headRowClassName = '';
	this._bodyClassName = '';
	this._bodyRows = [];
	this._bodyRowsClassNames = [];
	this._bodyColumnsClassNames = [];
	this._className = '';
};

Object.defineProperties(barmatz.forms.ui.TableOptions.prototype, 
{
	headClassName: {get: function()
	{
		return this._headClassName;
	}, set: function(value)
	{
		barmatz.utils.DataTypes.isTypeOf(value, 'string', true);
		this._headClassName = value;
	}},
	headColumns: {get: function()
	{
		return this._headColumns;
	}, set: function(value)
	{
		barmatz.utils.DataTypes.isInstanceOf(value, Array, true);
		this._headColumns = value;
	}},
	headColumnsClassNames: {get: function()
	{
		return this._headColumnsClassNames;
	}, set: function(value)
	{
		barmatz.utils.DataTypes.isInstanceOf(value, Array, true);
		this._headColumnsClassNames = value;
	}},
	headRowClassName: {get: function()
	{
		return this._headRowClassName;
	}, set: function(value)
	{
		barmatz.utils.DataTypes.isTypeOf(value, 'string', true);
		this._headRowClassName = value;
	}},
	bodyClassName: {get: function()
	{
		return this._bodyClassName;
	}, set: function(value)
	{
		barmatz.utils.DataTypes.isTypeOf(value, 'string', true);
		this._bodyClassName = value;
	}},
	bodyColumnsClassNames: {get: function()
	{
		return this._bodyColumnsClassNames;
	}, set: function(value)
	{
		barmatz.utils.DataTypes.isInstanceOf(value, Array, true);
		this._bodyColumnsClassNames = value;
	}},
	bodyRows: {get: function()
	{
		return this._bodyRows;
	}, set: function(value)
	{
		barmatz.utils.DataTypes.isInstanceOf(value, Array, true);
		this._bodyRows = value;
	}},
	bodyRowsClassNames: {get: function()
	{
		return this._bodyRowsClassNames;
	}, set: function(value)
	{
		barmatz.utils.DataTypes.isInstanceOf(value, Array, true);
		this._bodyRowsClassNames = value;
	}},
	className: {get: function()
	{
		return this._className;
	}, set: function(value)
	{
		barmatz.utils.DataTypes.isTypeOf(value, 'string', true);
		this._className = value;
	}}
});