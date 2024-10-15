// SWIPER / SLIDER


var swiper = new Swiper(".mySwiper", {
    effect: "coverflow",
    grabCursor: true,
    centeredSlides: true,
    autoplay: {
        delay: 2000,
        disableOnInteraction: false,
    },
    slidesPerView: "auto",
    coverflowEffect: {
        rotate: 50,
        stretch: 0,
        depth: 100,
        modifier: 1,
        slideShadows: true,
    },
    loop: true,
    pagination: {
        el: ".swiper-pagination",
    },
    navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
    }
});





// NUMBER COUNTING
var count = document.querySelectorAll('.count');

var main = document.getElementById('counter');

var inc = [];
function intervalFunc() {
    for (let i = 0; i < count.length; i++) {
        inc.push(1);
        if (inc[i] != count[i].getAttribute("data-count")) {
            inc[i]++;
        }
        count[i].innerHTML = inc[i];
    }
}

window.onscroll = function () {
    var timer = setInterval(() => {


        var topElem = main.offsetTop;
        var btmElem = main.offsetTop + main.clientHeight;
        var topScreen = window.pageYOffset;
        var btmScreen = window.pageYOffset + window.innerHeight;

        if (btmScreen > topElem && topScreen < btmElem) {
            intervalFunc();
        } else {
            clearInterval(timer);
            for (let i = 0; i < count.length; i++) {
                count[i].innerHTML = 1;
                inc = [];
            }
        }

    }, 100);
}





// Popup form on clicking button 
const openPopupButton = document.getElementById('open-popup');
const popupContainer = document.getElementById('popup-container');


openPopupButton.addEventListener('click', () => {
    popupContainer.style.display = 'block';
});


popupContainer.addEventListener('click', (e) => {
    if (e.target === popupContainer) {

        popupContainer.style.display = 'none';
    }
});





const openPopupButton1 = document.getElementById('open-popup1');
const popupContainer1 = document.getElementById('popup-container1');


openPopupButton1.addEventListener('click', () => {
    popupContainer1.style.display = 'block';
});


popupContainer1.addEventListener('click', (e) => {
    if (e.target === popupContainer1) {

        popupContainer1.style.display = 'none';
    }
});