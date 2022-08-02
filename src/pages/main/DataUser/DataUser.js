import React, { Component } from "react";
import NavBar from "../../../components/NavBar/NavBar";
import axiosApiIntances from "../../../utils/axios";
import { Button, Container, Row, Col, Form, Modal, Table } from "react-bootstrap";
import { connect } from "react-redux";
import Footer from "../../../components/Footer/Footer";


import { getUserAllTanpaFill, getByIdUser, updateDataUserLaporan, deleteUser } from "../../../redux/action/user"
class Home extends Component {
  constructor(props) {

    super(props);
    console.log(props);
    this.state = {
      showEditUser: false,
      showNotif: false,
      modalMsg: "",
      form: {
        userNama: "",
        userNIP: "",
        userPangkat: "",
        userUnitKerja: "",
        usernoHP: "",
        userEmail: "",
        userPasswordRegis: "",
        idUser: ""
      }

    };
  }
  componentDidMount() {
    this.getData()
  }
  getData = () => {
    this.props.getUserAllTanpaFill();
  };

  componentDidUpdate(prevProps, prevState) {
    if (
      prevState.search !== this.state.search ||
      prevState.sortBy !== this.state.sortBy
    ) {
      this.setState({ page: 1 }, () => {

      });
    }

    if (
      prevState.search !== this.state.search ||
      prevState.sortBy !== this.state.sortBy ||
      prevState.page !== this.state.page
    ) {
      this.props.history.push(
        `/bookingruangrapat?search=${this.state.search}&sortby=${this.state.sortBy}&page=${this.state.page}`
      );
    }
  }

  handleClose = () => {
    this.setState({
      showEditUser: false
    })
  }

  handleEdit = (params) => {
    console.log(params);
    // this.props.getByIdUser(params);
    axiosApiIntances
      .get(`user/${params}`)
      .then((res) => {
        console.log(res);
        this.setState({
          form: {
            userNama: res.data.data[0].user_name,
            userNIP: res.data.data[0].user_nip,
            userPangkat: res.data.data[0].user_pangkat,
            userUnitKerja: res.data.data[0].user_unit_kerja,
            usernoHP: res.data.data[0].user_phone_number,
            userEmail: res.data.data[0].user_email,
            idUser: res.data.data[0].id
          }
        });
      })
      .catch((err) => {
        return [];
      });
    this.setState({
      showEditUser: true
    })
  }

  updateData = (id) => {
    console.log(id);
    const { form } = this.state;
    delete form.movieImage;
    if (!form.image) {
      delete form.image;
    }
    const formData = new FormData();
    for (const key in form) {
      formData.append(key, form[key]);
    }
    // for (var pair of formData.entries()) {
    // }
    this.props
      .updateDataUserLaporan(id, formData)
      .then((res) => {
        this.setState(
          {
            modalMsg: "Update Data Succes !",
            showNotif: true,
            showEditUser: false,
          },
          () => {
            this.getData();
          }
        );
        // this.resetForm();
      })
      .catch((err) => {
        console.log(err);
        this.setState({
          modalMsg: "Update Data Failed !",
          show: true,
        });
      })
      .finally(() => {
        setTimeout(() => {
          this.setState({ showNotif: false });
        }, 1000);
      });
  };

  changeTextForm = (event) => {
    console.log(event.target.value);
    console.log(event.target.name);
    this.setState({
      form: {
        ...this.state.form,
        [event.target.name]: event.target.value,
      },
    });
  };

  deletedUser = (id) => {
    this.props
      .deleteUser(id)
      .then((res) => {
        this.setState(
          {
            modalMsg: "Data Deleted !",
            showNotif: true,
          },
          () => {
            this.getData();
          }
        );
      })
      .catch((err) => {
        this.setState({
          modalMsg: "Deleted Failed !",
          showNotif: true,
        });
      })
      .finally(() => {
        setTimeout(() => {
          this.setState({ showNotif: false });
        }, 1000);
      });
  };

  handleCloseNotif = () => {
    this.setState({
      showNotif: false
    })
  };
  // handleEdit = () => {
  //   console.log('params');
  //   this.setState({
  //     showEditUser: true
  //   })


  // this.props.getByIdLaporanAktivitas(params);
  // axiosApiIntances
  //   .get(`laporanaktivitas/${params}`)
  //   .then((res) => {
  //     console.log(res);
  //     this.setState({
  //       form: {
  //         isiAktivitas: res.data.data[0].logaktivitas_isi
  //       }
  //     });
  //   })
  //   .catch((err) => {
  //     return [];
  //   });
  // this.setState({
  //   modalHandleEdit: true
  // })
  // }


  render() {

    // console.log(this.props.DataUserAll);
    const { showEditUser, showNotif, modalMsg } = this.state
    const {
      userNama,
      userNIP,
      userPangkat,
      userUnitKerja,
      usernoHP,
      userEmail,
      userPasswordRegis,
      idUser
    } = this.state.form
    return (
      <>

        <NavBar isAdminPage={false} />
        <Container className="mt-5" fluid>
          <h1>Data User</h1>
          <div className="mt-5">
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th className="text-center">No</th>
                  <th className="text-center">Nama Lengkap</th>
                  <th className="text-center">NIP</th>
                  <th className="text-center">Pangkat / Golongan</th>
                  <th className="text-center">No HP</th>
                  <th className="text-center">Email</th>
                  <th className="text-center">Action</th>
                </tr>
              </thead>
              {this.props.DataUserAll.map((item, index) => {
                return (
                  <tbody>
                    <tr key={index}>
                      <td>
                        {index + 1}
                      </td>
                      <td>
                        {item.user_name}
                      </td>
                      <td>
                        {item.user_nip}
                      </td>
                      <td>
                        {item.user_pangkat}
                      </td>
                      <td>
                        {item.user_phone_number}
                      </td>
                      <td>
                        {item.user_email}
                      </td>
                      <td>
                        <Row>
                          <Col>
                            <Button
                              variant="warning"
                              onClick={() => this.handleEdit(item.id)}>
                              edit
                            </Button>
                          </Col>
                          <Col>
                            <Button
                              variant="danger"
                              onClick={() => this.deletedUser(item.id)}>
                              Hapus
                            </Button>
                          </Col>
                        </Row>
                      </td>
                    </tr>
                  </tbody>
                )
              })}

            </Table>
          </div>
        </Container>
        <Footer />


        {/* <Container >
          <div className="d-flex justify-content-center">
            <ReactPaginate
              previousLabel={"prev"}
              nextLabel={"next"}
              breakLabel={"..."}
              breakClassName={"break-me"}
              pageCount={paginationn.totalPage ? paginationn.totalPage : 0}
              marginPagesDisplayed={2}
              pageRangeDisplayed={2}
              onPageChange={this.handlePageClick2}
              containerClassName={styles.pagination}
              subContainerClassName={`${styles.pages} ${styles.pagination}`}
              activeClassName={styles.active}
            />
          </div>
        </Container> */}
        {/* modal register */}
        <Modal size="lg" show={showEditUser} onHide={this.handleClose}>
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
                    name="userNama"
                    value={userNama}
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
                    name="usernoHP"
                    value={usernoHP}
                    onChange={(event) => this.changeTextForm(event)}
                  />
                </Col>
                <Col>
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Email"
                    name="userEmail"
                    value={userEmail}
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
            <Button variant="primary" onClick={() => this.updateData(idUser)}>
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
const mapDispatchToProps = { getUserAllTanpaFill, getByIdUser, updateDataUserLaporan, deleteUser };

const mapStateToProps = (state) => ({
  DataUserAll: state.user.dataUser
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);
