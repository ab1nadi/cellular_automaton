
const WHITE ="#FFF";
const BLACK = "#0";
export default class Cell{
    constructor(two,x,y,xI,yI,contRef)
    {
        this.two = two; // grab two

        // get its own index
        this.xIndex = xI;
        this.yIndex = yI;

        // get the container holding it
        this.container = contRef;

        this.square = this.two.makeRectangle(x+this.two.cellSize/2,y+this.two.cellSize/2,this.two.cellSize, this.two.cellSize)

        this.two.update();

        this.square._renderer.elem.addEventListener('click', ()=>{this.on(true); console.log("called")}, false);

        // this will help keep track of neighbors
        this.onLastGen = false;
        this.alive = false;
    }


    on(onNoMatterWhat = false)
    {
        if(onNoMatterWhat || this.two.mouseDown)
        {
                this.square.fill = BLACK;
                this.alive = true;

        }

    }


    // checks if this cell
    // will go onto the next
    // generation 
    // or be born in the next generation
    nextGen(lastGenCopy)
    {




             
         if(this.alive)
            console.log("alive")
 
         let neighbors = this.getNeighbors(lastGenCopy);


  
 
         // cell dies with 1 or less neighbors
         if(neighbors <=1)
           {  if(this.checkOn())
                 this.off();
           }
         // dies from over population with 4 or more neighbors
         else if(neighbors >=4)
             this.off();
         // if this cell isn't on and has three neighbors
         // it is born
         else if(!this.checkOn() && neighbors == 3)
             this.on(true);
 
 


    }

    off()
    {
        this.square.fill = WHITE;
        this.alive = false;
    }


    getNeighbors(lastGenCopy)
    {
        let cnt = 0;
        for(let y = this.yIndex-1; y<this.yIndex+2; y++)
        {
            for(let x = this.xIndex-1; x<this.xIndex+2; x++)
            {
                if(y > -1 && y <  lastGenCopy.length && x > -1 && x < lastGenCopy[y].length)
                {

                    if(!(x == this.xIndex && y==this.yIndex))
                        if( lastGenCopy[y][x])
                            cnt++;
                        }
                }

            }
        return cnt;
    }

    // checks if this cell is on or not
    checkOn()
    {
        if(this.alive)
            return true;
        else 
            return false;
    }


}