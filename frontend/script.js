// Select elements from DOM
const button = document.getElementById("checkBackend");
const statusMessage = document.getElementById("statusMessage");

// Add click event listener
button.addEventListener("click", () => {
    statusMessage.textContent = "Checking backend...";

    fetch("http://localhost:5000/health")
        .then((response) => response.json())
        .then((data) => {
            statusMessage.textContent = data.message;
        })
        .catch((error) => {
            statusMessage.textContent = "Backend is not reachable";
            console.error(error);
        });
});
