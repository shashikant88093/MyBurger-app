import React, {Component } from 'react';
import Aux from '../../Hoc/Auxillary';
import Burger from '../../Components/Burger/Burger'
class BurgerBuilder extends Component {
   
    render() {
        return (
            <Aux>
                <Burger/>
                <div>Build Controls</div>
           </Aux>
        );
    }
}

export default BurgerBuilder;