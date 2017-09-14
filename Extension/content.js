var url = "https://guarded-wave-66271.herokuapp.com/api/links/";
$("a").hover(
  function(event){ // Runs when the mouse enters an element
    console.log($(this).attr("href").includes("bit.ly/"));
    if($(this).attr("href").includes("bit.ly/") || $(this).text().includes("bit.ly/")){
      var $popupDiv = $("<div>");
      $popupDiv.css({
        "top": event.clientY + "px",
        "left": event.clientX + "px"
      });
      $popupDiv.attr("id", "linkInspector");
      $popupDiv.append($("<p>Getting Link Data</p>"));
      $popupDiv.append($("<img>").attr("src", chrome.runtime.getURL("images/DontPanic.jpg")));
      $("body").append($popupDiv);
      var bitly = $(this).attr("href").includes("bit.ly/") ? encodeURIComponent($(this).attr("href")) : encodeURIComponent($(this).text());
      $.get(url + bitly, function(response){
        var longLink = $("<p>").text("Long URL: " + response.domain_name);
        var safeText = $("<p>");
        var malicious = response.malicious;
        $popupDiv.text("");
        $popupDiv.css("width", response.domain_name.length * 14 + 40 + "px");
        $popupDiv.children().remove();
        $popupDiv.append(longLink);
        if(malicious){
          $popupDiv.append(safeText.text("Malicious"));
        }
        else{
          $popupDiv.append(safeText.text("Safe"));
        }
      });
    }
  },
  function(){ // Runs when the mouse leaves an element
    $("#linkInspector").remove();
  }
);
