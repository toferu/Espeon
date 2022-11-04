// const $hamburger = $('.hamburger');
// const $navMenu = $('.nav-menu');

// $( () => {

// $hamburger.on('click', () => {
//     $('.bar').toggleClass('active')
//     $('.nav-item').toggleClass('active')
// })

// // $('.nav-link').forEach(n => n.on('click', () => {
// //     $hamburger.removeClass('active')
// //     $navMenu.removeClass('active')
// // }) )


// })
window.addEventListener('load',(event) => {


const hamburger = document.querySelector(".hamburger");
const navMenu = document.querySelector(".nav-menu");

hamburger.addEventListener("click", () => {
    hamburger.classList.toggle("active");
    navMenu.classList.toggle("active");
})

hamburger.querySelectorAll(".nav-link").forEach(n => n.addEventListener("click", () => {
    hamburger.classList.remove("active");
    navMenu.classList.remove("active");
}))

})