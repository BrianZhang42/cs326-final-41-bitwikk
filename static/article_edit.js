import * as article from "./article-viewmodel.js";

const title = document.getElementById("article-title");
const contentPreview = document.getElementById("article-preview");
const contentTextbox = document.getElementById("editBox");
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

saveButton.addEventListener("click", event => {
    article.updateArticle({content: contentTextbox.value});
});
