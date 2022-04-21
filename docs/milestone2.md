# BitWikk Milestone 2

## Division of Labor

Donald Hurld, DonaldHurldUni - server.js and routing functions

Einar Klarlund, einarklarlund - JavaScript functions, article page functionality, models

Brian Zhang, BrianZhang42 - Markdown files, Client/CRUD utility functions, HTML/CSS pages

Neil Gupta, nog642 - Various routes and data processing, session management, Heroku deployment

## Objects:

User - {username, password (hash and salt)}

Article - {ID (based on title), title, content, contributers, images (for gallery), commentIDs, category}

Comment - {ID, username, articleID, content}

Session - {sessionID, username, expiry}

## API:

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

## Screenshots

### Register Page
<img src="imgs/Register1.png" height="500px">
<img src="imgs/register2.png" height="500px">
<br>
Demonstrates the Create Operation by allowing a user to create an account in which the user inputs a username and
password that is stored.

### Article Page
<img src="imgs/snes.png" height="500px">
<br>
Demonstrates the Read Operation, because the client side JS gets the article content as a JSON from the server using a GET request, then renders it on the page.

### Article Edit Page
<img src="imgs/edit1.png" height="500px">
<img src="imgs/edit2.png" height="500px">
<br>
Demonstrates the Update Operation by allowing the user to edit an article page and update any information they see fit.

### Sign out
<img src="imgs/login2.png" height="200px">
<img src="imgs/logout.png" height="200px">
<br>
Demonstrates the Delete Operation by allowing the user to sign out, making the server delete the session.

Above, we first see what the user sees when they are signed in: the "Signed in" message, letting them know they are signed in, and the "Sign out" button. Next, we see what the user sees after clicking the "Sign out" button: a button to "Sign in" and a button to "Sign up".

Clicking the "Sign out" button sends a POST request to the server, deleting the session, and the server response's `Set-Cookie` header deletes the cookies on the client side. The client side JS then reloads the page.

## Heroku Application
[https://cs326-s22-41-bitwikk.herokuapp.com/](https://cs326-s22-41-bitwikk.herokuapp.com/)
