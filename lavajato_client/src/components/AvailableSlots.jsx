import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addReserve } from "../redux/cartSlice";
import { useNavigate } from "react-router-dom";
import useFormatDate from "../hooks/useFormatDate";
import PropTypes from "prop-types";
import Form from "react-bootstrap/Form";
import { Container, Col, Row } from "react-bootstrap";

const AvailableSlots = ({ slotsAvailable, selectedDay }) => {
  const [loading, setLoading] = useState(false);
  const [selectedSlot, setSelectedSlot] = useState("");
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);
  const navigate = useNavigate();
  const { carType } = useSelector((state) => state.client);
  const [lavado, setLavado] = useState("");
  const [lavadoYEncerado, setLavadoYEncerado] = useState("");
  const [tipoLavado, setTipoLavado] = useState(null);
  const [total, setTotal] = useState("");

  AvailableSlots.propTypes = {
    slotsAvailable: PropTypes.arrayOf(PropTypes.string).isRequired,
    selectedDay: PropTypes.string.isRequired,
  };

  const slot = [
    "08 AM - 10 AM",
    "10 AM - 12 PM",
    "13 PM - 15 PM",
    "15 PM - 17 PM",
  ];

  useEffect(() => {
    if (carType === "Auto - furgón chico") {
      setLavado("800");
      setLavadoYEncerado("1100");
    } else if (carType === "Pick Up pequeñas - SUV") {
      setLavado("1000");
      setLavadoYEncerado("1300");
    } else {
      setLavado("1200");
      setLavadoYEncerado("1500");
    }
    console.log(slotsAvailable);
  }, []);

  const getSlotNumber = (timeRange) => {
    return (
      Object.entries(slot).find(([key, value]) => value === timeRange)?.[0] ||
      null
    );
  };

  function slotsToShow(slot, ocupados) {
    return slot.filter((slot) => !ocupados.includes(slot));
  }

  const handleSeveReserve = () => {
    if (!selectedSlot) {
      alert("seleccione un horario");
    } else {
      dispatch(
        addReserve({
          date: selectedDay,
          slot: selectedSlot,
          total: total,
          carType,
          tipoLavado,
        })
      );
      navigate("/confirmation");
    }
    return;
  };

  const handleChange = (type, price) => {
    setTipoLavado((prev) => (prev === type ? null : type));
    setTotal(price);
  };

  useEffect(() => {
    console.log(cart);
  }, [cart, selectedSlot]);

  return (
    <>
      {loading ? (
        <p>Loading slots...</p>
      ) : slotsAvailable.length < 4 ? (
        <div className=" d-flex flex-column justify-content-between h-100">
          <div className="d-flex flex-column align-items-start gap-3">
            <strong>LUGARES DISPONIBLES</strong>
            <select
              className="mb-4"
              value={selectedSlot}
              name=""
              id=""
              onChange={(e) => setSelectedSlot(e.target.value)}
            >
              <option value="" disabled>
                Selecciona un horario
              </option>
              {slotsToShow(slot, slotsAvailable).map((slot) => (
                <option key={slot} value={slot}>
                  {slot}
                </option>
              ))}
            </select>
          </div>
          <div className="d-flex flex-column align-items-start gap-3 w-100 w-md-100">
            <strong>TIPO DE LAVADO</strong>
            <Form className="d-flex flex-column align-items-start gap-2 w-100">
              <Form.Check // prettier-ignore
                type="switch"
                id="custom-switch-completo"
                label={`Lavado completo - $${lavado}`}
                checked={tipoLavado === "Lavado completo"}
                onChange={() => handleChange("Lavado completo", lavado)}
              />
              {/* <Form.Check className="d-flex flex-row-reverse align-items-center justify-content-between px-0 w-75">
                <Form.Check
                  type="switch"
                  id="custom-switch"
                  checked={tipoLavado === "Lavado completo"}
                  onChange={() => handleChange("Lavado completo", lavado)}
                />
                <Form.Check.Label htmlFor="custom-switch">{`Lavado completo - $${lavado}`}</Form.Check.Label>
              </Form.Check> */}
              <Form.Check // prettier-ignore
                type="switch"
                id="custom-switch-encerado"
                checked={tipoLavado === "Lavado completo y encerado"}
                label={`Lavado con encerado - $${lavadoYEncerado}`}
                onChange={() =>
                  handleChange("Lavado completo y encerado", lavadoYEncerado)
                }
              />
              {/* <Form.Check className="d-flex flex-row-reverse align-items-center justify-content-between px-0 w-75">
                <Form.Check
                  type="switch"
                  id="custom-switch-encerado"
                  checked={tipoLavado === "Lavado completo y encerado"}
                  onChange={() =>
                    handleChange("Lavado completo y encerado", lavadoYEncerado)
                  }
                />
                <Form.Check.Label htmlFor="custom-switch-encerado">{`Lavado con encerado - $${lavadoYEncerado}`}</Form.Check.Label>
              </Form.Check> */}
            </Form>
          </div>
          <Row className="w-100 justify-content-center pt-3">
            <button
              className="mt-4 action-button"
              onClick={() => handleSeveReserve()}
            >
              Confirmar reserva
            </button>
          </Row>
        </div>
      ) : (
        "No hay espacio disponible"
      )}
    </>
  );
};

export default AvailableSlots;
