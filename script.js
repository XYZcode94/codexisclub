document.addEventListener("DOMContentLoaded", () => {
    // Handle "Join Now" button click
    const joinButton = document.querySelector("#joinNowBtn");
    if (joinButton) {
        joinButton.addEventListener("click", () => {
            showAlert("Thank you for your interest! We'll get back to you soon.");
        });
    }

    // Handle Contact Form Submission
    const form = document.querySelector("#contactForm");
    if (form) {
        form.addEventListener("submit", (event) => {
            event.preventDefault(); // Prevent page reload

            const name = document.querySelector('#name').value.trim();
            const email = document.querySelector('#email').value.trim();
            const message = document.querySelector('#message').value.trim();

            if (!name || !email || !message) {
                showAlert("Please fill out all fields before submitting.", "error");
                return;
            }

            showAlert(`Thank you, ${name}! Your message has been received.`, "success");
            form.reset(); // Reset form after submission
        });
    }
});

// Utility function for alerts
function showAlert(message, type = "info") {
    const alertBox = document.createElement("div");
    alertBox.textContent = message;
    alertBox.className = `alert ${type}`;
    
    document.body.appendChild(alertBox);

    setTimeout(() => {
        alertBox.remove();
    }, 3000); // Auto-remove alert after 3 seconds
}