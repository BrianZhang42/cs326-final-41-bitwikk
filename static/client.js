const searchForm = document.getElementById("searchForm");
const signedOutBar = document.getElementById("signed-out-bar");
const signedInBar = document.getElementById("signed-in-bar");

searchForm.addEventListener("submit", event => {
    window.location.href = "./search_result.html";
    event.preventDefault();
});

(async () => {
    console.log(signedOutBar);
    signedOutBar.hidden = false;
    console.log(document.cookie);
})();
