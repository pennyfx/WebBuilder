var Control = require('builder-lib/control');

module.exports = {
	Extends: Control,
	Whitelist: {
		properties: ['things'],
		events: ['click', 'ping']
	},
	type: 'Recurse',
	options: {
		things: []
	},
	initialize: function(unsafeOptions){
		this.parent(unsafeOptions);
	}
}