var fs = require('fs'),
	path = require('path'),
	wrench = require('wrench'),
	addonContentDir = '../addon-compiled/content';
	
	
var copy = [
	{ to: 'js/shipyard', from: '../node_modules/shipyard' },
	{ to: 'js/async', from: '../node_modules/async/lib' },
	{ to: 'js/builder-lib', from: '../node_modules/builder-lib/lib/builder-lib' },
	{ to: 'controls', from: '../resources/controls' },
	{ to: 'extensions', from: '../resources/extensions' },
	{ to: 'project_types', from: '../resources/project_types' },
]

copy.forEach(function(item){

	var source = path.join(__dirname,item.from);
	var dest = path.join(__dirname, addonContentDir, item.to);
	console.log("copying:", source, "\n   =>to:",dest);
	wrench.mkdirSyncRecursive(dest);
	wrench.copyDirSyncRecursive(source, dest);

});