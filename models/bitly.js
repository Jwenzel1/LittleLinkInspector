//this npm package does the bitly API call for us
//it doesnt resolve the domain name though
var Bitly = require('bitly');
var API_key = "c24164a9ec3b27c30f9ac9474edf2aced8b8bbcf";
var bitly = new Bitly(API_key);
var bitlyLink;
var long_url = "";
var domain = encodeURIComponent("http://bit.ly/2wRyKeL");


modules.export = function(){
	
bitly.expand('http://bit.ly/2wRyKeL')//replace with bitlyLink
  .then(function(response) {
  	long_url = response.data.expand[0].long_url;
  	
    console.log(long_url);
    
  }, function(error) {
    throw error;
  });
return long_url;
}


  

//this is the AJAX call for the bitly API
//for some reason i cant seem to get the domain name with this either...
//might need to find another way, but for now the npm package is awesome 
// $.ajax({

//  url: "https://api-ssl.bitly.com/v3/link/info?access_token=c24164a9ec3b27c30f9ac9474edf2aced8b8bbcf&link= + bitlyLink"
// 	method: "GET"

// }).done(function(response) {
// var long_url = response.data.canonical_url;
// });