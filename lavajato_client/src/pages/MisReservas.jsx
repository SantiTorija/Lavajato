import { useState } from "react";
import NavbarComponent from "../components/Navbar";
import Footer from "../components/Footer";
import {
  Container,
  Form,
  InputGroup,
  Button,
  Tabs,
  Tab,
} from "react-bootstrap";
import styles from "./misReservas.module.css";

export default function MisReservas() {
  const [email, setEmail] = useState("");
  const [key, setKey] = useState("activas");

  return (
    <>
      <NavbarComponent />
      <Container className="py-5" style={{ minHeight: "70vh" }}>
        <h1 className="text-white mb-4">Mis reservas</h1>
        <InputGroup
          className={`mb-4 ${styles.inputGroupNoGap}`}
          style={{ maxWidth: 400 }}
        >
          <Form.Control
            type="email"
            placeholder="Ingrese email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Button className={styles.btnBuscar}>Buscar</Button>
        </InputGroup>
        <h4 className="text-white mt-5 mb-3">Reservas</h4>
        <div className={styles.tabsContainer}>
          <Tabs
            id="reservas-tabs"
            activeKey={key}
            onSelect={(k) => setKey(k)}
            className={styles.navPills + " mb-3"}
            fill
            variant="pills"
          >
            <Tab eventKey="activas" title="Activas">
              <div className="text-white">No hay reservas activas.</div>
            </Tab>
            <Tab eventKey="canceladas" title="Canceladas">
              <div className="text-white">No hay reservas canceladas.</div>
            </Tab>
            <Tab eventKey="pasadas" title="Pasadas">
              <div className="text-white">No hay reservas pasadas.</div>
            </Tab>
          </Tabs>
        </div>
      </Container>
      <Footer />
    </>
  );
}
