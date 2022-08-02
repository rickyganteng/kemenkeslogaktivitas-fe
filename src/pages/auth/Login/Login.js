import React, { Component } from "react";
import styles from "./Login.module.css";
import { Row, Col, Button, Container, Form, Image, Card, Modal } from "react-bootstrap";
import { connect } from "react-redux";
import { login, register } from "../../../redux/action/auth";
import logo from "../../../assets/img/gambarkemenkes.png";
// dede
class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      form: {
        userEmail: "",
        userPassword: "",
      },
      formregister: {
        userEmailRegis: "",
        userNIP: "",
        userPangkat: "",
        userUnitKerja: "",
        userPasswordRegis: "",
        userName: "",
        userPhoneNumber: ""
      },
      msg: "",
      emailValid: "valid",
      passwordValid: "valid",
      showregister: false,
      showNotif: false,
      modalMsg: ""
    };
  }

  changeText = (event) => {
    this.setState({
      form: {
        ...this.state.form,
        [event.target.name]: event.target.value,
      },
    });
  };

  handleLogin = (event) => {
    event.preventDefault();
    this.props
      .login(this.state.form)
      .then((res) => {
        localStorage.setItem("token", this.props.auth.data.token);
        localStorage.setItem("user", this.props.auth.data.id);
        this.props.history.push("/");
      })
      .catch((err) => {
        this.setState({
          msg: err.response.data.msg,
          emailValid: err.response.data.status === 404 ? "Invalid" : "valid",
          passwordValid: err.response.data.status === 400 ? "Invalid" : "valid",
        });
      });
  };

  handleRegister = () => {
    this.props.history.push("/register");
  };

  daftar = () => {
    console.log("hehe");
    this.setState({
      showregister: true
    })
  }

  handleClose = () => {
    this.setState({
      showregister: false,
    })
  }
  handleCloseNotif = () => {
    this.setState({
      showNotif: false
    })
  }

  changeTextForm = (event) => {
    console.log(event.target.value);
    console.log(event.target.name);
    this.setState({
      formregister: {
        ...this.state.formregister,
        [event.target.name]: event.target.value,
      },
    });
  };

  postData = () => {
    const { formregister } = this.state;
    delete formregister.movieImage;
    if (!formregister.image) {
      delete formregister.image;
    }
    console.log(formregister);
    const formData = new FormData();
    for (const key in formregister) {
      formData.append(key, formregister[key]);
    }
    console.log(formData);
    this.props
      .register(this.state.formregister)
      .then((res) => {
        this.setState(
          {
            modalMsg: "Submit Data Succes !",
            showNotif: true,
            showregister: false
          }
          // ,
          // () => {
          //   this.getData();
          // }
        );
        // this.resetForm();
      })
      .catch((err) => {
        this.setState({
          modalMsg: "NIP Sudah Terdaftar !",
          showNotif: true,
        });
      })
      .finally(() => {
        setTimeout(() => {
          this.setState({ show: false });
        }, 1000);
      });
  };

  render() {
    const {
      userEmail,
      userPassword,
      emailValid,
      passwordValid,
      msg,
      showregister,
      showNotif,
      modalMsg
    } = this.state;

    const {
      userEmailRegis,
      userNIP,
      userPangkat,
      userUnitKerja,
      userPasswordRegis,
      userName,
      userPhoneNumber } =
      this.state.formregister
    return (
      <>
        <Container fluid>
          <Row className="justify-content-md-center mt-5 mx-auto">
            <Col md={5}>
              <Image src={logo} className={styles.ukuranFoto} fluid />
            </Col>
            <Col md={4}>
              <Card>
                <div className="mx-auto p-4">
                  <h1 className="mt-3">Login Laporan Aktivitas Ditjen P2P</h1>

                  <Form onSubmit={this.handleLogin} className="mt-5">
                    <Form.Group controlId="formBasicEmail">
                      <Form.Label>User Name</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Enter user name"
                        name="userEmail"
                        value={userEmail}
                        onChange={(event) => this.changeText(event)}
                      />
                      <Form.Control.Feedback type={emailValid}>
                        <p className={styles.warning}>{msg}</p>
                      </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group controlId="formBasicPassword">
                      <Form.Label>Password</Form.Label>
                      <Form.Control
                        type="password"
                        placeholder="Password"
                        name="userPassword"
                        value={userPassword}
                        onChange={(event) => this.changeText(event)}
                      />
                      <Form.Control.Feedback type={passwordValid}>
                        <p className={styles.warning}>{msg}</p>
                      </Form.Control.Feedback>
                    </Form.Group>
                    <Button
                      variant="primary"
                      type="submit"
                      className={`${styles.btSubmit} mt-3`}
                    >
                      Sign in
                    </Button>
                    <p>Belum punya akun ?
                      <span
                        className={styles.leftPurple}
                        onClick={() => this.daftar()}>
                        Daftar
                      </span>
                    </p>
                  </Form>
                </div>
              </Card>
            </Col>
          </Row>
        </Container>

        {/* modal register */}
        <Modal size="lg" show={showregister} onHide={this.handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Input Aktivitas</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group as={Row}>
                <Col>
                  <Form.Label>Nama Lengkap</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Nama Lengkap"
                    name="userName"
                    value={userName}
                    onChange={(event) => this.changeTextForm(event)}
                  />
                </Col>
                <Col>
                  <Form.Label>NIP</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="NIP"
                    name="userNIP"
                    value={userNIP}
                    onChange={(event) => this.changeTextForm(event)}
                  />
                </Col>
              </Form.Group>
              <Form.Group as={Row}>
                <Col>
                  <Form.Label>Pangkat / Golongan</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="NIP"
                    name="userPangkat"
                    value={userPangkat}
                    onChange={(event) => this.changeTextForm(event)}
                  />
                </Col>
                <Col>
                  <Form.Label>Unit Kerja</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Nama Lengkap"
                    name="userUnitKerja"
                    value={userUnitKerja}
                    onChange={(event) => this.changeTextForm(event)}
                  />
                </Col>
              </Form.Group>
              <Form.Group as={Row}>
                <Col>
                  <Form.Label>No HP</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="No HP"
                    name="userPhoneNumber"
                    value={userPhoneNumber}
                    onChange={(event) => this.changeTextForm(event)}
                  />
                </Col>
                <Col>
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Email"
                    name="userEmailRegis"
                    value={userEmailRegis}
                    onChange={(event) => this.changeTextForm(event)}
                  />
                </Col>
              </Form.Group>
              <Form.Group as={Row}>
                <Col>
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Password"
                    name="userPasswordRegis"
                    value={userPasswordRegis}
                    onChange={(event) => this.changeTextForm(event)}
                  />
                </Col>
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={this.handleClose}>
              Close
            </Button>
            <Button variant="primary" onClick={() => this.postData()}>
              Save Changes
            </Button>
          </Modal.Footer>
        </Modal>
        {/* akhir modal register */}

        {/* modal notif */}
        <Modal size="sm" show={showNotif} onHide={this.handleCloseNotif} centered>
          <Modal.Header closeButton>
            <Modal.Title>Notif</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {modalMsg}
          </Modal.Body>
        </Modal>
        {/* akhir modal notif */}
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  auth: state.auth,
});
const mapDispatchToProps = { login, register };

export default connect(mapStateToProps, mapDispatchToProps)(Login);
