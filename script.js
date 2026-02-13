const yesBtn = document.querySelector(".yes-btn");
const noBtn = document.querySelector(".no-btn");
const question = document.querySelector(".question");
const gif = document.querySelector(".gif");

// Change text and gif when the Yes button is clicked
yesBtn.addEventListener("click", () => {
    question.innerHTML = "See you on Feb 14th! 💌";
    gif.src = "https://media3.giphy.com/media/v1.Y2lkPTc5MGI3NjExY3RoZnY5aWhtMnRjYmhqYjFvMTlyZ3NpdGl2YTVrc3N6azVhaDBpbCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/c76IJLufpNwSULPk77/giphy.gif";

    const audio = document.getElementById("bg-music");
    audio.play();

    // Hide the Yes button
    yesBtn.style.display = "none";

    // Hide the No button
    noBtn.style.display = "none";

    // Trigger confetti
    confetti({
        particleCount: 150,
        spread: 80,
        origin: { y: 0.6 }
    });
});

const muteBtn = document.getElementById("mute-btn");
muteBtn.addEventListener("click", () => {
    const audio = document.getElementById("bg-music");
    if (audio.muted) {
        audio.muted = false;
        muteBtn.innerText = "Mute 🔇";
    } else {
        audio.muted = true;
        muteBtn.innerText = "Unmute 🔊";
    }
});

const messages = [
    "Are you sure?",
    "Really?",
    "Think again!",
    "Last chance!",
    "Surely not?",
    "You might regret this!",
    "Give it another thought!",
    "Are you absolutely certain?",
    "This could be a mistake!",
    "Have a heart!",
    "Don't be so cold!",
    "Change of heart?",
    "Wouldn't you reconsider?",
    "Is that your final answer?",
    "You're breaking my heart ;(",
];

let messageIndex = 0;
let currentSize = 18; // Initial font size in px
let currentPadding = 12; // Initial padding in px

function handleNoInteraction() {
    noBtn.style.position = "absolute";
    const wrapper = document.querySelector(".wrapper");
    const wrapperRect = wrapper.getBoundingClientRect();
    const noBtnRect = noBtn.getBoundingClientRect();
    const yesBtnRect = yesBtn.getBoundingClientRect();

    // Calculate max positions to ensure the button stays within the wrapper
    const maxX = wrapperRect.width - noBtnRect.width;
    const maxY = wrapperRect.height - noBtnRect.height;

    // Get Yes button position relative to wrapper
    // Since Yes button is in document flow, we need its position relative to the viewport 
    // and subtract wrapper's position to get coordinates relative to wrapper, 
    // IF the wrapper was the offset parent. But wait, noBtn is absolute relative to wrapper (position: relative).
    // So we need Yes button's coordinates relative to the wrapper.

    const yesX = yesBtnRect.left - wrapperRect.left;
    const yesY = yesBtnRect.top - wrapperRect.top;

    // Safe distance around Yes button
    const safeGap = 50;

    let randomX, randomY;
    let overlap = true;
    let attempts = 0;

    while (overlap && attempts < 50) {
        // Ensure randomX and randomY are within the wrapper bounds
        randomX = Math.min(Math.floor(Math.random() * maxX), maxX);
        randomY = Math.min(Math.floor(Math.random() * maxY), maxY);

        // Check for collision with Yes button (expanded by safeGap)
        // No button area: randomX, randomY, randomX + noBtnRect.width, randomY + noBtnRect.height
        // Yes button safe area: yesX - safeGap, yesY - safeGap, yesX + yesBtnRect.width + safeGap, yesY + yesBtnRect.height + safeGap

        if (
            randomX < yesX + yesBtnRect.width + safeGap &&
            randomX + noBtnRect.width > yesX - safeGap &&
            randomY < yesY + yesBtnRect.height + safeGap &&
            randomY + noBtnRect.height > yesY - safeGap
        ) {
            overlap = true;
        } else {
            overlap = false;
        }
        attempts++;
    }

    noBtn.style.left = randomX + "px";
    noBtn.style.top = randomY + "px";

    // Change text
    noBtn.innerText = messages[messageIndex];
    messageIndex = (messageIndex + 1) % messages.length;

    // Grow the Yes button
    currentSize += 5;
    currentPadding += 2;
    yesBtn.style.fontSize = `${currentSize}px`;
    yesBtn.style.padding = `${currentPadding}px ${currentPadding * 2.5}px`;
}

// Make the No button move and change text on interaction
noBtn.addEventListener("mouseover", handleNoInteraction);
noBtn.addEventListener("click", handleNoInteraction);

// Create floating hearts
function createHeart() {
    const heart = document.createElement("div");
    heart.classList.add("heart");
    heart.innerText = "❤";
    heart.style.left = Math.random() * 100 + "vw";
    heart.style.animationDuration = Math.random() * 3 + 3 + "s";
    document.body.appendChild(heart);

    setTimeout(() => {
        heart.remove();
    }, 6000);
}

setInterval(createHeart, 500);