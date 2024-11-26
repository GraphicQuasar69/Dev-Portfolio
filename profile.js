
var tablinks = document.getElementsByClassName('tab-links');
var tabcontents = document.getElementsByClassName('tab-contents');

function opentab(tabname, event){
  for(tablink of tablinks){
    tablink.classList.remove("active-link");
  }
  for(tabcontent of tabcontents){
    tabcontent.classList.remove("active-tab");
  }
  event.currentTarget.classList.add("active-link");
  document.getElementById(tabname).classList.add("active-tab")
} 

var sidemenu = document.getElementById("sidemenu")

function closemenu(){
  sidemenu.style.right = "0";
}
function openmenu(){
  sidemenu.style.right = "-200px";
}



// Meal Ordering//

// Get the HTML element
var mealOrderTrigger = document.getElementById('mealOrderTrigger');

// Add an event listener
mealOrderTrigger.addEventListener('click', function() {
    // Call the function to initiate
    initiateMealOrdering();
});

// Function to initiate 
function initiateMealOrdering() {
    // Prompt the user 
    var userOrder = prompt("Please enter your meal order:");
    // Process order...
}
