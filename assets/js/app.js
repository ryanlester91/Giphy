//document.ready(function() {

//GLOBAL VARIABLES
//====================================

var topics = ["cat", "dog", "rabbit"];

//Display animal gif data
//function renderButtons() {
  $("#add-gif").on("click", function() {
    // Preventing the buttons default behavior when clicked (which is submitting a form)
    event.preventDefault();

    $("#buttons-view").empty();

     
     //Grab input from text box and change value to lower case.
       var gifInput = $("#gif-input").val().toLowerCase();
       //Remove animal name from text box after user clicks add/submit button
       $("#gif-input").val("");
         
       //If input is already in the topics array
       if (topics.indexOf(gifInput) > -1) {
           alert(gifInput + " is already available.");
         }
         //Doesn't create button if text box is empty
       else if (gifInput === "" || gifInput === null) {
         //return false;
       }
 
       else if (topics.indexOf(gifInput) === -1) {
 
     // Adding the animal from the textbox to our array
       topics.push(gifInput);
       console.log(topics);
    for(var i = 0; i < topics.length; i++) {
        var btn = $("<button>");
            btn.addClass("animalGif");
            btn.attr("data-name", topics[i]);
            btn.text(topics[i]);
            $("#buttons-view").append(btn);
    }
  }
  
//}

  //function displayImages() {
    $(document).on("click", ".animalGif", function() {
     event.preventDefault(); 
  
      $("#gif-gallery").empty();

    var searchTerm = $(this).attr("data-name");
      console.log(searchTerm);
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + searchTerm + "&api_key=mt5Xh4xQ85bqudT9qGrSjWCXqX3eTSLL&limit=10";

    $.ajax({
        url: queryURL,
        method: "GET"
    })

    .then(function(response) {
          console.log(queryURL);

          console.log(response);

          // Storing an array of results in the results variable
          var results = response.data;
           // Looping over every result item
           for (var i = 0; i < results.length; i++) {
            
            // Only taking action if the photo has an appropriate rating
            if (results[i].rating !== "r" && results[i].rating !== "pg-13") {
             
              var gifDiv = $("<div>");
              //Storing the result item's rating (something's broken here)
              var rating = results[i].rating;  
                var p = $("<p>").text("Rating: " + rating);
                
                
                var still = results[i].images.fixed_height_small_still.url
                var animated = results[i].images.fixed_height_small.url;
                var gifImage = $("<img>");
                gifImage.addClass("gif-state");
                gifImage.attr("src", still);
                gifImage.attr("data-still",still); // still image
                //when clicked, gif will animate
                gifImage.attr("data-animate", animated); // animated image
                gifImage.attr("data-state", "still"); // set the image state
                   
                

                gifDiv.append(p);
                gifDiv.append(gifImage);

                $("#gif-gallery").prepend(gifDiv);
                
                }
            }

        });
      });
    



  

  //Calling upon the DOM...
  //When the user clicks a gif in the search results section...
  $(document).on("click", ".gif-state", function() {
    // The attr jQuery method allows us to get or set the value of any attribute on our HTML element.
    var state = $(this).attr("data-state");
    // If the clicked image's state is still, update its src attribute to what its data-animate value is.
    // Then, set the image's data-state to animate
    // Else set src to the data-still value
    if (state === "still") {
      $(this).attr("src", $(this).attr("data-animate"));
      $(this).attr("data-state", "animate");
    } 
    else {
      $(this).attr("src", $(this).attr("data-still"));
      $(this).attr("data-state", "still");
    }
});




 
    
    
    
//redundant code    
//function removeLastButton(){
        
        //$(document).on("click", "#remove-gif", function(event) {
            //event.preventDefault();
            //actions.pop(action);
    //renderButtons();
    //return false;
    //});

        
  //}




//
  


})  