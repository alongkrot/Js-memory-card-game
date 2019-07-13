const cards = document.querySelectorAll('.memory-card');

let hasFlippedCard = false;
let lockBoard = false;
let fristCard, secondCard;

function flipCard() {
    if (lockBoard) return;
    if (this === fristCard) return;
    this.classList.add('flip');
    console.log(this);
    
    if (!hasFlippedCard) {
        //fisrt click
        hasFlippedCard = true;
        fristCard = this;
        return;
    }
    //second click 
    hasFlippedCard = false;
    secondCard = this;

    //ดูว่าการ์เหมือนกันหรือป่าว?
    checkForMatch();
    
}

//ดูว่าการ์เหมือนกันหรือป่าว?
function checkForMatch() {
    let isMatch = fristCard.dataset.framework === secondCard.dataset.framework;
    //เหมือนข้่งล่าง//////////////////////////////////
    isMatch ? disableCards() : unFlipCards();
    // if (isMatch) {
    //     disableCards
    // }else {
    //     unFlipCards
    // }
    ///////////////////////////////////////
}

//ถ้าการ์ ไม่เหมื่อกัน
function disableCards() {
    fristCard.removeEventListener('click', flipCard);
    secondCard.removeEventListener('click', flipCard);
    resetBoard();
}

// ถ้าการ์ดไม่เหมือนกัน
function unFlipCards() {
    lockBoard = true;
    setTimeout(() => {
       fristCard.classList.remove('flip');
       secondCard.classList.remove('flip');
       resetBoard(); 
    }, 1500);
}

//รีเซ็ตบอด
function resetBoard() {
    [hasFlippedCard, lockBoard] = [false, false];
    [fristCard, secondCard] = [null, null];
}

//ส่มการ์ด
(function shuffle() {
    cards.forEach(card => {
        let randomPos = Math.floor(Math.random() * 12);
        card.style.order = randomPos;
    });
})();



cards.forEach(card => card.addEventListener('click', flipCard));