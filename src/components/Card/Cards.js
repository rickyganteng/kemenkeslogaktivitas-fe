import React, { Component } from "react";
import { Button, Card, Image } from "react-bootstrap";
import { withRouter } from "react-router-dom";
import styles from "./Cards.module.css";

class Cards extends Component {
  handleMovieDetail = (id) => {
    this.props.history.push(`/main/movie-detail/${id}`);
  };

  render() {
    const {
      movie_id,
      movie_name,
      movie_category,
      movie_image,
    } = this.props.data;
    return (
      <>
        <Card style={{ width: "180px" }}>
          <Image
            variant="top"
            src={`http://localhost:3001/backend1/api/${movie_image}`}
            style={{ width: "100%", height: "244px" }}
          />
          <Card.Body className="text-center">
            <Card.Title className={styles.title}>{movie_name}</Card.Title>
            <Card.Text className={styles.category}>{movie_category}</Card.Text>
            <Button
              className={styles.btMoon}
              variant="outline-primary"
              onClick={() => this.handleMovieDetail(movie_id)}
            >
              <div className={styles.btCnt}>Details</div>
            </Button>
          </Card.Body>
        </Card>
      </>
    );
  }
}

export default withRouter(Cards);
