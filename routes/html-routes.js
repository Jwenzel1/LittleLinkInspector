// Dependencies
// =============================================================
var path = require("path");


// Routes
// =============================================================
module.exports = function(app) {
	//Home page INDEX.HTML
	app.get("/", function(req, res) {
		res.sendFile(path.join(__dirname, "./public/index.html")
	});

	//Home page HANDLEBARS
	// app.get("/", function(req, res) {
	// 	res.sendFile(path.join(__dirname, "../views/index.handlebars")
	// });

}