import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import axios from "axios";
import useFormatDate from "./useFormatDate";

import { useDispatch } from "react-redux";

const MySwal = withReactContent(Swal);
const useDeleteAlert = () => {
  const dispatch = useDispatch();
  const handleDelete = async (email) => {
    const formatDate = (dateString) => {
      // [Solución] Crear la fecha directamente en la zona horaria local
      const [year, month, day] = dateString.split("-");
      const date = new Date(year, month - 1, day); // Sin UTC

      if (isNaN(date.getTime())) {
        console.error("Formato de fecha inválido. Usa 'YYYY-MM-DD'.");
        return "";
      }

      const options = { day: "numeric", month: "long", year: "numeric" };
      return date.toLocaleDateString("es-ES", options);
    };
    const responseOrder = await axios.get(
      `${import.meta.env.VITE_API_URL}/order/${email.trim()}`
    );
    if (responseOrder) {
      const date = responseOrder.data[0].cart.date;
      const slot = responseOrder.data[0].cart.slot;
      MySwal.fire({
        title: "Atención",
        html: `
       <p>Estás por eliminar tu reserva <strong>¿Estás seguro?</strong></p>
        <p><strong>Día:</strong> ${formatDate(date)}</p>
        <p><strong>Horario:</strong> ${slot}</p>
      `,
        icon: "warning",
        iconColor: "rgba(242, 0, 0, 0.6)",
        showCancelButton: true,
        confirmButtonColor: "rgba(242, 0, 0, 0.6)",
        cancelButtonColor: "rgba(98, 98, 98, 0.6)",
        confirmButtonText: "Sí, cancelar",
        cancelButtonText: "No,conservar",
      }).then(async (result) => {
        if (result.isConfirmed) {
          // Lógica para eliminar la orden

          const responseDelete = await axios.delete(
            `${import.meta.env.VITE_API_URL}/order/${
              responseOrder.data[0].id
            }/${responseOrder.data[0].cart.date}/${
              responseOrder.data[0].cart.slot
            }`
          );

          console.log(responseDelete);
        }
      });
    }
  };
  return { handleDelete };
};

export default useDeleteAlert;
