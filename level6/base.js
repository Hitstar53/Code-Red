/*************************************/
// Low-poly Background animations

var refreshDuration = 10000;
        var refreshTimeout;
        var numPointsX;
        var numPointsY;
        var unitWidth;
        var unitHeight;
        var points;
        
        function onLoad()
        {
            var svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
            svg.setAttribute('width',window.outerWidth);
            svg.setAttribute('height',window.outerHeight);
            document.querySelector('#bg').appendChild(svg);
        
            var unitSize = (window.innerWidth+window.innerHeight)/15;
            numPointsX = Math.ceil(window.innerWidth/unitSize)+1;
            numPointsY = Math.ceil(window.innerHeight/unitSize)+1;
            unitWidth = Math.ceil(window.innerWidth/(numPointsX-1));
            unitHeight = Math.ceil(window.innerHeight/(numPointsY-1));
        
            points = [];
        
            for(var y = 0; y < numPointsY; y++) {
                for(var x = 0; x < numPointsX; x++) {
                    points.push({x:unitWidth*x, y:unitHeight*y, originX:unitWidth*x, originY:unitHeight*y});
                }
            }
        
            randomize();
        
            for(var i = 0; i < points.length; i++) {
                if(points[i].originX != unitWidth*(numPointsX-1) && points[i].originY != unitHeight*(numPointsY-1)) {
                    var topLeftX = points[i].x;
                    var topLeftY = points[i].y;
                    var topRightX = points[i+1].x;
                    var topRightY = points[i+1].y;
                    var bottomLeftX = points[i+numPointsX].x;
                    var bottomLeftY = points[i+numPointsX].y;
                    var bottomRightX = points[i+numPointsX+1].x;
                    var bottomRightY = points[i+numPointsX+1].y;
        
                    var rando = Math.floor(Math.random()*2);
        
                    for(var n = 0; n < 2; n++) {
                        var polygon = document.createElementNS(svg.namespaceURI, 'polygon');
        
                        if(rando==0) {
                            if(n==0) {
                                polygon.point1 = i;
                                polygon.point2 = i+numPointsX;
                                polygon.point3 = i+numPointsX+1;
                                polygon.setAttribute('points',topLeftX+','+topLeftY+' '+bottomLeftX+','+bottomLeftY+' '+bottomRightX+','+bottomRightY);
                            } else if(n==1) {
                                polygon.point1 = i;
                                polygon.point2 = i+1;
                                polygon.point3 = i+numPointsX+1;
                                polygon.setAttribute('points',topLeftX+','+topLeftY+' '+topRightX+','+topRightY+' '+bottomRightX+','+bottomRightY);
                            }
                        } else if(rando==1) {
                            if(n==0) {
                                polygon.point1 = i;
                                polygon.point2 = i+numPointsX;
                                polygon.point3 = i+1;
                                polygon.setAttribute('points',topLeftX+','+topLeftY+' '+bottomLeftX+','+bottomLeftY+' '+topRightX+','+topRightY);
                            } else if(n==1) {
                                polygon.point1 = i+numPointsX;
                                polygon.point2 = i+1;
                                polygon.point3 = i+numPointsX+1;
                                polygon.setAttribute('points',bottomLeftX+','+bottomLeftY+' '+topRightX+','+topRightY+' '+bottomRightX+','+bottomRightY);
                            }
                        }
                        polygon.setAttribute('fill','rgba(0,0,0,'+(Math.random()/3)+')');
                        var animate = document.createElementNS('http://www.w3.org/2000/svg','animate');
                        animate.setAttribute('fill','freeze');
                        animate.setAttribute('attributeName','points');
                        animate.setAttribute('dur',refreshDuration+'ms');
                        animate.setAttribute('calcMode','linear');
                        polygon.appendChild(animate);
                        svg.appendChild(polygon);
                    }
                }
            }
        
            refresh();
        
        }
        
        function randomize() {
            for(var i = 0; i < points.length; i++) {
                if(points[i].originX != 0 && points[i].originX != unitWidth*(numPointsX-1)) {
                    points[i].x = points[i].originX + Math.random()*unitWidth-unitWidth/2;
                }
                if(points[i].originY != 0 && points[i].originY != unitHeight*(numPointsY-1)) {
                    points[i].y = points[i].originY + Math.random()*unitHeight-unitHeight/2;
                }
            }
        }
        
        function refresh() {
            randomize();
            for(var i = 0; i < document.querySelector('#bg svg').childNodes.length; i++) {
                var polygon = document.querySelector('#bg svg').childNodes[i];
                var animate = polygon.childNodes[0];
                if(animate.getAttribute('to')) {
                    animate.setAttribute('from',animate.getAttribute('to'));
                }
                animate.setAttribute('to',points[polygon.point1].x+','+points[polygon.point1].y+' '+points[polygon.point2].x+','+points[polygon.point2].y+' '+points[polygon.point3].x+','+points[polygon.point3].y);
                animate.beginElement();
            }
            refreshTimeout = setTimeout(function() {refresh();}, refreshDuration);
        }
        
        function onResize() {
            document.querySelector('#bg svg').remove();
            clearTimeout(refreshTimeout);
            onLoad();
        }
        
        window.onload = onLoad;
        window.onresize = onResize;
        
// End of Low-poly background animations

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

function stopwatch(elementName) {
    //build a stopwatch that keeps going till a stop function is not called
    var minutes = 00;
    var seconds = 00;
    var tens = 00;
    var appendTens = document.getElementById("tens")
    var appendSeconds = document.getElementById("seconds")
    var appendMinutes = document.getElementById("minutes")
    const btn = document.getElementById("hint");
    var Interval;
    Interval = setInterval(startTimer, 10);
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
            seconds++;
            appendSeconds.innerHTML = "0" + seconds;
            tens = 0;
            appendTens.innerHTML = "0" + 0;
        }
        if (seconds > 9) {
            appendSeconds.innerHTML = seconds;
        }
        if (seconds > 59) {
            minutes++;
            appendMinutes.innerHTML = "0" + minutes;
            seconds = 0;
            appendSeconds.innerHTML = "0" + 0;
        }
        if (minutes>0) {
            btn.disabled = false;
            btn.style.border = "none";
            btn.style.color = "black";
            btn.style.backgroundColor = "yellow";
            btn.style.cursor = "pointer";
        }
        if (minutes < 9) {
            appendMinutes.innerHTML = "0" + minutes;
        }
        if (minutes > 9) {
            appendMinutes.innerHTML = minutes;
        }
    }
}

countdown("2h-countdown", 2, 0, 0);
stopwatch("stopwatch");

// Stopwatch = 10 mins
// var hints
// default: 3
// pre event: 2
const textWrapper = document.querySelector('.text-wrapper p');
let text = textWrapper.innerHTML;
textWrapper.innerHTML = "";

let i = 0;
const typing = setInterval(() => {
  if (i < text.length) {
    textWrapper.innerHTML += text.charAt(i);
    i++;
  } else {
    clearInterval(typing);
  }
}, 50);

function flipCard(card) {
    card.classList.toggle('card-flipped');
  }

