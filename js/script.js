//   PASSWORD SHOW / HIDE

function togglePassword(inputId, button) {

    const input = document.getElementById(inputId);

    if (input.type === "password") {

        input.type = "text";
        button.textContent = "Hide";

    } else {

        input.type = "password";
        button.textContent = "Show";
    }
}


//   VALIDATION HELPERS

function setError(input, errorElement, message) {

    input.classList.remove("valid");
    input.classList.add("invalid");

    errorElement.textContent = message;
}


function setValid(input, errorElement) {

    input.classList.remove("invalid");
    input.classList.add("valid");

    errorElement.textContent = "";
}


function clearValidation(input, errorElement) {

    input.classList.remove("invalid");
    input.classList.remove("valid");

    errorElement.textContent = "";
}


//   SIGNUP

const signupForm = document.getElementById("signupForm");

if (signupForm) {

    const fullName = document.getElementById("fullName");
    const signupEmail = document.getElementById("signupEmail");
    const phone = document.getElementById("phone");
    const locationInput = document.getElementById("location");
    const signupPassword = document.getElementById("signupPassword");
    const confirmPassword = document.getElementById("confirmPassword");

    const fullNameError = document.getElementById("fullNameError");
    const signupEmailError = document.getElementById("signupEmailError");
    const phoneError = document.getElementById("phoneError");
    const locationError = document.getElementById("locationError");
    const signupPasswordError =
        document.getElementById("signupPasswordError");
    const confirmPasswordError =
        document.getElementById("confirmPasswordError");


    /* ---------- Individual validation functions ---------- */

    function validateFullName() {

        const value = fullName.value.trim();

        if (value === "") {

            setError(
                fullName,
                fullNameError,
                "Full Name is required."
            );

            return false;
        }

        if (!/^[A-Za-z ]+$/.test(value)) {

            setError(
                fullName,
                fullNameError,
                "Name should contain only alphabets and spaces."
            );

            return false;
        }

        setValid(fullName, fullNameError);

        return true;
    }


    function validateEmail() {

        const value = signupEmail.value.trim();

        const emailPattern =
            /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (value === "") {

            setError(
                signupEmail,
                signupEmailError,
                "Email is required."
            );

            return false;
        }

        if (!emailPattern.test(value)) {

            setError(
                signupEmail,
                signupEmailError,
                "Enter a valid email address."
            );

            return false;
        }

        setValid(signupEmail, signupEmailError);

        return true;
    }


    function validatePhone() {

        const value = phone.value.trim();

        if (value === "") {

            setError(
                phone,
                phoneError,
                "Phone Number is required."
            );

            return false;
        }

        if (!/^\d{10}$/.test(value)) {

            setError(
                phone,
                phoneError,
                "Phone Number must contain exactly 10 digits."
            );

            return false;
        }

        setValid(phone, phoneError);

        return true;
    }


    function validateLocation() {

        const value = locationInput.value.trim();

        if (value === "") {

            setError(
                locationInput,
                locationError,
                "Location/City is required."
            );

            return false;
        }

        if (!/^[A-Za-z ]+$/.test(value)) {

            setError(
                locationInput,
                locationError,
                "Location should contain only alphabets."
            );

            return false;
        }

        setValid(locationInput, locationError);

        return true;
    }


    function validatePassword() {

        const value = signupPassword.value;

        if (value === "") {

            setError(
                signupPassword,
                signupPasswordError,
                "Password is required."
            );

            return false;
        }

        if (value.length < 8) {

            setError(
                signupPassword,
                signupPasswordError,
                "Password must be at least 8 characters."
            );

            return false;
        }

      

        if (!/[A-Za-z]/.test(value) || !/[0-9]/.test(value)) {

            setError(
                signupPassword,
                signupPasswordError,
                "Password must contain both letters and numbers."
            );

            return false;
        }

        setValid(signupPassword, signupPasswordError);

        return true;
    }


    function validateConfirmPassword() {

        const value = confirmPassword.value;

        if (value === "") {

            setError(
                confirmPassword,
                confirmPasswordError,
                "Please confirm your password."
            );

            return false;
        }

        if (value !== signupPassword.value) {

            setError(
                confirmPassword,
                confirmPasswordError,
                "Passwords do not match."
            );

            return false;
        }

        setValid(confirmPassword, confirmPasswordError);

        return true;
    }


    //   REAL-TIME VALIDATION

    fullName.addEventListener("input", validateFullName);

    signupEmail.addEventListener("input", validateEmail);

    phone.addEventListener("input", function () {

       

        phone.value = phone.value.replace(/\D/g, "");

        validatePhone();
    });

    locationInput.addEventListener("input", validateLocation);

    signupPassword.addEventListener("input", function () {

        validatePassword();

        /*
           Also re-check confirm password
           if the user changes the original password.
        */

        if (confirmPassword.value !== "") {
            validateConfirmPassword();
        }
    });

    confirmPassword.addEventListener(
        "input",
        validateConfirmPassword
    );


//       SIGNUP SUBMIT

    signupForm.addEventListener("submit", function (event) {

        event.preventDefault();

        const validName = validateFullName();
        const validEmail = validateEmail();
        const validPhone = validatePhone();
        const validLocation = validateLocation();
        const validPassword = validatePassword();
        const validConfirmPassword =
            validateConfirmPassword();

        if (
            !validName ||
            !validEmail ||
            !validPhone ||
            !validLocation ||
            !validPassword ||
            !validConfirmPassword
        ) {

            return;
        }


        /*
           Check whether this email already exists.
        */

        const registeredUser =
            JSON.parse(localStorage.getItem("registeredUser"));


        if (
            registeredUser &&
            registeredUser.email.toLowerCase() ===
            signupEmail.value.trim().toLowerCase()
        ) {

            setError(
                signupEmail,
                signupEmailError,
                "This email is already registered."
            );

            return;
        }


        
          // Save registration information.

        
        const user = {

            fullName: fullName.value.trim(),

            email: signupEmail.value.trim().toLowerCase(),

            phone: phone.value.trim(),

            location: locationInput.value.trim(),

            password: signupPassword.value
        };


        localStorage.setItem(
            "registeredUser",
            JSON.stringify(user)
        );


        alert(
            "Registration successful! Please sign in."
        );

        window.location.href = "signin.html";
    });
}


