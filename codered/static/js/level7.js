//show loader for 3 seconds
setTimeout(function () {
  document.getElementById("loader").style.display = "none";
  document.getElementById("wrapper").style.display = "block";
}, 3000);

var events = new Events();
events.add = function (obj) {
  obj.events = {};
};
events.implement = function (fn) {
  fn.prototype = Object.create(Events.prototype);
};
var checker1 = 0;
var checker2 = 0;
var checker3 = 0;
function Events() {
  this.events = {};
}
Events.prototype.on = function (name, fn) {
  var events = this.events[name];
  if (events == undefined) {
    this.events[name] = [fn];
    this.emit("event:on", fn);
  } else {
    if (events.indexOf(fn) == -1) {
      events.push(fn);
      this.emit("event:on", fn);
    }
  }
  return this;
};
Events.prototype.once = function (name, fn) {
  var events = this.events[name];
  fn.once = true;
  if (!events) {
    this.events[name] = [fn];
    this.emit("event:once", fn);
  } else {
    if (events.indexOf(fn) == -1) {
      events.push(fn);
      this.emit("event:once", fn);
    }
  }
  return this;
};
Events.prototype.emit = function (name, args) {
  var events = this.events[name];
  if (events) {
    var i = events.length;
    while (i--) {
      if (events[i]) {
        events[i].call(this, args);
        if (events[i].once) {
          delete events[i];
        }
      }
    }
  }
  return this;
};
Events.prototype.unbind = function (name, fn) {
  if (name) {
    var events = this.events[name];
    if (events) {
      if (fn) {
        var i = events.indexOf(fn);
        if (i != -1) {
          delete events[i];
        }
      } else {
        delete this.events[name];
      }
    }
  } else {
    delete this.events;
    this.events = {};
  }
  return this;
};

var userPrefix;

var prefix = (function () {
  var styles = window.getComputedStyle(document.documentElement, ""),
    pre = (Array.prototype.slice
      .call(styles)
      .join("")
      .match(/-(moz|webkit|ms)-/) ||
      (styles.OLink === "" && ["", "o"]))[1],
    dom = "WebKit|Moz|MS|O".match(new RegExp("(" + pre + ")", "i"))[1];
  userPrefix = {
    dom: dom,
    lowercase: pre,
    css: "-" + pre + "-",
    js: pre[0].toUpperCase() + pre.substr(1),
  };
})();

function bindEvent(element, type, handler) {
  if (element.addEventListener) {
    element.addEventListener(type, handler, false);
  } else {
    element.attachEvent("on" + type, handler);
  }
}

