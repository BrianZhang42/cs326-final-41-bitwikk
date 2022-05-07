import * as article from './article-viewmodel.js';
import { getUsername } from "./sessionUtils.js";
import * as user from './user-viewmodel.js';

const title = document.getElementById("article-title");
const secondaryTitle = document.getElementById("article-title-secondary");
const content = document.getElementById("article-content");
const contributors = document.getElementById("article-contributors");
const details = document.getElementById("article-details");
const primaryImage = document.getElementById("article-primary-image");
const relatedTopics = document.getElementById("article-related-topics");
const activeCarouselImages = document.getElementById("article-active-image-carousel");
const inactiveCarouselImages = document.getElementById("article-inactive-image-carousel");
const categories = document.getElementById("article-categories");
const comments = document.getElementById("article-comments");
const commentTextInput = document.getElementById("comment-text-input");
const commentSubmitButton = document.getElementById("comment-submit-button");
let currentArticle = undefined;

commentSubmitButton.addEventListener("click", submitComment);

async function submitComment() {
    let username = getUsername();
    if(username !== undefined) {
        await article.addComment({
            articleID: currentArticle.ID,
            username: username, 
            content: commentTextInput.value});    
    }
}

async function loadContent() {
    const articleID = window.location.pathname.substring(9);
    currentArticle = await article.readArticle(articleID);

    // set title
    title.innerText = currentArticle.title;
    secondaryTitle.innerText = currentArticle.title;
    const DOMTitle = document.createElement("title");
    DOMTitle.innerText = `Bitwikk - ${articleID}`;
    document.head.appendChild(DOMTitle);

    // set body content
    if(currentArticle.content !== undefined)
    {
        currentArticle.content.forEach((topicDetails, index) => {
            let topicTitle = document.createElement("h2");
            topicTitle.setAttribute("id", `topic-title-${index}`);
            content.appendChild(topicTitle);
            if(topicDetails.title != undefined)
                topicTitle.innerText = topicDetails.title;
    
            let topicBody = document.createElement("p");
            topicBody.setAttribute("id", `topic-body-${index}`);
            content.appendChild(topicBody);
            if(topicDetails.body != undefined)
                topicBody.innerText = topicDetails.body;
    
        });
    }

    // set contributors
    let contributorString = "Contributors: ";
    if(currentArticle.contributors !== undefined)
    {
        currentArticle.contributors.forEach(contributor => contributorString += `${contributor}, `)
    }
    contributors.innerText = contributorString;

    // set details
    if(currentArticle.details !== undefined)
    {    
        currentArticle.details.forEach((detail, index) => {
            let listElem = document.createElement("li");
            let aElem = document.createElement("a");
            aElem.innerText = detail;
            aElem.setAttribute("href", "http://www.google.com");

            listElem.appendChild(aElem);
            listElem.setAttribute("id", `detail-${index}`);
            details.appendChild(listElem);
        })
    }

    // set related topics
    if(currentArticle.relatedTopics !== undefined)
    {
        currentArticle.relatedTopics.forEach((topic, index) => {
            let listElem = document.createElement("li");
            let aElem = document.createElement("a");
            aElem.innerText = topic;
            aElem.setAttribute("href", "http://www.google.com");

            listElem.appendChild(aElem);
            listElem.setAttribute("id", `related-topic-${index}`);
            relatedTopics.appendChild(listElem);
        })
    }
    // set images
    if(currentArticle.images !== undefined)
    {    
        primaryImage.setAttribute("src", currentArticle.images[0]);
        currentArticle.images.forEach((image, index) => {
            let carousel = index < 3 ? activeCarouselImages : inactiveCarouselImages;
            let colDiv = document.createElement("div");
            let img = document.createElement("img");

            colDiv.setAttribute("class", "col")
            colDiv.appendChild(img);

            img.setAttribute("class", "img-fluid");
            img.setAttribute("src", image);

            carousel.appendChild(colDiv);
        })
    }

    // set comments
    if(currentArticle.comments !== undefined)
    {
        currentArticle.comments.forEach((comment, index) => {
            let card = document.createElement("div");
            card.setAttribute("class", "card");

            let cardBody = document.createElement("div");
            cardBody.setAttribute("class", "card-body");
            card.appendChild(cardBody);

            let content = document.createElement("p");
            content.innerText = comment.content;
            cardBody.appendChild(content);

            let username = document.createElement("p");
            username.setAttribute("class", "small mb-0 ms-2");
            username.innerText = comment.username;
            cardBody.appendChild(username);

            comments.appendChild(card);
        });
    }

    // set edit button href
    document.getElementById("editPage").href = `/article/${articleID}/edit`;
}

loadContent();