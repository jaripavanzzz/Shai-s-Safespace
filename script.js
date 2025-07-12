const correctCode = "162428";
const passcodeDisplay = document.getElementById("passcodeDisplay");
const message = document.getElementById("message");
const lockBox = document.getElementById("lockBox");
const preloader = document.getElementById("preloader");
const welcomeModal = document.getElementById("welcomeModal");
const closeWelcomeBtn = document.getElementById("closeWelcomeBtn");
const yesBtn = document.getElementById("yesBtn");
const noBtn = document.getElementById("noBtn");
const giftModal = document.getElementById("giftModal");
const declineMsg = document.getElementById("declineMsg");
const numKeys = document.querySelectorAll(".num-key");
const clearBtn = document.getElementById("clearBtn");
const enterBtn = document.getElementById("enterBtn");
const togglePassBtn = document.getElementById("togglePassBtn");

// Initially, show gift modal and disable scrolling
document.body.style.overflow = "hidden";

// YES button — hide gift modal and show preloader then lock box
yesBtn.onclick = function () {
  giftModal.style.display = "none";
  document.body.style.overflow = "";
  preloader.style.display = "flex";

  setTimeout(() => {
    preloader.style.opacity = "0";
    preloader.style.pointerEvents = "none";
    lockBox.style.opacity = "1";
    lockBox.style.transform = "translate(-50%, -50%) scale(1)";
  }, 1500);
};

// NO button — show decline message
noBtn.onclick = function () {
  declineMsg.style.display = "block";
  declineMsg.textContent = "You're not Shai, please don't open this. 😠";
  declineMsg.style.animation = "shake 0.4s";
  setTimeout(() => {
    declineMsg.style.animation = "";
  }, 400);
};

// Numpad input handler
numKeys.forEach((key) => {
  key.addEventListener("click", () => {
    if (key === clearBtn) {
      // Clear last digit
      passcodeDisplay.value = passcodeDisplay.value.slice(0, -1);
    } else if (key !== enterBtn) {
      // Add digit if length < 6
      if (passcodeDisplay.value.length < 6) {
        passcodeDisplay.value += key.textContent;
      }
    }
  });
});

// Toggle passcode visibility
togglePassBtn.addEventListener("click", () => {
  if (passcodeDisplay.type === "password") {
    passcodeDisplay.type = "text";
    togglePassBtn.textContent = "🙈";
  } else {
    passcodeDisplay.type = "password";
    togglePassBtn.textContent = "👁";
  }
});

// Enter button click - check passcode
enterBtn.addEventListener("click", () => {
  if (passcodeDisplay.value === correctCode) {
    welcomeModal.style.display = "flex";
    document.body.style.overflow = "hidden";
    message.textContent = "";
    passcodeDisplay.value = "";
  } else {
    message.textContent = "Try again!";
    message.className = "error";
    shake(lockBox);
    passcodeDisplay.value = "";
  }
});

// Close welcome modal and redirect
closeWelcomeBtn.onclick = function () {
  welcomeModal.style.display = "none";
  document.body.style.overflow = "";
  location.href = "lovey.html";
};

// Preloader auto-hide on window load and show lock box
window.addEventListener("load", () => {
  setTimeout(() => {
    preloader.style.opacity = "0";
    preloader.style.pointerEvents = "none";
    lockBox.style.opacity = "1";
    lockBox.style.transform = "translate(-50%, -50%) scale(1)";
  }, 1500);
});

// Shake animation function for incorrect passcode
function shake(el) {
  el.animate(
    [
      { transform: "translate(-50%, -50%) translateX(0)" },
      { transform: "translate(-50%, -50%) translateX(-10px)" },
      { transform: "translate(-50%, -50%) translateX(10px)" },
      { transform: "translate(-50%, -50%) translateX(0)" },
    ],
    {
      duration: 400,
      easing: "ease-in-out",
    }
  );
}