function Viewport(data) {
  events.add(this);

  var self = this;

  this.element = data.element;
  this.fps = data.fps;
  this.sensivity = data.sensivity;
  this.sensivityFade = data.sensivityFade;
  this.touchSensivity = data.touchSensivity;
  this.speed = data.speed;

  this.lastX = 0;
  this.lastY = 0;
  this.mouseX = 0;
  this.mouseY = 0;
  this.distanceX = 0;
  this.distanceY = 0;
  this.positionX = 1122;
  this.positionY = 136;
  this.torqueX = 0;
  this.torqueY = 0;

  this.down = false;
  this.upsideDown = false;

  this.previousPositionX = 0;
  this.previousPositionY = 0;

  this.currentSide = 0;
  this.calculatedSide = 0;

  bindEvent(document, "mousedown", function () {
    self.down = true;
  });

  bindEvent(document, "mouseup", function () {
    self.down = false;
  });

  bindEvent(document, "keyup", function () {
    self.down = false;
  });

  bindEvent(document, "mousemove", function (e) {
    self.mouseX = e.pageX;
    self.mouseY = e.pageY;
  });

  bindEvent(document, "touchstart", function (e) {
    self.down = true;
    e.touches ? (e = e.touches[0]) : null;
    self.mouseX = e.pageX / self.touchSensivity;
    self.mouseY = e.pageY / self.touchSensivity;
    self.lastX = self.mouseX;
    self.lastY = self.mouseY;
  });

  bindEvent(document, "touchmove", function (e) {
    if (e.preventDefault) {
      e.preventDefault();
    }

    if (e.touches.length == 1) {
      e.touches ? (e = e.touches[0]) : null;

      self.mouseX = e.pageX / self.touchSensivity;
      self.mouseY = e.pageY / self.touchSensivity;
    }
  });

  bindEvent(document, "touchend", function (e) {
    self.down = false;
  });

  setInterval(this.animate.bind(this), this.fps);
}
events.implement(Viewport);
Viewport.prototype.animate = function () {
  this.distanceX = this.mouseX - this.lastX;
  this.distanceY = this.mouseY - this.lastY;

  this.lastX = this.mouseX;
  this.lastY = this.mouseY;

  if (this.down) {
    this.torqueX =
      this.torqueX * this.sensivityFade +
      (this.distanceX * this.speed - this.torqueX) * this.sensivity;
    this.torqueY =
      this.torqueY * this.sensivityFade +
      (this.distanceY * this.speed - this.torqueY) * this.sensivity;
  }

  if (Math.abs(this.torqueX) > 1.0 || Math.abs(this.torqueY) > 1.0) {
    if (!this.down) {
      this.torqueX *= this.sensivityFade;
      this.torqueY *= this.sensivityFade;
    }

    this.positionY -= this.torqueY;

    if (this.positionY > 360) {
      this.positionY -= 360;
    } else if (this.positionY < 0) {
      this.positionY += 360;
    }

    if (this.positionY > 90 && this.positionY < 270) {
      this.positionX -= this.torqueX;

      if (!this.upsideDown) {
        this.upsideDown = true;
        this.emit("upsideDown", { upsideDown: this.upsideDown });
      }
    } else {
      this.positionX += this.torqueX;

      if (this.upsideDown) {
        this.upsideDown = false;
        this.emit("upsideDown", { upsideDown: this.upsideDown });
      }
    }

    if (this.positionX > 360) {
      this.positionX -= 360;
    } else if (this.positionX < 0) {
      this.positionX += 360;
    }

    if (
      !(this.positionY >= 46 && this.positionY <= 130) &&
      !(this.positionY >= 220 && this.positionY <= 308)
    ) {
      if (this.upsideDown) {
        if (this.positionX >= 42 && this.positionX <= 130) {
          this.calculatedSide = 3;
        } else if (this.positionX >= 131 && this.positionX <= 223) {
          this.calculatedSide = 2;
        } else if (this.positionX >= 224 && this.positionX <= 314) {
          this.calculatedSide = 5;
        } else {
          this.calculatedSide = 4;
        }
      } else {
        if (this.positionX >= 42 && this.positionX <= 130) {
          this.calculatedSide = 5;
        } else if (this.positionX >= 131 && this.positionX <= 223) {
          this.calculatedSide = 4;
        } else if (this.positionX >= 224 && this.positionX <= 314) {
          this.calculatedSide = 3;
        } else {
          this.calculatedSide = 2;
        }
      }
    } else {
      if (this.positionY >= 46 && this.positionY <= 130) {
        this.calculatedSide = 6;
      }

      if (this.positionY >= 220 && this.positionY <= 308) {
        this.calculatedSide = 1;
      }
    }

    if (this.calculatedSide !== this.currentSide) {
      this.currentSide = this.calculatedSide;
      this.emit("sideChange");
    }
  }

  this.element.style[userPrefix.js + "Transform"] =
    "rotateX(" + this.positionY + "deg) rotateY(" + this.positionX + "deg)";

  if (
    this.positionY != this.previousPositionY ||
    this.positionX != this.previousPositionX
  ) {
    this.previousPositionY = this.positionY;
    this.previousPositionX = this.positionX;

    this.emit("rotate");
  }
};
var viewport = new Viewport({
  element: document.getElementsByClassName("cube")[0],
  fps: 20,
  sensivity: 0.1,
  sensivityFade: 0.93,
  speed: 2,
  touchSensivity: 1.5,
});

