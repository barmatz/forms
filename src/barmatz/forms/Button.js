/** barmatz.forms.Button **/
window.barmatz.forms.Button = function(label)
{
	if(label === undefined)
		throw new ReferenceError('expected property label is undefined');
	else if(label && typeof label != 'string')
		throw new TypeError('label is not a String');
	
	barmatz.mvc.Model.call(this);
	
	this.set('label', label);
};

barmatz.forms.Button.prototype = new barmatz.mvc.Model();
barmatz.forms.Button.prototype.constructor = barmatz.forms.Button;

Object.defineProperties(barmatz.forms.Button.prototype,
{
	label: {get: function()
	{
		return this.get('label');
	}, set: function(value)
	{
		if(label && typeof label != 'string')
			throw new TypeError('label is not a String');
		
		this.set('label', value);
	}}
});