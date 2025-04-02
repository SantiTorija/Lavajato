import { FaRegCircleCheck } from "react-icons/fa6";
import { useSelector } from "react-redux";
import { Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

function ThankYou() {
  const navigate = useNavigate();
  const { email } = useSelector((state) => state.client);

  return (
    <Container className="d-flex flex-column align-items-center justify-content-center w-100 py-5">
      <h1>TU RESERVA YA ESTÁ LISTA</h1>
      <div className="d-flex flex-column align-items-center gap-4 mt-5">
        <FaRegCircleCheck size={"5rem"} fill="green" />
        <span>Muchas gracias por confiar en Lavajato</span>
        <span>
          Te llegará un email de confirmación con toda la información a{" "}
          <strong>{email}</strong>
        </span>
        <button className="action-button" onClick={() => navigate("/")}>
          VOLVER AL INICIO
        </button>
      </div>
    </Container>
  );
}

export default ThankYou;
