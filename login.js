
document.addEventListener("DOMContentLoaded", () => {

    // =====================================
    // 1. LOGIN ELEMENTS
    // =====================================

    const loginForm = document.getElementById("loginForm");

    const email = document.getElementById("email");
    const password = document.getElementById("password");

    const togglePassword = document.getElementById("togglePassword");
    const rememberMe = document.getElementById("rememberMe");

    const loginButton = document.getElementById("loginButton");
    const loginMessage = document.getElementById("loginMessage");

    const forgotPassword = document.getElementById("forgotPassword");


    // =====================================
    // 2. REMEMBER EMAIL
    // =====================================

    const savedEmail = localStorage.getItem("lampUserEmail");

    if (savedEmail) {
        email.value = savedEmail;
        rememberMe.checked = true;
    }


    // =====================================
    // 3. SHOW / HIDE PASSWORD
    // =====================================

    togglePassword.addEventListener("click", () => {

        const isHidden = password.type === "password";

        password.type = isHidden ? "text" : "password";

        togglePassword.innerHTML = isHidden
            ? '<i class="fa-regular fa-eye-slash"></i>'
            : '<i class="fa-regular fa-eye"></i>';

        togglePassword.setAttribute(
            "aria-label",
            isHidden ? "Hide password" : "Show password"
        );

    });


    // =====================================
    // 4. LOGIN MESSAGE FUNCTION
    // =====================================

    function showMessage(message, type) {

        loginMessage.textContent = message;

        loginMessage.className = `login-message ${type}`;

    }


    // =====================================
    // 5. LOGIN FORM SUBMISSION
    // =====================================

    loginForm.addEventListener("submit", (e) => {

        e.preventDefault();

        const emailValue = email.value.trim();
        const passwordValue = password.value;

        loginMessage.textContent = "";

        if (!emailValue || !passwordValue) {

            showMessage(
                "Please enter your email and password.",
                "error"
            );

            return;

        }

        if (!email.checkValidity()) {

            showMessage(
                "Please enter a valid email address.",
                "error"
            );

            email.focus();

            return;

        }

        if (passwordValue.length < 6) {

            showMessage(
                "Your password must have at least 6 characters.",
                "error"
            );

            password.focus();

            return;

        }


        // Remember email

        if (rememberMe.checked) {

            localStorage.setItem("lampUserEmail", emailValue);

        } else {

            localStorage.removeItem("lampUserEmail");

        }


        // Loading animation

        loginButton.disabled = true;

        loginButton.innerHTML = `
            <span>Signing In...</span>
            <i class="fa-solid fa-spinner fa-spin"></i>
        `;


        // Demo response

        setTimeout(() => {

            loginButton.disabled = false;

            loginButton.innerHTML = `
                <span>Sign In</span>
                <i class="fa-solid fa-arrow-right"></i>
            `;

            showMessage(
                "Login interface is working! Backend authentication is next.",
                "success"
            );

        }, 1500);

    });


    // =====================================
    // 6. FORGOT PASSWORD
    // =====================================

    forgotPassword.addEventListener("click", (e) => {

        e.preventDefault();

        const emailValue = email.value.trim();

        if (!emailValue) {

            showMessage(
                "Enter your email address first.",
                "error"
            );

            email.focus();

            return;

        }

        showMessage(
            "Password recovery will be connected to the backend.",
            "success"
        );

    });


    // =====================================
    // 7. SOCIAL LOGIN BUTTONS
    // =====================================

    document.querySelectorAll(".social-btn").forEach(button => {

        button.addEventListener("click", () => {

            const provider = button.dataset.provider;

            showMessage(
                `${provider} authentication will be configured later.`,
                "success"
            );

        });

    });


    // =====================================
    // 8. INTERACTIVE LAMP ELEMENTS
    // =====================================

    const lampScene = document.getElementById("lampScene");

    const lampSwitch = document.getElementById("lampSwitch");

    const lampInstruction = document.getElementById("lampInstruction");

    const lampPower = document.getElementById("lampPower");

    const lampStatus = document.getElementById("lampStatus");

    const brightnessSlider = document.getElementById("brightnessSlider");

    const brightnessValue = document.getElementById("brightnessValue");


    // Check that lamp elements exist

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
        // 9. LAMP POWER CONTROL
        // =====================================

        function toggleLamp() {

            lampIsOn = !lampIsOn;

            updateLamp();

        }


        function updateLamp() {

            // Update lamp appearance

            lampScene.classList.toggle("lamp-on", lampIsOn);

            // Update power button

            lampPower.classList.toggle("active", lampIsOn);

            lampPower.setAttribute(
                "aria-pressed",
                String(lampIsOn)
            );

            // Update lamp status

            lampStatus.classList.toggle("active", lampIsOn);

            lampStatus.innerHTML = lampIsOn
                ? '<span class="status-dot"></span> ON'
                : '<span class="status-dot"></span> OFF';

            // Update lamp accessibility

            lampSwitch.setAttribute(
                "aria-pressed",
                String(lampIsOn)
            );

            lampSwitch.setAttribute(
                "aria-label",
                lampIsOn ? "Switch lamp off" : "Switch lamp on"
            );

            // Update instructions

            lampInstruction.innerHTML = lampIsOn
                ? '<i class="fa-solid fa-lightbulb"></i> Lamp is ON — Click to switch off'
                : '<i class="fa-solid fa-hand-pointer"></i> Click the lamp to switch it on';

            // Reapply brightness

            updateBrightness();

        }


        // =====================================
        // 10. CLICK LAMP SHADE
        // =====================================

        lampSwitch.addEventListener("click", toggleLamp);


        // Keyboard support

        lampSwitch.addEventListener("keydown", (event) => {

            if (event.key === "Enter" || event.key === " ") {

                event.preventDefault();

                toggleLamp();

            }

        });


        // =====================================
        // 11. POWER BUTTON
        // =====================================

        lampPower.addEventListener("click", toggleLamp);


        // =====================================
        // 12. BRIGHTNESS CONTROL
        // =====================================

        function updateBrightness() {

            const brightness = Number(brightnessSlider.value);

            const intensity = brightness / 100;

            // Display percentage

            brightnessValue.textContent = `${brightness}%`;

            // Update CSS brightness variables

            lampScene.style.setProperty(
                "--brightness",
                intensity
            );

            lampScene.style.setProperty(
                "--beam-opacity",
                intensity
            );

            // Update slider track

            brightnessSlider.style.background = `
                linear-gradient(
                    to right,
                    #00eaff ${brightness}%,
                    #294052 ${brightness}%
                )
            `;

            // Update bulb brightness

            const bulb = lampScene.querySelector(".lamp-bulb");

            if (bulb) {

                bulb.style.opacity = Math.max(
                    0.25,
                    intensity
                );

            }

        }


        brightnessSlider.addEventListener(
            "input",
            updateBrightness
        );


        // =====================================
        // 13. MOUSE TRACKING
        // =====================================

        lampScene.addEventListener("pointermove", (event) => {

            const rect = lampScene.getBoundingClientRect();

            const x = (event.clientX - rect.left) / rect.width;

            const y = (event.clientY - rect.top) / rect.height;

            // Normalize mouse position

            const mouseX = (x - 0.5) * 2;

            const mouseY = (y - 0.5) * 2;

            // Lamp tilt

            const tilt = mouseX * -3;

            lampScene.style.setProperty(
                "--lamp-tilt",
                `${tilt}deg`
            );

            // Move light beam

            const beamX = mouseX * 22;

            const beamAngle = mouseX * 9 + mouseY * 3;

            lampScene.style.setProperty(
                "--beam-x",
                `${beamX}px`
            );

            lampScene.style.setProperty(
                "--beam-angle",
                `${beamAngle}deg`
            );

        });


        // =====================================
        // 14. RESET MOUSE POSITION
        // =====================================

        lampScene.addEventListener("pointerleave", () => {

            lampScene.style.setProperty(
                "--lamp-tilt",
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
        // 15. INITIALIZE LAMP
        // =====================================

        updateBrightness();

        updateLamp();

    } else {

        console.warn(
            "Lamp controls not found. Check the IDs in login.html."
        );

    }


    // =====================================
    // 16. PAGE INITIALIZATION
    // =====================================

    console.log("Interactive Lamp Login initialized successfully!");

});
