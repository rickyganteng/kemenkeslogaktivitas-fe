import React, { Component } from "react";
import NavBar from "../../../components/NavBar/NavBar";
import axiosApiIntances from "../../../utils/axios";
import ReactPaginate from "react-paginate";
import { Button, Container, Row, Col, Form, Dropdown, DropdownButton, Modal, Table } from "react-bootstrap";
import styles from "./DataLaporanAktivitas.module.css";
import { connect } from "react-redux";

import { getAllLaporanAktivitas, getByIdLaporanAktivitas, updateLaporanAktivitas, deleteLaporanAktivitas, getLaporanAktivitasByIdUser } from "../../../redux/action/laporanAktivitas"
import moment from "moment";
import * as XLSX from 'xlsx'
import Footer from "../../../components/Footer/Footer";

class Home extends Component {
  constructor(props) {

    super(props);
    this.state = {
      modalHandleEdit: false,
      showNotif: false,
      modalMsg: "",
      dropDownVal: "Sort By",
      page: 1,
      limit: 10,
      sortCol: "",
      sortBy: "",
      search: "",
      form: {
        isiAktivitas: ""
      }
    };
  }
  componentDidMount() {
    this.getData()
  }

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
      prevState.sortCol !== this.state.sortCol ||
      prevState.page !== this.state.page
    ) {
      this.props.history.push(
        `/laporanaktivitas?search=${this.state.search}&sortby=${this.state.sortBy}&page=${this.state.page}&sortcol=${this.state.sortCol}`
      );
    }
  }

  getData = () => {
    const { page, limit, sortBy, sortCol, search } = this.state
    this.props.getLaporanAktivitasByIdUser(this.props.datadiri.id);
    this.props.getAllLaporanAktivitas(page, limit, sortBy, sortCol, search);
  };

  handleEdit = (params) => {
    console.log(params);
    this.props.getByIdLaporanAktivitas(params);
    axiosApiIntances
      .get(`laporanaktivitas/${params}`)
      .then((res) => {
        console.log(res);
        this.setState({
          form: {
            isiAktivitas: res.data.data[0].logaktivitas_isi
          }
        });
      })
      .catch((err) => {
        return [];
      });
    this.setState({
      modalHandleEdit: true
    })
  }

  handleClose = () => {
    this.setState({
      modalHandleEdit: false
    })
  }

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

  changeText = (event) => {
    this.setState({ [event.target.name]: "%" + event.target.value + "%" });
  };

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
      .updateLaporanAktivitas(id, formData)
      .then((res) => {
        this.setState(
          {
            modalMsg: "Update Data Succes !",
            showNotif: true,
            modalHandleEdit: false,
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

  handleCloseNotif = () => {
    this.setState({
      showNotif: false
    })
  };

  deleteDataLaporanAktivitas = (id) => {
    this.props
      .deleteLaporanAktivitas(id)
      .then((res) => {
        this.setState(
          {
            modalMsg: "Booking Ruangan Deleted !",
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
          show: true,
        });
      })
      .finally(() => {
        setTimeout(() => {
          this.setState({ show: false });
        }, 1000);
      });
  };

  handleSelect = (event) => {
    console.log(event);
    this.setState({
      dropDownVal: event.split("-")[0],
      sortBy: event.split("-")[1],
      sortCol: event.split("-")[1].split(" ")[0],
      search: ""
    });
  };

  handleExport = () => {
    console.log(this.props.dataLaporanAktivitasAll);
    var wb = XLSX.utils.book_new(),
      ws = XLSX.utils.json_to_sheet(this.props.dataLaporanAktivitasAll);
    XLSX.utils.book_append_sheet(wb, ws, "MySheet1");
    XLSX.writeFile(wb, "MyExcel.xlsx")
  }
  // getDataMovieUpcoming = (id) => {
  //   axiosApiIntances
  //     .get(`laporanaktivitas/${id}`)
  //     .then((res) => {
  //       this.setState({
  //         dataMovUpcoming: res.data.data,
  //         tmpDataMovUpcoming: res.data.data,
  //       });
  //     })
  //     .catch((err) => {
  //       return [];
  //     });
  // };

  render() {

    const { modalHandleEdit, showNotif, modalMsg, dropDownVal } = this.state
    let { isiAktivitas } = this.state.form
    console.log(this.props.dataLaporanAktivitasById);
    console.log(this.state.sortBy);
    console.log(this.state.sortCol);
    const { pagination } = this.props.hehe.laporanAktivitas

    // // isiAktivitas = this.props.dataLaporanAktivitasById[0].logaktivitas_isi
    // console.log(isiAktivitas);

    console.log(this.props);
    console.log(this.props.datadiri);
    console.log(localStorage.getItem("user"));

    return (
      <>

        <NavBar isAdminPage={false} />
        <Container className="mt-5" fluid>
          <Row>
            <Col>
              <h1>Data Laporan</h1>

            </Col>
            <Col lg={3}>
              <DropdownButton
                className={`${styles.dropDown} mb-2 text-right`}
                variant="secondary"
                title={dropDownVal}
                id="dropdown-menu-align-right"
                onSelect={this.handleSelect}
              >
                <Dropdown.Item
                  className={styles.semi}
                  eventKey="Nama Lengkap-user_name ASC"
                >
                  Nama Lengkap
                </Dropdown.Item>
                <Dropdown.Item
                  className={styles.semi}
                  eventKey="NIP-user_nip ASC"
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
          {this.props.datadiri.user_role === "admin" ?
            <Row>
              <Col md={10}>
                <Button
                  onClick={() => this.handleExport()}>
                  Export Data</Button>
              </Col>
            </Row>
            : ""}
          <div className="mt-5">
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th className="text-center">No</th>
                  <th className="text-center">Nama Lengkap</th>
                  <th className="text-center">NIP</th>
                  <th className="text-center">Tanggal</th>
                  <th className="text-center">Aktivitas</th>
                  <th className="text-center">Action</th>
                </tr>
              </thead>
              {this.props.datadiri.user_role === "admin" ?
                this.props.dataLaporanAktivitasAll.map((item, index) => {
                  console.log(item.logaktivitas_id);
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
                          {moment(item.logaktivitas_created_at).format('DD-MMM-YYYY')}
                        </td>
                        <td>
                          {item.logaktivitas_isi}
                        </td>
                        <td>
                          <Row>
                            <Col>
                              <Button
                                variant="warning"
                                onClick={() => this.handleEdit(item.logaktivitas_id)}>
                                editt
                              </Button>
                            </Col>
                            <Col>
                              <Button
                                variant="danger"
                                onClick={() => this.deleteDataLaporanAktivitas(item.logaktivitas_id)}>
                                Hapus
                              </Button>
                            </Col>
                          </Row>
                        </td>
                      </tr>
                    </tbody>
                  )
                })
                : this.props.dataLaporanAktivitasByIdUser.map((item, index) => {
                  console.log(item.logaktivitas_id);
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
                          {moment(item.logaktivitas_created_at).format('DD-MMM-YYYY')}
                        </td>
                        <td>
                          {item.logaktivitas_isi}
                        </td>
                        <td>
                          <Row>
                            <Col>
                              <Button
                                variant="warning"
                                onClick={() => this.handleEdit(item.logaktivitas_id)}>
                                editt
                              </Button>
                            </Col>
                            <Col>
                              <Button
                                variant="danger"
                                onClick={() => this.deleteDataLaporanAktivitas(item.logaktivitas_id)}>
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
              marginPagesDisplayed={2}
              pageRangeDisplayed={2}
              onPageChange={this.handlePageClick2}
              containerClassName={styles.pagination}
              subContainerClassName={`${styles.pages} ${styles.pagination}`}
              activeClassName={styles.active}
            />
          </div>
        </Container>
        <Footer />
        {/* modal input aktivitas */}
        <Modal size="lg" show={modalHandleEdit} onHide={this.handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Edit Aktivitas</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {this.props.dataLaporanAktivitasById.map((item, index) => {
              console.log(item);
              return (
                <Form>
                  <Form.Group >
                    <Form.Label>Nama Lengkap</Form.Label>
                    <Form.Control
                      disabled
                      type="text"
                      placeholder={item.user_name}
                    // value={this.props.dataLaporanAktivitasById.user_name}
                    />

                    <Form.Label>NIP</Form.Label>
                    <Form.Control
                      disabled
                      type="text"
                      placeholder={item.user_nip}
                    />

                    <Form.Label>Tanggals</Form.Label>
                    <Form.Control
                      readOnly
                      type="text"
                      placeholder={moment(item.logaktivitas_created_at).format('DD-MMM-YYYY')}
                    />

                    <Form.Label>Aktivitas</Form.Label>
                    <Form.Control
                      // type="textarea"
                      as="textarea" rows={5}
                      placeholder="Aktivitas hari ini.."
                      name="isiAktivitas"
                      value={isiAktivitas}
                      onChange={(event) => this.changeTextForm(event)}
                    />
                  </Form.Group>
                </Form>
              )
            })}
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={this.handleClose}>
              Close
            </Button>
            <Button variant="primary" onClick={() => this.updateData(this.props.dataLaporanAktivitasById[0].logaktivitas_id)}>
              Save Changes
            </Button>
          </Modal.Footer>
        </Modal>
        {/* akhir modal update aktivitas*/}

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
const mapDispatchToProps = { getAllLaporanAktivitas, getByIdLaporanAktivitas, updateLaporanAktivitas, deleteLaporanAktivitas, getLaporanAktivitasByIdUser };

const mapStateToProps = (state) => ({
  hehe: state,
  datadiri: state.auth.data,
  dataLaporanAktivitasById: state.laporanAktivitas.dataLaporanById,
  dataLaporanAktivitasAll: state.laporanAktivitas.dataLaporanAll,
  dataLaporanAktivitasByIdUser: state.laporanAktivitas.dataLaporanByIdUser
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);
