import React from "react";
import Aux from "../Auxillary";
import classes from "./Layout.css";
import Toolbar from "../../Components/Navigation/Toolbar/Toolbar";
import SideDrawer from "../../Components/Navigation/SideDrawer/SideDrawer";
class Layout extends React.Component {
  state = {
    ShowSideDrawer: false
  };
  sideDrawerClosedHandler = () => {
    this.setState({ ShowSideDrawer: false });
  };
  sideDrawerToggleHandler = () =>{
      this.setState((prevState)=>{
          return {ShowSideDrawer: !prevState.ShowSideDrawer}
      });
  }
  render() {
    return (
      <Aux>
        <Toolbar drawerToggleClicked={this.sideDrawerToggleHandler}/>
        <SideDrawer
        open={this.state.ShowSideDrawer} closed={this.sideDrawerClosedHandler} />
        <main className={classes.Content}>{this.props.children}</main>
      </Aux>
    );
  }
}

export default Layout;
