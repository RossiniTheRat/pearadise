// Auto-scroll the slideshow
setInterval(function() {
    $('#plantSlideshow').carousel('next');
    }, 5000);
      
function handleClick() {
    $('#plantSlideshow').carousel('next');
    };
  
document.addEventListener("click", handleClick);