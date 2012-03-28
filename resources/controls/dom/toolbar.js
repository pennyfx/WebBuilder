var FlexBox = require('control/flex-box');

module.exports = {
	Extends: FlexBox,
	Whitelist: {
		properties: [],
		events: ['click']
	},
	type: 'Toolbar',
	options: {
		flex: 1,
		tag: 'xul:toolbar'
	},
	initialize: function(unsafeOptions){
		this.parent(unsafeOptions);
	}
}