import { users } from "./fakedata.js";
import { randomUUID } from "crypto";
import bcrypt from "bcrypt";
import jwt from "jwt-simple";

const saltRounds = 10;

// TODO: replace with database
const sessions = new Map();

export function validateRegisterBody(body, response) {
    for (const attr of ["username", "password"]) {
        if (!body.hasOwnProperty(attr)) {
            response.status(400);
            response.send(`Body missing required attribute: ${attr}`);
            return false;
        }
    }
    return true;
}

export function checkRegister({username, password}) {
    if (!username) {
        return [false, {invalid: "username",
                        message: "No username entered"}];
    }
    if (!password) {
        return [false, {invalid: "password",
                        message: "No password entered"}];
    }
    if (!users.every(user => user.username !== username)) {
        return [false, {invalid: "username",
                        message: "username is taken"}];
    }
    return [true, [username, password]];
}

export async function createUser(username, password) {
    const passwordHash = await bcrypt.hash(password, saltRounds);
    const newUser = {
        username: username,
        password: passwordHash
    };
    users.push(newUser);
    console.log(`Created new user: ${username}`);
    return createSession(username);
}

export function getUser(username) {
    return users.find(user => user.username === username);
}

// get index of user in list
// (probably won't be needed after we have a databse)
function getUserIndex(username) {
    return users.findIndex(user => user.username === username);
}

// this is for the /user/get route
export function getUserProfile(username) {
    const user = getUser(username);

    // filter only the keys we want to return to the client.
    // right now this has nothing useful, but in the future it will
    // contain the user profile.
    // we don't want to return the user entry unfiltered, because that
    // contains the password, which the client should not have.
    return {
        username: user.username
    };
}

function createSession(username) {
    const sessionID = randomUUID();
    // 30 day expiry, in milliseconds
    const expires = new Date(Date.now() + 30*24*3600*1000);
    sessions.set(sessionID, {
        username: username,
        expires: expires
    });
    return {
        sessionID: sessionID,
        username: username,
        expires: expires
    };
}

export function setSessionCookies(response, {username, sessionID, expires}) {
    response.cookie("user", username, {
        expires: expires,
        secure: true
    });
    response.cookie("session", sessionID, {
        expires: expires,
        secure: true
    });
}

function checkSession(username, sessionID) {
    if (!sessions.has(sessionID)) {
        return false;
    }
    const session = sessions.get(sessionID);
    if (session.username !== username) {
        return false;
    }
    return true;
}

export function deleteSession(sessionID) {
    if (!sessions.has(sessionID)) {
        return false;
    }
    sessions.delete(sessionID);
    return true;
}

export function deleteSessionCookies(response) {
    response.cookie("user", "", {
        expires: new Date(0),
        secure: true
    });
    response.cookie("session", "", {
        expires: new Date(0),
        secure: true
    });
}

export function validateSession(request, response) {
    const username = request.cookies.user;
    const sessionID = request.cookies.session;
    if (checkSession(username, sessionID)) {
        return true;
    } else {
        response.status(403);
        deleteSessionCookies(response);
        response.end();
        return false;
    }
}

export async function checkPassword(username, password) {
    const user = getUser(username);
    if (user === undefined) {
        return false;
    }
    return await bcrypt.compare(password, user.password);
};

export async function login(username, password) {
    if (await checkPassword(username, password)) {
        return createSession(username);
    } else {
        return null;
    }
};
// router.post("/auth", (req, res) => {
//     User.findOne({ username: req.body.username }, (err, user) => {
//         if (err) throw err;

//         if (!user) {
//             res.status(401).json({ error: "Invalid username" });
//         } else {
//             bcrypt.compare(req.body.password, user.password, (err, valid) => {
//             });
//         }
//     });
// });

export function validateUpdateBody(body, response) {
    for (const attr of ["username", "password"]) {
        if (!body.hasOwnProperty(attr)) {
            response.status(400);
            response.send(`Body missing required attribute: ${attr}`);
            return false;
        }
    }
    return true;
}

export function checkUpdate({username, password}) {
    if (!username) {
        return [false, {invalid: "username",
                        message: "No username entered"}];
    }
    if (!password) {
        return [false, {invalid: "password",
                        message: "No password entered"}];
    }
    if (getUser(username) === undefined) {
        return [false, {invalid: "username",
                        message: `User ${username} does not exist`}]
    }
    return [true, [username, password]];
}

export function editUser(username, password) {
    const i = getUserIndex(username);
    if (i === undefined) {
        return [false, null];
    }
    const updatedUser = {
        username: username,
        password: password
    }
    users[i] = updatedUser;
    return [true, updatedUser];
}

export function deleteUser(username) {
    const i = getUserIndex(username);
    if (i === undefined) {
        return false;
    }
    users.splice(i, 1);
    return true;
}
