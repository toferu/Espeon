

$( () => {
//////Hamburger Event Handler///////
const $hamburger = $('.hamburger');
const $navMenu = $('.nav-menu');

$hamburger.on('click', () => {
    $hamburger.toggleClass('active')
    $navMenu.toggleClass('active')
})

})
