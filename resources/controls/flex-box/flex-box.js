var ElementControl = require('builder-lib/element-control');

module.exports = {

	Extends: ElementControl,
	
	Whitelist: {
		attributes: [],
		properties: ['flex', 'group', 'pack', 'align', 'direction', 'orient', 'panels'],
		events: ['click']
	},
	
	type: 'FlexBox',
	
	options: {
		panels: [],
		flex: 0,
		group: 1,
		pack: 'start',
		align: 'stretch',
		direction: 'normal',
		orient: 'horizontal'
	},
	
	initialize: function(unsafeOptions){
		this.parent(unsafeOptions);
		this.element.setStyles({
			display: 'box',
			display: '-moz-box',
			boxFlex: this.options.flex,
			MozBoxFlex: this.options.flex,
			boxOrdinalGroup: this.options.group,
			MozBoxOrdinalGroup: this.options.group,
			boxPack: this.options.pack,
			MozBoxPack: this.options.pack,
			boxAlign: this.options.align,
			MozBoxAlign: this.options.align,
			boxDirection: this.options.direction,
			MozBoxDirection: this.options.direction,
			boxOrient: this.options.orient,
			MozBoxOrient: this.options.orient
		});		
	}
	
}