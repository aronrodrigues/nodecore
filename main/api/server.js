(function () {
	'use strict';

	var logger = require('bunyan').createLogger({name: 'nodecore'});

	var i8 = require('i8');
	var server = new i8.Server(logger);
	var config = server.getConfig();

	/*var mongoose = require("mongoose");
	mongoose.connect.apply(mongoose, [config.dbUrl]);
	mongoose.connection.on("connected", function () {
    logger.info([config.dbUrl, "mongoose connected");
	});
	mongoose.connection.on("error", function () {
    logger.error("Mongoose not connected. Exiting.");
    process.exit(1);
	});*/

	var router = i8.createRouter();
	router.get('/', function (req, res, next) {
		res.status(200).jsonp({message: 'Hello API World at ' + Date.now() });
	});

	server.use('/api', router);
	server.static('/', './main/web');
	server.startup();

})();