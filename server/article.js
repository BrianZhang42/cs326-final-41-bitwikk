import express from "express";
import { asyncRoute, requireParams } from "./utils.js"

export const router = express.Router();

router.get("/:name", asyncRoute(async (request, response) => {
    console.log(request.params.name);
}));

router.post("/:name/create", asyncRoute(async (request, response) => {
    console.log(request.params.name);
}));

router.post("/:name/edit", asyncRoute(async (request, response) => {
    console.log(request.params.name);
}));

router.post("/:name/comment", asyncRoute(async (request, response) => {
    console.log(request.params.name);
}));
