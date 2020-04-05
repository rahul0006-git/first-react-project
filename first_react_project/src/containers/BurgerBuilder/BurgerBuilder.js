import React,{Component} from 'react';
import Aux from '../../hoc/Auxilliary';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls'
import Modal from '../../components/UI/Modal/Modal'
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary'
import axios from '../../axios-orders'
import Spinner from '../../components/UI/Spinner/Spinner'
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler'

const INGREDIENT_PRICES = {
    salad : 1,
    cheese : 2,
    meat : 3,
    bacon : 1
}

class BurgerBuilder extends Component {

    state = {
        ingredients : null,

        totalPrice : 7,

        purchasable: false,

        purchasing :false,
        loading:false,
        error:false
     
    }

    componentDidMount(){
        axios.get('https://react-49f03.firebaseio.com/ingredients.json')
        .then(response=>{
            this.setState({ingredients:response.data})
        })
        .catch(error=>{
            this.setState({error:true})
        })
    }

    updateOrderButton(ingredients){
        
        const sum = Object.keys(ingredients).map((igKey)=>{
            return ingredients[igKey]
        }).reduce((acc,cur)=>{
            return acc + cur;
        },0)
        
        this.setState({purchasable:sum>0})   
    }

    addIngredientHandler = (type) =>{
        const oldCount = this.state.ingredients[type];
        const updatedCount = oldCount + 1;
        const updatedIngredients = {
            ...this.state.ingredients
        };
        updatedIngredients[type] = updatedCount;

        const price = INGREDIENT_PRICES[type];
        const oldPrice = this.state.totalPrice;
        const updatedPrices = price + oldPrice;
        this.setState({
            totalPrice:updatedPrices,
            ingredients : updatedIngredients
        })
        this.updateOrderButton(updatedIngredients)
    }

    removeIngredientHandler = (type)=>{

        const oldCount = this.state.ingredients[type];
        let newCount; 
        if(oldCount===0){
          newCount = 0;
        }else{
            newCount = oldCount-1;
        }
        const deletedIngredients = {
            ...this.state.ingredients
        }
        deletedIngredients[type] = newCount;

        const previousPrice = INGREDIENT_PRICES[type];
        const oldPrices = this.state.totalPrice;
        const updatedPrice = oldPrices - previousPrice ;

        this.setState({
            totalPrice:updatedPrice,
            ingredients:deletedIngredients
        })
        this.updateOrderButton(deletedIngredients)
    }

    updateOrderNowHandler=()=>{
        this.setState({purchasing:true})
    }

    purchaseCancelHandler =()=>{
        this.setState({purchasing:false});
    }

    purchaseContinueHandler =()=>{
        //alert('Please continue');
        this.setState({loading:true});
        const order = {
            ingredients : this.state.ingredients,
            price : this.state.totalPrice,
            customer:{
                name:'rahul',
                address:{
                    street : 'saint-marc',
                    country:'Canada'
                },
                email:'venkatarahul.p1996@gmail.com'
            },
            deliveryMethod : 'fastest'
        }
        axios.post('/orders.json',order)
        .then(response=>{
            this.setState({loading:false,purchasing:false});
        })
        .catch(error => {
            this.setState({loading:false,purchasing:false});
        });
    }


    render(){

        const disableInfo = {
            ...this.state.ingredients
        }

        for(let key in disableInfo){
            disableInfo[key] = disableInfo[key]<=0
        }
        let orderSummary = null
        let burger=this.state.error?<p>Ingredients can't be loaded</p>:<Spinner/>
        if(this.state.ingredients){
            burger =  (
                <Aux>
                  <Burger ingredients = {this.state.ingredients}/>
                  <BuildControls ingredientAdded = {this.addIngredientHandler} ingredientRemoved = {this.removeIngredientHandler} price = {this.state.totalPrice} purchasable = {this.state.purchasable} disabled = {disableInfo} clicked = {this.updateOrderNowHandler}/>
                </Aux>
            );
            orderSummary = <OrderSummary 
            ingredients = {this.state.ingredients}
            price = {this.state.totalPrice}
            purchaseCancelled = {this.purchaseCancelHandler}
            purchaseContinued = {this.purchaseContinueHandler}/>
        }
        if(this.state.loading){
            orderSummary = <Spinner/> 
        }
    
        return(

            <Aux>
              <Modal show = {this.state.purchasing} modalClosed={this.purchaseCancelHandler}>
                {orderSummary}
              </Modal>
              <BuildControls/>
             
            </Aux>

        );
    }

}

export default withErrorHandler(BurgerBuilder,axios);
