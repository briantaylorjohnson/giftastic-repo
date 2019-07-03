// Executes the JavaScript once the document has fully loaded (aka ready)
$(document).ready(function()
{

    topics = ["UGA football", "Georgia Bulldogs", "Georgia Bulldawgs", "University of Georgia", "SEC football", "Kirby Smart", "Uga", "Athens", "Athens, Georgia", "UGA", "Georgia football", "Commit to the G", "Coach Smart", "Coach Kirby Smart", "Sanford Stadium", "Between the hedges", "Saturday in Athens"];

    function replaceChar (string, fromChar, toChar)
    {
        var newString = string.replace(fromChar,toChar);
        return newString;
    }

    for (i=0; i < topics.length; i++)
    {
       $("#topic-tags").append("<button id='" + topics[i] + "' class='uga-button mx-1 mt-1'>" + topics[i] + "</button> "); 
    }

    $(".uga-button").on("click", function()
    {
        //https://api.giphy.com/v1/gifs/search?api_key=4IcGOPwLJy9ELkZbSwUKgW98kD5UVkQi&q=&limit=25&offset=0&rating=G&lang=en
      var baseURL = "https://api.giphy.com/v1/gifs/search?api_key=4IcGOPwLJy9ELkZbSwUKgW98kD5UVkQi&q=";

      var limit = 10;

      var searchCriteria = $(this).text();

      var queryURL = baseURL +"&q="+ replaceChar(searchCriteria, " ", "%20") + "&limit=" + limit + "&offset=0&rating-G&lang=en&";
        
        $.ajax({
            url: queryURL,
            method: "GET"
        })

        .then(function(response) {

          console.log(response);
   
          for (i = 0; i < response.data.length; i++)
          {
            var imageUrl = response.data[i].images.original.url;
            var imageTitle = response.data[i].title;

            var ugaImages = $("<img>");

            ugaImages.attr("src", imageUrl);
            ugaImages.attr("alt", imageTitle);
            ugaImages.attr("width", "200");
            ugaImages.attr("class", "img-fluid");

            $("#uga-football-images").prepend(ugaImages);
          }
          
        });

    });
        
    });