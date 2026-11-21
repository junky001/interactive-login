
document.addEventListener("DOMContentLoaded", () => {

    // =====================================
    // 1. SIGNUP ELEMENTS
    // =====================================

    const signupForm = document.getElementById("signupForm");

    const fullName = document.getElementById("fullName");
    const username = document.getElementById("username");
    const email = document.getElementById("signupEmail");

    const password = document.getElementById("signupPassword");
    const confirmPassword = document.getElementById("confirmPassword");

    const terms = document.getElementById("terms");

    const signupButton = document.getElementById("signupButton");
    const signupMessage = document.getElementById("signupMessage");

    const strengthBar = document.getElementById("strengthBar");
    const strengthText = document.getElementById("strengthText");


    // =====================================
    // 2. MESSAGE FUNCTION
    // =====================================

    function showMessage(message, type) {

        signupMessage.textContent = message;

        signupMessage.className = `signup-message ${type}`;

    }


    // =====================================
    // 3. PASSWORD VISIBILITY
    // =====================================

    function setupPasswordToggle(input, button) {

        if (!input || !button) return;

        button.addEventListener("click", () => {

            const hidden = input.type === "password";

            input.type = hidden ? "text" : "password";

            button.innerHTML = hidden
                ? '<i class="fa-regular fa-eye-slash"></i>'
                : '<i class="fa-regular fa-eye"></i>';

            button.setAttribute(
                "aria-label",
                hidden ? "Hide password" : "Show password"
            );

        });

    }

    setupPasswordToggle(
        password,
        document.getElementById("toggleSignupPassword")
    );

    setupPasswordToggle(
        confirmPassword,
        document.getElementById("toggleConfirmPassword")
    );


    // =====================================
    // 4. PASSWORD STRENGTH CHECKER
    // =====================================

    function checkPasswordStrength(value) {

        let score = 0;

        if (value.length >= 8) score++;

        if (/[A-Z]/.test(value)) score++;

        if (/[a-z]/.test(value)) score++;

        if (/[0-9]/.test(value)) score++;

        if (/[^A-Za-z0-9]/.test(value)) score++;


        let strength = {
            width: "0%",
            color: "#e34d5b",
            text: "Password strength"
        };

        if (value.length === 0) {

            strength = {
                width: "0%",
                color: "#e34d5b",
                text: "Password strength"
            };

        } else if (score <= 2) {

            strength = {
                width: "30%",
                color: "#e34d5b",
                text: "Weak password"
            };

        } else if (score <= 3) {

            strength = {
                width: "60%",
                color: "#ffbd59",
                text: "Medium password"
            };

        } else if (score === 4) {

            strength = {
                width: "80%",
                color: "#00b8d4",
                text: "Strong password"
            };

        } else {

            strength = {
                width: "100%",
                color: "#00eaaa",
                text: "Very strong password"
            };

        }

        strengthBar.style.width = strength.width;

        strengthBar.style.background = strength.color;

        strengthText.textContent = strength.text;

        strengthText.style.color = strength.color;

        return score;

    }


    password.addEventListener("input", () => {

        checkPasswordStrength(password.value);

    });


    // =====================================
    // 5. PASSWORD CONFIRMATION
    // =====================================

    confirmPassword.addEventListener("input", () => {

        if (
            confirmPassword.value.length > 0 &&
            confirmPassword.value !== password.value
        ) {

            confirmPassword.setCustomValidity(
                "Passwords do not match."
            );

        } else {

            confirmPassword.setCustomValidity("");

        }

    });

    password.addEventListener("input", () => {

        confirmPassword.setCustomValidity(
            confirmPassword.value &&
            confirmPassword.value !== password.value
                ? "Passwords do not match."
                : ""
        );

    });


    // =====================================
    // 6. USERNAME VALIDATION
    // =====================================

    username.addEventListener("input", () => {

        username.value = username.value.replace(/\s/g, "");

        username.setCustomValidity(
            /^[a-zA-Z0-9_]{3,20}$/.test(username.value)
                ? ""
                : "Username must contain 3-20 letters, numbers or underscores."
        );

    });


    // =====================================
    // 7. SIGNUP FORM SUBMISSION
    // =====================================

    signupForm.addEventListener("submit", (event) => {

        event.preventDefault();

        signupMessage.className = "signup-message";
        signupMessage.textContent = "";

        const nameValue = fullName.value.trim();
        const usernameValue = username.value.trim();
        const emailValue = email.value.trim();

        const passwordValue = password.value;
        const confirmValue = confirmPassword.value;


        // Full name

        if (nameValue.length < 2) {

            showMessage(
                "Please enter your full name.",
                "error"
            );

            fullName.focus();

            return;

        }


        // Username

        if (!/^[a-zA-Z0-9_]{3,20}$/.test(usernameValue)) {

            showMessage(
                "Username must contain 3-20 letters, numbers or underscores.",
                "error"
            );

            username.focus();

            return;

        }


        // Email

        if (!email.checkValidity()) {

            showMessage(
                "Please enter a valid email address.",
                "error"
            );

            email.focus();

            return;

        }


        // Password strength

        const strength = checkPasswordStrength(passwordValue);

        if (passwordValue.length < 8 || strength < 4) {

            showMessage(
                "Please create a stronger password using at least 8 characters, uppercase and lowercase letters, and numbers.",
                "error"
            );

            password.focus();

            return;

        }


        // Confirm password

        if (passwordValue !== confirmValue) {

            showMessage(
                "Your passwords do not match.",
                "error"
            );

            confirmPassword.focus();

            return;

        }


        // Terms

        if (!terms.checked) {

            showMessage(
                "Please accept the Terms and Conditions.",
                "error"
            );

            terms.focus();

            return;

        }


        // =====================================
        // REGISTRATION DEMONSTRATION
        // =====================================

        signupButton.disabled = true;

        signupButton.innerHTML = `
            <span>Creating Account...</span>
            <i class="fa-solid fa-spinner fa-spin"></i>
        `;


        setTimeout(() => {

            signupButton.disabled = false;

            signupButton.innerHTML = `
                <span>Create Account</span>
                <i class="fa-solid fa-arrow-right"></i>
            `;

            showMessage(
                "Your registration form is valid! Backend account creation is the next step.",
                "success"
            );

            console.log("Valid registration details:", {
                fullName: nameValue,
                username: usernameValue,
                email: emailValue
            });

        }, 1200);

    });


    // =====================================
    // 8. TERMS AND PRIVACY LINKS
    // =====================================

    document.getElementById("termsLink").addEventListener("click", (event) => {

        event.preventDefault();

        showMessage(
            "Terms and Conditions page will be added later.",
            "success"
        );

    });

    document.getElementById("privacyLink").addEventListener("click", (event) => {

        event.preventDefault();

        showMessage(
            "Privacy Policy page will be added later.",
            "success"
        );

    });


    // =====================================
    // 9. INTERACTIVE LAMP ELEMENTS
    // =====================================

    const lampScene = document.getElementById("lampScene");

    const lampSwitch = document.getElementById("lampSwitch");

    const lampInstruction = document.getElementById("lampInstruction");

    const lampPower = document.getElementById("lampPower");

    const lampStatus = document.getElementById("lampStatus");

    const brightnessSlider = document.getElementById("brightnessSlider");

    const brightnessValue = document.getElementById("brightnessValue");


    if (
        lampScene &&
        lampSwitch &&
        lampInstruction &&
        lampPower &&
        lampStatus &&
        brightnessSlider &&
        brightnessValue
    ) {

        let lampIsOn = false;


        // =====================================
        // 10. LAMP POWER
        // =====================================

        function toggleLamp() {

            lampIsOn = !lampIsOn;

            updateLamp();

        }


        function updateLamp() {

            lampScene.classList.toggle("lamp-on", lampIsOn);

            lampPower.classList.toggle("active", lampIsOn);

            lampStatus.classList.toggle("active", lampIsOn);

            lampStatus.innerHTML = lampIsOn
                ? '<span class="status-dot"></span> ON'
                : '<span class="status-dot"></span> OFF';

            lampPower.setAttribute(
                "aria-pressed",
                String(lampIsOn)
            );

            lampSwitch.setAttribute(
                "aria-pressed",
                String(lampIsOn)
            );

            lampSwitch.setAttribute(
                "aria-label",
                lampIsOn ? "Switch lamp off" : "Switch lamp on"
            );

            lampInstruction.innerHTML = lampIsOn
                ? '<i class="fa-solid fa-lightbulb"></i> Lamp is ON — Click to switch off'
                : '<i class="fa-solid fa-hand-pointer"></i> Click the lamp to switch it on';

        }


        lampSwitch.addEventListener("click", toggleLamp);

        lampSwitch.addEventListener("keydown", (event) => {

            if (event.key === "Enter" || event.key === " ") {

                event.preventDefault();

                toggleLamp();

            }

        });

        lampPower.addEventListener("click", toggleLamp);


        // =====================================
        // 11. BRIGHTNESS
        // =====================================

        function updateBrightness() {

            const brightness = Number(brightnessSlider.value);

            const intensity = brightness / 100;

            brightnessValue.textContent = `${brightness}%`;

            lampScene.style.setProperty(
                "--brightness",
                intensity
            );

            lampScene.style.setProperty(
                "--beam-opacity",
                intensity
            );

            brightnessSlider.style.background = `
                linear-gradient(
                    to right,
                    #00eaff ${brightness}%,
                    #294052 ${brightness}%
                )
            `;

        }

        brightnessSlider.addEventListener(
            "input",
            updateBrightness
        );


       // =====================================
// 12. LIGHT TEMPERATURE
// =====================================

const temperatureButtons = document.querySelectorAll(".temperature-btn");

function setTemperature(temperature) {

    lampScene.classList.remove(
        "temperature-cool",
        "temperature-warm"
    );

    lampScene.classList.add(`temperature-${temperature}`);

    temperatureButtons.forEach(button => {

        button.classList.toggle(
            "active",
            button.dataset.temperature === temperature
        );

    });

}

temperatureButtons.forEach(button => {

    button.addEventListener("click", () => {

        setTemperature(button.dataset.temperature);

    });

});


// =====================================
// 13. LIGHTING PRESETS
// =====================================

const presetButtons = document.querySelectorAll(".preset-btn");

const lightingPresets = {

    reading: {
        brightness: 85,
        temperature: "warm"
    },

    focus: {
        brightness: 100,
        temperature: "cool"
    },

    relax: {
        brightness: 35,
        temperature: "warm"
    }

};

presetButtons.forEach(button => {

    button.addEventListener("click", () => {

        const presetName = button.dataset.preset;
        const preset = lightingPresets[presetName];

        if (!preset) {
            console.warn("Unknown lighting preset:", presetName);
            return;
        }

        // Apply brightness
        brightnessSlider.value = preset.brightness;
        updateBrightness();

        // Apply temperature
        setTemperature(preset.temperature);

        // Automatically switch lamp on
        if (!lampIsOn) {
            lampIsOn = true;
            updateLamp();
        }

        // Update active preset
        presetButtons.forEach(btn => {
            btn.classList.remove("active");
        });

        button.classList.add("active");

    });

});


        // =====================================
        // 14. LAMP HEAD MOVEMENT
        // =====================================

        lampScene.addEventListener("pointermove", (event) => {

            if (event.pointerType === "touch") return;

            const rect = lampScene.getBoundingClientRect();

            const x = (event.clientX - rect.left) / rect.width;

            const y = (event.clientY - rect.top) / rect.height;

            const mouseX = (x - 0.5) * 2;

            const mouseY = (y - 0.5) * 2;

            const headTilt = mouseX * 12 + mouseY * 3;

            lampScene.style.setProperty(
                "--lamp-tilt",
                `${headTilt}deg`
            );

            lampScene.style.setProperty(
                "--beam-x",
                `${mouseX * 22}px`
            );

            lampScene.style.setProperty(
                "--beam-angle",
                `${mouseX * 8 + mouseY * 3}deg`
            );

        });


        // =====================================
        // 15. RESET LAMP MOVEMENT
        // =====================================

        lampScene.addEventListener("pointerleave", () => {

            lampScene.style.setProperty(
                "--lamp-head-tilt",
                "0deg"
            );

            lampScene.style.setProperty(
                "--beam-x",
                "0px"
            );

            lampScene.style.setProperty(
                "--beam-angle",
                "0deg"
            );

        });


        // =====================================
        // 16. INITIALIZE LAMP
        // =====================================

        updateBrightness();

        updateLamp();

        setTemperature("warm");

    }


    // =====================================
    // 17. INITIALIZE PAGE
    // =====================================

    console.log("LAMP Signup Page Initialized Successfully!");

});
