import * as article from './article-viewmodel.js';
import { getUsername } from "./sessionUtils.js";

const searchResultText = document.getElementById("search-result-text");
const searchResultGrid = document.getElementById("search-result-grid");
const noMatchesText = document.getElementById("no-matches-text");

async function loadContent() {
    const params = new Proxy(new URLSearchParams(window.location.search), {
        get: (searchParams, prop) => searchParams.get(prop),
    });
    let query = params.query; // "some_value"

    searchResultText.innerText = `Showing results for: \"${query}\"`;

    let searchResults = await article.search(query);

    if(query !== undefined && searchResults !== undefined) {
        noMatchesText.innerText = "";

        searchResults.forEach(result => {
            const col = document.createElement("div");
            col.setAttribute("class","col");
            searchResultGrid.appendChild(col);
            
            const card = document.createElement("div");
            card.setAttribute("class","card shadow-sm");
            col.appendChild(card);

            const image = document.createElement("img");
            image.setAttribute("class", "bd-placeholder-img card-img-top");
            image.setAttribute("height", "225");
            image.setAttribute("src", result.image);
            card.appendChild(image);

            const cardBody = document.createElement("div");
            cardBody.setAttribute("class", "card-body");
            card.appendChild(cardBody);

            const resultTitle = document.createElement("h5");
            cardBody.appendChild(resultTitle);

            const aElem = document.createElement("a");
            aElem.setAttribute("href", `/article/${result.ID}`);
            aElem.innerText = result.title;
            resultTitle.appendChild(aElem);
        });
    }
    else  {

    }

}

await loadContent();