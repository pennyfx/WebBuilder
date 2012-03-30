require.paths.unshift("http://builder.mozilla.org:1337/js/builder-lib");

require('builder-lib/types/Natives').install();

var k = Array.combine([],[],[]);

Class = require('shipyard/class/Class');

var App = require('builder-lib/application'),
	Root = new Class(require('./controls/root_dom/index.js'));

var bodyElement = new Root(document.body);

console.debug(bodyElement);

var app = new App({

	resources: {
		extensions: [
			{ path:'http://builder.mozilla.org:1337/extensions' , sync: 'xhr' },
			//{ path:'./extensions' , sync: 'file' }
		],
		collections: [
			{ path:'http://builder.mozilla.org:1337/project_types' , sync: 'xhr' },
			//{ path:'./project_types' , sync: 'file' }
		],		
		controls: [
			{ path:'http://builder.mozilla.org:1337/controls' , sync: 'xhr' },
			//{ path:'./controls' , sync: 'file' }
		]
	},

	bootstrapExtension : 'splash_page',
	root: bodyElement,
	onLoad: function(){
		this.addon = window.addon;
		this.addonInstalled = !!this.addon;
	}
});


//app.loadProjectType('default');

//module.exports = app;