import React, { Component } from "react";
import moment from "moment";
import { Button, Image } from "react-bootstrap";
import styles from "./CardOrderHistory.module.css";

class Cards extends Component {
  render() {
    const {
      movie_name,
      premiere_logo,
      show_time_date,
      show_time_clock,
    } = this.props.info;

    return (
      <>
        <div className="mb-3 shadow p-4">
          <div className="d-flex flex-sm-row flex-column justify-content-between">
            <div>
              <p className={styles.semi}>
                {moment(show_time_date).format("dddd,LL")},{" "}
                <span>{show_time_clock}</span>
              </p>
              <p className={styles.name}>{movie_name}</p>
            </div>
            <div>
              <Image src={`http://localhost:3001/backend1/api/${premiere_logo}`} />
            </div>
          </div>
          <hr />
          <div className="d-flex flex-row justify-content-between">
            <Button variant="secondary">Ticket Used</Button>
            <Button variant="outline-secondary">Show Details</Button>
          </div>
        </div>
      </>
    );
  }
}

export default Cards;
