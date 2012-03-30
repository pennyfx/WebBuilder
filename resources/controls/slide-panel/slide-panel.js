var FlexBox = require('control/flex-box');

module.exports = {
	Extends: FlexBox,
	
	Whitelist: {
		properties: ['axis', 'panels'],
		events: ['click']
	},
	
	type: 'SlidePanel',
	
	options: {
		axis: 'x',
		panels: [],
		flex: 1,
		orient: 'vertical',
		attributes: {
			styles: {
				position: 'relative',
				overflow: 'hidden'
			}
		}
	},
	
	initialize: function(unsafeOptions){
		this.parent(unsafeOptions);
		this.panels = new FlexBox({
			flex: 0,
			attributes: {
				styles: {
					position: 'absolute',
					top: 0,
					left: 0,
					right: 0,
					bottom: 0,
					height: '100%',
					width: '100%'
				}
			}
		});
		this.append(this.panels);
		this.addPanels(this.options.panels);
	},
	
	addPanel: function(control, options){
		var panel = new FlexBox({
			attributes: {
				'class': 'sidepanel-wrap',
				styles: {
					height: '100%',
					width: '100%'
				}
			}
		});
		panel.append(control);
		this.panels.append(panel);
		this.resize();
		
		return this;
	},
	
	addPanels: function(controls){
		Array.from(controls).each(this.addPanel, this);
		return this;
	},
	
	resize: function(){
		var style = (this.options.axis == 'x') ? 'width' : 'height',
			length = this.panels.children.length,
			fraction = (100 / length) + '%';
		this.panels.element.setStyle(style, (length * 100 || 100) + '%');
		this.panels.children.each(function(control){
			control.element.setStyle(style, fraction);
		});
	},
	
	next: function(){
		
	},
	
	previous: function(){
	
	}
}