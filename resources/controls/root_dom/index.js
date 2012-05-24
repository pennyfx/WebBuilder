var ElementControl = require('builder-lib/element-control');

module.exports = {
	Extends: ElementControl,
	type: 'Root',
	initialize: function(element){
		this.element = $(element);
		this.parent({}, {});
	}
}