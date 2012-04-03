// this model/extension should be sandboxed, app.require() should be localized to this extension.


var Layout = require('control/layout'),
	PageManager = require('control/page-manager'),
	Page = require('control/page'),
	FlexBox = require('control/flex-box'),
	Toolbar = require('control/toolbar');

	//XHR = app.require('utils/'); // http://foobar.com <-- this whitelist entry should go in the package.json
	//console = app.require('utils/console');
	
module.exports = {
	name: 'Start Page',
	onLoad: function(){
		var root = app.controlTree.getControl('root'),
			layout = new Layout();
		
		var settingsPage = new Page({
			name: 'settings',
			attributes: {
				styles: {
					background: 'red'
				}
			},
			icon: {
				attributes: {
					styles: {
						background: 'url(/images/settings.png) no-repeat center center'
					}
				}
			}
		});
		
		var editorPage = new Page({
			name: 'editor',
			attributes: {
				styles: {
					background: 'blue'
				}
			},
			icon: {
				attributes: {
					styles: {
						background: 'url(/images/editor.png) no-repeat center center'
					}
				}
			}
		});
		
		var testingPage = new Page({
			name: 'testing',
			attributes: {
				styles: {
					background: 'green'
				}
			},
			icon: {
				attributes: {
					styles: {
						background: 'url(/images/testing.png) no-repeat center center'
					}
				}
			}
		});
		
		var marketPage = new Page({
			name: 'market',
			attributes: {
				styles: {
					background: 'orange'
				}
			},
			icon: {
				attributes: {
					styles: {
						background: 'url(/images/market.png) no-repeat center center'
					}
				}
			}
		});
		
		var pageNavigation = layout.navigationCenter.children[0];
		var pageManager = new PageManager(pageNavigation, layout.content, {
			pages: [settingsPage, editorPage, testingPage, marketPage]
		});
		
		root.append(layout);
		
		root.addEvent('click:relay(a)', function(){
			console.log('root', this, arguments);
		});
	},
	onUnload: function(){
		//destroy window
		console.log("unload");
	}
};