import React, { Component } from "react";
import Auxiliary from "../../hoc/Auxiliary";
import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/BuildControls/BuildControls";
import BurgerPrice from "../../components/BurgerPrice/BurgerPrice";

const INGREDIENT_PRICES = {
  salad: 0.5,
  cheese: 0.4,
  meat: 1.3,
  bacon: 0.7
};

const purchasableHandler = (argument) => {
  console.log("Haha du Dummy!");
};

class BurgerBuilder extends Component {
  state = {
    ingredients: {
      meat: 0,
      cheese: 0,
      bacon: 0,
      salad: 0
    },
    totalPrice: 4.0,
    controls: [
      { type: "meat", label: "Meat" },
      { type: "cheese", label: "Cheese" },
      { type: "bacon", label: "Bacon" },
      { type: "salad", label: "Salad" }
    ],
    
    purchasable: false
  };

  purchasableHandler = (ingredientsObj) => {
    const sum = Object.keys(ingredientsObj)
      .map(element => ingredientsObj[element])
      .reduce((acc, curr) => {
        return acc + curr;
    }, 0);

    this.setState({
      purchasable: sum > 0
    });
  };   

  addIngredientHandler = type => {
    // adding +1 to the ingredient amount
    const oldCount = this.state.ingredients[type];
    const newCount = oldCount + 1;
    const updatedIngredients = {
      ...this.state.ingredients
    };
    updatedIngredients[type] = newCount;
    // adding one unit's price to the totalPrice
    const oldPrice = this.state.totalPrice;
    const newPrice = oldPrice + INGREDIENT_PRICES[type];
    
    this.setState({
      ingredients: updatedIngredients,
      totalPrice: newPrice
    });
    this.purchasableHandler(updatedIngredients);

  };

  removeIngredientHandler = type => {
    // get old status
    const oldCount = this.state.ingredients[type];
    // if (oldCount === 0) {
    //   return;
    // }
    // create new status
    const newCount = oldCount - 1;
    // potentially create updated state
    const updatedIngredients = {
      ...this.state.ingredients
    };
    updatedIngredients[type] = newCount;

    // creating the deducted price
    const oldPrice = this.state.totalPrice;
    const newPrice = oldPrice - INGREDIENT_PRICES[type];

    // update the state
    this.setState({
      ingredients: updatedIngredients,
      totalPrice: newPrice
    });
    this.purchasableHandler(updatedIngredients);

  };


  render() {

    const disabledInfo = {
      ...this.state.ingredients
    };
    for (let item in disabledInfo) {
      disabledInfo[item] = disabledInfo[item] <= 0;
    }

    return (
      <Auxiliary>
        <Burger ingredients={this.state.ingredients} />
        <BurgerPrice totalPrice={this.state.totalPrice.toFixed(2)} />
        <BuildControls
          controls={this.state.controls}
          disabled={disabledInfo}
          lessHandler={this.removeIngredientHandler}
          moreHandler={this.addIngredientHandler}
          purchasable={this.state.purchasable}
        />
      </Auxiliary>
    );
  }
}

export default BurgerBuilder;
