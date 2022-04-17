import express from "express";
import { projectRoot, asyncRoute, requireParams, serve404 } from "./utils.js"
import { addComment, checkComment, checkEdit, editArticle, getArticle } from './articleUtil.js';

export const router = express.Router();

router.get("/:articleID", asyncRoute(async (request, response) => {
    // make sure the article exists
    const article = getArticle(request.params.articleID);
    if (article === undefined) {
        serve404(response);
        return;
    }
    response.sendFile(`${projectRoot}/client/article_page.html`);
}));

router.get("/:articleID/get", asyncRoute(async (request, response) => {
    const article = getArticle(request.params.articleID);
    if (article === undefined) {
        response.status(404).end();
        return;
    }
    response.json(article);
}));

router.post("/:articleID/edit", asyncRoute(async (request, response) => {
    if (!validateSession(request, response)) { return; }
    const [checkSuccess, checkResult] = checkEdit(req.body);
    if (!checkSuccess) {
        response.status(400).json(checkResult);
        return;
    }
    const success = editArticle(request.params.articleID,
                                ...checkResult);
    if (success) {
        response.status(200).end();
    } else {
        response.status(500).end();
    }
}));

router.post("/:articleID/comment", asyncRoute(async (request, response) => {
    if (!validateSession(request, response)) { return; }
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

router.delete("/:articleID/comment/:commentId", asyncRoute(async (request, response) => {
    if (!validateSession(request, response)) { return; }
    // TODO: check that user is editing their own comment
    try {
        const [checkSuccess, checkResult] = checkComment(request.body);
        if (!checkSuccess) {
            response.status(400).json(checkResult);
            return;
        }
        const commentId = request.params.commentId;
        if (CommentExists(commentId)) {
          deleteComment(commentId);
          res.json({ success: `deleted comment ${commentId}` });
        } else {
          res.status(400).json({ error: "comment given does not exist" });
        }
      } catch (err) {
        console.log(err);
        res.status(400).send();
      }
}));