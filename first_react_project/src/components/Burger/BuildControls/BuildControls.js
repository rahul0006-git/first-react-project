import React from 'react';
import classes from './BuildControls.css'
import BuildControl from './BuildControl/BuildControl'

const controls = [
    {label : 'Salad', type : 'salad' },
    {label : 'Bacon', type : 'bacon' },
    {label : 'Cheese', type : 'cheese' },
    {label : 'Meat', type : 'meat' },
];

const buildControls = (props) =>{
return(
<div className = {classes.BuildControls}>
<p>Current Price of the Burger is : <strong>{props.price.toFixed(2)}</strong></p>
{controls.map((ctrl) =>{
 return <BuildControl key = {ctrl.label} label = {ctrl.type} addClick = {()=>props.ingredientAdded(ctrl.type)} removeClick = {()=>props.ingredientRemoved(ctrl.type)} disabled = {props.disabled[ctrl.type]}/> 
})}
<button 
className = {classes.OrderButton}
onClick = {props.clicked}
disabled={!props.purchasable}
>ORDER NOW</button>
</div>
);
}

export default buildControls;