import express from "express";
import { projectRoot, asyncRoute, asyncRouteWithBody, serve404 } from "./utils.js"
import { validateSession } from "./userUtil.js";
import { addComment, checkComment, checkEdit, editArticle, getArticle } from './articleUtil.js';

export const router = express.Router();

router.get("/:articleID", asyncRoute(async (request, response) => {
    // get rid of trailing slash
    if (request.path.endsWith("/")) {
        // TODO: change this to 301 or 308 maybe
        response.redirect(307, `/article/${request.params.articleID}`);
        return;
    }
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

router.get("/:articleID/edit", asyncRoute(async (request, response) => {
    if (!validateSession(request, response)) { return; }
    const article = getArticle(request.params.articleID);
    if (article === undefined) {
        serve404(response);
        return;
    }
    response.sendFile(`${projectRoot}/client/article_edit.html`);
}));

router.post("/:articleID/edit", asyncRouteWithBody({
    "articleID": "string",
    "title": "string",
    "content": "string"
}, async (request, response) => {
    if (!validateSession(request, response)) { return; }
    const success = editArticle(request.params.articleID, request.body);

    if (success) {
        response.status(200).end();
    } else {
        response.status(500).end();
    }
}));

router.post("/:articleID/comment", asyncRoute(async (request, response) => {
    if (!validateSession(request, response)) { return; }
    console.log(request);
    const [checkSuccess, checkResult] = await checkComment(request);
    console.log([checkSuccess, checkResult]);
    if (!checkSuccess) {
        response.status(400).json(checkResult);
        return;
    }
    const [success, result] = await addComment(request.params.articleID,
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
        const [checkSuccess, checkResult] = await checkComment(request);
        if (!checkSuccess) {
            response.status(400).json(checkResult);
            return;
        }
        const commentId = request.params.commentId;
        if (CommentExists(commentId)) {
          deleteComment(commentId);
          response.json({ success: `deleted comment ${commentId}` });
        } else {
          response.status(400).json({ error: "comment given does not exist" });
        }
      } catch (err) {
        console.log(err);
        response.status(400).send();
      }
}));