var ElementControl = require('builder/element-control');

module.exports = {
	Extends: ElementControl,
	Whitelist: {
		properties: ['text'],
		events: ['click', 'ping']
	},
	Accessors: {
		text: {
			get: function(){				
				return this.element.node.textContent;
			},
			set: function(val){				
				this.element.node.textContent = val;				
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