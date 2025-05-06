const animations = ["fade", "zoom", "slide-left", "rotate"];
const slides = document.querySelectorAll(".slides");
let index = 0;

function showSlide() {
    slides.forEach(slide => slide.style.opacity = "0"); // Hide all slides
    const randomAnimation = animations[Math.floor(Math.random() * animations.length)]; // Pick a random animation
    slides[index].className = `slides ${randomAnimation}`; // Apply the animation
    slides[index].style.opacity = "1"; // Show current slide
    
    index = (index + 1) % slides.length; // Move to next slide
}

setInterval(showSlide, 4000); // Change slide every 4 seconds
