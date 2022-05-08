import { randomUUID } from "crypto";
import bcrypt from "bcrypt";
import { UserDB } from "./model.js"
import { SessionDB } from "./model.js";
import { Session } from "inspector";

const saltRounds = 10;

export async function checkRegister({username, password}) {
    if (!username) {
        return [false, {invalid: "username",
                        message: "No username entered"}];
    }
    if (!password) {
        return [false, {invalid: "password",
                        message: "No password entered"}];
    }

    if (await UserDB.exists({ 'username' : username })) {
        return [false, {invalid: "username",
                        message: "Username is taken"}]
    }

    return [true, [username, password]];
}

export async function createUser(username, password) {
    const newUser = new UserDB({
        username: username,
        password: await bcrypt.hash(password, saltRounds)
    });

    // save the user to database
    await newUser.save(err => {
        if (err) throw err;
    });

    return await createSession(username);
}

export async function getUser(username) {
    if(!(await UserDB.exists({ 'username': username }))) {
        return undefined;
    }

    return await UserDB.findOne({ 'username' : username });
}

// this is for the /user/get route
export async function getUserProfile(username) {
    const user = await getUser(username);

    // filter only the keys we want to return to the client.
    // right now this has nothing useful, but in the future it will
    // contain the user profile.
    // we don't want to return the user entry unfiltered, because that
    // contains the password, which the client should not have.
    return {
        username: user.username
    };
}

async function createSession(username) {
    const sessionID = randomUUID();
    // 30 day expiry, in milliseconds
    const expires = new Date(Date.now() + 30*24*3600*1000);
    let sessionBody = {
        ID: sessionID,
        username: username,
        expiry: expires
    };
    const session = new SessionDB(sessionBody);

    await session.save(err => {
        if (err) throw err;
    });

    return sessionBody;
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

async function checkSession(username, sessionID) {
    if (!(await SessionDB.exists({ sessionID: sessionID }))) {
        return false;
    }

    const session = await SessionDB.findOne({ sessionID: sessionID });
    if (session.username !== username) {
        return false;
    }
    return true;
}

export async function deleteSession(sessionID) {
    if (!(await SessionDB.exists({ sessionID: sessionID }))) {
        return false;
    }

    await SessionDB.deleteOne({ sessionID: sessionID });
    
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

export async function validateSession(request, response) {
    const username = request.cookies.user;
    const sessionID = request.cookies.session;
    if (await checkSession(username, sessionID)) {
        return [true, username];
    } else {
        response.status(403);
        deleteSessionCookies(response);
        response.end();
        return [false, undefined];
    }
}

export async function checkPassword(username, password) {
    const user = await getUser(username);
    if (user === undefined || user === null) {
        return false;
    }
    return await bcrypt.compare(password, user.password);
};

export async function login(username, password) {
    if (await checkPassword(username, password)) {
        return await createSession(username);
    } else {
        return null;
    }
};

export async function checkUpdate({username, password}) {
    if (!username) {
        return [false, {invalid: "username",
                        message: "No username entered"}];
    }
    if (!password) {
        return [false, {invalid: "password",
                        message: "No password entered"}];
    }
    if (await getUser(username) === undefined) {
        return [false, {invalid: "username",
                        message: `User ${username} does not exist`}]
    }
    return [true, [username, password]];
}

export async function editUser(username, password) {
    let newUser = {
        username: username,
        password: password
    }

    await UserDB.findOneAndUpdate({ 'username': username }, newUser, { upsert: false })

    return [true, newUser];
}

export async function deleteUser(username) {
    if(!(await UserDB.exists({ "username": username }))) {
        return false;
    }

    await UserDB.deleteOne({ "username": username });
    await UserDB.save();

    return true;
}
