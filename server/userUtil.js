import {users, comments, articles} from "./fakeusers.js";

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
export function getUserIndex(username) {
    return users.findIndex(user => user.username === username);
}

export function getUser(username) {
    return users.find((user) => user.username === username);
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

export function checkRegister(info) {
    // const email = info.email;
    const username = info.username;
    const password = info.password;
    const password2 = info.password2;
    if (password != password2) {
        return {error: "Passwords do not match"};
    }
    if (password === undefined || password2 === undefined) {
        return {error: "No password entered"};
    }
    // if (email === undefined) {
    //     return {error: "No email entered"};
    // }
    if (username === undefined) {
        return {error: "No username entered"};
    }
    if (!users.every((a) => a.email !== email && a.username !== username)) {
        return {error: "email or username is taken"};
    }
    return true;
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
