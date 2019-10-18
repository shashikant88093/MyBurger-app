import React from "react";
import Aux from "../../../Hoc/Auxillary";
import Button from "../../UI/Button/Button";
class OrderSummary extends React.Component{
  componentDidUpdate(){
    console.log('[OrderSummary] willUpdate')
  }
  render(){
    const ingredientSummary = Object.keys(this.props.ingredients).map(ingKey => {
      return (
        <li>
          <span style={{ textTransform: "capitalize" }}>{ingKey}</span>:{" "}
          {this.props.ingredients[ingKey]}
        </li>
      );
    });
    return(
<Aux>
      <h3>Your Order</h3>
      <p>A delicious burger with the following ingredients</p>
      <ul>
    {ingredientSummary}
      </ul>
      <p><strong>Total Price: {this.props.price}</strong></p>
      <p>Continue checkout ?</p>
      <Button btnType="Danger" clicked={this.props.purchaseCancelled}>CANCEL</Button>
      <Button btnType="Success" clicked={this.props.purchaseContinued}>CONTITNUE</Button>
    </Aux>
    )

  }
} 


export default OrderSummary;