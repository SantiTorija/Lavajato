import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Home from "./pages/home";
import MyCalendar from "./pages/Calendar";
import Confirmation from "./pages/Confirmation";
import ClientDataForm from "./pages/ClientDataForm";
import ThankYou from "./pages/ThankYou";
import { Route, Routes } from "react-router-dom";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/datos-cliente" element={<ClientDataForm />} />
        <Route path="/calendario" element={<MyCalendar />} />
        <Route path="/confirmation" element={<Confirmation />} />
        <Route path="/gracias" element={<ThankYou />} />
      </Routes>
    </>
  );
}

export default App;
