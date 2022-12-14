import React, { Component } from "react";
import NavBar from "../../../components/NavBar/NavBar";
import axiosApiIntances from "../../../utils/axios";
import { Button, Container, Form, Modal, Table, Row, Col, Dropdown, DropdownButton } from "react-bootstrap";
import styles from "./DataLaporanAktivitasHariIni.module.css";
import { connect } from "react-redux";
import Footer from "../../../components/Footer/Footer";
import ReactPaginate from "react-paginate";

import { getAllLaporanAktivitas, getByIdLaporanAktivitas, updateLaporanAktivitas, deleteLaporanAktivitas, getAllLaporanToday } from "../../../redux/action/laporanAktivitas"
import moment from "moment";
import * as XLSX from 'xlsx'
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
      prevState.sortCol !== this.state.sortCol ||
      prevState.sortBy !== this.state.sortBy
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
        `/laporanaktivitashariini?search=${this.state.search}&sortby=${this.state.sortBy}&page=${this.state.page}&sortcol=${this.state.sortCol}`
      );
    }
  }

  getData = () => {
    const { page, limit, sortBy, sortCol, search } = this.state
    // this.props.getAllLaporanAktivitas();
    this.props.getAllLaporanToday(page, limit, sortBy, sortCol, search,);
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

  handleExport = () => {
    var wb = XLSX.utils.book_new(),
      ws = XLSX.utils.json_to_sheet(this.props.hehe.laporanAktivitas.paginationLaporanToday.resultTodayNoLimit);
    XLSX.utils.book_append_sheet(wb, ws, "MySheet1");
    XLSX.writeFile(wb, `Laporan Aktivitas ${moment().format("DD-MMM-YYYY")}.xlsx`)
  }

  handleSelect = (event) => {
    console.log(event.split("-")[1]);
    console.log(event.split("-")[2]);
    this.setState({
      dropDownVal: event.split("-")[0],
      sortBy: event.split("-")[2],
      sortCol: event.split("-")[1],
      search: "",
      FromDate: "",
      ToDate: ""
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

  handlePageClick2 = (event) => {
    console.log(event.selected);
    const selectedPage = event.selected + 1;
    this.setState({ page: selectedPage }, () => {
      this.getData();
    });
  };
  // getDataMovieUpcoming = (id) => {
  //   axiosApiIntances
  //     .get(`laporanaktivitas / ${ id }`)
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

    const { modalHandleEdit, showNotif, modalMsg, dropDownVal, } = this.state
    let { isiAktivitas } = this.state.form
    console.log(this.props.dataLaporanAktivitasById);
    const { paginationLaporanToday } = this.props.hehe.laporanAktivitas
    // // isiAktivitas = this.props.dataLaporanAktivitasById[0].logaktivitas_isi
    console.log(paginationLaporanToday);

    // console.log(this.props.hehe.laporanAktivitas.paginationLaporanToday);

    return (
      <>

        <NavBar isAdminPage={false} />
        <Container className="mt-5" fluid>
          <Row>
            <Col>
              <h1>Data Laporan Hari Ini ({moment().format("DD-MMM-YYYY")})</h1>
            </Col>
            <Col lg={2}>
              <DropdownButton
                className={`${styles.dropDown} mb - 2 text - right`}
                variant="secondary"
                title={dropDownVal}
                id="dropdown-menu-align-right"
                onSelect={this.handleSelect}
              >
                <Dropdown.Item
                  className={styles.semi}
                  eventKey="Nama Lengkap-user_name-user_name DESC"
                >
                  Nama Lengkap
                </Dropdown.Item>
                <Dropdown.Item
                  className={styles.semi}
                  eventKey="NIP-user_nip-user_name DESC"
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
          {/* <Button>Input data Aktivitas</Button> */}
          {this.props.datadiri.user_role === "admin" ?
            <Row>
              <Col md={10}>
                <Button
                  onClick={() => this.handleExport()}>
                  Export Data</Button>
              </Col>
            </Row>
            : ""}
          < div className="mt-5" >
            <Table striped bordered hover responsive>
              <thead>
                <tr>
                  <th className="text-center">No</th>
                  <th className="text-center">Nama Lengkap</th>
                  <th className="text-center">NIP</th>
                  <th className="text-center">Pangkat / Golongan</th>
                  <th className="text-center">Aktivitas</th>
                  <th className="text-center">Bukti Aktivitas</th>
                </tr>
              </thead>
              {this.props.dataLaporanToday.map((item, index) => {
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
                        {item.logaktivitas_isi === "--" ? <p className={`${styles.backgroundtext} text-center`}>Belum mengisi Data Hari Ini</p> : <p className={'text-center'}>{item.logaktivitas_isi}</p>}
                      </td >
                      <td>
                        {item.logaktivitas_image === null ? <p className={`${styles.backgroundtext} text-center`}> belum input </p> : <p> <a href={`http://103.74.143.139:3005/backend1/api/${item.logaktivitas_image}`} target="_blank" rel="noreferrer">Open File</a></p>}
                      </td>
                    </tr >
                  </tbody >
                )
              })
              }
            </Table >
          </div >
        </Container >
        <Container >
          <div className="d-flex justify-content-center">
            <ReactPaginate
              previousLabel={"prev"}
              nextLabel={"next"}
              breakLabel={"..."}
              breakClassName={"break-me"}
              pageCount={paginationLaporanToday.totalPage ? paginationLaporanToday.totalPage : 0}
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
const mapDispatchToProps = { getAllLaporanAktivitas, getByIdLaporanAktivitas, updateLaporanAktivitas, deleteLaporanAktivitas, getAllLaporanToday };

const mapStateToProps = (state) => ({
  hehe: state,
  datadiri: state.auth.data,
  dataLaporanAktivitasById: state.laporanAktivitas.dataLaporanById,
  dataLaporanAktivitasAll: state.laporanAktivitas.dataLaporanAll,
  dataLaporanToday: state.laporanAktivitas.dataLaporanToday
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);
