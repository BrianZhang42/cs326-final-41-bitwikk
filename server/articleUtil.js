import { articles, comments } from "./fakedata.js";
import { ArticleDB, CommentDB } from "./model.js";
import { getUser } from "./userUtil.js";
import { randomUUID } from "crypto";

// let articleBody1 = articles[0];
// let articleBody2 = articles[1];
// let article1 = new ArticleDB(articleBody1);
// let article2 = new ArticleDB(articleBody2);
// article1.save();
// article2.save();

function generateArticleID(title) {
    // don't allow non-printable characters
    if (title.match(/\p{C}/u) !== null) {
        return [false, "Invalid characters in title"]
    }

    // replace spaces with underscores
    title = title.replace(/ /g, "_");

    // URL-encode the title
    return [true, encodeURI(title)];
}

export async function createArticle(title, content, contributor, category, images) {
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
    if (await ArticleDB.exists({ "ID": articleIDResult })) {
        return [false, {invalid: "title",
                        message: `/article/${articleIDResult} already exists`}];
    }

    // TODO: validate content

    const articleBody = {
        ID: articleIDResult,
        title: title,
        content: content,
        contributors: [contributor],
        images: images,
        commentIDs: [],
        category: category
    }

    const article = new ArticleDB(articleBody);
    article.save();

    return [true, articleBody];
}

export async function getArticle(articleID) {
    if(!(await ArticleDB.exists({ 'ID': articleID }))){
        return undefined;
    }

    return await ArticleDB.findOne({ 'ID' : articleID });;
}

// get index of article in list
// (probably won't be needed after we have a databse)
function getArticleIndex(articleID) {
    return articles.findIndex(article => article.ID === articleID);
}

const editFormDataAttrs = ["articleID", "title", "content"];
export async function checkEdit(formData) {
    for (const attr of editFormDataAttrs) {
        if (!formData[attr]) {
            return [false, {invalid: attr,
                            message: `${attr} cannot be empty`}];
        }
    }
    const {articleID, title, body} = formData;

    if (!(await ArticleDB.exists({ 'ID': articleID }))) {
        return [false, {invalid: "articleID",
                        message: "Article does not exist"}];
    }
    // TODO: validate body content
    return [true, [articleID, title, body]];
}

export async function editArticle(articleID, newArticle) {
    if(!(await ArticleDB.exists({ 'ID': articleID }))) {
        return false;
    }

    let article = await ArticleDB.findOne({ 'ID': articleID });
    Object.keys(newArticle).forEach(key => {
        article[key] = newArticle[key];
    });

    // save the changes
    await article.save(err => {
        if (err) throw err;
    });

    return true;
}

export async function checkComment(request) {
    if (!request.body.content) {
        return [false, {invalid: "content",
                        message: `${content} cannot be empty`}];
    }
    // TODO: validate content
    return [true, [request.cookies.user, request.body.content]];
}

export async function addComment(articleID, username, content) {
    let commentedArticle = await getArticle(articleID);
    if (commentedArticle === undefined) {
        return [false, {message: "Article does not exist"}];
    }

    let commentID = randomUUID();
    const commentBody = {
        ID: commentID,
        username: username,
        articleID: articleID,
        content: content
    }

    const newComment = new CommentDB(commentBody);
    // save the comment to database
    await newComment.save(err => {
        if (err) throw err;
    });

    // add the new comment's id to the article
    if(commentedArticle.commentIDs === undefined) {
        commentedArticle.commentIDs = [];
    }
    commentedArticle.commentIDs.push(commentID);
    await commentedArticle.save(err => {
        if(err) throw err;
    });

    return [true, commentBody]
}

export async function getComment(commentId) {
    if(!(await CommentDB.exists({ 'ID': commentId }))) {
        return undefined;
    }

    return await CommentDB.findOne({ 'ID' : commentId });
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

export async function searchArticles(query) {
    const categoryArticles = articles.filter(article =>
        // TODO: make this case insensitive, at least
        article.title.includes(query)
    );

    let results = await ArticleDB.find({$text: {$search: query}})
       .limit(10);

    // only return some keys, not all the content
    // maybe we will add preview data here later
    return [true, results.map(article => ({
        ID: article.ID,
        title: article.title,
        image: article.images[0]
    }))];
}

export async function getRandomArticle() {
    const count = await ArticleDB.count();
    const idx = Math.floor(Math.random() * count);
    return await ArticleDB.findOne().skip(idx);
}
