import './style.css'

import './style.css'

import Two from 'two.js'





import CellurAutomaton from './src/CellularAutomaton';
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
{

  loadingDiv.style.display = "none";
  // bind the update function
  two.bind('update', update);
  // Finally, start the animation loop
  two.play();
});







// the update loop
function update(frameCount) {
  
  if(run && totalTime >=100)
   { c.nextGen();
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


document.getElementById("playB").addEventListener("click", ()=>
{
   run = true;
})


document.getElementById("pauseB").addEventListener("click", ()=>
{
  run = false;
})

document.getElementById("clearB").addEventListener("click", ()=>
{
  run = false;
  generation = 0;
  c.clear();
  updateGenerationText(0);
})





// load the cells in the automaton

























