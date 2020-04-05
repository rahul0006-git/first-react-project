import React from 'react'
import Aux from '../../../hoc/Auxilliary'
import Button from '../../UI/Button/Button'

const orderSummary = (props)=>{
    const ingredientSummary = Object.keys(props.ingredients)
    .map(igKey =>{
        return <li 
        key = {igKey}>
        <span 
        style={{textTransform:'capitalize'}}
        >{igKey}</span>:{props.ingredients[igKey]}</li>
    });
    return(
        <Aux>
        <h2>Your Order</h2>
        <p>A delicious burger with the following ingredients</p>
        <ul>
         {ingredientSummary}
        </ul>
        <p><strong>Total Price is : {props.price.toFixed(2)}</strong></p>
        <p>Please Continue to Check Out</p>
        <Button btnType="Danger" clicked = {props.purchaseCancelled}>CANCEL</Button>
        <Button btnType="Success" clicked = {props.purchaseContinued}>CONTINUE</Button>
        </Aux>
    )
    
};
export default orderSummary;



   

    