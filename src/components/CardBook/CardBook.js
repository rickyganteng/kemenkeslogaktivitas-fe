import React, { Component } from "react";
import { Button, Card, Image, Modal } from "react-bootstrap";
import { withRouter } from "react-router-dom";
// import dummy from "../../assets/img/logo_2.png";
import styles from "./CardBook.module.css";

class Cards extends Component {
  constructor(props) {
    super(props);
    this.state = {
      movieId: this.props.data[0],
      premiereId: this.props.data[1].premiere_id,
      showTimeId: false,
      selectedClock: "",
      show: false,
    };
  }

  handleClock = (clock) => {
    const { selectedClock } = this.state;
    if (selectedClock === clock.show_time_clock) {
      this.setState({
        selectedClock: "",
        showTimeId: false,
      });
    } else {
      this.setState({
        selectedClock: clock.show_time_clock,
        showTimeId: clock.show_time_id,
      });
    }
  };

  handleClose = () => {
    this.setState({
      show: false,
    });
  };

  handleBook = () => {
    const { showTimeId } = this.state;

    if (showTimeId) {
      const { movieId, premiereId, showTimeId } = this.state;
      const booking = JSON.stringify({
        movieId: movieId,
        premiereId: premiereId,
        showTimeId: showTimeId,
      });
      localStorage.setItem("bookingInfo", booking);
      this.props.history.push(`/main/order`);
    } else {
      this.setState({
        show: true,
      });
    }
  };

  render() {
    const { selectedClock, show } = this.state;
    const {
      premiere_name,
      premiere_logo,
      location_city,
      location_addres,
      premiere_price,
      showTime,
    } = this.props.data[1];
    return (
      <>
        <Modal show={show} onHide={this.handleClose}>
          <Modal.Header closeButton>
            <Modal.Title className={styles.modal}>
              Please select show time first
            </Modal.Title>
          </Modal.Header>
        </Modal>
        <Card
          className="mb-3 mr-2 ml-2"
          style={{ width: "350px", height: "390px" }}
        >
          <Card.Body>
            <div className="d-flex flex-row justify-content-center">
              <div className="mr-4 mt-2">
                <Image src={`http://localhost:3001/backend1/api/${premiere_logo}`} fluid />
              </div>
              <div>
                <p className={styles.title}>{premiere_name}</p>
                <p
                  className={styles.subTitle}
                >{`${location_city}, ${location_addres}`}</p>
              </div>
            </div>
            <hr />
            <div className="d-flex flex-wrap">
              {showTime.map((e, i) => {
                return (
                  <div
                    key={i}
                    className={
                      selectedClock === e.show_time_clock
                        ? styles.clockSelected
                        : styles.clock
                    }
                    onClick={() => {
                      this.handleClock(e);
                    }}
                  >
                    {e.show_time_clock}
                  </div>
                );
              })}
            </div>
            <hr />
            <div className="d-flex justify-content-between">
              <p className={styles.price}>Price</p>
              <p className={styles.priceValue}>
                <span>$</span>
                {premiere_price}
                <span>/seat</span>
              </p>
            </div>
            <div className="pt-3">
              <Button
                className={styles.btBook}
                variant="primary"
                onClick={() => {
                  this.handleBook();
                }}
              >
                Book now
              </Button>
            </div>
          </Card.Body>
          <br />
          <br />
          <br />
        </Card>
      </>
    );
  }
}

export default withRouter(Cards);
