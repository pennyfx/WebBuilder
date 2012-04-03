var Control = require('builder-lib/control'),
	FlexBox = require('control/flex-box'),
	SlidePanel = require('control/slide-panel');

module.exports = {
	
	Extends: Control,
	
	Whitelist: {
		properties: ['pages', 'icons', 'page', 'subpage'],
		events: ['click']
	},
	
	type: 'PageManager',
	
	options: {
		pages: [],
		page: 0,
		subpage: 0
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
		this.options.page;
	},
	
	addPage: function(page, options){
		var self = this,
			panel = new SlidePanel({
				axis: 'y',
				panels: [page]
			});
		this.slidePanel.addPanel(panel);
		this.nav.addIcon(Object.merge({}, page.options.icon, {
			events: {
				'click': function(){
					self.showPage(panel);
				}
			}
		}));
		return this;
	},
	
	addPages: function(pages){
		Array.from(pages).each(this.addPage, this);
		return this;
	},
	
	showPage: function(index, subindex){
		console.log('showPage');
	}
}
