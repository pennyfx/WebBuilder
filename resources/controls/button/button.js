var ElementControl = require('builder-lib/element-control');

module.exports = {
	Extends: ElementControl,
	Whitelist: {
		properties: ['text'],
		events: ['click', 'ping']
	},
	Accessors: {
		text: {
			get: function(){				
				return this.element.textContent;
			},
			set: function(val){				
				this.element.textContent = val;				
				return this;
			}
		}
	},
	type: 'Button',
	options: {
		tag: 'button',
		attributes: {
			'class': 'button',
		}
	},
	initialize: function(unsafeOptions){
		this.parent(unsafeOptions);
		this.addEvent('click', function(){
			console.log('safe button click', arguments, this);
		});		
	}
}