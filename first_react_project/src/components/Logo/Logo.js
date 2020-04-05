import React from 'react'
import burger from '../../assets/images/download.jpg'
import classes from './Logo.css'

const logo = (props)=>{
return(
    <div className = {classes.Logo} style = {{height:props.height}}>
    <img src= {burger} ></img>
    </div>
)
}

export default logo;