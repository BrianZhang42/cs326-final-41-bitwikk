# BitWikk Milestone 3

## Division of Labor

Donald Hurld, DonaldHurldUni - final.md writeup, backend work

Einar Klarlund, einarklarlund - Database schemas and setup

Brian Zhang, BrianZhang42 - Database schemas and documentation

Neil Gupta, nog642 - Database and backend work

## Database Documentation

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