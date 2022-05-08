import * as article from './article-viewmodel.js';
import { getUsername } from "./sessionUtils.js";

const title = document.getElementById("article-title");
const secondaryTitle = document.getElementById("article-title-secondary");
const contentDOM = document.getElementById("article-content");
const contributors = document.getElementById("article-contributors");
const primaryImage = document.getElementById("article-primary-image");
const activeCarouselImages = document.getElementById("article-active-image-carousel");
const inactiveCarouselImages = document.getElementById("article-inactive-image-carousel");
const category = document.getElementById("article-category");
const comments = document.getElementById("article-comments");
const commentTextInput = document.getElementById("comment-text-input");
const commentSubmitButton = document.getElementById("comment-submit-button");
const editButton = document.getElementById("editPage");

let currentArticle = undefined;

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
    if (currentArticle.content !== undefined) {
        contentDOM.innerHTML = marked.parse(currentArticle.content);
    }

    // set contributors
    let contributorString = "Contributors: ";
    if (currentArticle.contributors !== undefined) {
        contributorString += currentArticle.contributors.join(", ");
    }
    contributors.innerText = contributorString;

    // set category
    if (currentArticle.category !== undefined) {
        let olElem = document.createElement("ol");
        olElem.innerText = currentArticle.category;
        category.appendChild(olElem);
    }

    // set images
    if (currentArticle.images !== undefined) {
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
    if (currentArticle.commentIDs !== undefined) {
        currentArticle.commentIDs.forEach( async (commentID, index) => {
            let comment = await article.getComment(currentArticle.ID, commentID);
            if (comment === null) {
                // there was an error leading the comment
                return;
            }

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

    if (getUsername() !== undefined) { // if the user is logged in

        // enable the edit button
        editButton.classList.remove("disabled");
        editButton.setAttribute("aria-disabled", false);
        editButton.href = `/article/${articleID}/edit`;

        // enable comment submit
        commentSubmitButton.classList.remove("disabled");
        commentSubmitButton.setAttribute("aria-disabled", false);
        commentSubmitButton.addEventListener("click", async event => {
            if (getUsername() === undefined) {
                // TODO: make the post comment button disabled
            } else {
                await article.addComment(articleID, {content: commentTextInput.value});
            }
        });
    }
}

await loadContent();
