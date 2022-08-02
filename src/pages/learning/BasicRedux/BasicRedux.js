import React, { Component } from "react";
import styles from "./BasicRedux.module.css";
import { Button, Container } from "react-bootstrap";
import { connect } from "react-redux";

import {
  increaseCounter,
  decreaseCounter,
  resetCounter,
} from "../../../redux/action/counter";

class BasicRedux extends Component {
  // constructor() {
  //   super();
  //   this.state = {
  //     count: 0,
  //   };
  // }
  // increaseCounter = () => {
  //   this.setState({
  //     count: this.state.count + 1,
  //   });
  // };
  // decreaseCounter = () => {
  //   this.setState({
  //     count: this.state.count - 1,
  //   });
  // };
  // resetCounter = () => {
  //   this.setState({
  //     count: 0,
  //   });
  // };

  render() {
    console.log(this.props);
    const { count } = this.props.counter;
    return (
      <>
        <Container className={styles.containerCenter}>
          <h1>Basic Redux</h1>
          <hr />
          <h2>Counter App</h2>
          <h3>{count}</h3>
          <Button variant="primary" onClick={this.props.decreaseCounter}>
            -
          </Button>
          <Button
            variant="secondary"
            className="mx-2"
            onClick={this.props.resetCounter}
          >
            RESET
          </Button>
          <Button variant="primary" onClick={this.props.increaseCounter}>
            +
          </Button>
        </Container>
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  counter: state.counter,
});

const mapDispatchToProps = { increaseCounter, decreaseCounter, resetCounter };

// jika tidak gunakan mapState (null, mapDispatch)
// jika tidak gunakan mapDispatch (mapState)
export default connect(mapStateToProps, mapDispatchToProps)(BasicRedux);
