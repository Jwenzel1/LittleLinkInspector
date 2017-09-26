# LittleLinkInspector
Description: 
This is a node app that allows the user to enter a bit.ly link, and returns the fully resolved URL of that link, and whether or not it's safe. All data is are stored in a SQL database using sequelize.js. 

Responsibilities
Ahmer: Backend- listen for get request from server. Use sequelize to implement storing bit.ly urls, long form urls, user account information, votes, etc. Checks to see if link is in database, if yes then pull information and send it for front end to receive, if not then call bit.ly API, and send that information to the database. Create 

Joe: chrome extension that returns fully resolved URL and whether or not the website is malicious whenever the user hovers over a bit.ly link. 

Steven/Rojo: front end- client side javascript for AJAX calls to our server, getting user input from web page, posting it to server. Get requests for database information when a bit.ly link is entered. Use postman to make sure AJAX calls are working correctly. Designing slick UI (html/css)
