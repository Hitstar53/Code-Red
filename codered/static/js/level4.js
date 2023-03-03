//get all 4 cards and buttons
const cards = document.querySelectorAll('.card');
const btns = document.querySelectorAll('.btn');
var a='{{form1}}'
console.log(a)
//store html of card titles
const cardTitles = [];
cards.forEach(card => {
    const cardTitle = card.querySelector('.card-title');
    cardTitles.push(cardTitle.innerHTML);
})
//commenting this shit out

if("{{form1}}"=='1')
{
    cards[0].classList.add('flip');
    cards[0].classList.add('correct');
    const cardTitle = cards[0].querySelector('.card-title');
    cardTitle.innerHTML = cardTitles[0] + ' <i class="fas fa-circle-check"></i>';
    const fg = cards[0].querySelector('.form-group');
    fg.style.display = 'none';
}

if("{{form2}}"=='1')
{
    cards[1].classList.add('flip');
    cards[1].classList.add('correct');
    const cardTitle = cards[1].querySelector('.card-title');
    cardTitle.innerHTML = cardTitles[1] + ' <i class="fas fa-circle-check"></i>';
    const fg = cards[1].querySelector('.form-group');
    fg.style.display = 'none';
}

if("{{form3}}"=='1')
{
    cards[2].classList.add('flip');
    cards[2].classList.add('correct');
    const cardTitle = cards[2].querySelector('.card-title');
    cardTitle.innerHTML = cardTitles[2] + ' <i class="fas fa-circle-check"></i>';
    const fg = cards[2].querySelector('.form-group');
    fg.style.display = 'none';
}

if("{{form4}}"=='1')
{
    cards[3].classList.add('flip');
    cards[3].classList.add('correct');
    const cardTitle = cards[3].querySelector('.card-title');
    cardTitle.innerHTML = cardTitles[3] + ' <i class="fas fa-circle-check"></i>';
    const fg = cards[3].querySelector('.form-group');
    fg.style.display = 'none';
}
