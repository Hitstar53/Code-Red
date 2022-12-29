// Get the current time
const currentTime = new Date().getHours();
const bg = document.querySelector("body");
if (currentTime >= 17) {
    bg.classList.add("dark");
}
