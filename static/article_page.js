import * as article from './article-viewmodel.js';

const title = document.getElementById("article-title");
const content = document.getElementById("article-content");
const contributors = document.getElementById("article-contributors");
const categories = document.getElementById("article-categories");
const comments = document.getElementById("article-comments");
const images = document.getElementById("article-images");

window.addEventListener("load", async event => {
    let articleID = window.location.pathname.substring(9);
    let currentArticle = await article.readArticle(articleID);

    title.innerText = currentArticle.title;
    content.innerText = currentArticle.content;
    // contributors.innerText = "Contributors: " + currentArticle.contributors;
    contributors.innerText = "Contributors: " + currentArticle.contributers;
    categories.innerText = currentArticle.category;
});
