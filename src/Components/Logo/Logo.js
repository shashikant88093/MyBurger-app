import React from "react";
import BurgerLogo from "../../Assets/img/burger_logo.png";
import classes from "./Logo.css";
const Logo = props => (
  <div className={classes.Logo} style={{ height: props.height }}>
    <img src={BurgerLogo} alt="Myburger App" />
  </div>
);

export default Logo;
