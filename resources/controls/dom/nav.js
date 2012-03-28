var FlexBox = require('control/flex-box'),
	NavIcon = require('control/nav-icon');

module.exports = {
	
	Extends: FlexBox,
	
	Whitelist: {
		events: ['click', 'ping']
	},
	
	type: 'Nav',
	
	options: {
		tag: 'nav',
		flex: 0,
		pack: 'center',
		preventDefault: false,
		attributes: {
			styles: {
				
			}
		},
		events: {
			'click:relay(a)': function(event){
				if (this.options.preventDefault) event.preventDefault();
			}
		}
	},
	
	initialize: function(unsafeOptions){
		this.parent(unsafeOptions);
		this.icons = [];
	},
	
	addIcon: function(icon){
		this.icons.push(new NavIcon(icon).inject(this));
		return this;
	}
}