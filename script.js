document.addEventListener("DOMContentLoaded", () => {
  const joinButton = document.querySelector("#joinNowBtn");

  if (joinButton) {
    joinButton.addEventListener("click", showEmailPopup);
  }
});

function showEmailPopup() {
  if (document.querySelector(".email-popup")) return; // Prevent multiple popups

  const popup = document.createElement("div");
  popup.className = "email-popup";
  popup.innerHTML = `
        <div class="popup-content">
            <span class="close-popup">&times;</span>
            <h3>Join CODEXIS</h3>
            <p>Please enter your email to join our coding community:</p>
            <form id="joinForm">
                <input type="email" id="joinEmail" placeholder="Your Email" required>
                <button type="submit">Submit</button>
            </form>
        </div>
    `;

  document.body.appendChild(popup);
  setTimeout(() => {
    popup.classList.add("active");
  }, 10);

  popup
    .querySelector(".close-popup")
    .addEventListener("click", () => closeEmailPopup(popup));

  // Handle form submission **WITHOUT REDIRECT & AUTO CLOSE POPUP**
  popup.querySelector("#joinForm").addEventListener("submit", async (event) => {
    event.preventDefault();
    const email = popup.querySelector("#joinEmail").value.trim();

    if (!email) {
      showAlert("⚠️ Please enter a valid email address.", "error");
      return;
    }

    const submitButton = popup.querySelector("button");
    submitButton.disabled = true;
    submitButton.textContent = "Sending...";

    try {
      const response = await fetch("https://formspree.io/f/mbldnjpp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      if (response.ok) {
        showAlert(
          `✅ Thank you for joining CODEXIS! Confirmation sent to ${email}.`,
          "success",
          true
        );

        // **Add fade-out class, then remove popup**
        popup.classList.add("fade-out");
        setTimeout(() => {
          closeEmailPopup(popup);
        }, 1000);
      } else {
        showAlert("❌ Error sending email. Please try again.", "error");
      }
    } catch (error) {
      showAlert("⚠️ Network error. Check your connection.", "error");
    } finally {
      submitButton.disabled = false;
      submitButton.textContent = "Submit";
    }
  });
}

function closeEmailPopup(popup) {
  popup.classList.remove("active");

  // **Ensure popup fully disappears**
  setTimeout(() => {
    popup.remove();
  }, 300);
}

// Alert function to show messages
function showAlert(message, type = "info", autoRemove = false) {
  document.querySelectorAll(".alert").forEach((alert) => alert.remove()); // Prevent multiple alerts

  const alertBox = document.createElement("div");
  alertBox.textContent = message;
  alertBox.className = `alert ${type}`;
  document.body.appendChild(alertBox);

  if (autoRemove) {
    setTimeout(() => {
      alertBox.remove();
    }, 3000); // Message disappears after 3 seconds
  }
}

function isValidMessage(message) {
  // Ensure at least 5 words are present
  const words = message.trim().split(/\s+/);
  if (words.length < 5) {
    return false;
  }

  // Ensure the message contains meaningful text (not just numbers/symbols)
  if (!/[a-zA-Z]/.test(message)) {
    return false;
  }

  // Ensure the message is not repetitive (e.g., "aaaaa" or "123123")
  if (/^(.)\1+$/.test(message)) {
    return false;
  }

  return true;
}

