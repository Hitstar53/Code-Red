const button = document.getElementById("button");
var gspot = Math.random() * 500;
gspot = Math.round(gspot);
console.log(gspot);
button.addEventListener("mousemove", () => {
    const left = parseInt(button.style.left, 10);
    const top = parseInt(button.style.top, 10);
    // const distance = Math.sqrt(Math.pow(left-gspot,2) + Math.pow(left-gspot,2));
    const distance = Math.min(Math.abs(left-gspot), Math.abs(top-gspot));
    console.log(left, top);
    if (left !== gspot && top !== gspot) {
        const width = window.innerWidth;
        const height = window.innerHeight;
        const x = Math.random() * width;
        const y = Math.random() * height;
        button.style.left = `${x}px`;
        button.style.top = `${y}px`;
    } else {
        console.log("You win!");
    }
    if (distance<100) {
        button.classList.add("nearest");
    } else if (distance<300) {
        button.classList.add("near");
    } else if (distance<500) {
        button.classList.add("closer");
    } else {
        button.classList.remove("nearest");
        button.classList.remove("near");
        button.classList.remove("closer");
    }
});

var words = ["Click the button to move on to the next level","hint: Warmer and colder"],
    part,
    i = 0,
    offset = 0,
    len = words.length,
    forwards = true,
    skip_count = 0,
    skip_delay = 15,
    speed = 70;
var wordflick = function () {
    setInterval(function () {
        if (forwards) {
            if (offset >= words[i].length) {
                ++skip_count;
                if (skip_count == skip_delay) {
                    forwards = false;
                    skip_count = 0;
                }
            }
        } else {
            if (offset == 0) {
                forwards = true;
                i++;
                offset = 0;
                if (i >= len) {
                    i = 0;
                }
            }
        }
        part = words[i].substr(0, offset);
        if (skip_count == 0) {
            if (forwards) {
                offset++;
            } else {
                offset--;
            }
        }
        $(".word").text(part);
    }, speed);
};
$(document).ready(function () {
    wordflick();
});
