import { useState } from "react";
import { useNavigate } from "react-router-dom";
import NavbarComponent from "../components/Navbar";
import styles from "./home.module.css";
import { Container, Col, Row, Button } from "react-bootstrap";
import background from "../assets/images/image.webp";
import { FaHandPointDown } from "react-icons/fa6";
import CenteredModal from "../components/ExistingReserveModal.jsx";
import EmailModal from "../components/emailModal.jsx";

function Home() {
  const [modalShow, setModalShow] = useState(false);
  const [emailModalShow, setEmailModalShow] = useState(false);
  const navigate = useNavigate();

  return (
    <>
      <NavbarComponent />
      <Container className={styles.container}>
        <Row className=" px-5">
          <Col className="d-none d-md-block d-flex align-items-center text-left mt-5 pt-5">
            <h1 className={styles.title}>BIENVENIDO A LAVAJATO!</h1>
            <p className={styles.font}>
              comenzá tu reserva de hora haciendo click abajo
            </p>
            <button
              className="action-button"
              onClick={() => navigate("/datos-cliente")}
            >
              RESERVAR
            </button>
          </Col>
          <Col className="col-12 col-md-7 text-center p-0">
            <h2 className={`${styles.title} d-block d-md-none mb-4`}>
              Bienvenido!
            </h2>
            <h3 className={`${styles.subtitle} d-block d-md-none mb-4`}>
              Acá podés agendar hora para tu proximo lavado
            </h3>
            <img className="w-100" src={background} alt="" />
            <p className={`${styles.font} d-block d-md-none mt-3`}>
              comenzá haciendo click abajo <FaHandPointDown size={25} />
            </p>
            <div className="d-flex flex-column justify-content-center align-items-center gap-3 w-100 d-block d-md-none py-4">
              <button
                className="action-button "
                onClick={() => setEmailModalShow(true)}
              >
                RESERVAR
              </button>
              <EmailModal
                show={emailModalShow}
                onHide={() => setEmailModalShow(false)}
              />
              <Button
                className={styles.buttonLink}
                onClick={() => setModalShow(true)}
              >
                Ya tengo una reserva
              </Button>
              <CenteredModal
                show={modalShow}
                onHide={() => setModalShow(false)}
              />
            </div>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default Home;
