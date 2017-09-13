//requires the bitly npm package
var Bitly = require('bitly');
var url = require('url');
var API_key = "c24164a9ec3b27c30f9ac9474edf2aced8b8bbcf";
var bitly = new Bitly(API_key);

//requires the Virus Total npm package
var vt = require("node-virustotal");
var con = vt.MakePublicConnection();
con.setKey("046ace4470931392168279685fbff5a2bc4a6645f019796c04f2b9b8dbc10bec");
con.setDelay(15000);

//reqires our Links model
var db = require("../models");
var short_link
var long_link; //the full url of the bit.ly link
var domain; //used for storing the object returned by url.parse
var domain_name; //the hostname of the given url
var malicious; //boolean that is true if malicious, false if safe
var info; //returns all the data above

//export everything to be used by the server
module.exports = function(app){

//GET route for finding a bit.ly long_link in the database when a short_link is entered
//if nothing is found in the database, it calls to the bit.ly API and gets the full URL and domain name
//then it scans the full URL for malicious software
//it then creates a record of the bit.ly link with the full URL, domain name, and whether or not its malicious
//if a record is found in the database, return all its data
	app.get("/api/links/:link", function(req, res){
		db.Links.findAll({ //searchs the database for
		  where: {
			   short_link: req.params.link
		  }
		}).then(function(dbLink){
			if(dbLink.length == 0){ //sequelize returns an empty array if it cannot find it in the database
				bitly.expand(req.params.link)//bitly API call to get long_link of the bit.ly link
				  .then(function(response) {

				  	short_link = response.data.expand[0].short_url;
				    long_link = response.data.expand[0].long_url;
				    domain = url.parse(long_link, true); //parses the full URL to get various information about the link
				    domain_name = domain.host; // assigns the host (domain) to domain_name

				    //con.UrlEvaluation is a little bit slower than doing a submit and retrieve, so we opted to do it this way
				    console.log("");
				    console.log(long_link + " has been submitted for scanning");
			    	con.UrlEvaluation(long_link, function(data){ //sends the long_link for scanning
			    	  // malicious = data.scans["Google Safebrowsing"].detected;

			    	  //checks each of virus total's virus scanners and any of them says the website is malicious
			    	  //then we declare that url to be malicious
							malicious = false;
			    	  for(scanner in data.scans){
			    	  	console.log(scanner + ": " + data.scans[scanner].detected)
			    	  	if(data.scans[scanner].detected)
			    	  	{
			    	  		malicious = true;
			    	  		console.log("")
			    	  		console.log(scanner + " determined that: " + long_link + " is malicious");
			    	  		break;
			    	  	}
			    	  }
					  console.log("");

						db.Links.create({ //creates the record for the bitly link after the bitly API returns data, and the URL has been scanned
							"short_link": short_link,
							"long_link": long_link,
							"domain_name": domain_name,
							"malicious": malicious
						}).then(function(dbLink){
							console.log("") //console log our data to make sure its correct
							console.log("Bit.ly link: " + short_link);
							console.log("Full URL: " + long_link);
							console.log("Domain name: " + domain_name);
							console.log("Malicious: " + malicious);

							var info = {
								"short_link": short_link,
								"long_link": long_link,
								"domain_name": domain_name,
								"malicious": malicious
							}

							res.json(info);
						});
					}, function(error){
					}); //end of submitUrlForScanning method
				});//Closes the bit.ly expand method
			}
			//executes else statement if the bitly link is already in our database
			else{
				//stores the values from the database into the variables we'll be sending to our page
			    short_link = dbLink[0].dataValues.short_link;
			    long_link = dbLink[0].dataValues.long_link;
			    domain_name = dbLink[0].dataValues.domain_name;
			    malicious = dbLink[0].dataValues.malicious;

				//puts our info in an object to be returned as a response
				var info = {
					"short_link": short_link,
					"long_link": long_link,
					"domain_name": domain_name,
					"malicious": malicious
				}
				console.log("") //console logs our data to make sure its correct
				console.log("Bit.ly link: " + info.short_link);
				console.log("Full URL: " + info.long_link);
				console.log("Domain name: " + info.domain_name);
				console.log("Malicious: " + info.malicious);
				res.json(info); //gives a response with the data
			}
		}); //end of the .then function of the sequelize findAll method
	}); //end of the GET request
}//end of module exports
