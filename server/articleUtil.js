import { articles } from "./fakedata.js";
import { getUser } from "./userUtil.js";

function generateArticleID(title) {
    // TODO
    return title;
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
    const articleID = generateArticleID(title);
    // TODO: validate content
    const article = {
        ID: articleID,
        title: title,
        content: content,
        contributers: [contributor],
        images: [], commentIDs: [],
        category: category
    }
    articles.push(article);
    return [true, article];
}