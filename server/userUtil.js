import {user, comments, articles} from "./fakeusers.js";

export function createUser(email, name, password) {
    const newUser = {
        userId: "some id",
        email: email,
        username: name,
        password: password
    };
    user.push(newUser);
    return newUser;
}

// get index of user with userId
export function getUserIndex(id) {
    return user.findIndex((a) => a.userId === userId);
}

export function getUser(id) {
    return user.find((user) => user.userId === userId);
}

export function editUser(id, toEdit, email, password) {
    const person = user[getUserIndex(id)];
    if (toEdit === "email") {
        person.email = email;
    }
    else if (toEdit === "password") {
        person.password = password;
    }
    return person;
}

export function deleteUser(id) {
    user.splice(user.findIndex((a) => a.userId === userId), 1);
}

export function checkRegister(info) {
    const email = info.email;
    const username = info.username;
    const password = info.password;
    const password2 = info.password2;
    if (password != password2) {
        console.error("Passwords do not match");
        return;
    }
    if (password === undefined || password2 === undefined) {
        console.error("No password entered");
        return;
    }
    if (email === undefined) {
        console.error("No email entered");
        return;
    }
    if (username === undefined) {
        console.error("No password entered");
        return;
    }
    if (!user.every((a) => a.email !== email && a.username !== username)) {
        return {error: "email or username is taken"}
    }
    return true;
}
