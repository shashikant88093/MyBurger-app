import React from "react";
import Modal from "../../Components/UI/Modal/Modal";
import Aux from "../../Hoc/Auxillary";
import Axios from "axios";

const withErrorHandler = (WrappedComponent,axios) => {
  return class extends React.Component {
    state = {
      error: null
    };
    componentWillMount() {
      this.reqInterceptor = Axios.interceptors.request.use(req=> {
        this.setState({ error: null });
        return req
      });
      this.reqInterceptor = Axios.interceptors.response.use(null, error => {
        this.setState({ error: error });
      });
    }
    componentWillUnmount(){
        Axios.interceptors.request.eject(this.reqInterceptor);
        Axios.interceptors.response.eject(this.resInterceptor)
    }
    errorConfirmedHandler = ()=>{
        this.setState({error:null})
    }
    render() {
      return (
        <Aux>
          <Modal clicked ={this.errorConfirmedHandler}
           show={this.state.error}>
           {this.state.error ? this.state.error.message : null}</Modal>
          <WrappedComponent {...this.props} />
        </Aux>
      );
    }
  };
};

export default withErrorHandler;
