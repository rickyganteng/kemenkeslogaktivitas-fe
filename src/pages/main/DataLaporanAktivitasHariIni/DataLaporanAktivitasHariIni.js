import React, { Component } from "react";
import NavBar from "../../../components/NavBar/NavBar";
import axiosApiIntances from "../../../utils/axios";
import { Button, Container, Form, Modal, Table } from "react-bootstrap";
import styles from "./DataLaporanAktivitasHariIni.module.css";
import { connect } from "react-redux";
import Footer from "../../../components/Footer/Footer";

import { getAllLaporanAktivitas, getByIdLaporanAktivitas, updateLaporanAktivitas, deleteLaporanAktivitas, getAllLaporanToday } from "../../../redux/action/laporanAktivitas"
import moment from "moment";
class Home extends Component {
  constructor(props) {

    super(props);
    this.state = {
      modalHandleEdit: false,
      showNotif: false,
      modalMsg: "",
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
      prevState.sortBy !== this.state.sortBy
    ) {
      this.setState({ page: 1 }, () => {
        this.getData1()
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

  getData = () => {
    this.props.getAllLaporanAktivitas();
    this.props.getAllLaporanToday();
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

    const { modalHandleEdit, showNotif, modalMsg } = this.state
    let { isiAktivitas } = this.state.form
    console.log(this.props.dataLaporanAktivitasById);
    // // isiAktivitas = this.props.dataLaporanAktivitasById[0].logaktivitas_isi
    // console.log(isiAktivitas);

    console.log(this.props.dataLaporanToday);

    return (
      <>

        <NavBar isAdminPage={false} />
        <Container className="mt-5" fluid>
          <h1>Data Laporan Hari Ini ({moment().format("DD-MMM-YYYY")})</h1>
          {/* <Button>Input data Aktivitas</Button> */}
          < div className="mt-5" >
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th className="text-center">No</th>
                  <th className="text-center">Nama Lengkap</th>
                  <th className="text-center">NIP</th>
                  <th className="text-center">Pangkat / Golongan</th>
                  <th className="text-center">Aktivitas</th>
                </tr>
              </thead>
              {this.props.dataLaporanToday.map((item, index) => {
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
                        {item.user_pangkat}
                      </td>
                      <td>
                        {item.logaktivitas_isi === null ? <p className={`${styles.backgroundtext} text-center`}>Belum mengisi Data Hari Ini</p> : item.logaktivitas_isi}
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
  dataLaporanAktivitasById: state.laporanAktivitas.dataLaporanById,
  dataLaporanAktivitasAll: state.laporanAktivitas.dataLaporanAll,
  dataLaporanToday: state.laporanAktivitas.dataLaporanToday
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);
