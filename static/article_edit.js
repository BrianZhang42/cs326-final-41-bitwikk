import * as article from "./article-viewmodel.js";

const title = document.getElementById("article-title");
const contentPreview = document.getElementById("article-preview");
const contentTextbox = document.getElementById("editBox");
const galleryTextbox = document.getElementById("galleryEditBox");
const saveButton = document.getElementById("saveChanges");

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

contentTextbox.value = currentArticle.content;
contentPreview.innerHTML = marked.parse(contentTextbox.value);
galleryTextbox.value = currentArticle.images.join("\n");

saveButton.addEventListener("click", async event => {
    const response = await article.updateArticle(articleID, {content: contentTextbox.value});
    console.log(response);
    if (response !== null && response.ok) {
        window.location.href = `/article/${articleID}`;
    } else {
        alert("Sorry, there was an error");
    }
});
