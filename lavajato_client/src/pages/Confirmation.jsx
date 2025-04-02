import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import useFormatDate from "../hooks/useFormatDate";
import { emptyCart } from "../redux/cartSlice";
import { useNavigate } from "react-router-dom";
import useStoreOrder from "../hooks/useStoreOrder";
import NavbarComponent from "../components/Navbar";
import { Card, Container, Row } from "react-bootstrap";
import styles from "./confirmation.module.css";

function Confirmation() {
  const cart = useSelector((state) => state.cart);
  const { firstname, lastname, email, carType } = useSelector(
    (state) => state.client
  );
  const { total, tipoLavado } = useSelector((state) => state.cart[0]);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    console.log(cart);
    console.log(carType);
    return;
  }, []);

  const handleReturnToCalendar = () => {
    dispatch(emptyCart());
    navigate("/calendario");
  };

  const { storeOrder, loading, error } = useStoreOrder(
    cart[0].date,
    cart[0].slot
  );

  const handleStoreOrder = async () => {
    try {
      await storeOrder({
        firstname: firstname,
        lastname: lastname,
        phone: email,
        cart: cart,
        total: total,
        service: tipoLavado,
      });

      dispatch(emptyCart());
      navigate("/gracias");
    } catch (error) {
      alert("hubo un error");
      console.log(error);
    }
  };
  return (
    <>
      <NavbarComponent />
      <Container className="py-4 text-center d-flex flex-column justify-content-center align-items-center">
        <h1 className="fs-2">ÚLTIMO PASO</h1>
        <strong>por favor, confirma los datos de la reserva</strong>
        <Card className={`${styles.card} mt-4`}>
          <Card.Body className="d-flex flex-column align-items-start gap-2 ">
            <div className="d-flex flex-column border p-1 w-100">
              <span>DIA:</span>
              <span>{useFormatDate(cart[0].date)}</span>
            </div>
            <div className="d-flex flex-column border p-1 w-100">
              <span>HORA:</span>
              <span> {cart[0].slot}</span>
            </div>
            <div className="d-flex flex-column border p-1 w-100">
              <span>EMAIL: </span>
              <span> {email}</span>
            </div>
            <div className="d-flex flex-column border p-1 w-100">
              <span>TIPO DE AUTO:</span>
              <span> {carType}</span>
            </div>
            <div className="d-flex flex-column border p-1 w-100">
              <span>SERVICIO:</span>
              <span> {tipoLavado}</span>
            </div>

            <span className="fs-4">TOTAL: $ {total}</span>
          </Card.Body>
        </Card>
        <div className="d-flex justify-content-center gap-3 mt-4">
          <button
            className={styles.backButton}
            onClick={() => handleReturnToCalendar()}
          >
            ATRÁS
          </button>
          <button
            className={styles.actionButton}
            onClick={() => handleStoreOrder()}
          >
            RESERVAR
          </button>
        </div>
      </Container>
    </>
  );
}

export default Confirmation;
