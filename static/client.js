import * as article from './article-viewmodel.js';
import * as user from './user-viewmodel.js';

const searchForm = document.getElementById("searchForm");
searchForm.addEventListener("submit", event => {
    window.location.href = "./search_result.html";
    event.preventDefault();
});