function Cube(data) {
  var self = this;

  this.element = data.element;
  this.sides = this.element.getElementsByClassName("side");

  this.viewport = data.viewport;
  this.viewport.on("rotate", function () {
    self.rotateSides();
  });
  this.viewport.on("upsideDown", function (obj) {
    self.upsideDown(obj);
  });
  this.viewport.on("sideChange", function () {
    self.sideChange();
  });
}
Cube.prototype.rotateSides = function () {
  var viewport = this.viewport;
  if (viewport.positionY > 90 && viewport.positionY < 270) {
    this.sides[0].getElementsByClassName("cube-image")[0].style[
      userPrefix.js + "Transform"
    ] = "rotate(" + (viewport.positionX + viewport.torqueX) + "deg)";
    this.sides[5].getElementsByClassName("cube-image")[0].style[
      userPrefix.js + "Transform"
    ] = "rotate(" + -(viewport.positionX + 180 + viewport.torqueX) + "deg)";
  } else {
    this.sides[0].getElementsByClassName("cube-image")[0].style[
      userPrefix.js + "Transform"
    ] = "rotate(" + (viewport.positionX - viewport.torqueX) + "deg)";
    this.sides[5].getElementsByClassName("cube-image")[0].style[
      userPrefix.js + "Transform"
    ] = "rotate(" + -(viewport.positionX + 180 - viewport.torqueX) + "deg)";
  }
};
Cube.prototype.upsideDown = function (obj) {
  var deg = obj.upsideDown == true ? "180deg" : "0deg";
  var i = 5;

  while (i > 0 && --i) {
    this.sides[i].getElementsByClassName("cube-image")[0].style[
      userPrefix.js + "Transform"
    ] = "rotate(" + deg + ")";
  }
};
Cube.prototype.sideChange = function () {
  for (var i = 0; i < this.sides.length; ++i) {
    this.sides[i].getElementsByClassName("cube-image")[0].className =
      "cube-image";
  }

  this.sides[this.viewport.currentSide - 1].getElementsByClassName(
    "cube-image"
  )[0].className = "cube-image active";
};
//countdown (Timer)
function countdown(elementName) {
  var element, endTime, hours, mins, msLeft, time;
  function twoDigits(n) {
    return n <= 9 ? "0" + n : n;
  }
  function updateTimer() {
    msLeft = endTime - +new Date();
    if (msLeft < 1000) {
      element.innerHTML = "Time is up!";
    } else {
      time = new Date(msLeft);
      hours = time.getUTCHours();
      mins = time.getUTCMinutes();
      element.innerHTML =
        (twoDigits(hours) ? twoDigits(hours) + ":" + twoDigits(mins) : mins) +
        ":" +
        twoDigits(time.getUTCSeconds());
      setTimeout(updateTimer, time.getUTCMilliseconds() + 500);

      localStorage.setItem("endTime", endTime);
    }
    timerbeep.play();
    //lower volume
    timerbeep.volume = 0.05;
  }
  element = document.getElementById(elementName);
  endTime = localStorage.getItem("endTime") || +new Date() + 1000 * 60 * 60 * 2;
  updateTimer();
}
countdown("2h-countdown");
new Cube({
  viewport: viewport,
  element: document.getElementsByClassName("cube")[0],
});

//Panel 1 - Symbols
const opt1 = document.querySelector("#opt1");
const opt2 = document.querySelector("#opt2");
const opt3 = document.querySelector("#opt3");
const opt4 = document.querySelector("#opt4");
const arr = [
  ["𐌒", "ƛ", "ϗ", "Ͽ"],
  ["Ӭ", "𐌒", "Ͽ", "¿"],
  ["Ѽ", "Җ", "Ԇ", "ƛ"],
  ["Ѭ", "Җ", "¿", "ټ"],
  ["ټ", "Ѣ", "¶", "Ѯ"],
  ["Ӭ", "æ", "Ψ", "Ω"],
];
const buttons = document.querySelectorAll(".keypad");
let random = Math.floor(Math.random()*arr.length);
let randomarr = arr[random];
let count = 0;
let index = 0;
document.getElementById("opt1").innerHTML = randomarr[0];
document.getElementById("opt2").innerHTML = randomarr[1];
document.getElementById("opt3").innerHTML = randomarr[2];
document.getElementById("opt4").innerHTML = randomarr[3];
const shuffle = (array) => {
  for (let symbol_i = array.length - 1; symbol_i > 0; symbol_i--) {
    const symbol_j = Math.floor(Math.random() * (symbol_i + 1));
    [array[symbol_i], array[symbol_j]] = [array[symbol_j], array[symbol_i]];
  }
  return array;
};
window.onload = function () {
  const shuffledButtons = shuffle(Array.from(buttons));
  shuffledButtons.forEach((button) => {
    document.querySelector(".keypad").appendChild(button);
  });
};

