var FlexBox = require('control/flex-box');

module.exports = {
	Extends: FlexBox,
	
	Whitelist: {
		properties: ['icon'],
		attributes: []
	},
	
	type: 'Page',
	
	options: {
		flex: 1,
		orient: 'vertical',
		icon: {
			attributes: {
				styles: {
					background: 'red'
				}
			}
		}
	},
	
	initialize: function(unsafeOptions){
		this.parent(unsafeOptions);
		
		this.top = new FlexBox();
		
		this.middle = new FlexBox({
			flex: 1,
			orient: 'vertical'
		});
			this.left = new FlexBox();
			this.center = new FlexBox({
				flex: 1,
				orient: 'vertical'
			});
			this.right = new FlexBox();	
			
		this.bottom = new FlexBox();
		
		this.middle.append([this.left, this.center, this.right]);
		this.append([this.top, this.middle, this.bottom]);
	}
}