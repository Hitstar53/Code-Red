function countdown(elementName, hours, minutes, seconds) {
    var element, endTime, hours, mins, msLeft, time;
    function twoDigits(n) {
        return (n <= 9 ? "0" + n : n);
    }
    function updateTimer() {
        msLeft = endTime - (+new Date);
        if (msLeft < 1000) {
            element.innerHTML = "Time is up!";
        } else {
            time = new Date(msLeft);
            hours = time.getUTCHours();
            mins = time.getUTCMinutes();
            element.innerHTML = (twoDigits(hours) ? twoDigits(hours) + ':' + twoDigits(mins) : mins) + ':' + twoDigits(time.getUTCSeconds());
            setTimeout(updateTimer, time.getUTCMilliseconds() + 500);
        }
    }
    element = document.getElementById(elementName);
    endTime = (+new Date) + 1000 * (3600 * hours + 60 * minutes + seconds) + 500;
    updateTimer();
}

function stopwatch(elementName, hours, mins, seconds) {
    //build a stopwatch that keeps going till a stop function is not called
    var minutes = 00;
    var seconds = 00;
    var tens = 00;
    var appendTens = document.getElementById("tens")
    var appendSeconds = document.getElementById("seconds")
    var appendMinutes = document.getElementById("minutes")
    var Interval;
    Interval = setInterval(startTimer, 10);
    /* function startTimer() {
        tens++;
        if (tens <= 9) {
            appendTens.innerHTML = "0" + tens;
        }
        if (tens > 9) {
            appendTens.innerHTML = tens;
        }
        if (tens > 99) {
            console.log("seconds");
            seconds++;
            appendSeconds.innerHTML = "0" + seconds;
            tens = 0;
            appendTens.innerHTML = "0" + 0;
        }
        if (seconds > 9) {
            appendSeconds.innerHTML = seconds;
        }
    } */
    //generate a similar function but it should also display minutes
    function startTimer() {
        tens++;
        if (tens <= 9) {
            appendTens.innerHTML = "0" + tens;
        }
        if (tens > 9) {
            appendTens.innerHTML = tens;
        }
        if (tens > 99) {
            console.log("seconds");
            seconds++;
            appendSeconds.innerHTML = "0" + seconds;
            tens = 0;
            appendTens.innerHTML = "0" + 0;
        }
        if (seconds > 9) {
            appendSeconds.innerHTML = seconds;
        }
        if (seconds > 59) {
            console.log("minutes");
            minutes++;
            appendMinutes.innerHTML = "0" + minutes;
            seconds = 0;
            appendSeconds.innerHTML = "0" + 0;
        }
        if (minutes > 9) {
            appendMinutes.innerHTML = minutes;
        }
    }
}

countdown("2h-countdown", 2, 0, 0);
stopwatch("stopwatch", 2, 0, 0);
