import {users, comments, articles} from "./fakeusers.js";
import bcrypt from "bcrypt";
import jwt from "jwt-simple";

export function createUser(username, password) {
    // TODO: password hashing and salting
    const newUser = {
        username: username,
        password: password
    };
    users.push(newUser);
    return newUser;
}

// get index of user with userId
function getUserIndex(username) {
    return users.findIndex(user => user.username === username);
}

export function getUser(username) {
    return users.find((user) => user.username === username);
}

export function validateRegisterBody(body, response) {
    for (const attr of ["username", "password1", "password2"]) {
        if (!body.hasOwnProperty(attr)) {
            response.status(400);
            response.send(`Body missing required attribute: ${attr}`);
            return false;
        }
    }
    return true;
}

export function editUser(username, password) {
    const i = getUserIndex(username);
    const updatedUser = {
        username: username,
        password: password
    }
    users[i] = updatedUser;
    return updatedUser;
}

export function deleteUser(username) {
    users.splice(users.findIndex(user => user.username === username), 1);
}

export function checkRegister({ username, password1, password2 }) {
    if (!username) {
        return [false, {invalid: "username",
                        message: "No username entered"}];
    }
    if (!password1) {
        return [false, {invalid: "password1",
                        message: "No password entered"}];
    }
    if (!password2) {
        return [false, {invalid: "password2",
                        message: "Please re-enter password"}];
    }
    if (password1 != password2) {
        return [false, {invalid: "password2",
                        message: "Passwords do not match"}];
    }
    if (!users.every(user => user.username !== username)) {
        return [false, {invalid: "username",
                        message: "username is taken"}];
    }
    return [true, [username, password1]];
}

export function checkUpdate(info) {
    const email = info.email;
    const password = info.password;
    const password2 = info.password2;
    if (password != password2) {
        return {error: "Passwords do not match"};
    }
    if (password === undefined || password2 === undefined) {
        return {error: "No password entered"};
    }
    if (email === undefined) {
        return {error: "No email entered"};
    }
    return true;
}