opt1.addEventListener("click", () => {
  count++;
  if (index === 0) {
    index++;
  } else {
    index = 0;
  }
  opt1.style.backgroundColor = "darkgreen";
  check();
});
opt2.addEventListener("click", () => {
  count++;
  if (index === 1) {
    index++;
  } else {
    index = 0;
  }
  opt2.style.backgroundColor = "darkgreen";
  check();
});
opt3.addEventListener("click", () => {
  count++;
  if (index === 2) {
    index++;
  } else {
    index = 0;
  }
  opt3.style.backgroundColor = "darkgreen";
  check();
});
opt4.addEventListener("click", () => {
  count++;
  if (index === 3) {
    index++;
  } else {
    index = 0;
  }
  opt4.style.backgroundColor = "darkgreen";
  check();
});
function getMultipleRandom(arr) {
  const shuffled = [...arr].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, 4);
}
function check() {
  if (index === 4 && count === 4) {
    document.querySelector("#indicator").style.backgroundColor = "green";
    checker1++;
    checkfinal();
    //play a beep sound
    beep.play();
    index = 0;
    count = 0;
  } else if (index < 4 && count === 4) {
    document.querySelector("#indicator").style.backgroundColor = "red";
    index = 0;
    count = 0;
    opt1.style.backgroundColor = "#adff2f";
    opt2.style.backgroundColor = "#adff2f";
    opt3.style.backgroundColor = "#adff2f";
    opt4.style.backgroundColor = "#adff2f";
  }
}
const slider = document.querySelector(".slider");
const value = document.querySelector(".value");

slider.addEventListener("input", function () {
  value.textContent = this.value;
});

//Panel 2 - Morse Code
const dictionary = [
  "SHELL",
  "HALLS",
  "SLICK",
  "TRICK",
  "BOXES",
  "LEAKS",
  "STROBE",
  "BISTRO",
  "FLICK",
  "BOMBS",
  "BREAK",
  "BRICK",
  "STEAK",
  "STING",
  "VECTOR",
  "BEATS",
];
const frequency = {
  SHELL: 3.514,
  HALLS: 3.543,
  SLICK: 3.572,
  TRICK: 3.6,
  BOXES: 3.629,
  LEAKS: 3.657,
  STROBE: 3.686,
  BISTRO: 3.714,
  FLICK: 3.743,
  BOMBS: 3.771,
  BREAK: 3.8,
  BRICK: 3.829,
  STEAK: 3.857,
  STING: 3.886,
  VECTOR: 3.914,
  BEATS: 3.943,
};
function getRandomWord() {
  return dictionary[Math.floor(Math.random() * dictionary.length)];
}
const word = getRandomWord();
console.log(word);
const dotLight = document.getElementById("dot");
const dashLight = document.getElementById("dash");

const morseCode = {
  a: ".-",
  b: "-...",
  c: "-.-.",
  d: "-..",
  e: ".",
  f: "..-.",
  g: "--.",
  h: "....",
  i: "..",
  j: ".---",
  k: "-.-",
  l: ".-..",
  m: "--",
  n: "-.",
  o: "---",
  p: ".--.",
  q: "--.-",
  r: ".-.",
  s: "...",
  t: "-",
  u: "..-",
  v: "...-",
  w: ".--",
  x: "-..-",
  y: "-.--",
  z: "--..",
  0: "-----",
  1: ".----",
  2: "..---",
  3: "...--",
  4: "....-",
  5: ".....",
  6: "-....",
  7: "--...",
  8: "---..",
  9: "----.",
  " ": " ",
};

function encodeAndAnimate() {
  let text = word.toLowerCase();
  let morse = "";
  for (let slider_i = 0; slider_i < text.length; slider_i++) {
    morse += morseCode[text[slider_i]] + " ";
  }
  animateMorse(morse.trim());
}

