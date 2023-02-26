//get all 4 cards and buttons
const cards = document.querySelectorAll('.card');
const btns = document.querySelectorAll('.btn');

//store html of card titles
const cardTitles = [];
cards.forEach(card => {
    const cardTitle = card.querySelector('.card-title');
    cardTitles.push(cardTitle.innerHTML);
})

btns.forEach((btn, index) => {
    btn.addEventListener('click', () => {
        const randomNum = Math.floor(Math.random() * 2) + 1;
        //remove all classes from card
        if(randomNum==1) {
            cards[index].classList.add('flip');
            cards[index].classList.add('correct');
            const cardTitle = cards[index].querySelector('.card-title');
            cardTitle.innerHTML = cardTitles[index] + ' <i class="fas fa-circle-check"></i>';
            const fg = cards[index].querySelector('.form-group');
            fg.style.display = 'none';
        }
        else {
            cards[index].classList.add('flip');
            cards[index].classList.add('wrong');
            const cardTitle = cards[index].querySelector('.card-title');
            cardTitle.innerHTML = cardTitles[index] + ' <i class="fas fa-circle-xmark"></i>';
        }
    })
})