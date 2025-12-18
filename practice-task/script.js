const form = document.querySelector("#contactForm");
const successMsg = document.querySelector("successMsg");

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const phoneRegex = /^[6-9]\d{9}$/;

const showError = (id, msg) => {
  document.getElementById(id).textContent = msg;
};

const clearError = (id) => {
  document.getElementById(id).textContent = "";
};

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const name = form.name.value.trim();
  const email = form.email.value.trim();
  const phone = form.phone.value.trim();
  const message = form.message.value.trim();

  let isValid = true;

  // Name
  if (name === "") {
    showError("name-error", "name is Required");
    isValid = false;
  } else {
    clearError("name-error");
  }

  // Email
  if (!emailRegex.test(email)) {
    showError("email-error", "Email is not valid");
    isValid = false;
  } else {
    clearError("email-error");
  }

  if (!phoneRegex.test(phone)) {
    showError("phone-error", "Enter a valid 10-digit phone number");
    isValid = false;
  } else {
    clearError("phone-error");
  }

  // Message
  if (message.length < 5) {
    showError("message-error", "Message must be at least 5 characters");
    isValid = false;
  } else {
    clearError("message-error");
  }

  if (isValid) {
    successMsg.textContent = "Form submitted successfully!";
    successMsg.computedStyleMap.opacity = "1";
    form.reset();
  }
});
