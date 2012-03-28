var ElementControl = require('builder/element-control');

module.exports = {
	Extends: ElementControl,
	Whitelist: {
		properties: [],
		events: ['click']
	},
	type: 'ToolbarButton',
	options: {
		tag: 'xul:toolbarbutton'
	},
	initialize: function(unsafeOptions){
		this.parent(unsafeOptions);
	}
}