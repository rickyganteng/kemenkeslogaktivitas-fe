import React, { Component } from "react";
import NavBar from "../../../components/NavBar/NavBar";
import { Button, Container, Form, Modal } from "react-bootstrap";
import { connect } from "react-redux";
import Footer from "../../../components/Footer/Footer";

import moment from "moment";
import { postLaporanAktivitas } from "../../../redux/action/laporanAktivitas"

class Home extends Component {
  constructor(props) {

    super(props);

    this.state = {
      form: {
        NIP: this.props.dataUserById.user_nip,
        namaLengkap: this.props.dataUserById.id,
        isiAktivitas: "",
        movieImage: null,
        image: null,
      },
      show: false,
      showNotif: false,
      modalMsg: ""
    };
  }
  componentDidMount() {
    this.getData()
  }
  getData = () => {
    // this.props.getAllLaporanAktivitas();
    console.log('hehe');
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

  setHandleshow = (event) => {
    this.setState({
      show: true
    });
  };

  handleClose = (event) => {
    this.setState({
      show: false
    });
    this.resetForm();
  };

  handleCloseNotif = (event) => {
    this.setState({
      showNotif: false
    });
    // this.resetForm();
  };

  resetForm = () => {
    this.setState({
      form: {
        isiAktivitas: ""
      }
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

  postData = () => {
    const { form } = this.state;
    delete form.movieImage;
    if (!form.image) {
      delete form.image;
    }
    const formData = new FormData();
    for (const key in form) {
      formData.append(key, form[key]);
    }
    console.log(formData);
    this.props
      .postLaporanAktivitas(formData)
      .then((res) => {
        this.setState(
          {
            modalMsg: "Submit Data Succes !",
            showNotif: true,
          },
          () => {
            this.getData();
          }
        );
        // this.resetForm();
        setTimeout(() => {
          this.setState({ show: false });
        }, 10000);
      })
      .catch((err) => {
        this.setState({
          modalMsg: "Anda Sudah Input Aktivitas Hari Ini",
          showNotif: true,
        });
      })
    // .finally(() => {

    // });
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

  render() {

    console.log(this.state);
    console.log(this.props);

    const { show, showNotif, modalMsg }
      = this.state
    const { isiAktivitas, image }
      = this.state.form
    console.log('image coba', image);
    return (
      <>

        <NavBar isAdminPage={false} />
        <Container className="mt-5">
          <h2 className="text-center mb-5">Silahkan melakukan Input Aktivitas kegiatan kerja harian anda</h2>
          {this.props.dataUserById.user_role === "basic" ?
            <div className="text-center mb-5"> <Button onClick={() => this.setHandleshow()} >Input data Aktivitas</Button></div>
            : ""}
        </Container>

        <div className="mt-5"><Footer /></div>

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
        <Modal size="lg" show={show} onHide={this.handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Input Aktivitas</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group >
                <Form.Label>Nama Lengkap</Form.Label>
                <Form.Control
                  disabled
                  type="text"
                  placeholder={this.props.dataUserById.user_name}
                />

                <Form.Label className={"mt-3"}>NIP</Form.Label>
                <Form.Control
                  disabled
                  type="text"
                  placeholder={this.props.dataUserById.user_nip}
                />

                <Form.Label className={"mt-3"}>Tanggal</Form.Label>
                <Form.Control
                  readOnly
                  type="text"
                  placeholder={moment().format('DD-MMM-YYYY')}
                />

                <Form.Label className={"mt-3"}>Aktivitas</Form.Label>
                <Form.Control
                  // type="textarea"
                  as="textarea" rows={5}
                  placeholder="Aktivitas hari ini.."
                  name="isiAktivitas"
                  value={isiAktivitas}
                  onChange={(event) => this.changeTextForm(event)}
                />

                <Form.File
                  className={"mt-3"}
                  label="Upload Bukti Aktivtias"
                  onChange={(event) => this.handleImage(event)}
                />
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
        {/* akhir modal */}

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
const mapDispatchToProps = { postLaporanAktivitas };

const mapStateToProps = (state) => ({
  hehe: state,
  dataUserById: state.auth.data
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);
