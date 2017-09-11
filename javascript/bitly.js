//this npm package does the bitly API call for us
//it doesnt resolve the domain name though
var Bitly = require('bitly');
var url = require('url');
var API_key = "c24164a9ec3b27c30f9ac9474edf2aced8b8bbcf";
var bitly = new Bitly(API_key);
var bitlyLink; //the given bit.ly link
var long_url; //the full url of the bit.ly link
var domain; //used for storing the object returned by url.parse
var domain_name; //the hostname of the given url


// var jake = function(){

// bitly.expand('http://bit.ly/2whIn2N')//replace with bitlyLink
//   .then(function(response) {

//   	long_url = response.data.expand[0].long_url;
//   	domain = url.parse(long_url, true);
//   	domain_name = domain.host;

//   	// console.log(long_url);
//   	// console.log(domain_name);
  	
//   }, function(error) {
//      throw error;
//   })
//   .then(function(){
//     // console.log('hi!')
//     // var exports = module.exports = {}
//     // exports.long_url = long_url
//     // console.log(long_url)
//   });
// }();

// setTimeout(function(){
//   module.exports = {
//   long_url: long_url
//   }
// }, 3000)

// var jake = function(){
//   bitly.expand('http://bit.ly/2whIn2N')//replace with bitlyLink
//   .then(function(response) {

//     long_url = response.data.expand[0].long_url;
//     domain = url.parse(long_url, true);
//     domain_name = domain.host;

//     // console.log(long_url);
//     // console.log(domain_name);
    
//   }, function(error) {
//      throw error;
//   })
//   .then(function(){
//     console.log(long_url)
//     module.exports = {long_url: long_url}
//   });
// }()


  bitly.expand('http://bit.ly/2whIn2N')//replace with bitlyLink
  .then(function(response) {

    long_url = response.data.expand[0].long_url;
    domain = url.parse(long_url, true);
    domain_name = domain.host;


  }, function(error) {
     throw error;
  });
setTimeout(function(){
console.log(long_url);
module.exports = long_url;
}, 3000)
// will()
// module.exports = {jake: 'jake'}

//this is the AJAX call for the bitly API
//for some reason i cant seem to get the domain name with this either...
//might need to find another way, but for now the npm package is awesome 
// $.ajax({

//  url: "https://api-ssl.bitly.com/v3/link/info?access_token=c24164a9ec3b27c30f9ac9474edf2aced8b8bbcf&link= + bitlyLink"
// 	method: "GET"

// }).done(function(response) {
// var long_url = response.data.canonical_url;
// });