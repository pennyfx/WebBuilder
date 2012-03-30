var express = require('express'),
	fs = require('fs'),
	path = require('path'),
	url = require('url'),
	async = require('async'),
	app = express.createServer();

app.get('/', function(req, res){
    fs.readFile(path.join(__dirname, './addon/web-builder-bootstrap/content/index.xul'), 'utf8', function(err, text){
		res.header('Content-Type', 'application/xhtml+xml');
        res.send(text);
    });
});

/*app.get('/extensions', function(req,res){
	var extPath = path.join(__dirname, './resources/extensions/');
	var response = {};
	console.log("extensions",extPath);
	fs.readdir(extPath, function(err, dirs){
		var tasks = [];
		
		dirs.forEach(function(item){
			tasks.push(function(callback){
				fs.readFile(path.join(extPath, item, 'package.json'),"utf-8", function(err, data){
					var d = JSON.parse(data);
					d.main = item +"/"+ d.main;
					response[item] = d;
					callback();
				});	
			});
		});
		
		
		async.parallel(tasks, function(){
			res.header('Content-Type','application/json');
			res.send(response);
		});
	});
});

app.get('/controls/dom/*', function(req,res){
	
	var extPath = path.join(__dirname, './resources/controls/dom', req.params[0] );
	console.log(req.url);
	
	fs.readFile(extPath,"utf-8", function(err, data){		
		res.header('Content-Type','text/plain');	
		res.send(data);
	});

});
*/

app.get('/controls*', function(req,res){
	console.log("pathname is:", url.parse(req.url).pathname.split('/'));
	if( url.parse(req.url).pathname.split('/').length == 2 ){
		console.log("listing directories", req.url);
		serveDirectories(req,res,'./resources/controls/');	
	}else{		
		console.log("serving controls", req.url);
		var file = path.join(__dirname, "resources", url.parse(req.url).pathname);
		fs.readFile(file, "utf-8", function(err, data){
			if(err){
				console.log("can't find", file);
				res.send(404);
			}else{
				console.log("Found", req.url);
				if(file.indexOf('.json')){
					res.contentType('application/json');
				}else{
					res.contentType('text/javascript');
				}
				res.send(data);
			}
		});
	}
});

app.get('/project_types*', function(req,res){
	serveDirectories(req, res,  './resources/project_types');	
});

app.get('/extensions', function(req,res){
	serveDirectories(req, res, './resources/extensions');	
});

var serveDirectories = function( req, res, directory ) {
	var extPath = path.join(__dirname, directory);
	var response = {};
	console.log("serving -->", directory);
	fs.readdir(extPath, function(err, dirs){
		var tasks = [];
		
		dirs.forEach(function(item){
			
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

app.get('/extensions/:id/:file', function(req,res){
	var extPath = path.join(__dirname, './resources/extensions/');
	fs.readFile(path.join(extPath, req.params.id, req.params.file), "utf-8", function(err, data){		
		res.send(data);
	});
});

app.get('/js/shipyard*', function(req,res){
	serveFile(req,res,'./node_modules/shipyard/', '/js/shipyard');	
});

app.get('/js/builder-lib*', function(req,res){
	serveFile(req,res,'./node_modules/builder-lib/lib/builder-lib', '/js/builder-lib');
});

var serveFile = function(req, res, localPath, swapPath){
	
	var extPath = path.join(__dirname, localPath);
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

app.use(express.static(path.join(__dirname,'public')));

var port = 1337;

app.listen(port);

console.log("express server listening on", port);