function animateMorse(morse) {
  function showNext() {
    let slider_i = 0;
    function animate() {
      if (slider_i >= morse.length) {
        setTimeout(() => {
          slider_i = 0;
          animate();
        }, 5000);
        return;
      }
      if (morse[slider_i] === ".") {
        if (slider_i==0) {
          dotLight.style.backgroundColor = "blue";
        } else {
          dotLight.style.backgroundColor = "red";
        }
        setTimeout(() => {
          dotLight.style.backgroundColor = "white";
          slider_i++;
          setTimeout(animate, 250);
        }, 500);
      } else if (morse[slider_i] === "-") {
        if (slider_i == 0) {
          dashLight.style.backgroundColor = "blue";
        } else {
          dashLight.style.backgroundColor = "red";
        }
        setTimeout(() => {
          dashLight.style.backgroundColor = "white";
          slider_i++;
          setTimeout(animate, 250);
        }, 500);
      } else {
        slider_i++;
        setTimeout(() => {
          dotLight.style.backgroundColor = "white";
          dashLight.style.backgroundColor = "white";
          setTimeout(animate, 1500);
        }, 250);
      }
    }
    animate();
  }
  showNext();
}
encodeAndAnimate();
function checkcolor() {
  let frequency1 = slider.value;
  frequency1 = parseFloat(frequency1);
  let frequency2 = frequency[word];
  if (frequency1 == frequency2) {
    document.querySelector("#indicator2").style.backgroundColor = "green";
    checker2++;
    checkfinal();
    beep.play();
  } else {
    document.querySelector("#indicator2").style.backgroundColor = "red";
  }
}

//Panel 3 - Simon Says
function colour() {
  let v = document.getElementById("v1");
  c = localStorage["color"];
  v.style.borderLeft = "8px solid " + c;
}
function original() {
  document.getElementById("v1").style.borderLeft = "8px solid black";
}
window.onload = function () {
  let btext = ["DETONATE", "STOP", "ABORT", "HOLD", "PRESS"];
  let colour = ["#FF0000", "#00FF00", "#0000FF"];
  let b = document.getElementById("clickme");

  if (
    localStorage["text"] == "DETONATE" ||
    localStorage["text"] == "STOP" ||
    localStorage["text"] == "ABORT" ||
    localStorage["text"] == "HOLD" ||
    localStorage["text"] == "PRESS"
  ) {
    /** Your code here... **/
    b.innerText = localStorage["text"];
  } else {
    a = btext[Math.floor(Math.random() * btext.length)];
    c = colour[Math.floor(Math.random() * colour.length)];
    localStorage["color"] = c;
    b.innerText = a;
    localStorage["text"] = a;
  }
  var h = document.querySelector("#strip");
  h.value = localStorage["color"];
  var t = document.querySelector("#textstrip");
  t.value = localStorage["text"];
  check();
};
var h = document.querySelector("#strip");
h.value = localStorage["color"];
var t = document.querySelector("#textstrip");
t.value = localStorage["text"];
if (t.value == "DETONATE") {
  //listen to click event
  document.getElementById("clickme").addEventListener("click", function () {
    document.querySelector("#indicator3").style.backgroundColor = "green";
    checker3++;
    checkfinal();
    beep.play();
  });
} else if (t.value == "STOP") {
  document.getElementById("clickme").addEventListener("click", function () {
    document.querySelector("#indicator3").style.backgroundColor = "green";
    checker3++;
    checkfinal();
    beep.play();
  });
} else if (t.value == "ABORT" || t.value == "HOLD" || t.value == "PRESS") {
  var element = document.querySelector(".timer");
  document.getElementById("clickme").addEventListener("click", function () {
    const s = element.innerText;
    console.log(s, "Hello");
    if(h.value == "#0000FF")
    {
      if (s.includes("4")) {
        document.querySelector("#indicator3").style.backgroundColor = "green";
        checker3++;
        checkfinal();
        beep.play();
      } else {
        document.querySelector("#indicator3").style.backgroundColor = "red";
      }
    }
    else if(h.value == "#FF0000")
    {
      if (s.includes("1")) {
        document.querySelector("#indicator3").style.backgroundColor = "green";
        checker3++;
        checkfinal();
        beep.play();
      } else {
        document.querySelector("#indicator3").style.backgroundColor = "red";
      }
    }
    else if(h.value == "#00FF00")
    {
      if (s.includes("5")) {
        document.querySelector("#indicator3").style.backgroundColor = "green";
        checker3++;
        checkfinal();
        beep.play();
      } else {
        document.querySelector("#indicator3").style.backgroundColor = "red";
      }
    }
  });
}

function checkfinal() {
  const defusebtn = document.querySelector("#final");
  if (checker1==1 && checker2==1 && checker3>=1) {
    defusebtn.disabled = false;
    defusebtn.style.cursor = "pointer";
    defusebtn.setAttribute("value", "1");
  }
}
