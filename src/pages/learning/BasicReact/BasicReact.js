import React, { Component } from "react";
// import "./BasicReact.css";
import styles from "./BasicReact.module.css";
import { Link } from "react-router-dom";
import { Button, Container, Card } from "react-bootstrap";
import NavBar from "../../../components/learning/NavBar";
import NavBar2 from "../../../components/NavBar/NavBar";
import Footer from "../../../components/Footer/Footer";

class BasicReact extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "Timotius Nugroho",
      search: "",
      isShow: true,
      data: [
        {
          movie_id: 1,
          movie_name: "Spiderman",
        },
        {
          movie_id: 2,
          movie_name: "Batman",
        },
      ],
    };
    this.handleClick = this.handleClick.bind(this);
  }

  componentDidMount() {
    console.log("ComponentDidMount Running !");
    // digunakan untuk get data
  }

  componentDidUpdate() {
    console.log("ComponentDidUPdate Running !");
  }

  handleClick() {
    console.log("Declaration Function !");
    console.log("this is", this);
  }

  handleClick2 = () => {
    console.log("Arrow Function !");
    console.log("this is", this);
    this.setState({ isShow: false });
  };

  handleClick3 = (id) => {
    console.log("Send argument!");
    console.log("id", id);
  };

  changeText = (event) => {
    console.log(event.target.name);
    console.log(event.target.value);
    this.setState({ [event.target.name]: event.target.value });
  };

  handleParams = (id, event) => {
    console.log("Go to movie detail page");
    // console.log(this.props);
    this.props.history.push(`/learning/basic-movie-detail?movieId=${id}`);
  };

  render() {
    // bikin fungsi diatas render
    // console.log(this.state);
    const { name, search } = this.state;
    return (
      <>
        <Container>
          <NavBar2 />

          <Container className={styles.containerCenter}>
            <h1>BasicReact</h1>
            <NavBar />
            <h1>Hello Woolrd !</h1>
            <h1>Hello {name} !</h1>
            <hr />
            <h3>Events</h3>
            <button onClick={this.handleClick}>Click Me !</button>
            <button onClick={this.handleClick2}>Click Me2 !</button>
            <button onClick={() => this.handleClick3(1)}>Click Me3 !</button>
            <h6>Search Key : {search}</h6>
            <input
              placeholder="Search..."
              name="search"
              onChange={(event) => this.changeText(event)}
            />
            <hr />
            <h3>Link & URL Params</h3>
            <a href="/learning/basic-movie-detail">Go to movie with ancor</a>
            <br />
            <Link to="/learning/basic-movie-detail">Go to movie with link</Link>
            <br />
            <Button
              variant="primary"
              onClick={(event) => this.handleParams(1, event)}
            >
              Detail
            </Button>
            <hr />
            <h3>Styling in React</h3>
            <h2 className={styles.header}>
              Stlying with BasicReact.module.css
            </h2>
            <hr />
            <h3>Conditional</h3>
            {console.log(this.state.isShow)}
            {this.state.isShow ? <h5>Show is True</h5> : <h5>Show is False</h5>}
            <hr />
            <h3>Looping/Mapping</h3>
            {this.state.data.map((item, index) => {
              return <li key={index}>{item.movie_name}</li>;
            })}
            <hr />
            <Card style={{ width: "18rem" }}>
              <Card.Img variant="top" src="https://picsum.photos/200/100" />
              <Card.Body>
                <Card.Title>Card Title</Card.Title>
                <Card.Text>
                  Some quick example text to build on the card title and make up
                  the bulk of the card's content.
                </Card.Text>
                <Button variant="primary">Go somewhere</Button>
              </Card.Body>
            </Card>
          </Container>
          <Footer />
        </Container>
      </>
    );
  }
}

export default BasicReact;
