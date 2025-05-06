let animations = ["fade", "zoom", "rotate", "flip"];

function showSlides() {
    let slides = document.getElementsByClassName("slide");

    // Hide all slides & reset animations
    for (let i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
        slides[i].classList.remove(...animations);
    }

    // Pick a random slide
    let randomSlide = Math.floor(Math.random() * slides.length);
    
    // Pick a random animation
    let randomAnimation = animations[Math.floor(Math.random() * animations.length)];

    // Set random position
    let randomX = Math.floor(Math.random() * (window.innerWidth - 300)); // Adjusts for screen size
    let randomY = Math.floor(Math.random() * (window.innerHeight - 300));

    slides[randomSlide].style.display = "block";
    slides[randomSlide].classList.add(randomAnimation);
    slides[randomSlide].style.position = "absolute";
    slides[randomSlide].style.left = `${randomX}px`;
    slides[randomSlide].style.top = `${randomY}px`;

    setTimeout(showSlides, 3000); // Change every 3 seconds
}

window.onload = showSlides;