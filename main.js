const button = document.querySelector("button");
button.addEventListener("click", () => {
  const left = parseInt(button.style.left, 10);
  const top = parseInt(button.style.top, 10);
  if (left !== 200 || top !== 200) {
    const width = window.innerWidth;
    const height = window.innerHeight;
    const x = Math.random() * width;
    const y = Math.random() * height;
    button.style.left = `${x}px`;
    button.style.top = `${y}px`;
  } else {
    console.log("You win!");
  }
});
