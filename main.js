import './style.css'

import './style.css'

import Two from 'two.js'


import CellurAutomaton from './src/CellularAutomaton';

let totalTime = 0;
var params = {
  height:screen.height-50,
  width:screen.width,
  id:"cellularAutomaton"
};


// init the variables
var elem = document.getElementById("app");
var two = new Two(params).appendTo(elem);
two.cellSize = 20;
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
  
  if(window.run==true && totalTime >=400)
   { c.nextGen();
    totalTime = 0;
   }
  


    totalTime+=two.timeDelta;
}

