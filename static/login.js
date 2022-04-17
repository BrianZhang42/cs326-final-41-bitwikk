const usernameField = document.getElementById("username");
const passwordField = document.getElementById("password");

document.getElementById("login").addEventListener("click", async () => {
    // TODO: if username is empty, give error
    // TODO: if logpass is empty, give error
    const response = await fetch("/user/login", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({
            username: usernameField.value,
            password: passwordField.value
        })
    });
    if (!response.ok) {
        alert(`Unexpected error: ${response.status} ${response.statusText} ${await response.text()}`);
    }
    const responseJSON = await response.json();
    if (responseJSON.success) {
        window.location.href = "/";
    } else {
        alert("Incorrect username/password");
    }
});
