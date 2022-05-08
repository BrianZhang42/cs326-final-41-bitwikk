# BitWikk Milestone 3

## Division of Labor

Donald Hurld, DonaldHurldUni - final.md writeup, backend work, video script, video recording

Einar Klarlund, einarklarlund - Database schemas and setup

Brian Zhang, BrianZhang42 - Database schemas and documentation

Neil Gupta, nog642 - Database and backend work

## Database Documentation

User Document<br/>
{<br/>
    &nbsp;`username: String,`           &nbsp;The username of a user<br/>
    &nbsp;`password: String`            &nbsp;The password of a user<br/>
}

Session Document<br/>
{<br/>
    &nbsp;`ID: String,`                 &nbsp;The ID of a user's session<br/>
    &nbsp;`username: String,`           &nbsp;The username of the session user<br/>
    &nbsp;`expiry: Date`                &nbsp;The time the session expires<br/>
}

Article Document<br/>
{<br/>
    &nbsp;`ID: String,`                 &nbsp;The ID of an article document<br/>
    &nbsp;`title: String,`              &nbsp;The title of the article<br/>
    &nbsp;`content: String,`            &nbsp;The main content of the article<br/>
    &nbsp;`contributers: String Array,` &nbsp;The users who created the article<br/>
    &nbsp;`images: String Array,`       &nbsp;Array of image links in the article<br/>
    &nbsp;`commentIDs: String Array,`    &nbsp;Array of IDs for the comments in the article<br/>
    &nbsp;`category: String`            &nbsp;The category the article is in<br/>
}

Comment Document<br/>
{<br/>
    &nbsp;`ID: String,`                 &nbsp;The ID of the comment<br/>
    &nbsp;`username: String,`           &nbsp;The username of the user who wrote the comment<br/>
    &nbsp;`articleID: String,`          &nbsp;The ID for the article the comment is located in<br/>
    &nbsp;`content: String`             &nbsp;The content of the comment<br/>
}
