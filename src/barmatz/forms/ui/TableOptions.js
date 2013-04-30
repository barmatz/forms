/** barmatz.forms.ui.TableOptions **/
barmatz.forms.ui.TableOptions = function()
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

barmatz.forms.ui.TableOptions.prototype = {
	getHeadClassName: function()
	{
		return this._headClassName;
	},
	setHeadClassName: function(value)
	{
		barmatz.utils.DataTypes.isTypeOf(value, 'string', true);
		this._headClassName = value;
	},
	getHeadColumns: function()
	{
		return this._headColumns;
	},
	setHeadColumns: function(value)
	{
		barmatz.utils.DataTypes.isInstanceOf(value, window.Array, true);
		this._headColumns = value;
	},
	getHeadColumnsClassNames: function()
	{
		return this._headColumnsClassNames;
	},
	setHeadColumnsClassNames: function(value)
	{
		barmatz.utils.DataTypes.isInstanceOf(value, window.Array, true);
		this._headColumnsClassNames = value;
	},
	getHeadRowClassName: function()
	{
		return this._headRowClassName;
	},
	setHeadRowClassName: function(value)
	{
		barmatz.utils.DataTypes.isTypeOf(value, 'string', true);
		this._headRowClassName = value;
	},
	getBodyClassName: function()
	{
		return this._bodyClassName;
	},
	setBodyClassName: function(value)
	{
		barmatz.utils.DataTypes.isTypeOf(value, 'string', true);
		this._bodyClassName = value;
	},
	getBodyColumnsClassNames: function()
	{
		return this._bodyColumnsClassNames;
	},
	setBodyColumnsClassNames: function(value)
	{
		barmatz.utils.DataTypes.isInstanceOf(value, window.Array, true);
		this._bodyColumnsClassNames = value;
	},
	getBodyRows: function()
	{
		return this._bodyRows;
	},
	setBodyRows: function(value)
	{
		barmatz.utils.DataTypes.isInstanceOf(value, window.Array, true);
		this._bodyRows = value;
	},
	getBodyRowsClassNames: function()
	{
		return this._bodyRowsClassNames;
	},
	setBodyRowsClassNames: function(value)
	{
		barmatz.utils.DataTypes.isInstanceOf(value, window.Array, true);
		this._bodyRowsClassNames = value;
	},
	getClassName: function()
	{
		return this._className;
	},
	setClassName: function(value)
	{
		barmatz.utils.DataTypes.isTypeOf(value, 'string', true);
		this._className = value;
	}
};