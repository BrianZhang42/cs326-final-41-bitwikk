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


if(document.readyState !== "loading") {
    loadContent();
}
else {
    window.addEventListener("load", loadContent);
}

async function loadContent() {
    let articleID = window.location.pathname.substring(9);
    let currentArticle = await article.readArticle(articleID);
    
    // set title
    title.innerText = currentArticle.title;
    secondaryTitle.innerText = currentArticle.title;

    // set body content
    currentArticle.content.forEach(topicDetails => {
        let topicTitle = document.createElement("h2");
        topicTitle.innerText = topicDetails.title;
        content.appendChild(topicTitle);

        let topicDescription = document.createElement("p");
        topicDescription.innerText = topicDetails.body;
        content.appendChild(topicDescription);
    }); 

    // set contributors
    let contributorString = "Contributors: ";
    currentArticle.contributors.forEach(contributor => contributorString += `${contributor}, `)
    contributors.innerText = contributorString;
    
    // set details
    currentArticle.details.forEach(detail => {
        let listElem = document.createElement("li");
        let aElem = document.createElement("a");
        aElem.innerText = detail;
        aElem.setAttribute("href", "http://www.google.com");

        listElem.appendChild(aElem);
        details.appendChild(listElem);
    })

    // set related topics
    currentArticle.relatedTopics.forEach(topic => {
        let listElem = document.createElement("li");
        let aElem = document.createElement("a");
        aElem.innerText = topic;
        aElem.setAttribute("href", "http://www.google.com");

        listElem.appendChild(aElem);
        relatedTopics.appendChild(listElem);
    })

    // set images
    primaryImage.setAttribute("src", currentArticle.images[0]);
    console.log(currentArticle.images);
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

document.getElementById('editPage').addEventListener("click", editContent);

function editContent() {
    if (!document.getElementById('mainArt').isContentEditable) {
        document.getElementById('mainArt').contentEditable = true;
    } else {
        document.getElementById('mainArt').contentEditable = false;
    }
}

document.getElementById('post').addEventListener("click", async event => {
    // const comment = document.createElement('div');
    // comment.appendCHild(document.getElementById('comment').value);
    // document.getElementById('comment').value = '';
    // document.getElementById('csection').appendChild(comment);
});
