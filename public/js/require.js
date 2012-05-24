/*globals window, document, XMLHttpRequest, ActiveXObject*/
(function(){

function RequireError(msg) {
    this.message = msg;
}
RequireError.prototype = new Error();

var XHR = function(){
    try { return new XMLHttpRequest(); } catch(e){}
    try { return new ActiveXObject('MSXML2.XMLHTTP'); } catch(e){}
    try { return new ActiveXObject('Microsoft.XMLHTTP'); } catch(e){}
};

var nonce = + new Date();
var load = function(path){
    if (path in load._cache) {
		return load._cache[path];
	}
    var result = false;
    var xhr = XHR();
    xhr.open('GET', path + '?d=' + nonce, false);
    xhr.send(null);
    if (xhr.status >= 200 && xhr.status < 300 || xhr.status == 0) {
		result = xhr.responseText;
	}

    return (load._cache[path] = result);
};
load._cache = {};

var exec = function(fn, module) {
    var _req = function(id) {
        try {
            return require(id, module.dirname);
        } catch (ex) {
            if (ex instanceof RequireError) {
                throw new RequireError(ex.message + ', required from "'+module.filename+'"');
            } else {
                throw ex;
            }
        }
    };
    for (var k in require) {
		_req[k] = require[k];
	}
    module.exports = {};
    fn.call(window, _req, module.exports, module, module.filename, module.dirname);
};

var compile = function(module, contents) {
    module.exports = {};
    contents += '\n//@ sourceURL=' + module.filename;
    var fn = new Function('require, exports, module, __filename, __dirname', contents);
    require.paths.unshift(module.dirname);
    exec(fn, module);
    require.paths.shift();
};

var normalize = function(base, path){
    if (path[0] === '/') {
		base = '';
	}
    path = path.split('/').reverse();
    base = base.split('/');
    var last = base.pop();
    if (last && !(/\.[A-Za-z0-9_\-]+$/).test(last)) {
		base.push(last);
	}
    var i = path.length;
    while (i--){
        var current = path[i];
        switch (current){
            case '.': break;
            case '..': base.pop(); break;
            default: base.push(current);
        }
    }
    return base.join('/');
};

var dirname = function(filename) {
    var parts = filename.split('/');
    parts.pop(); //bye filename
    return parts.join('/') + '/';
};

var basename = function(filename) {
    return filename.split('/').pop();
};

var extname = function(filename) {
    var base = basename(filename);
    if (base.indexOf('.') > -1) {
        return '.' + base.split('.').pop();
	}
};


var MODULES = (window.define && window.define.modules) || {};

var tryFile = function(path) {
    if (require._load(path)) {
		return path;
	}
    return false;
};

var tryExtensions = function(path, exts) {
    var filename;
    for (var i = 0; i < exts.length; i++) {
        filename = path + exts[i];
        if (tryFile(filename)) {
            return filename;
        }
    }
    return false;
};

var define = function(id, deps, factory) {
    MODULES[id] = factory;
};
define.modules = MODULES;

var require = function shipyard_require(id, path){
    if (path) {
		require.paths.unshift(path);
	}
	
	if (Array.isArray(id)) {
		id = id[0];
	}

    var contents = false,
        filename,
        ext = extname(id),
        base = '',
        paths = (id[0] === '/') ? [''] : require.paths,
        trailingSlash = (id.slice(-1) === '/'),
        isRelative = id.charAt(0) === '.',
		isDomain = id.indexOf('://') !== -1;

	// why?
    //if (trailingSlash) {
	//	id = id.slice(0, -1);
	//}
    var module = MODULES[id];
    



    if (!module) {
        var exts = Object.keys(require.extensions);
        for (var i = 0, y = paths.length; (i < y); i++) {
            var _path = paths[i];

            // prevent trailing slashes on base path
			// because otherwise "shipyard/".split('/').pop() will
			// return an empty string.
			// UNLESS _path is specifically absolute ROOT
            if (_path !== '/' && _path.charAt(_path.length-1) === '/') {
                _path = _path.substring(0, _path.length - 1);
            }

            if (isRelative) {
                base = normalize(_path, id);
			} else if (isDomain) {
				// it's absolute, so don't mess with the path
				base = id;
            } else {
                // check path versus id
                // `/lib/shipyard` vs `shipyard/class/Class`
                var poppedPath = _path.split('/'),
                    pathEnd = poppedPath.pop(),
                    idStart = id.split('/').shift();
                
                if (pathEnd === idStart) {
                    base = normalize(poppedPath.join('/'), id);
                } else {
                    continue;
                }
            }

            module = MODULES[base];
            if(module) {
				break;
			}
            
            //1. tryFile
            //2. tryExtensions
            //3. tryExtensions with index
            if (!trailingSlash) {
                if (ext) {
                    filename = tryFile(base);
                }
                if (!filename) {
                    filename = tryExtensions(base, exts);
                }
                if (!filename && !ext) {
                    filename = tryFile(base);
                }
            }

            if (!filename) {
                filename = tryExtensions(normalize(base, 'index'), exts);
            }

            if (filename !== false) {
                module = { filename: filename, dirname: dirname(filename) };
                ext = extname(filename) || '.js';
                if (!require.extensions[ext]) {
					ext = '.js';
				}
                require.extensions[ext](module, filename);
                MODULES[base] = module;
                break;
            }
        }
    }
    if (!module && require.original) {
        var orig = require.original(id);
        if (orig) {
            return orig;
        }
    }
    if (!module) {
		throw new RequireError('Cannot find module "' + id + '"');
	}
    if (path) {
		require.paths.shift();
	}
    if (typeof module === 'function') {
        var factory = module;
        module = { filename: id, dirname: dirname(id) };
        exec(factory, module);
        MODULES[id] = module;
    }
    if (module && !module.exports) {
        module.exports = module;
    }
    return module.exports;
};

require.extensions = {
    '.js': function(module, filename) {
                require._compile(module, require._load(filename));
    },
	'.json': function(module, filename) {
		module.exports = JSON.parse(require._load(filename));
	}
};

require._load = load;
require._compile = compile;
require.paths = [window.location.pathname];

function main_require(main) {
	require.paths.unshift(main);
	require(main);
}


if (window.require) {
    require.original = window.require;
}
if (window.define) {
    define.original = window.define;
}

window.require = require;
window.define = define;

//find script with data-main
var scripts = document.getElementsByTagName('script'),
    main;
for (var i = 0, length = scripts.length; i < length; i++) {
    var script = scripts[i],
        src = script.getAttribute('src');
    if (!src) {
		continue;
	}

    if ((src.indexOf('require.js') >= 0) &&
		(main = script.getAttribute('data-main'))) {
        var maindir = dirname(main);
        if (require.paths.indexOf(maindir) !== -1) {
            require.paths.unshift(maindir);
        }
        break;
    }
}

window.addEventListener('DOMContentLoaded', function onload() {
    main_require(main);
}, false);

})();
