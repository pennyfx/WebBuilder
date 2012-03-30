var ElementControl = require('builder-lib/element-control'),
	DOM = require('shipyard/dom');

module.exports = {
	Extends: ElementControl,
	type: 'Root',
	initialize: function(element){
		this.element = DOM.Element.wrap(element);
		this.parent({}, {});
	}
}