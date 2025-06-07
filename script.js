// AOS Initialization
document.addEventListener("DOMContentLoaded", function () {
  AOS.init({
    duration: 800,
    once: true,
    easing: 'ease-out',
  });
});

// Scroll to top button
const scrollBtn = document.getElementById("scrollTopBtn");

window.addEventListener("scroll", () => {
  if (window.scrollY > 300) {
    scrollBtn.style.display = "block";
  } else {
    scrollBtn.style.display = "none";
  }
});

scrollBtn.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});

// Form Success Message
const form = document.querySelector("form");
const statusMsg = document.createElement("p");
statusMsg.classList.add("form-status");
form.appendChild(statusMsg);

form.addEventListener("submit", function (e) {
  e.preventDefault();
  const data = new FormData(form);
  fetch(form.action, {
    method: form.method,
    body: data,
    headers: { Accept: "application/json" },
  })
    .then(response => {
      if (response.ok) {
        statusMsg.textContent = "Message sent! ✅";
        form.reset();
      } else {
        statusMsg.textContent = "Oops! Something went wrong.";
      }
    })
    .catch(error => {
      statusMsg.textContent = "Oops! Network error.";
    });
});

