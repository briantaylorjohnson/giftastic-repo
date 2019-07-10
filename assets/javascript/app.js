// Executes the JavaScript once the document has fully loaded (aka ready)
$(document).ready(function()
{
  // Initial array of UGA football topics/tags which will be used to build the tag button well at the top of page
  topics = ["UGA football", "Georgia Bulldogs", "Georgia Bulldawgs", "University of Georgia", "SEC football", "Kirby Smart", "Uga", "Athens", "Athens, Georgia", "UGA", "Georgia football", "Commit to the G", "Coach Smart", "Coach Kirby Smart", "Sanford Stadium", "Between the hedges", "Saturday in Athens"];

  // Function which will build/update the tag button well at the top of page using the topics array when invoked
  function buildUpdateTagButtonsWell()
  {
    // For loop which will iterate through the updated array of UGA football topics/tags and add the tag buttons to the DOM
    for (i=0; i < topics.length; i++)
    {
      // jQuery script which will add the <button> html to the DOM as the for loop iterates through the UGA football topics/tags
      $("#topic-tags").append("<button id='" + topics[i] + "' class='uga-button mx-1 mt-1 btn btn-danger btn-sm'>" + topics[i] + "</button> "); 
    }
  }

  // Function which will make the Ajax call to the Giphy API Search procedure
  // Argument consists of the topic/keywords search criteria string and the number of gif images which should be returned
  function getGifsByKeywords (keywords, limit)
  {
    // Base URL for the Giphy API Search procedure and the API Key query string parameter
    var baseURL = "https://api.giphy.com/v1/gifs/search?api_key=4IcGOPwLJy9ELkZbSwUKgW98kD5UVkQi&q=";

    // Sets the topic/keywords in the function argument to the searchCriteria variable
    var searchCriteria = keywords;

    // Builds the full query URL to invoke the Giphy API Search procedure: base URL + search criteria + number of results
    var queryURL = baseURL +"&q="+ searchCriteria + "&limit=" + limit + "&offset=0&rating-G&lang=en&";

    // Ajax call to be made using the query URL and the HTTP GET method for the Giphy API Search procedure
    $.ajax(
    {
      url: queryURL,
      method: "GET"
    })

    // Instructs the application on how to handle the Giphy API Search procedure response data
    .then(function(response)
    {
      // Logs the Giphy API Search procedure response to the console for debugging purposes
      console.log(response);

      // For loop which iterates through each gif image returned in the Giphy API Search procedure response 
      for (i = 0; i < response.data.length; i++)
      {
        // Stores the URL for each gif image in the response
        var imageUrl = response.data[i].images.original_still.url;

        // Stores the title for each gif image in the response
        var imageTitle = response.data[i].title;

        // Stores the ID for each gif image in the response
        var gifId = response.data[i].id;

        // Stores the rating for each gif image in the response and transforms it to uppercase
        var ugaImagesRating = response.data[i].rating.toUpperCase();

        // Instantiates the <img> tag for each gif image in the response
        var ugaImages = $("<img>");

        // Instantiates the <p> tag for the rating of each gif image in the response
        var ugaImagesRatingP = $("<p>");

        // Instantiates the <div> container for each gif image in the response
        var ugaImagesDiv = $("<div>");

        // Sets the attributes for the <img> tag of each gif image in the response
        ugaImages.attr("src", imageUrl); // SRC attribute
        ugaImages.attr("alt", imageTitle); // Alt attribute
        ugaImages.attr("id", gifId); // ID attribute
        ugaImages.attr("max-width", "300px"); // Max-width attribute
        ugaImages.attr("class", "img-fluid gif"); // Image-fluid and gif class
        ugaImages.attr("animated", false); // Animation status boolean attribute

        // Sets the attributes for the <div> container for each gif image in the response
        ugaImagesDiv.attr("class", "card d-sm-block text-center pr-1 pl-1 pt-1 mt-2 ");

        // Sets the rating text for each gif image in the response
        ugaImagesRatingP.text("Rating: " + ugaImagesRating);

        // Builds the HTML for the gif image with a <div> containing the <img> and <p> tags for the image and rating respectively
        $(ugaImagesDiv).append(ugaImages);
        $(ugaImagesDiv).append(ugaImagesRatingP);
        $("#uga-football-images").prepend(ugaImagesDiv);
      }
    });
  }


  // Builds and displays the initial UGA football keywords/topics tag buttons in well at top of page
  buildUpdateTagButtonsWell();

  // jQuery listener which invokes the getGifsByKeywords function
  // Tag button text is used for the keywords/topics to search by; the result set of gif images is limited to ten per the requirements
  $("#topic-tags").on("click", ".uga-button", function()
  {
    getGifsByKeywords($(this).text(), 10);
  });

  //jQuery listener which plays/stops the animation of gif images when clicked
  $("#uga-football-images").on("click", "img", function()
  {
    // Logs the gif image clicked event to the console for debugging purposes
    console.log("Image has been clicked.");

    // Stores the current image URL (SRC) to a variable so it can be updated to start/stop animation
    var src = $(this).attr("src");

    // Stores the current image animation status boolean for evaluation to determine whether to run start or stop animation condition
    var animated = $(this).attr("animated");

    // Conditional to run if the animation is not playing for the clicked gif image
    if (animated == "false")
    {
      // Updates the clicked gif image static URL (SRC) to point to the animated image URL
      $(this).attr('src', src.replace(/\_s.gif/i, ".gif"));
      
      // Updates the animated <img> attribute to true -- indicates that the gif image animation is playing
      $(this).attr('animated', "true");

      // Sets the updated image URL (SRC) to the src variable so it can be output in the console 
      src = $(this).attr("src");

      // Logs the updated image URL (SRC) to the console for debugging purposes
      console.log("New SRC: " + src);

      // Sets the updated animation status boolean to the animated variable so it can be output in the console
      animated = $(this).attr("animated");

      // Logs the updated image animation status boolean to the console for debugging purposes
      console.log("Is animated: " + animated);
    }

    // Conditional to run if the animation is playing for the clicked gif image
    else
    {
      // Updates the clicked gif image animated URL (SRC) to point to the static image URL
      $(this).attr('src', src.replace(/\.gif/i, "_s.gif"));

      // Updates the animated <img> attribute to false -- indicates that the gif image animation is not playing
      $(this).attr('animated', "false");

      // Sets the updated image URL (SRC) to the src variable so it can be output in the console 
      src = $(this).attr("src");

      // Logs the updated image URL (SRC) to the console for debugging purposes
      console.log("New SRC: " + src);

      // Sets the updated animation status boolean to the animated variable so it can be output in the console 
      animated = $(this).attr("animated");

      // Logs the updated image animation status boolean to the console for debugging purposes
      console.log("Is animated: " + animated);
    }
  });

  //jQuery listener which adds a new tag button to the well at the top of the page when the user enters a new topic/keywords and clicks the button
  $(".new-tag-button").on("click", function()
  {

    // Stores the new topic/keywords entered in the text entry box of the form to a variable
    var newTag = $(".new-tag-box").val();

    // Logs the new topic/keywords for the tag button to the console for debugging purposes
    console.log(newTag);

    // Pushes the new topic/keywords to the topics array so that the tag button well can be refreshed
    topics.push(newTag);

    // Logs the new topics array to the console for debugging purposes
    console.log(topics);

    // jQuery script which clears all tag buttons in well before refreshed the tag buttons with the newly updated topics array 
    $("#topic-tags").empty();

    // For loop which will iterate through the updated array of UGA football topics/tags and add the tag buttons to the DOM
    buildUpdateTagButtonsWell();

    // jQuery script which clears the text entry box afte the user has submitted the new tag button
    $(".new-tag-box").val("");

    // Logs the new tag button added event to the console for debugging purposes 
    console.log("New tag button has been added.");
  });
});
