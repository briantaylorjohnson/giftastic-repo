// Executes the JavaScript once the document has fully loaded (aka ready)
$(document).ready(function()
{

    topics = ["UGA football", "Georgia Bulldogs", "Georgia Bulldawgs", "University of Georgia", "SEC football", "Kirby Smart", "Uga", "Athens", "Athens, Georgia", "UGA", "Georgia football", "Commit to the G", "Coach Smart", "Coach Kirby Smart", "Sanford Stadium", "Between the hedges", "Saturday in Athens"];

    for (i=0; i < topics.length; i++)
    {
       $("#topic-tags").append("<button id='" + topics[i] + "' class='uga-button mx-1 mt-1 btn btn-danger btn-sm'>" + topics[i] + "</button> "); 
    }

    $("#topic-tags").on("click", ".uga-button", function()
    {

      var baseURL = "https://api.giphy.com/v1/gifs/search?api_key=4IcGOPwLJy9ELkZbSwUKgW98kD5UVkQi&q=";

      var limit = 10;

      var searchCriteria = $(this).text();

      var queryURL = baseURL +"&q="+ searchCriteria + "&limit=" + limit + "&offset=0&rating-G&lang=en&";
        
        $.ajax({
            url: queryURL,
            method: "GET"
        })

        .then(function(response) {

          console.log(response);
   
          for (i = 0; i < response.data.length; i++)
          {
            var imageUrl = response.data[i].images.original_still.url;
            var imageTitle = response.data[i].title;
            var gifId = response.data[i].id;
            var ugaImagesRating = response.data[i].rating.toUpperCase();
            var ugaImages = $("<img>");
            var ugaImagesDiv = $("<div>");
            var ugaImagesRatingP = $("<p>");

            ugaImages.attr("src", imageUrl);
            ugaImages.attr("alt", imageTitle);
            ugaImages.attr("id", gifId);
            ugaImages.attr("max-width", "300px");

            ugaImages.attr("class", "img-fluid gif");
            ugaImages.attr("animated", false);

            ugaImagesDiv.attr("class", "card d-sm-block text-center pr-1 pl-1 pt-1 mt-2 ");
            ugaImagesRatingP.text("Rating: " + ugaImagesRating);

            $(ugaImagesDiv).append(ugaImages);
            $(ugaImagesDiv).append(ugaImagesRatingP);
            $("#uga-football-images").prepend(ugaImagesDiv);
          }
          
        });

    });

    $("#uga-football-images").on("click", "img", function()
    {
      console.log("Image clicked!");

      var src = $(this).attr("src");
      var animated = $(this).attr("animated");

      if (animated == "false")
      {
        $(this).attr('src', src.replace(/\_s.gif/i, ".gif"))
        $(this).attr('animated', "true");

        src = $(this).attr("src");
        console.log("New SRC: " + src);

        animated = $(this).attr("animated");
        console.log("Is animated: " + animated);
      }
      else
      {
        $(this).attr('src', src.replace(/\.gif/i, "_s.gif"))
        $(this).attr('animated', "false");

        src = $(this).attr("src");
        console.log("New SRC: " + src);

        animated = $(this).attr("animated");
        console.log("Is animated: " + animated);
      }
    });

    $(".new-tag-button").on("click", function()
    {
      console.log("New tag has been added!");
      var newTag = $(".new-tag-box").val();
      console.log(newTag);

      topics.push(newTag);
      console.log(topics);

      $("#topic-tags").empty();

      for (i=0; i < topics.length; i++)
      {
        $("#topic-tags").append("<button id='" + topics[i] + "' class='uga-button mx-1 mt-1 btn btn-danger btn-sm'>" + topics[i] + "</button> "); 
      }

      $(".new-tag-box").val("");
    });
});
