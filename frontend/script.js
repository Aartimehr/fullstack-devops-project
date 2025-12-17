// ---------------- HEALTH CHECK ----------------
const button = document.getElementById("checkBackend");
const statusMessage = document.getElementById("statusMessage");

if (button && statusMessage) {
    button.addEventListener("click", () => {
        statusMessage.textContent = "Checking backend...";

        fetch("http://localhost:5000/health")
            .then(res => res.json())
            .then(data => {
                statusMessage.textContent = data.message;
            })
            .catch(err => {
                statusMessage.textContent = "Backend not reachable";
                console.error(err);
            });
    });
}

// ---------------- REGISTER ----------------
const registerBtn = document.getElementById("registerBtn");
if (registerBtn) {
    registerBtn.addEventListener("click", () => {
        const name = document.getElementById("name").value;
        const email = document.getElementById("email").value;
        const password = document.getElementById("password").value;

        fetch("http://localhost:5000/register", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ name, email, password })
        })
        .then(res => res.json())
        .then(data => {
            document.getElementById("registerMessage").innerText = data.message;
        });
    });
}


// ---------------- LOGIN ----------------
const loginBtn = document.getElementById("loginBtn");
if (loginBtn) {
    loginBtn.addEventListener("click", () => {
        const email = document.getElementById("loginEmail").value;
        const password = document.getElementById("loginPassword").value;

        fetch("http://localhost:5000/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, password })
        })
        .then(res => res.json())
        .then(data => {
            console.log("Login response:", data); // DEBUG

            if (data.user) {
                localStorage.setItem("user", JSON.stringify(data.user));

                // ✅ ABSOLUTE SAFE REDIRECT
                window.location.href = "./dashboard.html";
            } else {
                document.getElementById("loginMessage").innerText = data.message;
            }
        })
        .catch(err => console.error(err));
    });
}


// ---------------- DASHBOARD ----------------
// ---------------- DASHBOARD ----------------
const user = JSON.parse(localStorage.getItem("user"));

if (window.location.pathname.includes("dashboard.html")) {
    if (!user) {
        window.location.href = "login.html";
    } else {
        document.getElementById("welcomeMessage").textContent =
            `Welcome ${user.name} (${user.email})`;
    }
}

function logout() {
    localStorage.removeItem("user");
    window.location.href = "login.html";
}


// ---------------- LOGOUT ----------------
function logout() {
    localStorage.removeItem("user");
    window.location.href = "./login.html";
}
