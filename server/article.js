import express from "express";
import { asyncRoute, requireParams } from "./utils.js"

export const router = express.Router();

router.get("/get", asyncRoute(async (request, response) => {
}));

router.get("/search", asyncRoute(async (request, response) => {
}));

router.post("/create", asyncRoute(async (request, response) => {
}));

router.post("/edit", asyncRoute(async (request, response) => {
}));

router.post("/comment", asyncRoute(async (request, response) => {
}));
