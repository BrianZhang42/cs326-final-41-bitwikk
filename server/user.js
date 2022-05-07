import express from "express";
import { asyncRoute, asyncRouteWithBody, requireParams } from "./utils.js"
import { checkRegister, createUser,
         getUserProfile,
         setSessionCookies, validateSession,
         deleteSession, deleteSessionCookies,
         login,
         checkUpdate, editUser,
         deleteUser } from "./userUtil.js"

export const router = express.Router();

router.post("/login", asyncRouteWithBody({
    "username": "string",
    "password": "string"
}, async (request, response) => {
    const session = await login(request.body.username, request.body.password);
    if (session === null) {
        response.json({success: false});
    } else {
        setSessionCookies(response, session);
        response.json({success: true});
    }
    response.end();
}));

router.post("/logout", asyncRoute(async (request, response) => {
    if (!validateSession(request, response)) { return; }
    const success = deleteSession(request.cookies.session);
    if (!success) {
        response.status(400);
    }
    deleteSessionCookies(response);
    response.end();
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

router.post("/create", asyncRouteWithBody({
    "username": "string",
    "password": "string"
}, async (request, response) => {
    const [checkSuccess, checkResult] = await checkRegister(request.body);
    if (!checkSuccess) {
        response.status(400);
        response.json(checkResult);
        return;
    }
    const session = createUser(...checkResult);
    setSessionCookies(response, session);
    response.status(200).end();
}));

router.post("/edit", asyncRouteWithBody({
    "username": "string",
    "password": "string"
}, async (request, response) => {
    if (!validateSession(request, response)) { return; }
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
    if (!validateSession(request, response)) { return; }

    // we require both a session and a query param here to make
    // it harder to accidentally delete your account

    if (request.query.user !== request.cookies.user) {
        // user is only allowed to delete themselves
        response.status(403).end();
    }

    // TODO: error handling
    deleteUser(request.cookies.user);
    response.status(200).end();
}));

