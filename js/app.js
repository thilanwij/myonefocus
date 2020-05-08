var area = document.getElementById("area");     
let button = document.getElementById("thebutton");
var next = document.getElementById("next");
var container = document.getElementById("container");
var taskh1 = document.getElementById("taskh1");
var lines, nonEmpty;
var theLocalValue;
let testArray; //tsting purposes

//Event for when the user CLICKS THE START TASKS BUTTON
button.addEventListener('click', function(){
  if(area.value == ""){
    alert("Please insert some tasks.");
  }
  else{
  
  //When clicking the main button, get the array and split each item on their own
  lines = area.value.replace(/\r\n/g,"\n").split("\n"); //'lines' is indeed is an array
  
  //removes any spaces on the lines array and puts it into a new cleaner array
  nonEmpty = lines.filter(function(e) {
    return String(e).trim();
});

  //display popup
  container.style.display = "flex";

  // generate a random number within the tasks array
  let rand = Math.floor(Math.random() * nonEmpty.length);
  
  //display first task
  taskh1.innerHTML = nonEmpty[rand];

  document.title = nonEmpty[rand] + " | My One Focus";

  // remove the current element from the array
  nonEmpty = nonEmpty.filter((task, i) => rand !== i);

  //if support localstorage, do it. If not, don't.
  if (typeof(Storage) !== "undefined") {

      //Puts the data into local storage in JSON format
      //localStorage.setItem('textareavalue', JSON.stringify( lines ));
      localStorage.setItem('value', area.value);
      // console.log(area.value);
      
  } else {
    console.log('No webstorage support');
   }
  }
});

//this gets the localstorage data turns the JSON string we had back into an array, assigns to theLocalValue
//theLocalValue = JSON.parse(localStorage.getItem('textareavalue'));
theLocalValue = localStorage.getItem('value');

//here you will re-add the line breaks to this array

//here you will assign the value with the spaces back into the textarea field
area.value = theLocalValue;

// When you click the next button, it moves onto the next task in the list
container.addEventListener('click', nextTask);
function nextTask() {
  // generate a random number within the tasks array
  let rand = Math.floor(Math.random() * nonEmpty.length);

  //update to show the next task
  taskh1.textContent = nonEmpty[rand];
  
  // alert(lines);
  // alert(nonEmpty);
  // ding();

  //if on the last array task, remove popup bg
  if (nonEmpty.length === 0) {
    container.style.display = "none";
    area.value = "";
    nonEmpty = [];

    //removes the data from local storage because you don't need it anymore
    localStorage.removeItem('value');

    //resets the document title to normal
    document.title = "My One Focus - Focus on One Task at a Time";

  }
  else{
  //updates the doc title to show current task name
  document.title = nonEmpty[rand] + " | My One Focus";
  // remove the current element from the array
  nonEmpty = nonEmpty.filter((task, i) => rand !== i);
  }

}
//plays a ding sfx when you tap on the screen to move onto next task
// function ding(){
//   var audio = new Audio('../audio/ding.ogg');
//   audio.play();
//   audio.volume = 0.05;
// };

