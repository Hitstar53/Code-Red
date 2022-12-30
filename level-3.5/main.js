// Get the current time
const currentTime = new Date().getHours();
const bg = document.querySelector("body");
if (currentTime >= 18) {
    bg.classList.add("dark");
}
