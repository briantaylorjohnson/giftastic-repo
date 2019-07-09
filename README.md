# Gif-tastic UGA Gif Bot (Homework 6)
### Overview
The Gif-tastic UGA Gif Bot is the Homework 6 submission for Taylor Johnson in the Georgia Tech Coding Bootcamp. It uses HTML, CSS, Bootstrap, JavaScript, and jQuery to build a predetermined array of tags presented to the user as buttons. When these buttons are clicked, ten gif images are retrieved using the Ajax call to the Giphy API. Clicking another tag button will retrieve an additional ten gif images. If the same tag button is clicked, then ten new gif images associated with that tag are retrieved.

When the application loads the gif images from the Giphy API, they displayed statically without animation. If the user clicks an image, the gif is animated on loop until the user clicks the image again to stop animation. They are also displayed with the rating returned by the Giphy API.

The application also includes a form with a text input field and a submit button. This form is used to add more tag buttons to the  well at the top of the page. New tag buttons can be clicked to retrieve additional gif images from the Giphy API.

This application is fully responsive and supports all viewports.

The Giphy API attribution logo is displayed at the bottom of the page.

### Mechanics
When the application first loads, a preset list of topics is iterated through using a loop to build the initial tag button well at the top of the page. 

There are three primary jQuery listeners within the application:
1. Tag button well clicks
2. Image clicks
3. "Add Tag" button clicks

When the user clicks a tag button in the well at the top of the page, an Ajax call to the Giphy API is invoked search for gif images associated with the text of the tag button. The first ten results are returned and presented to the user. If this same tag button is clicked again, the next ten gif images are returned and presented to the user -- not the same ten already presented. The rating of each image is also presented to the user. The rating is returned in the response from the Giphy API. Each image in the response has a rating.

If an new tag button is clicked, then the first ten images associated with the text of the tag button are returned through the Giphy API and presented to the user. Any new images are prepended to the images already presented to the user. Images are initially displayed statically without animation.

When the user clicks an image, the gif is animated. The animation continues on loop until the user clicks the image again. By clicking the image, the application updates the SRC URL for the <img> tag to retrieve the animated version of the gif or vice versa.

There is also a form with a text entry box and submit button. This is below the tag button well, but above the gif images if they are displayed. The user can enter a new tag to find gifs for and click the "Add Tag" button. This will add a new tag button to the well above the form. The text in the text entry box is removed when the user submits the new tag. The new tag button is appended to the existing tag buttons on the page. As with all existing tag buttons, it can be clicked to make the Ajax call to the Giphy API and return ten images associated with the text of the tag button. 

This application has been formatted with Bootstrap and is fully responsive on most viewports.

Giphy API attribution has been included in the footer of the page.




