import { useEffect, useState } from "react";
import axios from "axios";

function Calendar() {
  const [admin, setAdmin] = useState("");

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
        <h1>CALENDARIO</h1>
        <p>primero elegí el dia</p>
      </div>
    </>
  );
}

export default Calendar;
