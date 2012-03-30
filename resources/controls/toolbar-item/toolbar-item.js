var FlexBox = require('control/flex-box');

module.exports = {
	Extends: FlexBox,
	Whitelist: {
		properties: ['text'],
		events: ['click', 'ping']
	},
	type: 'ToolbarItem',
	options: {
		tag: 'xul:toolbaritem'
	},
	initialize: function(unsafeOptions){
		this.parent(unsafeOptions);
	}
}