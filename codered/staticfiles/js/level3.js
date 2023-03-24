// const currentTime = new Date().getHours();
// const btn = document.getElementById("nextbtn");
// if (currentTime === 18) {
    // btn.disabled = false;
    // btn.style.backgroundColor = "#080710";
    // btn.style.cursor = "pointer";
// }

const lform = document.getElementById("lform");
const phrase = document.getElementById("passcode");
//if phrase is hidden then make form height 100%
if (phrase.style.display !== "none") {
    lform.style.height = "500px";
}
else {
    lform.style.height = "460px";
}

var words = ['Meet-Up with Agent Sherlock Homless at 6 PM'],
    part,
    level3_i = 0,
    offset = 0,
    len = words.length,
    forwards = true,
    skip_count = 0,
    skip_delay = 15,
    speed = 70;
var wordflick = function () {
    setInterval(function () {
        if (forwards) {
            if (offset >= words[level3_i].length) {
                ++skip_count;
                if (skip_count == skip_delay) {
                    forwards = false;
                    skip_count = 0;
                }
            }
        }
        else {
            if (offset == 0) {
                forwards = true;
                level3_i++;
                offset = 0;
                if (level3_i >= len) {
                    level3_i = 0;
                }
            }
        }
        part = words[level3_i].substr(0, offset);
        if (skip_count == 0) {
            if (forwards) {
                offset++;
            }
            else {
                offset--;
            }
        }
        $('.word').text(part);
    }, speed);
};
$(document).ready(function () {
    wordflick();
});