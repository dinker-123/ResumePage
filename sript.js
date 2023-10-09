//percentage scroller
var progressValue = document.getElementById("progress-value");
function updateScrollPercentage() {
  var scrollPosition = window.scrollY;
  var windowHeight = window.innerHeight;
  var documentHeight = document.documentElement.getBoundingClientRect().height;
  var maxScrollDistance = documentHeight - windowHeight;

  var scrollPercentage = (scrollPosition / maxScrollDistance) * 100; 
  scrollPercentage = scrollPercentage.toFixed(0); 
  progressValue.innerHTML = scrollPercentage + "% Viewed";
}
updateScrollPercentage();
window.addEventListener("scroll", updateScrollPercentage);





//Nav
var navMenuAnchorTags= document.querySelectorAll('.nav-menu a');
var interval;
for (var i=0; i<navMenuAnchorTags.length; i++){
    navMenuAnchorTags[i].addEventListener('click',function(event){
         event.preventDefault();
         var targetSectionId = this.textContent.trim().toLowerCase();
         var targetSection=document.getElementById(targetSectionId);
         console.log(targetSection);
        //  interval=setInterval(scrollVertically,20,targetSection); 
        interval=setInterval(function(){
            scrollVertically(targetSection);
        },20,targetSection); 
    });
}


function scrollVertically(targetSection){
    var targetSectionCordinates= targetSection.getBoundingClientRect();
    if(targetSectionCordinates.top<=0){
        clearInterval(interval);
        return;
    }
    window.scrollBy(0,50);
}

//skills container fill
var progressBars=document.querySelectorAll('.skill-progress > div');

// Use an array to store the animation status of each progress bar
var animationDone = [];

// Initialize the array with false values
for (let i = 0; i < progressBars.length; i++) {
  animationDone[i] = false;
}

window.addEventListener('scroll',checkScroll);

function initialiseBars(){
    for(let bar of progressBars){
        bar.style.width=0+'%';
    }
}

function fillBar(bar) {
    let width = 0;
    let targetWidth = bar.getAttribute("data-bar-width");
    let id = setInterval(frame, 10);
    function frame() {
      if (width >= targetWidth) {
        clearInterval(id);
      } else {
        width++;
        bar.style.width = width + "%";
      }
    }
}

function checkScroll(){
  // Loop through each progress bar
  for (let i = 0; i < progressBars.length; i++) {
    // Get the coordinates of the progress bar
    var coordinates=progressBars[i].getBoundingClientRect();
    // Check if the progress bar is visible and not animated yet
    if(!animationDone[i] && coordinates.top<=window.innerHeight){
        // Set the animation status to true
        animationDone[i] = true;
        // Call fillBar() function to animate the progress bar
        fillBar(progressBars[i]);
    }
  }
}

// Call initialiseBars() at the beginning
initialiseBars();

