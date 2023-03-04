import { time } from "console";

export default class MineField {

    // Attributes
    _height: number = 16;
    _width: number = 16;
    _mines_number: number = 40;
    _field_size: number = 256;
    _field: number[][] = [];
    _filled: boolean = false;
    _isWon: boolean = false;
    _isFaield: boolean = false;
    _isStarted: boolean = false;
    _flags: number = 0;
    _timer: number = 0;
    _unOpened: number = 256;
    _bombsPos: number[][] = [];
    // getters

    get height(): number{
        return this._height;
    }
    
    get width(): number{
        return this._width;
    }

    get mines_number(): number{
        return this._mines_number;
    }

    get field_size(): number{
        return this._field_size;
    }

    get field(): number[][]{
        return this._field;
    }
    
    get isWon(): boolean{
        return this._isWon;
    }

    get flags(): number{
        return this._flags;
    }
    
    get timer(): number{
        return this._timer;
    }

    get isStarted(): boolean{
        return this._isStarted;
    }

    get unOpened(): number{
        return this._unOpened;
    }

    get isFailed(): boolean{
        return this._isFaield
    }

    get bombsList(): number[][]{
        return this._bombsPos;
    }
    //setters

    public set height(value : number) {
        this._height = value;
    }

    public set width(value : number) {
        this._width = value;
    }

    public set mines_number(value : number) {
        this._mines_number = value;
    }

    public set isWon(value: boolean){
        this._isFaield = value;
    }

    public set isFailed(value: boolean){
        this._isFaield = value;
    }

    // methods

    restartNewGame() {
        this.setTimer();
        this.generateField();
        this._bombsPos = [];
        this._isWon = false;
        this._isFaield =false;
        this._flags = 0;
        this._filled = false;
    }


    calculateFieldSize() :void {
        this._field_size = this._height * this._width;   
    }
    
    generateField(): void {
        for (let x: number = 0; x < this._height; x++){
            this._field[x] = [] 
            for(let y: number = 0; y < this.width; y++){
                this._field[x][y] = 0;
            }
        }
    }



    fillBombs(mouseX: number, mouseY: number): void{
        if(this._filled === true){
            console.log("УЖЕ ЗАПОЛНЕНО")
        }
        else{
        let counter: number = 0;
        let randX: number = 0;
        let randY: number = 0;
        
        while(counter < this._mines_number){
            randX = Math.floor(Math.random() * this._width);
            randY = Math.floor(Math.random() * this._height);
            //first click always lands on empty square with zero bombs!
            let isValid: boolean = ((randX >= (mouseX - 1)) &&( randX <= (mouseX + 1))) && ((randY >= (mouseY - 1)) && (randY <= (mouseY + 1))) ;
            //console.log(randX,randY,isValid);
            if (!isValid && (this._field[randX][randY] != 10)){
                this._field[randX][randY] = 10;
                this._bombsPos.push([randX,randY]);
                counter++;
                
            }
        }
        }
    }

    calculateCell(currx:number, curry:number): number{
        let count: number = 0;
        try{
            for(let x:number = currx-1; x < currx+2; x++){
                for(let y:number = curry-1; y < curry+2; y++){
                    // console.log("Значения",x,' ',y,'field:',this._field[x][y])
                    if ((x < 0) || (y < 0) || (x >= this._width) || (y >= this._height)) continue;
                    if (this._field[x][y] === 10) {
                        count++;
                    }
                }
            }
        }catch(e){
            
            console.log(`Ошибка, скорее всего вышли за массив значения`,e)
        } 
        return (count)      
    }

    calculateField(): void{
        for (let x: number = 0; x < this._height; x++){
            for(let y: number = 0; y < this.width; y++){
                if (this._field[x][y] === 0){
                    this._field[x][y] = this.calculateCell(x,y);
                }
            }
        }
    }

    setTimer(): void{
        this._timer = 0;
        //console.log(this._timer);
    }
    calculateUnOpened(): void{
        this._unOpened = this._height * this._width;
    }

    //We can use inc and dec functions using Statements in React, but in further development it might help

    incrementTimer(): void{
        this._timer++;
    }

    incMines(): void{
        this.mines_number++;
    }

    decMines(): void{
        this.mines_number--;
    }
}

