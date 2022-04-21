<h1>BitWikk Milestone 2</h1>

<h2>Division of Labor</h2>
Donald Hurld, DonaldHurldUni - server.js and routing functions<br>
Einar Klarlund, einarklarlund - JavaScript functions, article page functionality, models<br>
Brian Zhang, BrianZhang42 - Markdown files, Client/CRUD utility functions, HTML/CSS pages<br>
Neil Gupta, nog642 - Login/registration, random articles, Heroku<br>

Objects:
User - {username, password (hash and salt)}
Article - ID (based on title), title, content, contributers, images (for gallery), commentIDs, category}
Comment - {ID, username, articleID, content}

API:

GET  /article/{ID} serves the static article_page.html

GET  /article/{ID}/get returns a JSON with article content
POST /create<br>
        Requires login (cookie header)<br>
        Body: {title: title, content: content}<br>
UPDATE /article/{ID}/edit<br>
        Requires login (cookie header)<br>
        Body: {content: content}<br>
POST /article/{ID}/comment<br>
        Requires login (cookie header)<br>
        Body: {content: content}<br>

GET  /search?query={query}
GET  /category/{category}

POST /user/login<br>
        Body: {username: username, password: password (plaintext)}<br>
POST /user/logout<br>
        Requires login (cookie header)<br>
GET  /user/get?user={username}<br>
POST /user/create<br>
        Body: {username: username, password: password (plaintext)}<br>
UPDATE /user/edit<br>
        Requires login (cookie header)<br>
        Body: {username: username, ...additional fields}<br>
DELETE /user/delete?user={username}<br>
        Requires login (cookie header)<br>

<h3>Register Page</h3>
<img src="../static/imgs/Register1.png" height="500px">
<img src="../static/imgs/register2.png" height="500px">
<br>
Demonstrates the Create Operation by allowing a user to create an account in which the user inputs a username and
password that is stored.

<h3>Login Page</h3>
<img src="../static/imgs/login1.png" height="500px">
<img src="../static/imgs/login2.png" height="200px">
<br>
Demonstrates the Read Operation by finding a user that has registered and allowing them to login to their account 
in which the sign in/sign up buttons become signed in/sign out.

<h3>Edit Page</h3>
<img src="imgs/edit1.png" height="500px">
<img src="imgs/edit2.png" height="500px">
<br>
Demonstrates the Update Operation by allowing the user to edit an article page and update any information they see fit.

<h3>Delete User</h3>
<img src="#" height="500px">
<br>
Demonstrates the Delete Operation by allowing the user to delete their own profile after they register and are logged in.