document.addEventListener("DOMContentLoaded", () => {
  // Handle Contact Form Submission with Formspree Integration
  const form = document.querySelector("#contactForm");
  if (form) {
    form.addEventListener("submit", async (event) => {
      event.preventDefault(); // Prevent default form submission

      const formData = {
        name: document.querySelector("#name").value.trim(),
        email: document.querySelector("#email").value.trim(),
        message: document.querySelector("#message").value.trim(),
      };

      if (!formData.name || !formData.email || !formData.message) {
        showAlert("⚠️ Please fill out all fields.", "error");
        return;
      }

      const submitButton = form.querySelector("button");
      const formStatus = document.getElementById("form-status");

      // Show loading state
      submitButton.disabled = true;
      submitButton.textContent = "Sending...";

      try {
        const response = await fetch("https://formspree.io/f/mbldnjpp", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        });

        if (!isValidMessage(formData.message)) {
          showAlert(
            "⚠️ Please enter a meaningful message (at least 5 words).",
            "error"
          );
          return;
        }

        if (response.ok) {
          showAlert("✅ Message sent successfully!", "success");
          form.reset(); // Clear form fields
          formStatus.textContent = "Message sent successfully!";
          formStatus.style.color = "green";
          formStatus.style.display = "block";
          // Hide the message after 3 seconds
          setTimeout(() => {
            formStatus.style.display = "none";
          }, 3000);
        } else {
          showAlert("❌ Error sending message. Try again later.", "error");
          formStatus.textContent = "Error submitting the form.";
          formStatus.style.color = "red";
          formStatus.style.display = "block";
          // Hide the message after 3 seconds
          setTimeout(() => {
            formStatus.style.display = "none";
          }, 3000);
        }
      } catch (error) {
        console.error("Submission Error:", error);
        showAlert("⚠️ Network error. Check your connection.", "error");
        // Hide the message after 3 seconds
        setTimeout(() => {
          formStatus.style.display = "none";
        }, 3000);
      } finally {
        submitButton.disabled = false;
        submitButton.textContent = "Send";
      }
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
  }, 3000);
}

document.addEventListener("DOMContentLoaded", () => {
  const progressBar = document.getElementById("progress-bar");
  const content = document.body; // Apply blur to the entire page

  // Start loading (Progress Bar + Blur Effect)
  function startLoading() {
    progressBar.style.width = "0%";
    progressBar.style.transition = "none";
    content.classList.add("loading-active"); // Apply blur effect

    setTimeout(() => {
      progressBar.style.width = "85%"; // Quickly move to 85%
      progressBar.style.transition = "width 0.3s ease-in-out";
    }, 10);
  }

  // Ensure full completion & disappear instantly
  function finishLoading() {
    progressBar.style.width = "100%"; // Instantly reach 100%

    setTimeout(() => {
      progressBar.style.width = "100%"; // Ensure it stays at full width
      progressBar.style.opacity = "0"; // Fade out instantly
      progressBar.style.transition = "opacity 0.1s linear";
    }, 100);

    setTimeout(() => {
      progressBar.style.width = "0%"; // Reset instantly
      progressBar.style.opacity = "1"; // Reset opacity for next use
      content.classList.remove("loading-active"); // Remove blur effect
    }, 200);
  }

  // Attach event listener to all internal links
  document.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", (event) => {
      if (!link.target || link.target !== "_blank") {
        startLoading();

        // Ensure the progress bar completes to 100% before navigation
        setTimeout(finishLoading, 300);
      }
    });
  });

  // Ensure the progress bar completes when the full page loads
  window.addEventListener("pageshow", finishLoading);
});

document.addEventListener("DOMContentLoaded", function () {
  document.getElementById("hackthon_div").addEventListener("click", function () {
    window.open("/hackthon_event.html", "_blank"); // Opens in a new tab
  });
});document.addEventListener("DOMContentLoaded", function () {
  document.getElementById("Ai_Ml_inovaction").addEventListener("click", function () {
    window.open("/Ai_Ml_inovaction.html", "_blank"); // Opens in a new tab
  });
});document.addEventListener("DOMContentLoaded", function () {
  document.getElementById("Web_Dev").addEventListener("click", function () {
    window.open("/Web_Dev.html", "_blank"); // Opens in a new tab
  });
});document.addEventListener("DOMContentLoaded", function () {
  document.getElementById("Cybersecurity").addEventListener("click", function () {
    window.open("/Cybersecurity.html", "_blank"); // Opens in a new tab
  });
});
