const slider = document.querySelector('.slider');
const value = document.querySelector('.value');

slider.addEventListener('input', function () {
  value.textContent = this.value;
});

      const dictionary = [
        "SHELL","HALLS","SLICK","TRICK","BOXES","LEAKS","STROBE","BISTRO","FLICK","BOMBS","BREAK","BRICK","STEAK","STING","VECTOR","BEATS",
      ]
      const frequency = {
       "SHELL":3.514,
       "HALLS":3.543,
       "SLICK":3.571,
       "TRICK":3.6,
       "BOXES":3.629,
       "LEAKS":3.657,
       "STROBE":3.686,
       "BISTRO":3.714,
       "FLICK":3.743,
       "BOMBS":3.771,
       "BREAK":3.8,
       "BRICK":3.829,
       "STEAK":3.857,
       "STING":3.886,
       "VECTOR":3.914,
       "BEATS":3.943,

      };
  function getRandomWord() {
  return dictionary[Math.floor(Math.random() * dictionary.length)];
    }
      const word = getRandomWord();
      console.log(word);
      const dotLight = document.getElementById('dot');
      const dashLight = document.getElementById('dash');
     
      const morseCode = {
        'a': '.-',
        'b': '-...',
        'c': '-.-.',
        'd': '-..',
        'e': '.',
        'f': '..-.',
        'g': '--.',
        'h': '....',
        'i': '..',
        'j': '.---',
        'k': '-.-',
        'l': '.-..',
        'm': '--',
        'n': '-.',
        'o': '---',
        'p': '.--.',
        'q': '--.-',
        'r': '.-.',
        's': '...',
        't': '-',
        'u': '..-',
        'v': '...-',
        'w': '.--',
        'x': '-..-',
        'y': '-.--',
        'z': '--..',
        '0': '-----',
        '1': '.----',
        '2': '..---',
        '3': '...--',
        '4': '....-',
        '5': '.....',
        '6': '-....',
        '7': '--...',
        '8': '---..',
        '9': '----.',
        ' ': ' ',
      };
    
      function encodeAndAnimate() {
        let text = word.toLowerCase();
        let morse = '';
        for (let i = 0; i < text.length; i++) {
          morse += morseCode[text[i]] + ' ';
        }
        animateMorse(morse.trim());
      }
    
      function animateMorse(morse) {
  function showNext() {
    let i = 0;
    function animate() {
      if (i >= morse.length) {
        setTimeout(() => {
          i = 0;
          animate();
        }, 5000);
        return;
      }
      if (morse[i] === '.') {
        dotLight.style.backgroundColor = 'red';
        setTimeout(() => {
          dotLight.style.backgroundColor = 'white';
          i++;
          setTimeout(animate, 250);
        }, 500);
      } else if (morse[i] === '-') {
        dashLight.style.backgroundColor = 'red';
        setTimeout(() => {
          dashLight.style.backgroundColor = 'white';
          i++;
          setTimeout(animate, 250);
        }, 500);
      } else {
        i++;
        setTimeout(() => {
          dotLight.style.backgroundColor = 'white';
          dashLight.style.backgroundColor = 'white';
          setTimeout(animate, 1500);
        }, 250);
      }
    }
    animate();
  }
  showNext();
}
encodeAndAnimate();
  function check(){
   
    let frequency1 = slider.value;
    frequency1 = parseFloat(frequency1);
    let frequency2 = frequency[word];
    console.log(frequency1);
    console.log(frequency2);
    console.log(typeof(frequency1));
    console.log(typeof(frequency2));
    if (frequency1 == frequency2){
      alert("Correct");
    }
    else{
      alert("Incorrect");
    }
   }