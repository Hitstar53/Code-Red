const opt1 = document.querySelector("#opt1");
const opt2 = document.querySelector("#opt2");
const opt3 = document.querySelector("#opt3");
const opt4 = document.querySelector("#opt4");
const arr = [
             ['A','B','C','D'],
             ['B','D','F','E'],
             ['W','G','R','S'],
             ['F','G','R','Y'],
             ['E','G','S','D'],
             ['U','Z','L','M']
            ];
const buttons=document.querySelectorAll("button");
let random = Math.floor(Math.random()*arr.length);
let randomarr = arr[random];
console.log(randomarr);
let count = 0;
let index = 0;
document.getElementById("opt1").innerHTML=randomarr[0];
document.getElementById("opt2").innerHTML=randomarr[1];
document.getElementById("opt3").innerHTML=randomarr[2];
document.getElementById("opt4").innerHTML=randomarr[3]; 
const shuffle = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  };
  window.onload = function () {
    const shuffledButtons = shuffle(Array.from(buttons));
    shuffledButtons.forEach((button) => {
      document.querySelector(".keypad").appendChild(button);
    });
  };

opt1.addEventListener('click', ()=>{
    count++;
    if(index === 0){
        index++;
    }
    else{
        index = 0;
    }
    check();
})
opt2.addEventListener('click', ()=>{
    count++;
    if(index === 1){
        index++;
    }
    else{
        index = 0;
    }
    check();
})
opt3.addEventListener('click', ()=>{
    count++;
    if(index === 2){
        index++;
    }
    else{
        index = 0;
    }
    check();
})
opt4.addEventListener('click', ()=>{
    count++;
    if(index === 3){
        index++;
    }
    else{
        index = 0;
    }
    check();
})
function getMultipleRandom(arr) {
    const shuffled = [...arr].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, 4);
}
function check(){
    if(index === 4 && count === 4){
        document.querySelector("#indicator").style.backgroundColor = "green";
        index = 0;
        count = 0;
    }
    else if(index < 4 && count === 4){
        document.querySelector("#indicator").style.backgroundColor = "red";
        index = 0;
        count = 0;
    }
}