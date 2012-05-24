var express = require('express'),
	app = express.createServer();

require('./routes/')(app);

var port = 1337;

app.listen(port);

console.log("express server listening on", port);
