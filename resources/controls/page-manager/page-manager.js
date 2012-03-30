var Control = require('builder-lib/control'),
	FlexBox = require('control/flex-box'),
	SlidePanel = require('control/slide-panel');

module.exports = {
	
	Extends: Control,
	
	Whitelist: {
		properties: ['pages', 'icons'],
		events: ['click']
	},
	
	type: 'PageManager',
	
	options: {
		pages: []
	},
	
	initialize: function(nav, container, unsafeOptions){
		this.parent(unsafeOptions);
		this.nav = nav;
		this.slidePanel = new SlidePanel({
			attributes: {
				'class': 'pagemanager-slidepanel'
			}
		}).inject(container);
		this.addPages(this.options.pages);
	},
	
	addPage: function(page, options){
		var wrappedPage = new SlidePanel({
			axis: 'y',
			panels: [page]
		});
		this.slidePanel.addPanel(wrappedPage);
		this.nav.addIcon(page.options.icon);
		return this;
	},
	
	addPages: function(pages){
		Array.from(pages).each(this.addPage, this);
		return this;
	}
}
