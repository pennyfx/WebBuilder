var path = require('path'),
	url = require('url'),
	fs = require('fs');
	app_root = path.resolve(__dirname, '../');


module.exports = function(app){

	app.get('/', function(req, res){
	    fs.readFile(path.join(app_root, './public/index.xul'), 'utf8', function(err, text){
			res.header('Content-Type', 'application/xhtml+xml');
	        res.send(text);
	    });
	});

	app.get('/controls*|/project_types*|/extensions*', function(req,res){
		var rezUrl = url.parse(req.url);	
		if( rezUrl.pathname.split('/').length == 2 ){
			console.log("listing directories", req.url);
			serveDirectories(req, res, './resources/' + rezUrl.pathname.split('/')[1] );	
		}else{
			var file = path.join(app_root, "resources", rezUrl.pathname);
			serveFile(res, file);
		}
	});

	app.get('/js/shipyard*', function(req,res){
		serveJsLibrary(req,res,'./node_modules/shipyard/', '/js/shipyard');	
	});

	app.get('/js/builder-lib*', function(req,res){
		serveJsLibrary(req,res,'./node_modules/builder-lib/lib/builder-lib', '/js/builder-lib');
	});

	app.use(require('express').static(path.join(app_root,'public')));

}

var serveJsLibrary = function(req, res, localPath, swapPath){
	
	var extPath = path.join(app_root, localPath);
	var file = path.join(extPath, url.parse(req.url).pathname.replace(swapPath,''));
	fs.readFile(file, "utf-8", function(err, data){
		if(err){			
			res.send(404);
		}else{
			console.log("Found", req.url);
			res.contentType('text/javascript');
			res.send(data);
		}
	});
}

var serveDirectories = function( req, res, directory ) {
	var extPath = path.join(app_root, directory);
	var response = {};
	console.log("serving -->", directory);
	fs.readdir(extPath, function(err, dirs){
		var tasks = [];
		
		(dirs || []).forEach(function(item){
			
			var pj = path.join(extPath, item, 'package.json');
			console.log("processing directory:",pj);
			if( path.existsSync(pj) ){
				var data = fs.readFileSync(pj,"utf-8");
				console.log("processing package.json");
				
				try{
					var d = JSON.parse(data);					
					response[item] = d;
				}catch(e){
					console.log("error reading package.json", data);
				}
			}else{
				response[item] = { name: item, main: item + ".js" };
			}
		});
		
		res.header('Content-Type','application/json');		
		res.send(response);
		
	});
}

var serveFile = function(res, file){
	fs.readFile(file, "utf-8", function(err, data){
		if(err){
			console.log("can't find", file);
			res.send(404);
		}else{
			console.log("Found", file);
			if(file.indexOf('.json')){
				res.contentType('application/json');
			}else{
				res.contentType('text/javascript');
			}
			res.send(data);
		}
	});

}