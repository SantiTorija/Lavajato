import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import useFormatDate from "../hooks/useFormatDate";
import { emptyCart } from "../redux/cartSlice";
import { useNavigate } from "react-router-dom";
import useStoreOrder from "../hooks/useStoreOrder";
import useUpdateOrder from "../hooks/useUpdateOrder";
import NavbarComponent from "../components/Navbar";
import { Card, Container, Row } from "react-bootstrap";
import styles from "./confirmation.module.css";

function Confirmation() {
  const cart = useSelector((state) => state.cart);
  const { firstname, lastname, email, carType } = useSelector(
    (state) => state.client
  );
  const orders = useSelector((state) => state.orders);

  console.log(cart[0]);

  const { total, tipoLavado } = useSelector((state) => state.cart[0]);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleReturnToCalendar = () => {
    dispatch(emptyCart());
    navigate("/calendario");
  };

  const { storeOrder, loading, error } = useStoreOrder(
    cart[0].date,
    cart[0].slot
  );
  const { updateOrder } = useUpdateOrder();

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

  const handleUpdateOrder = async () => {
    try {
      await updateOrder(
        {
          firstname: firstname,
          lastname: lastname,
          phone: email,
          cart: cart,
          total: total,
          service: tipoLavado,
        },
        orders[0]
      );
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
          <p className="text-center">
            Atención: Esta reserva se podrá cancelar hasta 24 horas antes de la
            hora. En caso de no presentarse no podrá reservar por un período de
            dos meses
          </p>
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
            onClick={() =>
              orders.length > 0 ? handleUpdateOrder() : handleStoreOrder()
            }
          >
            RESERVAR
          </button>
        </div>
      </Container>
    </>
  );
}

export default Confirmation;
