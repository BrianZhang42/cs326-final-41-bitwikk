import * as article from './article-viewmodel.js';
import * as user from './user-viewmodel.js';

const searchForm = document.getElementById("searchForm");
searchForm.addEventListener("submit", event => {
    window.location.href = "./search_result.html";
    event.preventDefault();
});

let password = document.getElementById("pass");
let password2 = document.getElementById("pass2");
let email = document.getElementById("email");
let username = document.getElementById("username");
document.getElementById("register").addEventListener("click", async () => {
    if (password.value != password2.value) {
        alert("Passwords do not match");
        return;
    }
    else if (password.value === null || password2.value === null) {
        alert("No password entered");
        return;
    }
    else if (email.value === null) {
        alert("No email entered");
        return;
    }
    else if (username.value === null) {
        alert("No password entered");
        return;
    }
    
    let formData = {
        username: username.value,
        email: email.value,
        password: password.value
    }

    user.createUser(formData);    
});

document.getElementById("login").addEventListener("click", async () => {
    let user = document.getElementById("user");
    let pass = document.getElementById("logpass");
    // if username/email is empty or not in user database, give error
    // if logpass is empty or not in user database, give error
});