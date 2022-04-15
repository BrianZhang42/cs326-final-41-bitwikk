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