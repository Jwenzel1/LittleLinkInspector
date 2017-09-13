// src="https://code.jquery.com/jquery-1.10.2.js"
// ==========================================================================================
// ==========================================================================================

$("#submit").on("click", function(event) {
	event.preventDefault();
	console.log(event);

	var bitlyIn = $("#user-input").val().trim();
	console.log(bitlyIn);

	if (bitlyIn.length == 0) {
		//Nothing submitted
		console.log("Error: no link submitted");

	} else {
		if (bitlyIn.includes("bit.ly/") == false) {
			//If what was submitted ==! bitly link
			console.log("Error: please enter a 'bit.ly' link");

		} else if (bitlyIn.includes("bit.ly/") == true){
			//if what was submitted == bitly link
			console.log("You have entered a valid 'bit.ly' address at: " + bitlyIn + "!");

			$("#allLinkRes").empty();
			$("#allLinkRes").append($("<img id=\"loadingGif\" src=\"images/loading.gif\">"))


			//API get on what was submitted
			$.get("/api/links/" + encodeURIComponent(bitlyIn), function(data) {
				//Bitly long link
				console.log(data);
				//Add data points to the page in the correct way...
				renderLinks(data);
			})
		};
	};
});


function renderLinks(data) {
	if (data.length !==0) {
		$("#allLinkRes").empty();
		$("#allLinkRes").show();

	
			var div = $("<div>");
			console.log(data);

				//header for section
			div.append($("<h2>Full URL</h2>"));

				// full link
			div.append($("<h2><a href=" + data.long_link + " target=\"_blank\">" + data.long_link + "</a></h2>"));

				// bitly link
			// div.append($("<h3><a href=" + data.short_link + " target=\"_blank\">" + data.short_link + "</a></h3>"));

				// domain name
			div.append($("<h3>Domain name: <a href=" + data.domain_name + " target=\"_blank\">" + data.domain_name + "</a></h3>"));

				// Safe/not bool
				console.log(data);
			if (data.malicious == 0) {
				div.append($("<h3>This site is <b>safe</b>.</h3>"));
				div.append($("<i class=\"fa fa-check-circle\" aria-hidden=\"true\"></i>"));
			} else {
				div.append($("<h3>This site is <b>not safe<b>.</h3>"));
				div.append($("<i class=\"fa fa-times-circle\" aria-hidden=\"true\"></i>"));
			}

			$("#allLinkRes").append(div);
	} 
};


// footer on hover event
// $( "footerTitle" )
//   .filter( ":odd" )
//     .hide()
//   .end()
//   .filter( ":even" )
//     .hover(function() {
//       $( this )
//         .toggleClass( "active" )
//         .next()
//           .stop( true, true )
//           .slideToggle();
//     });


// $.ajax({
//       url: queryURL,
//       method: "GET"
//     }).done(function(response() {
//       console.log(response);
//       console.log(response.Runtime);
//     }));