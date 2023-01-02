const time = 10; // Time in seconds
let countDown;

function startTimer() {
    countDown = setInterval(() => {
        time--;
        document.getElementById("time").innerHTML = time;
        if (time === 0) {
            clearInterval(countDown);
            explode();
        }
    }, 1000);
}

function explode() {
    document.getElementById("explosion").style.display = "block";
    // Explosion animation goes here

}

document.getElementById("wire1").addEventListener("click", function () {
    // Wire cutting logic goes here

});

document.getElementById("wire2").addEventListener("click", function () {
    // Wire cutting logic goes here

});

document.getElementById("wire3").addEventListener("click", function () {
    // Wire cutting logic goes here

});

document.getElementById("wire4").addEventListener("click", function () {
    // Wire cutting logic goes here
    
});

startTimer();
