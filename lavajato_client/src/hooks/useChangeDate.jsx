import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addReserveToEdit } from "../redux/orderToEditSlice";
import { addClient } from "../redux/clientSlice";
import axios from "axios";

const useChangeDate = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const fetchOrderToEdit = async (email) => {
    setLoading(true);
    try {
      const responseOrder = await axios.get(
        `${import.meta.env.VITE_API_URL}/order/${email.trim()}`
      );
      const responseClient = await axios.get(
        `${import.meta.env.VITE_API_URL}/client/${email.trim()}`
      );
      if (responseOrder.data.length > 0) {
        dispatch(addReserveToEdit(responseOrder.data[0]));
        dispatch(addClient(responseClient.data[0]));
        navigate("/calendario");
      } else {
        console.log(responseOrder.data.length);
        alert(`no hay reserva`);
      }
      setError(null);
    } catch (err) {
      setError(err);
      console.error("Error fetching reserve:", err);
    } finally {
      setLoading(false);
    }
  };

  return { fetchOrderToEdit, loading, error };
};

export default useChangeDate;
