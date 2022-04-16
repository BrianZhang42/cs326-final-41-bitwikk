import express from "express";
import { asyncRoute, requireParams } from "./utils.js"
import { validateRegisterBody, checkRegister, createUser,
         getUser,
         validateUpdateBody, checkUpdate, editUser,
         deleteUser } from "./userUtil.js"

export const router = express.Router();

router.post("/login", async (request, response) => {
    try {
        response.status(200);
    } catch (e) {
        response.status(500);
    }
    response.end();
});

// empty request body
router.get("/get", asyncRoute(async (request, response) => {
    if (!requireParams(request.query, ["user"], response)) {
        return;
    }
    const { user } = request.query;
    const userEntry = getUser(user);
    if (userEntry) {
      res.status(200).json(userEntry);
    } else {
      res.status(404).json({message: `User ${user} not found`});
    }
}));

// request body: { username: string, email: string, password: string }
router.post("/create", asyncRoute(async (request, response) => {
    if (!validateRegisterBody(request.body)) {
        return;
    }
    const [checkSuccess, checkResult] = checkRegister(request.body);
    if (!checkSuccess) {
        response.status(400);
        response.json(checkResult);
        return;
    }
    const user = createUser(...checkResult);
    response.status(200).json(user);
}));

// request body: { ID: number, username: string, email: string, password: string }
router.post("/edit", asyncRoute(async (request, response) => {
    if (!validateUpdateBody(request.body)) {
        return;
    }
    const [checkSuccess, checkResult] = checkUpdate(request.body);
    if (!checkSuccess) {
        response.status(400);
        response.json(checkResult);
        return;
    }
    const [success, user] = editUser(...checkResult);
    if (success) {
        response.status(200).json(user);
    } else {
        response.status(500).json({message: "Unexpected error"});
    }
}));

// empty request body
router.post("/delete", asyncRoute(async (request, response) => {
    if (!requireParams(request.query, ["user"], response)) {
        return;
    }
    const { user } = request.query;
    // TODO: error handling
    deleteUser(user);
    res.status(200).end();
}));

