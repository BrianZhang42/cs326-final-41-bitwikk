import * as article from "./article-viewmodel.js";
import { getUsername } from "./sessionUtils.js";

const articleTitleInput = document.getElementById("articleTitleInput");
const categoryInput = document.getElementById("categoryInput");
const contentTextbox = document.getElementById("editBox");
const contentPreview = document.getElementById("article-preview");
const galleryTextbox = document.getElementById("galleryEditBox");
const createArticleButton = document.getElementById("createArticleButton");

contentTextbox.addEventListener("input", event => {
    contentPreview.innerHTML = marked.parse(contentTextbox.value);
});

createArticleButton.addEventListener("click", async event => {
    const response = await article.createArticle({
        title: articleTitleInput.value,
        category: categoryInput.value,
        content: contentTextbox.value,
        images: galleryTextbox.value.split("\n").map(s => s.trim()).filter(s => s)
    });
    console.log(response);
    if (response !== null && response.ok) {
        window.location.href = `/article/${articleID}`;
    } else {
        alert("Sorry, there was an error");
    }
});

if (getUsername() === undefined) {
    window.location.href = "/login";
} else {
    // enable the submit button
    createArticleButton.classList.remove("disabled");
    createArticleButton.setAttribute("aria-disabled", false);
}
