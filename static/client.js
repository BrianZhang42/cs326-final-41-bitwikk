import { getUsername } from "./sessionUtils.js";
const searchForm = document.getElementById("searchForm");
const signedOutBar = document.getElementById("signed-out-bar");
const signedInBar = document.getElementById("signed-in-bar");
const logout = document.getElementById("logout");

searchForm.addEventListener("submit", event => {
    window.location.href = "./search_result.html";
    event.preventDefault();
});

logout.addEventListener("click", async event => {
    const response = await fetch("/user/logout", {method: "POST"});
    // if (!response.ok) {
    //     alert(`Unexpected error: ${response.status} ${response.statusText} ${await response.text()}`);
    // }
    window.location.reload();
});

const username = getUsername();
if (username === undefined) {
    signedOutBar.hidden = false;
} else {
    signedInBar.hidden = false;
}
