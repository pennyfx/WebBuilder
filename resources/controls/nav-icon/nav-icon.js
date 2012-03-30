var ElementControl = require('builder-lib/element-control');

module.exports = {
	
	Extends: ElementControl,
	
	Whitelist: {
		events: ['click', 'ping']
	},
	
	type: 'NavIcon',
	
	options: {
		tag: 'a',
		attributes: {
			styles: {
				display: 'inline-block',
				cursor: 'pointer'
			}
		}
	},
	
	initialize: function(unsafeOptions){
		this.parent(unsafeOptions);
	}
}