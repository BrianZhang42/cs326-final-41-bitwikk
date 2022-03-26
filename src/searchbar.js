const searchForm = document.getElementById("searchForm");
searchForm.addEventListener("submit", event => {
    window.location.href = "./search_result.html";
    event.preventDefault();
});
