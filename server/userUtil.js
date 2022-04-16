import { users } from "./fakedata.js";
import bcrypt from "bcrypt";
import jwt from "jwt-simple";

export function validateRegisterBody(body, response) {
    for (const attr of ["username", "password", "password2"]) {
        if (!body.hasOwnProperty(attr)) {
            response.status(400);
            response.send(`Body missing required attribute: ${attr}`);
            return false;
        }
    }
    return true;
}

export function checkRegister({ username, password, password2 }) {
    if (!username) {
        return [false, {invalid: "username",
                        message: "No username entered"}];
    }
    if (!password) {
        return [false, {invalid: "password",
                        message: "No password entered"}];
    }
    if (!password2) {
        return [false, {invalid: "password2",
                        message: "Please re-enter password"}];
    }
    if (password != password2) {
        return [false, {invalid: "password2",
                        message: "Passwords do not match"}];
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
    return newUser;
}

export function getUser(username) {
    return users.find(user => user.username === username);
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

// get index of user in list
// (probably won't be needed after we have a databse)
function getUserIndex(username) {
    return users.findIndex(user => user.username === username);
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
//                 if (err) {
//                     res.status(400).json({ error: "Failed to authenticate." });
//                 } else if (valid) {
//                     const token = jwt.encode({ username: user.username }, SECRET);
//                     res.clearCookie("x-auth").cookie("x-auth", token, { expires: new Date(Date.now() + 90000), httpOnly: true}).redirect("/index");
//                 } else {
//                     res.status(401).json({ error: "Wrong password" });
//                 }
//             });
//         }
//     });
// });

export function validateUpdateBody(body, response) {
    for (const attr of ["username", "password", "password2"]) {
        if (!body.hasOwnProperty(attr)) {
            response.status(400);
            response.send(`Body missing required attribute: ${attr}`);
            return false;
        }
    }
    return true;
}

export function checkUpdate({username, password, password2}) {
    if (!username) {
        return [false, {invalid: "username",
                        message: "No username entered"}];
    }
    if (!password) {
        return [false, {invalid: "password",
                        message: "No password entered"}];
    }
    if (!password2) {
        return [false, {invalid: "password2",
                        message: "Please re-enter password"}];
    }
    if (password != password2) {
        return [false, {invalid: "password2",
                        message: "Passwords do not match"}];
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
