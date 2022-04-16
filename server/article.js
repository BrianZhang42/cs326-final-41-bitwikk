import express from "express";
import { asyncRoute } from "./utils.js"
import { addComment, checkComment, getArticle } from './articleUtil.js';

export const router = express.Router();

router.get("/:articleID", asyncRoute(async (request, response) => {
    const article = getArticle(request.params.articleID);
    if (article === undefined) {
        response.status(404).end();
        return;
    }
    response.json(article);
}));

// router.post("/:articleID/edit", asyncRoute(async (request, response) => {
//     const [checkSuccess, checkResult] = checkEdit(req.body);
//     if (!checkSuccess) {
//         response.status(400).json(checkResult);
//         return;
//     }
//     const success = editArticle(request.params.articleID,
//                                 ...checkResult);
//     if (success) {
//         resposne.status(200).end();
//     } else {
//         resposne.status(500).end();
//     }
// }));

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
