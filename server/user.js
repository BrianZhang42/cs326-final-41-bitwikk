import express from "express";
import { asyncRoute, requireBodyAttrs, requireParams } from "./utils.js"
import { validateRegisterBody, checkRegister, createUser,
         getUserProfile,
         setSessionCookies, validateSession,
         deleteSession, deleteSessionCookies,
         login,
         validateUpdateBody, checkUpdate, editUser,
         deleteUser} from "./userUtil.js"

export const router = express.Router();

router.post("/login", asyncRoute(async (request, response) => {
    if (!requireBodyAttrs(request.body, ["username", "password"],
                          response)) { return; }
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

// request body: { username: string, password: string }
router.post("/create", asyncRoute(async (request, response) => {
    if (!validateRegisterBody(request.body, response)) {
        return;
    }
    // console.log(await checkRegister(request.body));
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

// request body: { username: string, password: string }
router.post("/edit", asyncRoute(async (request, response) => {
    if (!validateSession(request, response)) { return; }
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

