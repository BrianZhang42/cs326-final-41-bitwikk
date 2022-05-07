import * as article from './article-viewmodel.js';

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

let currentArticle = undefined;

if(document.readyState !== "loading") {
    loadContent();
}
else {
    window.addEventListener("load", loadContent);
}

async function loadContent() {
    const articleID = window.location.pathname.substring(9);
    currentArticle = await article.readArticle(articleID);

    // set title
    title.innerText = currentArticle.title;
    secondaryTitle.innerText = currentArticle.title;

    // set body content
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

    // set contributors
    let contributorString = "Contributors: ";
    currentArticle.contributors.forEach(contributor => contributorString += `${contributor}, `)
    contributors.innerText = contributorString;

    // set details
    currentArticle.details.forEach((detail, index) => {
        let listElem = document.createElement("li");
        let aElem = document.createElement("a");
        aElem.innerText = detail;
        aElem.setAttribute("href", "http://www.google.com");

        listElem.appendChild(aElem);
        listElem.setAttribute("id", `detail-${index}`);
        details.appendChild(listElem);
    })

    // set related topics
    currentArticle.relatedTopics.forEach((topic, index) => {
        let listElem = document.createElement("li");
        let aElem = document.createElement("a");
        aElem.innerText = topic;
        aElem.setAttribute("href", "http://www.google.com");

        listElem.appendChild(aElem);
        listElem.setAttribute("id", `related-topic-${index}`);
        relatedTopics.appendChild(listElem);
    })

    // set images
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

    // set title
    const DOMTitle = document.createElement("title");
    DOMTitle.innerText = `Bitwikk - ${articleID}`;
    document.head.appendChild(DOMTitle);

    // set edit button href
    document.getElementById("editPage").href = `/article/${articleID}/edit`;
}
