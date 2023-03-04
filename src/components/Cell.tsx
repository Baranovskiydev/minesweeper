import React, { useState, useEffect } from 'react'
import styles from './styles.module.css'
interface CellProps{
  value: number;
  pos_x: number;
  pos_y: number;
  // key: number;
  isStarted: boolean;
  isStartingPoint: boolean;
  isFlaged: boolean;
  isOpened: boolean;
  isQuestion: boolean;
  isWin:boolean;
  isLost:boolean;
  startGame():any;
  openCell(): void;
  flagSet(): void;
  flagUnset(): void;
  qUnset():void;
  scare():void;
  unscare():void;
}


export default function Cell(props: CellProps): JSX.Element {
  const lclick: object ={
    12: styles.cell_wrong,
    11: styles.cell_exploded,
    10: styles.cell_unexploded,
    0: styles.cell_empty ,
    1: styles.cell_number1 ,
    2: styles.cell_number2 ,
    3: styles.cell_number3 ,
    4: styles.cell_number4 ,
    5: styles.cell_number5 ,
    6: styles.cell_number6 ,
    7: styles.cell_number7 ,
    8: styles.cell_number8 ,
    9: styles.cell_number9 
  }
  const rclick: object ={
    0: styles.cell_closed,
    1: styles.cell_flag,
    2: styles.cell_question
  }


  const [cellStyle, setCellStyle] = useState(rclick[0])

  useEffect(() => {
    if(props.isOpened)
    setCellStyle(lclick[props.value])
  },[props.isOpened])

  useEffect(() => {
    if (props.isStarted)
    props.openCell();
  },[props.isStartingPoint])

  useEffect(() => {
    if(!props.isStarted){
      setCellStyle(rclick[0])
    }
  },[props.isStarted])

  useEffect(() => {
    if(props.isFlaged) setCellStyle(rclick[1])
    if(props.isQuestion) setCellStyle(rclick[2])
    if(!props.isFlaged && !props.isQuestion) setCellStyle(rclick[0])

  },[props.isFlaged,props.isQuestion])



  let count = 0;
  return (

    <button 
    onMouseDown={() => {
      if(!props.isOpened && !props.isFlaged && !props.isWin && !props.isLost && !props.isQuestion){
        setCellStyle(lclick[0]);
        props.scare();
      }
    }}
    onMouseUp={() => {
      if (!props.isOpened && !props.isFlaged && !props.isWin && !props.isLost && !props.isQuestion){
        setCellStyle(rclick[0]);
        props.unscare();
      }
    }}
    onMouseLeave={() => {
      if (!props.isOpened && !props.isFlaged && !props.isWin && !props.isLost && !props.isQuestion){
        setCellStyle(rclick[0]);
        props.unscare();
      }
    }}
    onClick={(event) => {
      if (!props.isStarted && !props.isFlaged)  {
        props.startGame();
        }
      else if (!props.isOpened && !props.isFlaged && !props.isWin && !props.isLost){
        // console.log(props.isFlaged)
        props.openCell();
        setCellStyle(lclick[props.value]);
        }
      }}
    onContextMenu={(event) => {
      event.preventDefault();

      if(!props.isOpened && !props.isLost && !props.isWin && props.isStarted){
        if(props.isFlaged){
          props.flagUnset();
        }
        if(props.isQuestion){
          props.qUnset();
        }
        if (!props.isQuestion && !props.isFlaged){
          props.flagSet();
        }
      }
        

    }}
      className={cellStyle}>

    </button>
  )
}
