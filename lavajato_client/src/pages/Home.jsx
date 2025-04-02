import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import NavbarComponent from "../components/Navbar";
import styles from "./home.module.css";
import { Container, Col, Row } from "react-bootstrap";
import background from "../assets/images/image.webp";

function Home() {
  const [admin, setAdmin] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const getAdmin = async () => {
      const response = await axios({
        method: "GET",
        url: `${import.meta.env.VITE_API_URL}/admins`,
      });
      setAdmin(response.data);
      console.log(admin);
      console.log(response.data);
    };
    getAdmin();
  }, []);

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
              BIENVENIDO!
            </h2>
            <img className="w-100" src={background} alt="" srcset="" />
            <p className={`${styles.font} d-block d-md-none mt-3`}>
              comenzá tu reserva de hora haciendo click abajo
            </p>
            <div className="d-flex justify-content-center w-100 d-block d-md-none py-4">
              <button
                className="action-button "
                onClick={() => navigate("/datos-cliente")}
              >
                RESERVAR
              </button>
            </div>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default Home;
