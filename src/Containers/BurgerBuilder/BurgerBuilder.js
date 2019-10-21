import React, { Component } from "react";
import Aux from "../../Hoc/Auxillary";
import Burger from "../../Components/Burger/Burger";
import Buildcontrols from "../../Components/Burger/BuildControls/Buildercontrols";
import Model from "../../Components/UI/Modal/Modal";
import OrderSummary from "../../Components/Burger/OrderSummary/OrderSummary";
import Axios from "../../Axios-orders";
import Spinner from "../../Components/UI/Spinner/Spinner";
import withErrorHandler from "../../Hoc/withErrorHandler/withErrorHandler";
const INGREDIENT_PRICES = {
  salad: 0.5,
  cheese: 0.4,
  meat: 1.3,
  bacon: 0.7
};
class BurgerBuilder extends Component {
  state = {
    ingredients: null,
    totalPrice: 0,
    purchasable: false,
    purchasing: false,
    loading: false
  };
  componentDidMount() {
    Axios.get("https://burger-app-2ae38.firebaseio.com/ingredients.json").then(
      response => {
        this.setState({ ingredients: response.data });
      }
    );
  }
  updatePurchaseState() {
    const ingredients = {
      ...this.state.ingredients
    };
    const sum = Object.keys(ingredients)
      .map(ingKey => {
        return ingredients[ingKey];
      })
      .reduce((sum, el) => {
        return sum + el;
      }, 0);
    this.setState({ purchasable: sum > 0 });
  }
  addIngredientHandler = type => {
    const oldCount = this.state.ingredients[type];
    const updatedCount = oldCount + 1;
    const updatedIngredients = {
      ...this.state.ingredients
    };
    updatedIngredients[type] = updatedCount;
    const priceAddition = INGREDIENT_PRICES[type];
    const oldPrice = this.state.totalPrice;
    const newPrice = oldPrice + priceAddition;
    this.setState({ totalPrice: newPrice, ingredients: updatedIngredients });
    this.updatePurchaseState();
  };
  purchaseHandler = () => {
    this.setState({ purchasing: true });
  };
  purchaseCancelHandler = () => {
    this.setState({ purchasing: false });
  };
  purchaseContinuedHandler = () => {
    // alert("yes continue")
    this.setState({ loading: true });
    const order = {
      ingredients: this.state.ingredients,
      price: this.state.totalPrice,
      customer: {
        name: "Shashikant Kumar",
        address: {
          street: "Teststreet 1",
          zipCode: "600113",
          country: "India"
        },
        email: "test@test.com"
      },
      deliveryMethod: "fastest"
    };
    Axios.post("/orders.json", order)
      .then(response => {
        this.setState({ loading: false });
      })
      .catch(error => {
        this.setState({ loading: false });
      });
  };
  removeIngredientHandler = type => {
    const oldCount = this.state.ingredients[type];
    if (oldCount <= 0) {
      return;
    }
    const updatedCount = oldCount - 1;
    const updatedIngredients = {
      ...this.state.ingredients
    };
    updatedIngredients[type] = updatedCount;
    const priceDeduction = INGREDIENT_PRICES[type];
    const oldPrice = this.state.totalPrice;
    const newPrice = oldPrice - priceDeduction;
    this.setState({ totalPrice: newPrice, ingredients: updatedIngredients });
  };

  render() {
    const disabledInfo = {
      ...this.state.ingredients
    };
    for (let key in disabledInfo) {
      disabledInfo[key] = disabledInfo[key] <= 0;
    }

    let orderSummary = null;
    let burger = <Spinner />;
    if (this.state.ingredients) {
      burger = (
        <Aux>
          <Burger ingredients={this.state.ingredients} />
          <Buildcontrols
            ingredientAdded={this.addIngredientHandler}
            ingredientRemove={this.removeIngredientHandler}
            disabled={disabledInfo}
            price={this.state.totalPrice}
            ordered={this.purchaseHandler}
            purchasable={this.state.purchasable}
          />
        </Aux>
      );
      orderSummary = (
        <OrderSummary
          ingredients={this.state.ingredients}
          price={this.state.totalPrice}
          purchaseCancelled={this.purchaseHandler}
          purchaseContinued={this.purchaseContinuedHandler}
        />
      );
    }

    if (this.state.loading) {
      orderSummary = <Spinner />;
    }

    return (
      <Aux>
        <Model
          show={this.state.purchasing}
          modalClosed={this.purchaseCancelHandler}
        >
          {orderSummary}
        </Model>
        {burger}
      </Aux>
    );
  }
}

export default withErrorHandler(BurgerBuilder, Axios);
