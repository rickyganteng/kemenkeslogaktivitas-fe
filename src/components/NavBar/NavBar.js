import React, { Component } from "react";
import { Link } from "react-router-dom";
import { withRouter } from "react-router-dom";
import { Nav, Navbar, Button, Image } from "react-bootstrap";
import logo from "../../assets/img/logokemenkes.png";
import styles from "./NavBar.module.css";
// import ReactPaginate from "react-paginate";
import { connect } from "react-redux";
import { logout } from "../../redux/action/auth";


class NavBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      search: "",
      page: 1,
      limit: 5,
      isShow: false,
    };
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.search !== this.state.search) {
      this.getData(this.state.search);
    }
  }

  getData = (search) => {
    const { page, limit } = this.state;
    this.props.getAllMovie(page, limit, "movie_name ASC", "%" + search + "%");
  };

  changeText = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  handleClose = () => {
    this.setState({
      isShow: false,
    });
  };

  handleShow = () => {
    this.setState({
      isShow: true,
    });
  };

  handlePageClick = (event) => {
    const selectedPage = event.selected + 1;
    this.setState({ page: selectedPage }, () => {
      this.getData(this.state.search);
    });
  };

  handleResSearch = (id) => {
    this.props.history.push(`/main/movie-detail/${id}`);
  };

  handleLogin = () => {
    this.props.history.push("/bookingruangrapat/login");
  };

  handleLogout = () => {
    this.props.logout();
    this.props.history.push("/login");
  };

  render() {
    const { data } = this.props.auth;

    return (
      <>
        <Navbar
          collapseOnSelect
          expand="lg"
          bg="light"
          variant="light"
          sticky="top"
        >
          <Navbar.Brand>
            <Image src={logo} fluid />
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse
            id="responsive-navbar-nav"
            className="justify-content-between"
          >
            <Nav>
              <Link className="ml-sm-5 mr-2" to="/">
                <span className={styles.link}>HOME</span>
              </Link>


              {data.user_role === "admin" ? (
                <Link className="ml-sm-5 mr-2" to="/datauser">
                  <span className={styles.link}>DATA USER</span>
                </Link>
              ) : (
                ""
              )}
              <Link className="ml-sm-5 mr-2" to="/laporanaktivitas">
                <span className={styles.link}>LAPORAN AKTIVITAS</span>
              </Link>
              {data.user_role === "admin" ? (
                <Link className="ml-sm-5 mr-2" to="/laporanaktivitashariini">
                  <span className={styles.link}>LAPORAN AKTIVITAS HARI INI</span>
                </Link>
              ) : (
                ""
              )}

            </Nav>


            <Nav>
              {/* <p className="mr-sm-4 mt-3">
                <span className={styles.link}>Location</span>
              </p> */}

              <div className="mr-sm-4 mt-2">
                {Object.keys(data).length === 0 ? (
                  <Button
                    className={(styles.link, styles.btNav)}
                    onClick={() => this.handleLogin()}
                  >
                    LOGIN
                  </Button>
                ) : (
                  <div className="d-flex flex-md-row flex-column">

                    <Button
                      className={(styles.link, styles.btNav)}
                      onClick={() => this.handleLogout()}
                    >
                      LOG OUT
                    </Button>
                  </div>
                )}
              </div>

            </Nav>
          </Navbar.Collapse>
        </Navbar>
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  auth: state.auth,
  movie: state.movie,
});

const mapDispatchToProps = { logout };

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(NavBar));
