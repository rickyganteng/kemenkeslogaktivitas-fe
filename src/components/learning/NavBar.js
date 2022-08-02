import React, { Component } from "react";
import { Link } from "react-router-dom";

class NavBar extends Component {
  render() {
    return (
      <>
        <Link to="/learning/basic-react">Basic React</Link> |
        <Link to="/learning/basic-home">Basic Home</Link> |
        <Link to="/learning/basic-movie-detail">Basic Movie Detail</Link>
      </>
    );
  }
}

export default NavBar;
