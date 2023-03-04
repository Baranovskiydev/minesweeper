import React from 'react'
import styles from './styles.module.css'
import Digit from './Digit'


interface bombProps{
  amount: number;
}

export default function Bombs(props: bombProps): JSX.Element {

  let hundreds:number = (props.amount - props.amount % 100) / 100;
  let dozens:number =  (props.amount % 100 -  props.amount % 10) / 10;
  let ones:number = props.amount % 10;


  return (
    <div className={styles.display}>
      <Digit
        key = {1}
        value={hundreds * +(props.amount > 0)}
      />
      <Digit
        key = {2}
        value={dozens * +(props.amount > 0)}
      />
      <Digit
        key = {3}
        value={ones * +(props.amount > 0)}
      />
    </div>
  )
}
