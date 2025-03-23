import React from 'react'

import style from "./Error.module.css"


const Error = ({error}) => {
  return (
    <div className={style.error} >
    <div className={style.error_box} > 
    <h1>Please Fix This Error and Reload Browser</h1> 
    <p>{error}</p>
    </div>
    </div>
  )
}

export default Error