import { useState } from "react";
import { addClient } from "../redux/clientSlice";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import NavbarComponent from "../components/Navbar";
import { Container, Row, Form, Button } from "react-bootstrap";
import styles from "./clientDataForm.module.css";
import useStoreClient from "../hooks/useStoreClient";

const ClientDataForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { email } = useParams();
  const { storeClient } = useStoreClient();
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [marca, setMarca] = useState("");
  const [modelo, setModelo] = useState("");
  const [phone, setPhone] = useState("");
  const [carType, setCarType] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    await storeClient(
      firstname,
      lastname,
      email,
      phone,
      modelo,
      marca,
      carType
    );
    dispatch(
      addClient({
        firstname,
        lastname,
        email,
        phone,
        car: { modelo, marca, carType },
      })
    );
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
          <h2>Datos del Cliente</h2>
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
          <Form.Group className="mt-2" controlId="formApellido">
            <Form.Label>Phone</Form.Label>
            <Form.Control
              type="text"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
            />
          </Form.Group>

          <h2 className="mt-3 mb-1">Datos del Vehículo</h2>

          <div className="d-flex gap-2">
            <Form.Group className="mt-2" controlId="formMatricula">
              <Form.Label>Marca</Form.Label>
              <Form.Control
                type="text"
                value={marca}
                onChange={(e) => setMarca(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mt-2" controlId="formMatricula">
              <Form.Label>Modelo</Form.Label>
              <Form.Control
                type="text"
                value={modelo}
                onChange={(e) => setModelo(e.target.value)}
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
                onChange={() => setCarType(type)}
              />
            ))}
          </Form.Group>
          <Row className="w-100 justify-content-center pt-4">
            <Button
              className="action-button"
              type="submit"
              disabled={!carType || !firstname || !lastname}
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
