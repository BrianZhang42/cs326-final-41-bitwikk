<h1>BitWikk Milestone 2</h1>

<h2>Division of Labor</h2>
Donald Hurld, DonaldHurldUni - server.js get/post functions<br>
Einar Klarlund, einarklarlund - <br>
Brian Zhang, BrianZhang42 - <br>
Neil Gupta, nog642 - <br>

Objects:
User - {username, password (hash and salt)}
Article - ID (based on title), title, content, contributers, images (for gallery), commentIDs, category}
Comment - {ID, username, articleID, content}

API:

Note: The article content will be stored as markdown and will need to be translated into html. It could be done on the client or the server side.

GET  /article/{ID} serves the static article_page.html

GET  /article/{ID}/get returns a JSON with article content
POST /create
        Requires login (cookie header)
        Body: {title: title, content: content}
UPDATE /article/{ID}/edit
        Requires login (cookie header)
        Body: {content: content}
POST /article/{ID}/comment -
        Requires login (cookie header)
        Body: {content: content}

GET  /search?query={query}
GET  /category/{category}

POST /user/login
        Body: {username: username, password: password (plaintext)}
POST /user/logout
        Requires login (cookie header)
GET  /user/get?user={username}
POST /user/create
        Body: {username: username, password: password (plaintext)}
UPDATE /user/edit
        Requires login (cookie header)
        Body: {username: username, ...additional fields}
DELETE /user/delete?user={username}
        Requires login (cookie header)

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
<img src="#" height="500px">
<br>
Demonstrates the Update Operation by allowing the user to edit an article page and update any information they see fit.

<h3>Delete User</h3>
<img src="#" height="500px">
<br>
Demonstrates the Delete Operation by allowing the user to delete their own account after they register and are logged in.