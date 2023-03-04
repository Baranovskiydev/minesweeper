import React from 'react'
import styles from './styles.module.css'
import Digit from './Digit'

interface timerProps{
  seconds: number;
}

// i inderstand, that timer and Bombs we can unite in one component, but i just wanna get internship, i'm not stoopid
export default function Timer(props: timerProps): JSX.Element {
  let hundreds:number = (props.seconds - props.seconds % 100) / 100;
  let dozens:number =  (props.seconds % 100 -  props.seconds % 10) / 10;
  let ones:number = props.seconds % 10;

  return (
    <div className={styles.display}>
      <Digit
        key = {1}
        value={hundreds}
      />
      <Digit
        key = {2}
        value={dozens}
      />
      <Digit
        key = {3}
        value={ones}
      />
    </div>
  )
}
