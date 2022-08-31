import React, { Component } from "react";
import styles from "./Login.module.css";
import { Row, Col, Button, Container, Form, Image, Card, Modal, InputGroup } from "react-bootstrap";
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
      showPassword: false,
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

  handleShowPass = () => {
    this.setState({
      showPassword: !this.state.showPassword
    })
  }

  render() {
    const {
      userEmail,
      userPassword,
      emailValid,
      passwordValid,
      msg,
      showregister,
      showNotif,
      modalMsg,
      showPassword
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

    const iconSHowPass = <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-eye-fill" viewBox="0 0 16 16">
      <path d="M10.5 8a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0z" />
      <path d="M0 8s3-5.5 8-5.5S16 8 16 8s-3 5.5-8 5.5S0 8 0 8zm8 3.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7z" />
    </svg>

    const iconHidePass = <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-eye-slash-fill" viewBox="0 0 16 16">
      <path d="m10.79 12.912-1.614-1.615a3.5 3.5 0 0 1-4.474-4.474l-2.06-2.06C.938 6.278 0 8 0 8s3 5.5 8 5.5a7.029 7.029 0 0 0 2.79-.588zM5.21 3.088A7.028 7.028 0 0 1 8 2.5c5 0 8 5.5 8 5.5s-.939 1.721-2.641 3.238l-2.062-2.062a3.5 3.5 0 0 0-4.474-4.474L5.21 3.089z" />
      <path d="M5.525 7.646a2.5 2.5 0 0 0 2.829 2.829l-2.83-2.829zm4.95.708-2.829-2.83a2.5 2.5 0 0 1 2.829 2.829zm3.171 6-12-12 .708-.708 12 12-.708.708z" />
    </svg>
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
                      <Form.Label>User Email</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Enter user email"
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
                      <InputGroup>
                        <Form.Control
                          type={showPassword ? "text" : "password"}
                          placeholder="Password"
                          name="userPassword"
                          value={userPassword}
                          onChange={(event) => this.changeText(event)}
                        />
                        <Form.Control.Feedback type={passwordValid}>
                          <p className={styles.warning}>{msg}</p>
                        </Form.Control.Feedback>
                        <InputGroup.Text onClick={this.handleShowPass}>{showPassword ? iconSHowPass : iconHidePass}</InputGroup.Text>
                      </InputGroup>
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
              <Form.Group >
                <Form.Label>Password</Form.Label>
                <InputGroup>
                  <Form.Control
                    type={showPassword ? "text" : "password"}
                    placeholder="Password"
                    name="userPasswordRegis"
                    value={userPasswordRegis}
                    onChange={(event) => this.changeTextForm(event)}
                  />

                  <InputGroup.Text onClick={this.handleShowPass}>{showPassword ? iconSHowPass : iconHidePass}</InputGroup.Text>
                </InputGroup>
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={this.handleClose}>
              Close
            </Button>
            <Button variant="primary" onClick={() => this.postData()}>
              Save
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
