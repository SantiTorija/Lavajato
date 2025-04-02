import { useState } from "react";
import { addClient } from "../redux/clientSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import NavbarComponent from "../components/Navbar";
import { Container, Col, Row, Form, Button } from "react-bootstrap";
import styles from "./clientDataForm.module.css";

const ClientDataForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [confirmEmail, setConfirmEmail] = useState("");
  const [licensePlate, setLicensePlate] = useState("");
  const [carType, setCarType] = useState(null);

  const emailsMatch = email && confirmEmail && email === confirmEmail;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!emailsMatch) {
      alert("Por favor corrije el email");
      return;
    }
    dispatch(
      addClient({
        firstname,
        lastname,
        email,
        matrícula: licensePlate,
        carType,
      })
    );
    navigate("/calendario");
  };

  return (
    <>
      <NavbarComponent />
      <Container className="mt-4 d-flex flex-column justify-content-center align-items-center">
        <h2 style={{ textAlign: "center" }}>Datos del Cliente</h2>
        <Form
          className={`p-4 border mt-4 ${styles.form}`}
          onSubmit={handleSubmit}
        >
          <div className="d-flex gap-2">
            <Form.Group className="mt-2" controlId="formNombre">
              <Form.Label>Nombre</Form.Label>
              <Form.Control
                type="text"
                value={firstname}
                onChange={(e) => setFirstname(e.target.value)}
                required
              />
            </Form.Group>

            <Form.Group className="mt-2" controlId="formApellido">
              <Form.Label>Apellido</Form.Label>
              <Form.Control
                type="text"
                value={lastname}
                onChange={(e) => setLastname(e.target.value)}
                required
              />
            </Form.Group>
          </div>

          <Form.Group className="mt-2" controlId="formEmail">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </Form.Group>

          <Form.Group className="mt-2" controlId="formConfirmarEmail">
            <Form.Label>Confirmar Email</Form.Label>
            <Form.Control
              type="email"
              value={confirmEmail}
              onChange={(e) => setConfirmEmail(e.target.value)}
              required
            />
          </Form.Group>

          <Form.Group className="mt-2" controlId="formMatricula">
            <Form.Label>Matrícula (opcional)</Form.Label>
            <Form.Control
              type="text"
              value={licensePlate}
              onChange={(e) => setLicensePlate(e.target.value)}
            />
          </Form.Group>

          <Form.Group className="mt-2" controlId="formTipoAuto">
            <Form.Label>Tipo de auto</Form.Label>
            {[
              "Auto - furgón chico",
              "Pick Up pequeñas - SUV",
              "Pick up - SUV 7 plazas",
            ].map((type) => (
              <Form.Check
                key={type}
                id={type}
                type="radio"
                label={type}
                name={type}
                value={type}
                checked={carType === type}
                onChange={() => setCarType(type)}
              />
            ))}
          </Form.Group>
          <Row className="w-100 justify-content-center pt-4">
            <Button
              className="action-button"
              type="submit"
              disabled={!emailsMatch || !carType || !firstname || !lastname}
            >
              Enviar
            </Button>
          </Row>
        </Form>
      </Container>
    </>
  );
};

export default ClientDataForm;
