var express = require('express'),
	app = express.createServer();

try{
require('./routes/')(app);
}catch(e){
	console.log("sdf");
}

var port = 1337;

app.listen(port);

console.log("express server listening on", port);
