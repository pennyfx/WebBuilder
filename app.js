var express = require('express'),
	fs = require('fs'),
	path = require('path'),
	async = require('async'),
	app = express.createServer();

app.get('/', function(req, res){
    fs.readFile(path.join(__dirname, './addon/web-builder-bootstrap/content/index.xul'), 'utf8', function(err, text){
		res.header('Content-Type', 'application/xhtml+xml');
        res.send(text);
    });
});

app.get('/extensions', function(req,res){
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


app.get('/controls', function(req,res){
	var extPath = path.join(__dirname, './resources/controls/dom');
	var response = {};
	
	fs.readdir(extPath, function(err, dirs){
		var tasks = [];
		
		dirs.forEach(function(item){
			
			var key = item.replace('.js','');
			response[key] = { name: key, main: 'dom/' + item };
			
		});
		
		res.header('Content-Type','application/json');
		res.send(response);
		
	});
});

app.get('/extensions/:id/:file', function(req,res){
	var extPath = path.join(__dirname, './resources/extensions/');
	fs.readFile(path.join(extPath, req.params.id, req.params.file), "utf-8", function(err, data){		
		res.send(data);
	});
});

app.use(express.static(path.join(__dirname,'public')));

app.listen(1337);