import React, { Component } from "react";
import NavBar from "../../../components/NavBar/NavBar";
import axiosApiIntances from "../../../utils/axios";
import ReactPaginate from "react-paginate";
import { Button, Container, Row, Col, Form, Modal, Table, Dropdown, DropdownButton } from "react-bootstrap";
import { connect } from "react-redux";
import Footer from "../../../components/Footer/Footer";
import styles from "./DataUser.module.css"


import { getUserAllTanpaFill, getByIdUser, updateDataUserLaporan, deleteUser } from "../../../redux/action/user"
class Home extends Component {
  constructor(props) {

    super(props);
    console.log(props);
    this.state = {
      showEditUser: false,
      showNotif: false,
      showVerifDelete: false,
      modalMsg: "",
      dropDownVal: "Sort By",
      page: 1,
      limit: 10,
      sortCol: "",
      sortBy: "user_name ASC",
      search: "",
      idDelete: "",
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
    const { page, limit, sortBy, sortCol, search } = this.state
    this.props.getUserAllTanpaFill(page, limit, sortBy, sortCol, search);
  };

  componentDidUpdate(prevProps, prevState) {
    if (
      prevState.search !== this.state.search ||
      prevState.sortBy !== this.state.sortBy ||
      prevState.sortCol !== this.state.sortCol
    ) {
      this.setState({ page: 1 }, () => {
        this.getData()
      });
    }

    if (
      prevState.search !== this.state.search ||
      prevState.sortBy !== this.state.sortBy ||
      prevState.page !== this.state.page ||
      prevState.sortCol !== this.state.sortCol

    ) {
      this.props.history.push(
        `/datauser?search=${this.state.search}&sortby=${this.state.sortBy}&page=${this.state.page}&sortcol=${this.state.sortCol}`
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
          this.setState({
            showNotif: false,
            showVerifDelete: false,
          });
        }, 1000);
      });
  };

  handleCloseNotif = () => {
    this.setState({
      showNotif: false
    })
  };

  handleOpenVierifDelete = (id) => {
    console.log('id delete', id);
    this.setState({
      showVerifDelete: true,
      idDelete: id
    })
  };
  handleCloseVierifDelete = () => {
    this.setState({
      showVerifDelete: false,
      idDelete: ""
    })
  };

  handleSelect = (event) => {
    console.log(event.split("-")[1]);
    console.log(event.split("-")[2]);
    this.setState({
      dropDownVal: event.split("-")[0],
      sortBy: event.split("-")[2],
      sortCol: event.split("-")[1],
      search: "",
    });
    this.setState({ page: 1 }, () => {
      this.getData();
    });
  };

  changeText = (event) => {
    console.log('target naem', event.target.name);
    console.log('target naem', event.target.value);
    if (event.target.name === 'search') {
      this.setState({ [event.target.name]: "%" + event.target.value + "%" });
    } else {
      this.setState({ [event.target.name]: event.target.value });
    }
  };

  handlePageClick = (event) => {
    console.log(event.selected);
    const selectedPage = event.selected + 1;
    this.setState({ page: selectedPage }, () => {
      this.getData();
    });
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

    console.log(this.props.pagination.pagination);
    const { pagination } = this.props.pagination
    const { showEditUser, showNotif, modalMsg, dropDownVal, showVerifDelete, idDelete } = this.state
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
    console.log('id dele', idDelete);
    return (
      <>

        <NavBar isAdminPage={false} />
        <Container className="mt-5" fluid>
          <Row>
            <Col>
              <h1>Data User</h1>
            </Col>
            <Col lg={2}>
              <DropdownButton
                className={`${styles.dropDown} mb-2 text-right`}
                variant="secondary"
                title={dropDownVal}
                id="dropdown-menu-align-right"
                onSelect={this.handleSelect}
              >
                <Dropdown.Item
                  className={styles.semi}
                  eventKey="Nama Lengkap-user_name-user_name ASC"
                >
                  Nama Lengkap
                </Dropdown.Item>
                <Dropdown.Item
                  className={styles.semi}
                  eventKey="NIP-user_nip-user_name ASC"
                >
                  NIP
                </Dropdown.Item>
              </DropdownButton>
            </Col>

            <Col lg={3}>
              <Form className={styles.searchInput}>
                <Form.Group>
                  <Form.Control
                    type="text"
                    placeholder="Search ..."
                    name="search"
                    onChange={(event) => this.changeText(event)}
                  />
                </Form.Group>
              </Form>
            </Col>
          </Row>
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
                              // onClick={() => this.deletedUser(item.id)}
                              onClick={() => this.handleOpenVierifDelete(item.id)}
                            >
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


        <Container >
          <div className="d-flex justify-content-center">
            <ReactPaginate
              previousLabel={"prev"}
              nextLabel={"next"}
              breakLabel={"..."}
              breakClassName={"break-me"}
              pageCount={pagination.totalPage ? pagination.totalPage : 0}
              marginPagesDisplayed={5}
              pageRangeDisplayed={5}
              onPageChange={this.handlePageClick}
              containerClassName={styles.pagination}
              subContainerClassName={`${styles.pages} ${styles.pagination}`}
              activeClassName={styles.active}
            />
          </div>
        </Container>
        <Footer />

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

        {/* modal Verif delete */}
        <Modal size="sm" show={showVerifDelete} onHide={this.handleCloseVierifDelete} centered>
          <Modal.Header closeButton>
            <Modal.Title>Yakin dihapus ?</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Row>
              <Col>
                <Button
                  onClick={() => this.deletedUser(idDelete)}
                >Yakin</Button>
              </Col>
              <Col>
                <Button
                  onClick={() => this.handleCloseVierifDelete()}
                >Tidak</Button>
              </Col>
            </Row>
          </Modal.Body>
        </Modal>
        {/* akhir modal Verif delete */}
      </>
    );
  }
}
const mapDispatchToProps = { getUserAllTanpaFill, getByIdUser, updateDataUserLaporan, deleteUser };

const mapStateToProps = (state) => ({
  pagination: state.user,
  DataUserAll: state.user.dataUser
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);
