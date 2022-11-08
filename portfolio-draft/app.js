





$( () => {
    //////Hamburger Event Handler///////
    const $hamburger = $('.hamburger');
    const $navMenu = $('.nav-menu');
    
    $hamburger.on('click', () => {
        $hamburger.toggleClass('active')
        $navMenu.toggleClass('active')
    })
    
    ////////Modal Operation////////
    
    
    const $openBtn = $('#openModal');
    const $modal = $('.modal');
    const $closeBtn = $('#iframe-button');
    
    
    const openModal = () => {
        $modal.css('display', 'block');
    }
    const closeModal = () => {
        $modal.css('display', 'none');
    }
    
    
    $openBtn.on('click', openModal);
    $closeBtn.on('click', closeModal);
    
    $('body').on('click',(event) => 
    {
       if(!$(event.target).is('#openModal')) {
         $(".modal").hide();
       }     
    });
    
    let $projects = $('#projects')
    //scroll to div//
    const $projButton = $('.projects-button')
    
    
    
    
    })
    