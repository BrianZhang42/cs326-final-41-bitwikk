import * as article from "./article-viewmodel.js";

const title = document.getElementById("article-title");
const contentPreview = document.getElementById("article-preview");
const contentTextbox = document.getElementById("editBox");

const articleID = window.location.pathname.slice(9, -5);
const currentArticle = await article.readArticle(articleID);

// set title
title.innerText = currentArticle.title;
const DOMTitle = document.createElement("title");
DOMTitle.innerText = `Bitwikk - Editing ${currentArticle.title}`;
document.head.appendChild(DOMTitle);

contentTextbox.addEventListener("input", event => {
    contentPreview.innerHTML = marked.parse(contentTextbox.value);
});

// document.getElementById('post').addEventListener("click", async event => {
//     // const comment = document.createElement('div');
//     // comment.appendCHild(document.getElementById('comment').value);
//     // document.getElementById('comment').value = '';
//     // document.getElementById('csection').appendChild(comment);
//     if(currentArticle == undefined) {
//         console.error(`no article was loaded while submitting article edit.`);
//     }

//     let children = content.childNodes;
//     let topicTitles = [];
//     let topicBodies = [];
//     children.forEach((child, index) => {
//         if(child.id === undefined || child.innerText == undefined)
//             return;

//         if(child.id.substring(0, 12) === "topic-title-") {
//             let topicNum = child.id.substring(12, 13);
//             topicTitles[topicNum] = child.innerText;
//         }
//         else if(child.id.substring(0, 11) === "topic-body-") {
//             let topicNum = child.id.substring(11, 12);
//             topicBodies[topicNum] = child.innerText;
//         }
//     });

//     if(topicBodies.length != topicTitles.length) {
//         console.error("While generating article update request body, didn't find an equal "
//             + "number of article topic titles and article topic bodies.");
//         return;
//     }

//     let newContent = [];
//     topicBodies.forEach((body, index) => {
//         let title = topicTitles[index];
//         newContent.push({title: title, body: body});
//     });

//     let formData = {
//         ID: currentArticle.ID,
//         title: title.innerText,
//         content: newContent,
//     }

//     article.updateArticle(formData);
// });
