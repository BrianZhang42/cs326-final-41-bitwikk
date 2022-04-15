<h1>BitWikk Milestone 2</h1>

<h2>Division of Labor</h2>
Donald Hurld, DonaldHurldUni - <br>
Einar Klarlund, einarklarlund - <br>
Brian Zhang, BrianZhang42 - <br>
Neil Gupta, nog642 - <br>

APIs

Objects:
User - ID, Username, Email, Password
Article - ID, title, content, contributer, images, commentIDs, category
Comment - ID, userID, articleID, content

/index/
GET /category?name=category
GET /article/search?query=value
GET /article/get?name=value -
POST /article/create -
POST /article/edit
POST /article/comment -

POST /user/login
GET /user/get?userID=value  
POST /user/create
POST /user/edit
POST /user/delete
