document.addEventListener('DOMContentLoaded', () => {
    const carouselImages = document.querySelector('.carousel-images');
    const images = document.querySelectorAll('.carousel-images img');
    const prevBtn = document.querySelector('.carousel-btn.prev');
    const nextBtn = document.querySelector('.carousel-btn.next');

    let index = 0;
    let isCooldown = false;
    const cooldownTime = 500; // in milliseconds

    function updateCarousel() {
        carouselImages.style.transform = `translateX(-${index * 100}%)`;
    }

    function changeSlide(direction) {
        if (isCooldown) return;

        isCooldown = true;

        if (direction === 'next') {
            index = (index + 1) % images.length;
        } else if (direction === 'prev') {
            index = (index - 1 + images.length) % images.length;
        }

        updateCarousel();

        setTimeout(() => {
            isCooldown = false;
        }, cooldownTime);
    }

    nextBtn.addEventListener('click', () => changeSlide('next'));
    prevBtn.addEventListener('click', () => changeSlide('prev'));
});