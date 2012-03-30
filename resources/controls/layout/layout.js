var ElementControl = require('builder-lib/element-control'),
	FlexBox = require('control/flex-box'),
	Toolbar = require('control/toolbar'),
	ToolbarItem = require('control/toolbar-item'),
	Nav = require('control/nav');

module.exports = {

	Extends: FlexBox,
	
	Whitelist: {
		properties: [],
		events: ['click']
	},
	
	type: 'Layout',
	
	options: {
		orient: 'vertical',
		attributes: {
			id: 'layout',
			styles: {
				height: '100%',
				width: '100%'
			}
		}
	},
	
	initialize: function(unsafeOptions){
		this.parent(unsafeOptions);
		
		this.header = new FlexBox({
			orient: 'vertical',
			attributes: {
				id: 'header'
			}
		});
		
			this.navigation = new Toolbar({
				attributes: {
					id: 'navigation',
					'class': 'devtools-toolbar'
				}
			});
			
				this.navigationLeft = new ToolbarItem({
					flex: 1,
					attributes: {
						id: 'navigation-left'
					},
					children: [
						new Nav({
							attributes: {
								id: 'navigation-left-menu',
								styles: {
									'float': 'left'
								}
							}
						})
					]
				});
				
				this.navigationCenter = new ToolbarItem({
					attributes: {
						id: 'navigation-center'
					},
					children: [
						new Nav({
							preventDefault: true,
							attributes: {
								id: 'navigation-center-menu'
							}
						})
					]
				});
				
				this.navigationRight = new ToolbarItem({
					flex: 1,
					attributes: {
						id: 'navigation-right'
					},
					children: [
						new Nav({
							attributes: {
								id: 'navigation-right-menu'
							},
							styles: {
								'float': 'right'
							}
						})
					]
				});
			
				this.navigation.append([this.navigationLeft, this.navigationCenter, this.navigationRight]);
				this.header.append(this.navigation);
			
		this.content = new FlexBox({
			flex: 1,
			orient: 'vertical',
			attributes: {
				id: 'content'
			}
		});
		
		this.append([this.header, this.content]);
	}
}