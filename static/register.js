const usernameField = document.getElementById("username");
const passwordField = document.getElementById("pass");
const passwordField2 = document.getElementById("pass2");

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
    return [true, {username: username, password: password}];
}

document.getElementById("register").addEventListener("click", async () => {
    const username = usernameField.value;
    const password = passwordField.value;
    const password2 = passwordField2.value;
    const [valid, result] = checkRegister(username, password, password2);
    if (!valid) {
        const {invalid, message} = result;
        // TODO: highlight invalid field
        alert(message);
        return;
    }

    const response = await fetch(`/user/create`, {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(result)
    });
    if (response.ok) {
        // redirect to homepage
        window.location.href = "/";
        return;
    }
    if (response.status === 400) {
        let isJSON = false;
        let invalid;
        let message;
        try {
            ({ invalid, message } = await response.json());
            isJSON = true;
        } catch {
        }
        if (isJSON) {
            // TODO: highlight invalid field
            alert(message);
            return;
        }
    }
    alert(`Unexpected error: ${response.status} ${response.statusText} ${await response.text()}`);
});
