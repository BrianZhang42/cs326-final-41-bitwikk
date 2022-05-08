import express from "express";
import { projectRoot, serve404 } from "./utils.js"
import { bwroute } from "./bwroute.js";
import { addComment, checkComment, checkEdit, editArticle, getArticle, getComment, searchArticles } from './articleUtil.js';

export const router = express.Router();

router.get("/:articleID", bwroute({
    requiresLogin: false,
    requiredQueryParameters: [],
    bodySchema: null,
    handler: async (request, response) => {
        // get rid of trailing slash
        if (request.path.endsWith("/")) {
            // TODO: change this to 301 or 308 maybe
            response.redirect(307, `/article/${request.params.articleID}`);
            return;
        }
        // make sure the article exists
        const article = await getArticle(request.params.articleID);
        if (article === undefined) {
            serve404(response);
            return;
        }
        response.sendFile(`${projectRoot}/client/article_page.html`);
    }
}));

router.get("/:articleID/get", bwroute({
    requiresLogin: false,
    requiredQueryParameters: [],
    bodySchema: null,
    handler: async (request, response) => {
        const article = await getArticle(request.params.articleID);
        if (article === undefined) {
            response.status(404).end();
            return;
        }
        response.json(article);
    }
}));

router.get("/:articleID/edit", bwroute({
    requiresLogin: true,
    requiredQueryParameters: [],
    bodySchema: null,
    handler: async (request, response) => {
        const article = getArticle(request.params.articleID);
        if (article === undefined) {
            serve404(response);
            return;
        }
        response.sendFile(`${projectRoot}/client/article_edit.html`);
    }
}));

router.post("/:articleID/edit", bwroute({
    requiresLogin: true,
    requiredQueryParameters: [],
    bodySchema: {
        content: "string",
        images: ["string"]
    },
    handler: async (request, response, username) => {
        const success = await editArticle(request.params.articleID, {
            content: request.body.content,
            images: request.body.images
        }, username);
        if (success) {
            response.status(200).end();
        } else {
            response.status(400).end();
        }
    }
}));

router.get("/:articleID/comment/:commentId", bwroute({
    requiresLogin: false,
    requiredQueryParameters: [],
    bodySchema: null,
    handler: async (request, response) => {
        const comment = await getComment(request.params.commentId);
        if (comment === undefined) {
            response.status(404).end();
            return;
        }
        response.json(comment);
    }
}));

router.post("/:articleID/comment", bwroute({
    requiresLogin: true,
    requiredQueryParameters: [],
    bodySchema: {
        content: "string"
    },
    handler: async (request, response) => {
        const [checkSuccess, checkResult] = await checkComment(request);
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
    }
}));

router.delete("/:articleID/comment/:commentId", bwroute({
    requiresLogin: true,
    requiredQueryParameters: [],
    bodySchema: {
        content: "string"
    },
    handler: async (request, response) => {
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
    }
}));
