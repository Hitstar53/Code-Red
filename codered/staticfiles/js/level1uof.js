const hm = document.querySelector("#hintbody");
//make a sleep function
function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}
//make a function which will change the text of the hint

console.log("The password is abcdefghijklmnopqrstuvwxyz")

sleep(25000).then(() => {
  hm.innerHTML = "Hidden in plain sight, the key to unlocking my secrets lies within the code written in black and white.";
});
var words = ['Crack the code', 'Hack the system', 'Break the rules', 'Break the rules', 'Hack the system', 'Crack the code'],
    part,
    level1_i = 0,
    offset = 0,
    len = words.length,
    forwards = true,
    skip_count = 0,
    skip_delay = 15,
    speed = 70;
var wordflick = function () {
  setInterval(function () {
    if (forwards) {
      if (offset >= words[level1_i].length) {
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
        level1_i++;
        offset = 0;
        if (level1_i >= len) {
          level1_i = 0;
        }
      }
    }
    part = words[level1_i].substr(0, offset);
    if (skip_count == 0) {
      if (forwards) {
        offset++;
      }
      else {
        offset--;
      }
    }
    $('.word').text(part);
  },speed);
};
$(document).ready(function () {
  wordflick();
});
// const userName = "John";
// let age = 30;
// age += 1;
// console.log(`${userName} is ${age} years old.`);
// const numbers = [1, 2, 3, 4, 5];
// const doubledNumbers = numbers.map(number => number * 2);
// console.log(doubledNumbers);
// const evenNumbers = numbers.filter(number => number % 2 === 0);
// console.log(evenNumbers);
// const fruits = ["apple", "banana", "orange"];
// const capitalizedFruits = fruits.map(fruit => fruit.toUpperCase());
// console.log(capitalizedFruits);
// let total = 0;
// for (let i = 0; i < numbers.length; i++) {
//   total += numbers[i];
// }
// console.log(total);
// const person = {
//   name: "Alice",
//   age: 25,
//   location: "New York"
// };
// console.log(`${person.name} is ${person.age} and lives in ${person.location}.`);
// const animals = ["dog", "cat", "bird"];
// animals.forEach(animal => console.log(animal));
const password = 'gsdfys76fds7fds';
// const person = {
//   name: "Bob",
//   age: 35,
//   greet() {
//     console.log(`Hi, my name is ${this.name}.`);
//   }
// };
// person.greet();
// function add(x, y) {
//   return x + y;
// }
// console.log(add(2, 3));
// class Person {
//   constructor(name, age) {
//     this.name = name;
//     this.age = age;
//   }
//   greet() {
//     console.log(`Hi, my name is ${this.name}.`);
//   }
// }
// const person = new Person("Charlie", 25);
// person.greet();
// const numbers = [1, 2, 3, 4, 5];
// const sum = numbers.reduce((accumulator, currentValue) => accumulator + currentValue