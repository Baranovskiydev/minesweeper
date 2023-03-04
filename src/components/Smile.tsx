import React, {useState,MouseEvent, useEffect} from 'react'
import styles from './styles.module.css'

interface smileProps{
  facestate: string;
  restart(): void;
  last(): void;
  pressed(): void;
}

export default function Smile(props: smileProps): JSX.Element {
  const [btn, setBtn] = useState();
  
  const smiles: object = {
    "happy": styles.smile_button,
    "pressed": styles.smile_pressed,
    "scared": styles.smile_scared,
    "sunglasses": styles.smile_thug,
    "dad": styles.smile_dead
  }
  
  useEffect(() => {
    setBtn(smiles[props.facestate])
  }, [props.facestate])

  return (
    <button 
    onMouseDown={() => props.pressed()}
    onMouseUp={() => props.last()}
    onMouseLeave={() => props.last()}
    onClick={(e) =>{
      props.restart();
    }}
    className = {btn} 
    >
    </button>
  )
}
