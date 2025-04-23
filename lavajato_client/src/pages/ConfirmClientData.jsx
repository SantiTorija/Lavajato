import { useState } from "react";
import { addClient } from "../redux/clientSlice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import NavbarComponent from "../components/Navbar";
import { Container, Row, Form, Button } from "react-bootstrap";
import styles from "./clientDataForm.module.css";
import useStoreClient from "../hooks/useStoreClient";

const ConfirmClientDataForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { firstname, lastname, phone, modelo, marca, carType } = useSelector(
    (state) => state.client
  );
  const [nuevaMarca, setNuevaMarca] = useState("");
  const [nuevoModelo, setNuevoModelo] = useState("");
  const [newPhone, setNewPhone] = useState("");
  const [newcarType, setNewCarType] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    navigate("/calendario");
  };

  return (
    <>
      <NavbarComponent />
      <Container className=" d-flex flex-column justify-content-center align-items-center">
        <Form
          className={`p-4 border mt-4 ${styles.form}`}
          onSubmit={handleSubmit}
        >
          <h2>
            Bienvenido {firstname} {lastname}
          </h2>

          <span>
            Por favor, confirme que los siguientes datos sean correctos
          </span>

          <Form.Group className="mt-2" controlId="formApellido">
            <Form.Label>Teléfono</Form.Label>
            <Form.Control
              type="text"
              value={phone}
              onChange={(e) => setNewPhone(e.target.value)}
              required
            />
          </Form.Group>

          <div className="d-flex gap-2">
            <Form.Group className="mt-2" controlId="formMatricula">
              <Form.Label>Marca</Form.Label>
              <Form.Control
                type="text"
                value={marca}
                onChange={(e) => setNuevaMarca(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mt-2" controlId="formMatricula">
              <Form.Label>Modelo</Form.Label>
              <Form.Control
                type="text"
                value={modelo}
                onChange={(e) => setNuevoModelo(e.target.value)}
              />
            </Form.Group>
          </div>

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
                onChange={() => setNewCarType(type)}
              />
            ))}
          </Form.Group>
          <Row className="w-100 justify-content-center pt-4">
            <Button className="action-button" type="submit">
              SIGUIENTE
            </Button>
          </Row>
        </Form>
      </Container>
    </>
  );
};

export default ConfirmClientDataForm;
