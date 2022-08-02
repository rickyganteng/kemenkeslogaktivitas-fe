import React, { Component } from "react";
import styles from "./MovieDetail.module.css";
import NavBar from "../../../components/learning/NavBar";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
// import qs from "query-string";
import Seat from "../../../components/learning/Seat/Seat";

class MovieDetail extends Component {
  constructor() {
    super();
    this.state = {
      selectedSeat: [],
      reservedSeat: ["A1", "A7", "A14"],
      setSeatAlphabet: ["A", "B", "C", "D", "E", "F", "G"],
    };
  }
  componentDidMount() {
    // proses get data movie by id
    // cara 1
    // const urlParam = qs.parse(this.props.location.search);
    // console.log(urlParam.movieId);
    // cara 2
    // console.log(this.props.location.state);
    // cara 3
    console.log(this.props.match.params);

    // proses get data premiere bioskop by id
  }

  bookingSeat = (seat) => {
    let tmpSelectedSeat = this.state.selectedSeat;
    const index = tmpSelectedSeat.indexOf(seat);
    if (this.state.reservedSeat.indexOf(seat) < 0) {
      if (index < 0) {
        this.setState({
          selectedSeat: [...this.state.selectedSeat, seat],
        });
        console.log("seat IN", seat);
      } else {
        tmpSelectedSeat.splice(index, 1);
        this.setState({
          selectedSeat: tmpSelectedSeat,
        });
      }
    } else {
      console.log("Seat reserved");
    }
  };

  booking = () => {
    console.log("BOOKING");
    const booking = JSON.stringify(this.state.selectedSeat);
    localStorage.setItem("bookingSeat", booking);
  };

  render() {
    const { reservedSeat, selectedSeat, setSeatAlphabet } = this.state;
    return (
      <>
        <Container className={styles.containerCenter}>
          <h1 className={`${styles.headingColor} mr-auto`}>
            MovieDetail Page !
          </h1>
          <NavBar />
          <hr />
          <Row>
            <Col md={8}>
              <Card style={{ width: "480px" }}>
                <Card.Body>
                  {setSeatAlphabet.map((item, index) => {
                    return (
                      <Seat
                        key={index}
                        seatAlphabet={item}
                        reserved={reservedSeat}
                        selected={selectedSeat}
                        bookingSeat={this.bookingSeat.bind(this)}
                      />
                    );
                  })}
                </Card.Body>
                <Card.Body>
                  <Button
                    variant="primary"
                    size="md"
                    block
                    onClick={this.booking}
                  >
                    Booking
                  </Button>
                </Card.Body>
              </Card>
            </Col>
            <Col md={4}>
              <Card>
                <Card.Body>This is some text within a card body.</Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </>
    );
  }
}

export default MovieDetail;
