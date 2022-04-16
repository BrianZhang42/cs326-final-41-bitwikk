<h1>BitWikk Milestone 2</h1>

<h2>Division of Labor</h2>
Donald Hurld, DonaldHurldUni - server.js get/post functions<br>
Einar Klarlund, einarklarlund - <br>
Brian Zhang, BrianZhang42 - <br>
Neil Gupta, nog642 - <br>

Objects:
User - {username, password (hash and salt)}
Article - PID (based on title), title, content, contributers, images (for gallery), commentIDs, category}
Comment - {ID, username, articleID, content}

API:

Note: The article content will be stored as markdown and will need to be translated into html. It could be done on the client or the server side.

GET  /article/{ID}
POST /create
        Requires login (cookie header)
        Body: {title: title, content: content}
POST /article/edit
        Requires login (cookie header)
        Body: {content: content}
POST /article/comment -
        Requires login (cookie header)
        Body: {article: ID, content: content}

GET  /search?query={query}
GET  /category/{category}

POST /user/login
        Body: {username: username, password: password (plaintext)}
GET  /user/get?user={username}
POST /user/create
        Body: {username: username, password: password (plaintext)}
POST /user/edit
        Body: {username: username, ...additional fields}
POST /user/delete?user={username}
