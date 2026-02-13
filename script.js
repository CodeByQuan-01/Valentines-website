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

// Make the No button move randomly on hover
noBtn.addEventListener("mouseover", () => {
    const wrapper = document.querySelector(".wrapper");
    const wrapperRect = wrapper.getBoundingClientRect();
    const noBtnRect = noBtn.getBoundingClientRect();

    // Calculate max positions to ensure the button stays within the wrapper
    const maxX = wrapperRect.width - noBtnRect.width;
    const maxY = wrapperRect.height - noBtnRect.height;

    // Ensure randomX and randomY are within the wrapper bounds
    const randomX = Math.min(Math.floor(Math.random() * maxX), maxX);
    const randomY = Math.min(Math.floor(Math.random() * maxY), maxY);

    noBtn.style.left = randomX + "px";
    noBtn.style.top = randomY + "px";
});