import { getUsername } from "./sessionUtils.js";
const searchForm = document.getElementById("searchForm");
const signedOutBar = document.getElementById("signed-out-bar");
const signedInBar = document.getElementById("signed-in-bar");

searchForm.addEventListener("submit", event => {
    window.location.href = "./search_result.html";
    event.preventDefault();
});

const username = getUsername();
if (username === undefined) {
    signedOutBar.hidden = false;
} else {
    signedInBar.hidden = false;
}
