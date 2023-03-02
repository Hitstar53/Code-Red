const button = document.getElementById("button");
// setting screen limits
const screenWidth = window.innerWidth;
const screenHeight = window.innerHeight;
// setting gspot
var gspot = Math.random() * 500;
gspot = Math.round(gspot);
//testing gspot
// console.log(gspot);
button.addEventListener("mousemove", e => {
    const left = parseInt(button.style.left, 10);
    const top = parseInt(button.style.top, 10);
    let newTop = e.clientY;
    let newLeft = e.clientX;
    // Check if the new top position is within the screen bounds
    if (newTop<0) {
        newTop = 0;
    } else if (newTop+button.offsetHeight>screenHeight) {
        newTop = screenHeight-button.offsetHeight;
    }
    // Check if the new left position is within the screen bounds
    if (newLeft<0) {
        newLeft = 0;
    } else if (newLeft+button.offsetWidth>screenWidth) {
        newLeft = screenWidth-button.offsetWidth;
    }
    const distance = Math.sqrt(Math.pow(left-gspot,2) + Math.pow(left-gspot,2));
    // const distance = Math.min(Math.abs(left-gspot), Math.abs(top-gspot));
    // console.log(left, top);
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
    } else if (distance<250) {
        button.classList.add("near");
    } else if (distance<350) {
        button.classList.add("closer");
    } else {
        button.classList.remove("nearest");
        button.classList.remove("near");
        button.classList.remove("closer");
    }
});

var words = ["Click the button to move on to the next level","hint: Warmer and colder"],
    part,
    level2_i = 0,
    offset = 0,
    len = words.length,
    forwards = true,
    skip_count = 0,
    skip_delay = 15,
    speed = 70;
var wordflick = function () {
    setInterval(function () {
        if (forwards) {
            if (offset >= words[level2_i].length) {
                ++skip_count;
                if (skip_count == skip_delay) {
                    forwards = false;
                    skip_count = 0;
                }
            }
        } else {
            if (offset == 0) {
                forwards = true;
                level2_i++;
                offset = 0;
                if (level2_i >= len) {
                    level2_i = 0;
                }
            }
        }
        part = words[level2_i].substr(0, offset);
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