# BitWikk
Spring 2022


## Overview:
BitWikk acts as a website for people to easily access in depth information regarding retro video games, consoles, and other topics surrounding them. BitWikk is in a "wiki" format, and while wikis for specific game series or consoles often exist, there is currently no widely used wiki for in depth information covering all retro games.

## Team Members
Einar Klarlund, einarklarlund

Brian Zhang, BrianZhang42

Donald Hurld, DonaldHurldUni

Neil Gupta, nog642

## User Interface

### Register Page
<img src="imgs/Register1.png" height="500px">
<img src="imgs/register2.png" height="500px">
<img src="" height="500px"> 
<br>
<!---
todo: add failed register image
-->
Demonstrates the Create Operation by allowing a user to create an account in which the user inputs a username and password that is stored. Additionally, UI informs the user of invalid registration informaiton.

### Article Page
<img src="imgs/snes.png" height="500px">
<br>
Demonstrates the Read Operation, because the client side JS gets the article content as a JSON from the server using a GET request, then renders it on the page.

### Article Edit Page
<img src="imgs/edit1.png" height="500px">
<img src="imgs/edit2.png" height="500px">
<br>
Demonstrates the Update Operation by allowing the user to edit an article page and update any information they see fit, additionally adding the user to that page's list of contributors.

### Sign out
<img src="imgs/login2.png" height="200px">
<img src="imgs/logout.png" height="200px">
<br>
Demonstrates the Delete Operation by allowing the user to sign out, making the server delete the session.

Above, we first see what the user sees when they are signed in: the "Signed in" message, letting them know they are signed in, and the "Sign out" button. Next, we see what the user sees after clicking the "Sign out" button: a button to "Sign in" and a button to "Sign up".

Clicking the "Sign out" button sends a POST request to the server, deleting the session, and the server response's `Set-Cookie` header deletes the cookies on the client side. The client side JS then reloads the page.


## APIs
`GET  /article/{ID}`<br/>
This serves the static `article_page.html`, which then dynamically calls `GET /article/{ID}/get` and renders the content.

`GET  /article/{ID}/get`<br/>
This returns a JSON with article content

`POST /create`<br/>
Requires login (cookie header). Body: `{title: title, content: content}`<br/>
This request will be used to create new articles.

`POST /article/{ID}/edit`<br/>
Requires login (cookie header). Body: `{content: content}`<br/>
This request will be used to edit articles.

`POST /article/{ID}/comment`<br/>
Requires login (cookie header). Body: `{content: content}`<br/>
This request will be used to post a comment under an article.

`GET  /search?query={query}`<br/>
This will be used for the searchbar. It returns a list of articles as a JSON.

`GET  /category/{category}`<br/>
This will be used to browse by category. For now it returns a list of articles as a JSON.

`POST /user/login`<br/>
Body: `{username: username, password: password (plaintext)}`<br/>
This will be used to log in.

`POST /user/logout`<br/>
Requires login (cookie header).<br/>
This will be used to log out (make the server forget the session).

`GET  /user/get?user={username}`<br/>
This will be used to get the user profile as a JSON. Currently there is no useful data there since the only thing there is the username.

`POST /user/create`<br/>
Body: `{username: username, password: password (plaintext)}`<br/>
This will be used to sign up for an account

`POST /user/edit`<br/>
Requires login (cookie header). Body: `{username: username, ...additional fields}`<br/>
This will be used to let a user edit their account (modify their profile in the future, or change their password).

`POST /user/delete?user={username}`<br/>
Requires login (cookie header).<br/>
This will be used to delete an account.

## Database

User Document 
{
    username: String,           //The username of a user
    password: String            //The password of a user
}

Session Document
{
    ID: String,                 //The ID of a user's session
    username: String,           //The username of the session user
    expiry: Date                //The time the session expires
}

Article Document
{
    ID: String,                 //The ID of an article document
    title: String,              //The title of the article
    content: String,            //The main content of the article
    contributers: String Array, //The users who created the article
    images: String Array,       //Array of image links in the article
    commentId: String Array,    //Array of IDs for the comments in the article
    category: String            //The category the article is in
}

Comment Document
{
    ID: String,                 //The ID of the comment
    username: String,           //The username of the user who wrote the comment
    articleID: String,          //The ID for the article the comment is located in
    content: String             //The content of the comment
}

## URL Routes/Mapping

<img src="imgs/urlmap1.png" height="400px">
<img src="imgs/urlmap2.png" height="400px">

## Authentication/Authorization
When a user attempts to sign in via BitWikk's login page, the server creates a session after a password check, in which the hashed password associated with the user is checked against the provided password using bcrypt. This session is set to expire after 30 days, and will be deleted if it's detected to be invalid.

Once signed in, all users will have the ability to edit pages as well as comment on pages, which are interaction related views of the UI that cannot be seen otherwise. Additionally, the top right button labeled "Sign In" will change to "Signed In" to reflect the user is properly signed in.


## Division of Labor
Donald Hurld, DonaldHurldUni - login page wireframe and Bootstrap, server.js and routing functions, front end testing, final.md writeup, backend work

Einar Klarlund, einarklarlund -  search page wireframe and Bootstrap, JavaScript functions, article page functionality, models, Database schemas and setup

Brian Zhang, BrianZhang42 - article page wireframe and Bootstrap, Markdown files, Client/CRUD utility functions, HTML/CSS pages, Database schemas and documentation

Neil Gupta, nog642 - home page wireframe and Bootstrap, Various routes and data processing, session management, Heroku deployment, Database and backend work

Note: Majority of cooperative working sessions were done using Visual Studio Liveshare, in case the unequal number of commits were being questioned.

## Conclusion
One important bit of information learned was that even when we thought we had planned out absolutely everything, there would always be several additions as we realized aspects of a wiki that we were missing or general features we hadn't begun to write out APIs for yet.

All things considered, the overall development went fairly smooth. Our largest issue was likely when we had to modify a decent amount of code for the site to work as requested with Heroku deployment in mind, since the majority of testing was done both locally and with testing-specific files which kept the databse.