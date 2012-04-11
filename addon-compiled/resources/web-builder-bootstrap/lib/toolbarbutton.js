
var Window = require('window-utils'),
	Unload = require('unload'),
	buttons = {};

var buttonFactory = {
	
	add: function(id, options){
		new Window.WindowTracker({
			onTrack: function(window) {
				var navBar = window.document.querySelector('#nav-bar');
				if (navBar) {
					var button = buttonFactory.createElement(window, id, options);
					buttons[id] = button[id] || [];
					buttons[id].push(button);
					navBar.appendChild(button);
				}
			}
		});
	},
	
	remove: function(id){
		buttons[id].forEach(function(button){
			button.parentNode.removeChild(button);
		});
	},
	
	removeAll: function(){
		for (id in buttons) buttonFactory.remove(id);
	},
	
	createElement: function(window, id, options){
		options.events = options.events || {};
		
		var document = window.document,
			button = document.createElement('toolbarbutton');
			button.id = id;
			button.title = button.label = options.label || '';
			button.image = options.image;
			button.className = 'toolbarbutton-1';
			button.style.listStyleImage = 'url("' + options.image + '")';
			for(event in options.events) button.addEventListener(event, options.events[event], false);
		
		return button;
	}
	
}

exports.toolbarbutton = buttonFactory;
