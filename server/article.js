import express from "express";
import { projectRoot, asyncRoute, requireParams } from "./utils.js"
import { addComment, checkComment, checkEdit, editArticle, getArticle } from './articleUtil.js';

export const router = express.Router();

router.get("/:articleID", asyncRoute(async (request, response) => {
    // make sure the article exists
    const article = getArticle(request.params.articleID);
    if (article === undefined) {
        response.status(404).sendFile(`${projectRoot}/static/404.html`);
        return;
    }
    response.sendFile(`${projectRoot}/static/article_page.html`);
}));

router.get("/get", asyncRoute(async (request, response) => {
    if (!requireParams(request.query, ["id"], response)) {
        return;
    }
    const article = getArticle(request.query.id);
    if (article === undefined) {
        response.status(404).end();
        return;
    }
    response.json(article);
}));

router.post("/:articleID/edit", asyncRoute(async (request, response) => {
    const [checkSuccess, checkResult] = checkEdit(req.body);
    if (!checkSuccess) {
        response.status(400).json(checkResult);
        return;
    }
    const success = editArticle(request.params.articleID,
                                ...checkResult);
    if (success) {
        resposne.status(200).end();
    } else {
        resposne.status(500).end();
    }
}));

router.post("/:articleID/comment", asyncRoute(async (request, response) => {
    const [checkSuccess, checkResult] = checkComment(req.body);
    if (!checkSuccess) {
        response.status(400).json(checkResult);
        return;
    }
    const [success, result] = addComment(request.params.articleID,
                                         ...checkResult);
    if (success) {
        response.json(result);
    } else {
        response.status(400).json(result);
    }
}));
