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
			$.get("/API/Links/" + Bitly, function(data) {
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
		$("#").empty();
		$("#").show();

		for (var i=0; i<data.length; i++) {
			var div = $("<div>");

			div.append("");

			$("#").append(div);
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