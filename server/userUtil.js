import { users } from "./fakedata.js";
import { randomUUID } from "crypto";
import bcrypt from "bcrypt";
import jwt from "jwt-simple";

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

export function createUser(username, password) {
    // TODO: password hashing and salting
    const newUser = {
        username: username,
        password: password
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

export function checkSessionCookies(request) {
    const username = request.cookies.user;
    const sessionID = request.cookies.session;
    return checkSession(username, sessionID);
}

// const saltRounds = 10;

// router.post("/user", (req, res) => {
//     bcrypt.genSalt(saltRounds, (err, salt) => {
//         bcrypt.hash(req.body.password, salt, null, (err, hash) => {
//             let newUser = new User({
//                 username: req.body.username,
//                 password: hash,
//                 email: req.body.email,
//             });

//             newUser.save((err) => {
//                 if (err) {
//                     res.status(500).json({ error: "Error creating user" });
//                 } else {
//                     res.redirect("/login"); // New user created
//                 }
//             });
//         });
//     });
// });

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
