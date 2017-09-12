$("submit").on("click", function(event) {
	event.preventDefault();

	var bitlyIn = $("#short_link").val().trim();

	if (bitlyIn.length() == 0) {
		//Nothing submitted
		console.log("Error: no link submitted");

	} else {
		if (bitlyIn.includes("bit.ly/") == false) {
			//If what was submitted ==! bitly link
			console.log("Error: please enter a 'bit.ly' link");

		} else if (bitlyIn.includes("bit.ly/") == true){
			//if what was submitted == bitly link
			console.log("You have entered a valid 'bit.ly' address at: " + bitlyIn + "!");

			//API get on what was submitted
			$.get("/api/links/" + Bitly, function(data) {
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

		for (var i=0; i<data.length; i++) {
			var div = $("<div>");

				// bitly link
			div.append("<h3>" + data[i].short_link + "</>");

				// full link
			div.append("<p>Full link: " + data[i].long_link + "</p>");

				// domain name
			div.append("<p>Domain name: " + data[i].domain + "</p>");

				// Safe/not bool
			if (data[i].safe == 1) {
				div.append("<p>This site is safe.</p>");
				div.append("<i class="fa fa-check-circle" aria-hidden="true"></i>");
			} else {
				div.append("<p>This site is not safe.</p>");
				div.append("<i class="fa fa-times-circle" aria-hidden="true"></i>");
			}

			$("#allLinkRes").append(div);
		};
	};
};





// $.ajax({
//       url: queryURL,
//       method: "GET"
//     }).done(function(response() {
//       console.log(response);
//       console.log(response.Runtime);
//     }));