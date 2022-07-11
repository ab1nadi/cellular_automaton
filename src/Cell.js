
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

        this.square = this.two.makeRectangle(x-this.two.cellSize/2,y-this.two.cellSize/2,this.two.cellSize, this.two.cellSize)

        this.two.update();

        this.square._renderer.elem.addEventListener('mouseover', ()=>{this.on(); console.log(this.xIndex, this.yIndex, "INDEXEs")}, false);
        this.square._renderer.elem.addEventListener('click', ()=>this.on(), false);

        // this will help keep track of neighbors
        this.offLastGen = true;
        this.alive = false;
    }


    on(onNoMatterWhat = false)
    {
        if(onNoMatterWhat || this.two.mouseDown)
        {
                this.square.fill = BLACK;
                this.alive = true;
        }

        this.two.update();
    }


    // checks if this cell
    // will go onto the next
    // generation 
    // or be born in the next generation
    nextGen()
    {


         // lets do the thing
         if(!this.checkOn())
             this.offLastGen = true;
         else 
             this.offLastGen = false;
 
         let neighbors = this.getNeighbors();
 
         if(neighbors > 0 )
             console.log(neighbors)
 
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


    getNeighbors()
    {
        let cnt = 0;
        for(let y = this.yIndex-1; y<this.yIndex+2; y++)
        {
            for(let x = this.xIndex-1; x<this.xIndex+2; x++)
            {
                console.log(x,y)
                if(y > -1 && y < this.container.length && x > -1 && x < this.container[y].length)
                {
                    console.log("got in here")
                    if(this.container[y][x].checkOn() || !this.container[y][x].offLastGen)
                      {  cnt++;
                         console.log("got ran")
                      }
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