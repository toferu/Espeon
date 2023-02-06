



//this was also from that youtube but i changed it to jquery

$( () => {
    //////Hamburger Event Handler///////
    const $hamburger = $('.hamburger');
    const $navMenu = $('.nav-menu');
    
    $hamburger.on('click', () => {
        $hamburger.toggleClass('active')
        $navMenu.toggleClass('active')
    })
    
    /////Modal Operation (from class exercise)/////
    
    
    const $openBtn = $('#openModal');
    const $modal = $('.modal');
    //there is no close button
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
    
    // let $projects = $('#projects')
    //scroll to div//
    // const $projButton = $('.projects-button')
    
  //hide bio
  //scrollup 
  //learned this from a stack overflow question and jquery doc examples
  const $scrollDown = () => {
    $('html, body').animate({
        scrollTop: $(document).height()}, 1000);
        
  }

  const $scrollUp = () => {
    $('html, body').animate({scrollTop: 0
    }, 1200);
     
  }

  const $scrollProj = () => {
    $('html, body').animate({scrollTop: 766
    }, 1000);
     
  }

//   const $scrollProj = () => {
//     $('html, #projects').scrollTop(600)

//   }

  const $linkButton = $('#link-button')
  const $projButton = $('#project-button')
  const $homeButton = $('#nav-name')
    
//   const $projButton = $('#projects-button')

  $linkButton.on('click',$scrollDown)
  $projButton.on('click', $scrollProj)
  $homeButton.on('click', $scrollUp)

//   $projButton.on('click',$scrollProj)

// Carousel (from class)

let currentImgIndex = 0;

let numOfImages = $('.carousel-images').children().length - 1

$('.next').on('click', () => {
    $('.carousel-images').children().eq(currentImgIndex).css('display', 'none')
    if(currentImgIndex < numOfImages) {
        currentImgIndex ++
       } else {
        currentImgIndex = 0
       }
    $('.carousel-images').children().eq(currentImgIndex).css('display','block')
   })
  

$('.previous').on('click', () => {

    $('.carousel-images').children().eq(currentImgIndex).css('display', 'none')

    if(currentImgIndex > 0) {
        currentImgIndex --
      } else {
        currentImgIndex = numOfImages
      }
      

    $('.carousel-images').children().eq(currentImgIndex).css('display', 'block')

})
    
})
    