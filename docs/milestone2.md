<h1>BitWikk Milestone 2</h1>

<h2>Division of Labor</h2>
Donald Hurld, DonaldHurldUni - server.js get/post functions<br>
Einar Klarlund, einarklarlund - <br>
Brian Zhang, BrianZhang42 - <br>
Neil Gupta, nog642 - <br>

APIs

Objects:
User - ID, Username, Email, Password (hash and salt)
Article - ID, title, content, contributers, images (for gallery), commentIDs, category
Comment - ID, username, articleID, content

Note: The article content will be storeed as markdown and will need to be translated into html. It could be done on the client or the server side.

GET  /category?name=category -
GET  /article/search?query=value
GET  /article/get?name=value -
POST /article/create -
POST /article/edit - 
POST /article/comment -

POST /user/login
GET  /user/get?user=value  
POST /user/create
POST /user/edit
POST /user/delete?user=value
