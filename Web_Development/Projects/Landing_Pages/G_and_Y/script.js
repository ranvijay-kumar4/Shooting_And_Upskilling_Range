// SWIPER / SLIDER

var swiper = new Swiper(".mySwiper", {
    effect: "coverflow",
    grabCursor: true,
    centeredSlides: true,
    autoplay: {
        delay: 3500,
        disableOnInteraction: false,
    },
    slidesPerView: "auto",
    coverflowEffect: {
        rotate: 15, //50
        stretch: 0,
        depth: 300, //100
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
const counts = document.querySelectorAll('.count');
const speed = 500;

counts.forEach((counter) => {
    function upDate() {
        const target = Number(counter.getAttribute('data-target'));
        const count = Number(counter.innerText);
        const inc = target / speed;
        if (count < target) {
            counter.innerText = Math.floor(inc + count);
            setTimeout(upDate, 15);
        } else {
            counter.innerText = target;
        }
    }
    upDate();
});