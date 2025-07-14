document.getElementById("signupForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const fullname = document.getElementById("fullname").value.trim();
  const mobile = document.getElementById("mobile").value.trim();
  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value;
  const confirmPassword = document.getElementById("confirmPassword").value;

  // Error display elements
  const nameError = document.getElementById("nameError");
  const mobileError = document.getElementById("mobileError");
  const emailError = document.getElementById("emailError");
  const passwordError = document.getElementById("passwordError");
  const confirmError = document.getElementById("confirmError");

  // Clear previous errors
  nameError.textContent = "";
  mobileError.textContent = "";
  emailError.textContent = "";
  passwordError.textContent = "";
  confirmError.textContent = "";

  let isValid = true;

  // Validation
  if (!fullname) {
    nameError.textContent = "Full Name is required.";
    isValid = false;
  }

  const mobileRegex = /^\d{10}$/;
  if (!mobileRegex.test(mobile)) {
    mobileError.textContent = "Mobile number must be exactly 10 digits.";
    isValid = false;
  }

  if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    emailError.textContent = "Invalid email format.";
    isValid = false;
  }

  if (password.length < 6) {
    passwordError.textContent = "Password must be at least 6 characters.";
    isValid = false;
  }

  if (password !== confirmPassword) {
    confirmError.textContent = "Passwords do not match.";
    isValid = false;
  }

  if (!isValid) return;

  // ✅ Dummy backend call (ReqRes API)
  fetch("https://reqres.in/api/register", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      email: "eve.holt@reqres.in", // ReqRes only accepts this email
      password: password
    })
  })
    .then(res => res.json())
    .then(data => {
      if (data.token) {
        alert("✅ Account created successfully (dummy)!");
        document.getElementById("signupForm").reset();
      } else {
        alert("❌ Signup failed: " + (data.error || "Unknown error"));
      }
    })
    .catch(error => {
      console.error(error);
      alert("❌ Something went wrong. Try again later.");
    });
});
