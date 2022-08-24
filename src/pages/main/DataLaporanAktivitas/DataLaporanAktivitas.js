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
      showVerifDelete: false,
      idDelete: "",
      modalMsg: "",
      dropDownVal: "Sort By",
      page: 1,
      limit: 10,
      sortCol: "",
      sortBy: "logaktivitas_created_at DESC",
      search: "",
      FromDate: "",
      ToDate: "",
      valueCheckBox: false,

      form: {
        isiAktivitas: "",
        movieImage: null,
        image: null,
      }
    };
  }
  componentDidMount() {
    this.getData()
  }

  componentDidUpdate(prevProps, prevState) {
    if (
      prevState.search !== this.state.search ||
      prevState.FromDate !== this.state.FromDate ||
      prevState.ToDate !== this.state.ToDate ||
      prevState.sortBy !== this.state.sortBy ||
      prevState.sortCol !== this.state.sortCol
    ) {
      this.setState({ page: 1 }, () => {
        this.getData()
      });
    }

    if (
      prevState.search !== this.state.search ||
      prevState.FromDate !== this.state.FromDate ||
      prevState.ToDate !== this.state.ToDate ||
      prevState.sortBy !== this.state.sortBy ||
      prevState.sortCol !== this.state.sortCol ||
      prevState.page !== this.state.page
    ) {
      this.state.dropDownVal !== "Sort By" ?
        this.props.history.push(
          `/laporanaktivitas?fromdate=${this.state.FromDate}&todate=${this.state.ToDate}&search=${this.state.search}&sortby=${this.state.sortBy}&page=${this.state.page}&sortcol=${this.state.sortCol}`
        )
        :
        this.props.history.push(
          `/laporanaktivitas?fromdate=${this.state.FromDate}&todate=${this.state.ToDate}`
        )
    }
  }

  getData = () => {
    const { page, limit, sortBy, sortCol, search, FromDate, ToDate } = this.state
    console.log('id datadiri', this.props.datadiri.id);
    this.props.getLaporanAktivitasByIdUser(page, limit, this.props.datadiri.id);
    this.props.getAllLaporanAktivitas(page, limit, sortBy, sortCol, search, FromDate, ToDate);
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
    event.persist();
    console.log('target naem', event.target.name);
    console.log('target value', event.target.value);
    // this.setState({
    //   search: event.target.value
    // })
    if (event.target.name === 'search') {
      this.setState({ [event.target.name]: "%" + event.target.value + "%" });
    } else {
      this.setState({ [event.target.name]: event.target.value });
    }
  };

  handleCheckBox = (event) => {
    event.persist();
    this.setState({
      valueCheckBox: !this.state.valueCheckBox
    })
    if (this.state.valueCheckBox === false) {
      this.setState({
        search: "--"
      })
    } else if (this.state.valueCheckBox === true) {
      this.setState({
        search: ""
      })
    }
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
            modalMsg: "Data Laporan Aktivitas Deleted !",
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
          this.setState({
            show: false,
            showNotif: false,
            showVerifDelete: false
          });
        }, 1000);
      });
  };

  handleSelect = (event) => {
    console.log('event nih', event);
    console.log(event.split("-")[1]);
    console.log(event.split("-")[2]);
    this.setState({
      dropDownVal: event.split("-")[0],
      sortBy: event.split("-")[2],
      sortCol: event.split("-")[1],
      search: ""
    });
  };

  handleExport = () => {
    console.log(this.props.dataLaporanAktivitasAll);
    var wb = XLSX.utils.book_new(),
      ws = XLSX.utils.json_to_sheet(this.props.hehe.laporanAktivitas.pagination.totalDataNoLimit);
    XLSX.utils.book_append_sheet(wb, ws, "MySheet1");
    XLSX.writeFile(wb, "Laporan Aktivitas.xlsx")
  }

  handlePageClick2 = (event) => {
    console.log(event.selected);
    const selectedPage = event.selected + 1;
    this.setState({ page: selectedPage }, () => {
      this.getData();
    });
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

  handleImage = (event) => {
    console.log(event.target.files);
    if (event.target.files[0]) {
      this.setState({
        form: {
          ...this.state.form,
          movieImage: URL.createObjectURL(event.target.files[0]),
          image: event.target.files[0],
        },
      });
    } else {
      this.setState({
        form: {
          ...this.state.form,
          movieImage: null,
          image: null,
        },
      });
    }
  };
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

    const { modalHandleEdit, showNotif, modalMsg, dropDownVal, showVerifDelete, idDelete, valueCheckBox } = this.state
    let { isiAktivitas } = this.state.form
    const { pagination } = this.props.hehe.laporanAktivitas
    const { paginationByUserId } = this.props.hehe.laporanAktivitas
    console.log(paginationByUserId);
    console.log(pagination);
    console.log(dropDownVal);
    console.log('value yahhh', valueCheckBox);
    console.log('value yahhh', this.props.hehe.laporanAktivitas.pagination.totalDataNoLimit);
    console.log('value yahhh', this.props.hehe.dataLaporanAktivitasById);

    // // isiAktivitas = this.props.dataLaporanAktivitasById[0].logaktivitas_isi
    // console.log(isiAktivitas);


    return (
      <>

        <NavBar isAdminPage={false} />
        <Container className="mt-5" fluid>
          {this.props.datadiri.user_role === "admin" ?
            <div>
              <Row>
                <Col>
                  <h1>Data Laporan</h1>

                </Col>
                <Col>
                  <Row>
                    <Col >
                      <Form className={styles.searchInput}>
                        <Form.Group>
                          <Form.Control
                            type="date"
                            placeholder="Search ..."
                            name="FromDate"
                            onChange={(event) => this.changeText(event)}
                          />
                        </Form.Group>
                      </Form>
                    </Col>
                    <Col className={styles.searchInput}>
                      <Form >
                        <Form.Group>
                          <Form.Control
                            type="date"
                            placeholder="Search ..."
                            name="ToDate"
                            onChange={(event) => this.changeText(event)}
                          />
                        </Form.Group>
                      </Form>
                    </Col>
                  </Row>
                </Col>
                <Col lg={2}>
                  <DropdownButton
                    className={`${styles.dropDown} mb-2 text-center`}
                    variant="secondary"
                    title={dropDownVal}
                    id="dropdown-item-button"
                    onSelect={this.handleSelect}
                  >
                    <Dropdown.Item
                      className={styles.semi}
                      eventKey="Nama Lengkap-u.user_name-logaktivitas_created_at DESC"
                    >
                      Nama Lengkap
                    </Dropdown.Item>
                    <Dropdown.Item
                      className={styles.semi}
                      eventKey="NIP-u.user_nip-logaktivitas_created_at DESC"
                    >
                      NIP
                    </Dropdown.Item>
                    <Dropdown.Item
                      className={styles.semi}
                      eventKey="aktivitas-l.logaktivitas_isi-logaktivitas_created_at DESC"
                    >
                      Aktivitas
                    </Dropdown.Item>
                  </DropdownButton>
                </Col>

                {dropDownVal !== "aktivitas" ?
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
                  :
                  <div className="mb-3">
                    <Form.Check
                      inline
                      type="checkbox"
                      label="Belum Input"
                      name="search"
                      id={`default-checkbox-2`}
                      onChange={(event) => this.handleCheckBox(event)}
                      value="--"
                    />
                  </div>
                }
              </Row>
            </div>
            : <Col>
              <h1>Data Laporan</h1>

            </Col>}
          {this.props.datadiri.user_role === "admin" ?
            <Row>
              <Col md={10}>
                <Button
                  onClick={() => this.handleExport()}>
                  Export Data</Button>
              </Col>
            </Row>
            : ""}
          {/* <Image src={`http://192.168.50.23/backend1/api/2022-08-08T09-31-56.797Zmarikitacoba.jpg`}></Image> */}
          {/* <Image src={ }></Image> */}

          <div className="mt-5">
            <Table striped bordered hover responsive>
              <thead>
                <tr>
                  <th className="text-center">No</th>
                  <th className="text-center">Nama Lengkap</th>
                  <th className="text-center">NIP</th>
                  <th className="text-center">Pangkat / Golongan</th>
                  <th className="text-center">No HP</th>
                  <th className="text-center">Aktivitas</th>
                  <th className="text-center">Tanggal</th>
                  <th className="text-center">BUkti Aktivitas</th>
                  <th className="text-center">Action</th>
                </tr>
              </thead>
              {this.props.datadiri.user_role === "admin" ?
                this.props.dataLaporanAktivitasAll.map((item, index) => {
                  console.log(item);
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
                          {item.logaktivitas_isi === "--" ? <p className={`${styles.backgroundtext} text-center`}>belum input</p> : item.logaktivitas_isi}
                        </td>
                        <td>
                          {moment(item.logaktivitas_created_at).format('ddd, DD-MMM-YYYY')}
                        </td>
                        <td>
                          {item.logaktivitas_image === "" ? <p className={`${styles.backgroundtext} text-center`}> belum input </p> : <p> <a href={`http://103.74.143.139:3005/backend1/api/${item.logaktivitas_image}`} target="_blank" rel="noreferrer">Open File</a></p>}
                          {/* <object width="100%" height="400" data={`http://192.168.50.23/backend1/api/${item.logaktivitas_image}`} > hehe</object> */}
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
                                // onClick={() => this.deleteDataLaporanAktivitas(item.logaktivitas_id)}
                                onClick={() => this.handleOpenVierifDelete(item.logaktivitas_id)}
                              >
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
                  console.log(item.logaktivitas_image);
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
                          {item.logaktivitas_isi === "--" ? <p className={`${styles.backgroundtext} text-center`}>belum input</p> : item.logaktivitas_isi}
                        </td>
                        <td>
                          {moment(item.logaktivitas_created_at).format('DD-MMM-YYYY')}
                        </td>
                        <td>
                          {/* <object width="100%" height="400" data={`http://192.168.50.23/backend1/api/${item.logaktivitas_image}`} > hehe</object> */}
                          {item.logaktivitas_image === "" ? <p className={`${styles.backgroundtext} text-center`}> belum input </p> : <p> <a href={`http://103.74.143.139:3005/backend1/api/${item.logaktivitas_image}`} target="_blank" rel="noreferrer">Open File</a></p>}
                          {/* <object width="100%" height="400" data={`http://localhost:3001/backend1/api/${item.logaktivitas_image}`} > </object> */}
                        </td>
                        <td>
                          <Row>
                            <Col>
                              <Button
                                variant="warning"
                                onClick={() => this.handleEdit(item.logaktivitas_id)}>
                                edit
                              </Button>
                            </Col>
                          </Row>
                          <Row>
                            <Col>
                              <Button
                                variant="danger"
                                onClick={() => this.handleOpenVierifDelete(item.logaktivitas_id)}
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

        {this.props.datadiri.user_role === "admin" ?
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
          </Container> :
          <Container >
            <div className="d-flex justify-content-center">
              <ReactPaginate
                previousLabel={"prev"}
                nextLabel={"next"}
                breakLabel={"..."}
                breakClassName={"break-me"}
                pageCount={paginationByUserId.totalPage ? paginationByUserId.totalPage : 0}
                marginPagesDisplayed={2}
                pageRangeDisplayed={2}
                onPageChange={this.handlePageClick2}
                containerClassName={styles.pagination}
                subContainerClassName={`${styles.pages} ${styles.pagination}`}
                activeClassName={styles.active}
              />
            </div>
          </Container>}
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

                    <Form.Label>Tanggal</Form.Label>
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
                  <Form.File
                    className={"mt-3"}
                    label="Upload Bukti Aktivtias"
                    onChange={(event) => this.handleImage(event)}
                  />
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

        {/* modal Verif delete */}
        <Modal size="sm" show={showVerifDelete} onHide={this.handleCloseVierifDelete} centered>
          <Modal.Header closeButton>
            <Modal.Title>Yakin dihapus ?</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Row>
              <Col>
                <Button
                  onClick={() => this.deleteDataLaporanAktivitas(idDelete)}
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
const mapDispatchToProps = { getAllLaporanAktivitas, getByIdLaporanAktivitas, updateLaporanAktivitas, deleteLaporanAktivitas, getLaporanAktivitasByIdUser };

const mapStateToProps = (state) => ({
  hehe: state,
  datadiri: state.auth.data,
  dataLaporanAktivitasById: state.laporanAktivitas.dataLaporanById,
  dataLaporanAktivitasAll: state.laporanAktivitas.dataLaporanAll,
  dataLaporanAktivitasAlltest: state.laporanAktivitas,
  dataLaporanAktivitasByIdUser: state.laporanAktivitas.dataLaporanByIdUser
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);
