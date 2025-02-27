import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Home() {
  const [admin, setAdmin] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const getAdmin = async () => {
      const response = await axios({
        method: "GET",
        url: `${import.meta.env.VITE_API_URL}/admins`,
      });
      setAdmin(response.data);
      console.log(admin);
      console.log(response.data);
    };
    getAdmin();
  }, []);

  return (
    <>
      <div>
        <h1>BIENVENIDO A LAVAJATO</h1>
        <p>comenzá tu reserva de hora haciendo click abajo</p>
        <button onClick={() => navigate("/calendario")}>RESERVAR</button>
      </div>
    </>
  );
}

export default Home;
