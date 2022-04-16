import { articles } from "./fakedata.js";
import { getUser } from "./userUtil.js";

function generateArticleID(title) {
    // don't allow non-printable characters
    if (title.match(/\p{C}/u) !== null) {
        return [false, "Invalid characters in title"]
    }

    // replace spaces with underscores
    title = title.replace(" ", "_");

    // URL-encode the title
    return [true, encodeURI(title)];
}

export function createArticle(title, content, contributor, category) {
    if (!title) {
        return [false, {invalid: "title",
                        message: "Title cannot be empty"}];
    }
    if (!contributor) {
        // message is for the user, and this can only happen
        // if there is a bug in the client side code
        return [false, {invalid: "contributor",
                        message: "Unexpected error"}];
    }
    if (!category) {
        // message is for the user, and this can only happen
        // if there is a bug in the client side code
        return [false, {invalid: "category",
                        message: "Category is required"}];
    }
    if ((category != "game" && category != "console")) {
        return [false, {invalid: "category",
                        message: `category field must be either 'game' or 'console'.`}];
    }
    if (getUser(contributor) === undefined) {
        return [false, {invalid: "contributor",
                        message: `User ${contributor} does not exist`}];
    }

    const [titleValid, articleIDResult] = generateArticleID(title);
    if (!titleValid) {
        return [false, {invalid: "title",
                        message: articleIDResult}];
    }
    if (!articles.every(article => article.ID !== articleIDResult)) {
        return [false, {invalid: "title",
                        message: `/article/${articleIDResult} already exists`}];
    }

    // TODO: validate content

    const article = {
        ID: articleIDResult,
        title: title,
        content: content,
        contributers: [contributor],
        images: [], commentIDs: [],
        category: category
    }
    articles.push(article);
    return [true, article];
}

export function getArticle(articleID) {
    return articles.find(article => article.ID === articleID);
}

// get index of article in list
// (probably won't be needed after we have a databse)
function getArticleIndex(articleID) {
    return articles.findIndex(article => article.ID === articleID);
}

export function getCategory(category) {
    if ((category != "game" && category != "console")) {
        return [false, `category field must be either 'game' or 'console'.`];
    }
    const categoryArticles = articles.filter(article => article.category === category);

    // only return some keys, not all the content
    // maybe we will add preview data here later
    return [true, categoryArticles.map(article => ({
        ID: article.ID,
        title: article.title
    }))];
}
