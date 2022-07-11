import Cell from './Cell.js';

export default class CellurAutomaton 
{
    constructor(two)
    {
        this.two = two; // grab two

        this.cells = [];


        let xIndex = 0;
        let yIndex = 0;
        // create the cells
        for(let y = 0; y<this.two.height; y+=this.two.cellSize)
        {
            // add an array
            this.cells.push(new Array());
            xIndex = 0;
            for(let x = 0; x<this.two.width; x+=this.two.cellSize)
            {

                this.cells[yIndex][xIndex] = new Cell(this.two,x,y,xIndex,yIndex,this.cells);

                xIndex++;
            }

            yIndex++;
        }

        this.two.mouseDown = false;



        // settup the event for the mouse
        // settup the mousedown event
    }



    // increments the game to the next generation
    nextGen()
    {
        let offOnCopy = this.offOnArray(this.cells);
        /// copy of last gen
        for(let y = 0; y<this.cells.length; y++)
        {
            for(let x = 0; x<this.cells[y].length; x++)
            {
                this.cells[y][x].nextGen(offOnCopy);
            }
        }
    }


    offOnArray(cont)
    {
        let returned = [];
        for(let y = 0; y<this.cells.length; y++)
        {
            returned.push(new Array())
            for(let x = 0; x<this.cells[y].length; x++)
            {
                if(this.cells[y][x].alive)
                    returned[y].push(true)
                else 
                    returned[y].push(false);
            }
        }

        return returned;
    }
}