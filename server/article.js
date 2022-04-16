import express from "express";
import { asyncRoute, requireParams } from "./utils.js"
import { getArticle } from './articleUtil.js';

export const router = express.Router();

router.get("/:name", asyncRoute(async (request, response) => {
    const article = getArticle(request.params.name);
    if (article === undefined) {
        response.status(404).end();
        return;
    }
    response.json(article);
}));

// router.post("/:name/edit", asyncRoute(async (request, response) => {
//     console.log(request.params.name);
// }));

// router.post("/:name/comment", asyncRoute(async (request, response) => {
//     console.log(request.params.name);
// }));
