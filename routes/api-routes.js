var Bitly = require('bitly');
var url = require('url');
var vt = require("node-virustotal");
var API_key = "c24164a9ec3b27c30f9ac9474edf2aced8b8bbcf";
var bitly = new Bitly(API_key);
var bitlyLink; //the given bit.ly link
//reqires our Links model
var db = require("../models");
// var bitly = require("../javascript/bitly.js");
var long_url; //the full url of the bit.ly link
var domain; //used for storing the object returned by url.parse
var domain_name; //the hostname of the given url


module.exports = function(app){

//GET route for finding a bit.ly long_link in the database when a short_link is entered
//can also get any other information for that bit.ly link in the database
	app.get("/api/links:link", function(req, res){

		db.Links.findAll({
		  where: {
			   short_link: req.params.link
		  }
		}).then(function(dbLink){
			if(dbLink.length == 0){
				bitly.expand('http://bit.ly/2whIn2N')//replace with bitlyLink
				  .then(function(response) {

				    long_link = response.data.expand[0].long_url;
				    short_link = response.data.expand[0].short_url;
				    domain = url.parse(long_url, true);
				    domain_name = domain.host;

						db.Links.create({
							short_link: short_link,
							long_link: long_link,
							domain_name: domain_name
						}).then(function(dbLink){
							console.log(dbLink[0].short_link);
							console.log(dbLink[0].long_link);
							console.log(dbLink[0].domain_name);
							var info = {
								short_link: short_link,
								long_link: long_link,
								domain_name: domain_name
							}
							res.json(info);
						});

				  }, function(error) {
				     throw error;
				  });
			}
			else{
				var info = {
								short_link: short_link,
								long_link: long_link,
								domain_name: domain_name
							}
							res.json(info);
			}
		});
	})
//POST route for inserting a bit.ly link into the database
	app.post("api/links", function(req, res){

		db.Links.create({
			short_link: req.body.short_link,
			long_link: req.body.long_link,
			domain_name: req.body.domain_name
		}).then(function(dbLink){
			console.log(dbLink[0].short_link);
			console.log(dbLink[0].long_link);
			console.log(dbLink[0].domain_name);
			res.json(dbLink);
		});
	});
//PUT route for updating the "safe" boolean of a bit.ly link, 1 for true, 0 for false
	app.put("api/links/:safe", function(req, res){

		db.Links.update({
			safe: req.body.safe
		}).then(function(dbLink){
			res.json(dbLink);
		});
	});
}

// console.log(long_url, domain_name)
// //test functions for each of the sequelize queries
// 	function createTest(){
// 		db.Links.create({
// 			short_link: "http://bit.ly/2whIn2N",
// 			long_link: "https://secure-garden-74394.herokuapp.com/",
// 			domain_name: "test.com"
// 		}).then(function(dbLink){
// 			console.log("")
// 			console.log(dbLink);
// 		});
// 	}	

function findAllTest(){
		db.Links.findAll({
		  where: {
				short_link: ""
			}	

		}).then(function(dbLink){
				console.log(dbLink)
				// console.log(dbLink[0].long_link);
		});
	}	
// 	function updateTest(){
// 		db.Links.update({
// 			safe:true
//     	}, {
//       where: {
//         short_link: "http://bit.ly/2whIn2N" //replace this with the bit.ly link sent to the :safe parameter
//       }
// 		}).then(function(dbLink){
// 			console.log(dbLink);
// 		});
// 	}

// 		setTimeout(createTest, 3000);
//		setTimeout(findAllTest, 6000);
findAllTest();
// 		setTimeout(updateTest, 9000)