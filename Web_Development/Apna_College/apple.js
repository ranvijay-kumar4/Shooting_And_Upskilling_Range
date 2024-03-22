const basket1 = document.querySelector(".basket-1 span");
const basket2 = document.querySelector(".basket-2 span");

const leftarrow = document.querySelector(".left-arrow");
const rightarrow = document.querySelector(".right-arrow");

const totalapples = 10;

let basket2apple = 0;
let basket1apple = totalapples - basket2apple;

basket1.innerText = basket1apple;
basket2.innerText = basket2apple;

rightarrow.addEventListener('click', () => {
    if (basket1apple > 0) {
        basket1apple-- ;
        basket1.innerText = basket1apple;
    
        basket2apple++;
        basket2.innerText = basket2apple;
    }
});

leftarrow.addEventListener('click', () => {
    if (basket2apple > 0) {
        basket1apple++;
        basket1.innerText = basket2apple;
        basket2apple-- ;
        basket2.innerText = basket1apple;
    
    }
});