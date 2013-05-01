/** barmatz.utils.DataTypes **/
barmatz.utils.DataTypes = {
	UNDEFINED_ERROR: 'expected property is undefined',
	INVALID_VALUE_ERROR: 'value is not valid',
	WRONG_TYPE: 'data type is wrong',
	WRONG_INSTANCE: 'instance is wrong object',
	WRONG_TYPE_INSTANCE: 'data type is wrong or instance is wrong object',
	VALUE_NULL: 'value is null',
	_recursiveVlidation: function(value, collection, method, errorMessage, allowNull)
	{
		var errors;

		if(!allowNull)
			this.isValid(value);
		else if(allowNull && value == null)
			return true;
		
		errors = 0;
		barmatz.utils.Array.forEach(collection, function(item, index, collection)
		{
			try
			{
				method.call(this, value, item, allowNull);
			}
			catch(error)
			{
				errors++;
			}
		}, this);
		
		if(errors == collection.length)
			if(!this.throwError(TypeError, errorMessage))
				return false;
		
		return true;
	},
	getSilent: function()
	{
		return this._silent || false;
	}, 
	setSilent: function(value)
	{
		this._silent = value;
	},
	applySilent: function(method)
	{
		var returnValue, args;
		
		args = barmatz.utils.Array.toArray(arguments).slice(1, arguments.length);
		
		this.setSilent(true);
		returnValue = this[method].apply(this, args);
		this.setSilent(false);
		
		return returnValue;
	},
	throwError: function(error, message)
	{
		if(this.getSilent())
			return false;
		else
		{
			throw new error(message);
			return true;
		}
	},
	isNotUndefined: function(value)
	{
		if(value === undefined)
			if(!this.throwError(ReferenceError, this.UNDEFINED_ERROR))
				return false;
		return true;
	},
	isValid: function(value)
	{
		if(value == null)
			if(!this.throwError(TypeError, this.INVALID_VALUE_ERROR))
				return false;
		return true;
	},
	isAllowNull: function(value)
	{
		if(value === null)
			if(!this.throwError(TypeError, this.VALUE_NULL))
			return false;
		return true;
	},
	isTypeOf: function(value, type, allowNull)
	{
		if(!allowNull)
			this.isValid(value);
		else if(allowNull && value == null)
			return true;
		if(typeof value != type)
			if(!this.throwError(TypeError, this.WRONG_TYPE))
				return false;
		return true;
	},
	isTypesOf: function(value, types, allowNull)
	{
		this._recursiveVlidation(value, types, this.isTypeOf, this.WRONG_INSTANCE, allowNull);
		return true;
	},
	isInstanceOf: function(instance, object, allowNull)
	{
		if(!allowNull)
			this.isValid(instance);
		else if(allowNull && instance == null)
			return true;
		if(!(instance instanceof object))
			if(!this.throwError(TypeError, this.WRONG_INSTANCE))
				return false;
		return true;
	},
	isInstancesOf: function(instances, objects, allowNull)
	{
		this._recursiveVlidation(instances, objects, this.isInstanceOf, this.WRONG_INSTANCE, allowNull);
		return true;
	},
	isTypeOrInstance: function(value, type, object, allowNull)
	{
		if(!allowNull)
			this.isValid(value);
		else if(allowNull && value == null)
			return true;
		if(typeof value != type || !(value instanceof object))
			if(!this.throwError(TypeError, this.WRONG_TYPE_INSTANCE))
				return false;
		return true;
	},
	isTypesOrInstances: function(value, types, objects, allowNull)
	{
		var isType, isInstance;
		
		if(!allowNull)
			this.isValid(value);
		else if(allowNull && value == null)
			return true;

		try
		{
			isType = this.isTypesOf(value, types, allowNull);
		}
		catch(error){}
		try
		{
			isInstance = this.isInstancesOf(value, objects, allowNull);
		}
		catch(error){}
		
		if(!isType && !isInstance)
			if(!this.throwError(TypeError, this.WRONG_TYPE_INSTANCE))
				return false;
		return true;
	}
};