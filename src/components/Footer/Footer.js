import React, { Component } from "react";
import { Container, Row, Col } from "react-bootstrap";
import styles from "./Footer.module.css";
import MailIcon from '@mui/icons-material/Mail';
import InstagramIcon from '@mui/icons-material/Instagram';
import FacebookIcon from '@mui/icons-material/Facebook';
class Footer extends Component {
  render() {
    return (
      <>
        <footer >
          <Container fluid >
            <Row>
              <Col sm={4}>
                <p className={styles.bold}>
                  Kontak kami :
                </p>
                <p className={styles.semi11}>
                  <MailIcon /> : logaktivitasp2p@gmail.com
                </p>

              </Col>

              <Col sm={4}>
                <p className={styles.bold}>Alamat :</p>
                <p className={styles.semi}>
                  Jalan H.R Rasuna Said Blok X-5 Kavling 4-0 Jakarta 12950
                </p>
              </Col>
              <Col sm={4}>
                <p className={styles.bold}>Media Sosial</p>
                <p className={styles.semi}>
                  <InstagramIcon />  ditjenp2p
                </p>
                <p className={styles.semi}>
                  <FacebookIcon /> Ditjen PdanPp Kemkes
                </p>
              </Col>
            </Row>
            <Row className={`${styles.copyright} text-center mt-1`}>
              <Col>
                <p>COPYRIGHT 2022 KEMENTERIAN KESEHATAN REPUBLIK INDONESIA.</p>
              </Col>
            </Row>
          </Container>
        </footer>
      </>
    );
  }
}

export default Footer;
