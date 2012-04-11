
exports.main = function(options, callbacks) {
	var { Cc, Ci, Cu } = require('chrome'),
		Window = require('window-utils'),
		Widget = require('widget'),
		Self = require('self'),
		Prefs = require('preferences-service'),
		Unload = require('unload'),
		Toolbarbutton = require('toolbarbutton').toolbarbutton;
		permissionManager = Cc["@mozilla.org/permissionmanager;1"].getService(Ci.nsIPermissionManager),
		ioService = Cc["@mozilla.org/network/io-service;1"].getService(Ci.nsIIOService),
		builders = [],
		menuItems = [],
		builderCount = 0,
		openBuilder = function(){
			for (window in Window.windowIterator()){
				window.open('chrome://builder/content/index.xul', 'web-builder-chrome-window-' + builderCount++, 'width=600,height=600,resizable=yes,titlebar=yes,menubar=yes,scrollbars=no,chrome=yes');
				break;
			}
		},
		locationPref = 'devtools.builder.location',
		locationUrl = Prefs.get(locationPref) || 'http://builder.mozilla.org:1337/';
	
	// permissionManager.add(ioService.newURI('http://builder.mozilla.org', null, null), 'allowXULXBL', 1);
	
	if (!Prefs.get(locationPref)) Prefs.set(locationPref, locationUrl);
	
	Toolbarbutton.add('web_builder_toolbarbutton', {
		title: 'Web Builder',
		image: Self.data.url('web-builder-icon-18.png'),
		events: {
			click: openBuilder
		}
	});
	
	new Window.WindowTracker({
		onTrack: function(window) {
			var document = window.document,
				menuItem = document.querySelector('#appmenu_errorConsole');
			
			if (menuItem) {
				var item = document.createElement('menuitem');
					item.id = 'appmenu_webBuilder';
					item.label = 'Web Builder';
					item.addEventListener('click', openBuilder, false);
				
				var label = document.createElement('xul:label');
					label.className = 'menu-text';
					label.textContent = label.value = 'Web Builder';
					label.style.marginLeft = '2px';
					label.style.paddingStartValue = '1.45em';
					label.style.MozAppearance = 'menuitemtext';
			
				item.appendChild(label);
				menuItems.push(item);
				menuItem.parentElement.insertBefore(item, menuItem);
			}
		}
	});
	
	Unload.when(function(event){
		if (event == 'uninstall' || event == 'upgrade' || event == 'disable') {
			// permissionManager.remove(ioService.newURI('http://builder.mozilla.org', null, null), 'allowXULXBL');
			menuItems.forEach(function(item){
				item.parentNode.removeChild(item);
			});
			Toolbarbutton.remove('web_builder_toolbarbutton');
		}
	});
}
