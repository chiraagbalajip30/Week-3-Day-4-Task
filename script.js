const signupForm = document.getElementById("signupForm");
const loginForm = document.getElementById("loginForm");
const welcomeBox = document.getElementById("welcomeBox");
const welcomeText = document.getElementById("welcomeText");
const signupSuccess = document.getElementById("signupSuccess");

const goLogin = document.getElementById("goLogin");
const goSignup = document.getElementById("goSignup");
const logoutBtn = document.getElementById("logoutBtn");

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Switch forms
goLogin.onclick = () => {
  signupForm.classList.add("hidden");
  loginForm.classList.remove("hidden");
};

goSignup.onclick = () => {
  loginForm.classList.add("hidden");
  signupForm.classList.remove("hidden");
  signupSuccess.classList.add("hidden");
};

// Signup
signupForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const name = signupName.value.trim();
  const email = signupEmail.value.trim();
  const password = signupPassword.value.trim();
  const errors = signupForm.querySelectorAll(".error");

  errors.forEach((e) => (e.textContent = ""));

  if (name.length < 3) {
    errors[0].textContent = "Name must be at least 3 characters";
    return;
  }
  if (!emailRegex.test(email)) {
    errors[1].textContent = "Invalid email";
    return;
  }
  if (password.length < 6) {
    errors[2].textContent = "Password must be at least 6 characters";
    return;
  }

  localStorage.setItem("user", JSON.stringify({ name, email, password }));

  signupForm.reset();
  signupForm.classList.add("hidden");
  loginForm.classList.remove("hidden");
  signupSuccess.classList.remove("hidden");
});

// Login
loginForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const email = loginEmail.value.trim();
  const password = loginPassword.value.trim();
  const errors = loginForm.querySelectorAll(".error");

  errors.forEach((e) => (e.textContent = ""));

  const storedUser = JSON.parse(localStorage.getItem("user"));

  if (
    !storedUser ||
    email !== storedUser.email ||
    password !== storedUser.password
  ) {
    errors[1].textContent = "Invalid email or password";
    return;
  }

  loginForm.reset();
  loginForm.classList.add("hidden");
  signupSuccess.classList.add("hidden");

  welcomeText.textContent = `Welcome, ${storedUser.name}!`;
  welcomeBox.classList.remove("hidden");
});

// Logout
logoutBtn.onclick = () => {
  welcomeBox.classList.add("hidden");
  signupForm.classList.remove("hidden");
};
