import * as user from './user-viewmodel.js';
import { checkRegister } from '../server/userUtil.js';

function checkRegister(username, password, password2) {
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

const password = document.getElementById("pass");
const password2 = document.getElementById("pass2");
// const email = document.getElementById("email");
const username = document.getElementById("username");
document.getElementById("register").addEventListener("click", async () => {
    if (checkRegister())
    // let formData = {
    //     username: username.value,
    //     email: email.value,
    //     password: password.value
    // }

    user.createUser(formData);
});
