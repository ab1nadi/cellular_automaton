import './style.css'

import './style.css'

import Two from 'two.js'
import CellurAutomaton from './src/CellularAutomaton';


var params = {
  height:screen.height,
  width:screen.width,
  id:"cellularAutomaton"
};


// init the variables
var elem = document.getElementById("app");
var two = new Two(params).appendTo(elem);
two.cellSize = 100;
var c = new CellurAutomaton(two);


// bind the update function
two.bind('update', update);
// Finally, start the animation loop
two.play();


document.body.addEventListener("keypress", ()=>{
  window.run =true;
})



// the update loop
function update(frameCount) {
  
  if(frameCount %100==0 && window.run==true)
    c.nextGen();
  
}

