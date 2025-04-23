import { Container, Button, Modal } from "react-bootstrap";

//import styles from "./moreInfoModal.module.css";

function MoreInfoModal(props) {
  return (
    <Container>
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>{props.serviceType}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>
            {props.serviceType === "Lavado completo"
              ? "Incluye limpieza exterior con shampoo especial, enjuague a presión y secado manual. También se realiza limpieza interior con aspirado de alfombras, asientos y baúl, limpieza de vidrios y paneles."
              : "Además del lavado completo, se aplica cera de alta calidad para proteger la pintura, realzar el brillo y repeler el agua y la suciedad por más tiempo."}
          </p>
        </Modal.Body>
        <Modal.Footer className="d-flex justify-content-center">
          <Button
            className="bg-light text-dark border-1 border-dark w-25"
            onClick={props.onHide}
          >
            Cerrar
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
}

export default MoreInfoModal;