//   SIGN IN

const signinForm = document.getElementById("signinForm");

if (signinForm) {

    const signinEmail =
        document.getElementById("signinEmail");

    const signinPassword =
        document.getElementById("signinPassword");

    const signinEmailError =
        document.getElementById("signinEmailError");

    const signinPasswordError =
        document.getElementById("signinPasswordError");


    function validateSigninEmail() {

        const value = signinEmail.value.trim();

        const emailPattern =
            /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (value === "") {

            setError(
                signinEmail,
                signinEmailError,
                "Email is required."
            );

            return false;
        }

        if (!emailPattern.test(value)) {

            setError(
                signinEmail,
                signinEmailError,
                "Enter a valid email address."
            );

            return false;
        }

        setValid(signinEmail, signinEmailError);

        return true;
    }


    function validateSigninPassword() {

        const value = signinPassword.value;

        if (value === "") {

            setError(
                signinPassword,
                signinPasswordError,
                "Password is required."
            );

            return false;
        }

        setValid(
            signinPassword,
            signinPasswordError
        );

        return true;
    }


    /* Real-time validation */

    signinEmail.addEventListener(
        "input",
        validateSigninEmail
    );

    signinPassword.addEventListener(
        "input",
        validateSigninPassword
    );


    //   SIGN IN SUBMIT

    signinForm.addEventListener("submit", function (event) {

        event.preventDefault();

        const emailValid =
            validateSigninEmail();

        const passwordValid =
            validateSigninPassword();


        if (!emailValid || !passwordValid) {
            return;
        }


        /*
           Get registered user from localStorage.
        */

        const registeredUser =
            JSON.parse(
                localStorage.getItem("registeredUser")
            );


        /*
           No registered user
        */

        if (!registeredUser) {

            setError(
                signinEmail,
                signinEmailError,
                "No registered account found. Please sign up first."
            );

            return;
        }


        /*
           Check email
        */

        if (
            signinEmail.value.trim().toLowerCase() !==
            registeredUser.email.toLowerCase()
        ) {

            setError(
                signinEmail,
                signinEmailError,
                "This email is not registered."
            );

            return;
        }


        /*
           Check password
        */

        if (
            signinPassword.value !==
            registeredUser.password
        ) {

            setError(
                signinPassword,
                signinPasswordError,
                "Incorrect password."
            );

            return;
        }


        /*
           Authentication successful
        */

        localStorage.setItem(
            "isLoggedIn",
            "true"
        );

        localStorage.setItem(
            "currentUser",
            JSON.stringify(registeredUser)
        );


        /*
           Redirect to tourist landing page.
        */

        window.location.href = "travellandpage.html";
    });
}


//   LANDING PAGE AUTHENTICATION CHECK

if (
    window.location.pathname.endsWith("travellandpage.html")
) {

    const isLoggedIn =
        localStorage.getItem("isLoggedIn");

    if (isLoggedIn !== "true") {

        window.location.href = "signin.html";
    }
}


//   LOGOUT

function logout() {

    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("currentUser");

    window.location.href = "signin.html";
}