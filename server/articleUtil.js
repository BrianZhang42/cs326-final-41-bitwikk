import { articles, comments } from "./fakedata.js";
import { CommentDB } from "./model.js";
import { getUser } from "./userUtil.js";
import { randomUUID } from "crypto";

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

export async function createArticle(title, content, contributor, category) {
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
    if (await getUser(contributor) === undefined) {
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
    let article = articles.find(article => article.ID === articleID)
    return article;
}

// get index of article in list
// (probably won't be needed after we have a databse)
function getArticleIndex(articleID) {
    return articles.findIndex(article => article.ID === articleID);
}

const editFormDataAttrs = ["articleID", "title", "content"];
export function checkEdit(formData) {
    for (const attr of editFormDataAttrs) {
        if (!formData[attr]) {
            return [false, {invalid: attr,
                            message: `${attr} cannot be empty`}];
        }
    }
    const {articleID, title, body} = formData;

    if (getArticle(articleID) === undefined) {
        return [false, {invalid: "articleID",
                        message: "Article does not exist"}];
    }
    // TODO: validate body content
    return [true, [articleID, title, body]];
}

export function editArticle(articleID, newArticle) {
    // TODO: actually implement editing
    let article = articles[getArticleIndex(articleID)]
    Object.keys(newArticle).forEach(key => {
        article[key] = newArticle[key];
    });

    return true;
}

const commentFormDataAttrs = ["username", "content"];
export async function checkComment(formData) {
    for (const attr of commentFormDataAttrs) {
        if (!formData.hasOwnProperty(attr)) {
            return [false, {invalid: attr,
                            message: `Missing required attribute: ${attr}`}]
        }
    }
    for (const attr of commentFormDataAttrs) {
        if (!formData[attr]) {
            return [false, {invalid: attr,
                            message: `${attr} cannot be empty`}];
        }
    }
    const {articleID, title, body} = formData;

    if (await getUser(formData.username) === undefined) {
        return [false, {invalid: "username",
                        message: `User ${username} does not exist`}];
    }
    // TODO: validate content
    return [true, [formData.username, formData.content]];
}

export async function addComment(articleID, username, content) {
    if (getArticle(articleID) === undefined) {
        return [false, {message: "Article does not exist"}];
    }

    // TODO: add the new commentId to the article's list of commentIDs
    let commentId = randomUUID();
    const commentBody = {
        ID: commentId,
        username: username,
        articleID: articleID,
        content: content
    }

    const newComment = new CommentDB(commentBody);
    // save the comment to database
    newComment.save(err => {
        if (err) throw err;
    });

    return [true, commentBody]
}

export async function deleteComment(commentId) {
    if(!(await CommentDB.exists({ "ID": commentId }))) {
        return false;
    }

    await CommentDB.deleteOne({ "ID": commentId });
    await CommentDB.save();
}

export async function CommentExists(commentId) {
    return await CommentDB.exists({ "ID": commentId });
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

export function searchArticles(query) {
    const categoryArticles = articles.filter(article =>
        // TODO: make this case insensitive, at least
        article.title.includes(query)
    );

    // only return some keys, not all the content
    // maybe we will add preview data here later
    return [true, categoryArticles.map(article => ({
        ID: article.ID,
        title: article.title
    }))];
}

export function getRandomArticle() {
    const article = articles[Math.floor(Math.random() * articles.length)];
    return {
        ID: article.ID,
        title: article.title
    };
}
