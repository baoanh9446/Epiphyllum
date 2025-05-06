let slideIndex = 0;
let animations = ["fade", "zoom", "rotate", "flip"];

function showSlides() {
    let slides = document.getElementsByClassName("slide");
    
    // Hide all slides first
    for (let i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
        slides[i].classList.remove(...animations); // Remove previous animation class
    }

    // Pick a random slide
    slideIndex = Math.floor(Math.random() * slides.length);
    
    // Pick a random animation
    let randomAnimation = animations[Math.floor(Math.random() * animations.length)];

    // Display slide with random animation
    slides[slideIndex].style.display = "block";
    slides[slideIndex].classList.add(randomAnimation);

    setTimeout(showSlides, 3000); // Change every 3 seconds
}

window.onload = showSlides;