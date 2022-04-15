import {users, comments, articles} from "./fakeusers.js";

export function createUser(email, name, password) {
    const newUser = {
        userId: "some id",
        email: email,
        username: name,
        password: password
    };
    users.push(newUser);
    return newUser;
}

// get index of user with userId
export function getUserIndex(id) {
    return users.findIndex((a) => a.userId === userId);
}

export function getUser(id) {
    return users.find((user) => user.userId === userId);
}

export function editUser(id, toEdit, email, password) {
    const person = users[getUserIndex(id)];
    if (toEdit === "email") {
        person.email = email;
    }
    else if (toEdit === "password") {
        person.password = password;
    }
    return person;
}

export function deleteUser(id) {
    users.splice(users.findIndex((a) => a.userId === userId), 1);
}

export function checkRegister(info) {
    const email = info.email;
    const username = info.username;
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
