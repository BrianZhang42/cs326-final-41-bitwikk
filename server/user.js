import express from "express";
import { asyncRoute, requireParams } from "./utils.js"
import { validateRegisterBody, checkRegister, createUser,
         getUserProfile,
         validateUpdateBody, checkUpdate, editUser,
         deleteUser,
         setSessionCookies} from "./userUtil.js"

export const router = express.Router();

router.post("/login", asyncRoute(async (request, response) => {
    throw "not implemented";
}));

router.get("/get", asyncRoute(async (request, response) => {
    if (!requireParams(request.query, ["user"], response)) {
        return;
    }
    const { user } = request.query;
    const userProfile = getUserProfile(user);

    if (userProfile) {
      response.status(200).json(userProfile);
    } else {
      response.status(404).json({message: `User ${user} not found`});
    }
}));

// request body: { username: string, password: string }
router.post("/create", asyncRoute(async (request, response) => {
    if (!validateRegisterBody(request.body, response)) {
        return;
    }
    const [checkSuccess, checkResult] = checkRegister(request.body);
    if (!checkSuccess) {
        response.status(400);
        response.json(checkResult);
        return;
    }
    const session = createUser(...checkResult);
    setSessionCookies(response, session);
    response.status(200).end();
}));

// request body: { username: string, password: string }
router.post("/edit", asyncRoute(async (request, response) => {
    if (!validateUpdateBody(request.body, response)) {
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

    if (!checkSessionCookies(request)) {
        response.status(403).end();
        return;
    }

    // TODO: error handling
    deleteUser(user);
    response.status(200).end();
}));

