const user = JSON.parse(localStorage.getItem("user"));

if (!user) {
    // If user not logged in, go back to login
    window.location.href = "index.html";
} else {
    document.getElementById("welcomeMessage").textContent =
        `Hello, ${user.name} (${user.email})`;
}

function logout() {
    localStorage.removeItem("user");
    window.location.href = "index.html";
}
