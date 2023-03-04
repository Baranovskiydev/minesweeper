import React from "react"
import styles from "./styles.module.css"

interface digitProps{
    value: number;
    key: number;
}

export default function Digit(props: digitProps): JSX.Element {

    const digits: object = {
        0: styles.digit_0,
        1: styles.digit_1,
        2: styles.digit_2,
        3: styles.digit_3,
        4: styles.digit_4,
        5: styles.digit_5,
        6: styles.digit_6,
        7: styles.digit_7,
        8: styles.digit_8,
        9: styles.digit_9,
    }

    return(
        <button  className={digits[props.value]}>
            
        </button>
    )
}