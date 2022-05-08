# BitWikk Milestone 3

## Division of Labor

Donald Hurld, DonaldHurldUni - final.md writeup, backend work, video script, video recording

Einar Klarlund, einarklarlund - Database hookups, both client and server side

Brian Zhang, BrianZhang42 - Database schemas and documentation, video editing

Neil Gupta, nog642 - Article editing and creation, markdown rendering, server side clean up

## Database Documentation

User Document<br/>
{<br/>
    &nbsp;`username: String,`           &nbsp;The username of a user<br/>
    &nbsp;`password: String`            &nbsp;The password of a user<br/>
}

Session Document<br/>
{<br/>
    &nbsp;`ID: String,`                 &nbsp;The session ID (random server-generated UUID)<br/>
    &nbsp;`username: String,`           &nbsp;The username associated with the session<br/>
    &nbsp;`expiry: Date`                &nbsp;The date and time the session expires<br/>
}

Article Document<br/>
{<br/>
    &nbsp;`ID: String,`                 &nbsp;The ID of an article document (part of the URL)<br/>
    &nbsp;`title: String,`              &nbsp;The title of the article<br/>
    &nbsp;`content: String,`            &nbsp;The main content of the article as markdown<br/>
    &nbsp;`contributors: String Array,` &nbsp;The users who contributed to the article<br/>
    &nbsp;`images: String Array,`       &nbsp;Array of image URLs for the article gallery<br/>
    &nbsp;`commentIDs: String Array,`   &nbsp;Array of IDs for the comments on the article<br/>
    &nbsp;`category: String`            &nbsp;The category the article is in (game/console)<br/>
}

Comment Document<br/>
{<br/>
    &nbsp;`ID: String,`                 &nbsp;The ID of the comment<br/>
    &nbsp;`username: String,`           &nbsp;The username of the user who wrote the comment<br/>
    &nbsp;`articleID: String,`          &nbsp;The ID for the article the comment is located in<br/>
    &nbsp;`content: String`             &nbsp;The content of the comment<br/>
}
