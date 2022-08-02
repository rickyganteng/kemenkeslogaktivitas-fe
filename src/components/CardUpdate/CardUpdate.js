import React, { Component } from "react";
import { Button, Card } from "react-bootstrap";
import styles from "./CardUpdate.module.css";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

class Cards extends Component {
  render() {
    const {
      namaruang_r,
      alamat_gedung,
      jumlah_kursi,
      ruangan_lantai,
      image_ruangan,
      id_r
    } = this.props.data;
    const { handleUpdate, handleDelete, data, btBooking, handleFasilitas } = this.props;
    return (
      <>
        <Card style={{ width: "200px" }} className="mx-auto">
          <Card.Img
            variant="top"
            src={`http://localhost:3001/backend1/api/${image_ruangan}`}
            className={styles.imgCard}
          />
          <Card.Body className="text-center">
            <Card.Title className={styles.title}>{namaruang_r}</Card.Title>
            <Card.Text className={styles.category}>jumlah kursi : {jumlah_kursi}</Card.Text>
            <Card.Text className={styles.category}>{alamat_gedung} Lantai : {ruangan_lantai}</Card.Text>
            <Button
              className={styles.btBooking}
              variant="outline"
              onClick={() => btBooking(data)}
            >
              Booking
            </Button>
            {
              this.props.auth.data.user_role === "admin" ? (
                <Button
                  className={styles.btUpdate}
                  variant="outline-primary"
                  onClick={() => handleUpdate(data)}
                >
                  Update
                </Button>
              ) : (
                ""
              )
            }
            <Button
              className={styles.btFasilitas}
              variant="outline-info"
              onClick={() => handleFasilitas(data)}
            >
              Fasilitas
            </Button>

            {
              this.props.auth.data.user_role === "admin" ? (
                <Button
                  className={styles.btDelete}
                  variant="outline-primary"
                  onClick={() => handleDelete(id_r)}
                >
                  Delete
                </Button>
              ) : (
                ""
              )
            }

          </Card.Body>
        </Card>
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  auth: state.auth,
});

const mapDispatchToProps = {};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(Cards));