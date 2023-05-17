import './style.css'
import CellurAutomaton from './src/CellularAutomaton';
import Two from 'two.js'


let generation = 0;
let run = false;
let totalTime = 0;
let cellSize = 15;

let loadingDiv = document.getElementById("loadingContainer")

var params = {
  height:screen.height-50,
  width:screen.width,
  id:"cellularAutomaton", 
  renderer: Two.WebGLRenderer
};


// init the variables
var elem = document.getElementById("app");
var two = new Two(params).appendTo(elem);
two.cellSize = cellSize;
var c = new CellurAutomaton(two);



// load the cells in the automaton
c.createCells(()=>
// this callback stops the loading div
// and starts the two.js animation loop
{
  loadingDiv.style.display = "none";
  // bind the update function
  two.bind('update', update);
  // Finally, start the animation loop
  two.play();
});



// the update loop
// updates the CellularAutomaton
function update(frameCount) {
  
  if(run && totalTime >=100)
   { 
    c.nextGen();
    totalTime = 0;
    updateGenerationText(generation);
    generation++;
   }
    totalTime+=two.timeDelta;
}


// updateGenerationText
function updateGenerationText(genNumber)
{
  let genText = document.getElementsByClassName("generationText")[0];
  genText.innerHTML = "Gen: " + genNumber;
}


// Set up the events


// the play button event
document.getElementById("playB").addEventListener("click", ()=>
{
   run = true;
})


// the puase button event
document.getElementById("pauseB").addEventListener("click", ()=>
{
  run = false;
})


// the clear button event
document.getElementById("clearB").addEventListener("click", ()=>
{
  run = false;
  generation = 0;
  c.clear();
  updateGenerationText(0);
})
