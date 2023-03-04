import React, {useMemo, useState, useRef, useEffect} from 'react';
// import Field from "./components/Field";
import Smile from './components/Smile';
import Timer from './components/Timer';
import Bombs from './components/Bombs';
import styles from "./styles/app.module.css";
import MineField from './app_logic';
import Cell from './components/Cell';
let Game = new MineField();

function App(): JSX.Element {

 
  interface CellParams{
    x_pos: number;
    y_pos: number;
    value: number;
    isOpened: boolean;
    isStartingPoint: boolean;
    isFlaged: boolean;
    isQuestion: boolean;
  }

  const [isWin,setIsWin] = useState<boolean>(false);
  const [isLose,setIsLose] = useState<boolean>(false);
  const [rerender, setRerender] = useState(0);
  const [unOpened, setUnOpened] = useState<number>(Game.unOpened)
  const [smileFace, setSmileFace] = useState('happy');
  const [cells, setCell] = useState<CellParams[][]>([])
  const [field, setField] = useState<number[][]>(Game.field);
  const [time, setTime] = useState<number>(0);
  const [started, setStarted] = useState<boolean>(Game.isStarted);
  const [mines, setMines] = useState<number>(Game._mines_number);
  const [mouseClick, setMouseClick] = useState<number[]>([0,0]);
  const [bombPos,setBombPos] = useState<number[][]>([]);
  const [timeStop, setTimestop] = useState<boolean>(true);

let initial_state: CellParams[][] = [];

// To first load
  const [firstGame, setFirstGame] = useState(true);
  function FirstGame(){
    if (firstGame){
    setFirstGame(false);
    Game.generateField();
    setField(Game.field);
    setCell(generateCells(field,0,0,true));
    }
  }
  useEffect(() => {FirstGame();},[])


  function restartGame(): void{
    setSmileFace("happy")
    setIsLose(false);
    setIsWin(false);
    setTimestop(true)
    setUnOpened(Game.unOpened)
    setStarted(false);
    Game.restartNewGame();
    setField(Game.field);
    setCell(generateCells(field,0,0,true));
    setTime(Game.timer);
    setMines(Game.mines_number);
  }

  const startNewGame = (mouse_x:number, mouse_y:number) => {
    setTimestop(false)
    setStarted(true);
    setMouseClick ([mouse_x,mouse_y])
    Game.generateField();
    Game.fillBombs(mouse_x,mouse_y)
    Game.calculateField();
    setCell(generateCells(Game.field,mouse_x,mouse_y,false))
    setField(Game.field);
    setBombPos(Game.bombsList);
    


    //Game.isWon = true;
    // console.log(cells)
  }




  //Field and cells 
  function winGame(){
    if ((unOpened == Game.mines_number && !isLose)){
      setIsWin(true)
      setTimestop(true);
      setSmileFace("sunglasses");}
  }
  useEffect(() => {winGame()}, [unOpened])

  function loseGame(){
    setTimestop(true);
    setSmileFace("dad");
    setIsLose(true);
  }


  function findNear(curr_x: number, curr_y: number){
    let isValid = (curr_x >= 0) && (curr_x < Game.width) && (curr_y >= 0) && (curr_y < Game.height);
    if (!isValid) return;
    if(cells[curr_x][curr_y].isOpened) return;
    if(cells[curr_x][curr_y].isFlaged || cells[curr_x][curr_y].isQuestion) return;


    if(cells[curr_x][curr_y].value === 10) return;

    cells[curr_x][curr_y].isOpened = true;
    setUnOpened(unOpened => unOpened - 1);

    if (cells[curr_x][curr_y].value === 0){
      for(let x:number = curr_x-1; x < curr_x+2; x++){
        for(let y:number = curr_y-1; y < curr_y+2; y++){
          findNear(x,y);
        }
    }
  }

    
  }

  function findWrong(){
    cells.map((row,x) => {
      row.map((elem,y) => {
        if (cells[x][y].isFlaged && (cells[x][y].value !== 10)){
          cells[x][y].isOpened = true;
          cells[x][y].value = 12
        }
      })
    })
  }


  //Рекурсию тут надо
  function openCell(x:number, y:number){
     // console.log(cells);
      if (cells[x][y].value == 10){
        Game.isFailed = true
        cells[x][y].value = 11;
        loseGame();
        bombPos.map((value) => {
          if(!cells[value[0]][value[1]].isFlaged)
          cells[value[0]][value[1]].isOpened = true;
        })
        findWrong();
        setCell(cells);
      } else{
      findNear(x,y)
      setCell(cells);
      }

  }

  function flagSet(x:number, y:number){
    cells[x][y].isFlaged = true;
    setMines(mines => mines - 1);
    setCell(cells)
    // console.log("fs")
  }

  function flagUnSet(x:number, y:number){
    cells[x][y].isFlaged = false;
    cells[x][y].isQuestion = true;
    setMines(mines => mines + 1);
    setCell(cells)
    // console.log("fus")
  }

  function questionUnset(x:number, y:number){
    cells[x][y].isQuestion = false;
    setRerender(rerender => rerender + 1);
    setCell(cells)
    // console.log("qus")
  }

  function generateCells(Field: number[][],xcur:number,ycur:number,isInit:boolean): CellParams[][]{
    let temp_cells: CellParams[][] = [];
    for (let x: number = 0; x < Game.height; x++){
      temp_cells[x] = [];
      for(let y: number = 0; y < Game.width; y++){
          temp_cells[x][y] = {
            x_pos: x,
            y_pos: y,
            value: Field[x][y],
            isOpened: false,
            isStartingPoint: false,
            isFlaged: false,
            isQuestion: false
          }
      }
    }
    if (!isInit){
    temp_cells[xcur][ycur].isStartingPoint = true;}
    return(temp_cells);
  }


  function gridCells(){
    return(cells.map((value1, x) => 
    <div className={styles.field_row}>
    {cells[x].map((value2, index) => 
    <Cell
      isWin = {isWin}
      isLost = {isLose}
      isQuestion = {cells[x][index].isQuestion}
      isFlaged = {cells[x][index].isFlaged}
      isStartingPoint = {cells[x][index].isStartingPoint}
      openCell={() => openCell(x,index)}
      isOpened = {cells[x][index].isOpened}
      isStarted = {started}
      value={cells[x][index].value}
      pos_x={cells[x][index].x_pos}
      pos_y={cells[x][index].y_pos}
      startGame={() => startNewGame(cells[x][index].x_pos,cells[x][index].y_pos)}
      flagSet={() => flagSet(cells[x][index].x_pos,cells[x][index].y_pos)}
      flagUnset={() => flagUnSet(cells[x][index].x_pos,cells[x][index].y_pos)}
      qUnset={() => questionUnset(cells[x][index].x_pos,cells[x][index].y_pos)}
      scare={() => setSmileFace("scared")}
      unscare={() => pressedSmile()}
    />)}
    </div>
    ))
  }



  //Field and cells
  

  
//TIMER измени зависимость, состояние сейчас меняет клетки
  const getTime = () => {
    if (timeStop){

    }
    else {
    Game.incrementTimer();
    setTime(Game.timer);
    }
  }
  useEffect(() => {
    const interval = setInterval(() => getTime(), 1000);

    return () => clearInterval(interval)
  },[timeStop])
//Timer
// Smile

  const pressedSmile = () => {
      if (isWin){ 
        setSmileFace("sunglasses")
        return;
      }
      if (isLose){
        setSmileFace("dad");
        return
      }
      setSmileFace("happy")
  }

// Smile


  return (
    <div className={styles.frame}>
      <div className={styles.frame__inside__top}>
        <Bombs
        key = {1}
        amount = {mines}
        />
        <Smile 
          key = {2}
          last ={() => pressedSmile()}
          pressed={() => setSmileFace("pressed")}
          facestate= {smileFace}
          restart = {() => restartGame()}></Smile>
        <Timer
          key = {3}
          seconds={time}
          />
      </div>
      <div 
      

      className={styles.field}>
        {gridCells()}
      </div>
    </div>
  );
}

export default App;
